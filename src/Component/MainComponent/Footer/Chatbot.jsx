import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { fetchMenu } from "../../Redux/action";
import { getUserData, getOrganisationData } from "../../Auth";
import { useSelector, useDispatch } from "react-redux";
import notificationSound from "../../../image/notification.wav";
import JAZZCASH from "../../../../src/image/JAZZCASH.jpg";
import EASYPAISA from "../../../../src/image/EASYPAISA.jpg";
import CRYSTALSOLUTION from "../../../../src/image/logo.png";
// Company information database
const companyInfo = {
  "CEO": "Abdul Razaq Ghauri",
  "Company name": "Crystal Solutions",
  "Company address": "15-D, Makkah Society Near butt Chock, Township",
  "address": "15-D, Makkah Society Near butt Chock, Township",
  "Company team": [
    "Sohaib Saleem -  React Developer",
    "Saif ul Rehman - Flutter Team Lead",
    "Subtain Khan - Flutter Developer",
    "Umair Khan - Flutter Developer",
    "Miss Saba - HR",
  ],
  "team": [
    "Sohaib Saleem -  React Developer",
    "Saif ul Rehman - Flutter Team Lead",
    "Subtain Khan - Flutter Developer",
    "Umair Khan - Flutter Developer",
    "Miss Saba - HR",
  ],
  "Products": [
    "Crystal POS - Retail Management System",
    "Crystal ERP - Enterprise Resource Planning",
    "Crystal Installment - Loan Management System",
    "Crystal School - Educational Management System"
  ],
  "Services": [
    "Custom Software Development",
    "Mobile App Development",
    "Web Application Development",
    "IT Consulting",
    "System Integration"
  ],


  "Payment options": [
    "JazzCash - 03218811400",
    "EasyPaisa - 03218811400",
    "Meezan Bank - PK32MEZN0002060109804512"
  ],
  "payment": [
    "JazzCash - 03218811400",
    "EasyPaisa - 03218811400",
    "Meezan Bank - PK32MEZN0002060109804512"
  ],
  "JazzCash": {
    "number": "03218811400",
    "qr": JAZZCASH // Make sure to import this image
  },
  "EasyPaisa": {
    "number": "03218811400",
    "qr": EASYPAISA // Make sure to import this image
  },
  "Meezan Bank": {
    "account": "PK32MEZN0002060109804512",
    "name": "CRYSTAL SOLUTIONS"
  },
  "Installment software fees": "5000",
  "POS fees": "2000",
  "Contact email": "info@crystalsolutions.com",
  "Phone number": "+92 321 8811400",
  "mobile number": "+92 321 8811400",
  "Working hours": "9:00 AM to 9:00 PM (Monday to Saturday)"
};

