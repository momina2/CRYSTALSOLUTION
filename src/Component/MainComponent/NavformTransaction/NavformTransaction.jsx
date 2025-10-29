import React from "react";
import { Nav } from "react-bootstrap";
import { useTheme } from "../../../ThemeContext";

const NavformTransaction = ({ textdata, getstatus }) => {
  const {
    getnavbarbackgroundcolor,
    getnavbarfontcolor,
    getheaderfontsize,
    getfontstyle,
  } = useTheme();

  return (
    <Nav
      className="col-12 d-flex justify-content-between"
      style={{
        borderRadius: "10px 10px 0 0",
        backgroundColor: getnavbarbackgroundcolor,
        color: getnavbarfontcolor,
        height: "24px",
      }}
    >
      <div
        style={{
          fontSize: getheaderfontsize,
          fontFamily: getfontstyle,
          fontWeight: "bold",
        }}
        className="col-12 text-center"
      >
        {textdata}

        <span
          style={{
            color: "white",
            marginLeft: "10px",
            fontWeight: "bold",
            fontSize: getheaderfontsize,
            fontFamily: getfontstyle,
          }}
        >
          {getstatus}
        </span>
      </div>
    </Nav>
  );
};

export default NavformTransaction;
