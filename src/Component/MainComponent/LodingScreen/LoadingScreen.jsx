// src/components/LoadingScreen.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingScreen = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        style={{ fontSize: "48px", color: "#007bff", marginBottom: "20px" }}
      />
      <h3 style={{ color: "#333", marginBottom: "10px" }}>
        Loading System Configuration...
      </h3>
      <p style={{ color: "#666" }}>
        Please wait while we load your customer maintenance settings.
      </p>
    </div>
  );
};

export default LoadingScreen;
