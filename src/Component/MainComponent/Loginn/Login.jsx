import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Loginn/Login.css";
// import Crystal from "../../../image/logowithname.jpeg";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useTheme } from "../../../ThemeContext";
import Key from "../../../image/keys.png";
import { Link } from "react-router-dom";
// import Crystall from "../../../image/logowithname.jpeg";
import logocrystal from "../../../image/cs-logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
// import UserPaymentOptionsModel from "../../Transaction/UserPaymentOptions/UserPaymentOptionsModel";
import {
  fetchGetActiveUserLocation,
  fetchGetActiveUserYear,
} from "../../Redux/action";
import { getFcmToken } from "../../../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopBanner from "./TopBanner";
import { FiPhone, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";


const slides = [
  {
    title: "Installment Software",
    tagline:
      "Our Installment and Trading Software is designed to simplify and automate installment-based sales and asset trading operations.Our Installment and Trading Software is designed to simplify and automate installment-based sales and asset trading operations.Our Installment and Trading Software is designed to simplify and automate installment-based sales and asset trading operations.",
    link: "https://crystalsolutions.pk/services/installment-software",
  },
  {
    title: "Streamlined Complaint Management",
    tagline:
      "The Complaint Management System centralizes all customer complaints and service requests.The Complaint Management System centralizes all customer complaints and service requests.The Complaint Management System centralizes all customer complaints and service requests.",
    link: "https://crystalsolutions.pk/services/complaint-management",
  },
  {
    title: "All-in-One Fitness Platform",
    tagline:
      "Our Fitness Management Platform provides a complete digital solution for gyms and fitness centers.Our Fitness Management Platform provides a complete digital solution for gyms and fitness centers.Our Fitness Management Platform provides a complete digital solution for gyms and fitness centers.Our Fitness Management Platform provides a complete digital solution for gyms and fitness centers.",
    link: "https://crystalsolutions.pk/services/gym-management",
  },
  {
    title: "Digital Restaurant Ecosystem",
    tagline:
      "The Digital Restaurant Ecosystem is a comprehensive solution that streamlines restaurant operations.The Digital Restaurant Ecosystem is a comprehensive solution that streamlines restaurant operations.The Digital Restaurant Ecosystem is a comprehensive solution that streamlines restaurant operations.The Digital Restaurant Ecosystem is a comprehensive solution that streamlines restaurant operations.",
    link: "https://crystalsolutions.pk/services/restaurant-management",
  },
];

function Loginn() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

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
      generateCaptcha();
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

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setCaptchaInput("");
  };

  async function UserLogin(e) {
    e.preventDefault();
    console.log("Login function started");

    // Get form values
    const userIdValue = userid.current.value.trim();

    const passwordValue = password.current.value;
    // const codeValue = Code.current.value;
    const codeValue = Code.current.value.trim().toUpperCase();

    // Validate inputs
    if (!userIdValue || !passwordValue || !codeValue) {
      toast.dismiss();
      toast.error("Please fill in all required fields", {
        autoClose: 3000,
      });
      return;
    }

    if (captchaInput !== captcha) {
      toast.dismiss();
      toast.error("Invalid captcha, please try again", { autoClose: 3000 });
      generateCaptcha();
      return;
    }

    // 🔹 FCM Token ko await karein
    let fcmToken = "";
    try {
      fcmToken = await getFcmToken();
    } catch (err) {
      console.log("FCM error:", err);
    }

    console.log("✅ FCM Token received:", fcmToken);

    // Login data
    // const data = {
    //   userid: userIdValue,
    //   password: passwordValue,
    //   code: codeValue,
    //   FToken: fcmToken || "", // agar token null ho to empty bhej do
    // };

    const data = {
      FUsrId: userIdValue,
      tusrid: userIdValue,
      userid: userIdValue,

      FUsrPwd: passwordValue,
      tusrpwd: passwordValue,
      password: passwordValue,

      code: codeValue,
      Code: codeValue,

      FToken: fcmToken || "",
    };

    const formData = new URLSearchParams(data).toString();

    try {
      // Show loading toast
      toast.info("Logging in, please wait...", {
        autoClose: false,
        toastId: "login-process",
      });
      console.log("API =>", apiLinks);
      console.log("FORM DATA =>", formData);

      const response = await axios.post(`${apiLinks}/login.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("Login response:", response);
      toast.dismiss("login-process");

      const { error, message, user, organisation } = response.data;

      if (error === 200) {
        if (user.tusrsts === "A") {
          if (organisation.code !== "CRYSTAL") {
            try {
              await dispatch(
                fetchGetActiveUserLocation(user?.tusrid, organisation.code),
              );
              await dispatch(
                fetchGetActiveUserYear(user?.tusrid, organisation.code),
              );

              if (!yeardata[0] || !locationdata[0]) {
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
              localStorage.setItem(
                "organisation",
                JSON.stringify(organisation),
              );
              localStorage.setItem(
                "locationnumber",
                JSON.stringify(locationdata[0].tloccod),
              );
              localStorage.setItem(
                "yeardescription",
                JSON.stringify(yeardata[0].tyerdsc),
              );
              localStorage.setItem(
                "globalposid",
                JSON.stringify(locationdata[0].tposid),
              );
              localStorage.setItem(
                "globallivedata",
                JSON.stringify(locationdata[0].tposliv),
              );
              localStorage.setItem(
                "globalStockCheck",
                JSON.stringify(locationdata[0].tstkchk),
              );
              localStorage.setItem(
                "globalMRPCheck",
                JSON.stringify(locationdata[0].tmrpchk),
              );
              localStorage.setItem(
                "globalpostoken",
                JSON.stringify(yeardata[0].tpostkn),
              );
              localStorage.setItem(
                "globalntn",
                JSON.stringify(locationdata[0].tntnnum || ""),
              );
              localStorage.setItem(
                "globalstn",
                JSON.stringify(yeardata[0].tstnnum || ""),
              );
              localStorage.setItem(
                "globalfbrtoken",
                JSON.stringify(locationdata[0].tpostkn || ""),
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
                fetchGetActiveUserLocation(user?.tusrid, organisation.code),
              );
              await dispatch(
                fetchGetActiveUserYear(user?.tusrid, organisation.code),
              );

              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem(
                "organisation",
                JSON.stringify(organisation),
              );

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
              { autoClose: 3000 },
            );
          }
        } else if (user.tusrsts === "C") {
          toast.error(
            `Your account has been cancelled. Please contact the ${codeValue} support team.`,
            { autoClose: 3000 },
          );
        } else if (user.tusrsts === "S") {
          toast.error(
            `Your account has been suspended. Please contact the ${codeValue} support team.`,
            { autoClose: 3000 },
          );
        } else {
          toast.error(
            `Unknown account status. Please contact the ${codeValue} support team.`,
            { autoClose: 3000 },
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
      generateCaptcha();
    }
  }, []);
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const banners = [{ date: "2026-01-01" }];

    const found = banners.some((b) => b.date === today);
    setIsBannerVisible(found);
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
      <TopBanner />
      <div
        className={`loginPageWrapper ${
          isBannerVisible ? "withBanner" : "noBanner"
        }`}
      >
        {/* MAIN SECTION LEFT + RIGHT */}
        <div className="mainSection loginHeroWrapper">
          {/* <div className="topRightContact">
            <div className="contactRow">
              <FiPhone className="contactIcon" />
              <span>0304-4770075</span>
            </div>

            <div className="contactRow">
              <FiMail className="emailIcon" />
              <span>support@crystalsolutions.com.pk</span>
            </div>

            <div className="contactRow">
              <FiMapPin className="contactIcon" />
              <span>15-D AL-MAKKA CLY TOWN SHIP LHR.</span>
            </div>
            
            <div className="contactRow">
              <FiMapPin className="contactIcon" />
              <span>https://www.crystalsolutions.com.pk</span>
            </div>
          </div> */}

          <div className="topRightContact">
            <a href="tel:03044770075" className="contactRow">
              <FiPhone className="contactIcon" />
              <span>0304-4770075</span>
            </a>

            <a
              href="mailto:support@crystalsolutions.com.pk"
              className="contactRow"
            >
              <FiMail className="contactIcon" />
              <span>support@crystalsolutions.com.pk</span>
            </a>

            <div className="contactRow">
              <FiMapPin className="contactIcon" />
              <span>15-D Al-Makka Colony, Township, Lahore</span>
            </div>

            <a
              href="https://crystalsolutions.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="contactRow"
            >
              <FiGlobe className="contactIcon" />
              <span>www.crystalsolutions.pk</span>
            </a>
          </div>

          {/* LEFT SIDE — LOGIN FORM */}
          <div className="rightForm">
            <form autoComplete="off">
              <h2>Login to Continue</h2>

              <input
                type="text"
                placeholder="User ID"
                ref={userid}
                className="inputField"
              />

              <div className="passwordContainer">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  ref={password}
                  className="inputField"
                />
                <span className="eyeBtn" onClick={togglePassword}>
                  {showPassword ? (
                    <i className="fa fa-eye"></i>
                  ) : (
                    <i className="fa fa-eye-slash"></i>
                  )}
                </span>
              </div>

              <input
                type="password"
                placeholder="Code"
                ref={Code}
                className="inputField"
                onChange={(e) =>
                  (e.target.value = e.target.value.toUpperCase())
                }
              />

              {/* CAPTCHA */}
              <div className="captchaRow">
                <input
                  type="text"
                  placeholder="Enter Captcha"
                  value={captchaInput}
                  onChange={(e) =>
                    setCaptchaInput(e.target.value.toUpperCase())
                  }
                  className="inputField"
                />
                <div className="captchaBox">{captcha}</div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="refreshBtn"
                >
                  ↻
                </button>
              </div>

              <button type="button" className="loginBtn" onClick={UserLogin}>
                Sign In
              </button>
            </form>
          </div>

          {/* RIGHT SIDE — HERO STYLE TEXT SLIDER */}
          <div className="heroTextSlider">
            <div className="heroTextContent">
              {/* LOGO ABOVE TITLE */}
              <img
                src={logocrystal}
                alt="Crystal Solutions"
                className="heroLogo"
              />

              <div className="heroTitleRow">
                <h1 key={activeIndex}>{slides[activeIndex].title}</h1>

                <a
                  href={slides[activeIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visitSiteIcon"
                  title="Visit Page"
                >
                  <i className="fa fa-external-link"></i>
                </a>
              </div>

              <p>{slides[activeIndex].tagline}</p>

              {/* <button className="heroCTA">{slides[activeIndex].cta}</button> */}
            </div>

            {/* DOTS */}
            <div className="heroDots">
              {slides.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={index === activeIndex ? "dot activeDot" : "dot"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginn;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Loginn/Login.css";
// import Crystal from "../../../image/logowithname.jpeg";
// import axios from "axios";
// import Alert from "@mui/material/Alert";
// import { useTheme } from "../../../ThemeContext";
// import Key from "../../../image/keys.png";
// import { Link } from "react-router-dom";
// import Crystall from "../../../image/logowithname.jpeg";
// import logocrystal from "../../../image/logo.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useSelector, useDispatch } from "react-redux";
// // import UserPaymentOptionsModel from "../../Transaction/UserPaymentOptions/UserPaymentOptionsModel";
// import {
//   fetchGetActiveUserLocation,
//   fetchGetActiveUserYear,
// } from "../../Redux/action";
// import { getFcmToken } from "../../../firebase";
// function Loginn() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [alertData, setAlertData] = useState(null);
//   const { primaryColor, secondaryColor, apiLinks } = useTheme();
//   const {
//     getLocationNumber,
//     getyeardescription,
//     getnavbarfontcolor,
//     getnavbarbackgroundcolor,
//     getnowdate,
//     getnowtime,
//     getheaderfontsize,
//     getdatafontsize,
//     getfontstyle,
//     setFromDate,
//     setToDate,
//     setLocationNumber,
//     setposid,
//     setpostoken,
//     setnowdate,
//     setYearDescription,
//   } = useTheme();
//   const userid = useRef();
//   const password = useRef();
//   const Code = useRef();

//   const [isSignUp, setIsSignUp] = useState(false);

//   useEffect(() => {
//     if (userid.current) {
//       userid.current.focus();
//     }

//     // Fetch IP Address
//     axios
//       .get("https://api.ipify.org?format=json")
//       .then((response) => {
//         console.log("User IP Address:", response.data.ip);
//       })
//       .catch((error) => {
//         console.error("Error fetching IP address:", error);
//       });
//   }, []);

//   const {
//     data: locationdata,
//     loading: locationloading,
//     error: locationerror,
//   } = useSelector((state) => state.getactiveuserlocation);

//   const {
//     data: yeardata,
//     loading: yearloading,
//     error: yearerror,
//   } = useSelector((state) => state.getactiveuseryear);
//   const today = new Date();
//   const day = String(today.getDate()).padStart(2, "0");
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const year = today.getFullYear();
//   const formattedDate = `${day}-${month}-${year}`;

//   async function UserLogin(e) {
//     e.preventDefault();
//     console.log("Login function started");

//     // Get form values
//     const userIdValue = userid.current.value;
//     const passwordValue = password.current.value;
//     const codeValue = Code.current.value;

//     // Validate inputs
//     if (!userIdValue || !passwordValue || !codeValue) {
//       toast.dismiss();
//       toast.error("Please fill in all required fields", {
//         autoClose: 3000,
//       });
//       return;
//     }

//     // 🔹 FCM Token ko await karein
//     let fcmToken = await getFcmToken();
//     console.log("✅ FCM Token received:", fcmToken);

//     // Login data
//     const data = {
//       userid: userIdValue,
//       password: passwordValue,
//       code: codeValue,
//       FToken: fcmToken || "", // agar token null ho to empty bhej do
//     };

//     const formData = new URLSearchParams(data).toString();

//     try {
//       // Show loading toast
//       toast.info("Logging in, please wait...", {
//         autoClose: false,
//         toastId: "login-process",
//       });

//       const response = await axios.post(`${apiLinks}/login.php`, formData, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       });

//       console.log("Login response:", response);
//       toast.dismiss("login-process");

//       const { error, message, user, organisation } = response.data;

//       // ✅ Login response check
//       if (error === 200) {
//         if (user.tusrsts === "A") {
//           // ✅ Active account

//           if (organisation.code !== "CRYSTAL") {
//             try {
//               // Fetch location and year data
//               await dispatch(
//                 fetchGetActiveUserLocation(user?.tusrid, organisation.code)
//               );
//               await dispatch(
//                 fetchGetActiveUserYear(user?.tusrid, organisation.code)
//               );

//               // Check if yeardata and locationdata are available
//               if (!yeardata[0] || !locationdata[0]) {
//                 // toast.error(
//                 //   `Invalid parameter please contact the administrator.`,
//                 //   { autoClose: 3000 }
//                 // );
//                 return;
//               }

//               // ✅ Save to state + localStorage
//               setFromDate(yeardata[0].tstrdat);
//               setToDate(yeardata[0].tenddat);
//               setYearDescription(yeardata[0].tyerdsc);
//               setLocationNumber(locationdata[0].tloccod);
//               setposid(locationdata[0].tposid);
//               setpostoken(locationdata[0].tpostkn);

//               localStorage.setItem("isLoggedIn", "true");
//               localStorage.setItem("user", JSON.stringify(user));
//               localStorage.setItem(
//                 "organisation",
//                 JSON.stringify(organisation)
//               );
//               localStorage.setItem(
//                 "locationnumber",
//                 JSON.stringify(locationdata[0].tloccod)
//               );
//               localStorage.setItem(
//                 "yeardescription",
//                 JSON.stringify(yeardata[0].tyerdsc)
//               );
//               localStorage.setItem(
//                 "globalposid",
//                 JSON.stringify(locationdata[0].tposid)
//               );
//               localStorage.setItem(
//                 "globallivedata",
//                 JSON.stringify(locationdata[0].tposliv)
//               );
//               localStorage.setItem(
//                 "globalStockCheck",
//                 JSON.stringify(locationdata[0].tstkchk)
//               );
//               localStorage.setItem(
//                 "globalMRPCheck",
//                 JSON.stringify(locationdata[0].tmrpchk)
//               );
//               localStorage.setItem(
//                 "globalpostoken",
//                 JSON.stringify(yeardata[0].tpostkn)
//               );
//               localStorage.setItem(
//                 "globalntn",
//                 JSON.stringify(locationdata[0].tntnnum || "")
//               );
//               localStorage.setItem(
//                 "globalstn",
//                 JSON.stringify(yeardata[0].tstnnum || "")
//               );
//               localStorage.setItem(
//                 "globalfbrtoken",
//                 JSON.stringify(locationdata[0].tpostkn || "")
//               );

//               toast.success(`${message}`, { autoClose: 3000 });

//               // Navigate to MainPage
//               setTimeout(() => {
//                 navigate("/MainPage");
//               }, 2000);
//             } catch (fetchError) {
//               toast.error("Failed to fetch user data. Please try again.", {
//                 autoClose: 3000,
//               });
//               console.error("Fetch error:", fetchError);
//             }
//           } else if (organisation.code === "CRYSTAL") {
//             try {
//               // Fetch location and year data
//               await dispatch(
//                 fetchGetActiveUserLocation(user?.tusrid, organisation.code)
//               );
//               await dispatch(
//                 fetchGetActiveUserYear(user?.tusrid, organisation.code)
//               );

//               localStorage.setItem("isLoggedIn", "true");
//               localStorage.setItem("user", JSON.stringify(user));
//               localStorage.setItem(
//                 "organisation",
//                 JSON.stringify(organisation)
//               );

//               toast.success(`${message}`, { autoClose: 3000 });

//               setTimeout(() => {
//                 navigate("/MainPage");
//               }, 2000);
//             } catch (fetchError) {
//               toast.error("Failed to fetch user data. Please try again.", {
//                 autoClose: 3000,
//               });
//               console.error("Fetch error:", fetchError);
//             }
//           } else {
//             toast.error(
//               `You have no access to login to the ERP software. Please contact the ${codeValue} support team.`,
//               { autoClose: 3000 }
//             );
//           }
//         } else if (user.tusrsts === "C") {
//           toast.error(
//             `Your account has been cancelled. Please contact the ${codeValue} support team.`,
//             { autoClose: 3000 }
//           );
//         } else if (user.tusrsts === "S") {
//           toast.error(
//             `Your account has been suspended. Please contact the ${codeValue} support team.`,
//             { autoClose: 3000 }
//           );
//         } else {
//           toast.error(
//             `Unknown account status. Please contact the ${codeValue} support team.`,
//             { autoClose: 3000 }
//           );
//         }
//       } else {
//         toast.error(`${message}`, { autoClose: 3000 });
//       }
//     } catch (error) {
//       toast.dismiss("login-process");
//       toast.error("An error occurred during login. Please try again.", {
//         autoClose: 3000,
//       });
//       console.error("Login error:", error);
//     }
//   }

//   useEffect(() => {
//     if (userid.current) {
//       userid.current.focus();
//     }
//   }, []);

//   const Enter1 = useRef(null);
//   const Enter2 = useRef(null);
//   const Enter3 = useRef(null);

//   const focusNextInput = (ref) => {
//     if (ref.current) {
//       ref.current.focus();
//     }
//   };

//   const handleEnterKeyPress = (ref, e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       focusNextInput(ref);
//     }
//   };

//   const handleFocus = (codeparam) => {
//     if (codeparam.current) {
//       codeparam.current.style.backgroundColor = "orange";
//     }
//   };

//   const handleBlur = (codeparam) => {
//     if (codeparam.current) {
//       codeparam.current.style.backgroundColor = "#3368B5";
//     }
//   };

//   const toggleSignUp = () => {
//     setIsSignUp(!isSignUp);
//   };
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePassword = () => {
//     setShowPassword(!showPassword);
//   };
//   return (
//     <>
//       <ToastContainer />
//       <div>
//         <div className="form-login-container">
//           <div
//             style={{
//               fontFamily: "Arial, sans-serif",
//               background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
//               borderRadius: "0px",
//               boxShadow:
//                 "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
//               overflow: "hidden",
//               maxWidth: "800px",
//               margin: "auto",
//             }}
//             className={`container ${isSignUp ? "right-panel-active" : ""}`}
//             id="container"
//           >
//             <div className="form-container sign-in-container">
//               <form action="#" autocomplete="off">
//                 <img
//                   src={Crystall}
//                   alt="Logo"
//                   style={{ width: "70%", margin: "20px 0" }}
//                 />

//                 <div className="social-container">
//                   <a
//                     href="#"
//                     className="social"
//                     style={{ marginRight: "10px" }}
//                   >
//                     <i
//                       className="fab fa-facebook-f"
//                       style={{ color: "#3b5998" }}
//                     ></i>
//                   </a>
//                   <a
//                     href="#"
//                     className="social"
//                     style={{ marginRight: "10px" }}
//                   >
//                     <i
//                       className="fab fa-google-plus-g"
//                       style={{ color: "#dd4b39" }}
//                     ></i>
//                   </a>
//                   <a href="#" className="social">
//                     <i
//                       className="fab fa-linkedin-in"
//                       style={{ color: "#0077b5" }}
//                     ></i>
//                   </a>
//                 </div>

//                 <input
//                   type="text"
//                   placeholder="User ID"
//                   ref={userid}
//                   onKeyDown={(e) => handleEnterKeyPress(password, e)}
//                   style={{
//                     padding: "10px",
//                     margin: "10px 0",
//                     borderRadius: "5px",
//                     border: "1px solid #ccc",
//                   }}
//                   onFocus={(e) => {
//                     e.target.select();
//                     e.target.removeAttribute("readonly");
//                   }}
//                   onChange={(e) =>
//                     (e.target.value = e.target.value.toLowerCase())
//                   }
//                   autocomplete="off"
//                   readonly
//                 />
//                 <div
//                   className="input-container"
//                   style={{ position: "relative" }}
//                 >
//                   <input
//                     className="eyeball-input"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     ref={password}
//                     onFocus={(e) => {
//                       e.target.select();
//                       e.target.removeAttribute("readonly");
//                     }}
//                     onKeyDown={(e) => handleEnterKeyPress(Code, e)}
//                     style={{
//                       padding: "10px",
//                       margin: "10px 0",
//                       borderRadius: "5px",
//                       border: "1px solid #ccc",
//                       width: "100%",
//                     }}
//                     autocomplete="new-password"
//                     readonly
//                   />
//                   <div className="monkey" onClick={togglePassword}>
//                     {showPassword ? (
//                       <i className="fa fa-eye" aria-hidden="true"></i>
//                     ) : (
//                       <i className="fa fa-eye-slash" aria-hidden="true"></i>
//                     )}
//                   </div>
//                 </div>

//                 <input
//                   type="password"
//                   placeholder="Code"
//                   ref={Code}
//                   onFocus={(e) => {
//                     e.target.select();
//                     e.target.removeAttribute("readonly");
//                   }}
//                   // onChange={(e) =>
//                   //   (e.target.value = e.target.value.toUpperCase())
//                   // }

//                   onChange={(e) => {
//                     const codeValue = e.target.value.toUpperCase();
//                     e.target.value = codeValue;

//                     const userIdValue = userid.current.value;

//                     if (userIdValue && codeValue) {
//                       dispatch(
//                         fetchGetActiveUserLocation(userIdValue, codeValue)
//                       );
//                       dispatch(fetchGetActiveUserYear(userIdValue, codeValue));
//                     }
//                   }}
//                   onKeyDown={(e) => handleEnterKeyPress(Enter3, e)}
//                   style={{
//                     padding: "10px",
//                     margin: "10px 0",
//                     borderRadius: "5px",
//                     border: "1px solid #ccc",
//                   }}
//                   autocomplete="off"
//                   readonly
//                 />
//                 <button
//                   className="btn-primary-itc"
//                   ref={Enter3}
//                   onClick={UserLogin}
//                   type="submit"
//                   // disabled={userData.loading}
//                   onFocus={(e) => {
//                     handleFocus(Enter3);
//                     e.currentTarget.style.background = "#F58634";
//                   }}
//                   onBlur={(e) => {
//                     handleBlur(Enter3);
//                     e.currentTarget.style.background = "#6c63ff";
//                   }}
//                   style={{
//                     background: "#6c63ff",
//                     color: "#fff",
//                     padding: "10px 20px",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     fontSize: "12px",
//                   }}
//                 >
//                   Sign In
//                 </button>
//               </form>
//             </div>
//             <div className="form-container sign-up-container">
//               <form action="#">
//                 <img
//                   src={Crystall}
//                   alt="Logo"
//                   style={{ width: "70%", margin: "20px 0" }}
//                 />

//                 <div className="social-container">
//                   <a
//                     href="#"
//                     className="social"
//                     style={{ marginRight: "10px" }}
//                   >
//                     <i
//                       className="fab fa-facebook-f"
//                       style={{ color: "#3b5998" }}
//                     ></i>
//                   </a>
//                   <a
//                     href="#"
//                     className="social"
//                     style={{ marginRight: "10px" }}
//                   >
//                     <i
//                       className="fab fa-google-plus-g"
//                       style={{ color: "#dd4b39" }}
//                     ></i>
//                   </a>
//                   <a href="#" className="social">
//                     <i
//                       className="fab fa-linkedin-in"
//                       style={{ color: "#0077b5" }}
//                     ></i>
//                   </a>
//                 </div>

//                 <input
//                   type="text"
//                   placeholder="User ID"
//                   // ref={userid}
//                   onKeyDown={(e) => handleEnterKeyPress(password, e)}
//                   style={{
//                     padding: "10px",
//                     margin: "10px 0",
//                     borderRadius: "5px",
//                     border: "1px solid #ccc",
//                   }}
//                   autocomplete="off"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   // ref={password}
//                   // onKeyDown={(e) => handleEnterKeyPress(Code, e)}
//                   style={{
//                     padding: "10px",
//                     margin: "10px 0",
//                     borderRadius: "5px",
//                     border: "1px solid #ccc",
//                   }}
//                   autocomplete="off"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Code"
//                   // ref={Code}
//                   onChange={(e) =>
//                     (e.target.value = e.target.value.toUpperCase())
//                   }
//                   onKeyDown={(e) => handleEnterKeyPress(Enter3, e)}
//                   style={{
//                     padding: "10px",
//                     margin: "10px 0",
//                     borderRadius: "5px",
//                     border: "1px solid #ccc",
//                   }}
//                   autocomplete="off"
//                 />
//                 {/* <a
//                 href="#"
//                 style={{
//                   color: "#6c63ff",
//                   fontSize: "14px",
//                   display: "block",
//                   margin: "10px 0",
//                 }}
//               >
//                 Forgot your password?
//               </a> */}
//                 <button
//                   className="btn-primary-itc"
//                   ref={Enter3}
//                   onClick={UserLogin}
//                   type="submit"
//                   // disabled={userData.loading}
//                   onFocus={(e) => {
//                     handleFocus(Enter3);
//                     e.currentTarget.style.background = "#F58634";
//                   }}
//                   onBlur={(e) => {
//                     handleBlur(Enter3);
//                     e.currentTarget.style.background = "#6c63ff";
//                   }}
//                   style={{
//                     background: "#6c63ff",
//                     color: "#fff",
//                     padding: "10px 20px",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     fontSize: "12px",
//                   }}
//                 >
//                   Sign In
//                 </button>
//               </form>
//             </div>
//             <div className="overlay-container">
//               <div className="overlay">
//                 <div className="overlay-panel overlay-left">
//                   <img
//                     src={logocrystal}
//                     alt="Logo"
//                     style={{
//                       width: "60%",
//                       margin: "20px 0",
//                       borderRadius: "50%",
//                       boxShadow: "0 0 10px #6c63ff",
//                     }}
//                   />
//                   <h1
//                     style={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       fontFamily: "cursive",
//                       fontSize: "24px",
//                     }}
//                   >
//                     CRYSTAL SOLUTION
//                   </h1>
//                   <p
//                     style={{
//                       color: "#fff",
//                       fontSize: "14px",
//                       fontFamily: "cursive",
//                     }}
//                   >
//                     Call: +92 304 4770075 +92 423518408 <br />
//                     support@crystalsolutions.com.pk
//                   </p>
//                   <button
//                     className="ghost"
//                     id="signUp"
//                     onClick={toggleSignUp}
//                     style={{
//                       background: "#fff",
//                       color: "#6c63ff",
//                       padding: "10px 20px",
//                       border: "none",
//                       borderRadius: "5px",
//                       cursor: "pointer",
//                       fontSize: "12px",
//                       marginTop: "20px",
//                     }}
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//                 <div className="overlay-panel overlay-right">
//                   <img
//                     src={logocrystal}
//                     alt="Logo"
//                     style={{
//                       width: "60%",
//                       margin: "20px 0",
//                       borderRadius: "50%",
//                       boxShadow: "0 0 10px #6c63ff",
//                     }}
//                   />
//                   <h1
//                     style={{
//                       color: "#fff",
//                       fontWeight: "bold",
//                       fontFamily: "cursive",
//                       fontSize: "24px",
//                     }}
//                   >
//                     CRYSTAL SOLUTION
//                   </h1>
//                   <p
//                     style={{
//                       color: "#fff",
//                       fontSize: "14px",
//                       fontFamily: "cursive",
//                     }}
//                   >
//                     Call: +92 304 4770075 +92 423518408 <br />
//                     support@crystalsolutions.com.pk
//                   </p>
//                   <button
//                     className="ghost"
//                     id="signUp"
//                     onClick={toggleSignUp}
//                     style={{
//                       background: "#fff",
//                       color: "#6c63ff",
//                       padding: "10px 20px",
//                       border: "none",
//                       borderRadius: "5px",
//                       cursor: "pointer",
//                       fontSize: "12px",
//                       marginTop: "20px",
//                     }}
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Loginn;
