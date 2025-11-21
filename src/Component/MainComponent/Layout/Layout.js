// import React from "react";
// import { Outlet } from "react-router-dom";
// import SideBar1 from "../SideBar1/SideBar";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import { useTheme } from "../../../ThemeContext";

// const Layout = () => {
//   const { isSidebarVisible, toggleSidebar, getcolor, toggleChangeColor } =
//     useTheme();
//   return (
//     <div
//       style={{
//         display: "flex",
//         backgroundColor: getcolor,
//         flexDirection: "column",
//         height: "100vh",
//         overflowY: "hidden",
//       }}
//     >
//       <Header />

//       <div style={{ display: "flex", flex: 1 }}>
//         <SideBar1 />

//         <div
//           style={{
//             width: "100%",
//             display: "flex",

//             padding: "-10px",
//           }}
//         >
//           <Outlet />
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import SideBar1 from "../SideBar1/SideBar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useTheme } from "../../../ThemeContext";

const Layout = () => {
  const { isSidebarVisible, toggleSidebar, getcolor, toggleChangeColor } =
    useTheme();
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: getcolor,
        flexDirection: "column",
        height: "100vh", 
      }}
    >
      <Header />

      <div style={{ display: "flex", flex: 700, overflowY: "hidden" }}>
        <SideBar1 />

        <div
          style={{
            flex: 1,
            width: "100%",

            overflowY: "auto",
            overflowX: "auto",

            padding: "0",
            paddingLeft: "16px",
            paddingRight: "16px",

            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
