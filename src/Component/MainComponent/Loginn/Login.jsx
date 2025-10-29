import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Loginn/Login.css";
import Crystal from "../../../image/logowithname.jpeg";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useTheme } from "../../../ThemeContext";
import Key from "../../../image/keys.png";
import { Link } from "react-router-dom";
import Crystall from "../../../image/logowithname.jpeg";
import logocrystal from "../../../image/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
// import UserPaymentOptionsModel from "../../Transaction/UserPaymentOptions/UserPaymentOptionsModel";
import {
  fetchGetActiveUserLocation,
  fetchGetActiveUserYear,
} from "../../Redux/action";
import { getFcmToken } from "../../../firebase"; 
function Loginn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alertData, setAlertData] = useState(null);
  const { primaryColor, secondaryColor, apiLinks } = useTheme();
  const {
    getLocationNumber,
    getyeardescription,
    getnavbarfontcolor,
    getnavbarbackgroundcolor,
    getnowdate,
    getnowtime,
    getheaderfontsize,
    getdatafontsize,
    getfontstyle,
    setFromDate,
    setToDate,
    setLocationNumber,
    setposid,
    setpostoken,
    setnowdate,
    setYearDescription,
  } = useTheme();
  const userid = useRef();
  const password = useRef();
  const Code = useRef();

  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (userid.current) {
      userid.current.focus();
    }

    // Fetch IP Address
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        console.log("User IP Address:", response.data.ip);
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
      });
  }, []);

  const {
    data: locationdata,
    loading: locationloading,
    error: locationerror,
  } = useSelector((state) => state.getactiveuserlocation);

  const {
    data: yeardata,
    loading: yearloading,
    error: yearerror,
  } = useSelector((state) => state.getactiveuseryear);
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

 async function UserLogin(e) {
  e.preventDefault();
  console.log("Login function started");

  // Get form values
  const userIdValue = userid.current.value;
  const passwordValue = password.current.value;
  const codeValue = Code.current.value;

  // Validate inputs
  if (!userIdValue || !passwordValue || !codeValue) {
    toast.dismiss();
    toast.error("Please fill in all required fields", {
      autoClose: 3000,
    });
    return;
  }

  // 🔹 FCM Token ko await karein
  let fcmToken = await getFcmToken();
  console.log("✅ FCM Token received:", fcmToken);

  // Login data
  const data = {
    userid: userIdValue,
    password: passwordValue,
    code: codeValue,
    FToken: fcmToken || "", // agar token null ho to empty bhej do
  };

  const formData = new URLSearchParams(data).toString();

  try {
    // Show loading toast
    toast.info("Logging in, please wait...", {
      autoClose: false,
      toastId: "login-process",
    });

    const response = await axios.post(`${apiLinks}/login.php`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("Login response:", response);
    toast.dismiss("login-process");

    const { error, message, user, organisation } = response.data;

    // ✅ Login response check
    if (error === 200) {
      if (user.tusrsts === "A") {
        // ✅ Active account

        if (organisation.code !== "CRYSTAL") {
          try {
            // Fetch location and year data
            await dispatch(
              fetchGetActiveUserLocation(user?.tusrid, organisation.code)
            );
            await dispatch(
              fetchGetActiveUserYear(user?.tusrid, organisation.code)
            );

            // Check if yeardata and locationdata are available
            if (!yeardata[0] || !locationdata[0]) {
              // toast.error(
              //   `Invalid parameter please contact the administrator.`,
              //   { autoClose: 3000 }
              // );
              return;
            }

            // ✅ Save to state + localStorage
            setFromDate(yeardata[0].tstrdat);
            setToDate(yeardata[0].tenddat);
            setYearDescription(yeardata[0].tyerdsc);
            setLocationNumber(locationdata[0].tloccod);
            setposid(locationdata[0].tposid);
            setpostoken(locationdata[0].tpostkn);

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("organisation", JSON.stringify(organisation));
            localStorage.setItem(
              "locationnumber",
              JSON.stringify(locationdata[0].tloccod)
            );
            localStorage.setItem(
              "yeardescription",
              JSON.stringify(yeardata[0].tyerdsc)
            );
            localStorage.setItem(
              "globalposid",
              JSON.stringify(locationdata[0].tposid)
            );
            localStorage.setItem(
              "globallivedata",
              JSON.stringify(locationdata[0].tposliv)
            );
            localStorage.setItem(
              "globalStockCheck",
              JSON.stringify(locationdata[0].tstkchk)
            );
            localStorage.setItem(
              "globalMRPCheck",
              JSON.stringify(locationdata[0].tmrpchk)
            );
            localStorage.setItem(
              "globalpostoken",
              JSON.stringify(yeardata[0].tpostkn)
            );
            localStorage.setItem(
              "globalntn",
              JSON.stringify(locationdata[0].tntnnum || "")
            );
            localStorage.setItem(
              "globalstn",
              JSON.stringify(yeardata[0].tstnnum || "")
            );
            localStorage.setItem(
              "globalfbrtoken",
              JSON.stringify(locationdata[0].tpostkn || "")
            );

            toast.success(`${message}`, { autoClose: 3000 });

            // Navigate to MainPage
            setTimeout(() => {
              navigate("/MainPage");
            }, 2000);
          } catch (fetchError) {
            toast.error("Failed to fetch user data. Please try again.", {
              autoClose: 3000,
            });
            console.error("Fetch error:", fetchError);
          }
        } else if (organisation.code === "CRYSTAL") {
          try {
            // Fetch location and year data
            await dispatch(
              fetchGetActiveUserLocation(user?.tusrid, organisation.code)
            );
            await dispatch(
              fetchGetActiveUserYear(user?.tusrid, organisation.code)
            );

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("organisation", JSON.stringify(organisation));

            toast.success(`${message}`, { autoClose: 3000 });

            setTimeout(() => {
              navigate("/MainPage");
            }, 2000);
          } catch (fetchError) {
            toast.error("Failed to fetch user data. Please try again.", {
              autoClose: 3000,
            });
            console.error("Fetch error:", fetchError);
          }
        } else {
          toast.error(
            `You have no access to login to the ERP software. Please contact the ${codeValue} support team.`,
            { autoClose: 3000 }
          );
        }
      } else if (user.tusrsts === "C") {
        toast.error(
          `Your account has been cancelled. Please contact the ${codeValue} support team.`,
          { autoClose: 3000 }
        );
      } else if (user.tusrsts === "S") {
        toast.error(
          `Your account has been suspended. Please contact the ${codeValue} support team.`,
          { autoClose: 3000 }
        );
      } else {
        toast.error(
          `Unknown account status. Please contact the ${codeValue} support team.`,
          { autoClose: 3000 }
        );
      }
    } else {
      toast.error(`${message}`, { autoClose: 3000 });
    }
  } catch (error) {
    toast.dismiss("login-process");
    toast.error("An error occurred during login. Please try again.", {
      autoClose: 3000,
    });
    console.error("Login error:", error);
  }
}


  useEffect(() => {
    if (userid.current) {
      userid.current.focus();
    }
  }, []);

  const Enter1 = useRef(null);
  const Enter2 = useRef(null);
  const Enter3 = useRef(null);

  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      focusNextInput(ref);
    }
  };

  const handleFocus = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "orange";
    }
  };

  const handleBlur = (codeparam) => {
    if (codeparam.current) {
      codeparam.current.style.backgroundColor = "#3368B5";
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <ToastContainer />
      <div>
        <div className="form-login-container">
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
              borderRadius: "0px",
              boxShadow:
                "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
              overflow: "hidden",
              maxWidth: "800px",
              margin: "auto",
            }}
            className={`container ${isSignUp ? "right-panel-active" : ""}`}
            id="container"
          >
            <div className="form-container sign-in-container">
              <form action="#" autocomplete="off">
                <img
                  src={Crystall}
                  alt="Logo"
                  style={{ width: "70%", margin: "20px 0" }}
                />

                <div className="social-container">
                  <a
                    href="#"
                    className="social"
                    style={{ marginRight: "10px" }}
                  >
                    <i
                      className="fab fa-facebook-f"
                      style={{ color: "#3b5998" }}
                    ></i>
                  </a>
                  <a
                    href="#"
                    className="social"
                    style={{ marginRight: "10px" }}
                  >
                    <i
                      className="fab fa-google-plus-g"
                      style={{ color: "#dd4b39" }}
                    ></i>
                  </a>
                  <a href="#" className="social">
                    <i
                      className="fab fa-linkedin-in"
                      style={{ color: "#0077b5" }}
                    ></i>
                  </a>
                </div>

                <input
                  type="text"
                  placeholder="User ID"
                  ref={userid}
                  onKeyDown={(e) => handleEnterKeyPress(password, e)}
                  style={{
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  onFocus={(e) => {
                    e.target.select();
                    e.target.removeAttribute("readonly");
                  }}
                  onChange={(e) =>
                    (e.target.value = e.target.value.toLowerCase())
                  }
                  autocomplete="off"
                  readonly
                />
                <div
                  className="input-container"
                  style={{ position: "relative" }}
                >
                  <input
                    className="eyeball-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    ref={password}
                    onFocus={(e) => {
                      e.target.select();
                      e.target.removeAttribute("readonly");
                    }}
                    onKeyDown={(e) => handleEnterKeyPress(Code, e)}
                    style={{
                      padding: "10px",
                      margin: "10px 0",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                    autocomplete="new-password"
                    readonly
                  />
                  <div className="monkey" onClick={togglePassword}>
                    {showPassword ? (
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    ) : (
                      <i className="fa fa-eye-slash" aria-hidden="true"></i>
                    )}
                  </div>
                </div>

                <input
                  type="password"
                  placeholder="Code"
                  ref={Code}
                  onFocus={(e) => {
                    e.target.select();
                    e.target.removeAttribute("readonly");
                  }}
                  // onChange={(e) =>
                  //   (e.target.value = e.target.value.toUpperCase())
                  // }

                  onChange={(e) => {
                    const codeValue = e.target.value.toUpperCase();
                    e.target.value = codeValue;

                    const userIdValue = userid.current.value;

                    if (userIdValue && codeValue) {
                      dispatch(
                        fetchGetActiveUserLocation(userIdValue, codeValue)
                      );
                      dispatch(fetchGetActiveUserYear(userIdValue, codeValue));
                    }
                  }}
                  onKeyDown={(e) => handleEnterKeyPress(Enter3, e)}
                  style={{
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  autocomplete="off"
                  readonly
                />
                <button
                  className="btn-primary-itc"
                  ref={Enter3}
                  onClick={UserLogin}
                  type="submit"
                  // disabled={userData.loading}
                  onFocus={(e) => {
                    handleFocus(Enter3);
                    e.currentTarget.style.background = "#F58634";
                  }}
                  onBlur={(e) => {
                    handleBlur(Enter3);
                    e.currentTarget.style.background = "#6c63ff";
                  }}
                  style={{
                    background: "#6c63ff",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Sign In
                </button>
              </form>
            </div>
            <div className="form-container sign-up-container">
              <form action="#">
                <img
                  src={Crystall}
                  alt="Logo"
                  style={{ width: "70%", margin: "20px 0" }}
                />

                <div className="social-container">
                  <a
                    href="#"
                    className="social"
                    style={{ marginRight: "10px" }}
                  >
                    <i
                      className="fab fa-facebook-f"
                      style={{ color: "#3b5998" }}
                    ></i>
                  </a>
                  <a
                    href="#"
                    className="social"
                    style={{ marginRight: "10px" }}
                  >
                    <i
                      className="fab fa-google-plus-g"
                      style={{ color: "#dd4b39" }}
                    ></i>
                  </a>
                  <a href="#" className="social">
                    <i
                      className="fab fa-linkedin-in"
                      style={{ color: "#0077b5" }}
                    ></i>
                  </a>
                </div>

                <input
                  type="text"
                  placeholder="User ID"
                  // ref={userid}
                  onKeyDown={(e) => handleEnterKeyPress(password, e)}
                  style={{
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  autocomplete="off"
                />
                <input
                  type="password"
                  placeholder="Password"
                  // ref={password}
                  // onKeyDown={(e) => handleEnterKeyPress(Code, e)}
                  style={{
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  autocomplete="off"
                />
                <input
                  type="text"
                  placeholder="Code"
                  // ref={Code}
                  onChange={(e) =>
                    (e.target.value = e.target.value.toUpperCase())
                  }
                  onKeyDown={(e) => handleEnterKeyPress(Enter3, e)}
                  style={{
                    padding: "10px",
                    margin: "10px 0",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  autocomplete="off"
                />
                {/* <a
                href="#"
                style={{
                  color: "#6c63ff",
                  fontSize: "14px",
                  display: "block",
                  margin: "10px 0",
                }}
              >
                Forgot your password?
              </a> */}
                <button
                  className="btn-primary-itc"
                  ref={Enter3}
                  onClick={UserLogin}
                  type="submit"
                  // disabled={userData.loading}
                  onFocus={(e) => {
                    handleFocus(Enter3);
                    e.currentTarget.style.background = "#F58634";
                  }}
                  onBlur={(e) => {
                    handleBlur(Enter3);
                    e.currentTarget.style.background = "#6c63ff";
                  }}
                  style={{
                    background: "#6c63ff",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Sign In
                </button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <img
                    src={logocrystal}
                    alt="Logo"
                    style={{
                      width: "60%",
                      margin: "20px 0",
                      borderRadius: "50%",
                      boxShadow: "0 0 10px #6c63ff",
                    }}
                  />
                  <h1
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontFamily: "cursive",
                      fontSize: "24px",
                    }}
                  >
                    CRYSTAL SOLUTION
                  </h1>
                  <p
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontFamily: "cursive",
                    }}
                  >
                    Call: +92 304 4770075 +92 423518408 <br />
                    support@crystalsolutions.com.pk
                  </p>
                  <button
                    className="ghost"
                    id="signUp"
                    onClick={toggleSignUp}
                    style={{
                      background: "#fff",
                      color: "#6c63ff",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "12px",
                      marginTop: "20px",
                    }}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <img
                    src={logocrystal}
                    alt="Logo"
                    style={{
                      width: "60%",
                      margin: "20px 0",
                      borderRadius: "50%",
                      boxShadow: "0 0 10px #6c63ff",
                    }}
                  />
                  <h1
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontFamily: "cursive",
                      fontSize: "24px",
                    }}
                  >
                    CRYSTAL SOLUTION
                  </h1>
                  <p
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontFamily: "cursive",
                    }}
                  >
                    Call: +92 304 4770075 +92 423518408 <br />
                    support@crystalsolutions.com.pk
                  </p>
                  <button
                    className="ghost"
                    id="signUp"
                    onClick={toggleSignUp}
                    style={{
                      background: "#fff",
                      color: "#6c63ff",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "12px",
                      marginTop: "20px",
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginn;
