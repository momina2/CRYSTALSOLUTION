import { getLocationnumber } from "../Auth";

const apiLink = "https://crystalsolutions.com.pk/api/";

export const fetchDataMenu = async (userId, code) => {
  const response = await fetch(`${apiLink}GetUserMenu.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ FUsrId: userId, code: code }).toString(),
  });

  const data = await response.json();

  const filteredData = data.filter((item) => item.Permission !== "S");
  if (!response.ok) throw new Error(data.message);

  return filteredData;
};
export const fetchDataGetUser = async (code) => {
  const response = await fetch(`${apiLink}GetUser.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  // console.log("The data i received is api data:", data);

  if (!response.ok) throw new Error(data.message);

  return data;
};

export const fetchDataGetCrystalCustomer = async () => {
  const response = await fetch(`${apiLink}GetCrystalCustomer.php`);

  const data = await response.json();
  // console.log(data, "api.js");
  if (!response.ok) throw new Error(data.message);

  return data;
};

export const fetchDataGetCrystalMenu = async () => {
  const response = await fetch(`${apiLink}GetCrystalMenu.php`);

  const data = await response.json();
  // console.log(data, "fetchDataGetCrystalMenu api.js");
  if (!response.ok) throw new Error(data.message);

  return data;
};
export const fetchDataGetCrystalProduct = async () => {
  const response = await fetch(`${apiLink}GetProduct.php`);

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
};

// https://crystalsolutions.com.pk/api/GetYear.php
export const fetchDataGetYear = async (code) => {
  const response = await fetch(`${apiLink}GetYear.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  // console.log("The data i received is api data:", data);

  if (!response.ok) throw new Error(data.message);

  return data;
};

export const fetchDataGetBranches = async (code) => {
  const response = await fetch(`${apiLink}GetLocations.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  // console.log("The data i received is api data:", data);

  if (!response.ok) throw new Error(data.message);

  return data;
};

export const fetchDataGetAciveYear = async (code) => {
  const response = await fetch(`${apiLink}GetActiveYear.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();

  return data;
};
export const fetchDataGetAciveLocation = async (code) => {
  const response = await fetch(`${apiLink}GetActiveLocation.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataGetAciveUserYear = async (userId, code) => {
  const response = await fetch(`${apiLink}GetActiveUserYear.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ FUsrId: userId, code: code }).toString(),
  });

  const data = await response.json();

  return data;
};
export const fetchDataGetAciveUserLocation = async (userId, code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveUserLocations.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ FUsrId: userId, code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

///////////////////////////////////////////////////////////////////////
///////////////////////////FILE MAINTENANCE/////////////////////////////
/////////////////////////////////////////////////////////////////////////
///////////////////////////COMPANY MAINTENANCE/////////////////////////////

export const fetchDataGetCompanyMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetCompany.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetActiveCompanyMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveCompany.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  // console.log(data, "data api");
  return data;
};

export const fetchDataNewCompanyMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewCompany.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

///////////////////////////MENU COMPANY MAINTENANCE/////////////////////////////

export const fetchDataGetMenuCompanyMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetMenuCompany.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataGetActiveMenuCompanyMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveMenuCompany.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  // console.log(data, "data api");
  return data;
};

export const fetchDataNewMenuCompanyMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewMenuCompany.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

///////////////////////////CUSTOMER MAINTENANCE/////////////////////////////

export const fetchDataGetCustomerMaintenance = async (code,location) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetCustomers.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code,FLocCod:'001' }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataGetActiveCustomerMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveCustomer.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  // console.log(data, "data api");
  return data;
};

export const fetchDataNewCustomerMaintenance = async (code,location) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewCustomer.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: "001" }).toString(),
  });

  const data = await response.json();
  console.log(data,"dataaa")
  return data;
};

///////////////////////////CATEGORY MAINTENANCE/////////////////////////////
export const fetchDataGetCategoryMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetCatg.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetActiveCategoryMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveCatg.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewCategoryMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewCatg.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};


////////////////////////////////////////////

export const fetchDataGetMenuCategoryMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetMenuCatg.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetActiveMenuCategoryMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveMenuCatg.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewMenuCategoryMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewMenuCatg.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};


///////////////////////////CAPACITY MAINTENANCE/////////////////////////////
export const fetchDataGetCapacityMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetCapacity.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetActiveCapacityMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveCapacity.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewCapacityMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewCapacity.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetSubCategoryMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetSubCatg.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataNewSubCategoryMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewSubCatg.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
///////////////////////////Type MAINTENANCE/////////////////////////////
export const fetchDataGetTypeMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetType.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetActiveTypeMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveType.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewTypeMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewType.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};


///////////////////////////TABLE MAINTENANCE/////////////////////////////

export const fetchDataGetTableMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetTables.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataGetActiveTableMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveTable.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewTableMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewTable.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};





/////////////////////////// CUST TYPE MAINTENANCE /////////////////////////////

export const fetchDataGetCustTypeMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetCustTypes.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataGetActiveCustTypeMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveCustType.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewCustTypeMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewCustType.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

///////////////////////////Member Type MAINTENANCE/////////////////////////////
export const fetchDataGetMemberTypeMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetMemberTypeList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetActiveMemberTypeMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveMemberType.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewMemberTypeMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewMemberType.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
///////////////////////////Item MAINTENANCE/////////////////////////////
export const fetchDataGetItemMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetItem.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

/////////////////////////// SPARE PARTS MAINTENANCE /////////////////////////////
export const fetchDataGetSparePartsMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetSpareParts.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataGetItemMenuMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetItemMenu.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetActiveItemMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveItem.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataGetItemStock = async (code, location, date) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetItemStock.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FTrnDat: date,
      FStrCod: "",
    }).toString(),
  });

  const data = await response.json();

  return data.Detail;
};
///////////////////////////CITY MAINTENANCE/////////////////////////////
export const fetchDataGetCityMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetCities.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetActiveCityMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveCity.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewCityMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewCity.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

///////////////////////////REGION MAINTENANCE/////////////////////////////
export const fetchDataGetRegionMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetRegions.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataGetActiveRegionMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveRegion.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewRegionMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewRegion.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
/////////////////////////// GROUP MAINTENANCE /////////////////////////////
export const fetchDataGetGroupMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetGroups.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataNewGroupMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewGroup.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};


export const fetchDataGetActiveGroupMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveGroup.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

/////////////////////////// DELIVERY AREA MAINTENANCE /////////////////////////////
export const fetchDataGetDeliveryAreaMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetDeliveryAreas.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewDeliveryAreaMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewDeliveryArea.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};


///////////////////////////STATE MAINTENANCE/////////////////////////////
export const fetchDataGetStateMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetStates.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataGetActiveStateMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveState.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewStateMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewState.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

///////////////////////////INSTALLAR MAINTENANCE/////////////////////////////
export const fetchDataGetInstallarMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetInstallar.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetActiveInstallarMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveInstallar.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewInstallarMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewInstallar.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

///////////////////////////INSTALLAR MAINTENANCE/////////////////////////////
export const fetchDataGetAccountsMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetAccounts.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetActiveAccountsMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveAccounts.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

///////////////////////////STORE MAINTENANCE/////////////////////////////
export const fetchDataGetStoreMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetStore.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetActiveStoreMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveStore.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewStoreMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}NewStore.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

///////////////////////////EMPLOYEE MAINTENANCE/////////////////////////////
export const fetchDataGetEmployeeMaintenance = async (code, Location) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetEmployees.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });

  const data = await response.json();

  return data;
};
export const fetchDataGetActiveEmployeeMaintenance = async (code, Location) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveEmployee.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewEmployeeMaintenance = async (code, Location) => {
  // console.log(
  //   "================fetchDataNewEmployeeMaintenance============================",
  //   code,
  //   Location
  // );
  const response = await fetch(`${apiLink}NewEmployee.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });

  const data = await response.json();
  return data;
};


///////////////////////////SALARY MAINTENANCE/////////////////////////////
export const fetchDataGetSalary = async (code, Location) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetSalary.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });

  const data = await response.json();

  return data;
};


