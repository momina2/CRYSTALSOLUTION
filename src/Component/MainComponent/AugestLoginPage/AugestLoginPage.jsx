import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AugestLoginPage/AugestLoginPage.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchGetActiveUserLocation, fetchGetActiveUserYear } from "../../Redux/action";
import { useTheme } from "../../../ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import CompanyLogo from "../../../image/logowithname.jpeg";
import CompanyContact from "../../../image/Crystal_info.jpeg";


// Import Pakistan-themed images
// Import Pakistan-themed assets
import PakistanFlag from "../../../image/pakistanflag.jpg";
import MinarEPakistan from "../../../image/minar-e-pakistan.jpg";
import QuaidImage from "../../../image/minar-e-pakistan.jpg";
import CrescentMoon from "../../../image/cresentmoon.jpeg";
import Fireworks from "../../../image/firework.avif";

// Add these imports with your other image imports at the top of your file
import BadshahiMosque from "../../../image/minar-e-pakistan.jpg";
import K2Mountain from "../../../image/minar-e-pakistan.jpg";
import JasmineFlower from "../../../image/minar-e-pakistan.jpg";
function AugestLoginPage() {



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
    const Enter3 = useRef();

    const [isAugust, setIsAugust] = useState(new Date().getMonth() + 1 === 8);
    const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    if (userid.current) {
      userid.current.focus();
    }

    // Check if it's August (Independence Month)
    const currentMonth = new Date().getMonth() + 1;
    setIsAugust(currentMonth === 8);

    // Create fireworks for the background
    if (currentMonth === 8) {
      const interval = setInterval(() => {
        setFireworks(prev => [
          ...prev,
          {
            id: Date.now(),
            left: Math.random() * 100,
            top: Math.random() * 100,
            color: `hsl(${Math.random() * 60 + 10}, 100%, 50%)`
          }
        ]);
        
        // Remove old fireworks
        setTimeout(() => {
          setFireworks(prev => prev.slice(1));
        }, 3000);
      }, 500);

      return () => clearInterval(interval);
    }
  }, []);
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
  
  const [showPassword, setShowPassword] = useState(false);
  const [showPatrioticMessage, setShowPatrioticMessage] = useState(false);

  // Check if it's August to show special theme
  const currentMonth = new Date().getMonth() + 1; // 8 for August

  useEffect(() => {
    if (userid.current) {
      userid.current.focus();
    }
  }, []);

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

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const togglePatrioticMessage = () => {
    setShowPatrioticMessage(!showPatrioticMessage);
  };




  async function UserLogin(e) {
    e.preventDefault();

    // Get form values
    const userIdValue = userid.current.value.toLowerCase();
    const passwordValue = password.current.value.toLowerCase();
    const codeValue = Code.current.value.toUpperCase();

    // Validate inputs before attempting login
    if (!userIdValue || !passwordValue || !codeValue) {
      toast.dismiss();
      toast.error("Please fill in all required fields", {
        autoClose: 3000,
      });
      return;
    }

    const data = {
      userid: userIdValue,
      password: passwordValue,
      code: codeValue,
    };

    const formData = new URLSearchParams(data).toString();

    // Show loading toast with a unique ID
    const loadingToastId = toast.loading("Logging in, please wait...");

    try {
      const response = await axios.post(`${apiLinks}/login.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log(response, "response");
      
      const { error, message, user, organisation } = response.data;

      // Check if response is successful (error code 200)
      if (error === 200) {
        // Check user status
        if (user.tusrsts === "A") {
          // Check user category
          if (user.tusrctg === "") {
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
                // setTimeout(() => {
                //   UserLogin(e); 
                // }, 3000);
                toast.update(loadingToastId, {
                  render: "Invalid parameter please contact the administrator.",
                  type: "error",
                  isLoading: false,
                  autoClose: 3000
                });
                return;
              }

              // Set necessary data in localStorage
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
                JSON.stringify(organisation)
              );
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

              // Update loading toast to success
              toast.update(loadingToastId, {
                render: message,
                type: "success",
                isLoading: false,
                autoClose: 3000
              });

              // Navigate to MainPage after successful login
              setTimeout(() => {
                navigate("/MainPage");
              }, 2000);
            } catch (fetchError) {
              toast.update(loadingToastId, {
                render: "Failed to fetch user data. Please try again.",
                type: "error",
                isLoading: false,
                autoClose: 3000
              });
              console.error("Fetch error:", fetchError);
            }
          } else if (organisation.code === "CRYSTAL") {
            try {
              await dispatch(
                fetchGetActiveUserLocation(user?.tusrid, organisation.code)
              );
              await dispatch(
                fetchGetActiveUserYear(user?.tusrid, organisation.code)
              );

              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem(
                "organisation",
                JSON.stringify(organisation)
              );

              toast.update(loadingToastId, {
                render: message,
                type: "success",
                isLoading: false,
                autoClose: 3000
              });

              setTimeout(() => {
                navigate("/MainPage");
              }, 2000);
            } catch (fetchError) {
              toast.update(loadingToastId, {
                render: "Failed to fetch user data. Please try again.",
                type: "error",
                isLoading: false,
                autoClose: 3000
              });
              console.error("Fetch error:", fetchError);
            }
          } else {
            toast.update(loadingToastId, {
              render: `You have no access to login to the ERP software. Please contact the ${codeValue} support team for assistance.`,
              type: "error",
              isLoading: false,
              autoClose: 3000
            });
          }
        } else if (user.tusrsts === "C") {
          toast.update(loadingToastId, {
            render: `Your account has been cancelled. Please contact the ${codeValue} support team.`,
            type: "error",
            isLoading: false,
            autoClose: 3000
          });
        } else if (user.tusrsts === "S") {
          toast.update(loadingToastId, {
            render: `Your account has been suspended. Please contact the ${codeValue} support team.`,
            type: "error",
            isLoading: false,
            autoClose: 3000
          });
        } else {
          toast.update(loadingToastId, {
            render: `Unknown account status. Please contact the ${codeValue} support team.`,
            type: "error",
            isLoading: false,
            autoClose: 3000
          });
        }
      } else {
        toast.update(loadingToastId, {
          render: message,
          type: "error",
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (error) {
      toast.update(loadingToastId, {
        render: "An error occurred during login. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
      console.error("Login error:", error);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="container-fluid pakistan-login">
  <div className="row h-100">
    {/* First Column - Hero Image */}
    <div className="col-md-4 first-column login-column">
      <div className="hero-image-container background-image-section">
        <img 
          src={MinarEPakistan} 
          alt="Minar-e-Pakistan" 
          className="hero-image img-fluid h-100 w-100"
        />
      </div>
      <div className="hero-content content-section">
        <h5 className="text-center text-white">
          Pakistan's Independence Day is celebrated on August 14th each year. 
          This day commemorates the nation's independence from British rule in 1947. 
          It is a public holiday with flag-raising ceremonies, parades, cultural events, 
          and the playing of patriotic songs across the country.
        </h5>
      </div>
    </div>

    {/* Second Column - Login Form */}
    <div className="col-md-4 second-column login-column d-flex flex-column">
      <div className="independence-header image-overlay">
        <div className="titles-container text-center mb-4">
          <h1 className="urdu-title">یوم آزادی مبارک</h1>
          <h3 className="english-title">Happy Independence Day</h3>
        </div>
      </div>
      
      <div className="login-form-container login-form-section">
        <div className="login-box">
          {/* <div className="form-header">
            <img src={CompanyLogo} alt="Company Logo" className="form-logo img-fluid" />
          </div> */}
          
          <form onSubmit={UserLogin} className="login-form">
            <div className="form-group">
              <div className="input-container">
                <i className="icon-user input-icon"></i>
                <input
                  type="text"
                  id="userid"
                  style={{ border: "1px solid #474747ff" }}
                  ref={userid}
                  placeholder="User ID"
                  onFocus={(e) => e.target.select()}
                  autoComplete="off"
                  onKeyDown={(e) => handleEnterKeyPress(password, e)}
                  className="form-control"
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="input-container">
                <i className="icon-lock input-icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  ref={password}
                  style={{ border: "1px solid #474747ff" }}
                  placeholder="Password"
                  onFocus={(e) => e.target.select()}
                  autoComplete="new-password"
                  className="form-control"
                  onKeyDown={(e) => handleEnterKeyPress(Code, e)}
                />
                <button 
                  type="button" 
                  className="show-password btn btn-link"
                  onClick={togglePassword}
                >
                  <i className={`icon-${showPassword ? 'eye-off' : 'eye'} input-icon`}></i>
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <div className="input-container">
                <i className="icon-organization input-icon"></i>
                <input
                  type="password"
                  id="code"
                  ref={Code}
                  style={{ border: "1px solid #474747ff" }}
onFocus={(e) => e.target.select()}
                  placeholder="Organization Code"
                  autoComplete="off"
                  className="form-control"
                   onInput={(e) => {
    e.target.value = e.target.value.toUpperCase();
  }}
   onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEnterKeyPress(Enter3, e)

      const codeValue = Code.current.value.toUpperCase();
      const userIdValue = userid.current.value.toLowerCase();

      if (userIdValue && codeValue) {
         dispatch(fetchGetActiveUserLocation(userIdValue, codeValue));
         dispatch(fetchGetActiveUserYear(userIdValue, codeValue));
      }
    }
  }}
                />
              </div>
            </div>
            
            <button type="submit" className="login-btn btn btn-primary w-100" ref={Enter3}>
              {isAugust ? (
                <>
                  <i className="icon-flag"></i> Sign In with Pride
                </>
              ) : (
                <>
                  <i className="icon-login"></i> Sign In
                </>
              )}
            </button>
          </form>
          
          {isAugust && (
            <div className="independence-footer mt-3">  
              <div className="quaid-quote">
                <i className="icon-quote-left"></i>
                "Unity, Faith, Discipline - Quaid-e-Azam"<span></span>
                <i className="icon-quote-right"></i>
                
              </div>
              
            </div>
          )}


          
        </div>
      </div>
      <div className="second-column-logo">
  <div className="logo-container">
    <img src={CompanyLogo} alt="Company Logo" className="company-logo img-fluid" />
    <img src={CompanyContact} alt="Company Information" className="company-info img-fluid" />
  </div>
</div>
    </div>

    {/* Third Column - Flag & Poetry */}
    <div className="col-md-4 third-column login-column d-flex flex-column">
      <div className="flag-container flag-section">
        <img 
          src={PakistanFlag} 
          alt="Pakistan Flag" 
          className="flag-image img-fluid h-100 w-100"
        />
      </div>
      <div className="poetry-container poetry-section">
        
        <div className="urdu-poetry text-center">
          <h3 className="poetry-title text-white">پاکستان زندہ باد</h3>
          <h6 className="poetry-text text-white">
            یہ وطن ہمارا، یہ پرچم ہمارا<br />
            سب سے پیارا ہے ہمارا پاکستان<br />
            اللہ کرے زورِ بازو ہمارا<br />
            اور بڑھے نام پاکستان کا
          </h6>
        </div>
      </div>
    </div>
  </div>
  
  {/* Fireworks and Stars */}
  {isAugust && (
    <>
      {[...Array(20)].map((_, i) => (
        <div key={`firework-${i}`} className="firework" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          color: ['gold', 'white', 'green'][Math.floor(Math.random() * 3)]
        }} />
      ))}
      {[...Array(30)].map((_, i) => (
        <div key={`star-${i}`} className="star" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 5 + 3}px`,
          height: `${Math.random() * 5 + 3}px`,
          animationDelay: `${Math.random() * 2}s`
        }} />
      ))}
    </>
  )}
</div>

   
    </>
  );
}

export default AugestLoginPage;