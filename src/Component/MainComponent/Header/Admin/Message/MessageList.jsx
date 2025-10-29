// import React, { useState, useEffect, useRef } from "react";
// import MessageInput from "./MessageInput";

// function MessageList({ currentUser }) {
//   const [messages, setMessages] = useState([]);
//   const [ws, setWs] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom when messages change
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Load initial messages
//   useEffect(() => {
//     fetch("https://crystalsolutions.com.pk/chat_app/api/messages.php")
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           setMessages(data.data);
//         }
//       })
//       .catch((error) => console.error("Error loading messages:", error));
//   }, []);

//   // WebSocket connection
//   useEffect(() => {
//     const websocket = new WebSocket(`ws://${window.location.hostname}:8080`);

//     websocket.onopen = () => {
//       console.log("WebSocket connected");
//       setIsConnected(true);

//       // Send ping periodically to keep connection alive
//       const pingInterval = setInterval(() => {
//         if (websocket.readyState === WebSocket.OPEN) {
//           websocket.send(JSON.stringify({ action: "ping" }));
//         }
//       }, 30000);

//       return () => clearInterval(pingInterval);
//     };

//     websocket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);

//         switch (data.action) {
//           case "receive":
//             setMessages((prev) => [
//               ...prev,
//               {
//                 id: Date.now(), // Temporary ID for frontend
//                 user_id: data.user_id,
//                 username: data.username,
//                 message: data.message,
//                 created_at: data.timestamp,
//               },
//             ]);
//             break;

//           case "system":
//             console.log("System message:", data.message);
//             break;

//           case "error":
//             console.error("WebSocket error:", data.message);
//             break;

//           default:
//             console.log("Unknown WebSocket message:", data);
//         }
//       } catch (error) {
//         console.error("Error parsing WebSocket message:", error);
//       }
//     };

//     websocket.onclose = () => {
//       console.log("WebSocket disconnected");
//       setIsConnected(false);
//     };

//     websocket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     setWs(websocket);

//     return () => {
//       if (websocket) {
//         websocket.close();
//       }
//     };
//   }, []);

//   const handleSend = (message) => {
//     if (ws && ws.readyState === WebSocket.OPEN) {
//       ws.send(
//         JSON.stringify({
//           action: "send",
//           user_id: currentUser.id,
//           message: message,
//         })
//       );
//     } else {
//       console.error("WebSocket not connected");
//       // Fallback to HTTP POST if WebSocket fails
//       fetch("https://crystalsolutions.com.pk/chat_app/api/messages.php", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user_id: currentUser.id,
//           message: message,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.success) {
//             setMessages((prev) => [...prev, data.message]);
//           }
//         })
//         .catch((error) => console.error("Error sending message:", error));
//     }
//   };

//   return (
//     <div className="message-list-container">
//       <div className="connection-status">
//         Status: {isConnected ? "Connected" : "Disconnected"}
//       </div>

//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div
//             key={msg.id || index}
//             className={`message ${
//               msg.user_id === currentUser.id ? "sent" : "received"
//             }`}
//           >
//             <div className="message-header">
//               <span className="message-username">{msg.username}</span>
//               <span className="message-time">
//                 {new Date(msg.created_at).toLocaleTimeString()}
//               </span>
//             </div>
//             <div className="message-content">{msg.message}</div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <MessageInput currentUser={currentUser} onSend={handleSend} />
//     </div>
//   );
// }

// export default MessageList;