export const fetchDataNewSalarySheet = async (code, Location,Year) => {
  // console.log(
  //   "================fetchDataNewEmployeeMaintenance============================",
  //   code,
  //   Location
  // );
  const response = await fetch(`${apiLink}NewSalarySheet.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location,FYerDsc : Year }).toString(),
  });

  const data = await response.json();
  return data;
};
//////////////////////////Price List/////////////////////////////


export const fetchDataNewPriceList = async (code, Location,Year) => {
 
  const response = await fetch(`${apiLink}NewPriceList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location,FYerDsc : Year }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataGetPriceListList = async (code, Location,Year) => {
 
  const response = await fetch(`${apiLink}GetPriceListList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location,FYerDsc : Year }).toString(),
  });

  const data = await response.json();
  return data;
};

//////////////////////////COMMISSITION AGREEMENT/////////////////////////////


export const fetchDataNewCommissionAgreement = async (code, Location,Year) => {
 
  const response = await fetch(`${apiLink}NewCommissionAgreement.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location,FYerDsc : Year }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataGetCommissionAgreement = async (code, Location,Year) => {
 
  const response = await fetch(`${apiLink}GetCommissionAgreementList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location,FYerDsc : Year }).toString(),
  });

  const data = await response.json();
  console.log("GetCommissionAgreement response:", data.List);
  return data.List;
};
//////////////////////////COMMISSITION AGREEMENT/////////////////////////////


export const fetchDataNewItemMovement = async (code, Location,Year) => {

  const response = await fetch(`${apiLink}NewItemMovement.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location,FYerDsc : Year }).toString(),
  });

  const data = await response.json();
  return data;
};



