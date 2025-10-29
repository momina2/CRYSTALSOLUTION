import React, { useEffect, useRef } from "react";
import { styled, keyframes } from "@mui/material/styles";
import { useTheme } from "../../../../ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Admin = ({ isOpen, handleToggle }) => {
  const navigate = useNavigate();
  const { getcolor, fontcolor, getnavbarbackgroundcolor, getnavbarfontcolor } =
    useTheme();
  const popupRef = useRef(null);

  // Animation for the dropdown
  const slideDown = keyframes`
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const PopupContainer = styled(motion.div)({
    position: "absolute",
    top: "60px",
    right: "10vw",
    width: "220px",
    border: `1px solid ${fontcolor}`,
    backgroundColor: getcolor,
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    zIndex: 10,
    padding: "12px 0",
    animation: `${slideDown} 0.3s ease`,
    fontFamily: "Arial, sans-serif",
    color: fontcolor,
  });

  const MenuItem = styled("div")({
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: getnavbarbackgroundcolor,
      color: getnavbarfontcolor,
    },
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        const isMenuItem = event.target.closest(".menu-item");
        if (!isMenuItem) {
          handleToggle("admin");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleToggle]);

  return (
    isOpen && (
      <PopupContainer ref={popupRef}>
        <MenuItem className="menu-item" onClick={() => navigate("/MenuAdmin")}>
          🗂 Menu
        </MenuItem>
        <MenuItem
          className="menu-item"
          onClick={() => navigate("/ProductMaintenance")}
        >
          🛍️ Product
        </MenuItem>
        <MenuItem
          className="menu-item"
          onClick={() => navigate("/AdminCustomers")}
        >
          👤 Customer
        </MenuItem>
        <MenuItem
          className="menu-item"
          onClick={() => navigate("/MessageScreenforAdmin")}
        >
          💬 Message
        </MenuItem>
      </PopupContainer>
    )
  );
};

export default Admin;
