import React, { useState, useEffect, useRef } from "react";
import { Container, Spinner, Nav } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../../../../../ThemeContext";
import {
  isLoggedIn,
  getUserData,
  getOrganisationData,
} from "../../../../../Auth";
import NavComponent from "../../../../Navform/navbarform";
import "./AdminUserManagement.css";
import SingleButton from "../../../../Button/SingleButton/SingleButton";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchGetCrystalCustomer,
  fetchGetUser,
} from "../../../../../Redux/action";
import AdminUserManagementModal from "./AdminUserManagementModal";
export default function AdminUserManagement() {
  const dispatch = useDispatch();
  const { code } = useParams();
  const {
    data: userdata,
    loading,
    error,
  } = useSelector((state) => state.getuser);

  useEffect(() => {
    dispatch(fetchGetUser(code));
  }, [code]);

  useEffect(() => {
    return () => {
      dispatch({ type: "FETCH_GETUSER_SUCCESS", payload: { data: [] } });
    };
  }, []);
  const user = getUserData();
  const organisation = getOrganisationData();
  const tableTopColor = "#3368B5";
  const tableHeadColor = "#3368b5";
  const secondaryColor = "white";
  const btnColor = "#3368B5";
  const textColor = "white";
  const {
    isSidebarVisible,
    toggleSidebar,
    getcolor,getnavbarbackgroundcolor,
    fontcolor,
    toggleChangeColor,
  } = useTheme();
  const [tableData, setTableData] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedcode, setSelectedCode] = useState("CRYSTAL");

  useEffect(() => {
    console.log(userdata, "==============code===============", code);
    setTableData(userdata);
  }, [dispatch, code]);

  const handleSearch = (e) => {
    setSelectedSearch(e.target.value);
  };

  let totalEntries = 0;

  const getFilteredTableData = () => {
    let filteredData = userdata;

    if (selectedSearch.trim() !== "") {
      const query = selectedSearch.trim().toLowerCase();
      filteredData = filteredData.filter(
        (data) =>
          (data.tusrnam && data.tusrnam.toLowerCase().includes(query)) ||
          (data.tusrid && data.tusrid.toLowerCase().includes(query))
      );
    }

    return filteredData;
  };

  const tableWidth = 1200;
  const secondColWidth = { width: `${0.07 * tableWidth}px` };
  const thirdColWidth = { width: `${0.26 * tableWidth}px` };
  const fifthColWidth = { width: `${0.08 * tableWidth}px` };
  const sixthColWidth = { width: `${0.08 * tableWidth}px` };
  const seventhColWidth = { width: `${0.08 * tableWidth}px` };
  const eighthColWidth = { width: `${0.15 * tableWidth}px` };
  const ninthColWidth = { width: `${0.06 * tableWidth}px` };
  const tenthColWidth = { width: `${0.06 * tableWidth}px` };
  const eleventhColWidth = { width: `${0.08 * tableWidth}px` };
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

  const contentStyle = {
    backgroundColor: getcolor,
    height: "100vh",
    width: isSidebarVisible ? "calc(100vw - 5%)" : "100vw",
    position: "relative",
    top: "50%",
    left: isSidebarVisible ? "50%" : "50%",
    transform: "translate(-50%, -50%)",
    transition: isSidebarVisible
      ? "left 3s ease-in-out, width 2s ease-in-out"
      : "left 3s ease-in-out, width 2s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    overflowX: "hidden",
    overflowY: "hidden",
    wordBreak: "break-word",
    textAlign: "center",
    maxWidth: "1100px",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "23px",
    fontFamily: '"Poppins", sans-serif',
  };

  const SearchBox = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleRowClick = async (selectedItem, rowIndex) => {
    console.log("handleRowClickAccount", selectedItem);
    await dispatch(fetchGetUser(selectedItem.code));
    // setSelectedCode(selectedItem.code);
    console.log("selectedCode", selectedItem.code);

    if (userdata && userdata.length > 0) {
      setTableData(userdata);
    }
    setModalOpen(false);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDoubleClick = (e) => {
    setTimeout(() => {
      SearchBox.current.focus();
    }, 500);
    setModalOpen(true);
  };
  const {
    data: crystalCustomerData,
    loading: crystalCustomerLoading,
    error: crystalCustomerError,
  } = useSelector((state) => state.getcrystalcustomer);
  const [dataaa, setDataaa] = useState([]);

  // Only fetch once when component mounts
  useEffect(() => {
    console.log("customerlist", crystalCustomerData);
    setTimeout(() => {
      console.log("customerlist", crystalCustomerData);
    }, 3000);
    if (crystalCustomerData?.length === 0) {
      dispatch(fetchGetCrystalCustomer());
    }
  }, [dispatch]);

  useEffect(() => {
    setDataaa(crystalCustomerData);
  }, [crystalCustomerData]);

  return (
    <>
      <div style={contentStyle}>
        <div
          style={{
            backgroundColor: getcolor,
            color: fontcolor,
            width: "100%",
            border: `1px solid ${fontcolor}`,
            borderRadius: "9px",
          }}
        >
          <NavComponent textdata={`UserManagement (${code})`} />
          <div className="my-1 mx-3 row">
            <div className="col-4">
              <label className="col-3 text-end">
                <strong>Search: &nbsp;&nbsp;</strong>
              </label>
              <input
                type="text"
                className="col-9"
                onChange={handleSearch}
                placeholder="Search by Name"
                value={selectedSearch}
                style={{
                  height: "22px",
                  // fontSize: "0.8rem",
                  backgroundColor: getcolor,
                  border: `1px solid ${fontcolor}`,
                  color: fontcolor,
                  "::placeholder": {
                    color: "white",
                    opacity: 5,
                  },
                }}
              />
            </div>
            <div className="col-4"></div>
            <div className="col-4">{code}</div>
          </div>
          <div>
            <div
              style={{
                backgroundColor: textColor,
                borderBottom: `1px solid ${fontcolor}`,
                overflowY: getFilteredTableData.length > 10 ? "auto" : "hidden",
                maxHeight: "59vh",
                width: "100%",
                wordBreak: "break-word",
              }}
            >
              {/* // */}
              <table
                className="custom-table-file"
                id="table"
                style={{
                  width: "100%",
                  position: "relative",
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
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>UserId</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...thirdColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Name</a>
                    </td>

                    <td
                      className="border-dark"
                      style={{
                        ...fifthColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Status</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...sixthColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Type</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...seventhColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Mobile</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...eighthColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Email</a>
                    </td>

                    <td
                      className="border-dark"
                      style={{
                        ...ninthColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Menu</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...tenthColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Year</a>
                    </td>
                    <td
                      className="border-dark"
                      style={{
                        ...eleventhColWidth,
                        wordBreak: "break-word",
                      }}
                    >
                      <a style={{ color: "white" }}>Branches</a>
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
                            {Array.from({ length: 9 }).map((_, colIndex) => (
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
                          >
                            <td
                              className="text-start"
                              style={{
                                ...secondColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.tusrid}
                            </td>
                            <td
                              className="text-start"
                              style={{
                                ...thirdColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                              title={item.tusrnam || ""}
                            >
                              {item.tusrnam
                                ? item.tusrnam.length > 25
                                  ? item.tusrnam.slice(0, 25) + "..."
                                  : item.tusrnam
                                : ""}
                            </td>

                            <td
                              className="text-center"
                              style={{
                                ...fifthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.Status === "A"
                                ? "Active"
                                : item.Status === "C"
                                ? "Cancel"
                                : item.Status === "S"
                                ? "Suspended"
                                : item.Status}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...sixthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.Type === "A"
                                ? "Admin"
                                : item.Type === "S"
                                ? "Super User"
                                : item.Type === "U"
                                ? "User"
                                : item.Type === "G"
                                ? "Guest"
                                : item.Type}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...seventhColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.Mobile}
                            </td>
                            <td
                              className="text-start"
                              style={{
                                ...eighthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              {item.Email}
                            </td>

                            <td
                              className="text-center"
                              style={{
                                ...ninthColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              <Link
                                to={`/AdminMenuUser/${item.tusrid}/${code}`}
                              >
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
                                wordBreak: "break-word",
                              }}
                            >
                              <Link
                                to={`/AdminYearUser/${item.tusrid}/${code}`}
                              >
                                <i
                                  className="fa fa-calendar fa-xl"
                                  style={{ color: fontcolor }}
                                ></i>
                              </Link>
                            </td>
                            <td
                              className="text-center"
                              style={{
                                ...eleventhColWidth,
                                color: fontcolor,
                                wordBreak: "break-word",
                              }}
                            >
                              <Link
                                to={`/AdminBranchesUser/${item.tusrid}/${code}`}
                              >
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
                            {Array.from({ length: 9 }).map((_, colIndex) => (
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
            <SingleButton to="/AdminCustomers" text="Return" />
            <SingleButton to={`/AdminAddUser/${code}`} text="User" />
            {/* <SingleButton
              onClick={handleDoubleClick}
              text=" Company"
              style={{ backgroundColor: "#186DB7", width: "120px" }}
            /> */}
            <AdminUserManagementModal
              isOpen={isModalOpen}
              handleClose={handleCloseModal}
              title="Select Customer"
              technicians={crystalCustomerData}
              searchRef={SearchBox}
              handleRowClick={handleRowClick}
              firstColKey="code"
              secondColKey="description"
            />
          </div>
        </div>
      </div>
    </>
  );
}
// sdf
