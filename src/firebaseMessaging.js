import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "./firebase";

const messaging = getMessaging(app);

// Foreground messages listener
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
    
  });