const Chatbot = ({ themeColor = "#6e48aa", fontColor = "#ffffff" }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [hierarchicalMenuData, setHierarchicalMenuData] = useState({});
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const audioRef = useRef(new Audio(notificationSound));

  const user = getUserData();
  const organisation = getOrganisationData();
  const { data } = useSelector((state) => state.item);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Play sound when receiving new bot messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.sender === 'bot') {
        if (!isChatOpen || (messages.length > 1 && lastMessage.text !== "Hello! I'm your virtual assistant. How can I help you today?")) {
          playNotificationSound();
          
          const button = document.querySelector('.chatbot-button');
          if (button) {
            button.classList.add('pulse');
            setTimeout(() => button.classList.remove('pulse'), 2000);
          }
        }
      }
    }
  }, [messages, isChatOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const playNotificationSound = () => {
    audioRef.current.currentTime = 0;
    for (let i = 0; i < 3; i++) {
      audioRef.current
        .play()
        .catch((error) => console.error("Audio play failed:", error));
    }
  };

  // Fetch menu data from API
  useEffect(() => {
    dispatch(fetchMenu(user && user.tusrid, organisation && organisation.code));
  }, [dispatch, user.tusrid, organisation.code]);

  // Process menu data
  useEffect(() => {
    const filteredData = data.filter((item) => item.tusrpem !== "S");
    
    if (Array.isArray(data)) {
      const hierarchicalData = {};
      
      filteredData.forEach((item) => {
        const [topLevel, middleLevel] = item.tmencod.split("-");
        
        if (!hierarchicalData[topLevel]) {
          hierarchicalData[topLevel] = { label: item.tmendsc, items: {} };
        }
        
        if (!hierarchicalData[topLevel].items[middleLevel]) {
          hierarchicalData[topLevel].items[middleLevel] = [];
        }
        
        hierarchicalData[topLevel].items[middleLevel].push({
          label: item.tmendsc,
          to: item.tmenurl,
          disabledd: item.tusrpem === "N",
        });

      });
      
      setHierarchicalMenuData(hierarchicalData);
    }
  }, [data]);

  // Add welcome message
  useEffect(() => {
    const welcomeMessage = {
      text: "Hello! I'm your virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([welcomeMessage]);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Check if message contains company information query
  const isCompanyInfoQuery = (message) => {
    const query = message.toLowerCase();
    return Object.keys(companyInfo).some(key => 
      query.includes(key.toLowerCase()) || 
      query.includes(`what is ${key.toLowerCase()}`) ||
      query.includes(`tell me about ${key.toLowerCase()}`)
    );
  };

  // Get company information response
  // const getCompanyInfoResponse = (message) => {
  //   const query = message.toLowerCase();
  //   const foundKey = Object.keys(companyInfo).find(key => 
  //     query.includes(key.toLowerCase()) || 
  //     query.includes(`what is ${key.toLowerCase()}`) ||
  //     query.includes(`tell me about ${key.toLowerCase()}`)
  //   );
    
  //   if (foundKey) {
  //     if (Array.isArray(companyInfo[foundKey])) {
  //       return {
  //         text: `${foundKey}:\n${companyInfo[foundKey].join('\n')}`,
  //         sender: "bot"
  //       };
  //     }
  //     return {
  //       text: `${foundKey}: ${companyInfo[foundKey]}`,
  //       sender: "bot"
  //     };
  //   }
  //   return null;
  // };
// Get company information response

const getCompanyInfoResponse = (message) => {
  const query = message.toLowerCase();
  const foundKey = Object.keys(companyInfo).find(key => 
    query.includes(key.toLowerCase()) || 
    query.includes(`what is ${key.toLowerCase()}`) ||
    query.includes(`tell me about ${key.toLowerCase()}`)
  );
  
  if (foundKey) {
    // Special case for JazzCash
    if (foundKey.toLowerCase() === "jazzcash") {
      return {
        text: `JazzCash Payment Details:\nNumber: ${companyInfo.JazzCash.number}`,
        sender: "bot",
        image: companyInfo.JazzCash.qr // Include the QR image
      };
    }
    
    // Special case for EasyPaisa
    if (foundKey.toLowerCase() === "easypaisa") {
      return {
        text: `EasyPaisa Payment Details:\nNumber: ${companyInfo.EasyPaisa.number}`,
        sender: "bot",
        image: companyInfo.EasyPaisa.qr // Include the QR image
      };
    }
    
    if (Array.isArray(companyInfo[foundKey])) {
      return {
        text: `${foundKey}:\n${companyInfo[foundKey].join('\n')}`,
        sender: "bot"
      };
    }
    return {
      text: `${foundKey}: ${companyInfo[foundKey]}`,
      sender: "bot"
    };
  }
  return null;
};
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" && !file) return;
    
    const userMessage = {
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...(file && { 
        file: { 
          name: file.name, 
          type: file.type, 
          size: file.size,
          url: filePreview || null
        } 
      })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setFile(null);
    setFilePreview(null);
    setIsTyping(true);
    
    // Check for company information query first
    if (isCompanyInfoQuery(newMessage)) {
      const companyResponse = getCompanyInfoResponse(newMessage);
      if (companyResponse) {
        const delay = 500 + Math.random() * 500;
        setTimeout(() => {
          setMessages(prev => [...prev, {
            ...companyResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
          setIsTyping(false);
        }, delay);
        return;
      }
    }
     if (newMessage.toLowerCase() === "payment options") {
    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      const botResponse = {
        text: "We accept the following payment methods:",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isPaymentMenu: true
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, delay);
    return;
  }
    // Check if the message matches any main menu
    const mainMenuMatch = Object.keys(hierarchicalMenuData).find(topLevel => {
      const menuLabel = hierarchicalMenuData[topLevel].label;
      return menuLabel && newMessage.toLowerCase().includes(menuLabel.toLowerCase());
    });
    
    if (mainMenuMatch) {
      setCurrentMenu(mainMenuMatch);
      const delay = 500 + Math.random() * 500;
      setTimeout(() => {
        const botResponse = {
          text: `Here are the options under ${hierarchicalMenuData[mainMenuMatch].label}:`,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMenu: true,
          menu: mainMenuMatch
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, delay);
    } else {
      const delay = 1000 + Math.random() * 1000;
      setTimeout(() => {
        let response;
        
        // Check for common greetings
        if (/hello|hi|hey|greetings/i.test(newMessage)) {
          response = "Hello! How can I assist you today?";
        } 
        // Check for thanks
        else if (/thank|thanks|appreciate/i.test(newMessage)) {
          response = "You're welcome! Is there anything else I can help you with?";
        }
        // Check for goodbye
        else if (/bye|goodbye|see you/i.test(newMessage)) {
          response = "Goodbye! Feel free to come back if you have more questions.";
        }
        // Default responses
        else {
          const responses = [
            "I understand your concern. Let me check that for you.",
            "Thanks for your message! Our team will get back to you soon.",
            "That's a great question! Here's what I know about that...",
            "I can help with that. Could you provide more details?",
            "I'm checking our knowledge base for the best answer to your question.",
            "I've noted your request. Our support team will contact you shortly.",
          ];
          response = responses[Math.floor(Math.random() * responses.length)];
        }
        
        const botResponse = {
          text: response,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, delay);
    }
  };
const renderPaymentOptions = () => {
  return (
    <div className="payment-options" style={{ marginTop: '10px' }}>
      <div 
        className="payment-option"
        style={{
          padding: '8px 12px',
          margin: '4px 0',
          borderRadius: '4px',
          backgroundColor: '#f5f5f5',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: hexToRgba(themeColor, 0.1)
          }
        }}
        onClick={() => {
          const userMessage = {
            text: "JazzCash",
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages(prev => [...prev, userMessage]);
          
          setIsTyping(true);
          setTimeout(() => {
            const botResponse = {
              text: `JazzCash Payment Details:\nNumber: ${companyInfo.JazzCash.number}`,
              sender: "bot",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              image: companyInfo.JazzCash.qr
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
          }, 800);
        }}
      >
        JazzCash
      </div>
      
      <div 
        className="payment-option"
        style={{
          padding: '8px 12px',
          margin: '4px 0',
          borderRadius: '4px',
          backgroundColor: '#f5f5f5',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: hexToRgba(themeColor, 0.1)
          }
        }}
        onClick={() => {
          const userMessage = {
            text: "EasyPaisa",
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages(prev => [...prev, userMessage]);
          
          setIsTyping(true);
          setTimeout(() => {
            const botResponse = {
              text: `EasyPaisa Payment Details:\nNumber: ${companyInfo.EasyPaisa.number}`,
              sender: "bot",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              image: companyInfo.EasyPaisa.qr
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
          }, 800);
        }}
      >
        EasyPaisa
      </div>
      
      <div 
        className="payment-option"
        style={{
          padding: '8px 12px',
          margin: '4px 0',
          borderRadius: '4px',
          backgroundColor: '#f5f5f5',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: hexToRgba(themeColor, 0.1)
          }
        }}
        onClick={() => {
          const userMessage = {
            text: "Meezan Bank",
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages(prev => [...prev, userMessage]);
          
          setIsTyping(true);
          setTimeout(() => {
            const botResponse = {
              text: `Meezan Bank Payment Details:\nAccount Number: ${companyInfo["Meezan Bank"].account}\nAccount Name: ${companyInfo["Meezan Bank"].name}`,
              sender: "bot",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
          }, 800);
        }}
      >
        Meezan Bank
      </div>
    </div>
  );
};
  // Clear chat function
  const clearChat = () => {
    setMessages([{
      text: "Hello! I'm your virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      if (selectedFile.type.includes('image')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFilePreview(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
      
      setNewMessage(selectedFile.name);
    }
  };

  // Generate quick replies including company info options
  const quickReplies = [
    ...Object.keys(hierarchicalMenuData)
      .filter(topLevel => topLevel !== "000")
      .slice(0, 5)
      .map(topLevel => hierarchicalMenuData[topLevel].label),
    // "Who is the CEO?",
    // "What is the company address?",
     "Payment options",
    "I need technical support"
  ];

  // Render menu options (same hierarchy as sidebar)
  const renderMenuOptions = (menuKey) => {
    const menu = hierarchicalMenuData[menuKey];
    if (!menu) return null;

    return (
      <div className="menu-options" style={{ marginTop: '10px' }}>
        {Object.keys(menu.items)
          .filter(middleLevel => middleLevel !== "000")
          .sort()
          .map((middleLevel) => {
            const subItems = menu.items[middleLevel];
            const mainItem = subItems[0];
            
            return (
              <div key={middleLevel}>
                <div 
                  className="menu-item"
                  style={{
                    padding: '8px 12px',
                    margin: '4px 0',
                    borderRadius: '4px',
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: hexToRgba(themeColor, 0.1)
                    }
                  }}
                  onClick={() => {
                    const userMessage = {
                      text: mainItem.label,
                      sender: "user",
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    };
                    setMessages(prev => [...prev, userMessage]);
                    
                    setIsTyping(true);
                    setTimeout(() => {
                      const botResponse = {
                        text: `You selected: ${mainItem.label}. How can I assist you with this?`,
                        sender: "bot",
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      };
                      setMessages(prev => [...prev, botResponse]);
                      setIsTyping(false);
                    }, 800);
                  }}
                >
                  {mainItem.label}
                </div>
                
                {subItems.length > 1 && (
                  <div style={{ marginLeft: '20px' }}>
                    {subItems.slice(1).map((subItem, index) => (
                      <div 
                        key={index}
                        className="submenu-item"
                        style={{
                          padding: '6px 10px',
                          margin: '2px 0',
                          borderRadius: '4px',
                          backgroundColor: '#e9e9e9',
                          cursor: 'pointer',
                          fontSize: '0.9em'
                        }}
                        onClick={() => {
                          const userMessage = {
                            text: subItem.label,
                            sender: "user",
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                          };
                          setMessages(prev => [...prev, userMessage]);
                          
                          setIsTyping(true);
                          setTimeout(() => {
                            const botResponse = {
                              text: `You selected: ${subItem.label}. How can I assist you with this?`,
                              sender: "bot",
                              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            };
                            setMessages(prev => [...prev, botResponse]);
                            setIsTyping(false);
                          }, 800);
                        }}
                      >
                        {subItem.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div 
        className={`chatbot-button ${isChatOpen ? 'active' : ''}`}
        onClick={toggleChat}
        style={{
          backgroundColor: themeColor,
          boxShadow: `0 4px 20px ${hexToRgba(themeColor, 0.4)}`
        }}
      >
        {isChatOpen ? (
          <CloseIcon style={{ color: "white", fontSize: 28 }} />
        ) : (
          <>
            <ChatIcon style={{ color: "white", fontSize: 28 }} />
            <span className="pulse-ring" style={{ borderColor: themeColor }}></span>
            <span className="notification-badge">1</span>
          </>
        )}
      </div>
      
      {/* Chat Window */}
      {isChatOpen && (
        <div className="chatbot-window" style={{ borderColor: themeColor }}>
          {/* Chat Header */}
          <div className="chatbot-header" style={{ 
            backgroundColor: themeColor, 
            color: "white",
            boxShadow: `0 2px 10px ${hexToRgba(themeColor, 0.3)}`
          }}>
            <div className="header-content">
              <SmartToyIcon style={{ marginRight: 10 }} />
              <div>
                <h5>Crystal Solution Assistant</h5>
                <div className="status">
                  <span className="status-indicator"></span>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <IconButton 
              onClick={clearChat}
              style={{
                position: 'absolute',
                right: '10px',
                color: fontColor,
                padding: '5px'
              }}
              title="Clear chat"
            >
              <DeleteIcon />
            </IconButton>
          </div>
          
          {/* Chat Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
  <div 
    key={index} 
    className={`message-container ${msg.sender}`}
    style={{
      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
    }}
  >
    <div className="message-content-wrapper">
      {msg.sender === 'bot' && (
        <div className="message-avatar">
          <SmartToyIcon style={{ color: themeColor }} />
        </div>
      )}
      <div 
        className="message-content"
        style={{
          backgroundColor: msg.sender === 'user' ? themeColor : '#f5f5f5',
          color: msg.sender === 'user' ? fontColor : '#333',
          border: `1px solid ${msg.sender === 'user' ? themeColor : '#ddd'}`,
          boxShadow: msg.sender === 'user' 
            ? `0 2px 5px ${hexToRgba(themeColor, 0.2)}`
            : '0 2px 5px rgba(0,0,0,0.1)',
          maxWidth: '80%',
          marginLeft: msg.sender === 'bot' ? '10px' : '0',
          marginRight: msg.sender === 'user' ? '10px' : '0',
          whiteSpace: 'pre-line'
        }}
      >
        {msg.text}
        {/* Display the QR image if it exists */}
        {msg.image && (
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <img 
              src={msg.image} 
              alt="JazzCash QR Code" 
              style={{ 
                maxWidth: '200px', 
                maxHeight: '200px',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }} 
            />
          </div>
        )}
        {msg.file && (
          <div className="file-attachment">
            {msg.file.type.includes('image') && msg.file.url ? (
              <img 
                style={{ maxWidth: '100px', borderRadius: '8px' }}
                src={msg.file.url} 
                alt="Uploaded preview" 
                className="file-preview-image"
              />
            ) : (
              <div className="file-icon">
                <AttachFileIcon />
                <div className="file-info">
                  <div className="file-name">{msg.file.name}</div>
                  <div className="file-size">{(msg.file.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>
            )}
          </div>
        )}
        {msg.isMenu && renderMenuOptions(msg.menu)}
        <div className="message-time">{msg.timestamp}</div>
      </div>
      {msg.sender === 'user' && (
        <div className="message-avatar">
          <PersonIcon style={{ color: themeColor }} />
        </div>
      )}
    </div>
  </div>
))}
            
            {isTyping && (
              <div className="message-container bot">
                <div className="message-content-wrapper">
                  <div className="message-avatar">
                    <SmartToyIcon style={{ color: themeColor }} />
                  </div>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            {messages.length <= 1 && (
              <div className="quick-replies-container">
                <p>Quick replies:</p>
                <div className="quick-replies">
                  {quickReplies.map((reply, index) => (
                    <button 
                      key={index} 
                      className="quick-reply"
                      onClick={() => {
                        setNewMessage(reply);
                        document.querySelector('.chatbot-input input').focus();
                      }}
                      style={{ 
                        borderColor: themeColor,
                        color: themeColor
                      }}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <form 
            onSubmit={handleSendMessage} 
            className="chatbot-input-container"
            style={{height: '50px'}}
          >
            {/* {file && (
              <div className="file-preview-container">
                <div className="file-preview">
                  <span>{file.name}</span>
                  <button 
                    type="button" 
                    onClick={() => setFile(null)}
                    className="remove-file-btn"
                  >
                    ×
                  </button>
                </div>
              </div>
            )} */}
            <div className="chatbot-input">
              <div className="input-actions">
                <IconButton 
                  onClick={() => fileInputRef.current.click()}
                  style={{ color: themeColor }}
                  title="Attach file"
                >
                  <AttachFileIcon />
                </IconButton>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <IconButton style={{ color: themeColor }} title="Emoji">
                  <InsertEmoticonIcon />
                </IconButton>
              </div>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                className="message-input"
              />
              <div className="send-button-container">
                {newMessage.trim() === "" && !file ? (
                  <IconButton style={{ color: themeColor }} title="Voice message">
                    <MicIcon />
                  </IconButton>
                ) : (
                  <IconButton 
                    type="submit"
                    disabled={newMessage.trim() === "" && !file}
                    style={{ 
                      // backgroundColor: themeColor, 
                      color: fontColor,
                    }}
                    className="send-button"
                  >
                    <SendIcon />
                  </IconButton>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

// Helper function to convert hex to rgba
function hexToRgba(hex, opacity) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default Chatbot;