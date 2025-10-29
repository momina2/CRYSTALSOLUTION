import React from "react";
import "../Footer/Footer.css";
import { useTheme } from "../../../ThemeContext";
import ChatBot from "./Chatbot";

function Footer() {
  const {
    getcolor,
    fontcolor,
    getnavbarbackgroundcolor,
    getnavbarfontcolor,
  } = useTheme();

  return (
    <>
      {/* <ChatBot
        themeColor={getnavbarbackgroundcolor} 
        fontColor={getnavbarfontcolor} 
      /> */}
      
      <footer
        className="footer-container fixed-bottom"
        style={{
          backgroundColor: getcolor,
          borderTop: "1px solid gray",
          zIndex: 9999,
        }}
      >
        <div className="footer-content" style={{ color: fontcolor }}>
          Privacy Policy | Terms of Use | ©2025 Crystal Solution. All Rights
          Reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;