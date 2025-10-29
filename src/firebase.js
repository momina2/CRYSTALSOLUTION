import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Get FCM Token function
export const getFcmToken = async () => {
  try {
    console.log("1. Checking notification permission...");
    
    const permission = await Notification.requestPermission();
    console.log("2. Notification permission:", permission);
    
    if (permission !== "granted") {
      console.log("❌ Notification permission not granted.");
      return null;
    }

    console.log("3. Checking service worker support...");
    if (!('serviceWorker' in navigator)) {
      console.log("❌ Service Worker not supported");
      return null;
    }

    console.log("4. Getting service worker registration...");
const registration = await navigator.serviceWorker.register("/crystalsol/firebase-messaging-sw.js");
    console.log("✅ Service worker ready:", registration);

    console.log("5. Requesting FCM token...");
    const token = await getToken(messaging, {
      vapidKey: "BBzoSldgtM-ubjAN4AT2wyMiH4Gku4Ch_9ty4OQeWuCAzm5xp0mx9NrAJIeS-qQ9iXaQIfvA3CbtWsi7E6mLQME",
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("✅ FCM Token obtained:", token);
      return token;
    } else {
      console.log("❌ No registration token available.");
      return null;
    }
  } catch (error) {
    console.error("❌ Error getting FCM token:", error);
    return null;
  }
};

// Foreground listener
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("📩 Message received in foreground:", payload);
      resolve(payload);
    });
  });