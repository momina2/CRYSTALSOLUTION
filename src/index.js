import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Service Worker registration with better debugging
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("✅ Firebase SW registered:", registration);
      
      // Service Worker ready hone ka wait karein
      return navigator.serviceWorker.ready;
    })
    .then((registration) => {
      console.log("✅ Service Worker is ready:", registration);
      console.log("✅ Scope:", registration.scope);
    })
    .catch((err) => {
      console.error("❌ Firebase SW registration failed:", err);
    });
} else {
  console.log("❌ Service Worker not supported in this browser");
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <FpjsProvider {...fpjsConfig}> */}
      <App />
      {/* </FpjsProvider> */}
    </Provider>
  </React.StrictMode>
);
