// import React, { useState } from "react";

// function MessageInput({ currentUser, onSend }) {
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const trimmedMessage = message.trim();
//     if (trimmedMessage) {
//       onSend(trimmedMessage);
//       setMessage("");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="message-input-form">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message here..."
//         aria-label="Type your message"
//       />
//       <button type="submit" disabled={!message.trim()}>
//         Send
//       </button>
//     </form>
//   );
// }

// export default MessageInput;
