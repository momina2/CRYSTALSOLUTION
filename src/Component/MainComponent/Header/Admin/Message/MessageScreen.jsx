// import React, { useState, useEffect } from "react";
// import { w3cwebsocket as W3CWebSocket } from "websocket";

// const MessageScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [isConnected, setIsConnected] = useState(false);
//   const [client, setClient] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Initialize WebSocket connection
//     let wsClient;

//     try {
//       wsClient = "wss://crystalsolutions.com.pk/chat_app/server.php";
//       // Only set event handlers if WebSocket object was created successfully
//       if (wsClient) {
//         wsClient.onopen = () => {
//           console.log("WebSocket Client Connected");
//           setIsConnected(true);
//           setError(null);
//         };

//         wsClient.onmessage = (message) => {
//           const data = JSON.parse(message.data);
//           setMessages((prev) => [...prev, data.message]);
//         };

//         wsClient.onclose = () => {
//           console.log("WebSocket Client Disconnected");
//           setIsConnected(false);
//         };

//         wsClient.onerror = (error) => {
//           console.error("WebSocket Error:", error);
//           setError("Failed to connect to WebSocket server");
//           setIsConnected(false);
//         };

//         setClient(wsClient);
//       }
//     } catch (err) {
//       console.error("WebSocket Initialization Error:", err);
//       setError("Failed to initialize WebSocket connection");
//     }

//     return () => {
//       if (wsClient) {
//         wsClient.close();
//       }
//     };
//   }, []);

//   const sendMessage = () => {
//     if (client && isConnected && message.trim() !== "") {
//       client.send(
//         JSON.stringify({
//           type: "message",
//           message: message,
//         })
//       );
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <h2>WebSocket Chat</h2>

//       {error && (
//         <div style={{ color: "red" }}>
//           Error: {error}
//           <br />
//           Make sure your Ratchet server is running on port 8080
//         </div>
//       )}

//       <div>
//         Status:{" "}
//         {isConnected ? (
//           <span style={{ color: "green" }}>Connected</span>
//         ) : (
//           <span style={{ color: "red" }}>Disconnected</span>
//         )}
//       </div>

//       <div>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message"
//           disabled={!isConnected}
//         />
//         <button onClick={sendMessage} disabled={!isConnected}>
//           Send
//         </button>
//       </div>

//       <div>
//         <h3>Messages:</h3>
//         {messages.map((msg, index) => (
//           <div key={index}>{msg}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MessageScreen;
