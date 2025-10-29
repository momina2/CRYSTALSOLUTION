// import React, { useState, useEffect } from "react";
// import MessageList from "./MessageList";

// function MessagePopup() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Load or create a user for this session
//     const storedUser = localStorage.getItem("chatUser");
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     } else {
//       // Create a random guest user
//       const guestUsername = `Guest_${Math.floor(Math.random() * 1000)}`;
//       fetch("https://crystalsolutions.com.pk/chat_app/api/users.php", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username: guestUsername }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.success) {
//             const user = data.user;
//             localStorage.setItem("chatUser", JSON.stringify(user));
//             setCurrentUser(user);
//           }
//         })
//         .catch((error) => console.error("Error creating user:", error));
//     }

//     // Load users list
//     fetch("https://crystalsolutions.com.pk/chat_app/api/users.php")
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           setUsers(data.data);
//         }
//       })
//       .catch((error) => console.error("Error loading users:", error));
//   }, []);

//   if (!currentUser) {
//     return <div className="loading">Loading user...</div>;
//   }

//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <h1>WebSocket Chat</h1>
//         <div className="user-info">
//           Logged in as: <strong>{currentUser.username}</strong>
//         </div>
//       </header>
//       <main className="app-main">
//         <MessageList currentUser={currentUser} />
//       </main>
//     </div>
//   );
// }

// export default MessagePopup;