export const fetchDataGetItemMovement = async (code,Location,Year) => {
  const response = await fetch(`${apiLink}GetItemMovementList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location,FYerDsc : Year }).toString(),
  });
  const data = await response.json();
  console.log("GetItemMovementList response:", data);

  return data.List;
};
//////////////////////////MEMBER MAINTENANCE/////////////////////////////
export const fetchDataGetMemberMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetMembers.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataGetMember1Maintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetMembers1.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });

  const data = await response.json();
  return data;
};
export const fetchDataGetActiveMemberMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetActiveMember.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewMemberMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}NewMember.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });

  const data = await response.json();
  return data;
};
///////////////////////////Visa MAINTENANCE/////////////////////////////
export const fetchDataGetVisaMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetVisa.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();

  return data;
};
export const fetchDataGetActiveVisaMaintenance = async (code) => {
  // console.log("============================================", code);
  const response = await fetch(`${apiLink}GetActiveVisa.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

export const fetchDataNewVisaMaintenance = async (code) => {
  // console.log(
  //   "================fetchDataNewEmployeeMaintenance============================",
  //   code,
  //   Location
  // );
  const response = await fetch(`${apiLink}NewVisa.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });

  const data = await response.json();
  return data;
};

///////////////////////////DISCIPLINE MAINTENANCE/////////////////////////////
export const fetchDataGetDisciplineMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetDiscipline.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};
export const fetchDataGetActiveDisciplineMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveDiscipline.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewDisciplineMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewDiscipline.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

///////////////////////////DOCUMENT MAINTENANCE/////////////////////////////
export const fetchDataGetDocumentMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetDocument.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};
export const fetchDataGetActiveDocumentMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveDocument.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewDocumentMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewDocument.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

///////////////////////////DEGREE MAINTENANCE/////////////////////////////
export const fetchDataGetDegreeMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetDegree.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};
export const fetchDataGetActiveDegreeMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveDegree.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewDegreeMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewDegree.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

///////////////////////////LANGUAGE MAINTENANCE/////////////////////////////
export const fetchDataGetLanguageMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetLanguage.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};
export const fetchDataGetActiveLanguageMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveLanguage.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewLanguageMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewLanguage.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

///////////////////////////COUNTRY MAINTENANCE/////////////////////////////
export const fetchDataGetCountryMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetCountry.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};
export const fetchDataGetActiveCountryMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveCountry.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewCountryMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewCountry.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

///////////////////////////PROGRAM MAINTENANCE/////////////////////////////
export const fetchDataGetProgramMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetProgram.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetActiveProgramMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveProgram.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewProgramMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewProgram.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

///////////////////////////UNIVERSITY MAINTENANCE/////////////////////////////
export const fetchDataGetUniversityMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetUniversity.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetActiveUniversityMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveUniversity.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewUniversityMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewUniversity.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

///////////////////////////EXAM MAINTENANCE/////////////////////////////
export const fetchDataGetExamMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetExam.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetActiveExamMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveExam.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewExamMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewExam.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};
///////////////////////////REFERENCE MAINTENANCE/////////////////////////////
export const fetchDataGetReferenceMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetReference.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveReferenceMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveReference.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewReferenceMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewReference.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

////////////////////////// TRAINER  MAINTENANCE/////////////////////////////
export const fetchDataGetTrainerMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetTrainer.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveTrainerMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetActiveTrainer.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewTrainerMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}NewTrainer.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};



////////////////////////// COLLECTOR  MAINTENANCE/////////////////////////////
export const fetchDataGetCollectorMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetCollector.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataNewCollectorMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}NewCollector.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};

////////////////////////// RIDER MAINTENANCE /////////////////////////////
export const fetchDataGetRiderMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetRiders.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataNewRiderMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}NewRider.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};
////////////////////////// WAITER MAINTENANCE /////////////////////////////
export const fetchDataGetWaiterMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetWaiters.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataNewWaiterMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}NewWaiter.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};


////////////////////////// VERIFY MAINTENANCE /////////////////////////////

export const fetchDataGetVerifyMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetVerifys.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataNewVerifyMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}NewVerify.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////// MANAGER MAINTENANCE /////////////////////////////
export const fetchDataGetManagerMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetManagers.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  // console.log("showing the manager data", data);
  return data;
};

export const fetchDataNewManagerMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}NewManager.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////// SALESMAN MAINTENANCE /////////////////////////////
export const fetchDataGetSalesManMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetSalesMen.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  // console.log("showing the SalesMan data", data);
  return data;
};

export const fetchDataNewSalesManMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}NewSalesMan.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};

////////////////////////// Slot  MAINTENANCE/////////////////////////////
export const fetchDataGetSlotMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetSlots.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveSlotMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetActiveSlot.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewSlotMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}NewSlot.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};

////////////////////////// Goal MAINTENANCE/////////////////////////////
export const fetchDataGetGoalMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetGoals.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveGoalMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetActiveGoal.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewGoalMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}NewGoal.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};
////////////////////////// FACILITY  MAINTENANCE/////////////////////////////
export const fetchDataGetFacilityMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetFacilities.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveFacilityMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetActiveFacility.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewFacilityMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}NewFacility.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};

////////////////////////// Class  MAINTENANCE/////////////////////////////
export const fetchDataGetClassMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetClasses.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveClassMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}GetActiveClass.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewClassMaintenance = async (code, Location) => {
  const response = await fetch(`${apiLink}NewClass.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: Location }).toString(),
  });
  const data = await response.json();
  return data;
};
///////////////////////////AREA MAINTENANCE/////////////////////////////
export const fetchDataGetAreaMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetAreas.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveAreaMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveArea.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewAreaMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewArea.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////// WORK SHOP MAINTENANCE/////////////////////////////
export const fetchDataGetWorkShopMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetWorkshop.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveWorkShopMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveWorkshop.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewWorkShopMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewWorkshop.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};
/////////////////////////// MOBILE MAINTENANCE/////////////////////////////
export const fetchDataGetMobileMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetMobile.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveMobileMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveMobile.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewMobileMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewMobile.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////// WorkShopItem MAINTENANCE/////////////////////////////
export const fetchDataGetWorkShopItemMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetWorkshopItem.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveWorkShopItemMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveWorkshopItem.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewWorkShopItemMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewWorkshopItem.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////// CLUB MAINTENANCE/////////////////////////////
export const fetchDataGetClubMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetClub.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveClubMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveClub.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewClubMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewClub.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};
/////////////////////////// COMPLAIN MAINTENANCE/////////////////////////////
export const fetchDataGetComplainMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetComplaint.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveComplainMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveComplaint.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewComplainMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewComplaint.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////// CONTROL MAINTENANCE/////////////////////////////
export const fetchDataGetControlMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetControl.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveControlMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveControl.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewControlMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewControl.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////// TECHNICAIN MAINTENANCE/////////////////////////////
export const fetchDataGetTechnicianMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetTechnicians.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  // console.log("showing the data", data);
  return data;
};

export const fetchDataGetActiveTechnicianMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveTechnician.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataNewTechnicianMaintenance = async (code) => {
  const response = await fetch(`${apiLink}NewTechnician.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};


/////////////////////////// HELPER MAINTENANCE /////////////////////////////

export const fetchDataGetHelperMaintenance = async (
  code,
  location
) => {
  const response = await fetch(`${apiLink}GetHelpers.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetActiveHelperMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetActiveHelper.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};



export const fetchDataNewHelperMaintenance = async (
  code,
  location
) => {
  const response = await fetch(`${apiLink}NewHelper.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location
    }).toString(),
  });
  const data = await response.json();
  return data;
};
/////////////////////////// JOB MAINTENANCE/////////////////////////////



export const fetchDataGetJobMaintenance = async (
  code,
  location
) => {
  const response = await fetch(`${apiLink}GetJobs1.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: "001"
    }).toString(),
  });
  const data = await response.json();
  console.log(data,"data aoi ");
  return data;
};
export const fetchDataNewJobMaintenance = async (
  code,
  location
) => {
  const response = await fetch(`${apiLink}NewJob1.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location
    }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////// UNASSIGN JOB MAINTENANCE/////////////////////////////

export const fetchDataGetUnassignedJobsMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetUnassignedJobs.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetTechnicianPendingStatusMaintenance = async (
  code,
  citycode,
  areacode
) => {
  const response = await fetch(`${apiLink}TechnicianPendingStatus.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FCtyCod: citycode,
      FAreCod: areacode,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////// PENDING JOB MAINTENANCE/////////////////////////////

export const fetchDataGetPendingJobsMaintenance = async (code, location) => {
  const response = await fetch(`${apiLink}GetPendingJobs.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: location }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////// OUTSTANDING DEMAND ///////////////////////////////

export const fetchDataGetOutstandingDemands = async (code, location,year) => {
  const response = await fetch(`${apiLink}GetOutstandingDemands.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FLocCod: location, FYerDsc: year }).toString(),
  });
  const data = await response.json();
  return data;
};

