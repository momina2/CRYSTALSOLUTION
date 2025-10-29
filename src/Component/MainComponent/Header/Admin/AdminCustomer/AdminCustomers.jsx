import React, { useState, useEffect } from "react";
import { Container, Spinner, Nav, Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../../ThemeContext";

import { isLoggedIn, getUserData, getOrganisationData } from "../../../../Auth";
import NavComponent from "../../../Navform/navbarform";
import "./AdminCustomer.css";
import SingleButton from "../../../Button/SingleButton/SingleButton";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetCrystalCustomer,
  fetchGetUser,
} from "../../../../Redux/action";
export default function AdminCustomers() {
  const dispatch = useDispatch();
  const user = getUserData();
  const organisation = getOrganisationData();
  const tableTopColor = "#3368B5";
  const tableHeadColor = "#3368b5";
  const secondaryColor = "white";
  const btnColor = "#3368B5";
  const textColor = "white";

  const [tableData, setTableData] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data, loading, error } = useSelector(
    (state) => state.getcrystalcustomer
  );

  useEffect(() => {
    setTableData(data);
    dispatch(fetchGetCrystalCustomer());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchGetCrystalCustomer());
  }, []);
  const handleSearch = (e) => {
    setSelectedSearch(e.target.value);
  };

  let totalEntries = 0;

  const getFilteredTableData = () => {
    let filteredData = tableData;

    if (selectedSearch.trim() !== "") {
      const query = selectedSearch.trim().toLowerCase();
      filteredData = filteredData.filter(
        (data) => data.code && data.code.toLowerCase().includes(query)
      );
    }

    return filteredData;
  };

  const firstColWidth = { width: "5%" };
  const secondColWidth = { width: "8%" };
  const thirdColWidth = { width: "20%" };
  // const forthColWidth = { width: "11%" };
  const fifthColWidth = { width: "5%" };
  const sixthColWidth = { width: "6%" };
  const seventhColWidth = { width: "11%" };
  const eighthColWidth = { width: "18%" };
  const ninthColWidth = { width: "6%" };
  const tenthColWidth = { width: "6%" };
  const eleventhColWidth = { width: "6%" };
  const twelthColWidth = { width: "6%" };

  // Adjust the content width based on sidebar state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const {
    isSidebarVisible,
    toggleSidebar,
    getcolor,
    fontcolor,
    toggleChangeColor,
    getnavbarbackgroundcolor,
    getnavbarfontcolor,
    getdatafontsize,
    getfontstyle,
  } = useTheme();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-fontsize",
      getdatafontsize
    );
  }, [getdatafontsize]);
  useEffect(() => {
    document.documentElement.style.setProperty("--font-family", getfontstyle);
  }, [getfontstyle]);
  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", getcolor);
  }, [getcolor]);
  useEffect(() => {
    document.documentElement.style.setProperty("--font-color", fontcolor);
  }, [fontcolor]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--headercolor-color",
      getnavbarbackgroundcolor
    );
  }, [getnavbarbackgroundcolor]);
  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", getcolor);
  }, [getcolor]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--isSidebarVisible",
      isSidebarVisible
    );
  }, [isSidebarVisible]);
  useEffect(() => {
    document.documentElement.style.setProperty("--font-color", fontcolor);
  }, [fontcolor]);

  const className = isSidebarVisible ? "sidebar-visible" : "sidebar-hidden";
  return (
    <>
      <div className={`contentCustomerStyle ${className}`}>
        <div
          style={{
            backgroundColor: getcolor,
            color: fontcolor,
            width: "100%",
            border: `1px solid ${fontcolor}`,
            borderRadius: "9px",
          }}
        >
          <NavComponent textdata="Customer Management" />
          <div className="row mt-1 bt-1">
            <div className="col-sm-1 label-field">Search:</div>
            <div className="col-sm-2 ">
              <Form.Control
                type="text"
                placeholder="Searching..."
                className={`form-control-field `}
                name="selectedSearch"
                value={selectedSearch.toUpperCase()}
                onFocus={(e) => e.target.select()}
                onChange={handleSearch}
              />
            </div>
            <div className="col-sm-8 label-field"></div>
          </div>
          <div>
            <div
              className="contentstylescroll"
              style={{
                backgroundColor: textColor,
                borderBottom: `1px solid ${fontcolor}`,
                // overflowY: getFilteredTableData.length > 10 ? "auto" : "auto",
                // maxHeight: "55vh",
                width: "100%",
                wordBreak: "break-word",
              }}
            >
              <table
                className="myTable"
                id="table"
                style={{
                  width: "100%",
                  position: "relative",
                  wordBreak: "break-word",
                }}
              >
                <thead
                  style={{
                    fontWeight: "bold",
                    height: "24px",
                    position: "sticky",
                    top: 0,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    wordBreak: "break-word",
                  }}
                >
                  <tr
                    style={{
                      backgroundColor: getnavbarbackgroundcolor,
                    }}
                  >
                    <td
                      className="border-dark"
                      style={{
                        ...secondColWidth,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <a style={{ color: "white" }}>Code</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...thirdColWidth,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <a style={{ color: "white" }}>Name</a>
                    </td>

                    <td
                      className="border-dark"
                      style={{
                        ...fifthColWidth,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <a style={{ color: "white" }}>Status</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...sixthColWidth,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <a style={{ color: "white" }}>Menu</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...seventhColWidth,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <a style={{ color: "white" }}>Mobile</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...eighthColWidth,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <a style={{ color: "white" }}>Email</a>
                    </td>

                    <td
                      className="border-dark"
                      style={{
                        ...ninthColWidth,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <a style={{ color: "white" }}>Menu</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...tenthColWidth,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <a style={{ color: "white" }}>User</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...eleventhColWidth,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <a style={{ color: "white" }}>Year</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...twelthColWidth,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <a style={{ color: "white" }}>Branch</a>
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <>
                      <tr>
                        <td colSpan="10" className="text-center">
                          <Spinner animation="border" variant="primary" />
                        </td>
                      </tr>
                      {Array.from({ length: Math.max(0, 30 - 3) }).map(
                        (_, rowIndex) => (
                          <tr key={`blank-${rowIndex}`}>
                            {Array.from({ length: 10 }).map((_, colIndex) => (
                              <td key={`blank-${rowIndex}-${colIndex}`}>
                                &nbsp;
                              </td>
                            ))}
                          </tr>
                        )
                      )}
                    </>
                  ) : (
                    <>
                      {getFilteredTableData().map((item, i) => {
                        totalEntries += 1;

                        return (
                          <tr
                            key={i}
                            style={{
                              fontSize: "12px !important",
                              wordBreak: "break-word",
                              backgroundColor: getcolor,
                              color: fontcolor,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                getnavbarbackgroundcolor;
                              e.currentTarget.style.color = getnavbarfontcolor;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = getcolor;
                              e.currentTarget.style.color = fontcolor;
                            }}
                          >
                            <td
                              className="text-start"
                              style={{
                                ...secondColWidth,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.code}
                            </td>
                            <td
                              className="text-start"
                              style={{
                                ...thirdColWidth,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.description}
                            </td>

                            <td
                              className="text-center"
                              style={{
                                ...fifthColWidth,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.status}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...sixthColWidth,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.menu}
                            </td>
                            <td
                              className="text-end"
                              style={{
                                ...seventhColWidth,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.mobileno}
                            </td>
                            <td
                              className="text-start"
                              style={{
                                ...eighthColWidth,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.email}
                            </td>

                            <td
                              className="text-center"
                              style={{
                                ...ninthColWidth,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Link to={`/AdminCustomerMenu/${item.code}`}>
                                <i
                                  className="fa fa-list fa-xl"
                                  style={{ color: fontcolor }}
                                ></i>
                              </Link>
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...tenthColWidth,
                                color: fontcolor,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Link to={`/AdminUserManagement/${item.code}`}>
                                <i
                                  className="fa fa-user-cog fa-xl"
                                  style={{ color: fontcolor }}
                                ></i>
                              </Link>
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...eleventhColWidth,
                                color: fontcolor,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Link to={`/AdminCusotmerYears/${item.code}`}>
                                <i
                                  className="fa fa-calendar fa-xl"
                                  style={{ color: fontcolor }}
                                ></i>
                              </Link>
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...twelthColWidth,
                                color: fontcolor,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Link to={`/AdminCustomerBranches/${item.code}`}>
                                <i
                                  className="fa fa-code-branch fa-xl"
                                  style={{ color: fontcolor }}
                                ></i>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                      {Array.from({ length: Math.max(0, 20 - 3) }).map(
                        (_, rowIndex) => (
                          <tr
                            key={`blank-${rowIndex}`}
                            style={{
                              backgroundColor: getcolor,
                              color: fontcolor,
                            }}
                          >
                            {Array.from({ length: 10 }).map((_, colIndex) => (
                              <td key={`blank-${rowIndex}-${colIndex}`}>
                                &nbsp;
                              </td>
                            ))}
                          </tr>
                        )
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div
            style={{
              margin: "5px",
              marginBottom: "2px",
            }}
          >
            <SingleButton to="/MainPage" text="Return" />
            <SingleButton
              to="/Customers"
              text="Customer"
           
            />
          </div>
        </div>
      </div>
    </>
  );
}
