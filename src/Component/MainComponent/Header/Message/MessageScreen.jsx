"use client";

import { useState } from "react";
import "./Message.css";
import {
  Send,
  Paperclip,
  Mic,
  MoreVertical,
  Phone,
  Video,
  Search,
} from "lucide-react";

const friends = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    lastMessage: "Hey there!",
    time: "10:30 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    lastMessage: "See you later!",
    time: "9:45 AM",
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    lastMessage: "How's it going?",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Emily Brown",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    lastMessage: "Thanks for the help!",
    time: "Yesterday",
  },
  {
    id: 5,
    name: "Alex Wilson",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    lastMessage: "See you tomorrow",
    time: "Tuesday",
  },
];

const demoMessages = [
  {
    id: 1,
    text: "Hey there! How's it going?",
    sender: "other",
    time: "10:00 AM",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 2,
    text: "Hi! I'm doing great, thanks for asking. How about you?",
    sender: "me",
    time: "10:02 AM",
  },
  {
    id: 3,
    text: "I'm good too! Just finished a great book. Have you read anything interesting lately?",
    sender: "other",
    time: "10:05 AM",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    id: 4,
    text: "Actually, yes! I just started 'The Midnight Library' by Matt Haig. It's fascinating so far.",
    sender: "me",
    time: "10:08 AM",
  },
  {
    id: 5,
    text: "Oh, I've heard good things about that one! Let me know how you like it when you're done.",
    sender: "other",
    time: "10:10 AM",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
  },
];

export default function MessageScreen() {
  const [messages, setMessages] = useState(demoMessages);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(friends[0]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div
      className="chat-app"
      style={{ height: "83vh", marginBottom: "8vh", marginTop: "-8vh" }}
    >
      <div className="friends-list">
        <div className="friends-header">
          <img
            src="https://picsum.photos/40/40?random=9"
            alt="User"
            className="avatar"
          />
          <div className="friends-icons">
            <MoreVertical className="icon" />
            <Search className="icon" />
          </div>
        </div>
        <div className="friends-search">
          <input type="text" placeholder="Search or start new chat" />
        </div>
        <div className="friends-container">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className={`friend ${
                selectedFriend.id === friend.id ? "selected" : ""
              }`}
              onClick={() => setSelectedFriend(friend)}
            >
              <img src={friend.avatar} alt={friend.name} className="avatar" />
              <div className="friend-info">
                <h3>{friend.name}</h3>
                <p>{friend.lastMessage}</p>
              </div>
              <span className="friend-time">{friend.time}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-header">
          <div className="user-info">
            <img
              src={selectedFriend.avatar}
              alt={selectedFriend.name}
              className="avatar"
            />
            <div className="user-details">
              <h2>{selectedFriend.name}</h2>
              <p>Online</p>
            </div>
          </div>
          <div className="header-icons">
            <Search className="icon" />
            <Phone className="icon" />
            <Video className="icon" />
          </div>
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.sender === "other" && (
                <img
                  src={message.avatar}
                  alt="Friend"
                  className="message-avatar"
                />
              )}
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
        </div>
        <form className=" chat-input row" onSubmit={handleSendMessage}>
          <div className="col-sm-1"></div>
          <div className="col-sm-1">
            <Paperclip className="icon" />
          </div>
          <div className="col-sm-6">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </div>
          <div className="col-sm-2">
            <button type="submit">
              <Send className="icon send-icon" />
            </button>
          </div>
          <div className="col-sm-1">
            <Mic className="icon mic-icon" />
          </div>
          <div className="col-sm-1"></div>
        </form>
      </div>
    </div>
  );
}