///////////////////////// PENDING REPAIRING JOB /////////////////////////////

export const fetchDataGetPendingRepairingJobsMaintenance = async (
  code,
  getreptype
) => {
  const response = await fetch(`${apiLink}GetPendingRepairingJobs.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FRepTyp: getreptype }).toString(),
  });
  const data = await response.json();
  return data;
};
///////////////////////// PENDING WORKSHOP JOB /////////////////////////////

export const fetchDataGetPendingWorkShopJobsMaintenance = async (
  code,
  getreptype
) => {
  const response = await fetch(`${apiLink}GetPendingWorkShopJobs.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FRepTyp: getreptype }).toString(),
  });
  const data = await response.json();
  return data;
};
///////////////////////// PENDING INSTALLATION JOB /////////////////////////////

export const fetchDataGetPendingInstallationJobsMaintenance = async (
  code,
  getreptype
) => {
  const response = await fetch(`${apiLink}GetPendingInstallationJobs.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FRepTyp: getreptype }).toString(),
  });
  const data = await response.json();
  return data;
};
/////////////////////////// DONE JOB MAINTENANCE/////////////////////////////

export const fetchDataGetDoneJobsMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetDoneJobs.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code ,FLocCod:'001'}).toString(),
  });
  const data = await response.json();
  return data;
};
/////////////////////////// DONE JOB MAINTENANCE/////////////////////////////

export const fetchDataGetFeedBackJobsMaintenance = async (code,location) => {
  const response = await fetch(`${apiLink}GetFeedBackJobs.php`, {
    method: "POST", 
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code ,FLocCod: location}).toString(),
  });
  const data = await response.json();
  return data;
};
/////////////////////////// CASH MEMO /////////////////////////////

export const fetchDataGetCashMemoMaintenance = async (code, getreptype) => {
  const response = await fetch(`${apiLink}GetCashMemo.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code, FRepTyp: getreptype }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////// Receiveable Code List  /////////////////////////////

export const fetchDataGetReceivableCodeList = async (code) => {
  const response = await fetch(`${apiLink}GetReceivableCodeList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};
/////////////////////////// Closed JOB MAINTENANCE/////////////////////////////

export const fetchDataGetClosedJobsMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetClosedJobs.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code: code }).toString(),
  });
  const data = await response.json();
  return data;
};

// /////////////////////////// COMPLAIN ITEM DEMAND PENDING  MAINTENANCE/////////////////////////////

export const fetchDataGetComplainItemDemandsMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetComplainItemDemands.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetComplainItemDemandDetailMaintenance = async (
  code,
  location,
  yeardesc,
  trnnumber
) => {
  const response = await fetch(`${apiLink}GetComplainItemDemandDetail.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
      FTrnNum: trnnumber,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////////////// PURCHASE ORDER ////////////////////////

export const fetchDataNewPurchaseOrder = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}NewPurchaseOrder.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};


export const fetchDataGetPurchaseOrderList = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetPurchaseOrderList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();

  return data.List;
};

