import { Form } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../ProductMaintenance/ProductMaintenance.css";
import NavComponent from "../../../Navform/navbarform";
import ButtonGroupp from "../../../Button/ButtonGroup/ButtonGroup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import StatusSelect from "../../../StatusSelected/StatusSelected";
import { isLoggedIn, getUserData, getOrganisationData } from "../../../../Auth";
import { useMutation } from "@tanstack/react-query";
import { useTheme } from "../../../../../ThemeContext";
import {
  fetchGetCrystalCustomer,
  fetchGetCrystalProduct,
} from "../../../../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataGetCrystalMenu } from "../../../../Redux/api";
import TwoColumnModel from "../../../Models/TwoColumnModel";
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

// http://crystalsolutions.com.pk/api/GetCrystalMenu.php
function ProductMaintenance() {
  const dispatch = useDispatch();

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
    Status: "",
    inputform4: "",
    inputform5: "",
    inputform6: "",
    inputform7: "",
    inputform8: "",
    inputform9: "",
    inputform10: "",
    inputform11: "",
    inputform12: "",
    inputform13: "",
    inputform14: "",
  });
  const { data, loading, error } = useSelector(
    (state) => state.getcrystalproduct
  );
  const [dataa, setDataa] = useState([]);

  // Only fetch once when component mounts
  useEffect(() => {
    console.log(data, "dassdfsfsdfsdfasdf");
    if (data?.length === 0) {
      dispatch(fetchGetCrystalProduct());
    }
  }, [dispatch]);

  useEffect(() => {
    setDataa(data);
  }, [data]);

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

  const [geturdu, setGeturdu] = useState("");
  const [selectedImage1, setSelectedImage1] = useState(null);

  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic1-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

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
    // const data = {
    //   AccountCodeform: formData.AccountCodeform,
    //   Descriptionform: formData.Descriptionform,
    //   Status: formData.Status,
    //   inputform4: formData.inputform4,
    //   inputform5: formData.inputform5,
    //   inputform6: formData.inputform6,
    //   inputform7: formData.inputform7,
    //   inputform8: formData.inputform8,
    //   inputform9: formData.inputform9,
    //   inputform10: formData.inputform10,
    //   inputform11: formData.inputform11,
    // };
    // console.log("Form Data:", data);
    // Prepare form data for submission
    const formDataa = new FormData();
    formDataa.append("code", organisation.code);
    formDataa.append("FPrdCod", formData.AccountCodeform);
    formDataa.append("FPrdDsc", formData.Descriptionform);
    formDataa.append("FPrdSts", formData.Status);
    // formDataa.append("FMenRem", formData.inputform5);
    // formDataa.append("mobileno", formData.inputform6);
    // formDataa.append("email", formData.inputform7);
    // formDataa.append("menu", formData.inputform8);
    // formDataa.append("duepaymentdate", formData.inputform9);
    // formDataa.append("duepayment", formData.inputform10);
    // formDataa.append("lastpaymentdate", formData.inputform11);
    // formDataa.append("lastpayment", formData.inputform12);
    formDataa.append("FUsrId", user.tusrid);

    console.log("Submitting Form Data:", formDataa);

    try {
      const response = await axios.post(
        `${apiLinks}/SaveProduct.php`,
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
        dispatch(fetchGetCrystalProduct());

        // Clear form fields
        setFormData({
          ...formData,
          AccountCodeform: "",
          Descriptionform: "",
          Status: "",
          inputform4: "",
          inputform5: "",
          inputform6: "",
          inputform7: "",
          inputform8: "",
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
  const [textdata, settextdata] = useState("Product Maintenance");

  const handleCloseModal = () => {
    setSearchText("");
    setHighlightedRowIndex(0);
    settextdata("Product Maintenance");
    setTimeout(() => {
      dispatch(fetchGetCrystalProduct());
    }, 500);
    setModalOpen(false);
  };

  const handleDoubleClick = async (e) => {
    focusNextInput(Code);

    // Fetch the data and wait for it to complete
    const fetchedData = await dispatch(fetchGetCrystalProduct());

    // Update the local state with the fetched data
    setDataa(fetchedData);

    // After updating the state, open the modal
    setModalOpen(true);
  };

  const handleBlurRVC = (e) => {
    // // Convert nextItemId to string before calling padStart
    const formattedValue = formData.AccountCodeform;
    // console.log("dataa item:", data);
    // const accountCodeValue = String(formData.AccountCodeform);
    // const part1 = accountCodeValue.substring(0, 2);
    // const part2 = accountCodeValue.substring(2, 5);
    // const part3 = accountCodeValue.substring(5, 8).padStart(3, "0");
    // const formattedValue = `${part1}-${part2}-${part3}`;

    setFormData({
      ...formData,
      AccountCodeform: formattedValue,
    });
    console.log("value", formattedValue);
    setTimeout(() => {
      const selectedItem = data.find((item) => item.tprdcod === formattedValue);

      console.log("Selected item:", formattedValue);

      if (selectedItem) {
        setFormData({
          ...formData,
          AccountCodeform: selectedItem.tprdcod || "",
          Descriptionform: selectedItem.tprddsc || "",
          Status: selectedItem.tprdsts || "",
          // inputform4: selectedItem.tmenurl || "",
          // inputform5: selectedItem.tmenrem || "",
        });
        handlePrediction(selectedItem.tmendsc).then((result) => {
          setGeturdu(result);
        });
      } else {
        setFormData({
          ...formData,
          Descriptionform: "",
          Status: "",
          inputform4: "",
          inputform5: "",
          inputform6: "",
          inputform7: "",
          inputform8: "",
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
    let formattedValue = value;

    if (name === "AccountCodeform") {
      console.log("Searching for:", value);

      // Remove any non-digit characters
      let rawValue = value.replace(/\D/g, "");

      // Ensure we only consider the first 8 digits
      if (rawValue.length > 8) {
        rawValue = rawValue.slice(0, 8);
      }

      // Apply the 00-000-000 format
      if (rawValue.length === 8) {
        formattedValue = `${rawValue.slice(0, 2)}-${rawValue.slice(
          2,
          5
        )}-${rawValue.slice(5)}`;
      } else if (rawValue.length > 2) {
        formattedValue = `${rawValue.slice(0, 2)}-${rawValue.slice(2)}`;
      } else {
        formattedValue = rawValue;
      }

      console.log("Formatted Value:", formattedValue);

      // Find matching item based on formatted account code
      const selectedItem = data.find((item) => item.tprdcod === formattedValue);
      console.log("Selected item:", selectedItem);

      if (selectedItem) {
        // Set form data with the selected item's values
        setFormData({
          ...formData,

          AccountCodeform: formattedValue || "",
          Descriptionform: selectedItem.tprddsc || "",
          Status: selectedItem.tprdsts || "",
        });

        // Handle prediction for Urdu translation
        handlePrediction(selectedItem.tmendsc).then((result) => {
          setGeturdu(result);
        });
      } else {
        // Reset form fields if no item is found
        setFormData({
          ...formData,
          AccountCodeform: formattedValue,
          Descriptionform: "",
          Status: "",
          inputform4: "",
          inputform5: "",
          inputform6: "",
          inputform7: "",
          inputform8: "",
          inputform9: "",
          inputform10: "",
          inputform11: "",
          inputform12: "",
          inputform13: "",
          inputform14: "",
        });
      }
    }

    if (name === "Descriptionform") {
      console.log("Searching for:", formattedValue);

      handlePrediction(formattedValue).then((result) => {
        setGeturdu(result);
      });
    }

    if (name === "inputform8" || name === "inputform11") {
      const lowercaseValue = value.toLowerCase();
      setFormData({
        ...formData,
        [name]: lowercaseValue,
      });
    } else if (name === "inputform5") {
      const lowercaseValue = value;
      setFormData({
        ...formData,
        inputform5: lowercaseValue,
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
      AccountCodeform: selectedItem.tprdcod || "",
      Descriptionform: selectedItem.tprddsc || "",
      Status: selectedItem.tprdsts || "",
    });
    handlePrediction(selectedItem.tcmpdsc).then((result) => {
      setGeturdu(result);
    });

    settextdata("Product Maintenance");

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
      Status: "",
      inputform4: "",
      inputform5: "",
      inputform6: "",
      inputform7: "",
      inputform8: "",
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
    navigate("/MainPage");
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
    getdatafontsize,
    getfontstyle,
    getnavbarbackgroundcolor,
    toggleChangeColor,
  } = useTheme();
  const contentStyle = {
    backgroundColor: getcolor,
    height: "100vh",
    width: isSidebarVisible ? "calc(100vw - 55%)" : "60%",
    position: "relative",
    top: "60%",
    left: isSidebarVisible ? "50%" : "60%",
    transform: "translate(-50%, -50%)",
    transition: isSidebarVisible
      ? "left 3s ease-in-out, width 2s ease-in-out"
      : "left 3s ease-in-out, width 2s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    overflowX: "hidden",
    overflowY: "hidden",
    // wordBreak: "break-word",
    // textAlign: "center",
    maxWidth: "500px",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "23px",
    fontFamily: '"Poppins", sans-serif',
  };
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
        <div style={contentStyle}>
          <div
            className="col-md-12 "
            style={{
              border: `1px solid ${fontcolor}`,
              borderRadius: "9px",
            }}
          >
            <NavComponent textdata={textdata} />

            <br />
            <Form
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
                    <div className="col-sm-5">
                      <Form.Control
                        type="text"
                        className="form-control-field custom-input"
                        placeholder="Code"
                        name="AccountCodeform"
                        value={formData.AccountCodeform}
                        // onFocus={(e) => e.target.select()}
                        onChange={(e) => handleInputChange(e)}
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
                                (item) => item.tmencod === upperCaseValue
                              );

                              if (selectedItem) {
                                console.log("selectedItem:", selectedItem);
                                handleEnterKeyPress(Status, e);
                              } else if (upperCaseValue.length < 10) {
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
                            focusNextInput(SearchBox);
                          }, 500);
                        }}
                        ref={Code}
                      />
                    </div>
                    <div className="col-sm-2 label-field">Status:</div>
                    <div className="col-sm-3">
                      <Form.Control
                        as="select"
                        name="Status"
                        value={formData.Status}
                        onChange={handleInputChange}
                        className={`form-control-field ${
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
                    <div className="col-sm-2 label-field">Description:</div>
                    <div className="col-sm-10">
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
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(inputform5ref, e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 label-field">Remarks:</div>
                    <div className="col-sm-10">
                      <Form.Control
                        as="textarea"
                        id="inputform5"
                        placeholder="Remarks"
                        name="inputform5"
                        className={`form-control-remarkss ${
                          errors.inputform5 ? "border-red" : ""
                        }`}
                        style={{
                          textAlign: "left",
                          height: "250px",
                        }} // Increased height
                        value={formData.inputform5}
                        ref={inputform5ref}
                        onFocus={(e) => e.target.select()}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>

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
              title="Select Menu"
              technicians={data}
              searchRef={SearchBox}
              handleRowClick={handleRowClick}
              firstColKey="tprdcod"
              secondColKey="tprddsc"
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

export default ProductMaintenance;
