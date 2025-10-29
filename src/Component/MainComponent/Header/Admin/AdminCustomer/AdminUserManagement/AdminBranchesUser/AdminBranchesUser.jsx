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
import "./AdminBranchesUser.css";
import SingleButton from "../../../../../Button/SingleButton/SingleButton";
import {
  fetchGetActiveLocation,
  fetchGetActiveUserLocation,
  fetchGetUser,
  fetchMenu,
} from "../../../../../../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataGetAciveLocation } from "../../../../../../Redux/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBranchesUser = () => {
  const { tusrid, code } = useParams();
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
    dispatch(fetchGetUser(code));
  }, [dispatch, code]);

  useEffect(() => {
    fetchDataForUserId(tusrid);
  }, [activeTab]);

  const {
    isSidebarVisible,
    toggleSidebar,
    getcolor,
    getnavbarbackgroundcolor,
    fontcolor,
    getnavbarfontcolor,
    toggleChangeColor,
  } = useTheme();

  function fetchDataForUserId() {
    dispatch(fetchGetActiveUserLocation(user.tusrid, code));
    console.log("call the api");
    const apiUrl = `${apiLinks}/GetActiveLocations.php`;
    const data = { FUsrId: tusrid, code: code };
    const formData = new URLSearchParams(data).toString();

    return axios
      .post(apiUrl, formData)
      .then((response) => {
        const apiData = response.data;
        console.log("=====================apiData:", code, tusrid, apiData);

        const transformedData = apiData.map((item) => ({
          Sr: item.id,
          Description: item.tlocdsc,
          Name: item.tlocadd,
          Permission: (
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
              value={item.tlocsts}
              onChange={(e) =>
                handlePermissionChange(item.tloccod, e.target.value)
              }
            >
              <option value="A">Active</option>
              <option value="N">Not Active</option>
            </select>
          ),
        }));

        const columns = [
          { label: "Sr", field: "Sr", sort: "asc" },
          { label: "Description", field: "Description", sort: "asc" },
          { label: "Name", field: "Name", sort: "asc" },
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
    const apiUrl = `${apiLinks}/SaveUserLocation.php`;
    const data = {
      code: code,
      FUsrId: tusrid,
      FLocCod: users.mcode,
      FLocSts: users.permission,
    };
    console.log("Data:", data);
    const formData = new URLSearchParams(data).toString();

    return axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log("Update response:", response.data);
        fetchDataForUserId();
        console.log("Update response:", tusrid, code);
        dispatch(fetchGetActiveLocation(code));
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
    const newPermission = toggleState ? "A" : "N";
    const updatedRows = getdata.rows.map((row) => {
      return {
        ...row,
        Permissions: (
          <select
            value={newPermission}
            onChange={(e) => handlePermissionChange(row.id, e.target.value)}
            className="form-select"
          >
            <option value="A">Active</option>
            <option value="N">Not Active</option>
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
  useEffect(() => {
    document.documentElement.style.setProperty("--font-color", fontcolor);
  }, [fontcolor]);
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--backgroundcolor-color",
      getcolor
    );
  }, [getcolor]);

  return (
    <>
      <ToastContainer />
      <div>
        <div style={contentStyle}>
          <div
            style={{
              width: "50vw",
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
            <NavComponent textdata={`Location Management (${tusrid})`} />
            <br />
            <Tabs
              activeKey={activeTab.toString()}
              onSelect={(k) => handleTabClick(parseInt(k))}
              id="fill-tab-example"
              fill
              style={{ backgroundColor: getnavbarbackgroundcolor }}
            >
              {[`${userName}`].map((tabLabel, index) => (
                <Tab
                  eventKey={index + 1}
                  title={
                    <span style={{ color: "white", fontSize: "11px", backgroundColor: getnavbarbackgroundcolor }}>
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
                          height: "40px",
                          position: "sticky",
                          top: 0,
                          backgroundColor: getnavbarbackgroundcolor,
                          color: "#fff",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <tr>
                          {getdata.columns.map((column, index) => (
                            <th
                              key={index}
                              style={{
                                width: column.field === "Sr" ? "60px" : "auto",
                                padding: "10px",
                                textAlign: "center",
                                height: "40px",
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
                              // color: "black",
                            }}
                          >
                            {Object.keys(row).map((key, index) => (
                              <td
                                key={index}
                                style={{
                                  fontSize: "14px",
                                  padding: "10px",
                                  width:
                                    index === 0
                                      ? "5%"
                                      : index === 1
                                      ? "20%"
                                      : index === 2
                                      ? "39%"
                                      : index === 3
                                      ? "8%"
                                      : "20%",

                                  textAlign:
                                    index === 0
                                      ? "center"
                                      : index === 1
                                      ? "left"
                                      : index === 2
                                      ? "left"
                                      : index === 3
                                      ? "center"
                                      : "center%",
                                  height: "40px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                                title={
                                  row[key].length > 30 ? row[key] : undefined
                                }
                              >
                                {row[key].length > 30
                                  ? `${row[key].substr(0, 40)}...`
                                  : row[key]}
                              </td>
                            ))}
                          </tr>
                        ))}
                        {Array.from({ length: Math.max(0, 20 - 3) }).map(
                          (_, rowIndex) => (
                            <tr
                              key={`blank-${rowIndex}`}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  getnavbarbackgroundcolor)
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  getcolor)
                              }
                              style={{
                                fontSize: "14px",
                                padding: "10px",
                                width:
                                  index === 0
                                    ? "5%"
                                    : index === 1
                                    ? "20%"
                                    : index === 2
                                    ? "30%"
                                    : index === 3
                                    ? "15%"
                                    : "20%",
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
              ))}
            </Tabs>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SingleButton
                to="/UserManagement"
                text="Return"
              />
              <SingleButton
                to="/AddUser1"
                text="User"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBranchesUser;