/////////////////////////////////// DEMAND ////////////////////////

export const fetchDataNewDemand = async (code, location, yeardesc) => {
  const response = await fetch(`${apiLink}NewDemand.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetDemandList = async (code, location, yeardesc) => {
  const response = await fetch(`${apiLink}GetSparePartDemandList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data.List;
};

/////////////////////////////////// ISSUE ////////////////////////

export const fetchDataNewIssue = async (code, location, yeardesc) => {
  const response = await fetch(`${apiLink}NewIssue.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetIssueList = async (code, location, yeardesc) => {
  const response = await fetch(`${apiLink}GetSparePartIssueList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data.List;
};

/////////////////////////////////// SALE ORDER ////////////////////////

export const fetchDataNewSaleOrder = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}NewSaleOrder.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};


export const fetchDataGetSaleOrderList = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetSaleOrderList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
      FEmlAdd:"",
    }).toString(),
  });
  const data = await response.json();

  return data;
};


/////////////////////////////////// RECEIPE ////////////////////////

export const fetchDataNewReceipe = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}NewReceipe.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetReceipeList = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetReceipeList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
      FEmlAdd: "",
    }).toString(),
  });
  const data = await response.json();
  return data;
};

/////////////////////////////////// ITEM PURCHASE ////////////////////////
export const fetchDataGetSysControl = async (
  code,
  type
) => {
  const response = await fetch(`${apiLink}GetSysControl.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      type: type,
    }).toString(),
  });
  const data = await response.json();
  return data;
};


export const fetchDataGetTransactionInfo = async (
  code,
  location,
  yeardescription,
  trnnumber,
  trantype
) => {
  const response = await fetch(`${apiLink}GetTransactionInfo.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardescription,
      FTrnNum: trnnumber,
      FTrnTyp: trantype,

    }).toString(),
  });
  const data = await response.json();
  return data;
};
export const fetchDataNewItemPurchaseMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}NewItemPurchase.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetItemPurchaseMaintenance = async (
  code,
  location,
  yeardesc,
  trnnum
) => {
  const response = await fetch(`${apiLink}GetItemPurchase.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
      FTrnNum: trnnum,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetItemPurchaseListMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetItemPurchaseList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();

  return data.List;
};

/////////////////////////////////// ITEM PURCHASE RETURN  ////////////////////////

export const fetchDataNewItemPurchaseReturnMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}NewItemPurchaseReturn.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetItemPurchaseReturnMaintenance = async (
  code,
  location,
  yeardesc,
  trnnum
) => {
  const response = await fetch(`${apiLink}GetItemPurchaseReturn.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
      FTrnNum: trnnum,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetItemPurchaseReturnListMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetItemPurchaseReturnList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();

  return data.List;
};

/////////////////////////////////// ITEM Sale ////////////////////////

export const fetchDataNewItemSaleMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}NewItemSale.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetItemSaleMaintenance = async (
  code,
  location,
  yeardesc,
  trnnum
) => {
  const response = await fetch(`${apiLink}GetItemSale.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
      FTrnNum: trnnum,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetItemSaleListMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetItemSaleList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();

  return data.List;
};

/////////////////////////////////// ITEM Sale RETURN  ////////////////////////

export const fetchDataNewItemSaleReturnMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}NewItemSaleReturn.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetItemSaleReturnMaintenance = async (
  code,
  location,
  yeardesc,
  trnnum
) => {
  const response = await fetch(`${apiLink}GetItemSaleReturn.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
      FTrnNum: trnnum,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetItemSaleReturnListMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetItemSaleReturnList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();

  return data.List;
};
/////////////////////////////////// CASH RECEIVE ////////////////////////
export const fetchDataNewBill = async (code, location, yeardesc) => {
  const response = await fetch(`${apiLink}NewBill.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  console.log("data", data, code, location, yeardesc);
  return data;
};
/////////////////////////////////// CASH RECEIVE ////////////////////////
export const fetchDataNewCashReceiveMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}NewCashReceive.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  console.log("data", data, code, location, yeardesc);
  return data;
};

export const fetchDataGetCashReceiveMaintenance = async (
  code,
  location,
  yeardesc,
  trnnum
) => {
  const response = await fetch(`${apiLink}GetCashReceive.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
      FTrnNum: trnnum,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetCashReceiveListMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetCashReceiveList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();

  return data.List;
};

/////////////////////////////////// CASH Payment ////////////////////////
export const fetchDataNewCashPaymentMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}NewCashPayment.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetCashPaymentMaintenance = async (
  code,
  location,
  yeardesc,
  trnnum
) => {
  const response = await fetch(`${apiLink}GetCashPayment.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
      FTrnNum: trnnum,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetCashPaymentListMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetCashPaymentList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();

  return data.List;
};

/////////////////////////////////// BANK RECEIVE ////////////////////////
export const fetchDataNewBankReceiveMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}NewBankReceive.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetBankReceiveMaintenance = async (
  code,
  location,
  yeardesc,
  trnnum
) => {
  const response = await fetch(`${apiLink}GetBankReceive.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
      FTrnNum: trnnum,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetBankReceiveListMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetBankReceiveList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();

  return data.List;
};

/////////////////////////////////// BANK PAYMENT ////////////////////////
export const fetchDataNewBankPaymentMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}NewBankPayment.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetBankPaymentMaintenance = async (
  code,
  location,
  yeardesc,
  trnnum
) => {
  const response = await fetch(`${apiLink}GetBankPayment.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
      FTrnNum: trnnum,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetBankPaymentListMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetBankPaymentList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();

  return data.List;
};

/////////////////////////////////// Journal ////////////////////////
export const fetchDataNewJournalMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}NewJournal.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetJournalMaintenance = async (
  code,
  location,
  yeardesc,
  trnnum
) => {
  const response = await fetch(`${apiLink}GetJournal.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
      FTrnNum: trnnum,
    }).toString(),
  });
  const data = await response.json();
  return data;
};

export const fetchDataGetJournalListMaintenance = async (
  code,
  location,
  yeardesc
) => {
  const response = await fetch(`${apiLink}GetJournalList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      FLocCod: location,
      FYerDsc: yeardesc,
    }).toString(),
  });
  const data = await response.json();

  return data.List;
};

/////////////////////////////////// Cash Cod List ////////////////////////
export const fetchDataGetCashCodeListMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetCashCodeList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
    }).toString(),
  });
  const data = await response.json();
  return data;
};
/////////////////////////////////// Bank Cod List ////////////////////////
export const fetchDataGetBankCodeListMaintenance = async (code) => {
  const response = await fetch(`${apiLink}GetBankCodeList.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
    }).toString(),
  });
  const data = await response.json();
  return data;
};
