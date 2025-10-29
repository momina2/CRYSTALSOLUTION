import { Form } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./AdminCustomer.css";
import NavComponent from "../../../Navform/navbarform";
import ButtonGroupp from "../../../Button/ButtonGroup/ButtonGroup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import StatusSelect from "../../../StatusSelected/StatusSelected";
import { isLoggedIn, getUserData, getOrganisationData } from "../../../../Auth";

import { useMutation } from "@tanstack/react-query";
import { useTheme } from "../../../../../ThemeContext";
import { fetchGetCrystalCustomer } from "../../../../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import TwoColumnModel from "../../../Models/TwoColumnModel";
import CustomDropdown from "../../../Dropdown/Dropdown";
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
function Customer() {
  const dispatch = useDispatch();

  const user = getUserData();
  const organisation = getOrganisationData();
  const { apiLinks } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    Code.current.focus();
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
    productref: "",
    inputform5: "",
    inputform6: "",
    inputform7: "",
    inputform8: "",
    pos: "Y",

    inputform9: "",
    inputform10: "",
    inputform11: "",
    inputform12: "",
    inputform13: "",
    inputform14: "",
  });
  const { data, loading, error } = useSelector(
    (state) => state.getcrystalcustomer
  );
  const [dataa, setDataa] = useState([]);

  // Only fetch once when component mounts
  useEffect(() => {
    if (data?.length === 0) {
      dispatch(fetchGetCrystalCustomer());
    }
  }, [dispatch]);

  useEffect(() => {
    setDataa(data);
  }, [data]);
  // d
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
  const PRODUCTREF = useRef(null);

  const inputform6ref = useRef(null);
  const POS = useRef(null);

  const inputform7ref = useRef(null);
  const inputform8ref = useRef(null);
  const inputform9ref = useRef(null);
  const inputform10ref = useRef(null);
  const inputform11ref = useRef(null);
  const inputform12ref = useRef(null);
  const inputform13ref = useRef(null);
  const inputform14ref = useRef(null);
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
  const [dropdownKey, setDropdownKey] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemChange = async (selectedOption) => {
    console.log("Selected Value:", selectedOption);
    setSelectedItem(selectedOption);
    // categorydatashowing(selectedOption.value);
  };

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
    dispatch(fetchGetCrystalCustomer());
    // Basic validation
    const checks = [
      {
        value: formData?.AccountCodeform,
        message: "Please fill your Userid",
      },
      {
        value: formData?.Descriptionform,
        message: "Please fill your User Name",
      },
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
      Status: formData.Status,
      inputform4: formData.inputform4,
      inputform5: formData.inputform5,
      pos: formData.pos,

      inputform6: formData.inputform6,
      inputform7: formData.inputform7,
      inputform8: formData.inputform8,
      inputform9: formData.inputform9,
      inputform10: formData.inputform10,
      inputform11: formData.inputform11,
    };
    console.log("Form Data:", data);
    // Prepare form data for submission
    const formDataa = new FormData();
    formDataa.append("code", formData.AccountCodeform);
    formDataa.append("description", formData.Descriptionform);
    formDataa.append("status", formData.Status);
    formDataa.append("address", formData.inputform4);
    formDataa.append("contactno", formData.inputform5);
    formDataa.append("mobileno", formData.inputform6);
    formDataa.append("email", formData.inputform7);
    formDataa.append("menu", formData.inputform8);
    formDataa.append("pos", formData.pos);

    formDataa.append("duepaymentdate", formData.inputform9);
    formDataa.append("duepayment", formData.inputform10.replace(/,/g, ""));
    formDataa.append("lastpaymentdate", formData.inputform11);
    formDataa.append("lastpayment", formData.inputform12.replace(/,/g, ""));
    formDataa.append("FCurUsr", "sohaib");

    console.log("Submitting Form Data:", formDataa);

    try {
      const response = await axios.post(
        `${apiLinks}/SaveCrystalCustomer.php`,
        formDataa,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response);

      if (response.data.error === 200) {
        Code.current.focus();
        setTimeout(() => {
          dispatch(fetchGetCrystalCustomer()); // Re-fetch data from the server
        }, 500);

        // Clear form fields
        setFormData({
          ...formData,
          AccountCodeform: "",
          Descriptionform: "",
          Status: "A",
          inputform4: "",
          inputform5: "",
          inputform6: "",
          inputform7: "",
          inputform8: "",
          pos: "Y",
          inputform9: "",
          inputform10: "",
          inputform11: "",
          inputform12: "",
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
  const [textdata, settextdata] = useState("Customer Management");

  const handleCloseModal = () => {
    setSearchText("");
    // data
    setHighlightedRowIndex(0);
    settextdata("Customer Management");
    dispatch(fetchGetCrystalCustomer());

    setModalOpen(false);
  };

  const handleDoubleClick = (e) => {
    dispatch(fetchGetCrystalCustomer());
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
      const selectedItem = dataa.find((item) => item.code === value);

      console.log("Selected item:", selectedItem);

      if (selectedItem) {
        setFormData({
          ...formData,
          AccountCodeform: selectedItem.code || "",
          Descriptionform: selectedItem.description || "",
          Status: selectedItem.status || "",
          inputform4: selectedItem.address || "",
          inputform5: selectedItem.contactno || "",
          inputform6: selectedItem.mobileno || "",
          inputform7: selectedItem.email || "",
          inputform8: selectedItem.menu || "",
          pos: selectedItem.pos || "",

          inputform9: selectedItem.duepaymentdate || "",
          inputform10: selectedItem.duepayment || "",
          inputform11: selectedItem.lastpaymentdate || "",
          inputform12: selectedItem.lastpayment || "",
        });
        handlePrediction(selectedItem.description).then((result) => {
          setGeturdu(result);
        });
      } else {
        setFormData({
          ...formData,
          Descriptionform: "",
          Status: "A",
          inputform4: "",
          inputform5: "",
          inputform6: "",
          inputform7: "",
          inputform8: "",
          pos: "Y",

          inputform9: "",
          inputform10: "",
          inputform11: "",
          inputform12: "",
          inputform13: "",
          inputform14: "",
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
    const formattednormalvalue = value;
    if (name === "Descriptionform") {
      setFormData({
        ...formData,
        Descriptionform: formattednormalvalue,
      });
      handlePrediction(formattedValue).then((result) => {
        setGeturdu(result);
        console.log("resulttttttttttt");
      });
    }
    if (name === "inputform8") {
      const lowercaseValue = value.toLowerCase();
      setFormData({
        ...formData,
        inputform8: lowercaseValue,
      });
    }

    if (name === "inputform11") {
      const lowercaseValue = value.toLowerCase();
      setFormData({
        ...formData,
        inputform11: lowercaseValue,
      });
    } else if (name === "inputform6") {
      setFormData({
        ...formData,
        inputform6: value,
      });
    } else if (name === "inputform7") {
      // Remove spaces and ensure lowercase for email
      const formattedValue = value.replace(/\s/g, "").toLowerCase();
      setFormData({
        ...formData,
        inputform7: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    }
    if (name === "UrduFormDescription") {
      console.log("Searching for:", formattedValue);
      setGeturdu(formattedValue);
    }
    if (name === "AccountCodeform") {
      console.log("Searching for:", value);

      const selectedItem = data.find((item) => item.code === value);

      console.log("Selected item:", selectedItem);

      if (selectedItem) {
        setFormData({
          ...formData,
          AccountCodeform: selectedItem.code || "",
          Descriptionform: selectedItem.description || "",
          Status: selectedItem.status || "",
          inputform4: selectedItem.address || "",
          inputform5: selectedItem.contactno || "",
          inputform6: selectedItem.mobileno || "",
          inputform7: selectedItem.email || "",
          inputform8: selectedItem.menu || "",
          pos: selectedItem.pos || "",

          inputform9: selectedItem.duepaymentdate || "",
          inputform10: selectedItem.duepayment || "",
          inputform11: selectedItem.lastpaymentdate || "",
          inputform12: selectedItem.lastpayment || "",
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
          inputform6: "",
          inputform7: "",
          inputform8: "",
          pos: "Y",

          inputform9: "",
          inputform10: "",
          inputform11: "",
          inputform12: "",
          inputform13: "",
          inputform14: "",
        });
      }
    }
  };

  const resetData = () => {
    setSearchText("");
  };
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);
  const handleRowClick = (selectedItem, rowIndex) => {
    console.log("handleRowClickAccount", selectedItem);
    setModalOpen(false);
    setFormData({
      ...formData,
      AccountCodeform: selectedItem.code || "",
      Descriptionform: selectedItem.description || "",
      Status: selectedItem.status || "",
      inputform4: selectedItem.address || "",
      inputform5: selectedItem.contactno || "",
      inputform6: selectedItem.mobileno || "",
      inputform7: selectedItem.email || "",
      inputform8: selectedItem.menu || "",
      pos: selectedItem.pos || "",

      inputform9: selectedItem.duepaymentdate || "",
      inputform10: selectedItem.duepayment || "",
      inputform11: selectedItem.lastpaymentdate || "",
      inputform12: selectedItem.lastpayment || "",
    });
    handlePrediction(selectedItem.tcmpdsc).then((result) => {
      setGeturdu(result);
    });

    settextdata("Customer Management");

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
      inputform6: "",
      inputform7: "",
      inputform8: "",
      pos: "Y",

      inputform9: "",
      inputform10: "",
      inputform11: "",
      inputform12: "",
      inputform13: "",
      inputform14: "",
    });

    if (Code.current) {
      Code.current.focus();
    }
  };

  const handleReturn = () => {
    navigate("/AdminCustomers");
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
    getfontstyle,
    getdatafontsize,
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
        <div className="contentCustomerformStyle">
          <div
            className="col-md-12 "
            style={{
              border: `1px solid ${fontcolor}`,
              borderRadius: "9px",
            }}
          >
            <NavComponent textdata={textdata} />

            <br />
            <div
              className="contentstylesformcroll"
              onSubmit={handleFormSubmit}
              style={{
                backgroundColor: getcolor,
                color: fontcolor,
              }}
            >
              <div className="row">
                <div className="col-sm-12">
                  <br />

                  <div className="row">
                    <div className="col-sm-2 label-field">Code:</div>
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
                              value: e.target.value.toUpperCase(),
                            },
                          })
                        }
                        style={{
                          fontSize: "15px",
                          padding: "10px",
                          textAlign: "left",
                          borderRadius: "8px",
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleBlurRVC();
                            handleEnterKeyPress(Status, e);
                            const upperCaseValue = e.target.value.toUpperCase();

                            if (data && data.length > 0) {
                              const selectedItem = data.find(
                                (item) => item.code === upperCaseValue
                              );

                              if (selectedItem) {
                                console.log("selectedItem:", selectedItem);
                                handleEnterKeyPress(Status, e);
                              } else if (upperCaseValue.length < 10) {
                                // setAlertData({
                                //   type: "success",
                                //   message: "Fetch Data",
                                // });
                                // setTimeout(() => {
                                //   setAlertData(null);
                                // }, 3000);
                              } else {
                                handleEnterKeyPress(Status, e);
                              }
                            } else {
                              console.warn(
                                "Data rows are not available or empty."
                              );
                            }
                          }
                        }}
                        onFocus={(e) => {
                          // setTimeout(() => {
                          e.target.select();
                          // }, 500);
                        }}
                        onDoubleClick={(e) => {
                          handleDoubleClick(e);
                          setTimeout(() => {
                            dispatch(fetchGetCrystalCustomer());
                            focusNextInput(SearchBox);
                          }, 100);
                        }}
                        ref={Code}
                      />
                    </div>
                    <div className="col-sm-2"></div>
                    <div className="col-sm-2 label-field">Status:</div>
                    <div className="col-sm-3 label-input-status">
                      <Form.Control
                        as="select"
                        name="Status"
                        value={formData.Status}
                        onChange={handleInputChange}
                        className={`form-control-status ${
                          errors.Status ? "border-red" : ""
                        }`}
                        style={{
                          height: "28px",
                          padding: "0px",
                          paddingLeft: "5px",
                        }}
                        onKeyDown={(e) => handleEnterKeyPress(Description, e)}
                        ref={Status}
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
                          value="N"
                        >
                          Not Active
                        </option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Description:</div>
                    <div
                      className="col-sm-10 label-input"
                      style={{ display: "flex", gap: "10px" }}
                    >
                      <Form.Control
                        type="text"
                        id="Descriptionform"
                        placeholder="Description"
                        name="Descriptionform"
                        className={`form-control-field ${
                          errors.Descriptionform ? "border-red" : ""
                        }`}
                        value={formData.Descriptionform}
                        ref={Description}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                          handleInputChange({
                            target: {
                              name: "Descriptionform",
                              value: e.target.value,
                            },
                          })
                        }
                        onKeyDown={(e) => handleEnterKeyPress(inputform4ref, e)}
                        style={{ flex: "1", marginRight: "4px" }}
                      />
                      <Form.Control
                        type="text"
                        id="UrduFormDescription"
                        placeholder="اردو میں"
                        name="UrduFormDescription"
                        className={`form-control-field ${
                          errors.Descriptionform ? "border-red" : ""
                        }`}
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          flex: "1",
                          marginRight: "10px",
                          textAlign: "right",
                          fontFamily: "Noto Nastaliq Urdu",
                        }}
                        value={geturdu}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Address:</div>
                    <div className="col-sm-10 label-input">
                      <Form.Control
                        type="text"
                        id="inputform4"
                        placeholder="Address"
                        name="inputform4"
                        className={`form-control-field ${
                          errors.inputform4 ? "border-red" : ""
                        }`}
                        value={formData.inputform4}
                        ref={inputform4ref}
                        onFocus={(e) => e.target.select()}
                        // onChange={handleInputChange}
                        onChange={(e) =>
                          handleInputChange({
                            target: {
                              name: "inputform4",
                              value: e.target.value,
                            },
                          })
                        }
                        onKeyDown={(e) => handleEnterKeyPress(inputform5ref, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Contact#:</div>
                    <div className="col-sm-4 label-input">
                      <Form.Control
                        type="text"
                        id="inputform5"
                        placeholder="Contact"
                        name="inputform5"
                        className={`form-control-field ${
                          errors.inputform5 ? "border-red" : ""
                        }`}
                        maxLength={25}
                        style={{ textAlign: "left" }}
                        value={formData.inputform5}
                        ref={inputform5ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(inputform6ref, e)}
                      />
                    </div>
                    <div className="col-sm-2 label-field">Product:</div>
                    <div className="col-sm-4 d-flex align-items-center">
                      <Form.Group
                        controlId="status"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <CustomDropdown
                          key={dropdownKey}
                          value={selectedItem}
                          width={200}
                          required
                          onChange={handleItemChange}
                          selectRef={PRODUCTREF}
                          className={errors.productref}
                          fetchUrl={`${apiLinks}/GetActiveProduct.php`}
                          valueKey="tprdcod"
                          labelKey="tprddsc"
                          placeholder="Search or select..."
                          isClearable={true}
                          styles={{
                            placeholder: (base) => ({
                              ...base,
                              fontWeight: "normal",
                            }),
                          }}
                          // onKeyDown={(e) => handleEnterKeyPress(ItemModel, e)}
                          postapi={`${apiLinks}/SaveCategory.php`}
                          postfisrt="FCtgCod"
                          postsecond="FCtgDsc"
                          postthird="FItmSts"
                          postfouth="FUsrId"
                          postfifth="code"
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Mobile:</div>
                    <div className="col-sm-3 label-input">
                      <Form.Control
                        type="text"
                        id="inputform6"
                        placeholder="Mobile"
                        name="inputform6"
                        className={`form-control-field ${
                          errors.inputform6 ? "border-red" : ""
                        }`}
                        maxLength={11}
                        style={{ textAlign: "left" }}
                        value={formData.inputform6}
                        ref={inputform6ref}
                        onFocus={(e) => e.target.select()}
                        // onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(POS, e)}
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
                    <div className="col-sm-2 label-field"></div>

                    <div className="col-sm-2 label-field">POS:</div>
                    <div className="col-sm-3 label-input-status">
                      <Form.Control
                        as="select"
                        name="pos"
                        value={formData.pos}
                        onChange={handleInputChange}
                        className={`form-control-status ${
                          errors.pos ? "border-red" : ""
                        }`}
                        style={{
                          height: "28px",
                          padding: "0px",
                          paddingLeft: "5px",
                        }}
                        onKeyDown={(e) => handleEnterKeyPress(inputform7ref, e)}
                        ref={POS}
                      >
                        <option
                          style={{
                            backgroundColor: getcolor,
                            color: fontcolor,
                          }}
                          value="Y"
                        >
                          Yes
                        </option>
                        <option
                          style={{
                            backgroundColor: getcolor,
                            color: fontcolor,
                          }}
                          value="N"
                        >
                          No
                        </option>
                      </Form.Control>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Email:</div>
                    <div className="col-sm-5 label-input">
                      <Form.Control
                        type="email"
                        id="inputform7"
                        placeholder="Email"
                        name="inputform7"
                        className={`form-control-field ${
                          errors.inputform7 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "left" }}
                        value={formData.inputform7}
                        ref={inputform7ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        // onKeyDown={(e) => handleEnterKeyPress(inputform8ref, e)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const emailPattern =
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            const isValidEmail = emailPattern.test(
                              formData.inputform7
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
                              handleEnterKeyPress(inputform8ref, e);
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="col-sm-2 label-field">Menu:</div>
                    <div className="col-sm-3 label-input">
                      <Form.Control
                        type="menu"
                        id="inputform8"
                        placeholder="Menu"
                        name="inputform8"
                        className={`form-control-field ${
                          errors.inputform8 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "left" }}
                        value={formData.inputform8.toLowerCase()}
                        ref={inputform8ref}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          e.target.value = e.target.value.toLowerCase();
                          handleInputChange(e);
                        }}
                        onKeyDown={(e) => handleEnterKeyPress(inputform9ref, e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Due Date:</div>
                    <div className="col-sm-3 label-input">
                      <Form.Control
                        type="date"
                        id="inputform9"
                        placeholder="Due Date"
                        name="inputform9"
                        className={`form-control-field ${
                          errors.inputform9 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "right" }}
                        value={formData.inputform9}
                        ref={inputform9ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(inputform10ref, e)
                        }
                      />
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-3 label-field">Due Payment:</div>
                    <div className="col-sm-3 label-input">
                      {/* <Form.Control
                        type="text"
                        id="inputform10"
                        placeholder="Due Payment"
                        name="inputform10"
                        className={`form-control-customer ${
                          errors.inputform10 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "right" }}
                        value={formData.inputform10}
                        ref={inputform10ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(inputform11ref, e)
                        }
                      /> */}
                      <Form.Control
                        type="text"
                        id="inputform10"
                        placeholder="Due Payment"
                        name="inputform10"
                        className={`form-control-field ${
                          errors.inputform10 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "right" }}
                        value={formData.inputform10}
                        ref={inputform10ref}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          let value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers

                          // Format the value with commas
                          if (value) {
                            value = Number(value).toLocaleString();
                          }

                          handleInputChange({
                            target: { name: "inputform10", value },
                          });
                        }}
                        onKeyDown={(e) => {
                          // If Enter key is pressed, add '.pp' at the end
                          if (e.key === "Enter") {
                            let formattedValue = formData.inputform10;
                            if (!formattedValue.endsWith(".00")) {
                              formattedValue += ".00"; // Append '.pp' if not already there
                            }

                            handleInputChange({
                              target: {
                                name: "inputform10",
                                value: formattedValue,
                              },
                            });

                            handleEnterKeyPress(inputform11ref, e);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-2 label-field">Last Date:</div>
                    <div className="col-sm-3 label-input">
                      <Form.Control
                        type="date"
                        id="inputform11"
                        placeholder="Last Date"
                        name="inputform11"
                        className={`form-control-field ${
                          errors.inputform11 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "right" }}
                        value={formData.inputform11}
                        ref={inputform11ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(inputform12ref, e)
                        }
                      />
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-3 label-field">Last Payment:</div>
                    <div className="col-sm-3 label-input">
                      <Form.Control
                        type="text"
                        id="inputform12"
                        placeholder="Last Payment"
                        name="inputform12"
                        className={`form-control-field ${
                          errors.inputform12 ? "border-red" : ""
                        }`}
                        style={{ textAlign: "right" }}
                        value={formData.inputform12}
                        ref={inputform12ref}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          let value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers

                          // Format the value with commas
                          if (value) {
                            value = Number(value).toLocaleString();
                          }

                          handleInputChange({
                            target: { name: "inputform12", value },
                          });
                        }}
                        onKeyDown={(e) => {
                          // If Enter key is pressed, add '.pp' at the end
                          if (e.key === "Enter") {
                            let formattedValue = formData.inputform12;
                            if (!formattedValue.endsWith(".00")) {
                              formattedValue += ".00"; // Append '.pp' if not already there
                            }

                            handleInputChange({
                              target: {
                                name: "inputform12",
                                value: formattedValue,
                              },
                            });

                            handleEnterKeyPress(Submit, e);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* // three button in this  */}
            <ButtonGroupp
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
              title="Select Customer"
              technicians={data}
              searchRef={SearchBox}
              handleRowClick={handleRowClick}
              firstColKey="code"
              secondColKey="description"
              firstColWidth="100px"
              secondColWidth="450px"
              firstColAlign="left"
              secondColAlign="left"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Customer;
