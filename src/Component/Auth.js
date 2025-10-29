// src/utils/auth.js

export const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const getUserData = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
export const getOrganisationData = () => {
  const organisation = localStorage.getItem("organisation");
  return organisation ? JSON.parse(organisation) : null;
};

export const getLocationnumber = () => {
  const locationnumber = localStorage.getItem("locationnumber");
  return locationnumber ? JSON.parse(locationnumber) : null;
};
export const getYearDescription = () => {
  const yeardescription = localStorage.getItem("yeardescription");
  return yeardescription ? JSON.parse(yeardescription) : null;
};

export const getPOSId = () => {
  const globalposid = localStorage.getItem("globalposid");
  return globalposid ? JSON.parse(globalposid) : null;
};

export const getPOSToken = () => {
  const globalpostoken = localStorage.getItem("globalpostoken");
  return globalpostoken ? JSON.parse(globalpostoken) : null;
};
export const getNTNNum = () => {
  const globalntn = localStorage.getItem("globalntn");
  return globalntn ? JSON.parse(globalntn) : null;
};

export const getSTNNum = () => {
  const globalstn = localStorage.getItem("globalstn");
  return globalstn ? JSON.parse(globalstn) : null;
};
export const getFBRToken = () => {
  const globalfbrtoken = localStorage.getItem("globalfbrtoken");
  return globalfbrtoken ? JSON.parse(globalfbrtoken) : null;
};
export const getPOSLive = () => {
  const globallivedata = localStorage.getItem("globallivedata");
  return globallivedata ? JSON.parse(globallivedata) : null;
};
export const getPOSCheck = () => {
  const globalStockCheck = localStorage.getItem("globalStockCheck");
  return globalStockCheck ? JSON.parse(globalStockCheck) : null;
};
export const getPOSMRPCheck = () => {
  const globalMRPCheck = localStorage.getItem("globalMRPCheck");
  return globalMRPCheck ? JSON.parse(globalMRPCheck) : null;
};
