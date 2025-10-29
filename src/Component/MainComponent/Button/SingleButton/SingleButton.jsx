import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../ThemeContext";

// Use React.forwardRef to correctly forward the ref
const SingleButton = React.forwardRef(
  ({ to, text, style, onClick, id }, ref) => {
    const { getbuttonbackgroundcolor, getbuttonfontcolor, fontcolor } =
      useTheme();
    return (
      <Link to={to}>
        <button
          onFocus={(e) => (e.currentTarget.style.border = "2px solid red")}
          onBlur={(e) => (e.currentTarget.style.border = `none`)}
          className="btn btn-primary"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "11px",
            color: getbuttonfontcolor,
            backgroundColor: getbuttonbackgroundcolor,
            padding: "6px 7px",
            border: "none",
            cursor: "pointer",
            width: "75px",
            textAlign: "center",
            borderRadius: "5px",
            marginRight: "5px",
            textTransform: "capitalize",
            ...style,
          }}
          ref={ref}
          id={id}
          onClick={onClick}
        >
          {text}
        </button>
      </Link>
    );
  }
);

// Ensure export is done correctly
export default SingleButton;
