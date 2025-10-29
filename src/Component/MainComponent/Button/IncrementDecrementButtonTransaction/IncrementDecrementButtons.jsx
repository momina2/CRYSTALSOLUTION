// IncrementDecrementButtons.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../../../ThemeContext";

const IncrementDecrementButtonsTransaction = ({
  value,
  setValue,
  handleInputChangefetchdatafunction,
  navbarBackgroundColor,
  navbarFontColor,
}) => {
  const { getnewrecordinvoice } = useTheme();
  
  // Define button styles
  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: navbarBackgroundColor,
    color: navbarFontColor,
    border: `1px solid ${navbarFontColor}`,
    height: "13px",
    width: "13px",
    fontSize: "9px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  };

  // Define container styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    marginTop: "-5%",
    marginLeft: "2%",
    gap: "1px",
  };

  // Handle increment - FIXED VERSION
  const handleIncrement = () => {
    setValue((prev) => {
      const cleanedValue = prev || value || "0";
      const currentValue = parseInt(cleanedValue) || 0;
      
      // Parse the maximum allowed value (new record invoice)
      const maxValue = parseInt(getnewrecordinvoice) || 999999;
      
      // Only increment if current value is less than max value
      if (currentValue < maxValue) {
        const newValue = (currentValue + 1).toString().padStart(6, "0");
        handleInputChangefetchdatafunction(newValue);
        return newValue;
      }
      
      // If already at max, return current value
      return cleanedValue;
    });
  };

  // Handle decrement
  const handleDecrement = () => {
    setValue((prev) => {
      const cleanedValue = prev || value || "0";
      const numericValue = parseInt(cleanedValue);

      // Prevent the value from going below 1
      if (numericValue > 1) {
        const newValue = (numericValue - 1).toString().padStart(6, "0");
        handleInputChangefetchdatafunction(newValue);
        return newValue;
      }

      // If the value is already 1, do nothing
      return cleanedValue;
    });
  };

  return (
    <div style={containerStyle}>
      <div style={buttonStyle} onClick={handleIncrement}>
        <FontAwesomeIcon icon={faCaretUp} />
      </div>

      <div style={buttonStyle} onClick={handleDecrement}>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
    </div>
  );
};

export default IncrementDecrementButtonsTransaction;