import { Form } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AdminAddUser.css";
import NavComponent from "../../../../../Navform/navbarform";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  isLoggedIn,
  getUserData,
  getOrganisationData,
} from "../../../../../../Auth";
import GeneralTwoFieldsModal from "./AdminAddUser_Modal";
import { getcompanyData } from "./AdminAddUser_Api";
import { useMutation } from "@tanstack/react-query";

import { useTheme } from "../../../../../../../ThemeContext";
import ButtonGroup from "../../../../../Button/ButtonGroup/ButtonGroup";
import TwoColumnModel from "../../../../../Models/TwoColumnModel";
function formatToThreeDigits(number) {
  // Convert the number to a string and pad with leading zeros if necessary
  return number.toString().padStart(3, "0");
}
function removeParentDirectories(path) {
  if (typeof path === "string") {
    return path.replace("../../", "");
  }
  console.error("Invalid path:", path);
  return "";
}
function AdminAddUser() {
  const { code } = useParams();
  const user = getUserData();
  const organisation = getOrganisationData();
  const { apiLinks } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    AccountCodeform: "",
    Descriptionform: "",
    UrduFormDescription: "",
    Status: "A",
    inputform4: "",
    inputform5: "",
    inputform6: "A",
    inputform7: "A",
    inputform8: "",
    inputform9: "",
    inputform10: "",
    inputform11: "",
    inputform12: "",
    inputform13: "",
    inputform14: "",
    inputform15: "",
    inputform16: "",
  });
  const [dataa, setDataa] = useState([]);

  const mutation2 = useMutation({
    mutationFn: getcompanyData,
    onSuccess: (data) => {
      const columns = [
        { label: "Code", field: "tacccod", sort: "asc" },
        { label: "Description", field: "taccdsc", sort: "asc" },
        { label: "Status", field: "taccsts", sort: "asc" },
      ];
      if (Array.isArray(data)) {
        setDataa(data);
      } else {
        console.warn(
          "Technicians data is not available or not in the correct format."
        );
      }

      if (data.error === 200) {
      } else {
      }
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const GetDataList = () => {
    const data = {
      code: code,
    };
    mutation2.mutate(data);
  };
  useEffect(() => {
    GetDataList();

    Codefocus();
  }, []);
  const Codefocus = () => {
    if (Code.current) {
      Code.current.focus();
    }
  };
  const [alertData, setAlertData] = useState(null);
  const fontFamily = "verdana";
  const Code = useRef(null);
  const Description = useRef(null);
  const Status = useRef(null);
  const inputform4ref = useRef(null);
  const inputform5ref = useRef(null);
  const inputform6ref = useRef(null);
  const inputform7ref = useRef(null);
  const inputform8ref = useRef(null);
  const inputform9ref = useRef(null);
  const inputform10ref = useRef(null);
  const inputform11ref = useRef(null);
  const inputform12ref = useRef(null);
  const inputform13ref = useRef(null);
  const inputform14ref = useRef(null);
  const inputform15ref = useRef(null);
  const inputform16ref = useRef(null);

  const Submit = useRef(null);
  const Clear = useRef(null);
  const Return = useRef(null);
  const SearchBox = useRef(null);
  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////

  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const [errors, setErrors] = useState({});

  const [selectedImage1, setSelectedImage1] = useState(null);

  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      console.log("file", file);
      const imgElement = document.getElementById("pic1-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };

  const [geturdu, setGeturdu] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // dispatch(fetchGetYear(code));

    const checks = [
      {
        value: formData?.AccountCodeform,
        message: "Please fill your Userid",
      },
      {
        value: formData?.Descriptionform,
        message: "Please fill your User Name",
      },

      // {
      //   value: formData?.Descriptionform,
      //   message: "Please fill your User Name",
      // },
      // {
      //   value: formData?.inputform8,
      //   message: "Please select your Status",
      // },
      // {
      //   value: formData?.inputform9,
      //   message: "Please select your Type",
      // },
    ];

    for (const check of checks) {
      if (!check.value) {
        setAlertData({
          type: "error",
          message: check.message,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 3000);
        return;
      }
    }
    const data = {
      AccountCodeform: formData.AccountCodeform,
      Descriptionform: formData.Descriptionform,
      inputform4: formData.inputform4,
      inputform5: formData.inputform5,
      inputform6: formData.inputform6,
      inputform7: formData.inputform7,
      inputform8: formData.inputform8,
      inputform9: formData.inputform9,
      inputform10: formData.inputform10,
      inputform11: formData.inputform11,
      inputform12: formData.inputform12,
      inputform13: formData.inputform13,
      inputform14: formData.inputform14,
    };
    console.log(data, "data");
    // Prepare form data for submission
    const formDataa = new FormData();
    formDataa.append("FUsrId", formData.AccountCodeform);
    formDataa.append("FUsrNam", formData.Descriptionform);
    formDataa.append("FUsrPwd", formData.inputform4);
    formDataa.append("FPwdExp", formData.inputform5);
    formDataa.append("FUsrTyp", formData.inputform6);
    formDataa.append("FUsrSts", formData.inputform7);
    formDataa.append("FMobNum", formData.inputform8);
    formDataa.append("FEmlAdd", formData.inputform9);
    formDataa.append("FCshCod", formData.inputform10);
    formDataa.append("FStrCod", formData.inputform11);
    formDataa.append("FEmpCod", formData.inputform12);
    formDataa.append("FTimFrm", formData.inputform13);
    formDataa.append("FTimToo", formData.inputform14);
    formDataa.append("FUsrCtg", formData.inputform15);
    formDataa.append("FCtgCod", formData.inputform16);

    formDataa.append("code", code);
    formDataa.append("FCurUsr", user.tusrid);
    console.log("Submitting Form Data:", formDataa);
    // formDataa.append("FUsrSts", formData.Status);
    // formDataa.append("FUrdDsc", geturdu);
    try {
      const response = await axios.post(`${apiLinks}/SaveUser.php`, formDataa, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response);

      if (response.data.error === 200) {
        GetDataList();
        Codefocus();
        Code.current.focus();

        setFormData({
          ...formData,
          AccountCodeform: "",
          Descriptionform: "",
          Status: "A",
          inputform4: "",
          inputform5: "",
          inputform6: "A",
          inputform7: "A",
          inputform8: "",
          inputform9: "",
          inputform10: "",
          inputform11: "",
          inputform12: "",
          inputform13: "",
          inputform14: "",
          inputform15: "",
          inputform16: "",
        });

        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 1000);
      } else {
        setAlertData({
          type: "error",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertData({
        type: "error",
        message: "Form submission failed. Please try again.",
      });
      setTimeout(() => {
        setAlertData(null);
      }, 2000);
    } finally {
      console.log("Form submission process completed.");
    }
  };

  // Function to handle Enter key press
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key press
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const [textdata, settextdata] = useState("Admin UserManagement ");

  const handleCloseModal = () => {
    GetDataList();
    setData({ columns: [], rows: [] });
    setSearchText("");
    setHighlightedRowIndex(0);
    settextdata("Admin UserManagement");

    setModalOpen(false);
  };

  const handleDoubleClick = (e) => {
    focusNextInput(Code);
    console.log("====== handle double click=======");
    // setSearchText(e.target.value);
    setModalOpen(true);
  };

  const handleBlurRVC = (e) => {
    // Convert nextItemId to string before calling padStart
    const value = String(formData.AccountCodeform).padStart(3, "0");
    console.log("dataa item:", dataa);

    setFormData({
      ...formData,
      AccountCodeform: value,
    });
    console.log("value", value);
    setTimeout(() => {
      const selectedItem = dataa.find((item) => item.tusrid === value);

      console.log("Selected item:", selectedItem);

      if (selectedItem) {
        setFormData({
          ...formData,
          AccountCodeform: selectedItem.tusrid || "",
          Descriptionform: selectedItem.tusrnam || "",
          inputform4: selectedItem.Password || "",
          inputform5: selectedItem.Expiry || "",
          inputform6: selectedItem.Type || "",
          inputform7: selectedItem.Status || "",
          inputform8: selectedItem.Mobile || "",
          inputform9: selectedItem.Email || "",
          inputform10: selectedItem["Cash Code"] || "",
          inputform11: selectedItem["Store Code"] || "",
          inputform12: selectedItem["Emp Code"] || "",
          inputform13: selectedItem["Time From"] || "",
          inputform14: selectedItem["Time Too"] || "",
          inputform15: selectedItem["User Category"] || "",
          inputform16: selectedItem["Category Code"] || "",
        });
        handlePrediction(selectedItem.tusrnam).then((result) => {
          setGeturdu(result);
        });
      } else {
        setFormData({
          ...formData,
          Descriptionform: "",
          Status: "A",
          inputform4: "",
          inputform5: "",
          inputform6: "A",
          inputform7: "A",
          inputform8: "",
          inputform9: "",
          inputform10: "",
          inputform11: "",
          inputform12: "",
          inputform13: "",
          inputform14: "",
          inputform15: "",
          inputform16: "",
        });
      }
    }, 500);
  };
  const handleInputChangefetchdata = async (e) => {
    console.log("show the value is:", e.target.value);
    let inputValue = e.target.value;
    setFormData({
      ...formData,
      AccountCodeform: e.target.value,
    });
  };

  const handlePrediction = async (name) => {
    const url = "https://rehman1603-english-to-urdu.hf.space/run/predict";
    const payload = {
      data: [name],
    };

    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(response, "response");

      if (response.status === 200) {
        const result = response.data.data[0];

        console.log(result, "result");
        return result; // Return the result for use in the calling function
      } else {
        console.error("Failed to fetch prediction");
        return null; // Return null or some default value if the request failed
      }
    } catch (error) {
      console.error("Error during prediction:", error);
      return null; // Return null or some default value in case of an error
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value;

    if (name === "Descriptionform") {
      console.log("Searching for:", formattedValue);
      const capitalletter = value.toUpperCase();
      setFormData({
        ...formData,
        Descriptionform: capitalletter,
      });
      handlePrediction(capitalletter).then((result) => {
        setGeturdu(result);
        console.log("resulttttttttttt");
      });
    }
    if (name === "inputform11") {
      const lowercaseValue = value;
      setFormData({
        ...formData,
        inputform11: lowercaseValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    if (name === "UrduFormDescription") {
      console.log("Searching for:", formattedValue);
      setGeturdu(formattedValue);
    }
    if (name === "AccountCodeform") {
      console.log("Searching for:", value);

      const selectedItem = dataa.find((item) => item.tusrid === value);

      console.log("Selected item:", selectedItem);

      if (selectedItem) {
        setFormData({
          ...formData,
          AccountCodeform: selectedItem.tusrid || "",
          Descriptionform: selectedItem.tusrnam || "",
          inputform4: selectedItem.Password || "",
          inputform5: selectedItem.Expiry || "",
          inputform6: selectedItem.Type || "",
          inputform7: selectedItem.Status || "",
          inputform8: selectedItem.Mobile || "",
          inputform9: selectedItem.Email || "",
          inputform10: selectedItem["Cash Code"] || "",
          inputform11: selectedItem["Store Code"] || "",
          inputform12: selectedItem["Emp Code"] || "",
          inputform13: selectedItem["Time From"] || "",
          inputform14: selectedItem["Time Too"] || "",
          inputform15: selectedItem["User Category"] || "",
          inputform16: selectedItem["Category Code"] || "",
        });
        handlePrediction(selectedItem.tcmpdsc).then((result) => {
          setGeturdu(result);
        });
      } else {
        setFormData({
          ...formData,
          Descriptionform: "",
          Status: "A",
          inputform4: "",
          inputform5: "",
          inputform6: "A",
          inputform7: "A",
          inputform8: "",
          inputform9: "",
          inputform10: "",
          inputform11: "",
          inputform12: "",
          inputform13: "",
          inputform14: "",
          inputform15: "",
          inputform16: "",
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    }
  };

  const resetData = () => {
    setData({ columns: [], rows: [] });
    setSearchText("");
  };
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);
  const handleRowClick = (selectedItem, rowIndex) => {
    console.log("handleRowClickAccount", selectedItem);
    setModalOpen(false);
    setFormData({
      ...formData,
      AccountCodeform: selectedItem.tusrid || "",
      Descriptionform: selectedItem.tusrnam || "",
      inputform4: selectedItem.Password || "",
      inputform5: selectedItem.Expiry || "",
      inputform6: selectedItem.Type || "",
      inputform7: selectedItem.Status || "",
      inputform8: selectedItem.Mobile || "",
      inputform9: selectedItem.Email || "",
      inputform10: selectedItem["Cash Code"] || "",
      inputform11: selectedItem["Store Code"] || "",
      inputform12: selectedItem["Emp Code"] || "",
      inputform13: selectedItem["Time From"] || "",
      inputform14: selectedItem["Time Too"] || "",
      inputform15: selectedItem["User Category"] || "",
      inputform16: selectedItem["Category Code"] || "",
    });
    handlePrediction(selectedItem.tusrnam).then((result) => {
      setGeturdu(result);
    });

    settextdata("Admin User Management");

    resetData();
  };

  const handleFocus = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "orange";
    }
  };

  const handleSave = () => {
    handleFormSubmit();
  };
  const handleClear = () => {
    setFormData({
      ...formData,
      Descriptionform: "",
      Status: "A",
      inputform4: "",
      inputform5: "",
      inputform6: "A",
      inputform7: "A",
      inputform8: "",
      inputform9: "",
      inputform10: "",
      inputform11: "",
      inputform12: "",
      inputform13: "",
      inputform14: "",
      inputform15: "",
      inputform16: "",
    });

    if (Code.current) {
      Code.current.focus();
    }
  };

  const handleReturn = () => {
    navigate(`/AdminCustomers`);
  };

  const handleBlur = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "#3368B5";
    }
  };
  const {
    isSidebarVisible,
    toggleSidebar,
    getcolor,
    fontcolor,
    toggleChangeColor,
    getdatafontsize,
    getfontstyle,
    getnavbarbackgroundcolor,
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
    document.documentElement.style.setProperty("--font-color", fontcolor);
  }, [fontcolor]);
  return (
    <>
      <div
        style={{
          backgroundColor: getcolor,
          height: "100vh",
          width: "80vw",
          overflowX: "hidden",
          overflowY: "hidden",
        }}
      >
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%",
              zIndex: 9999, // Ensuring this is very high
              textAlign: "center",
            }}
          >
            {alertData.message}
          </Alert>
        )}
        <div className="contentAdminUsermanagementStyle">
          <div
            className="col-md-12 "
            style={{
              border: `1px solid ${fontcolor}`,
              borderRadius: "9px",
            }}
          >
            <NavComponent textdata={`${textdata}(${code})`} />

            <br />
            <div
              className="contentAdminUserManagementstylescroll"
              onSubmit={handleFormSubmit}
              style={{
                backgroundColor: getcolor,
                color: fontcolor,
              }}
            >
              <div className="row">
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-2 label-field">Userid:</div>
                    <div className="col-sm-3 label-input">
                      <Form.Control
                        type="text"
                        className="form-control-field custom-input"
                        placeholder="Code"
                        name="AccountCodeform"
                        value={formData.AccountCodeform}
                        onChange={(e) =>
                          handleInputChangefetchdata({
                            target: {
                              value: e.target.value.toLowerCase(),
                            },
                          })
                        }
                        maxLength={10}
                        style={{
                          fontSize: "15px",
                          padding: "10px",
                          textAlign: "left",
                          borderRadius: "8px",
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleBlurRVC();
                            handleEnterKeyPress(Description, e);
                            const upperCaseValue = e.target.value.toUpperCase();

                            if (dataa && dataa.length > 0) {
                              const selectedItem = dataa.find(
                                (item) => item.tusrid === upperCaseValue
                              );

                              if (selectedItem) {
                                console.log("selectedItem:", selectedItem);
                                handleEnterKeyPress(Description, e);
                              } else if (upperCaseValue.length < 10) {
                                // setAlertData({
                                //   type: "success",
                                //   message: "Fetch Data",
                                // });
                                // setTimeout(() => {
                                //   setAlertData(null);
                                // }, 3000);
                              } else {
                                handleEnterKeyPress(Description, e);
                              }
                            } else {
                              console.warn(
                                "Data rows are not available or empty."
                              );
                            }
                          }
                        }}
                        onFocus={(e) => {
                          setTimeout(() => {
                            e.target.select();
                          }, 500);
                        }}
                        onDoubleClick={(e) => {
                          handleDoubleClick(e);
                          setTimeout(() => {
                            focusNextInput(SearchBox);
                          }, 100);
                        }}
                        ref={Code}
                      />
                    </div>
                    <div className="col-sm-1"></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Name:</div>
                    <div className="col-sm-10 label-input">
                      <Form.Control
                        type="text"
                        id="Descriptionform"
                        placeholder="Name"
                        name="Descriptionform"
                        className={`form-control-field ${
                          errors.Descriptionform ? "border-red" : ""
                        }`}
                        value={formData.Descriptionform}
                        ref={Description}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(inputform4ref, e)}
                      />
                      {/* <Form.Control
                        type="text"
                        id="UrduFormDescription"
                        placeholder="اردو میں"
                        name="UrduFormDescription"
                        className={`form-control-adduser ${
                          errors.Descriptionform ? "border-red" : ""
                        }`}
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          flex: "1",
                          marginRight: "10px",
                          textAlign: "right",
                          fontFamily: "Noto Nastaliq Urdu",
                          backgroundColor: getcolor,
                          color: fontcolor,
                        }}
                        value={geturdu}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                      /> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Password:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        type="text"
                        id="inputform4"
                        placeholder="Password"
                        name="inputform4"
                        className={`form-control-field ${
                          errors.inputform4 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "left" }}
                        value={formData.inputform4}
                        ref={inputform4ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(inputform5ref, e)}
                      />
                    </div>
                    <div className="col-sm-2 label-field">Pswd Exp:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        type="text"
                        id="inputform5"
                        placeholder="Pswd Exp"
                        name="inputform5"
                        className={`form-control-field ${
                          errors.inputform5 ? "border-red" : ""
                        }`}
                        maxLength={3}
                        style={{ textAlign: "right" }}
                        value={formData.inputform5}
                        ref={inputform5ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(inputform6ref, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Type:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        as="select"
                        name="inputform6"
                        value={formData.inputform6}
                        onChange={handleInputChange}
                        className={`form-control-field ${
                          errors.inputform6 ? "border-red" : ""
                        }`}
                        style={{
                          height: "28px",
                          padding: "0px",
                          paddingLeft: "5px",
                          backgroundColor: getcolor,
                          color: fontcolor,
                        }}
                        onKeyDown={(e) => handleEnterKeyPress(inputform7ref, e)}
                        ref={inputform6ref}
                      >
                        <option
                          style={{
                            backgroundColor: getcolor,
                            color: fontcolor,
                          }}
                          value="A"
                        >
                          Admin
                        </option>
                        <option
                          style={{
                            backgroundColor: getcolor,
                            color: fontcolor,
                          }}
                          value="U"
                        >
                          User
                        </option>
                        <option
                          style={{
                            backgroundColor: getcolor,
                            color: fontcolor,
                          }}
                          value="S"
                        >
                          Super User
                        </option>
                        <option
                          style={{
                            backgroundColor: getcolor,
                            color: fontcolor,
                          }}
                          value="G"
                        >
                          Guest
                        </option>
                      </Form.Control>
                    </div>
                    <div className="col-sm-2 label-field">Status:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        as="select"
                        name="inputform7"
                        value={formData.inputform7}
                        onChange={handleInputChange}
                        className={`form-control-field ${
                          errors.inputform7 ? "border-red" : ""
                        }`}
                        style={{
                          height: "28px",
                          // fontSize: "11px",
                          padding: "0px",
                          paddingLeft: "5px",
                          backgroundColor: getcolor,
                          color: fontcolor,
                        }}
                        onKeyDown={(e) => handleEnterKeyPress(inputform8ref, e)}
                        ref={inputform7ref}
                      >
                        <option
                          style={{
                            backgroundColor: getcolor,
                            color: fontcolor,
                          }}
                          value="A"
                        >
                          Active
                        </option>
                        <option
                          style={{
                            backgroundColor: getcolor,
                            color: fontcolor,
                          }}
                          value="C"
                        >
                          Cancell
                        </option>
                        <option
                          style={{
                            backgroundColor: getcolor,
                            color: fontcolor,
                          }}
                          value="S"
                        >
                          Suspend
                        </option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Mobile:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        type="text"
                        id="inputform8"
                        placeholder="Mobile No"
                        name="inputform8"
                        className={`form-control-field ${
                          errors.inputform8 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "left" }}
                        value={formData.inputform8}
                        maxLength={11}
                        ref={inputform8ref}
                        onFocus={(e) => e.target.select()}
                        // onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(inputform9ref, e)}
                        onChange={(e) => {
                          const value = e.target.value;

                          if (/^\d*$/.test(value)) {
                            if (
                              value.length >= 2 &&
                              value.slice(0, 2) !== "03"
                            ) {
                              setAlertData({
                                type: "error",
                                message: "Mobile number must start with 03",
                              });
                              setTimeout(() => {
                                setAlertData(null);
                              }, 3000);

                              // inputform11ref.current.focus();
                            } else {
                              handleInputChange(e);
                            }
                          } else {
                            setAlertData({
                              type: "error",
                              message:
                                "Only numbers are allowed in the mobile number",
                            });
                            setTimeout(() => {
                              setAlertData(null);
                            }, 3000);
                          }
                        }}
                      />
                    </div>
                    {/* sdfsdff */}
                    <div className="col-sm-2 label-field">Email:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        type="text"
                        id="inputform9"
                        placeholder="Email"
                        name="inputform9"
                        className={`form-control-field ${
                          errors.inputform9 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "left" }}
                        value={formData.inputform9}
                        ref={inputform9ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        // onKeyDown={(e) =>
                        //   handleEnterKeyPress(inputform12ref, e)
                        // }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const emailPattern =
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            const isValidEmail = emailPattern.test(
                              formData.inputform9
                            );

                            if (!isValidEmail) {
                              setAlertData({
                                type: "error",
                                message: "Please enter a valid email address.",
                              });
                              setTimeout(() => {
                                setAlertData(null);
                              }, 3000);

                              e.preventDefault();
                            } else {
                              handleEnterKeyPress(inputform10ref, e);
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Cash Code:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        type="text"
                        id="inputform10"
                        placeholder="Cash Code"
                        name="inputform10"
                        className={`form-control-field ${
                          errors.inputform10 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "left" }}
                        value={formData.inputform10}
                        ref={inputform10ref}
                        maxLength={10}
                        onFocus={(e) => e.target.select()}
                        // onChange={handleInputChange}
                        // onKeyDown={(e) => handleEnterKeyPress(inputform5ref, e)}
                        onChange={(e) => {
                          let value = e.target.value.replace(/[^0-9]/g, "");
                          if (value.length >= 3 && value.length <= 4) {
                            value = value.slice(0, 2) + "-" + value.slice(2);
                          } else if (value.length >= 5) {
                            value =
                              value.slice(0, 2) +
                              "-" +
                              value.slice(2, 4) +
                              "-" +
                              value.slice(4, 8);
                          }

                          handleInputChange({
                            target: { name: "inputform10", value },
                          });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const isValidFormat = /^\d{2}-\d{2}-\d{4}$/.test(
                              formData.inputform10
                            );
                            if (!isValidFormat) {
                              setAlertData({
                                type: "error",
                                message:
                                  "Please complete the code in the format XX-XX-XXXX.",
                              });
                              setTimeout(() => {
                                setAlertData(null);
                              }, 3000);
                              e.preventDefault();
                            } else {
                              handleEnterKeyPress(inputform11ref, e);
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="col-sm-2 label-field">Store Code:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        type="text"
                        id="inputform11"
                        placeholder="Store Code"
                        name="inputform11"
                        className={`form-control-field ${
                          errors.inputform11 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "left" }}
                        value={formData.inputform11}
                        ref={inputform11ref}
                        maxLength={3}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(inputform12ref, e)
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Emp Code:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        type="text"
                        id="inputform12"
                        placeholder="Employee Code"
                        name="inputform12"
                        className={`form-control-field ${
                          errors.inputform12 ? "border-red" : ""
                        }`}
                        maxLength={3}
                        style={{ textAlign: "left" }}
                        value={formData.inputform12}
                        ref={inputform12ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(inputform13ref, e)
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Time From:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        type="text"
                        id="inputform13"
                        placeholder="Time From"
                        name="inputform13"
                        className={`form-control-field ${
                          errors.inputform13 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "right" }}
                        value={formData.inputform13}
                        ref={inputform13ref}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          let timeValue = e.target.value;
                          if (timeValue.length < 6) {
                            timeValue = timeValue.replace(/:/g, "");
                            setFormData({
                              ...formData,
                              [e.target.name]: timeValue,
                            });
                            if (timeValue.length >= 2) {
                              timeValue = `${timeValue.slice(
                                0,
                                2
                              )}:${timeValue.slice(2)}`; // Insert colon
                            }
                            const timePattern = /^([01]\d|2[0-3]):([0-5]\d)?$/;
                            if (timePattern.test(timeValue)) {
                              setAlertData({
                                type: "success",
                                message: "Valid.",
                              });
                            } else if (timeValue.length === 5) {
                              setAlertData({
                                type: "error",
                                message: "Invalid time format.",
                              });
                            } else {
                              setAlertData(null);
                            }

                            setFormData({
                              ...formData,
                              [e.target.name]: timeValue,
                            });

                            // Clear alert after 3 seconds
                            setTimeout(() => {
                              setAlertData(null);
                            }, 3000);
                          }
                        }}
                        onKeyPress={(e) => {
                          // Allow only digits
                          const validCharacters = /^[0-9]$/;
                          if (!validCharacters.test(e.key)) {
                            e.preventDefault(); // Prevent invalid character input
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

                            if (!timePattern.test(formData.inputform13)) {
                              e.preventDefault(); // Prevent form submission
                              setAlertData({
                                type: "error",
                                message:
                                  "Please enter a valid time in 24-hour format.",
                              });
                              setTimeout(() => {
                                setAlertData(null);
                              }, 3000);
                            } else {
                              inputform14ref.current.focus();
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="col-sm-2 label-field">Time To:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        type="text"
                        id="inputform14"
                        placeholder="Time To"
                        name="inputform14"
                        className={`form-control-field ${
                          errors.inputform14 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "right" }}
                        value={formData.inputform14}
                        ref={inputform14ref}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          let timeValue = e.target.value;
                          if (timeValue.length < 6) {
                            timeValue = timeValue.replace(/:/g, "");
                            setFormData({
                              ...formData,
                              [e.target.name]: timeValue,
                            });
                            if (timeValue.length >= 2) {
                              timeValue = `${timeValue.slice(
                                0,
                                2
                              )}:${timeValue.slice(2)}`; // Insert colon
                            }
                            const timePattern = /^([01]\d|2[0-3]):([0-5]\d)?$/;
                            if (timePattern.test(timeValue)) {
                              setAlertData({
                                type: "success",
                                message: "Valid.",
                              });
                            } else if (timeValue.length === 5) {
                              setAlertData({
                                type: "error",
                                message: "Invalid time format.",
                              });
                            } else {
                              setAlertData(null);
                            }

                            setFormData({
                              ...formData,
                              [e.target.name]: timeValue,
                            });

                            // Clear alert after 3 seconds
                            setTimeout(() => {
                              setAlertData(null);
                            }, 3000);
                          }
                        }}
                        onKeyPress={(e) => {
                          // Allow only digits
                          const validCharacters = /^[0-9]$/;
                          if (!validCharacters.test(e.key)) {
                            e.preventDefault(); // Prevent invalid character input
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

                            if (!timePattern.test(formData.inputform13)) {
                              e.preventDefault(); // Prevent form submission
                              setAlertData({
                                type: "error",
                                message:
                                  "Please enter a valid time in 24-hour format.",
                              });
                              setTimeout(() => {
                                setAlertData(null);
                              }, 3000);
                            } else {
                              inputform15ref.current.focus();
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">User Catg:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        type="text"
                        id="inputform15"
                        placeholder="User Category"
                        name="inputform15"
                        className={`form-control-field ${
                          errors.inputform15 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "left" }}
                        value={formData.inputform15}
                        ref={inputform15ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(inputform16ref, e)
                        }
                      />
                    </div>
                    <div className="col-sm-2 label-field">Code:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        type="text"
                        id="inputform16"
                        placeholder="Code"
                        name="inputform16"
                        className={`form-control-field ${
                          errors.inputform16 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "left" }}
                        value={formData.inputform16}
                        ref={inputform16ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* // three button in this  */}
            <ButtonGroup
              Submit={Submit}
              handleFocus={handleFocus}
              handleBlur={handleBlur}
              handleSave={handleSave}
              handleReturn={handleReturn}
              handleClear={handleClear}
              handleFormSubmit={handleFormSubmit}
            />
            <TwoColumnModel
              isOpen={isModalOpen}
              handleClose={handleCloseModal}
              title="Select User"
              technicians={dataa}
              searchRef={SearchBox}
              handleRowClick={handleRowClick}
              firstColKey="tusrid"
              secondColKey="tusrnam"
              firstColWidth="100px"
              secondColWidth="450px"
              firstColAlign="center"
              secondColAlign="left"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAddUser;
