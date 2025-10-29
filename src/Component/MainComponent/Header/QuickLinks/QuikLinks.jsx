import React from "react";
import { useTheme } from "../../../../ThemeContext";
import { useNavigate } from "react-router-dom";

const QuickLinks = ({ isOpen }) => {
  const { getcolor, fontcolor } = useTheme();
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Application data with navigation paths
  const applications = [
    {
      icon: "💰",
      color: "rgba(156, 39, 176, 0.15)",
      title: "Expense",
      subtitle: "3 pending approvals",
      path: "/ExpenseQuickLinks",
    },
    {
      icon: "📝",
      color: "rgba(96, 154, 247, 0.15)",
      title: "Chart of Account Transfer",
      subtitle: "Chart of Account",
      path: "/AccountTransfer",
    },
    {
      icon: "📇",
      color: "rgba(30, 186, 2, 0.15)",
      title: "Contact Application",
      subtitle: "2 Unsaved Contacts",
      path: "/contacts",
    },
    {
      icon: "📧",
      color: "rgba(161, 49, 14, 0.15)",
      title: "Email Application",
      subtitle: "2 unread messages",
      path: "/email",
    },
    {
      icon: "📅",
      color: "rgba(184, 147, 17, 0.15)",
      title: "Calendar App",
      subtitle: "Get dates",
      path: "/calendar",
    },
    {
      icon: "🎟️",
      color: "rgba(164, 222, 29, 0.15)",
      title: "Ticket Application",
      subtitle: "Get new tickets",
      path: "/tickets",
    },
    {
      icon: "🛒",
      color: "rgba(25, 240, 22, 0.15)",
      title: "eCommerce",
      subtitle: "Buy more products",
      path: "/ecommerce",
    },
  ];

  // Quick links with navigation paths
  const quickLinks = [
    { name: "Pricing Page", path: "/pricing" },
    { name: "Authentication", path: "/auth" },
    { name: "Register Now", path: "/register" },
    { name: "404 Error Page", path: "/404" },
    { name: "Notes App", path: "/notes" },
    { name: "User Application", path: "/users" },
    { name: "Account Settings", path: "/settings" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      className="menu"
      style={{
        position: "absolute",
        top: "60px",
        left: "18%",
        width: "750px",
        backgroundColor: getcolor,
        color: fontcolor,
        padding: "25px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        zIndex: 9999,
        border: `1px solid ${getcolor === "#1e1e1e" ? "#333" : "#e0e0e0"}`,
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .app-item:hover {
            transform: translateX(5px);
            background-color: ${
              getcolor === "#1e1e1e" ? "#333" : "#f0f0f0"
            } !important;
          }
          
          .quick-link-item:hover {
            color: #ffffff !important;
            padding-left: 8px;
          }
        `}
      </style>

      <div
        className="menu-section"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "30px",
        }}
      >
        {/* Applications Section */}
        <div className="menu-applications" style={{ width: "65%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
            }}
          >
            {applications.map((app, index) => (
              <div
                key={index}
                className="app-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "12px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backgroundColor:
                    getcolor === "#1e1e1e" ? "#2a2a2a" : "#f8f8f8",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => handleNavigation(app.path)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "45px",
                    height: "45px",
                    borderRadius: "12px",
                    backgroundColor: app.color,
                    color: fontcolor,
                    fontSize: "20px",
                  }}
                >
                  {app.icon}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong
                    style={{
                      color: fontcolor,
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {app.title}
                  </strong>
                  <span
                    style={{
                      fontSize: "12px",
                      color: getcolor === "#1e1e1e" ? "#a0a0a0" : "#666666",
                    }}
                  >
                    {app.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div
          className="menu-quick-links"
          style={{
            width: "35%",
            borderLeft: `1px solid ${
              getcolor === "#1e1e1e" ? "#333" : "#e0e0e0"
            }`,
            paddingLeft: "25px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <strong
              style={{
                color: fontcolor,
                fontSize: "18px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: "#0090e7" }}>⚡</span> Quick Links
            </strong>
            <p
              style={{
                fontSize: "12px",
                color: getcolor === "#1e1e1e" ? "#a0a0a0" : "#666666",
                marginTop: "5px",
              }}
            >
              Jump to important pages quickly
            </p>
          </div>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {quickLinks.map((link, index) => (
              <li
                key={index}
                className="quick-link-item"
                style={{
                  marginBottom: "12px",
                  fontSize: "14px",
                  cursor: "pointer",
                  color: getcolor === "#1e1e1e" ? "#b0c8e4" : "#555",
                  transition: "all 0.3s ease",
                  padding: "8px 0",
                  borderBottom: `1px solid ${
                    getcolor === "#1e1e1e" ? "#333" : "#eee"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onClick={() => handleNavigation(link.path)}
              >
                <span
                  style={{
                    fontSize: "12px",
                    color: "#0090e7",
                  }}
                >
                  →
                </span>
                {link.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "25px",
          paddingTop: "15px",
          borderTop: `1px solid ${getcolor === "#1e1e1e" ? "#333" : "#e0e0e0"}`,
        }}
      >
        <button
          style={{
            backgroundColor: "transparent",
            border: "1px solid #0090e7",
            color: "#0090e7",
            padding: "10px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#0090e7";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#0090e7";
          }}
          onClick={() => handleNavigation("/all-apps")}
        >
          <span>🔍</span> View All
        </button>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            style={{
              backgroundColor: "#0090e7",
              border: "none",
              color: "white",
              padding: "10px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background-color 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#007bb5")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#0090e7")}
            onClick={() => handleNavigation("/dashboard")}
          >
            <span>✓</span> Check
          </button>

          <button
            style={{
              backgroundColor: getcolor === "#1e1e1e" ? "#333" : "#f0f0f0",
              border: "none",
              color: fontcolor,
              padding: "10px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                getcolor === "#1e1e1e" ? "#444" : "#e0e0e0")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor =
                getcolor === "#1e1e1e" ? "#333" : "#f0f0f0")
            }
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
