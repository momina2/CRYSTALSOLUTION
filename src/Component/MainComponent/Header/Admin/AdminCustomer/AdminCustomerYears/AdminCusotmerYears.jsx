import { Form } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AdminCusotmerYears.css";
import NavComponent from "../../../../Navform/navbarform";
import ButtonGroupp from "../../../../Button/ButtonGroup/ButtonGroup";
import { useQuery, useQueryClient } from "@tanstack/react-query";


import {
  isLoggedIn,
  getUserData,
  getOrganisationData,
} from "../../../../../Auth";
import CustomerModal from "./AdminCusotmerYearsModal";
import { useMutation } from "@tanstack/react-query";
import { useTheme } from "../../../../../../ThemeContext";
import {
  fetchGetCrystalCustomer,
  fetchGetYear,
} from "../../../../../Redux/action";
import { useSelector, useDispatch } from "react-redux";
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
function AdminCusotmerYears() {
  const { code } = useParams();

  const dispatch = useDispatch();

  const user = getUserData();
  const organisation = getOrganisationData();
  const { apiLinks,getnavbarbackgroundcolor } = useTheme();
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
  const { data, loading, error } = useSelector((state) => state.getyear);
  const [dataa, setDataa] = useState([]);

  // Only fetch once when component mounts
  useEffect(() => {
    if (data?.length === 0) {
      dispatch(fetchGetYear(code));
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
    dispatch(fetchGetYear(code));

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
      tusrid: user.tusrid,

      inputform4: formData.inputform4,
      code: organisation.code,
    };
    console.log("Form Data:", data);
    // Prepare form data for submission
    const formDataa = new FormData();
    formDataa.append("code", code);
    formDataa.append("FYerDsc", formData.AccountCodeform);
    formDataa.append("FYerSts", formData.Status);
    formDataa.append("FStrDat", formData.Descriptionform);
    formDataa.append("FEndDat", formData.inputform4);
    formDataa.append("FUsrId", user.tusrid);

    console.log("Submitting Form Data:", formDataa);

    try {
      const response = await axios.post(`${apiLinks}/SaveYear.php`, formDataa, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response);

      if (response.data.error === 200) {
        Code.current.focus();
        setTimeout(() => {
          dispatch(fetchGetYear(code));
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
  const [textdata, settextdata] = useState("Years Management");

  const handleCloseModal = () => {
    setSearchText("");
    // data
    setHighlightedRowIndex(0);
    settextdata("Years Management");
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
      const selectedItem = dataa.find((item) => item.tyerdsc === value);

      console.log("Selected item:", selectedItem);

      if (selectedItem) {
        setFormData({
          ...formData,
          AccountCodeform: selectedItem.tyerdsc,
          Status: selectedItem.tyersts,
          Descriptionform: selectedItem.tstrdat,
          inputform4: selectedItem.tenddat,
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
        [name]: value,
      });
    }
    if (name === "inputform8") {
      const lowercaseValue = value.toLowerCase();
      setFormData({
        ...formData,
        inputform8: lowercaseValue,
      });
    }
    if (name === "inputform4") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    if (name === "inputform11") {
      const lowercaseValue = value.toLowerCase();
      setFormData({
        ...formData,
        inputform11: lowercaseValue,
      });
    } else if (name === "inputform6") {
      const formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length === 10) {
        if (!formattedValue.startsWith("03")) {
          setFormData({
            ...formData,
            inputform6: "",
          });
        } else {
          setFormData({
            ...formData,
            inputform6: formattedValue,
          });
        }
      } else {
        setFormData({
          ...formData,
          inputform6: formattedValue,
        });
      }
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
          AccountCodeform: selectedItem.tyerdsc,
          Descriptionform: selectedItem.tstrdat,
          Status: selectedItem.tyersts,
          inputform4: selectedItem.tenddat,
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
      AccountCodeform: selectedItem.tyerdsc,
      Descriptionform: selectedItem.tstrdat,
      Status: selectedItem.tyersts,
      inputform4: selectedItem.tenddat,
    });
    // handlePrediction(selectedItem.tcmpdsc).then((result) => {
    //   setGeturdu(result);
    // });

    settextdata("Years Management");

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
  } = useTheme();
  const contentStyle = {
    backgroundColor: getcolor,
    height: "100vh",
    width: isSidebarVisible ? "calc(100vw - 55%)" : "100vw",
    position: "relative",
    top: `calc(54% - ${window.innerHeight * 0}px)`,
    left: isSidebarVisible ? "40vw" : "46vw",
    transform: "translate(-50%, -50%)",
    transition: isSidebarVisible
      ? "left 3s ease-in-out, width 2s ease-in-out"
      : "left 3s ease-in-out, width 2s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    overflowX: "hidden",
    overflowY: "hidden",
    textAlign: "center",
    maxWidth: "500px",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "23px",
    fontFamily: '"Poppins", sans-serif',
  };
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
            <NavComponent textdata={`${textdata}(${code})`} />

            <br />
            <div
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
                    <div className="col-sm-4 label-field">Year:</div>
                    <div className="col-sm-4">
                      <Form.Control
                        type="text"
                        className="form-control-field custom-input"
                        placeholder="(2022 - 2023)"
                        name="AccountCodeform"
                        value={formData.AccountCodeform}
                        onChange={(e) => {
                          let input = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters

                          if (input.length >= 4) {
                            input = input.slice(0, 4) + "-" + input.slice(4);
                          }
                          if (input.length > 11) {
                            input = input.slice(0, 11);
                          }
                          handleInputChangefetchdata({
                            target: {
                              value: input.toUpperCase(),
                            },
                          });
                        }}
                        style={{
                          fontSize: "15px",
                          padding: "10px",
                          textAlign: "left",
                          borderRadius: "8px",
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const upperCaseValue = e.target.value.trim();

                            // Validation: Ensure the format is 'YYYY - YYYY'
                            const yearPattern = /^\d{4}\s*-\s*\d{4}$/;

                            if (!yearPattern.test(upperCaseValue)) {
                              setAlertData({
                                type: "error",
                                message:
                                  "Please enter a valid year format (e.g., 2022 - 2023).",
                              });
                              setTimeout(() => {
                                setAlertData(null);
                              }, 3000);

                              e.preventDefault();
                              return;
                            }

                            handleBlurRVC();
                            handleEnterKeyPress(Status, e);

                            if (data && data.length > 0) {
                              const selectedItem = data.find(
                                (item) => item.tyerdsc === upperCaseValue
                              );

                              if (selectedItem) {
                                console.log("selectedItem:", selectedItem);
                                handleEnterKeyPress(Status, e);
                              } else {
                                // Handle case where year is not found in data
                                console.warn("Year not found in data.");
                              }
                            } else {
                              console.warn(
                                "Data rows are not available or empty."
                              );
                            }
                          }
                        }}
                        onFocus={(e) => e.target.select()}
                        onBlur={(e) => {
                          const inputValue = e.target.value.trim();

                          // Validate input format on blur
                          const yearPattern = /^\d{4}\s*-\s*\d{4}$/;

                          if (!yearPattern.test(inputValue)) {
                            setAlertData({
                              type: "error",
                              message:
                                "Invalid year format. Please use the format '2022 - 2023",
                            });
                            setTimeout(() => {
                              setAlertData(null);
                            }, 3000);
                          }
                        }}
                        onDoubleClick={(e) => {
                          handleDoubleClick(e);
                          setTimeout(() => {
                            dispatch(fetchGetYear(code));
                            focusNextInput(SearchBox);
                          }, 100);
                        }}
                        ref={Code}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4 label-field">Status:</div>
                    <div className="col-sm-4">
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
                    <div className="col-sm-4 label-field">Start Date:</div>
                    <div className="col-sm-4">
                      <Form.Control
                        type="text"
                        id="Descriptionform"
                        placeholder="(DD-MM-YYYY)"
                        name="Descriptionform"
                        className={`form-control-field ${
                          errors.Descriptionform ? "border-red" : ""
                        }`}
                        value={formData.Descriptionform}
                        ref={Description}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          let input = e.target.value.replace(/\D/g, "");
                          // Format input as DD-MM-YYYY
                          if (input.length >= 2) {
                            input = input.slice(0, 2) + "-" + input.slice(2);
                          }
                          if (input.length >= 5) {
                            input = input.slice(0, 5) + "-" + input.slice(5);
                          }
                          if (input.length > 10) {
                            input = input.slice(0, 10);
                          }

                          // Update the state with the formatted input
                          handleInputChange({
                            target: {
                              name: "Descriptionform", // Add the name of the input
                              value: input,
                            },
                          });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const inputValue = e.target.value.trim();
                            const datePattern =
                              /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;

                            if (!datePattern.test(inputValue)) {
                              setAlertData({
                                show: true,
                                message:
                                  "Please enter a valid date format (DD-MM-YYYY)",
                                type: "error",
                              });
                              setTimeout(() => {
                                setAlertData(null);
                              }, 3000);
                              e.preventDefault();
                              return;
                            }

                            handleEnterKeyPress(inputform4ref, e);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4 label-field">End Date:</div>
                    <div className="col-sm-4">
                      <Form.Control
                        type="text"
                        id="inputform4"
                        placeholder="(DD-MM-YYYY)"
                        name="inputform4"
                        className={`form-control-field ${
                          errors.inputform4 ? "border-red" : ""
                        }`}
                        value={formData.inputform4}
                        ref={inputform4ref}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          let input = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

                          // Format input as DD-MM-YYYY
                          if (input.length >= 2) {
                            input = input.slice(0, 2) + "-" + input.slice(2);
                          }
                          if (input.length >= 5) {
                            input = input.slice(0, 5) + "-" + input.slice(5);
                          }
                          if (input.length > 10) {
                            input = input.slice(0, 10);
                          }

                          // Update the state with the formatted input
                          handleInputChange({
                            target: {
                              name: "inputform4", // Add the name of the input
                              value: input,
                            },
                          });
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const inputValue = e.target.value.trim();
                            const datePattern =
                              /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;

                            if (!datePattern.test(inputValue)) {
                              setAlertData({
                                show: true,
                                message:
                                  "Please enter a valid date format (DD-MM-YYYY)",
                                type: "error",
                              });
                              setTimeout(() => {
                                setAlertData(null);
                              }, 3000);
                              e.preventDefault();
                              return;
                            }

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

            <CustomerModal
              isOpen={isModalOpen}
              handleClose={handleCloseModal}
              title="Select Year"
              technicians={data}
              searchRef={SearchBox}
              handleRowClick={handleRowClick}
              firstColKey="tyerdsc"
              secondColKey="tstrdat"
              thirdColKey="tenddat"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminCusotmerYears;
