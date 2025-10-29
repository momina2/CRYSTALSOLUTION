import React, { useState, useEffect } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Alert from "@mui/material/Alert";
import { useTheme } from "../../../../../../../ThemeContext";
import {
  isLoggedIn,
  getUserData,
  getOrganisationData,
} from "../../../../../../Auth";
import NavComponent from "../../../../../Navform/navbarform";
import "./AdminCustomerMenu.css";
import SingleButton from "../../../../../Button/SingleButton/SingleButton";
import { fetchGetUser, fetchMenu } from "../../../../../../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminCustomerMenu = () => {
  const { code } = useParams();
  const tusrid = "";
  const user = getUserData();
  const organisation = getOrganisationData();
  const { apiLinks } = useTheme();
  const [activeTab, setActiveTab] = useState(1);
  const [getdata, setData] = useState({ columns: [], rows: [] });
  const [showAlert, setShowAlert] = useState(false);
  const [allPermissionsY, setAllPermissionsY] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [toggleState, setToggleState] = useState(true);
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState(null);
  const { data, loading, error } = useSelector((state) => state.getuser);
  const dispatch = useDispatch();
  useEffect(() => {
    const userr = data.find((item) => item.tusrid === tusrid);
    setUserName(userr && userr.tusrnam);
    setUserType(userr && userr.Type);
    dispatch(fetchGetUser(organisation.code));
  }, [dispatch, organisation.code]);

  useEffect(() => {
    fetchDataForUserId(tusrid);
  }, [activeTab]);

  const {
    isSidebarVisible,
    toggleSidebar,
    getcolor,
    getnavbarbackgroundcolor,
    fontcolor,
    toggleChangeColor,
    getnavbarfontcolor,
  } = useTheme();

  function fetchDataForUserId() {
    console.log("call the api");
    const apiUrl = `${apiLinks}/GetCrystalMenu.php`;
    const data = { code: code };
    const formData = new URLSearchParams(data).toString();

    return axios
      .post(apiUrl, formData)
      .then((response) => {
        const apiData = response.data;

        if (!Array.isArray(apiData)) {
          console.error("Expected apiData to be an array, but got:", apiData);
          alert(
            "Unexpected response format from the API. Check the console for details."
          );
          return;
        }

        const subItems = apiData.filter((subItem) => {
          return subItem.tmencod.startsWith(`${activeTab}0-`);
        });

        if (subItems.length === 0) {
          console.log("No data found for tab:", activeTab);

          setData({
            columns: [
              { label: "Sr", field: "Sr", sort: "asc" },
              { label: "Description", field: "Description", sort: "asc" },
              { label: "URL", field: "Description", sort: "asc" },
              { label: "Permissions", field: "Permissions", sort: "asc" },
            ],
            rows: [],
          });

          return;
        }

        const transformedData = subItems.map((item) => ({
          Sr: item.tmencod,
          Description: item.tmendsc,
          Links: item.tmenurl,
          Permissions: (
            <select
              style={{
                height: "20px",
                fontSize: "12px",
                padding: "0px",
                textAlign: "center",
                color: fontcolor,
                backgroundColor: getcolor,
                border: "1px solid #ccc",
              }}
              value={item.tmenpem}
              onChange={(e) =>
                handlePermissionChange(item.tmencod, e.target.value)
              }
            >
              <option value="Y">Yes</option>
              <option value="N">No</option>
              <option value="S">Skip</option>
            </select>
          ),
        }));

        const columns = [
          { label: "Sr", field: "Sr", sort: "asc" },
          { label: "Description", field: "Description", sort: "asc" },
          { label: "Links", field: "Links", sort: "asc" },
          { label: "Permissions", field: "Permissions", sort: "asc" },
        ];

        setData({ columns, rows: transformedData });
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert(
          "An error occurred while fetching data. Check the console for details."
        );
        throw error;
      });
  }

  useEffect(() => {
    fetchDataForUserId();
  }, []);

  function handlePermissionChange(menuCode, newPermissionValue) {
    Update_Menu({ id: tusrid, mcode: menuCode, permission: newPermissionValue })
      .then(() => {
        fetchDataForUserId(tusrid);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function Update_Menu(users) {
    const apiUrl = `${apiLinks}/SaveCrystalPermission.php`;
    const data = {
      code: code,
      FUsrId: tusrid,
      FMenCod: users.mcode,
      FMenPem: users.permission,
    };
    console.log("Data:", data);
    const formData = new URLSearchParams(data).toString();

    return axios
      .post(apiUrl, formData)
      .then((response) => {
        fetchDataForUserId();
        console.log(
          "Update response:",
          response.data,
          user.userid,
          organisation.code
        );
        dispatch(fetchMenu(user.tusrid, organisation.code));
        toast.success(`${response.data.message}`, {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  const handleDoubleClick = () => {
    const newPermission = toggleState ? "Y" : "N";
    const updatedRows = getdata.rows.map((row) => {
      return {
        ...row,
        Permissions: (
          <select
            value={newPermission}
            onChange={(e) =>
              handlePermissionChange(row.tmencod, e.target.value)
            }
            className="form-select"
          >
            <option value="Y">Yes</option>
            <option value="N">No</option>

            <option value="S">Skip</option>
          </select>
        ),
      };
    });
    setData({ ...getdata, rows: updatedRows });
    setToggleState(!toggleState);
  };

  const submit = () => {};

  function handleTabClick(tabNumber) {
    console.log("Tab clicked:", tabNumber);
    setActiveTab(tabNumber);
  }

  const contentStyle = {
    top: `calc(52% - ${window.innerHeight * 0}px)`,
    backgroundColor: getcolor,
    height: "100vh",
    width: isSidebarVisible ? "calc(100vw - 5vw)" : "100vw",
    marginLeft: isSidebarVisible ? "5vw" : "25vh",
    transition: isSidebarVisible
      ? "margin-left 2s ease-in-out, margin-right 2s ease-in-out"
      : "margin-left 2s ease-in-out, margin-right 2s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    overflowX: "hidden",
    overflowY: "hidden",
    wordBreak: "break-word",
    textAlign: "center",
    maxWidth: "1000px",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "23px",
    fontFamily: '"Poppins", sans-serif',
  };
  useEffect(() => {
    document.documentElement.style.setProperty("--font-color", fontcolor);
  }, [fontcolor]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--backgroundcolor-color",
      getcolor
    );
  }, [getcolor]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--headercolor-color",
      getnavbarbackgroundcolor
    );
  }, [getnavbarbackgroundcolor]);
  const className = isSidebarVisible
    ? "sidebarcustomermenu-visible"
    : "sidebarcustomermenu-hidden";
  return (
    <>
      <ToastContainer />

      <div className={`contentCustomerMenuStyle ${className}`}>
        <div
          style={{
            width: "55vw",
            height: "73vh",
            border: `1px solid ${fontcolor}`,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: getcolor,
            color: fontcolor,
          }}
        >
          <NavComponent textdata={`Admin Customer Menu ${code}`} />
          <br />
          <Tabs
            activeKey={activeTab.toString()}
            onSelect={(k) => handleTabClick(parseInt(k))}
            id="fill-tab-example"
            fill
            style={{ backgroundColor: "#5aa4f2" }}
          >
            {["Dashboard", "Files", "Transactions", "Reports", "Utilities"].map(
              (tabLabel, index) => (
                <Tab
                  eventKey={index + 1}
                  title={
                    <span style={{ color: "white", fontSize: "11px" }}>
                      {tabLabel}
                    </span>
                  }
                  key={index + 1}
                >
                  <div
                    style={{
                      overflowY: getdata.rows.length > 10 ? "auto" : "hidden",
                    }}
                    className="custom-scrollbar-user"
                  >
                    <table
                      className="myTable"
                      style={{
                        fontSize: "14px",
                        width: "100%",
                        borderCollapse: "collapse",
                        backgroundColor: getcolor,
                      }}
                    >
                      <thead
                        style={{
                          fontWeight: "bold",
                          height: "24px",
                          position: "sticky",
                          top: 0,
                          backgroundColor: "#3368b5",
                          color: "#fff",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <tr>
                          {getdata.columns.map((column, index) => (
                            <th
                              key={index}
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: column.field === "Sr" ? "60px" : "auto",
                                textAlign: "center",
                                height: "16px",
                                lineHeight: "16px",
                              }}
                              onDoubleClick={
                                column.field === "Permissions"
                                  ? handleDoubleClick
                                  : null
                              }
                            >
                              {column.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {getdata.rows.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                getnavbarbackgroundcolor;
                              e.currentTarget.style.color = getnavbarfontcolor;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = getcolor;
                              e.currentTarget.style.color = fontcolor;
                            }}
                            style={{
                              height: "40px",
                              borderBottom: "1px solid #ddd",
                              backgroundColor: getcolor,
                              color: fontcolor,
                            }}
                          >
                            <td
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "14px",
                                padding: "10px",
                                width: "12%",
                                textAlign: "center",
                                height: "40px",
                              }}
                            >
                              {row["Sr"]}
                            </td>

                            <td
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "14px",
                                padding: "10px",
                                width: "39%",

                                textAlign: "left",
                                backgroundColor: row["Sr"].endsWith("-000")
                                  ? getnavbarbackgroundcolor
                                  : "",
                                color: row["Sr"].endsWith("-000")
                                  ? getnavbarfontcolor
                                  : "",
                                height: "40px",
                                // color: fontcolor,
                              }}
                            >
                              {row["Sr"].endsWith("-000")
                                ? "---" + row["Description"]
                                : row["Sr"].split("-")[1] === "000"
                                ? " ----- " + row["Description"]
                                : "---------- " + row["Description"]}
                            </td>
                            <td
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "14px",
                                padding: "10px",
                                width: "37%",
                                textAlign: "left",
                                // backgroundColor: getcolor,
                                height: "40px",
                              }}
                            >
                              {row["Links"]}
                            </td>
                            <td
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "14px",
                                padding: "10px",
                                width: "12%",
                                textAlign: "center",
                                // backgroundColor: getcolor,
                                height: "40px",
                              }}
                            >
                              {row["Permissions"]}
                            </td>
                          </tr>
                        ))}
                        {Array.from({ length: Math.max(0, 20 - 3) }).map(
                          (_, rowIndex) => (
                            <tr
                              key={`blank-${rowIndex}`}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  getnavbarbackgroundcolor;
                                e.currentTarget.style.color =
                                  getnavbarfontcolor;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  getcolor;
                                e.currentTarget.style.color = fontcolor;
                              }}
                              style={{
                                fontSize: "14px",
                                padding: "10px",
                                width:
                                  index === 0
                                    ? "20%"
                                    : index === 1
                                    ? "30%"
                                    : index === 2
                                    ? "15%"
                                    : "25%",
                                backgroundColor: getcolor,
                                height: "40px",
                                color: fontcolor,
                              }}
                            >
                              {Array.from({ length: 4 }).map((_, colIndex) => (
                                <td key={`blank-${rowIndex}-${colIndex}`}>
                                  &nbsp;
                                </td>
                              ))}
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </Tab>
              )
            )}
          </Tabs>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SingleButton to="/AdminCustomers" text="Return" />
            <SingleButton to="/AddUser1" text="User" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCustomerMenu;
