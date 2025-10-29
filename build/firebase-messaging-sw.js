// public/firebase-messaging-sw.js
// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js");


console.log("🔥 Firebase Messaging Service Worker loading...");

// Firebase configuration - same as your main app
const firebaseConfig = {
  apiKey: "AIzaSyAAb9UYPRH6pexQnc6_CzemwyTDjppQe-c",
  authDomain: "notifications-9b3e6.firebaseapp.com",
  projectId: "notifications-9b3e6",
  storageBucket: "notifications-9b3e6.appspot.com",
  messagingSenderId: "757468826954",
  appId: "1:757468826954:web:2de0d3980aa9bc9f3b05b3",
  measurementId: "G-CPBM3ZK8W8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

console.log("✅ Firebase Messaging Service Worker initialized");

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background message received:", payload);
  
  const notificationTitle = payload.notification?.title || 'New Message';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message',
    icon: payload.notification?.icon || '/itc.png',
    badge: '/itc.png',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Optional: Add event listener for notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received:', event);
  event.notification.close();
  
  // You can open a window or focus an existing one
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});