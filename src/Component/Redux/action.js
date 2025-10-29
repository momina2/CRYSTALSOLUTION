import {
  fetchDataMenu,
  fetchDataGetUser,
  fetchDataGetCrystalCustomer,
  fetchDataGetCrystalMenu,
  fetchDataGetCrystalProduct,
  fetchDataGetYear,
  fetchDataGetBranches,
  fetchDataGetAciveYear,
  fetchDataGetAciveLocation,
  fetchDataGetAciveUserLocation,
  fetchDataGetAciveUserYear,
  fetchDataGetCompanyMaintenance,
  fetchDataNewCompanyMaintenance,
  fetchDataGetActiveCompanyMaintenance,
  fetchDataGetCategoryMaintenance,
  fetchDataGetActiveCategoryMaintenance,
  fetchDataNewCategoryMaintenance,
  fetchDataGetCapacityMaintenance,
  fetchDataGetActiveCapacityMaintenance,
  fetchDataNewCapacityMaintenance,
  fetchDataGetTypeMaintenance,
  fetchDataGetActiveTypeMaintenance,
  fetchDataNewTypeMaintenance,
  fetchDataGetItemMaintenance,
  fetchDataGetActiveItemMaintenance,
  fetchDataNewCityMaintenance,
  fetchDataGetActiveCityMaintenance,
  fetchDataGetCityMaintenance,
  fetchDataGetInstallarMaintenance,
  fetchDataGetActiveInstallarMaintenance,
  fetchDataNewInstallarMaintenance,
  fetchDataGetActiveAccountsMaintenance,
  fetchDataGetAccountsMaintenance,
  fetchDataGetActiveStoreMaintenance,
  fetchDataNewStoreMaintenance,
  fetchDataGetStoreMaintenance,
  fetchDataGetEmployeeMaintenance,
  fetchDataNewEmployeeMaintenance,
  fetchDataGetActiveEmployeeMaintenance,
  fetchDataNewVisaMaintenance,
  fetchDataGetActiveVisaMaintenance,
  fetchDataGetVisaMaintenance,
  fetchDataNewDisciplineMaintenance,
  fetchDataGetActiveDisciplineMaintenance,
  fetchDataGetDisciplineMaintenance,
  fetchDataNewDocumentMaintenance,
  fetchDataGetActiveDocumentMaintenance,
  fetchDataGetDocumentMaintenance,
  fetchDataGetDegreeMaintenance,
  fetchDataGetActiveDegreeMaintenance,
  fetchDataNewDegreeMaintenance,
  fetchDataGetLanguageMaintenance,
  fetchDataGetActiveLanguageMaintenance,
  fetchDataNewLanguageMaintenance,
  fetchDataGetCountryMaintenance,
  fetchDataGetActiveCountryMaintenance,
  fetchDataNewCountryMaintenance,
  fetchDataGetProgramMaintenance,
  fetchDataGetActiveProgramMaintenance,
  fetchDataNewProgramMaintenance,
  fetchDataGetUniversityMaintenance,
  fetchDataGetActiveUniversityMaintenance,
  fetchDataNewUniversityMaintenance,
  fetchDataNewExamMaintenance,
  fetchDataGetActiveExamMaintenance,
  fetchDataGetExamMaintenance,
  fetchDataGetReferenceMaintenance,
  fetchDataGetActiveReferenceMaintenance,
  fetchDataNewReferenceMaintenance,
  fetchDataNewAreaMaintenance,
  fetchDataGetAreaMaintenance,
  fetchDataGetActiveAreaMaintenance,
  fetchDataGetWorkShopMaintenance,
  fetchDataGetActiveWorkShopMaintenance,
  fetchDataNewWorkShopMaintenance,
  fetchDataNewMobileMaintenance,
  fetchDataGetActiveMobileMaintenance,
  fetchDataGetMobileMaintenance,
  fetchDataNewWorkShopItemMaintenance,
  fetchDataGetActiveWorkShopItemMaintenance,
  fetchDataNewClubMaintenance,
  fetchDataGetActiveClubMaintenance,
  fetchDataGetClubMaintenance,
  fetchDataNewComplainMaintenance,
  fetchDataGetActiveComplainMaintenance,
  fetchDataGetComplainMaintenance,
  fetchDataGetWorkShopItemMaintenance,
  fetchDataNewControlMaintenance,
  fetchDataGetActiveControlMaintenance,
  fetchDataGetControlMaintenance,
  fetchDataGetTechnicianMaintenance,
  fetchDataGetActiveTechnicianMaintenance,
  fetchDataNewTechnicianMaintenance,
  fetchDataGetJobMaintenance,
  fetchDataNewJobMaintenance,
  fetchDataGetUnassignedJobsMaintenance,
  fetchDataGetTechnicianPendingStatusMaintenance,
  fetchDataGetPendingJobsMaintenance,
  fetchDataGetDoneJobsMaintenance,
  fetchDataGetClosedJobsMaintenance,
  fetchDataGetComplainItemDemandsMaintenance,
  fetchDataGetComplainItemDemandDetailMaintenance,
  fetchDataNewItemPurchaseMaintenance,
  fetchDataGetItemPurchaseMaintenance,
  fetchDataGetItemPurchaseListMaintenance,
  fetchDataNewCashReceiveMaintenance,
  fetchDataGetCashReceiveMaintenance,
  fetchDataGetCashReceiveListMaintenance,
  fetchDataNewCashPaymentMaintenance,
  fetchDataGetCashPaymentMaintenance,
  fetchDataGetCashPaymentListMaintenance,
  fetchDataNewBankReceiveMaintenance,
  fetchDataGetBankReceiveMaintenance,
  fetchDataGetBankReceiveListMaintenance,
  fetchDataNewBankPaymentMaintenance,
  fetchDataGetBankPaymentMaintenance,
  fetchDataGetBankPaymentListMaintenance,
  fetchDataGetJournalListMaintenance,
  fetchDataGetJournalMaintenance,
  fetchDataNewJournalMaintenance,
  fetchDataGetPendingInstallationJobsMaintenance,
  fetchDataGetPendingRepairingJobsMaintenance,
  fetchDataGetCashCodeListMaintenance,
  fetchDataNewItemPurchaseReturnMaintenance,
  fetchDataGetItemPurchaseReturnMaintenance,
  fetchDataGetItemPurchaseReturnListMaintenance,
  fetchDataGetItemSaleReturnListMaintenance,
  fetchDataGetItemSaleReturnMaintenance,
  fetchDataNewItemSaleReturnMaintenance,
  fetchDataGetItemSaleListMaintenance,
  fetchDataGetItemSaleMaintenance,
  fetchDataNewItemSaleMaintenance,
  fetchDataGetCashMemoMaintenance,
  fetchDataGetBankCodeListMaintenance,
  fetchDataGetReceivableCodeList,
  fetchDataGetPendingWorkShopJobsMaintenance,
  fetchDataGetItemStock,
  fetchDataNewTrainerMaintenance,
  fetchDataGetActiveTrainerMaintenance,
  fetchDataGetTrainerMaintenance,
  fetchDataGetSlotMaintenance,
  fetchDataGetActiveSlotMaintenance,
  fetchDataNewSlotMaintenance,
  fetchDataNewClassMaintenance,
  fetchDataGetActiveClassMaintenance,
  fetchDataGetClassMaintenance,
  fetchDataGetFacilityMaintenance,
  fetchDataGetActiveFacilityMaintenance,
  fetchDataNewFacilityMaintenance,
  fetchDataGetMemberMaintenance,
  fetchDataGetActiveMemberMaintenance,
  fetchDataNewMemberMaintenance,
  fetchDataNewBill,
  fetchDataGetGoalMaintenance,
  fetchDataGetActiveGoalMaintenance,
  fetchDataNewGoalMaintenance,
  fetchDataNewSalarySheet,
  fetchDataGetSalary,
  fetchDataNewPriceList,
  fetchDataGetPriceListList,
  fetchDataGetCommissionAgreement,
  fetchDataNewCommissionAgreement,
  fetchDataGetItemMovement,
  fetchDataNewItemMovement,
  fetchDataNewMemberTypeMaintenance,
  fetchDataGetActiveMemberTypeMaintenance,
  fetchDataGetMemberTypeMaintenance,
  fetchDataNewCollectorMaintenance,
  fetchDataGetCollectorMaintenance,
  fetchDataNewPurchaseOrder,
  fetchDataGetPurchaseOrderList,
  fetchDataGetSaleOrderList,
  fetchDataNewSaleOrder,
  fetchDataGetSysControl,
  fetchDataGetTransactionInfo,
  fetchDataGetItemMenuMaintenance,
  fetchDataGetSubCategoryMaintenance,
  fetchDataNewSubCategoryMaintenance,
  fetchDataGetMember1Maintenance,
  fetchDataNewMenuCategoryMaintenance,
  fetchDataGetActiveMenuCategoryMaintenance,
  fetchDataGetMenuCategoryMaintenance,
  fetchDataNewCustomerMaintenance,
  fetchDataGetActiveCustomerMaintenance,
  fetchDataGetCustomerMaintenance,
  fetchDataNewCustTypeMaintenance,
  fetchDataGetActiveCustTypeMaintenance,
  fetchDataGetCustTypeMaintenance,
  fetchDataNewStateMaintenance,
  fetchDataGetActiveStateMaintenance,
  fetchDataGetStateMaintenance,
  fetchDataGetRegionMaintenance,
  fetchDataGetActiveRegionMaintenance,
  fetchDataNewRegionMaintenance,
  fetchDataNewManagerMaintenance,
  fetchDataGetManagerMaintenance,
  fetchDataNewSalesManMaintenance,
  fetchDataGetSalesManMaintenance,
  fetchDataNewVerifyMaintenance,
  fetchDataGetVerifyMaintenance,
  fetchDataGetGroupMaintenance,
  fetchDataGetActiveGroupMaintenance,
  fetchDataNewGroupMaintenance,
  fetchDataNewRiderMaintenance,
  fetchDataGetRiderMaintenance,
  fetchDataGetReceipeList,
  fetchDataNewReceipe,
  fetchDataGetDeliveryAreaMaintenance,
  fetchDataNewDeliveryAreaMaintenance,
  fetchDataNewHelperMaintenance,
  fetchDataGetActiveHelperMaintenance,
  fetchDataGetHelperMaintenance,
  fetchDataGetWaiterMaintenance,
  fetchDataNewWaiterMaintenance,
  fetchDataGetFeedBackJobsMaintenance,
  fetchDataGetSparePartsMaintenance,
  fetchDataNewDemand,
  fetchDataGetDemandList,
  fetchDataGetOutstandingDemands,
  fetchDataGetIssueList,
  fetchDataNewIssue,
  fetchDataGetTableMaintenance,
  fetchDataGetActiveTableMaintenance,
  fetchDataNewTableMaintenance,
  fetchDataNewMenuCompanyMaintenance,
  fetchDataGetActiveMenuCompanyMaintenance,
  fetchDataGetMenuCompanyMaintenance,
} from "./api";

export const FETCH_MENU_REQUEST = "FETCH_MENU_REQUEST";
export const FETCH_MENU_SUCCESS = "FETCH_MENU_SUCCESS";
export const FETCH_MENU_FAILURE = "FETCH_MENU_FAILURE";

export const fetchMenu = (userId, code) => async (dispatch) => {
  dispatch({ type: FETCH_MENU_REQUEST });
  try {
    const data = await fetchDataMenu(userId, code);

    dispatch({ type: FETCH_MENU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_MENU_FAILURE, payload: error.message });
  }
};
export const FETCH_GETUSER_REQUEST = "FETCH_GETUSER_REQUEST";
export const FETCH_GETUSER_SUCCESS = "FETCH_GETUSER_SUCCESS";
export const FETCH_GETUSER_FAILURE = "FETCH_GETUSER_FAILURE";

export const fetchGetUser = (userId, code) => async (dispatch) => {
  dispatch({ type: FETCH_GETUSER_REQUEST });
  try {
    const data = await fetchDataGetUser(userId, code);
    // console.log("The data i received is action data:", data);

    dispatch({ type: FETCH_GETUSER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_GETUSER_FAILURE, payload: error.message });
  }
};

export const FETCH_GETCRYSTALCUSTOMER_REQUEST =
  "FETCH_GETCRYSTALCUSTOMER_REQUEST";
export const FETCH_GETCRYSTALCUSTOMER_SUCCESS =
  "FETCH_GETCRYSTALCUSTOMER_SUCCESS";
export const FETCH_GETCRYSTALCUSTOMER_FAILURE =
  "FETCH_GETCRYSTALCUSTOMER_FAILURE";

export const fetchGetCrystalCustomer = () => async (dispatch) => {
  dispatch({ type: FETCH_GETCRYSTALCUSTOMER_REQUEST });
  try {
    const data = await fetchDataGetCrystalCustomer(null, null, "GET");
    // console.log(data, "action.js fetchGetCrystalCustomer");
    dispatch({ type: FETCH_GETCRYSTALCUSTOMER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCRYSTALCUSTOMER_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETCRYSTALMENU_REQUEST = "FETCH_GETCRYSTALMENU_REQUEST";
export const FETCH_GETCRYSTALMENU_SUCCESS = "FETCH_GETCRYSTALMENU_SUCCESS";
export const FETCH_GETCRYSTALMENU_FAILURE = "FETCH_GETCRYSTALMENU_FAILURE";

export const fetchGetCrystalMenu = () => async (dispatch) => {
  dispatch({ type: FETCH_GETCRYSTALMENU_REQUEST });
  try {
    const data = await fetchDataGetCrystalMenu(null, null, "GET");
    // console.log(data, "action.js fetchGetCrystalMENU");
    dispatch({ type: FETCH_GETCRYSTALMENU_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCRYSTALMENU_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETCRYSTALPRODUCT_REQUEST =
  "FETCH_GETCRYSTALPRODUCT_REQUEST";
export const FETCH_GETCRYSTALPRODUCT_SUCCESS =
  "FETCH_GETCRYSTALPRODUCT_SUCCESS";
export const FETCH_GETCRYSTALPRODUCT_FAILURE =
  "FETCH_GETCRYSTALPRODUCT_FAILURE";

export const fetchGetCrystalProduct = () => async (dispatch) => {
  dispatch({ type: FETCH_GETCRYSTALPRODUCT_REQUEST });
  try {
    const data = await fetchDataGetCrystalProduct(null, null, "GET");
    // console.log(data, "action.js fetchGetCrystalMENU");
    dispatch({ type: FETCH_GETCRYSTALPRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCRYSTALPRODUCT_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETYEAR_REQUEST = "FETCH_GETYEAR_REQUEST";
export const FETCH_GETYEAR_SUCCESS = "FETCH_GGETYEAR_SUCCESS";
export const FETCH_GETYEAR_FAILURE = "FETCH_GETYEAR_FAILURE";

export const fetchGetYear = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETYEAR_REQUEST });
  try {
    const data = await fetchDataGetYear(code);
    // console.log("The data i received is action data:", data);

    dispatch({ type: FETCH_GETYEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_GETYEAR_FAILURE, payload: error.message });
  }
};

export const FETCH_GETBRANCHES_REQUEST = "FETCH_GETBRANCHES_REQUEST";
export const FETCH_GETBRANCHES_SUCCESS = "FETCH_GETBRANCHES_SUCCESS";
export const FETCH_GETBRANCHES_FAILURE = "FETCH_GETBRANCHES_FAILURE";

export const fetchGetBranches = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETBRANCHES_REQUEST });
  try {
    const data = await fetchDataGetBranches(code);
    // console.log("The data i received is action data:", data);

    dispatch({ type: FETCH_GETBRANCHES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_GETBRANCHES_FAILURE, payload: error.message });
  }
};
export const FETCH_GETACTIVEYEAR_REQUEST = "FETCH_GETACTIVEYEAR_REQUEST";
export const FETCH_GETACTIVEYEAR_SUCCESS = "FETCH_GETACTIVEYEAR_SUCCESS";
export const FETCH_GETACTIVEYEAR_FAILURE = "FETCH_GETACTIVEYEAR_FAILURE";
export const fetchGetActiveYear = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEYEAR_REQUEST });
  try {
    const data = await fetchDataGetAciveYear(code);

    dispatch({ type: FETCH_GETACTIVEYEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_GETACTIVEYEAR_FAILURE, payload: error.message });
  }
};
export const FETCH_GETACTIVELOCATION_REQUEST =
  "FETCH_GETACTIVELOCATION_REQUEST";
export const FETCH_GETACTIVELOCATION_SUCCESS =
  "FETCH_GETACTIVELOCATION_SUCCESS";
export const FETCH_GETACTIVELOCATION_FAILURE =
  "FETCH_GETACTIVELOCATION_FAILURE";
export const fetchGetActiveLocation = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVELOCATION_REQUEST });
  try {
    const data = await fetchDataGetAciveLocation(code);

    dispatch({ type: FETCH_GETACTIVELOCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_GETACTIVELOCATION_FAILURE, payload: error.message });
  }
};

export const FETCH_GETACTIVEUSERYEAR_REQUEST =
  "FETCH_GETACTIVEUSERYEAR_REQUEST";
export const FETCH_GETACTIVEUSERYEAR_SUCCESS =
  "FETCH_GETACTIVEUSERYEAR_SUCCESS";
export const FETCH_GETACTIVEUSERYEAR_FAILURE =
  "FETCH_GETACTIVEUSERYEAR_FAILURE";
export const fetchGetActiveUserYear = (userId, code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEUSERYEAR_REQUEST });
  try {
    const data = await fetchDataGetAciveUserYear(userId, code);

    dispatch({ type: FETCH_GETACTIVEUSERYEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_GETACTIVEUSERYEAR_FAILURE, payload: error.message });
  }
};
export const FETCH_GETACTIVEUSERLOCATION_REQUEST =
  "FETCH_GETACTIVEUSERLOCATION_REQUEST";
export const FETCH_GETACTIVEUSERLOCATION_SUCCESS =
  "FETCH_GETACTIVEUSERLOCATION_SUCCESS";
export const FETCH_GETACTIVEUSERLOCATION_FAILURE =
  "FETCH_GETACTIVEUSERLOCATION_FAILURE";
export const fetchGetActiveUserLocation =
  (userId, code) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVEUSERLOCATION_REQUEST });
    try {
      const data = await fetchDataGetAciveUserLocation(userId, code);

      dispatch({ type: FETCH_GETACTIVEUSERLOCATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_GETACTIVEUSERLOCATION_FAILURE,
        payload: error.message,
      });
    }
  };
///////////////////////////////////////////////////////////////////////
///////////////////////////FILE MAINTENANCE/////////////////////////////
/////////////////////////////////////////////////////////////////////////
///////////////////////////COMPANY MAINTENANCE/////////////////////////////
export const FETCH_GETCOMPANYMAINTENANCE_REQUEST =
  "FETCH_GETCOMPANYMAINTENANCE_REQUEST";
export const FETCH_GETCOMPANYMAINTENANCE_SUCCESS =
  "FETCH_GETCOMPANYMAINTENANCE_SUCCESS";
export const FETCH_GETCOMPANYMAINTENANCE_FAILURE =
  "FETCH_GETCOMPANYMAINTENANCE_FAILURE";
export const fetchGetCompanyMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETCOMPANYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetCompanyMaintenance(code);

    dispatch({ type: FETCH_GETCOMPANYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCOMPANYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVECOMPANYMAINTENANCE_REQUEST =
  "FETCH_GETACTIVECOMPANYMAINTENANCE_REQUEST";
export const FETCH_GETACTIVECOMPANYMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVECOMPANYMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVECOMPANYMAINTENANCE_FAILURE =
  "FETCH_GETACTIVECOMPANYMAINTENANCE_FAILURE";
export const fetchGetActiveCompanyMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVECOMPANYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveCompanyMaintenance(code);
    // console.log(data, "action data ");

    dispatch({
      type: FETCH_GETACTIVECOMPANYMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVECOMPANYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWCOMPANYMAINTENANCE_REQUEST =
  "FETCH_NEWCOMPANYMAINTENANCE_REQUEST";
export const FETCH_NEWCOMPANYMAINTENANCE_SUCCESS =
  "FETCH_NEWCOMPANYMAINTENANCE_SUCCESS";
export const FETCH_NEWCOMPANYMAINTENANCE_FAILURE =
  "FETCH_NEWCOMPANYMAINTENANCE_FAILURE";
export const fetchNewCompanyMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWCOMPANYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewCompanyMaintenance(code);

    dispatch({ type: FETCH_NEWCOMPANYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWCOMPANYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

///////////////////////////MENU COMPANY MAINTENANCE/////////////////////////////
export const FETCH_GETMENUCOMPANYMAINTENANCE_REQUEST =
  "FETCH_GETMENUCOMPANYMAINTENANCE_REQUEST";
export const FETCH_GETMENUCOMPANYMAINTENANCE_SUCCESS =
  "FETCH_GETMENUCOMPANYMAINTENANCE_SUCCESS";
export const FETCH_GETMENUCOMPANYMAINTENANCE_FAILURE =
  "FETCH_GETMENUCOMPANYMAINTENANCE_FAILURE";

export const fetchGetMenuCompanyMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETMENUCOMPANYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetMenuCompanyMaintenance(code);

    dispatch({ type: FETCH_GETMENUCOMPANYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETMENUCOMPANYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEMENUCOMPANYMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEMENUCOMPANYMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEMENUCOMPANYMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEMENUCOMPANYMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEMENUCOMPANYMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEMENUCOMPANYMAINTENANCE_FAILURE";

export const fetchGetActiveMenuCompanyMaintenance =
  (code) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVEMENUCOMPANYMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveMenuCompanyMaintenance(code);
      // console.log(data, "action data ");

      dispatch({
        type: FETCH_GETACTIVEMENUCOMPANYMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GETACTIVEMENUCOMPANYMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWMENUCOMPANYMAINTENANCE_REQUEST =
  "FETCH_NEWMENUCOMPANYMAINTENANCE_REQUEST";
export const FETCH_NEWMENUCOMPANYMAINTENANCE_SUCCESS =
  "FETCH_NEWMENUCOMPANYMAINTENANCE_SUCCESS";
export const FETCH_NEWMENUCOMPANYMAINTENANCE_FAILURE =
  "FETCH_NEWMENUCOMPANYMAINTENANCE_FAILURE";

export const fetchNewMenuCompanyMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWMENUCOMPANYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewMenuCompanyMaintenance(code);

    dispatch({ type: FETCH_NEWMENUCOMPANYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWMENUCOMPANYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};


///////////////////////////CUSTOMER MAINTENANCE/////////////////////////////

// ===== Get Customer Maintenance =====
export const FETCH_GETCUSTOMERMAINTENANCE_REQUEST =
  "FETCH_GETCUSTOMERMAINTENANCE_REQUEST";
export const FETCH_GETCUSTOMERMAINTENANCE_SUCCESS =
  "FETCH_GETCUSTOMERMAINTENANCE_SUCCESS";
export const FETCH_GETCUSTOMERMAINTENANCE_FAILURE =
  "FETCH_GETCUSTOMERMAINTENANCE_FAILURE";

export const fetchGetCustomerMaintenance = (code,location) => async (dispatch) => {
  dispatch({ type: FETCH_GETCUSTOMERMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetCustomerMaintenance(code,location);

    dispatch({ type: FETCH_GETCUSTOMERMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCUSTOMERMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

// ===== Get Active Customer Maintenance =====
export const FETCH_GETACTIVECUSTOMERMAINTENANCE_REQUEST =
  "FETCH_GETACTIVECUSTOMERMAINTENANCE_REQUEST";
export const FETCH_GETACTIVECUSTOMERMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVECUSTOMERMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVECUSTOMERMAINTENANCE_FAILURE =
  "FETCH_GETACTIVECUSTOMERMAINTENANCE_FAILURE";

export const fetchGetActiveCustomerMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVECUSTOMERMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveCustomerMaintenance(code);
    // console.log(data, "action data ");

    dispatch({
      type: FETCH_GETACTIVECUSTOMERMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVECUSTOMERMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

// ===== New Customer Maintenance =====
export const FETCH_NEWCUSTOMERMAINTENANCE_REQUEST =
  "FETCH_NEWCUSTOMERMAINTENANCE_REQUEST";
export const FETCH_NEWCUSTOMERMAINTENANCE_SUCCESS =
  "FETCH_NEWCUSTOMERMAINTENANCE_SUCCESS";
export const FETCH_NEWCUSTOMERMAINTENANCE_FAILURE =
  "FETCH_NEWCUSTOMERMAINTENANCE_FAILURE";

export const fetchNewCustomerMaintenance = (code,location) => async (dispatch) => {
  dispatch({ type: FETCH_NEWCUSTOMERMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewCustomerMaintenance(code,location);

    dispatch({ type: FETCH_NEWCUSTOMERMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWCUSTOMERMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

///////////////////////////CATEGORY MAINTENANCE/////////////////////////////

export const FETCH_GETCATEGORYMAINTENANCE_REQUEST =
  "FETCH_GETCATEGORYMAINTENANCE_REQUEST";
export const FETCH_GETCATEGORYMAINTENANCE_SUCCESS =
  "FETCH_GETCATEGORYMAINTENANCE_SUCCESS";
export const FETCH_GETCATEGORYMAINTENANCE_FAILURE =
  "FETCH_GETCATEGORYMAINTENANCE_FAILURE";
export const fetchGetCategoryMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETCOMPANYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetCategoryMaintenance(code);

    dispatch({ type: FETCH_GETCATEGORYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCATEGORYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVECATEGORYMAINTENANCE_REQUEST =
  "FETCH_GETACTIVECATEGORYMAINTENANCE_REQUEST";
export const FETCH_GETACTIVECATEGORYMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVECATEGORYMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVECATEGORYMAINTENANCE_FAILURE =
  "FETCH_GETACTIVECATEGORYMAINTENANCE_FAILURE";
export const fetchGetActiveCategoryMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVECOMPANYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveCategoryMaintenance(code);

    dispatch({ type: FETCH_GETCATEGORYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCATEGORYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWCATEGORYMAINTENANCE_REQUEST =
  "FETCH_NEWCATEGORYMAINTENANCE_REQUEST";
export const FETCH_NEWCATEGORYMAINTENANCE_SUCCESS =
  "FETCH_NEWCATEGORYMAINTENANCE_SUCCESS";
export const FETCH_NEWCATEGORYMAINTENANCE_FAILURE =
  "FETCH_NEWCATEGORYMAINTENANCE_FAILURE";
export const fetchNewCategoryMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWCATEGORYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewCategoryMaintenance(code);

    dispatch({ type: FETCH_NEWCATEGORYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWCATEGORYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};




/////////////////////////// Menu  CATEGORY MAINTENANCE/////////////////////////////

export const FETCH_GETMENUCATEGORYMAINTENANCE_REQUEST =
  "FETCH_GETMENUCATEGORYMAINTENANCE_REQUEST";
export const FETCH_GETMENUCATEGORYMAINTENANCE_SUCCESS =
  "FETCH_GETMENUCATEGORYMAINTENANCE_SUCCESS";
export const FETCH_GETMENUCATEGORYMAINTENANCE_FAILURE =
  "FETCH_GETMENUCATEGORYMAINTENANCE_FAILURE";
export const fetchGetMenuCategoryMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETMENUCATEGORYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetMenuCategoryMaintenance(code);

    dispatch({ type: FETCH_GETMENUCATEGORYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETMENUCATEGORYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEMENUCATEGORYMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEMENUCATEGORYMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEMENUCATEGORYMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEMENUCATEGORYMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEMENUCATEGORYMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEMENUCATEGORYMAINTENANCE_FAILURE";
export const fetchGetActiveMenuCategoryMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEMENUCATEGORYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveMenuCategoryMaintenance(code);

    dispatch({ type: FETCH_GETACTIVEMENUCATEGORYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVEMENUCATEGORYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWMENUCATEGORYMAINTENANCE_REQUEST =
  "FETCH_NEWMENUCATEGORYMAINTENANCE_REQUEST";
export const FETCH_NEWMENUCATEGORYMAINTENANCE_SUCCESS =
  "FETCH_NEWMENUCATEGORYMAINTENANCE_SUCCESS";
export const FETCH_NEWMENUCATEGORYMAINTENANCE_FAILURE =
  "FETCH_NEWMENUCATEGORYMAINTENANCE_FAILURE";
export const fetchNewMenuCategoryMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWMENUCATEGORYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewMenuCategoryMaintenance(code);

    dispatch({ type: FETCH_NEWMENUCATEGORYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWMENUCATEGORYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
///////////////////////////CAPACITY MAINTENANCE/////////////////////////////

export const FETCH_GETCAPACITYMAINTENANCE_REQUEST =
  "FETCH_GETCAPACIITYMAINTENANCE_REQUEST";
export const FETCH_GETCAPACITYMAINTENANCE_SUCCESS =
  "FETCH_GETCAPACITYMAINTENANCE_SUCCESS";
export const FETCH_GETCAPACITYMAINTENANCE_FAILURE =
  "FETCH_GETCAPACITYMAINTENANCE_FAILURE";
export const fetchGetCapacityMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETCAPACITYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetCapacityMaintenance(code);

    dispatch({ type: FETCH_GETCAPACITYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCAPACITYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVECAPACITYMAINTENANCE_REQUEST =
  "FETCH_GETACTIVECAPACITYMAINTENANCE_REQUEST";
export const FETCH_GETACTIVECAPACITYMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVECAPACITYMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVECAPACITYMAINTENANCE_FAILURE =
  "FETCH_GETACTIVECAPACITYMAINTENANCE_FAILURE";
export const fetchGetActiveCapacityMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVECAPACITYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveCapacityMaintenance(code);

    dispatch({ type: FETCH_GETCAPACITYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCAPACITYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWCAPACITYMAINTENANCE_REQUEST =
  "FETCH_NEWCAPACITYMAINTENANCE_REQUEST";
export const FETCH_NEWCAPACITYMAINTENANCE_SUCCESS =
  "FETCH_NEWCAPACITYMAINTENANCE_SUCCESS";
export const FETCH_NEWCAPACITYMAINTENANCE_FAILURE =
  "FETCH_NEWCAPACITYMAINTENANCE_FAILURE";
export const fetchNewCapacityMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWCAPACITYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewCapacityMaintenance(code);

    dispatch({ type: FETCH_NEWCAPACITYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWCAPACITYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
export const FETCH_GETSUBCATEGORYMAINTENANCE_REQUEST =
  "FETCH_GETSUBCATEGORYMAINTENANCE_REQUEST";
export const FETCH_GETSUBCATEGORYMAINTENANCE_SUCCESS =
  "FETCH_GETSUBCATEGORYMAINTENANCE_SUCCESS";
export const FETCH_GETSUBCATEGORYMAINTENANCE_FAILURE =
  "FETCH_GETSUBCATEGORYMAINTENANCE_FAILURE";
export const fetchGetSubCategoryMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETSUBCATEGORYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetSubCategoryMaintenance(code);

    dispatch({ type: FETCH_GETSUBCATEGORYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETSUBCATEGORYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
export const FETCH_NEWSUBCATEGORYMAINTENANCE_REQUEST =
  "FETCH_NEWSUBCATEGORYMAINTENANCE_REQUEST";
export const FETCH_NEWSUBCATEGORYMAINTENANCE_SUCCESS =
  "FETCH_NEWSUBCATEGORYMAINTENANCE_SUCCESS";
export const FETCH_NEWSUBCATEGORYMAINTENANCE_FAILURE =
  "FETCH_NEWSUBCATEGORYMAINTENANCE_FAILURE";
export const fetchNewSubCategoryMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWSUBCATEGORYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewSubCategoryMaintenance(code);

    dispatch({ type: FETCH_NEWSUBCATEGORYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWSUBCATEGORYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
///////////////////////////TYPE MAINTENANCE/////////////////////////////

export const FETCH_GETTYPEMAINTENANCE_REQUEST =
  "FETCH_GETTYPEMAINTENANCE_REQUEST";
export const FETCH_GETTYPEMAINTENANCE_SUCCESS =
  "FETCH_GETTYPEMAINTENANCE_SUCCESS";
export const FETCH_GETTYPEMAINTENANCE_FAILURE =
  "FETCH_GETTYPEMAINTENANCE_FAILURE";
export const fetchGetTypeMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETTYPEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetTypeMaintenance(code);

    dispatch({ type: FETCH_GETTYPEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETTYPEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVETYPEMAINTENANCE_REQUEST =
  "FETCH_GETACTIVETYPEMAINTENANCE_REQUEST";
export const FETCH_GETACTIVETYPEMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVETYPEMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVETYPEMAINTENANCE_FAILURE =
  "FETCH_GETACTIVETYPEMAINTENANCE_FAILURE";
export const fetchGetActiveTypeMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVETYPEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveTypeMaintenance(code);

    dispatch({ type: FETCH_GETTYPEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETTYPEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWTYPEMAINTENANCE_REQUEST =
  "FETCH_NEWTYPEMAINTENANCE_REQUEST";
export const FETCH_NEWTYPEMAINTENANCE_SUCCESS =
  "FETCH_NEWTYPEMAINTENANCE_SUCCESS";
export const FETCH_NEWTYPEMAINTENANCE_FAILURE =
  "FETCH_NEWTYPEMAINTENANCE_FAILURE";
export const fetchNewTypeMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWTYPEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewTypeMaintenance(code);

    dispatch({ type: FETCH_NEWTYPEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWTYPEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

///////////////////////////TABLE MAINTENANCE/////////////////////////////

export const FETCH_GETTABLEMAINTENANCE_REQUEST =
  "FETCH_GETTABLEMAINTENANCE_REQUEST";
export const FETCH_GETTABLEMAINTENANCE_SUCCESS =
  "FETCH_GETTABLEMAINTENANCE_SUCCESS";
export const FETCH_GETTABLEMAINTENANCE_FAILURE =
  "FETCH_GETTABLEMAINTENANCE_FAILURE";
export const fetchGetTableMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETTABLEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetTableMaintenance(code);

    dispatch({ type: FETCH_GETTABLEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETTABLEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVETABLEMAINTENANCE_REQUEST =
  "FETCH_GETACTIVETABLEMAINTENANCE_REQUEST";
export const FETCH_GETACTIVETABLEMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVETABLEMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVETABLEMAINTENANCE_FAILURE =
  "FETCH_GETACTIVETABLEMAINTENANCE_FAILURE";
export const fetchGetActiveTableMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVETABLEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveTableMaintenance(code);

    dispatch({ type: FETCH_GETACTIVETABLEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVETABLEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWTABLEMAINTENANCE_REQUEST =
  "FETCH_NEWTABLEMAINTENANCE_REQUEST";
export const FETCH_NEWTABLEMAINTENANCE_SUCCESS =
  "FETCH_NEWTABLEMAINTENANCE_SUCCESS";
export const FETCH_NEWTABLEMAINTENANCE_FAILURE =
  "FETCH_NEWTABLEMAINTENANCE_FAILURE";
export const fetchNewTableMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWTABLEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewTableMaintenance(code);

    dispatch({ type: FETCH_NEWTABLEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWTABLEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};


/////////////////////////// CUST TYPE MAINTENANCE /////////////////////////////

// ========== GET ==========
export const FETCH_GETCUSTTYPEMAINTENANCE_REQUEST =
  "FETCH_GETCUSTTYPEMAINTENANCE_REQUEST";
export const FETCH_GETCUSTTYPEMAINTENANCE_SUCCESS =
  "FETCH_GETCUSTTYPEMAINTENANCE_SUCCESS";
export const FETCH_GETCUSTTYPEMAINTENANCE_FAILURE =
  "FETCH_GETCUSTTYPEMAINTENANCE_FAILURE";

export const fetchGetCustTypeMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETCUSTTYPEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetCustTypeMaintenance(code);

    dispatch({ type: FETCH_GETCUSTTYPEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCUSTTYPEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

// ========== GET ACTIVE ==========
export const FETCH_GETACTIVECUSTTYPEMAINTENANCE_REQUEST =
  "FETCH_GETACTIVECUSTTYPEMAINTENANCE_REQUEST";
export const FETCH_GETACTIVECUSTTYPEMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVECUSTTYPEMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVECUSTTYPEMAINTENANCE_FAILURE =
  "FETCH_GETACTIVECUSTTYPEMAINTENANCE_FAILURE";

export const fetchGetActiveCustTypeMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVECUSTTYPEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveCustTypeMaintenance(code);

    dispatch({
      type: FETCH_GETACTIVECUSTTYPEMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVECUSTTYPEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

// ========== NEW ==========
export const FETCH_NEWCUSTTYPEMAINTENANCE_REQUEST =
  "FETCH_NEWCUSTTYPEMAINTENANCE_REQUEST";
export const FETCH_NEWCUSTTYPEMAINTENANCE_SUCCESS =
  "FETCH_NEWCUSTTYPEMAINTENANCE_SUCCESS";
export const FETCH_NEWCUSTTYPEMAINTENANCE_FAILURE =
  "FETCH_NEWCUSTTYPEMAINTENANCE_FAILURE";

export const fetchNewCustTypeMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWCUSTTYPEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewCustTypeMaintenance(code);

    dispatch({ type: FETCH_NEWCUSTTYPEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWCUSTTYPEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};


///////////////////////////MEMBER TYPE MAINTENANCE/////////////////////////////

export const FETCH_GETMEMBERTYPEMAINTENANCE_REQUEST =
  "FETCH_GETMEMBERTYPEMAINTENANCE_REQUEST";
export const FETCH_GETMEMBERTYPEMAINTENANCE_SUCCESS =
  "FETCH_GETMEMBERTYPEMAINTENANCE_SUCCESS";
export const FETCH_GETMEMBERTYPEMAINTENANCE_FAILURE =
  "FETCH_GETMEMBERTYPEMAINTENANCE_FAILURE";
export const fetchGetMemberTypeMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETMEMBERTYPEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetMemberTypeMaintenance(code);

    dispatch({ type: FETCH_GETMEMBERTYPEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETMEMBERTYPEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEMEMBERTYPEMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEMEMBERTYPEMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEMEMBERTYPEMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEMEMBERTYPEMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEMEMBERTYPEMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEMEMBERTYPEMAINTENANCE_FAILURE";
export const fetchGetActiveMemberTypeMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEMEMBERTYPEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveMemberTypeMaintenance(code);

    dispatch({ type: FETCH_GETACTIVEMEMBERTYPEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVEMEMBERTYPEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWMEMBERTYPEMAINTENANCE_REQUEST =
  "FETCH_NEWMEMBERTYPEMAINTENANCE_REQUEST";
export const FETCH_NEWMEMBERTYPEMAINTENANCE_SUCCESS =
  "FETCH_NEWMEMBERTYPEMAINTENANCE_SUCCESS";
export const FETCH_NEWMEMBERTYPEMAINTENANCE_FAILURE =
  "FETCH_NEWMEMBERTYPEMAINTENANCE_FAILURE";
export const fetchNewMemberTypeMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWMEMBERTYPEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewMemberTypeMaintenance(code);

    dispatch({ type: FETCH_NEWMEMBERTYPEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWMEMBERTYPEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
/////////////////////////// SPARE PARTS MAINTENANCE /////////////////////////////

export const FETCH_GETSPAREPARTSMAINTENANCE_REQUEST =
  "FETCH_GETSPAREPARTSMAINTENANCE_REQUEST";
export const FETCH_GETSPAREPARTSMAINTENANCE_SUCCESS =
  "FETCH_GETSPAREPARTSMAINTENANCE_SUCCESS";
export const FETCH_GETSPAREPARTSMAINTENANCE_FAILURE =
  "FETCH_GETSPAREPARTSMAINTENANCE_FAILURE";

export const fetchGetSparePartsMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETSPAREPARTSMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetSparePartsMaintenance(code);

    dispatch({ type: FETCH_GETSPAREPARTSMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETSPAREPARTSMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};


///////////////////////////Item MAINTENANCE/////////////////////////////

export const FETCH_GETITEMMAINTENANCE_REQUEST =
  "FETCH_GETITEMMAINTENANCE_REQUEST";
export const FETCH_GETITEMMAINTENANCE_SUCCESS =
  "FETCH_GETITEMMAINTENANCE_SUCCESS";
export const FETCH_GETITEMMAINTENANCE_FAILURE =
  "FETCH_GETITEMMAINTENANCE_FAILURE";
export const fetchGetItemMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETITEMMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetItemMaintenance(code);

    dispatch({ type: FETCH_GETITEMMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETITEMMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};


export const FETCH_GETITEMMENUMAINTENANCE_REQUEST =
  "FETCH_GETITEMMENUMAINTENANCE_REQUEST";
export const FETCH_GETITEMMENUMAINTENANCE_SUCCESS =
  "FETCH_GETITEMMENUMAINTENANCE_SUCCESS";
export const FETCH_GETITEMMENUMAINTENANCE_FAILURE =
  "FETCH_GETITEMMENUMAINTENANCE_FAILURE";
export const fetchGetItemMenuMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETITEMMENUMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetItemMenuMaintenance(code);

    dispatch({ type: FETCH_GETITEMMENUMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETITEMMENUMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
export const FETCH_GETACTIVEITEMMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEITEMMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEITEMMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEITEMMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEITEMMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEITEMMAINTENANCE_FAILURE";
export const fetchGetActiveItemMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEITEMMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveItemMaintenance(code);

    dispatch({ type: FETCH_GETACTIVEITEMMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVEITEMMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETITEMSTOCK_REQUEST = "FETCH_GETITEMSTOCK_REQUEST";
export const FETCH_GETITEMSTOCK_SUCCESS = "FETCH_GETITEMSTOCK_SUCCESS";
export const FETCH_GETITEMSTOCK_FAILURE = "FETCH_GETITEMSTOCK_FAILURE";
export const fetchGetItemStock = (code, location, date) => async (dispatch) => {
  dispatch({ type: FETCH_GETITEMSTOCK_REQUEST });
  try {
    const data = await fetchDataGetItemStock(code, location, date);
    // console.log(data, "getitemstock");
    dispatch({ type: FETCH_GETITEMSTOCK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETITEMSTOCK_FAILURE,
      payload: error.message,
    });
  }
};

///////////////////////////CITY MAINTENANCE/////////////////////////////

export const FETCH_GETCITYMAINTENANCE_REQUEST =
  "FETCH_GETCITYMAINTENANCE_REQUEST";
export const FETCH_GETCITYMAINTENANCE_SUCCESS =
  "FETCH_GETCITYMAINTENANCE_SUCCESS";
export const FETCH_GETCITYMAINTENANCE_FAILURE =
  "FETCH_GETCITYMAINTENANCE_FAILURE";
export const fetchGetCityMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETCITYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetCityMaintenance(code);

    dispatch({ type: FETCH_GETCITYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETCITYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVECITYMAINTENANCE_REQUEST =
  "FETCH_GETACTIVECITYMAINTENANCE_REQUEST";
export const FETCH_GETACTIVECITYMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVECITYMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVECITYMAINTENANCE_FAILURE =
  "FETCH_GETACTIVECITYMAINTENANCE_FAILURE";
export const fetchGetActiveCityMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVECITYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveCityMaintenance(code);

    dispatch({ type: FETCH_GETACTIVECITYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVECITYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWCITYMAINTENANCE_REQUEST =
  "FETCH_NEWCITYMAINTENANCE_REQUEST";
export const FETCH_NEWCITYMAINTENANCE_SUCCESS =
  "FETCH_NEWCITYMAINTENANCE_SUCCESS";
export const FETCH_NEWCITYMAINTENANCE_FAILURE =
  "FETCH_NEWCITYMAINTENANCE_FAILURE";
export const fetchNewCityMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWCITYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewCityMaintenance(code);

    dispatch({ type: FETCH_NEWCITYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWCITYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};


/////////////////////////// GROUP MAINTENANCE /////////////////////////////

export const FETCH_GETGROUPMAINTENANCE_REQUEST =
  "FETCH_GETGROUPMAINTENANCE_REQUEST";
export const FETCH_GETGROUPMAINTENANCE_SUCCESS =
  "FETCH_GETGROUPMAINTENANCE_SUCCESS";
export const FETCH_GETGROUPMAINTENANCE_FAILURE =
  "FETCH_GETGROUPMAINTENANCE_FAILURE";

export const fetchGetGroupMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETGROUPMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetGroupMaintenance(code);
    dispatch({ type: FETCH_GETGROUPMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETGROUPMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEGROUPMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEGROUPMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEGROUPMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEGROUPMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEGROUPMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEGROUPMAINTENANCE_FAILURE";

export const fetchGetActiveGroupMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEGROUPMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveGroupMaintenance(code);
    dispatch({ type: FETCH_GETACTIVEGROUPMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVEGROUPMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWGROUPMAINTENANCE_REQUEST =
  "FETCH_NEWGROUPMAINTENANCE_REQUEST";
export const FETCH_NEWGROUPMAINTENANCE_SUCCESS =
  "FETCH_NEWGROUPMAINTENANCE_SUCCESS";
export const FETCH_NEWGROUPMAINTENANCE_FAILURE =
  "FETCH_NEWGROUPMAINTENANCE_FAILURE";

export const fetchNewGroupMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWGROUPMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewGroupMaintenance(code);
    dispatch({ type: FETCH_NEWGROUPMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWGROUPMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
/////////////////////////// DELIVERY AREA MAINTENANCE /////////////////////////////

export const FETCH_GETDELIVERYAREAMAINTENANCE_REQUEST =
  "FETCH_GETDELIVERYAREAMAINTENANCE_REQUEST";
export const FETCH_GETDELIVERYAREAMAINTENANCE_SUCCESS =
  "FETCH_GETDELIVERYAREAMAINTENANCE_SUCCESS";
export const FETCH_GETDELIVERYAREAMAINTENANCE_FAILURE =
  "FETCH_GETDELIVERYAREAMAINTENANCE_FAILURE";

export const fetchGetDeliveryAreaMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETDELIVERYAREAMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetDeliveryAreaMaintenance(code);
    dispatch({ type: FETCH_GETDELIVERYAREAMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETDELIVERYAREAMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWDELIVERYAREAMAINTENANCE_REQUEST =
  "FETCH_NEWDELIVERYAREAMAINTENANCE_REQUEST";
export const FETCH_NEWDELIVERYAREAMAINTENANCE_SUCCESS =
  "FETCH_NEWDELIVERYAREAMAINTENANCE_SUCCESS";
export const FETCH_NEWDELIVERYAREAMAINTENANCE_FAILURE =
  "FETCH_NEWDELIVERYAREAMAINTENANCE_FAILURE";

export const fetchNewDeliveryAreaMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWDELIVERYAREAMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewDeliveryAreaMaintenance(code);
    dispatch({ type: FETCH_NEWDELIVERYAREAMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWDELIVERYAREAMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

///////////////////////////REGION MAINTENANCE/////////////////////////////

export const FETCH_GETREGIONMAINTENANCE_REQUEST =
  "FETCH_GETREGIONMAINTENANCE_REQUEST";
export const FETCH_GETREGIONMAINTENANCE_SUCCESS =
  "FETCH_GETREGIONMAINTENANCE_SUCCESS";
export const FETCH_GETREGIONMAINTENANCE_FAILURE =
  "FETCH_GETREGIONMAINTENANCE_FAILURE";

export const fetchGetRegionMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETREGIONMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetRegionMaintenance(code);

    dispatch({ type: FETCH_GETREGIONMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETREGIONMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEREGIONMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEREGIONMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEREGIONMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEREGIONMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEREGIONMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEREGIONMAINTENANCE_FAILURE";

export const fetchGetActiveRegionMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEREGIONMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveRegionMaintenance(code);

    dispatch({ type: FETCH_GETACTIVEREGIONMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVEREGIONMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWREGIONMAINTENANCE_REQUEST =
  "FETCH_NEWREGIONMAINTENANCE_REQUEST";
export const FETCH_NEWREGIONMAINTENANCE_SUCCESS =
  "FETCH_NEWREGIONMAINTENANCE_SUCCESS";
export const FETCH_NEWREGIONMAINTENANCE_FAILURE =
  "FETCH_NEWREGIONMAINTENANCE_FAILURE";

export const fetchNewRegionMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWREGIONMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewRegionMaintenance(code);

    dispatch({ type: FETCH_NEWREGIONMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWREGIONMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

///////////////////////////STATE MAINTENANCE/////////////////////////////

export const FETCH_GETSTATEMAINTENANCE_REQUEST =
  "FETCH_GETSTATEMAINTENANCE_REQUEST";
export const FETCH_GETSTATEMAINTENANCE_SUCCESS =
  "FETCH_GETSTATEMAINTENANCE_SUCCESS";
export const FETCH_GETSTATEMAINTENANCE_FAILURE =
  "FETCH_GETSTATEMAINTENANCE_FAILURE";

export const fetchGetStateMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETSTATEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetStateMaintenance(code);

    dispatch({ type: FETCH_GETSTATEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETSTATEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVESTATEMAINTENANCE_REQUEST =
  "FETCH_GETACTIVESTATEMAINTENANCE_REQUEST";
export const FETCH_GETACTIVESTATEMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVESTATEMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVESTATEMAINTENANCE_FAILURE =
  "FETCH_GETACTIVESTATEMAINTENANCE_FAILURE";

export const fetchGetActiveStateMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVESTATEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveStateMaintenance(code);

    dispatch({ type: FETCH_GETACTIVESTATEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVESTATEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWSTATEMAINTENANCE_REQUEST =
  "FETCH_NEWSTATEMAINTENANCE_REQUEST";
export const FETCH_NEWSTATEMAINTENANCE_SUCCESS =
  "FETCH_NEWSTATEMAINTENANCE_SUCCESS";
export const FETCH_NEWSTATEMAINTENANCE_FAILURE =
  "FETCH_NEWSTATEMAINTENANCE_FAILURE";

export const fetchNewStateMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWSTATEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewStateMaintenance(code);

    dispatch({ type: FETCH_NEWSTATEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWSTATEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

///////////////////////////INSTALLAR MAINTENANCE/////////////////////////////

export const FETCH_GETINSTALLARMAINTENANCE_REQUEST =
  "FETCH_GETINSTALLARMAINTENANCE_REQUEST";
export const FETCH_GETINSTALLARMAINTENANCE_SUCCESS =
  "FETCH_GETINSTALLARMAINTENANCE_SUCCESS";
export const FETCH_GETINSTALLARMAINTENANCE_FAILURE =
  "FETCH_GETINSTALLARMAINTENANCE_FAILURE";
export const fetchGetInstallarMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETINSTALLARMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetInstallarMaintenance(code);

    dispatch({ type: FETCH_GETINSTALLARMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETINSTALLARMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEINSTALLARMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEINSTALLARMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEINSTALLARMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEINSTALLARMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEINSTALLARMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEINSTALLARMAINTENANCE_FAILURE";
export const fetchGetActiveInstallarMaintenance =
  (code) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVEINSTALLARMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveInstallarMaintenance(code);

      dispatch({
        type: FETCH_GETACTIVEINSTALLARMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GETACTIVEINSTALLARMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWINSTALLARMAINTENANCE_REQUEST =
  "FETCH_NEWINSTALLARMAINTENANCE_REQUEST";
export const FETCH_NEWINSTALLARMAINTENANCE_SUCCESS =
  "FETCH_NEWINSTALLARMAINTENANCE_SUCCESS";
export const FETCH_NEWINSTALLARMAINTENANCE_FAILURE =
  "FETCH_NEWINSTALLARMAINTENANCE_FAILURE";
export const fetchNewInstallarMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWINSTALLARMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewInstallarMaintenance(code);
    console.log("Data fetched successfully:", data);
    dispatch({ type: FETCH_NEWINSTALLARMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_NEWINSTALLARMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
///////////////////////////ACCOUNT CODE MAINTENANCE/////////////////////////////

export const FETCH_GETACCOUNTCODEMAINTENANCE_REQUEST =
  "FETCH_GETACCOUNTCODEMAINTENANCE_REQUEST";
export const FETCH_GETACCOUNTCODEMAINTENANCE_SUCCESS =
  "FETCH_GETACCOUNTCODEMAINTENANCE_SUCCESS";
export const FETCH_GETACCOUNTCODEMAINTENANCE_FAILURE =
  "FETCH_GETACCOUNTCODEMAINTENANCE_FAILURE";
export const fetchGetAccountsMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACCOUNTCODEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetAccountsMaintenance(code);

    dispatch({ type: FETCH_GETACCOUNTCODEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETACCOUNTCODEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEACCOUNTCODEMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEACCOUNTCODEMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEACCOUNTCODEMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEACCOUNTCODEMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEACCOUNTCODEMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEACCOUNTCODEMAINTENANCE_FAILURE";
export const fetchGetActiveAccountCodeMaintenance =
  (code) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVEACCOUNTCODEMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveAccountsMaintenance(code);

      dispatch({
        type: FETCH_GETACTIVEACCOUNTCODEMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GETACTIVEINSTALLARMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };
///////////////////////////STORE MAINTENANCE/////////////////////////////

export const FETCH_GETSTOREMAINTENANCE_REQUEST =
  "FETCH_GETSTOREMAINTENANCE_REQUEST";
export const FETCH_GETSTOREMAINTENANCE_SUCCESS =
  "FETCH_GETSTOREMAINTENANCE_SUCCESS";
export const FETCH_GETSTOREMAINTENANCE_FAILURE =
  "FETCH_GETSTOREMAINTENANCE_FAILURE";
export const fetchGetStoreMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETSTOREMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetStoreMaintenance(code);

    dispatch({ type: FETCH_GETSTOREMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETSTOREMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVESTOREMAINTENANCE_REQUEST =
  "FETCH_GETACTIVESTOREMAINTENANCE_REQUEST";
export const FETCH_GETACTIVESTOREMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVESTOREMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVESTOREMAINTENANCE_FAILURE =
  "FETCH_GETACTIVESTOREMAINTENANCE_FAILURE";
export const fetchGetActiveStoreMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVESTOREMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveStoreMaintenance(code);

    dispatch({
      type: FETCH_GETACTIVESTOREMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVESTOREMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWSTOREMAINTENANCE_REQUEST =
  "FETCH_NEWSTOREMAINTENANCE_REQUEST";
export const FETCH_NEWSTOREMAINTENANCE_SUCCESS =
  "FETCH_NEWSTOREMAINTENANCE_SUCCESS";
export const FETCH_NEWSTOREMAINTENANCE_FAILURE =
  "FETCH_NEWSTOREMAINTENANCE_FAILURE";
export const fetchNewStoreMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWSTOREMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewStoreMaintenance(code);
    console.log("Data fetchDataNewStoreMaintenance successfully:", data);
    dispatch({ type: FETCH_NEWSTOREMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_NEWSTOREMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
///////////////////////////EMPLOYEE MAINTENANCE/////////////////////////////

export const FETCH_GETEMPLOYEEMAINTENANCE_REQUEST =
  "FETCH_GETEMPLOYEEMAINTENANCE_REQUEST";
export const FETCH_GETEMPLOYEEMAINTENANCE_SUCCESS =
  "FETCH_GETEMPLOYEEMAINTENANCE_SUCCESS";
export const FETCH_GETEMPLOYEEMAINTENANCE_FAILURE =
  "FETCH_GETEMPLOYEEMAINTENANCE_FAILURE";
export const fetchGetEmployeeMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETEMPLOYEEMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetEmployeeMaintenance(code, Location);
      console.log("Employee List:", data);
      dispatch({ type: FETCH_GETEMPLOYEEMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_GETEMPLOYEEMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETACTIVEEMPLOYEEMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEEMPLOYEEMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEEMPLOYEEMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEEMPLOYEEMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEEMPLOYEEMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEEMPLOYEEMAINTENANCE_FAILURE";
export const fetchGetActiveEmployeeMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVEEMPLOYEEMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveEmployeeMaintenance(code, Location);

      dispatch({
        type: FETCH_GETACTIVEEMPLOYEEMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GETACTIVEEMPLOYEEMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWEMPLOYEEMAINTENANCE_REQUEST =
  "FETCH_NEWSTOREMAINTENANCE_REQUEST";
export const FETCH_NEWEMPLOYEEMAINTENANCE_SUCCESS =
  "FETCH_NEWEMPLOYEEMAINTENANCE_SUCCESS";
export const FETCH_NEWEMPLOYEEMAINTENANCE_FAILURE =
  "FETCH_NEWEMPLOYEEMAINTENANCE_FAILURE";
export const fetchNewEmployeeMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWEMPLOYEEMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewEmployeeMaintenance(code, Location);
      dispatch({ type: FETCH_NEWEMPLOYEEMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWEMPLOYEEMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

///////////////////////////EMPLOYEE MAINTENANCE/////////////////////////////

export const FETCH_GETSALARYSHEET_REQUEST = "FETCH_GETSALARYSHEET_REQUEST";
export const FETCH_GETSALARYSHEET_SUCCESS = "FETCH_GETSALARYSHEET_SUCCESS";
export const FETCH_GETSALARYSHEET_FAILURE = "FETCH_GETSALARYSHEET_FAILURE";
export const fetchGetSalarySheet = (code, Location) => async (dispatch) => {
  dispatch({ type: FETCH_GETSALARYSHEET_REQUEST });
  try {
    const data = await fetchDataGetSalary(code, Location);
    console.log("Employee List:", data);
    dispatch({ type: FETCH_GETSALARYSHEET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETSALARYSHEET_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWSALARYSHEET_REQUEST = "FETCH_NEWSALARYSHEET_REQUEST";
export const FETCH_NEWSALARYSHEET_SUCCESS = "FETCH_NEWSALARYSHEET_SUCCESS";
export const FETCH_NEWSALARYSHEET_FAILURE = "FETCH_NEWSALARYSHEET_FAILURE";
export const fetchNewSalarySheet =
  (code, Location, Year) => async (dispatch) => {
    dispatch({ type: FETCH_NEWSALARYSHEET_REQUEST });
    try {
      const data = await fetchDataNewSalarySheet(code, Location, Year);
      dispatch({ type: FETCH_NEWSALARYSHEET_SUCCESS, payload: data });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWSALARYSHEET_FAILURE,
        payload: error.message,
      });
    }
  };

///////////////////////////pRICE lIST MAINTENANCE/////////////////////////////

export const FETCH_NEWPRICELIST_REQUEST = "FETCH_NEWPRICELIST_REQUEST";
export const FETCH_NEWPRICELIST_SUCCESS = "FETCH_NEWPRICELIST_SUCCESS";
export const FETCH_NEWPRICELIST_FAILURE = "FETCH_NEWPRICELIST_FAILURE";
export const fetchNewPriceList = (code, Location, Year) => async (dispatch) => {
  dispatch({ type: FETCH_NEWPRICELIST_REQUEST });
  try {
    const data = await fetchDataNewPriceList(code, Location, Year);
    dispatch({ type: FETCH_NEWPRICELIST_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_NEWPRICELIST_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETPRICELIST_REQUEST = "FETCH_GETPRICELIST_REQUEST";
export const FETCH_GETPRICELIST_SUCCESS = "FETCH_GETPRICELIST_SUCCESS";
export const FETCH_GETPRICELIST_FAILURE = "FETCH_GETPRICELIST_FAILURE";
export const fetchGetPriceList = (code, Location, Year) => async (dispatch) => {
  dispatch({ type: FETCH_GETPRICELIST_REQUEST });
  try {
    const data = await fetchDataGetPriceListList(code, Location, Year);
    dispatch({ type: FETCH_GETPRICELIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETPRICELIST_FAILURE,
      payload: error.message,
    });
  }
};

/////////////////////////// COMMISSION AGREEMENT/////////////////////////////

export const FETCH_NEWCOMMISSIONAGREEMENT_REQUEST =
  "FETCH_NEWCOMMISSIONAGREEMENT_REQUEST";
export const FETCH_NEWCOMMISSIONAGREEMENT_SUCCESS =
  "FETCH_NEWCOMMISSIONAGREEMENT_SUCCESS";
export const FETCH_NEWCOMMISSIONAGREEMENT_FAILURE =
  "FETCH_NEWCOMMISSIONAGREEMENT_FAILURE";
export const fetchNewCommissionAgreement =
  (code, Location, Year) => async (dispatch) => {
    dispatch({ type: FETCH_NEWCOMMISSIONAGREEMENT_REQUEST });
    try {
      const data = await fetchDataNewCommissionAgreement(code, Location, Year);
      dispatch({ type: FETCH_NEWCOMMISSIONAGREEMENT_SUCCESS, payload: data });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWCOMMISSIONAGREEMENT_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETCOMMISSIONAGREEMENT_REQUEST =
  "FETCH_GETCOMMISSIONAGREEMENT_REQUEST";
export const FETCH_GETCOMMISSIONAGREEMENT_SUCCESS =
  "FETCH_GETCOMMISSIONAGREEMENT_SUCCESS";
export const FETCH_GETCOMMISSIONAGREEMENT_FAILURE =
  "FETCH_GETCOMMISSIONAGREEMENT_FAILURE";
export const fetchGetCommissionAgreement =
  (code, Location, Year) => async (dispatch) => {
    dispatch({ type: FETCH_GETCOMMISSIONAGREEMENT_REQUEST });
    try {
      const data = await fetchDataGetCommissionAgreement(code, Location, Year);
      dispatch({ type: FETCH_GETCOMMISSIONAGREEMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_GETCOMMISSIONAGREEMENT_FAILURE,
        payload: error.message,
      });
    }
  };


  ////////////////////////// ITEM MOVEMENT/////////////////////////////

export const FETCH_NEWITEMMOVEMENT_REQUEST =
  "FETCH_NEWITEMMOVEMENT_REQUEST";
export const FETCH_NEWITEMMOVEMENT_SUCCESS =
  "FETCH_NEWITEMMOVEMENT_SUCCESS";
export const FETCH_NEWITEMMOVEMENT_FAILURE =
  "FETCH_NEWITEMMOVEMENT_FAILURE";
export const fetchNewItemMovement =
  (code, Location, Year) => async (dispatch) => {
    dispatch({ type: FETCH_NEWITEMMOVEMENT_REQUEST });
    try {
      const data = await fetchDataNewItemMovement(code, Location, Year);
      dispatch({ type: FETCH_NEWITEMMOVEMENT_SUCCESS, payload: data });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWITEMMOVEMENT_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETITEMMOVEMENT_REQUEST =
  "FETCH_GETITEMMOVEMENT_REQUEST";
export const FETCH_GETITEMMOVEMENT_SUCCESS =
  "FETCH_GETITEMMOVEMENT_SUCCESS";
export const FETCH_GETITEMMOVEMENT_FAILURE =
  "FETCH_GETITEMMOVEMENT_FAILURE";
export const fetchGetItemMovement =
  (code, Location, Year) => async (dispatch) => {
    dispatch({ type: FETCH_GETITEMMOVEMENT_REQUEST });
    try {
      const data = await fetchDataGetItemMovement(code, Location, Year);
      dispatch({ type: FETCH_GETITEMMOVEMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_GETITEMMOVEMENT_FAILURE,
        payload: error.message,
      });
    }
  };

///////////////////////////MEMBER MAINTENANCE/////////////////////////////

// Action types for Get Member Maintenance
export const FETCH_GETMEMBERMAINTENANCE_REQUEST =
  "FETCH_GETMEMBERMAINTENANCE_REQUEST";
export const FETCH_GETMEMBERMAINTENANCE_SUCCESS =
  "FETCH_GETMEMBERMAINTENANCE_SUCCESS";
export const FETCH_GETMEMBERMAINTENANCE_FAILURE =
  "FETCH_GETMEMBERMAINTENANCE_FAILURE";

export const fetchGetMemberMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETMEMBERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetMemberMaintenance(code, Location);
      dispatch({ type: FETCH_GETMEMBERMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_GETMEMBERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };


  export const FETCH_GETMEMBER1MAINTENANCE_REQUEST =
  "FETCH_GETMEMBER1MAINTENANCE_REQUEST";
export const FETCH_GETMEMBER1MAINTENANCE_SUCCESS =
  "FETCH_GETMEMBER1MAINTENANCE_SUCCESS";
export const FETCH_GETMEMBER1MAINTENANCE_FAILURE =
  "FETCH_GETMEMBER1MAINTENANCE_FAILURE";

export const fetchGetMember1Maintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETMEMBER1MAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetMember1Maintenance(code, Location);
      dispatch({ type: FETCH_GETMEMBER1MAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_GETMEMBER1MAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

// Action types for Get Active Member Maintenance
export const FETCH_GETACTIVEMEMBERMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEMEMBERMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEMEMBERMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEMEMBERMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEMEMBERMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEMEMBERMAINTENANCE_FAILURE";

export const fetchGetActiveMemberMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVEMEMBERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveMemberMaintenance(code, Location);
      dispatch({
        type: FETCH_GETACTIVEMEMBERMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GETACTIVEMEMBERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

// Action types for New Member Maintenance
export const FETCH_NEWMEMBERMAINTENANCE_REQUEST =
  "FETCH_NEWMEMBERMAINTENANCE_REQUEST";
export const FETCH_NEWMEMBERMAINTENANCE_SUCCESS =
  "FETCH_NEWMEMBERMAINTENANCE_SUCCESS";
export const FETCH_NEWMEMBERMAINTENANCE_FAILURE =
  "FETCH_NEWMEMBERMAINTENANCE_FAILURE";

export const fetchNewMemberMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWMEMBERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewMemberMaintenance(code, Location);
      dispatch({ type: FETCH_NEWMEMBERMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_NEWMEMBERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };
///////////////////////////VISA MAINTENANCE/////////////////////////////

export const FETCH_GETVISAMAINTENANCE_REQUEST =
  "FETCH_GETVISAMAINTENANCE_REQUEST";
export const FETCH_GETVISAMAINTENANCE_SUCCESS =
  "FETCH_GETVISAMAINTENANCE_SUCCESS";
export const FETCH_GETVISAMAINTENANCE_FAILURE =
  "FETCH_GETVISAMAINTENANCE_FAILURE";
export const fetchGetVisaMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETVISAMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetVisaMaintenance(code);
    dispatch({ type: FETCH_GETVISAMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETVISAMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEVISAMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEVISAMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEVISAMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEVISAMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEVISAMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEVISAMAINTENANCE_FAILURE";
export const fetchGetActiveVisaMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEVISAMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveVisaMaintenance(code);

    dispatch({
      type: FETCH_GETACTIVEVISAMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVEVISAMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWVISAMAINTENANCE_REQUEST =
  "FETCH_NEWVISAMAINTENANCE_REQUEST";
export const FETCH_NEWVISAMAINTENANCE_SUCCESS =
  "FETCH_NEWVISAMAINTENANCE_SUCCESS";
export const FETCH_NEWVISAMAINTENANCE_FAILURE =
  "FETCH_NEWVISAMAINTENANCE_FAILURE";
export const fetchNewVisaMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWVISAMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewVisaMaintenance(code);
    dispatch({ type: FETCH_NEWVISAMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_NEWVISAMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

///////////////////////////DISCIPLINE MAINTENANCE/////////////////////////////

export const FETCH_GETDISCIPLINEMAINTENANCE_REQUEST =
  "FETCH_GETDISCIPLINEMAINTENANCE_REQUEST";
export const FETCH_GETDISCIPLINEMAINTENANCE_SUCCESS =
  "FETCH_GETDISCIPLINEMAINTENANCE_SUCCESS";
export const FETCH_GETDISCIPLINEMAINTENANCE_FAILURE =
  "FETCH_GETDISCIPLINEMAINTENANCE_FAILURE";
export const fetchGetDisciplineMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETDISCIPLINEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetDisciplineMaintenance(code);
    dispatch({ type: FETCH_GETDISCIPLINEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETDISCIPLINEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEDISCIPLINEMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEDISCIPLINEMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEDISCIPLINEMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEDISCIPLINEMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEDISCIPLINEMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEDISCIPLINEMAINTENANCE_FAILURE";
export const fetchGetActiveDisciplineMaintenance =
  (code) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVEDISCIPLINEMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveDisciplineMaintenance(code);

      dispatch({
        type: FETCH_GETACTIVEDISCIPLINEMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GETACTIVEDISCIPLINEMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWDISCIPLINEMAINTENANCE_REQUEST =
  "FETCH_NEWDISCIPLINEMAINTENANCE_REQUEST";
export const FETCH_NEWDISCIPLINEMAINTENANCE_SUCCESS =
  "FETCH_NEWDISCIPLINEMAINTENANCE_SUCCESS";
export const FETCH_NEWDISCIPLINEMAINTENANCE_FAILURE =
  "FETCH_NEWDISCIPLINEMAINTENANCE_FAILURE";
export const fetchNewDisciplineMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWDISCIPLINEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewDisciplineMaintenance(code);
    dispatch({ type: FETCH_NEWDISCIPLINEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_NEWDISCIPLINEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

///////////////////////////DOCUMENT MAINTENANCE/////////////////////////////

export const FETCH_GETDOCUMENTMAINTENANCE_REQUEST =
  "FETCH_GETDOCUMENTMAINTENANCE_REQUEST";
export const FETCH_GETDOCUMENTMAINTENANCE_SUCCESS =
  "FETCH_GETDOCUMENTMAINTENANCE_SUCCESS";
export const FETCH_GETDOCUMENTMAINTENANCE_FAILURE =
  "FETCH_GETDOCUMENTMAINTENANCE_FAILURE";
export const fetchGetDocumentMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETDOCUMENTMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetDocumentMaintenance(code);
    dispatch({ type: FETCH_GETDOCUMENTMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETDOCUMENTMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEDOCUMENTMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEDOCUMENTMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEDOCUMENTMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEDOCUMENTMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEDOCUMENTMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEDOCUMENTMAINTENANCE_FAILURE";
export const fetchGetActiveDocumentMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEDOCUMENTMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveDocumentMaintenance(code);

    dispatch({
      type: FETCH_GETACTIVEDOCUMENTMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVEDOCUMENTMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWDOCUMENTMAINTENANCE_REQUEST =
  "FETCH_NEWDOCUMENTMAINTENANCE_REQUEST";
export const FETCH_NEWDOCUMENTMAINTENANCE_SUCCESS =
  "FETCH_NEWDOCUMENTMAINTENANCE_SUCCESS";
export const FETCH_NEWDOCUMENTMAINTENANCE_FAILURE =
  "FETCH_NEWDOCUMENTMAINTENANCE_FAILURE";
export const fetchNewDocumentMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWDOCUMENTMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewDocumentMaintenance(code);
    dispatch({ type: FETCH_NEWDOCUMENTMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_NEWDOCUMENTMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

///////////////////////////DEGREE MAINTENANCE/////////////////////////////

export const FETCH_GETDEGREEMAINTENANCE_REQUEST =
  "FETCH_GETDEGREEMAINTENANCE_REQUEST";
export const FETCH_GETDEGREEMAINTENANCE_SUCCESS =
  "FETCH_GETDEGREEMAINTENANCE_SUCCESS";
export const FETCH_GETDEGREEMAINTENANCE_FAILURE =
  "FETCH_GETDEGREEMAINTENANCE_FAILURE";
export const fetchGetDegreeMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETDEGREEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetDegreeMaintenance(code);
    dispatch({ type: FETCH_GETDEGREEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETDEGREEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEDEGREEMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEDEGREEMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEDEGREEMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEDEGREEMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEDEGREEMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEDEGREEMAINTENANCE_FAILURE";
export const fetchGetActiveDegreeMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEDEGREEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveDegreeMaintenance(code);

    dispatch({
      type: FETCH_GETACTIVEDEGREEMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_GETACTIVEDEGREEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWDEGREEMAINTENANCE_REQUEST =
  "FETCH_NEWDEGREEMAINTENANCE_REQUEST";
export const FETCH_NEWDEGREEMAINTENANCE_SUCCESS =
  "FETCH_NEWDEGREEMAINTENANCE_SUCCESS";
export const FETCH_NEWDEGREEMAINTENANCE_FAILURE =
  "FETCH_NEWDEGREEMAINTENANCE_FAILURE";
export const fetchNewDegreeMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWDEGREEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewDegreeMaintenance(code);
    dispatch({ type: FETCH_NEWDEGREEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_NEWDEGREEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

///////////////////////////LANGUAGE MAINTENANCE/////////////////////////////
export const FETCH_GETLANGUAGEMAINTENANCE_REQUEST =
  "FETCH_GETLANGUAGEMAINTENANCE_REQUEST";
export const FETCH_GETLANGUAGEMAINTENANCE_SUCCESS =
  "FETCH_GETLANGUAGEMAINTENANCE_SUCCESS";
export const FETCH_GETLANGUAGEMAINTENANCE_FAILURE =
  "FETCH_GETLANGUAGEMAINTENANCE_FAILURE";

export const fetchGetLanguageMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETLANGUAGEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetLanguageMaintenance(code);
    dispatch({ type: FETCH_GETLANGUAGEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETLANGUAGEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVELANGUAGEMAINTENANCE_REQUEST =
  "FETCH_GETACTIVELANGUAGEMAINTENANCE_REQUEST";
export const FETCH_GETACTIVELANGUAGEMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVELANGUAGEMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVELANGUAGEMAINTENANCE_FAILURE =
  "FETCH_GETACTIVELANGUAGEMAINTENANCE_FAILURE";

export const fetchGetActiveLanguageMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVELANGUAGEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveLanguageMaintenance(code);
    dispatch({
      type: FETCH_GETACTIVELANGUAGEMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETACTIVELANGUAGEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWLANGUAGEMAINTENANCE_REQUEST =
  "FETCH_NEWLANGUAGEMAINTENANCE_REQUEST";
export const FETCH_NEWLANGUAGEMAINTENANCE_SUCCESS =
  "FETCH_NEWLANGUAGEMAINTENANCE_SUCCESS";
export const FETCH_NEWLANGUAGEMAINTENANCE_FAILURE =
  "FETCH_NEWLANGUAGEMAINTENANCE_FAILURE";

export const fetchNewLanguageMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWLANGUAGEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewLanguageMaintenance(code);
    dispatch({ type: FETCH_NEWLANGUAGEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_NEWLANGUAGEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

///////////////////////////COUNTRY MAINTENANCE/////////////////////////////
export const FETCH_GETCOUNTRYMAINTENANCE_REQUEST =
  "FETCH_GETCOUNTRYMAINTENANCE_REQUEST";
export const FETCH_GETCOUNTRYMAINTENANCE_SUCCESS =
  "FETCH_GETCOUNTRYMAINTENANCE_SUCCESS";
export const FETCH_GETCOUNTRYMAINTENANCE_FAILURE =
  "FETCH_GETCOUNTRYMAINTENANCE_FAILURE";

export const fetchGetCountryMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETCOUNTRYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetCountryMaintenance(code);
    dispatch({ type: FETCH_GETCOUNTRYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETCOUNTRYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVECOUNTRYMAINTENANCE_REQUEST =
  "FETCH_GETACTIVECOUNTRYMAINTENANCE_REQUEST";
export const FETCH_GETACTIVECOUNTRYMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVECOUNTRYMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVECOUNTRYMAINTENANCE_FAILURE =
  "FETCH_GETACTIVECOUNTRYMAINTENANCE_FAILURE";

export const fetchGetActiveCountryMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVECOUNTRYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveCountryMaintenance(code);
    dispatch({
      type: FETCH_GETACTIVECOUNTRYMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETACTIVECOUNTRYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWCOUNTRYMAINTENANCE_REQUEST =
  "FETCH_NEWCOUNTRYMAINTENANCE_REQUEST";
export const FETCH_NEWCOUNTRYMAINTENANCE_SUCCESS =
  "FETCH_NEWCOUNTRYMAINTENANCE_SUCCESS";
export const FETCH_NEWCOUNTRYMAINTENANCE_FAILURE =
  "FETCH_NEWCOUNTRYMAINTENANCE_FAILURE";

export const fetchNewCountryMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWCOUNTRYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewCountryMaintenance(code);
    dispatch({ type: FETCH_NEWCOUNTRYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWCOUNTRYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

/////////////////////////// PROGRAM MAINTENANCE/////////////////////////////
export const FETCH_GETPROGRAMMAINTENANCE_REQUEST =
  "FETCH_GETPROGRAMMAINTENANCE_REQUEST";
export const FETCH_GETPROGRAMMAINTENANCE_SUCCESS =
  "FETCH_GETPROGRAMMAINTENANCE_SUCCESS";
export const FETCH_GETPROGRAMMAINTENANCE_FAILURE =
  "FETCH_GETPROGRAMMAINTENANCE_FAILURE";

export const fetchGetProgramMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETPROGRAMMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetProgramMaintenance(code);
    dispatch({ type: FETCH_GETPROGRAMMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETPROGRAMMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEPROGRAMMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEPROGRAMMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEPROGRAMMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEPROGRAMMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEPROGRAMMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEPROGRAMMAINTENANCE_FAILURE";

export const fetchGetActiveProgramMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEPROGRAMMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveProgramMaintenance(code);
    dispatch({
      type: FETCH_GETACTIVEPROGRAMMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETACTIVEPROGRAMMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWPROGRAMMAINTENANCE_REQUEST =
  "FETCH_NEWPROGRAMMAINTENANCE_REQUEST";
export const FETCH_NEWPROGRAMMAINTENANCE_SUCCESS =
  "FETCH_NEWPROGRAMMAINTENANCE_SUCCESS";
export const FETCH_NEWPROGRAMMAINTENANCE_FAILURE =
  "FETCH_NEWPROGRAMMAINTENANCE_FAILURE";

export const fetchNewProgramMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWPROGRAMMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewProgramMaintenance(code);
    dispatch({ type: FETCH_NEWPROGRAMMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWPROGRAMMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
/////////////////////////// UNIVERSITY MAINTENANCE/////////////////////////////
export const FETCH_GETUNIVERSITYMAINTENANCE_REQUEST =
  "FETCH_GETUNIVERSITYMAINTENANCE_REQUEST";
export const FETCH_GETUNIVERSITYMAINTENANCE_SUCCESS =
  "FETCH_GETUNIVERSITYMAINTENANCE_SUCCESS";
export const FETCH_GETUNIVERSITYMAINTENANCE_FAILURE =
  "FETCH_GETUNIVERSITYMAINTENANCE_FAILURE";

export const fetchGetUniversityMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETUNIVERSITYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetUniversityMaintenance(code);
    dispatch({ type: FETCH_GETUNIVERSITYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETUNIVERSITYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEUNIVERSITYMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEUNIVERSITYMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEUNIVERSITYMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEUNIVERSITYMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEUNIVERSITYMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEUNIVERSITYMAINTENANCE_FAILURE";

export const fetchGetActiveUniversityMaintenance =
  (code) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVEUNIVERSITYMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveUniversityMaintenance(code);
      dispatch({
        type: FETCH_GETACTIVEUNIVERSITYMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETACTIVEUNIVERSITYMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWUNIVERSITYMAINTENANCE_REQUEST =
  "FETCH_NEWUNIVERSITYMAINTENANCE_REQUEST";
export const FETCH_NEWUNIVERSITYMAINTENANCE_SUCCESS =
  "FETCH_NEWUNIVERSITYMAINTENANCE_SUCCESS";
export const FETCH_NEWUNIVERSITYMAINTENANCE_FAILURE =
  "FETCH_NEWUNIVERSITYMAINTENANCE_FAILURE";

export const fetchNewUniversityMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWUNIVERSITYMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewUniversityMaintenance(code);
    dispatch({ type: FETCH_NEWUNIVERSITYMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWUNIVERSITYMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

/////////////////////////// EXAM MAINTENANCE/////////////////////////////
export const FETCH_GETEXAMMAINTENANCE_REQUEST =
  "FETCH_GETEXAMMAINTENANCE_REQUEST";
export const FETCH_GETEXAMMAINTENANCE_SUCCESS =
  "FETCH_GETEXAMMAINTENANCE_SUCCESS";
export const FETCH_GETEXAMMAINTENANCE_FAILURE =
  "FETCH_GETEXAMMAINTENANCE_FAILURE";

export const fetchGetExamMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETEXAMMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetExamMaintenance(code);
    dispatch({ type: FETCH_GETEXAMMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETEXAMMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEEXAMMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEEXAMMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEEXAMMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEEXAMMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEEXAMMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEEXAMMAINTENANCE_FAILURE";

export const fetchGetActiveExamMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEEXAMMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveExamMaintenance(code);
    dispatch({
      type: FETCH_GETACTIVEEXAMMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETACTIVEEXAMMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWEXAMMAINTENANCE_REQUEST =
  "FETCH_NEWEXAMMAINTENANCE_REQUEST";
export const FETCH_NEWEXAMMAINTENANCE_SUCCESS =
  "FETCH_NEWEXAMMAINTENANCE_SUCCESS";
export const FETCH_NEWEXAMMAINTENANCE_FAILURE =
  "FETCH_NEWEXAMMAINTENANCE_FAILURE";

export const fetchNewExamMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWEXAMMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewExamMaintenance(code);
    dispatch({ type: FETCH_NEWEXAMMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWEXAMMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
/////////////////////////// REFERENCE MAINTENANCE/////////////////////////////
export const FETCH_GETREFERENCEMAINTENANCE_REQUEST =
  "FETCH_GETREFERENCEMAINTENANCE_REQUEST";
export const FETCH_GETREFERENCEMAINTENANCE_SUCCESS =
  "FETCH_GETREFERENCEMAINTENANCE_SUCCESS";
export const FETCH_GETREFERENCEMAINTENANCE_FAILURE =
  "FETCH_GETREFERENCEMAINTENANCE_FAILURE";

export const fetchGetReferenceMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETREFERENCEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetReferenceMaintenance(code);
    dispatch({ type: FETCH_GETREFERENCEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETREFERENCEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEREFERENCEMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEREFERENCEMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEREFERENCEMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEREFERENCEMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEREFERENCEMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEREFERENCEMAINTENANCE_FAILURE";

export const fetchGetActiveReferenceMaintenance =
  (code) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVEREFERENCEMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveReferenceMaintenance(code);
      dispatch({
        type: FETCH_GETACTIVEREFERENCEMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETACTIVEREFERENCEMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWREFERENCEMAINTENANCE_REQUEST =
  "FETCH_NEWREFERENCEMAINTENANCE_REQUEST";
export const FETCH_NEWREFERENCEMAINTENANCE_SUCCESS =
  "FETCH_NEWREFERENCEMAINTENANCE_SUCCESS";
export const FETCH_NEWREFERENCEMAINTENANCE_FAILURE =
  "FETCH_NEWREFERENCEMAINTENANCE_FAILURE";

export const fetchNewReferenceMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWREFERENCEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewReferenceMaintenance(code);
    dispatch({ type: FETCH_NEWREFERENCEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWREFERENCEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

/////////////////////////// TRAINER MAINTENANCE/////////////////////////////
export const FETCH_GETTRAINERMAINTENANCE_REQUEST =
  "FETCH_GETTRAINERMAINTENANCE_REQUEST";
export const FETCH_GETTRAINERMAINTENANCE_SUCCESS =
  "FETCH_GETTRAINERMAINTENANCE_SUCCESS";
export const FETCH_GETTRAINERMAINTENANCE_FAILURE =
  "FETCH_GETTRAINERMAINTENANCE_FAILURE";

export const fetchGetTrainerMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETTRAINERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetTrainerMaintenance(code, Location);
      dispatch({ type: FETCH_GETTRAINERMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETTRAINERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETACTIVETRAINERMAINTENANCE_REQUEST =
  "FETCH_GETACTIVETRAINERMAINTENANCE_REQUEST";
export const FETCH_GETACTIVETRAINERMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVETRAINERMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVETRAINERMAINTENANCE_FAILURE =
  "FETCH_GETACTIVETRAINERMAINTENANCE_FAILURE";

export const fetchGetActiveTrainerMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVETRAINERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveTrainerMaintenance(code, Location);
      dispatch({
        type: FETCH_GETACTIVETRAINERMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETACTIVETRAINERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWTRAINERMAINTENANCE_REQUEST =
  "FETCH_NEWTRAINERMAINTENANCE_REQUEST";
export const FETCH_NEWTRAINERMAINTENANCE_SUCCESS =
  "FETCH_NEWTRAINERMAINTENANCE_SUCCESS";
export const FETCH_NEWTRAINERMAINTENANCE_FAILURE =
  "FETCH_NEWTRAINERMAINTENANCE_FAILURE";

export const fetchNewTrainerMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWTRAINERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewTrainerMaintenance(code, Location);
      dispatch({ type: FETCH_NEWTRAINERMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_NEWTRAINERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };




  /////////////////////////// COLLECTOR MAINTENANCE/////////////////////////////
export const FETCH_GETCOLLECTORMAINTENANCE_REQUEST =
  "FETCH_GETCOLLECTORMAINTENANCE_REQUEST";
export const FETCH_GETCOLLECTORMAINTENANCE_SUCCESS =
  "FETCH_GETCOLLECTORMAINTENANCE_SUCCESS";
export const FETCH_GETCOLLECTORMAINTENANCE_FAILURE =
  "FETCH_GETCOLLECTORMAINTENANCE_FAILURE";

export const fetchGetCollectorMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETCOLLECTORMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetCollectorMaintenance(code, Location);
      dispatch({ type: FETCH_GETCOLLECTORMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETCOLLECTORMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };



export const FETCH_NEWCOLLECTORMAINTENANCE_REQUEST =
  "FETCH_NEWCOLLECTORMAINTENANCE_REQUEST";
export const FETCH_NEWCOLLECTORMAINTENANCE_SUCCESS =
  "FETCH_NEWCOLLECTORMAINTENANCE_SUCCESS";
export const FETCH_NEWCOLLECTORMAINTENANCE_FAILURE =
  "FETCH_NEWCOLLECTORMAINTENANCE_FAILURE";

export const fetchNewCollectorMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWCOLLECTORMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewCollectorMaintenance(code, Location);
      dispatch({ type: FETCH_NEWCOLLECTORMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_NEWCOLLECTORMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

/////////////////////////// RIDER MAINTENANCE /////////////////////////////
export const FETCH_GETRIDERMAINTENANCE_REQUEST =
  "FETCH_GETRIDERMAINTENANCE_REQUEST";
export const FETCH_GETRIDERMAINTENANCE_SUCCESS =
  "FETCH_GETRIDERMAINTENANCE_SUCCESS";
export const FETCH_GETRIDERMAINTENANCE_FAILURE =
  "FETCH_GETRIDERMAINTENANCE_FAILURE";

export const fetchGetRiderMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETRIDERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetRiderMaintenance(code, Location);
      dispatch({ type: FETCH_GETRIDERMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETRIDERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWRIDERMAINTENANCE_REQUEST =
  "FETCH_NEWRIDERMAINTENANCE_REQUEST";
export const FETCH_NEWRIDERMAINTENANCE_SUCCESS =
  "FETCH_NEWRIDERMAINTENANCE_SUCCESS";
export const FETCH_NEWRIDERMAINTENANCE_FAILURE =
  "FETCH_NEWRIDERMAINTENANCE_FAILURE";

export const fetchNewRiderMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWRIDERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewRiderMaintenance(code, Location);
      dispatch({ type: FETCH_NEWRIDERMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_NEWRIDERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

  /////////////////////////// WAITER MAINTENANCE /////////////////////////////
export const FETCH_GETWAITERMAINTENANCE_REQUEST =
  "FETCH_GETWAITERMAINTENANCE_REQUEST";
export const FETCH_GETWAITERMAINTENANCE_SUCCESS =
  "FETCH_GETWAITERMAINTENANCE_SUCCESS";
export const FETCH_GETWAITERMAINTENANCE_FAILURE =
  "FETCH_GETWAITERMAINTENANCE_FAILURE";

export const fetchGetWaiterMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETWAITERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetWaiterMaintenance(code, Location);
      dispatch({ type: FETCH_GETWAITERMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_GETWAITERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWWAITERMAINTENANCE_REQUEST =
  "FETCH_NEWWAITERMAINTENANCE_REQUEST";
export const FETCH_NEWWAITERMAINTENANCE_SUCCESS =
  "FETCH_NEWWAITERMAINTENANCE_SUCCESS";
export const FETCH_NEWWAITERMAINTENANCE_FAILURE =
  "FETCH_NEWWAITERMAINTENANCE_FAILURE";

export const fetchNewWaiterMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWWAITERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewWaiterMaintenance(code, Location);
      dispatch({ type: FETCH_NEWWAITERMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_NEWWAITERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

  /////////////////////////// VERIFY MAINTENANCE ///////////////////////////

export const FETCH_GETVERIFYMAINTENANCE_REQUEST =
  "FETCH_GETVERIFYMAINTENANCE_REQUEST";
export const FETCH_GETVERIFYMAINTENANCE_SUCCESS =
  "FETCH_GETVERIFYMAINTENANCE_SUCCESS";
export const FETCH_GETVERIFYMAINTENANCE_FAILURE =
  "FETCH_GETVERIFYMAINTENANCE_FAILURE";

export const fetchGetVerifyMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETVERIFYMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetVerifyMaintenance(code, Location);
      dispatch({ type: FETCH_GETVERIFYMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETVERIFYMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWVERIFYMAINTENANCE_REQUEST =
  "FETCH_NEWVERIFYMAINTENANCE_REQUEST";
export const FETCH_NEWVERIFYMAINTENANCE_SUCCESS =
  "FETCH_NEWVERIFYMAINTENANCE_SUCCESS";
export const FETCH_NEWVERIFYMAINTENANCE_FAILURE =
  "FETCH_NEWVERIFYMAINTENANCE_FAILURE";

export const fetchNewVerifyMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWVERIFYMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewVerifyMaintenance(code, Location);
      dispatch({ type: FETCH_NEWVERIFYMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_NEWVERIFYMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

/////////////////////////// MANAGER MAINTENANCE /////////////////////////////
export const FETCH_GETMANAGERMAINTENANCE_REQUEST =
  "FETCH_GETMANAGERMAINTENANCE_REQUEST";
export const FETCH_GETMANAGERMAINTENANCE_SUCCESS =
  "FETCH_GETMANAGERMAINTENANCE_SUCCESS";
export const FETCH_GETMANAGERMAINTENANCE_FAILURE =
  "FETCH_GETMANAGERMAINTENANCE_FAILURE";

export const fetchGetManagerMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETMANAGERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetManagerMaintenance(code, Location);
      dispatch({ type: FETCH_GETMANAGERMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_GETMANAGERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWMANAGERMAINTENANCE_REQUEST =
  "FETCH_NEWMANAGERMAINTENANCE_REQUEST";
export const FETCH_NEWMANAGERMAINTENANCE_SUCCESS =
  "FETCH_NEWMANAGERMAINTENANCE_SUCCESS";
export const FETCH_NEWMANAGERMAINTENANCE_FAILURE =
  "FETCH_NEWMANAGERMAINTENANCE_FAILURE";

export const fetchNewManagerMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWMANAGERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewManagerMaintenance(code, Location);
      dispatch({ type: FETCH_NEWMANAGERMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_NEWMANAGERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

  /////////////////////////// SALESMAN MAINTENANCE /////////////////////////////

export const FETCH_GETSALESMANMAINTENANCE_REQUEST =
  "FETCH_GETSALESMANMAINTENANCE_REQUEST";
export const FETCH_GETSALESMANMAINTENANCE_SUCCESS =
  "FETCH_GETSALESMANMAINTENANCE_SUCCESS";
export const FETCH_GETSALESMANMAINTENANCE_FAILURE =
  "FETCH_GETSALESMANMAINTENANCE_FAILURE";

export const fetchGetSalesManMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETSALESMANMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetSalesManMaintenance(code, Location);
      dispatch({ type: FETCH_GETSALESMANMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_GETSALESMANMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWSALESMANMAINTENANCE_REQUEST =
  "FETCH_NEWSALESMANMAINTENANCE_REQUEST";
export const FETCH_NEWSALESMANMAINTENANCE_SUCCESS =
  "FETCH_NEWSALESMANMAINTENANCE_SUCCESS";
export const FETCH_NEWSALESMANMAINTENANCE_FAILURE =
  "FETCH_NEWSALESMANMAINTENANCE_FAILURE";

export const fetchNewSalesManMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWSALESMANMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewSalesManMaintenance(code, Location);
      dispatch({ type: FETCH_NEWSALESMANMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_NEWSALESMANMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };


////////////////////////// SLOT MAINTENANCE/////////////////////////////
export const FETCH_GETSLOTMAINTENANCE_REQUEST =
  "FETCH_GETSLOTMAINTENANCE_REQUEST";
export const FETCH_GETSLOTMAINTENANCE_SUCCESS =
  "FETCH_GETSLOTMAINTENANCE_SUCCESS";
export const FETCH_GETSLOTMAINTENANCE_FAILURE =
  "FETCH_GETSLOTMAINTENANCE_FAILURE";

export const fetchGetSlotMaintenance = (code, Location) => async (dispatch) => {
  dispatch({ type: FETCH_GETSLOTMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetSlotMaintenance(code, Location);
    dispatch({ type: FETCH_GETSLOTMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETSLOTMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVESLOTMAINTENANCE_REQUEST =
  "FETCH_GETACTIVESLOTMAINTENANCE_REQUEST";
export const FETCH_GETACTIVESLOTMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVESLOTMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVESLOTMAINTENANCE_FAILURE =
  "FETCH_GETACTIVESLOTMAINTENANCE_FAILURE";

export const fetchGetActiveSlotMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVESLOTMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveSlotMaintenance(code, Location);
      dispatch({
        type: FETCH_GETACTIVESLOTMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETACTIVESLOTMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWSLOTMAINTENANCE_REQUEST =
  "FETCH_NEWSLOTMAINTENANCE_REQUEST";
export const FETCH_NEWSLOTMAINTENANCE_SUCCESS =
  "FETCH_NEWSLOTMAINTENANCE_SUCCESS";
export const FETCH_NEWSLOTMAINTENANCE_FAILURE =
  "FETCH_NEWSLOTMAINTENANCE_FAILURE";

export const fetchNewSlotMaintenance = (code, Location) => async (dispatch) => {
  dispatch({ type: FETCH_NEWSLOTMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewSlotMaintenance(code, Location);
    dispatch({ type: FETCH_NEWSLOTMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWSLOTMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
////////////////////////// GOAL MAINTENANCE/////////////////////////////
export const FETCH_GETGOALMAINTENANCE_REQUEST =
  "FETCH_GETGOALMAINTENANCE_REQUEST";
export const FETCH_GETGOALMAINTENANCE_SUCCESS =
  "FETCH_GETGOALMAINTENANCE_SUCCESS";
export const FETCH_GETGOALMAINTENANCE_FAILURE =
  "FETCH_GETGOALMAINTENANCE_FAILURE";

export const fetchGetGoalMaintenance = (code, Location) => async (dispatch) => {
  dispatch({ type: FETCH_GETGOALMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetGoalMaintenance(code, Location);
    dispatch({ type: FETCH_GETGOALMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETGOALMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEGOALMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEGOALMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEGOALMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEGOALMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEGOALMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEGOALMAINTENANCE_FAILURE";

export const fetchGetActiveGoalMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVEGOALMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveGoalMaintenance(code, Location);
      dispatch({
        type: FETCH_GETACTIVEGOALMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETACTIVEGOALMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWGOALMAINTENANCE_REQUEST =
  "FETCH_NEWGOALMAINTENANCE_REQUEST";
export const FETCH_NEWGOALMAINTENANCE_SUCCESS =
  "FETCH_NEWGOALMAINTENANCE_SUCCESS";
export const FETCH_NEWGOALMAINTENANCE_FAILURE =
  "FETCH_NEWGOALMAINTENANCE_FAILURE";

export const fetchNewGoalMaintenance = (code, Location) => async (dispatch) => {
  dispatch({ type: FETCH_NEWGOALMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewGoalMaintenance(code, Location);
    dispatch({ type: FETCH_NEWGOALMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWGOALMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
////////////////////////// FACILITY MAINTENANCE/////////////////////////////
export const FETCH_GETFACILITYMAINTENANCE_REQUEST =
  "FETCH_GETFACILITYMAINTENANCE_REQUEST";
export const FETCH_GETFACILITYMAINTENANCE_SUCCESS =
  "FETCH_GETFACILITYMAINTENANCE_SUCCESS";
export const FETCH_GETFACILITYMAINTENANCE_FAILURE =
  "FETCH_GETFACILITYMAINTENANCE_FAILURE";

export const fetchGetFacilityMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETFACILITYMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetFacilityMaintenance(code, Location);
      dispatch({ type: FETCH_GETFACILITYMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETFACILITYMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETACTIVEFACILITYMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEFACILITYMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEFACILITYMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEFACILITYMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEFACILITYMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEFACILITYMAINTENANCE_FAILURE";

export const fetchGetActiveFacilityMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVEFACILITYMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveFacilityMaintenance(code, Location);
      dispatch({
        type: FETCH_GETACTIVEFACILITYMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETACTIVEFACILITYMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWFACILITYMAINTENANCE_REQUEST =
  "FETCH_NEWFACILITYMAINTENANCE_REQUEST";
export const FETCH_NEWFACILITYMAINTENANCE_SUCCESS =
  "FETCH_NEWFACILITYMAINTENANCE_SUCCESS";
export const FETCH_NEWFACILITYMAINTENANCE_FAILURE =
  "FETCH_NEWFACILITYMAINTENANCE_FAILURE";

export const fetchNewFacilityMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWFACILITYMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewFacilityMaintenance(code, Location);
      dispatch({ type: FETCH_NEWFACILITYMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_NEWFACILITYMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

///////////////////////// CLASS MAINTENANCE/////////////////////////////
export const FETCH_GETCLASSMAINTENANCE_REQUEST =
  "FETCH_GETCLASSMAINTENANCE_REQUEST";
export const FETCH_GETCLASSMAINTENANCE_SUCCESS =
  "FETCH_GETCLASSMAINTENANCE_SUCCESS";
export const FETCH_GETCLASSMAINTENANCE_FAILURE =
  "FETCH_GETCLASSMAINTENANCE_FAILURE";

export const fetchGetClassMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETCLASSMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetClassMaintenance(code, Location);
      dispatch({ type: FETCH_GETCLASSMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETCLASSMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETACTIVECLASSMAINTENANCE_REQUEST =
  "FETCH_GETACTIVECLASSMAINTENANCE_REQUEST";
export const FETCH_GETACTIVECLASSMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVECLASSMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVECLASSMAINTENANCE_FAILURE =
  "FETCH_GETACTIVECLASSMAINTENANCE_FAILURE";

export const fetchGetActiveClassMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVECLASSMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveClassMaintenance(code, Location);
      dispatch({
        type: FETCH_GETACTIVECLASSMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETACTIVECLASSMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWCLASSMAINTENANCE_REQUEST =
  "FETCH_NEWCLASSMAINTENANCE_REQUEST";
export const FETCH_NEWCLASSMAINTENANCE_SUCCESS =
  "FETCH_NEWCLASSMAINTENANCE_SUCCESS";
export const FETCH_NEWCLASSMAINTENANCE_FAILURE =
  "FETCH_NEWCLASSMAINTENANCE_FAILURE";

export const fetchNewClassMaintenance =
  (code, Location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWCLASSMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewClassMaintenance(code, Location);
      dispatch({ type: FETCH_NEWCLASSMAINTENANCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_NEWCLASSMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };
/////////////////////////// AREA MAINTENANCE/////////////////////////////
export const FETCH_GETAREAMAINTENANCE_REQUEST =
  "FETCH_GETAREAMAINTENANCE_REQUEST";
export const FETCH_GETAREAMAINTENANCE_SUCCESS =
  "FETCH_GETAREAMAINTENANCE_SUCCESS";
export const FETCH_GETAREAMAINTENANCE_FAILURE =
  "FETCH_GETAREAMAINTENANCE_FAILURE";

export const fetchGetAreaMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETAREAMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetAreaMaintenance(code);
    dispatch({ type: FETCH_GETAREAMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETAREAMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEAREAMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEAREAMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEAREAMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEAREAMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEAREAMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEAREAMAINTENANCE_FAILURE";

export const fetchGetActiveAreaMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEAREAMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveAreaMaintenance(code);
    dispatch({
      type: FETCH_GETACTIVEAREAMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETACTIVEAREAMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWAREAMAINTENANCE_REQUEST =
  "FETCH_NEWAREAMAINTENANCE_REQUEST";
export const FETCH_NEWAREAMAINTENANCE_SUCCESS =
  "FETCH_NEWAREAMAINTENANCE_SUCCESS";
export const FETCH_NEWAREAMAINTENANCE_FAILURE =
  "FETCH_NEWAREAMAINTENANCE_FAILURE";

export const fetchNewAreaMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWAREAMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewAreaMaintenance(code);
    dispatch({ type: FETCH_NEWAREAMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWAREAMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
/////////////////////////// WorkShop MAINTENANCE/////////////////////////////
export const FETCH_GETWORKSHOPMAINTENANCE_REQUEST =
  "FETCH_GETWORKSHOPMAINTENANCE_REQUEST";
export const FETCH_GETWORKSHOPMAINTENANCE_SUCCESS =
  "FETCH_GETWORKSHOPMAINTENANCE_SUCCESS";
export const FETCH_GETWORKSHOPMAINTENANCE_FAILURE =
  "FETCH_GETWORKSHOPMAINTENANCE_FAILURE";

export const fetchGetWorkShopMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETWORKSHOPMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetWorkShopMaintenance(code);
    dispatch({ type: FETCH_GETWORKSHOPMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETWORKSHOPMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEWORKSHOPMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEWORKSHOPMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEWORKSHOPMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEWORKSHOPMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEWORKSHOPMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEWORKSHOPMAINTENANCE_FAILURE";

export const fetchGetActiveWorkShopMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEWORKSHOPMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveWorkShopMaintenance(code);
    dispatch({
      type: FETCH_GETACTIVEWORKSHOPMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETACTIVEWORKSHOPMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWWORKSHOPMAINTENANCE_REQUEST =
  "FETCH_NEWWORKSHOPMAINTENANCE_REQUEST";
export const FETCH_NEWWORKSHOPMAINTENANCE_SUCCESS =
  "FETCH_NEWWORKSHOPMAINTENANCE_SUCCESS";
export const FETCH_NEWWORKSHOPMAINTENANCE_FAILURE =
  "FETCH_NEWWORKSHOPMAINTENANCE_FAILURE";

export const fetchNewWorkShopMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWWORKSHOPMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewWorkShopMaintenance(code);
    dispatch({ type: FETCH_NEWWORKSHOPMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWWORKSHOPMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
/////////////////////////// MOBILE MAINTENANCE/////////////////////////////
export const FETCH_GETMOBILEMAINTENANCE_REQUEST =
  "FETCH_GETMOBILEMAINTENANCE_REQUEST";
export const FETCH_GETMOBILEMAINTENANCE_SUCCESS =
  "FETCH_GETMOBILEMAINTENANCE_SUCCESS";
export const FETCH_GETMOBILEMAINTENANCE_FAILURE =
  "FETCH_GETMOBILEMAINTENANCE_FAILURE";

export const fetchGetMobileMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETMOBILEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetMobileMaintenance(code);
    dispatch({ type: FETCH_GETMOBILEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_GETMOBILEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEMOBILEMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEMOBILEMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEMOBILEMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEMOBILEMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEMOBILEMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEMOBILEMAINTENANCE_FAILURE";

export const fetchGetActiveMobileMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEMOBILEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveMobileMaintenance(code);
    dispatch({
      type: FETCH_GETACTIVEMOBILEMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETACTIVEMOBILEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWMOBILEMAINTENANCE_REQUEST =
  "FETCH_NEWMOBILEMAINTENANCE_REQUEST";
export const FETCH_NEWMOBILEMAINTENANCE_SUCCESS =
  "FETCH_NEWMOBILEMAINTENANCE_SUCCESS";
export const FETCH_NEWMOBILEMAINTENANCE_FAILURE =
  "FETCH_NEWMOBILEMAINTENANCE_FAILURE";

export const fetchNewMobileMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWMOBILEMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewMobileMaintenance(code);
    dispatch({ type: FETCH_NEWMOBILEMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWMOBILEMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

/////////////////////////// WORKSHOP ITEM MAINTENANCE/////////////////////////////
export const FETCH_GETWORKSHOPITEMMAINTENANCE_REQUEST =
  "FETCH_GETWORKSHOPITEMMAINTENANCE_REQUEST";
export const FETCH_GETWORKSHOPITEMMAINTENANCE_SUCCESS =
  "FETCH_GETWORKSHOPITEMMAINTENANCE_SUCCESS";
export const FETCH_GETWORKSHOPITEMMAINTENANCE_FAILURE =
  "FETCH_GETWORKSHOPITEMMAINTENANCE_FAILURE";

export const fetchGetWorkShopItemMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETWORKSHOPITEMMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetWorkShopItemMaintenance(code);
    dispatch({ type: FETCH_GETWORKSHOPITEMMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETWORKSHOPITEMMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_FAILURE";

export const fetchGetActiveWorkShopItemMaintenance =
  (code) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveWorkShopItemMaintenance(code);
      dispatch({
        type: FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWWORKSHOPITEMMAINTENANCE_REQUEST =
  "FETCH_NEWWORKSHOPITEMMAINTENANCE_REQUEST";
export const FETCH_NEWWORKSHOPITEMMAINTENANCE_SUCCESS =
  "FETCH_NEWWORKSHOPITEMMAINTENANCE_SUCCESS";
export const FETCH_NEWWORKSHOPITEMMAINTENANCE_FAILURE =
  "FETCH_NEWWORKSHOPITEMMAINTENANCE_FAILURE";

export const fetchNewWorkShopItemMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWWORKSHOPITEMMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewWorkShopItemMaintenance(code);
    dispatch({ type: FETCH_NEWWORKSHOPITEMMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWWORKSHOPITEMMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
/////////////////////////// CLUB MAINTENANCE/////////////////////////////
export const FETCH_GETCLUBMAINTENANCE_REQUEST =
  "FETCH_GETCLUBMAINTENANCE_REQUEST";
export const FETCH_GETCLUBMAINTENANCE_SUCCESS =
  "FETCH_GETCLUBMAINTENANCE_SUCCESS";
export const FETCH_GETCLUBMAINTENANCE_FAILURE =
  "FETCH_GETCLUBMAINTENANCE_FAILURE";

export const fetchGetClubMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETCLUBMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetClubMaintenance(code);
    dispatch({ type: FETCH_GETCLUBMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETCLUBMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVECLUBMAINTENANCE_REQUEST =
  "FETCH_GETACTIVECLUBMAINTENANCE_REQUEST";
export const FETCH_GETACTIVECLUBMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVECLUBMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVECLUBMAINTENANCE_FAILURE =
  "FETCH_GETACTIVECLUBMAINTENANCE_FAILURE";

export const fetchGetActiveClubMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVECLUBMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveClubMaintenance(code);
    dispatch({
      type: FETCH_GETACTIVECLUBMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETACTIVECLUBMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWCLUBMAINTENANCE_REQUEST =
  "FETCH_NEWCLUBMAINTENANCE_REQUEST";
export const FETCH_NEWCLUBMAINTENANCE_SUCCESS =
  "FETCH_NEWCLUBMAINTENANCE_SUCCESS";
export const FETCH_NEWCLUBMAINTENANCE_FAILURE =
  "FETCH_NEWCLUBMAINTENANCE_FAILURE";

export const fetchNewClubMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWCLUBMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewClubMaintenance(code);
    dispatch({ type: FETCH_NEWCLUBMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWCLUBMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

/////////////////////////// COMPLAIN MAINTENANCE/////////////////////////////
export const FETCH_GETCOMPLAINMAINTENANCE_REQUEST =
  "FETCH_GETCOMPLAINMAINTENANCE_REQUEST";
export const FETCH_GETCOMPLAINMAINTENANCE_SUCCESS =
  "FETCH_GETCOMPLAINMAINTENANCE_SUCCESS";
export const FETCH_GETCOMPLAINMAINTENANCE_FAILURE =
  "FETCH_GETCOMPLAINMAINTENANCE_FAILURE";

export const fetchGetComplainMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETCOMPLAINMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetComplainMaintenance(code);
    dispatch({ type: FETCH_GETCOMPLAINMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETCOMPLAINMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVECOMPLAINMAINTENANCE_REQUEST =
  "FETCH_GETACTIVECOMPLAINMAINTENANCE_REQUEST";
export const FETCH_GETACTIVECOMPLAINMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVECOMPLAINMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVECOMPLAINMAINTENANCE_FAILURE =
  "FETCH_GETACTIVECOMPLAINMAINTENANCE_FAILURE";

export const fetchGetActiveComplainMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVECOMPLAINMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveComplainMaintenance(code);
    dispatch({
      type: FETCH_GETACTIVECOMPLAINMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETACTIVECOMPLAINMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWCOMPLAINMAINTENANCE_REQUEST =
  "FETCH_NEWCOMPLAINMAINTENANCE_REQUEST";
export const FETCH_NEWCOMPLAINMAINTENANCE_SUCCESS =
  "FETCH_NEWCOMPLAINMAINTENANCE_SUCCESS";
export const FETCH_NEWCOMPLAINMAINTENANCE_FAILURE =
  "FETCH_NEWCOMPLAINMAINTENANCE_FAILURE";

export const fetchNewComplainMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWCOMPLAINMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewComplainMaintenance(code);
    dispatch({ type: FETCH_NEWCOMPLAINMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWCOMPLAINMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
////////////////////////// CONTROL MAINTENANCE/////////////////////////////
export const FETCH_GETCONTROLMAINTENANCE_REQUEST =
  "FETCH_GETCONTROLMAINTENANCE_REQUEST";
export const FETCH_GETCONTROLMAINTENANCE_SUCCESS =
  "FETCH_GETCONTROLMAINTENANCE_SUCCESS";
export const FETCH_GETCONTROLMAINTENANCE_FAILURE =
  "FETCH_GETCONTROLMAINTENANCE_FAILURE";

export const fetchGetControlMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETCONTROLMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetControlMaintenance(code);
    dispatch({ type: FETCH_GETCONTROLMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETCONTROLMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVECONTROLMAINTENANCE_REQUEST =
  "FETCH_GETACTIVECONTROLMAINTENANCE_REQUEST";
export const FETCH_GETACTIVECONTROLMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVECONTROLMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVECONTROLMAINTENANCE_FAILURE =
  "FETCH_GETACTIVECONTROLMAINTENANCE_FAILURE";

export const fetchGetActiveControlMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVECONTROLMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveControlMaintenance(code);
    dispatch({
      type: FETCH_GETACTIVECONTROLMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETACTIVECONTROLMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWCONTROLMAINTENANCE_REQUEST =
  "FETCH_NEWCONTROLMAINTENANCE_REQUEST";
export const FETCH_NEWCONTROLMAINTENANCE_SUCCESS =
  "FETCH_NEWCONTROLMAINTENANCE_SUCCESS";
export const FETCH_NEWCONTROLMAINTENANCE_FAILURE =
  "FETCH_NEWCONTROLMAINTENANCE_FAILURE";

export const fetchNewControlMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWCONTROLMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewControlMaintenance(code);
    dispatch({ type: FETCH_NEWCONTROLMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWCONTROLMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

////////////////////////// TECHNICIAN MAINTENANCE/////////////////////////////
export const FETCH_GETTECHNICIANMAINTENANCE_REQUEST =
  "FETCH_GETTECHNICIANMAINTENANCE_REQUEST";
export const FETCH_GETTECHNICIANMAINTENANCE_SUCCESS =
  "FETCH_GETTECHNICIANMAINTENANCE_SUCCESS";
export const FETCH_GETTECHNICIANMAINTENANCE_FAILURE =
  "FETCH_GETTECHNICIANMAINTENANCE_FAILURE";

export const fetchGetTechnicianMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETTECHNICIANMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetTechnicianMaintenance(code);
    dispatch({ type: FETCH_GETTECHNICIANMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETTECHNICIANMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETACTIVETECHNICIANMAINTENANCE_REQUEST =
  "FETCH_GETACTIVETECHNICIANMAINTENANCE_REQUEST";
export const FETCH_GETACTIVETECHNICIANMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVETECHNICIANMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVETECHNICIANMAINTENANCE_FAILURE =
  "FETCH_GETACTIVETECHNICIANMAINTENANCE_FAILURE";

export const fetchGetActiveTechnicianMaintenance =
  (code) => async (dispatch) => {
    dispatch({ type: FETCH_GETACTIVETECHNICIANMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetActiveTechnicianMaintenance(code);
      dispatch({
        type: FETCH_GETACTIVETECHNICIANMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETACTIVETECHNICIANMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_NEWTECHNICIANMAINTENANCE_REQUEST =
  "FETCH_NEWTECHNICIANMAINTENANCE_REQUEST";
export const FETCH_NEWTECHNICIANMAINTENANCE_SUCCESS =
  "FETCH_NEWTECHNICIANMAINTENANCE_SUCCESS";
export const FETCH_NEWTECHNICIANMAINTENANCE_FAILURE =
  "FETCH_NEWTECHNICIANMAINTENANCE_FAILURE";

export const fetchNewTechnicianMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_NEWTECHNICIANMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataNewTechnicianMaintenance(code);
    dispatch({ type: FETCH_NEWTECHNICIANMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NEWTECHNICIANMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

////////////////////////// HELPER MAINTENANCE /////////////////////////////
export const FETCH_GETHELPERMAINTENANCE_REQUEST =
  "FETCH_GETHELPERMAINTENANCE_REQUEST";
export const FETCH_GETHELPERMAINTENANCE_SUCCESS =
  "FETCH_GETHELPERMAINTENANCE_SUCCESS";
export const FETCH_GETHELPERMAINTENANCE_FAILURE =
  "FETCH_GETHELPERMAINTENANCE_FAILURE";

export const fetchGetHelperMaintenance =
  (code, location) => async (dispatch) => {
    dispatch({ type: FETCH_GETHELPERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetHelperMaintenance(
        code,
        location
      );
      dispatch({
        type: FETCH_GETHELPERMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETHELPERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };
export const FETCH_GETACTIVEHELPERMAINTENANCE_REQUEST =
  "FETCH_GETACTIVEHELPERMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEHELPERMAINTENANCE_SUCCESS =
  "FETCH_GETACTIVEHELPERMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEHELPERMAINTENANCE_FAILURE =
  "FETCH_GETACTIVEHELPERMAINTENANCE_FAILURE";

export const fetchGetActiveHelperMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETACTIVEHELPERMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetActiveHelperMaintenance(code);
    dispatch({
      type: FETCH_GETACTIVEHELPERMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETACTIVEHELPERMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_NEWHELPERMAINTENANCE_REQUEST =
  "FETCH_NEWHELPERMAINTENANCE_REQUEST";
export const FETCH_NEWHELPERMAINTENANCE_SUCCESS =
  "FETCH_NEWHELPERMAINTENANCE_SUCCESS";
export const FETCH_NEWHELPERMAINTENANCE_FAILURE =
  "FETCH_NEWHELPERMAINTENANCE_FAILURE";


export const fetchNewHelperMaintenance =
  (code, location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWHELPERMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewHelperMaintenance(
        code,
        location
      );
      dispatch({
        type: FETCH_NEWHELPERMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWHELPERMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

////////////////////////// JOB MAINTENANCE/////////////////////////////
export const FETCH_GETJOBSMAINTENANCE_REQUEST =
  "FETCH_GETJOBSMAINTENANCE_REQUEST";
export const FETCH_GETJOBSMAINTENANCE_SUCCESS =
  "FETCH_GETJOBSMAINTENANCE_SUCCESS";
export const FETCH_GETJOBSMAINTENANCE_FAILURE =
  "FETCH_GETJOBSMAINTENANCE_FAILURE";


export const fetchGetJobsMaintenance =
  (code, location) => async (dispatch) => {
    dispatch({ type: FETCH_GETJOBSMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetJobMaintenance(
        code,
        location
      );
      dispatch({
        type: FETCH_GETJOBSMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETJOBSMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };
export const FETCH_NEWJOBSMAINTENANCE_REQUEST =
  "FETCH_NEWJOBSMAINTENANCE_REQUEST";
export const FETCH_NEWJOBSMAINTENANCE_SUCCESS =
  "FETCH_NEWJOBSMAINTENANCE_SUCCESS";
export const FETCH_NEWJOBSMAINTENANCE_FAILURE =
  "FETCH_NEWJOBSMAINTENANCE_FAILURE";

export const fetchNewJobsMaintenance =
  (code, location) => async (dispatch) => {
    dispatch({ type: FETCH_NEWJOBSMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewJobMaintenance(
        code,
        location
      );
      dispatch({
        type: FETCH_NEWJOBSMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWJOBSMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };
////////////////////////// UNASSIGNJBS MAINTENANCE/////////////////////////////
export const FETCH_GETUNASSIGNJOBSMAINTENANCE_REQUEST =
  "FETCH_GETUNASSIGNJOBSMAINTENANCE_REQUEST";
export const FETCH_GETUNASSIGNJOBSMAINTENANCE_SUCCESS =
  "FETCH_GETUNASSIGNJOBSMAINTENANCE_SUCCESS";
export const FETCH_GETUNASSIGNJOBSMAINTENANCE_FAILURE =
  "FETCH_GETUNASSIGNJOBSMAINTENANCE_FAILURE";

export const fetchGetUnassignJobsMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETUNASSIGNJOBSMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetUnassignedJobsMaintenance(code);
    dispatch({ type: FETCH_GETUNASSIGNJOBSMAINTENANCE_SUCCESS, payload: data });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETUNASSIGNJOBSMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETTECHNICIANPENDINGSTATUSMAINTENANCE_REQUEST =
  "FETCH_GETTECHNICIANPENDINGSTATUSMAINTENANCE_REQUEST";
export const FETCH_GETTECHNICIANPENDINGSTATUSMAINTENANCE_SUCCESS =
  "FETCH_GETTECHNICIANPENDINGSTATUSMAINTENANCE_SUCCESS";
export const FETCH_GETTECHNICIANPENDINGSTATUSMAINTENANCE_FAILURE =
  "FETCH_GETTECHNICIANPENDINGSTATUSMAINTENANCE_FAILURE";

export const fetchGetTechnicianPendingStatusMaintenance =
  (code, citycode, areacode) => async (dispatch) => {
    dispatch({ type: FETCH_GETTECHNICIANPENDINGSTATUSMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetTechnicianPendingStatusMaintenance(
        code,
        citycode,
        areacode
      );
      dispatch({
        type: FETCH_GETTECHNICIANPENDINGSTATUSMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETTECHNICIANPENDINGSTATUSMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

////////////////////////// PENDING JOB  MAINTENANCE/////////////////////////////
export const FETCH_GETPENDINGJOBSMAINTENANCE_REQUEST =
  "FETCH_GETPENDINGJOBSMAINTENANCE_REQUEST";
export const FETCH_GETPENDINGJOBSMAINTENANCE_SUCCESS =
  "FETCH_GETPENDINGJOBSMAINTENANCE_SUCCESS";
export const FETCH_GETPENDINGJOBSMAINTENANCE_FAILURE =
  "FETCH_GETPENDINGJOBSMAINTENANCE_FAILURE";

export const fetchGetPendingJobsMaintenance =
  (code, location) => async (dispatch) => {
    dispatch({ type: FETCH_GETPENDINGJOBSMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetPendingJobsMaintenance(code, location);
      dispatch({
        type: FETCH_GETPENDINGJOBSMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", erro
      //
      // r.message);
      dispatch({
        type: FETCH_GETPENDINGJOBSMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

  /////////////////////////// OUTSTANDING DEMAND ///////////////////////////////

export const FETCH_GETOUTSTANDINGDEMANDS_REQUEST =
  "FETCH_GETOUTSTANDINGDEMANDS_REQUEST";
export const FETCH_GETOUTSTANDINGDEMANDS_SUCCESS =
  "FETCH_GETOUTSTANDINGDEMANDS_SUCCESS";
export const FETCH_GETOUTSTANDINGDEMANDS_FAILURE =
  "FETCH_GETOUTSTANDINGDEMANDS_FAILURE";

export const fetchGetOutstandingDemands =
  (code, location,year) => async (dispatch) => {
    dispatch({ type: FETCH_GETOUTSTANDINGDEMANDS_REQUEST });
    try {
      const data = await fetchDataGetOutstandingDemands(code, location,year);
      dispatch({
        type: FETCH_GETOUTSTANDINGDEMANDS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GETOUTSTANDINGDEMANDS_FAILURE,
        payload: error.message,
      });
    }
  };

////////////////////////// PENDING REPAIRING  MAINTENANCE/////////////////////////////
export const FETCH_GETPENDINGREPAIRINGJOBSMAINTENANCE_REQUEST =
  "FETCH_GETPENDINGREPAIRINGJOBSMAINTENANCE_REQUEST";
export const FETCH_GETPENDINGREPAIRINGJOBSMAINTENANCE_SUCCESS =
  "FETCH_GETPENDINGREPAIRINGJOBSMAINTENANCE_SUCCESS";
export const FETCH_GETPENDINGREPAIRINGJOBSMAINTENANCE_FAILURE =
  "FETCH_GETPENDINGREPAIRINGJOBSMAINTENANCE_FAILURE";

export const fetchGetPendingRepairingJobsMaintenance =
  (code, getreptype) => async (dispatch) => {
    dispatch({ type: FETCH_GETPENDINGREPAIRINGJOBSMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetPendingRepairingJobsMaintenance(
        code,
        getreptype
      );
      dispatch({
        type: FETCH_GETPENDINGREPAIRINGJOBSMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETPENDINGREPAIRINGJOBSMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

////////////////////////// PENDING WORKSHOP  MAINTENANCE/////////////////////////////
export const FETCH_GETPENDINGWORKSHOPJOBSMAINTENANCE_REQUEST =
  "FETCH_GETPENDINGWORKSHOPJOBSMAINTENANCE_REQUEST";
export const FETCH_GETPENDINGWORKSHOPJOBSMAINTENANCE_SUCCESS =
  "FETCH_GETPENDINGWORKSHOPJOBSMAINTENANCE_SUCCESS";
export const FETCH_GETPENDINGWORKSHOPJOBSMAINTENANCE_FAILURE =
  "FETCH_GETPENDINGWORKSHOPJOBSMAINTENANCE_FAILURE";

export const fetchGetPendingWorkShopJobsMaintenance =
  (code, getreptype) => async (dispatch) => {
    dispatch({ type: FETCH_GETPENDINGWORKSHOPJOBSMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetPendingWorkShopJobsMaintenance(
        code,
        getreptype
      );
      dispatch({
        type: FETCH_GETPENDINGWORKSHOPJOBSMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETPENDINGWORKSHOPJOBSMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };
////////////////////////// PENDING  INSTALLATION JOB  MAINTENANCE/////////////////////////////
export const FETCH_GETPENDINGINSTALLATIONJOBSMAINTENANCE_REQUEST =
  "FETCH_GETPENDINGINSTALLATIONJOBSMAINTENANCE_REQUEST";
export const FETCH_GETPENDINGINSTALLATIONJOBSMAINTENANCE_SUCCESS =
  "FETCH_GETPENDINGINSTALLATIONJOBSMAINTENANCE_SUCCESS";
export const FETCH_GETPENDINGINSTALLATIONJOBSMAINTENANCE_FAILURE =
  "FETCH_GETPENDINGINSTALLATIONJOBSMAINTENANCE_FAILURE";

export const fetchGetPendingInstallationJobsMaintenance =
  (code, getreptype) => async (dispatch) => {
    dispatch({ type: FETCH_GETPENDINGINSTALLATIONJOBSMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetPendingInstallationJobsMaintenance(
        code,
        getreptype
      );
      dispatch({
        type: FETCH_GETPENDINGINSTALLATIONJOBSMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETPENDINGINSTALLATIONJOBSMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };
////////////////////////// DONE JOB  MAINTENANCE/////////////////////////////
export const FETCH_GETDONEJOBSMAINTENANCE_REQUEST =
  "FETCH_GETPDONEJOBSMAINTENANCE_REQUEST";
export const FETCH_GETDONEJOBSMAINTENANCE_SUCCESS =
  "FETCH_GETDONEJOBSMAINTENANCE_SUCCESS";
export const FETCH_GETDONEJOBSMAINTENANCE_FAILURE =
  "FETCH_GETDONEJOBSMAINTENANCE_FAILURE";

export const fetchGetDoneJobsMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETDONEJOBSMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetDoneJobsMaintenance(code);
    dispatch({
      type: FETCH_GETDONEJOBSMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETDONEJOBSMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

////////////////////////// FEEDBACK JOB MAINTENANCE /////////////////////////////
export const FETCH_GETFEEDBACKJOBSMAINTENANCE_REQUEST =
  "FETCH_GETFEEDBACKJOBSMAINTENANCE_REQUEST";
export const FETCH_GETFEEDBACKJOBSMAINTENANCE_SUCCESS =
  "FETCH_GETFEEDBACKJOBSMAINTENANCE_SUCCESS";
export const FETCH_GETFEEDBACKJOBSMAINTENANCE_FAILURE =
  "FETCH_GETFEEDBACKJOBSMAINTENANCE_FAILURE";

export const fetchGetFeedBackJobsMaintenance = (code,location) => async (dispatch) => {
  dispatch({ type: FETCH_GETFEEDBACKJOBSMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetFeedBackJobsMaintenance(code,location);
    dispatch({
      type: FETCH_GETFEEDBACKJOBSMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETFEEDBACKJOBSMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};


////////////////////////// CASHMEMO MAINTENANCE/////////////////////////////
export const FETCH_GETCASHMEMOMAINTENANCE_REQUEST =
  "FETCH_GETCASHMEMOMAINTENANCE_REQUEST";
export const FETCH_GETCASHMEMOMAINTENANCE_SUCCESS =
  "FETCH_GETCASHMEMOMAINTENANCE_SUCCESS";
export const FETCH_GETCASHMEMOMAINTENANCE_FAILURE =
  "FETCH_GETCASHMEMOMAINTENANCE_FAILURE";

export const fetchGetCashMemoMaintenance =
  (code, getreptype) => async (dispatch) => {
    dispatch({ type: FETCH_GETCASHMEMOMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetCashMemoMaintenance(code, getreptype);
      dispatch({
        type: FETCH_GETCASHMEMOMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETCASHMEMOMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };
////////////////////////// CLOSED JOB  MAINTENANCE/////////////////////////////
export const FETCH_GETCLOSEDJOBSMAINTENANCE_REQUEST =
  "FETCH_GETCLOSEDJOBSMAINTENANCE_REQUEST";
export const FETCH_GETCLOSEDJOBSMAINTENANCE_SUCCESS =
  "FETCH_GETCLOSEDJOBSMAINTENANCE_SUCCESS";
export const FETCH_GETCLOSEDJOBSMAINTENANCE_FAILURE =
  "FETCH_GETCLOSEDJOBSMAINTENANCE_FAILURE";

export const fetchGetClosedJobsMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETCLOSEDJOBSMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetClosedJobsMaintenance(code);
    dispatch({
      type: FETCH_GETCLOSEDJOBSMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETCLOSEDJOBSMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

////////////////////////// GETCLOSEDITEMDEMAND  MAINTENANCE/////////////////////////////
export const FETCH_GETCOMPLAINITEMDEMANDMAINTENANCE_REQUEST =
  "FETCH_GETCOMPLAINITEMDEMANDMAINTENANCE_REQUEST";
export const FETCH_GETCOMPLAINITEMDEMANDMAINTENANCE_SUCCESS =
  "FETCH_GETCOMPLAINITEMDEMANDMAINTENANCE_SUCCESS";
export const FETCH_GETCOMPLAINITEMDEMANDMAINTENANCE_FAILURE =
  "FETCH_GETCOMPLAINITEMDEMANDMAINTENANCE_FAILURE";

export const fetchGetComplainItemDemandMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETCOMPLAINITEMDEMANDMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetComplainItemDemandsMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_GETCOMPLAINITEMDEMANDMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETCOMPLAINITEMDEMANDMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETCOMPLAINITEMDEMANDDETAILMAINTENANCE_REQUEST =
  "FETCH_GETCOMPLAINITEMDEMANDDETAILMAINTENANCE_REQUEST";
export const FETCH_GETCOMPLAINITEMDEMANDDETAILMAINTENANCE_SUCCESS =
  "FETCH_GETCOMPLAINITEMDEMANDDETAILMAINTENANCE_SUCCESS";
export const FETCH_GETCOMPLAINITEMDEMANDDETAILMAINTENANCE_FAILURE =
  "FETCH_GETCOMPLAINITEMDEMANDDETAILMAINTENANCE_FAILURE";

export const fetchGetComplainItemDemandDetailMaintenance =
  (code, location, yeardesc, trnnumber) => async (dispatch) => {
    dispatch({ type: FETCH_GETCOMPLAINITEMDEMANDDETAILMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetComplainItemDemandDetailMaintenance(
        code,
        location,
        yeardesc,
        trnnumber
      );
      dispatch({
        type: FETCH_GETCOMPLAINITEMDEMANDDETAILMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETCOMPLAINITEMDEMANDDETAILMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };



  //////////////////////// PURCHASE ORDER //////////////////////////////////

export const FETCH_NEWPURCHASEORDER_REQUEST =
  "FETCH_NEWPURCHASEORDER_REQUEST";
export const FETCH_NEWPURCHASEORDER_SUCCESS =
  "FETCH_NEWPURCHASEORDER_SUCCESS";
export const FETCH_NEWPURCHASEORDER_FAILURE =
  "FETCH_NEWPURCHASEORDER_FAILURE";

export const fetchNewPurchaseOrder =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_NEWPURCHASEORDER_REQUEST });
    try {
      const data = await fetchDataNewPurchaseOrder(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_NEWPURCHASEORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWPURCHASEORDER_FAILURE,
        payload: error.message,
      });
    }
  };



export const FETCH_GETPURCHASEORDERLIST_REQUEST =
  "FETCH_GETPURCHASEORDERLIST_REQUEST";
export const FETCH_GETPURCHASEORDERLIST_SUCCESS =
  "FETCH_GETPURCHASEORDERLIST_SUCCESS";
export const FETCH_GETPURCHASEORDERLIST_FAILURE =
  "FETCH_GETPURCHASEORDERLIST_FAILURE";

export const fetchGetPurchaseOrderList =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETPURCHASEORDERLIST_REQUEST });
    try {
      const data = await fetchDataGetPurchaseOrderList(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_GETPURCHASEORDERLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETPURCHASEORDERLIST_FAILURE,
        payload: error.message,
      });
    }
  };

  
  //////////////////////// DEMAND //////////////////////////////////

export const FETCH_NEWDEMAND_REQUEST = "FETCH_NEWDEMAND_REQUEST";
export const FETCH_NEWDEMAND_SUCCESS = "FETCH_NEWDEMAND_SUCCESS";
export const FETCH_NEWDEMAND_FAILURE = "FETCH_NEWDEMAND_FAILURE";

export const fetchNewDemand = (code, location, yeardesc) => async (dispatch) => {
  dispatch({ type: FETCH_NEWDEMAND_REQUEST });
  try {
    const data = await fetchDataNewDemand(code, location, yeardesc);
    dispatch({
      type: FETCH_NEWDEMAND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_NEWDEMAND_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETDEMANDLIST_REQUEST = "FETCH_GETDEMANDLIST_REQUEST";
export const FETCH_GETDEMANDLIST_SUCCESS = "FETCH_GETDEMANDLIST_SUCCESS";
export const FETCH_GETDEMANDLIST_FAILURE = "FETCH_GETDEMANDLIST_FAILURE";

export const fetchGetDemandList = (code, location, yeardesc) => async (dispatch) => {
  dispatch({ type: FETCH_GETDEMANDLIST_REQUEST });
  try {
    const data = await fetchDataGetDemandList(code, location, yeardesc);
    dispatch({
      type: FETCH_GETDEMANDLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETDEMANDLIST_FAILURE,
      payload: error.message,
    });
  }
};
//////////////////////// ISSUE //////////////////////////////////

export const FETCH_NEWISSUE_REQUEST = "FETCH_NEWISSUE_REQUEST";
export const FETCH_NEWISSUE_SUCCESS = "FETCH_NEWISSUE_SUCCESS";
export const FETCH_NEWISSUE_FAILURE = "FETCH_NEWISSUE_FAILURE";

export const fetchNewIssue = (code, location, yeardesc) => async (dispatch) => {
  dispatch({ type: FETCH_NEWISSUE_REQUEST });
  try {
    const data = await fetchDataNewIssue(code, location, yeardesc);
    dispatch({
      type: FETCH_NEWISSUE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_NEWISSUE_FAILURE,
      payload: error.message,
    });
  }
};

export const FETCH_GETISSUELIST_REQUEST = "FETCH_GETISSUELIST_REQUEST";
export const FETCH_GETISSUELIST_SUCCESS = "FETCH_GETISSUELIST_SUCCESS";
export const FETCH_GETISSUELIST_FAILURE = "FETCH_GETISSUELIST_FAILURE";

export const fetchGetIssueList = (code, location, yeardesc) => async (dispatch) => {
  dispatch({ type: FETCH_GETISSUELIST_REQUEST });
  try {
    const data = await fetchDataGetIssueList(code, location, yeardesc);
    dispatch({
      type: FETCH_GETISSUELIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_GETISSUELIST_FAILURE,
      payload: error.message,
    });
  }
};


  //////////////////////// SALE ORDER //////////////////////////////////

export const FETCH_NEWSALEORDER_REQUEST =
  "FETCH_NEWSALEORDER_REQUEST";
export const FETCH_NEWSALEORDER_SUCCESS =
  "FETCH_NEWSALEORDER_SUCCESS";
export const FETCH_NEWSALEORDER_FAILURE =
  "FETCH_NEWSALEORDER_FAILURE";

export const fetchNewSaleOrder =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_NEWSALEORDER_REQUEST });
    try {
      const data = await fetchDataNewSaleOrder(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_NEWSALEORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWSALEORDER_FAILURE,
        payload: error.message,
      });
    }
  };



export const FETCH_GETSALEORDERLIST_REQUEST =
  "FETCH_GETSALEORDERLIST_REQUEST";
export const FETCH_GETSALEORDERLIST_SUCCESS =
  "FETCH_GETSALEORDERLIST_SUCCESS";
export const FETCH_GETSALEORDERLIST_FAILURE =
  "FETCH_GETSALEORDERLIST_FAILURE";

export const fetchGetSaleOrderList =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETSALEORDERLIST_REQUEST });
    try {
      const data = await fetchDataGetSaleOrderList(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_GETSALEORDERLIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETSALEORDERLIST_FAILURE,
        payload: error.message,
      });
    }
  };


  //////////////////////// RECEIPE //////////////////////////////////

// === New Receipe ===
export const FETCH_NEWRECEIPE_REQUEST = "FETCH_NEWRECEIPE_REQUEST";
export const FETCH_NEWRECEIPE_SUCCESS = "FETCH_NEWRECEIPE_SUCCESS";
export const FETCH_NEWRECEIPE_FAILURE = "FETCH_NEWRECEIPE_FAILURE";

export const fetchNewReceipe =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_NEWRECEIPE_REQUEST });
    try {
      const data = await fetchDataNewReceipe(code, location, yeardesc);
      dispatch({
        type: FETCH_NEWRECEIPE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_NEWRECEIPE_FAILURE,
        payload: error.message,
      });
    }
  };

// === Get Receipe List ===
export const FETCH_GETRECEIPELIST_REQUEST = "FETCH_GETRECEIPELIST_REQUEST";
export const FETCH_GETRECEIPELIST_SUCCESS = "FETCH_GETRECEIPELIST_SUCCESS";
export const FETCH_GETRECEIPELIST_FAILURE = "FETCH_GETRECEIPELIST_FAILURE";

export const fetchGetReceipeList =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETRECEIPELIST_REQUEST });
    try {
      const data = await fetchDataGetReceipeList(code, location, yeardesc);
      dispatch({
        type: FETCH_GETRECEIPELIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_GETRECEIPELIST_FAILURE,
        payload: error.message,
      });
    }
  };

//////////////////////// ITEM PURCHASE //////////////////////////////////

export const FETCH_GETTRANSACTIONINFO_REQUEST =
  "FETCH_GETTRANSACTIONINFO_REQUEST";
export const FETCH_GETTRANSACTIONINFO_SUCCESS =
  "FETCH_GETTRANSACTIONINFO_SUCCESS";
export const FETCH_GETTRANSACTIONINFO_FAILURE =
  "FETCH_GETTRANSACTIONINFO_FAILURE";

export const fetchGetTransactionInfo =
  (code, location, yeardescription, trnnumber, trantype) => async (dispatch) => {
    dispatch({ type: FETCH_GETTRANSACTIONINFO_REQUEST });
    try {
      const data = await fetchDataGetTransactionInfo(
        code,
        location,
        yeardescription,
        trnnumber,
        trantype
      );
      dispatch({
        type: FETCH_GETTRANSACTIONINFO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETTRANSACTIONINFO_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETSYSTEMCONTROL_REQUEST =
  "FETCH_GETSYSTEMCONTROL_REQUEST";
export const FETCH_GETSYSTEMCONTROL_SUCCESS =
  "FETCH_GETSYSTEMCONTROL_SUCCESS";
export const FETCH_GETSYSTEMCONTROL_FAILURE =
  "FETCH_GETSYSTEMCONTROL_FAILURE";

export const fetchGetSysControl =
  (code, type) => async (dispatch) => {
    dispatch({ type: FETCH_GETSYSTEMCONTROL_REQUEST });
    try {
      const data = await fetchDataGetSysControl(
        code,
        type
      );
      dispatch({
        type: FETCH_GETSYSTEMCONTROL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETSYSTEMCONTROL_FAILURE,
        payload: error.message,
      });
    }
  };
export const FETCH_NEWITEMPURCHASEMAINTENANCE_REQUEST =
  "FETCH_NEWITEMPURCHASEMAINTENANCE_REQUEST";
export const FETCH_NEWITEMPURCHASEMAINTENANCE_SUCCESS =
  "FETCH_NEWITEMPURCHASEMAINTENANCE_SUCCESS";
export const FETCH_NEWITEMPURCHASEMAINTENANCE_FAILURE =
  "FETCH_NEWITEMPURCHASEMAINTENANCE_FAILURE";

export const fetchNewItemPurchaseMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_NEWITEMPURCHASEMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewItemPurchaseMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_NEWITEMPURCHASEMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWITEMPURCHASEMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETITEMPURCHASEMAINTENANCE_REQUEST =
  "FETCH_GETITEMPURCHASEMAINTENANCE_REQUEST";
export const FETCH_GETITEMPURCHASEMAINTENANCE_SUCCESS =
  "FETCH_GETITEMPURCHASEMAINTENANCE_SUCCESS";
export const FETCH_GETITEMPURCHASEMAINTENANCE_FAILURE =
  "FETCH_GETITEMPURCHASEMAINTENANCE_FAILURE";

export const fetchGetItemPurchaseMaintenance =
  (code, location, yeardesc, trnnum) => async (dispatch) => {
    dispatch({ type: FETCH_GETITEMPURCHASEMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetItemPurchaseMaintenance(
        code,
        location,
        yeardesc,
        trnnum
      );
      dispatch({
        type: FETCH_GETITEMPURCHASEMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETITEMPURCHASEMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETITEMPURCHASELISTMAINTENANCE_REQUEST =
  "FETCH_GETITEMPURCHASELISTMAINTENANCE_REQUEST";
export const FETCH_GETITEMPURCHASELISTMAINTENANCE_SUCCESS =
  "FETCH_GETITEMPURCHASELISTMAINTENANCE_SUCCESS";
export const FETCH_GETITEMPURCHASELISTMAINTENANCE_FAILURE =
  "FETCH_GETITEMPURCHASELISTMAINTENANCE_FAILURE";

export const fetchGetItemPurchaseListMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETITEMPURCHASELISTMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetItemPurchaseListMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_GETITEMPURCHASELISTMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETITEMPURCHASELISTMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

//////////////////////// ITEM PURCHASE RETURN //////////////////////////////////

export const FETCH_NEWITEMPURCHASERETURNMAINTENANCE_REQUEST =
  "FETCH_NEWITEMPURCHASERETURNMAINTENANCE_REQUEST";
export const FETCH_NEWITEMPURCHASERETURNMAINTENANCE_SUCCESS =
  "FETCH_NEWITEMPURCHASERETURNMAINTENANCE_SUCCESS";
export const FETCH_NEWITEMPURCHASERETURNMAINTENANCE_FAILURE =
  "FETCH_NEWITEMPURCHASERETURNMAINTENANCE_FAILURE";

export const fetchNewItemPurchaseReturnMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_NEWITEMPURCHASERETURNMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewItemPurchaseReturnMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_NEWITEMPURCHASERETURNMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWITEMPURCHASERETURNMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETITEMPURCHASERETURNMAINTENANCE_REQUEST =
  "FETCH_GETITEMPURCHASERETURNMAINTENANCE_REQUEST";
export const FETCH_GETITEMPURCHASERETURNMAINTENANCE_SUCCESS =
  "FETCH_GETITEMPURCHASERETURNMAINTENANCE_SUCCESS";
export const FETCH_GETITEMPURCHASERETURNMAINTENANCE_FAILURE =
  "FETCH_GETITEMPURCHASERETURNMAINTENANCE_FAILURE";

export const fetchGetItemPurchaseReturnMaintenance =
  (code, location, yeardesc, trnnum) => async (dispatch) => {
    dispatch({ type: FETCH_GETITEMPURCHASERETURNMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetItemPurchaseReturnMaintenance(
        code,
        location,
        yeardesc,
        trnnum
      );
      dispatch({
        type: FETCH_GETITEMPURCHASERETURNMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETITEMPURCHASERETURNMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETITEMPURCHASERETURNLISTMAINTENANCE_REQUEST =
  "FETCH_GETITEMPURCHASERETURNLISTMAINTENANCE_REQUEST";
export const FETCH_GETITEMPURCHASERETURNLISTMAINTENANCE_SUCCESS =
  "FETCH_GETITEMPURCHASERETURNLISTMAINTENANCE_SUCCESS";
export const FETCH_GETITEMPURCHASERETURNLISTMAINTENANCE_FAILURE =
  "FETCH_GETITEMPURCHASERETURNLISTMAINTENANCE_FAILURE";

export const fetchGetItemPurchaseReturnListMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETITEMPURCHASERETURNLISTMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetItemPurchaseReturnListMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_GETITEMPURCHASERETURNLISTMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETITEMPURCHASERETURNLISTMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

//////////////////////// ITEM SALE //////////////////////////////////

export const FETCH_NEWITEMSALEMAINTENANCE_REQUEST =
  "FETCH_NEWITEMSALEMAINTENANCE_REQUEST";
export const FETCH_NEWITEMSALEMAINTENANCE_SUCCESS =
  "FETCH_NEWITEMSALEMAINTENANCE_SUCCESS";
export const FETCH_NEWITEMSALEMAINTENANCE_FAILURE =
  "FETCH_NEWITEMSALEMAINTENANCE_FAILURE";

export const fetchNewItemSaleMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_NEWITEMSALEMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewItemSaleMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_NEWITEMSALEMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWITEMSALEMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETITEMSALEMAINTENANCE_REQUEST =
  "FETCH_GETITEMSALEMAINTENANCE_REQUEST";
export const FETCH_GETITEMSALEMAINTENANCE_SUCCESS =
  "FETCH_GETITEMSALEMAINTENANCE_SUCCESS";
export const FETCH_GETITEMSALEMAINTENANCE_FAILURE =
  "FETCH_GETITEMSALEMAINTENANCE_FAILURE";

export const fetchGetItemSaleMaintenance =
  (code, location, yeardesc, trnnum) => async (dispatch) => {
    dispatch({ type: FETCH_GETITEMSALEMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetItemSaleMaintenance(
        code,
        location,
        yeardesc,
        trnnum
      );
      dispatch({
        type: FETCH_GETITEMSALEMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETITEMSALEMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETITEMSALELISTMAINTENANCE_REQUEST =
  "FETCH_GETITEMSALELISTMAINTENANCE_REQUEST";
export const FETCH_GETITEMSALELISTMAINTENANCE_SUCCESS =
  "FETCH_GETITEMSALELISTMAINTENANCE_SUCCESS";
export const FETCH_GETITEMSALELISTMAINTENANCE_FAILURE =
  "FETCH_GETITEMSALELISTMAINTENANCE_FAILURE";

export const fetchGetItemSaleListMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETITEMSALELISTMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetItemSaleListMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_GETITEMSALELISTMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETITEMSALELISTMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

//////////////////////// ITEM PURCHASE RETURN //////////////////////////////////

export const FETCH_NEWITEMSALERETURNMAINTENANCE_REQUEST =
  "FETCH_NEWITEMSALERETURNMAINTENANCE_REQUEST";
export const FETCH_NEWITEMSALERETURNMAINTENANCE_SUCCESS =
  "FETCH_NEWITEMSALERETURNMAINTENANCE_SUCCESS";
export const FETCH_NEWITEMSALERETURNMAINTENANCE_FAILURE =
  "FETCH_NEWITEMSALERETURNMAINTENANCE_FAILURE";

export const fetchNewItemSaleReturnMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_NEWITEMSALERETURNMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewItemSaleReturnMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_NEWITEMSALERETURNMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWITEMSALERETURNMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETITEMSALERETURNMAINTENANCE_REQUEST =
  "FETCH_GETITEMSALERETURNMAINTENANCE_REQUEST";
export const FETCH_GETITEMSALERETURNMAINTENANCE_SUCCESS =
  "FETCH_GETITEMSALERETURNMAINTENANCE_SUCCESS";
export const FETCH_GETITEMSALERETURNMAINTENANCE_FAILURE =
  "FETCH_GETITEMSALERETURNMAINTENANCE_FAILURE";

export const fetchGetItemSaleReturnMaintenance =
  (code, location, yeardesc, trnnum) => async (dispatch) => {
    dispatch({ type: FETCH_GETITEMSALERETURNMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetItemSaleReturnMaintenance(
        code,
        location,
        yeardesc,
        trnnum
      );
      dispatch({
        type: FETCH_GETITEMSALERETURNMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETITEMSALERETURNMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETITEMSALERETURNLISTMAINTENANCE_REQUEST =
  "FETCH_GETITEMSALERETURNLISTMAINTENANCE_REQUEST";
export const FETCH_GETITEMSALERETURNLISTMAINTENANCE_SUCCESS =
  "FETCH_GETITEMSALERETURNLISTMAINTENANCE_SUCCESS";
export const FETCH_GETITEMSALERETURNLISTMAINTENANCE_FAILURE =
  "FETCH_GETITEMSALERETURNLISTMAINTENANCE_FAILURE";

export const fetchGetItemSaleReturnListMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETITEMSALERETURNLISTMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetItemSaleReturnListMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_GETITEMSALERETURNLISTMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETITEMSALERETURNLISTMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };
//////////////////////// NEW BILL //////////////////////////////////

export const FETCH_NEWBILLREQUEST = "FETCH_NEWBILLREQUEST";
export const FETCH_NEWBILLSUCCESS = "FETCH_NEWBILLSUCCESS";
export const FETCH_NEWBILLFAILURE = "FETCH_NEWBILLFAILURE";

export const fetchNewBill = (code, location, yeardesc) => async (dispatch) => {
  dispatch({ type: FETCH_NEWBILLREQUEST });
  try {
    const data = await fetchDataNewBill(code, location, yeardesc);
    dispatch({
      type: FETCH_NEWBILLSUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_NEWBILLFAILURE,
      payload: error.message,
    });
  }
};
//////////////////////// CASH RECEIVE //////////////////////////////////

export const FETCH_NEWCASHRECEIVE_MAINTENANCE_REQUEST =
  "FETCH_NEWCASHRECEIVE_MAINTENANCE_REQUEST";
export const FETCH_NEWCASHRECEIVE_MAINTENANCE_SUCCESS =
  "FETCH_NEWCASHRECEIVE_MAINTENANCE_SUCCESS";
export const FETCH_NEWCASHRECEIVE_MAINTENANCE_FAILURE =
  "FETCH_NEWCASHRECEIVE_MAINTENANCE_FAILURE";

export const fetchNewCashReceiveMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_NEWCASHRECEIVE_MAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewCashReceiveMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_NEWCASHRECEIVE_MAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWCASHRECEIVE_MAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETCASHRECEIVE_MAINTENANCE_REQUEST =
  "FETCH_GETCASHRECEIVE_MAINTENANCE_REQUEST";
export const FETCH_GETCASHRECEIVE_MAINTENANCE_SUCCESS =
  "FETCH_GETCASHRECEIVE_MAINTENANCE_SUCCESS";
export const FETCH_GETCASHRECEIVE_MAINTENANCE_FAILURE =
  "FETCH_GETCASHRECEIVE_MAINTENANCE_FAILURE";

export const fetchGetCashReceiveMaintenance =
  (code, location, yeardesc, trnnum) => async (dispatch) => {
    dispatch({ type: FETCH_GETCASHRECEIVE_MAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetCashReceiveMaintenance(
        code,
        location,
        yeardesc,
        trnnum
      );
      dispatch({
        type: FETCH_GETCASHRECEIVE_MAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETCASHRECEIVE_MAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETCASHRECEIVE_LISTMAINTENANCE_REQUEST =
  "FETCH_GETCASHRECEIVE_LISTMAINTENANCE_REQUEST";
export const FETCH_GETCASHRECEIVE_LISTMAINTENANCE_SUCCESS =
  "FETCH_GETCASHRECEIVE_LISTMAINTENANCE_SUCCESS";
export const FETCH_GETCASHRECEIVE_LISTMAINTENANCE_FAILURE =
  "FETCH_GETCASHRECEIVE_LISTMAINTENANCE_FAILURE";

export const fetchGetCashReceiveListMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETCASHRECEIVE_LISTMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetCashReceiveListMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_GETCASHRECEIVE_LISTMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETCASHRECEIVE_LISTMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

//////////////////////// CASH PAYMENT //////////////////////////////////

export const FETCH_NEWCASHPAYMENT_MAINTENANCE_REQUEST =
  "FETCH_NEWCASHPAYMENT_MAINTENANCE_REQUEST";
export const FETCH_NEWCASHPAYMENT_MAINTENANCE_SUCCESS =
  "FETCH_NEWCASHPAYMENT_MAINTENANCE_SUCCESS";
export const FETCH_NEWCASHPAYMENT_MAINTENANCE_FAILURE =
  "FETCH_NEWCASHPAYMENT_MAINTENANCE_FAILURE";

export const fetchNewCashPaymentMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_NEWCASHPAYMENT_MAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewCashPaymentMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_NEWCASHPAYMENT_MAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWCASHPAYMENT_MAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETCASHPAYMENT_MAINTENANCE_REQUEST =
  "FETCH_GETCASHPAYMENT_MAINTENANCE_REQUEST";
export const FETCH_GETCASHPAYMENT_MAINTENANCE_SUCCESS =
  "FETCH_GETCASHPAYMENT_MAINTENANCE_SUCCESS";
export const FETCH_GETCASHPAYMENT_MAINTENANCE_FAILURE =
  "FETCH_GETCASHPAYMENT_MAINTENANCE_FAILURE";

export const fetchGetCashPaymentMaintenance =
  (code, location, yeardesc, trnnum) => async (dispatch) => {
    dispatch({ type: FETCH_GETCASHPAYMENT_MAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetCashPaymentMaintenance(
        code,
        location,
        yeardesc,
        trnnum
      );
      dispatch({
        type: FETCH_GETCASHPAYMENT_MAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETCASHPAYMENT_MAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETCASHPAYMENT_LISTMAINTENANCE_REQUEST =
  "FETCH_GETCASHPAYMENT_LISTMAINTENANCE_REQUEST";
export const FETCH_GETCASHPAYMENT_LISTMAINTENANCE_SUCCESS =
  "FETCH_GETCASHPAYMENT_LISTMAINTENANCE_SUCCESS";
export const FETCH_GETCASHPAYMENT_LISTMAINTENANCE_FAILURE =
  "FETCH_GETCASHPAYMENT_LISTMAINTENANCE_FAILURE";

export const fetchGetCashPaymentListMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETCASHPAYMENT_LISTMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetCashPaymentListMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_GETCASHPAYMENT_LISTMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETCASHPAYMENT_LISTMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

//////////////////////// BANK RECEIVE //////////////////////////////////

export const FETCH_NEWBANKRECEIVE_MAINTENANCE_REQUEST =
  "FETCH_NEWBANKRECEIVE_MAINTENANCE_REQUEST";
export const FETCH_NEWBANKRECEIVE_MAINTENANCE_SUCCESS =
  "FETCH_NEWBANKRECEIVE_MAINTENANCE_SUCCESS";
export const FETCH_NEWBANKRECEIVE_MAINTENANCE_FAILURE =
  "FETCH_NEWBANKRECEIVE_MAINTENANCE_FAILURE";

export const fetchNewBankReceiveMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_NEWBANKRECEIVE_MAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewBankReceiveMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_NEWBANKRECEIVE_MAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWBANKRECEIVE_MAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETBANKRECEIVE_MAINTENANCE_REQUEST =
  "FETCH_GETBANKRECEIVE_MAINTENANCE_REQUEST";
export const FETCH_GETBANKRECEIVE_MAINTENANCE_SUCCESS =
  "FETCH_GETBANKRECEIVE_MAINTENANCE_SUCCESS";
export const FETCH_GETBANKRECEIVE_MAINTENANCE_FAILURE =
  "FETCH_GETBANKRECEIVE_MAINTENANCE_FAILURE";

export const fetchGetBankReceiveMaintenance =
  (code, location, yeardesc, trnnum) => async (dispatch) => {
    dispatch({ type: FETCH_GETBANKRECEIVE_MAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetBankReceiveMaintenance(
        code,
        location,
        yeardesc,
        trnnum
      );
      dispatch({
        type: FETCH_GETBANKRECEIVE_MAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETBANKRECEIVE_MAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETBANKRECEIVE_LISTMAINTENANCE_REQUEST =
  "FETCH_GETBANKRECEIVE_LISTMAINTENANCE_REQUEST";
export const FETCH_GETBANKRECEIVE_LISTMAINTENANCE_SUCCESS =
  "FETCH_GETBANKRECEIVE_LISTMAINTENANCE_SUCCESS";
export const FETCH_GETBANKRECEIVE_LISTMAINTENANCE_FAILURE =
  "FETCH_GETBANKRECEIVE_LISTMAINTENANCE_FAILURE";

export const fetchGetBankReceiveListMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETBANKRECEIVE_LISTMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetBankReceiveListMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_GETBANKRECEIVE_LISTMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETBANKRECEIVE_LISTMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

//////////////////////// BANK PAYMENT //////////////////////////////////

export const FETCH_NEWBANKPAYMENT_MAINTENANCE_REQUEST =
  "FETCH_NEWBANKPAYMENT_MAINTENANCE_REQUEST";
export const FETCH_NEWBANKPAYMENT_MAINTENANCE_SUCCESS =
  "FETCH_NEWBANKPAYMENT_MAINTENANCE_SUCCESS";
export const FETCH_NEWBANKPAYMENT_MAINTENANCE_FAILURE =
  "FETCH_NEWBANKPAYMENT_MAINTENANCE_FAILURE";

export const fetchNewBankPaymentMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_NEWBANKPAYMENT_MAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewBankPaymentMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_NEWBANKPAYMENT_MAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWBANKPAYMENT_MAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETBANKPAYMENT_MAINTENANCE_REQUEST =
  "FETCH_GETBANKPAYMENT_MAINTENANCE_REQUEST";
export const FETCH_GETBANKPAYMENT_MAINTENANCE_SUCCESS =
  "FETCH_GETBANKPAYMENT_MAINTENANCE_SUCCESS";
export const FETCH_GETBANKPAYMENT_MAINTENANCE_FAILURE =
  "FETCH_GETBANKPAYMENT_MAINTENANCE_FAILURE";

export const fetchGetBankPaymentMaintenance =
  (code, location, yeardesc, trnnum) => async (dispatch) => {
    dispatch({ type: FETCH_GETBANKPAYMENT_MAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetBankPaymentMaintenance(
        code,
        location,
        yeardesc,
        trnnum
      );
      dispatch({
        type: FETCH_GETBANKPAYMENT_MAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETBANKPAYMENT_MAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETBANKPAYMENT_LISTMAINTENANCE_REQUEST =
  "FETCH_GETBANKPAYMENT_LISTMAINTENANCE_REQUEST";
export const FETCH_GETBANKPAYMENT_LISTMAINTENANCE_SUCCESS =
  "FETCH_GETBANKPAYMENT_LISTMAINTENANCE_SUCCESS";
export const FETCH_GETBANKPAYMENT_LISTMAINTENANCE_FAILURE =
  "FETCH_GETBANKPAYMENT_LISTMAINTENANCE_FAILURE";

export const fetchGetBankPaymentListMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETBANKPAYMENT_LISTMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetBankPaymentListMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_GETBANKPAYMENT_LISTMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETBANKPAYMENT_LISTMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

//////////////////////// JOURNAL VOUCHER //////////////////////////////////

export const FETCH_NEWJOURNAL_MAINTENANCE_REQUEST =
  "FETCH_NEWJOURNAL_MAINTENANCE_REQUEST";
export const FETCH_NEWJOURNAL_MAINTENANCE_SUCCESS =
  "FETCH_NEWJOURNAL_MAINTENANCE_SUCCESS";
export const FETCH_NEWJOURNAL_MAINTENANCE_FAILURE =
  "FETCH_NEWJOURNAL_MAINTENANCE_FAILURE";

export const fetchNewJournalMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_NEWJOURNAL_MAINTENANCE_REQUEST });
    try {
      const data = await fetchDataNewJournalMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_NEWJOURNAL_MAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_NEWJOURNAL_MAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETJOURNAL_MAINTENANCE_REQUEST =
  "FETCH_GETJOURNAL_MAINTENANCE_REQUEST";
export const FETCH_GETJOURNAL_MAINTENANCE_SUCCESS =
  "FETCH_GETJOURNAL_MAINTENANCE_SUCCESS";
export const FETCH_GETJOURNAL_MAINTENANCE_FAILURE =
  "FETCH_GETJOURNAL_MAINTENANCE_FAILURE";

export const fetchGetJournalMaintenance =
  (code, location, yeardesc, trnnum) => async (dispatch) => {
    dispatch({ type: FETCH_GETJOURNAL_MAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetJournalMaintenance(
        code,
        location,
        yeardesc,
        trnnum
      );
      dispatch({
        type: FETCH_GETJOURNAL_MAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETJOURNAL_MAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };

export const FETCH_GETJOURNAL_LISTMAINTENANCE_REQUEST =
  "FETCH_GETJOURNAL_LISTMAINTENANCE_REQUEST";
export const FETCH_GETJOURNAL_LISTMAINTENANCE_SUCCESS =
  "FETCH_GETJOURNAL_LISTMAINTENANCE_SUCCESS";
export const FETCH_GETJOURNAL_LISTMAINTENANCE_FAILURE =
  "FETCH_GETJOURNAL_LISTMAINTENANCE_FAILURE";

export const fetchGetJournalListMaintenance =
  (code, location, yeardesc) => async (dispatch) => {
    dispatch({ type: FETCH_GETJOURNAL_LISTMAINTENANCE_REQUEST });
    try {
      const data = await fetchDataGetJournalListMaintenance(
        code,
        location,
        yeardesc
      );
      dispatch({
        type: FETCH_GETJOURNAL_LISTMAINTENANCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // console.error("Error fetching data:", error.message);
      dispatch({
        type: FETCH_GETJOURNAL_LISTMAINTENANCE_FAILURE,
        payload: error.message,
      });
    }
  };
//////////////////////// Cash Code  //////////////////////////////////
export const FETCH_GETCASHCODE_LISTMAINTENANCE_REQUEST =
  "FETCH_GETCASHCODE_LISTMAINTENANCE_REQUEST";
export const FETCH_GETCASHCODE_LISTMAINTENANCE_SUCCESS =
  "FETCH_GETCASHCODE_LISTMAINTENANCE_SUCCESS";
export const FETCH_GETCASHCODE_LISTMAINTENANCE_FAILURE =
  "FETCH_GETCASHCODE_LISTMAINTENANCE_FAILURE";

export const fetchGetCashCodeListMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETCASHCODE_LISTMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetCashCodeListMaintenance(code);
    dispatch({
      type: FETCH_GETCASHCODE_LISTMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETCASHCODE_LISTMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};
//////////////////////// BANK Code  //////////////////////////////////
export const FETCH_GETBANKCODE_LISTMAINTENANCE_REQUEST =
  "FETCH_GETBANKCODE_LISTMAINTENANCE_REQUEST";
export const FETCH_GETBANKCODE_LISTMAINTENANCE_SUCCESS =
  "FETCH_GETBANKCODE_LISTMAINTENANCE_SUCCESS";
export const FETCH_GETBANKCODE_LISTMAINTENANCE_FAILURE =
  "FETCH_GETBANKCODE_LISTMAINTENANCE_FAILURE";

export const fetchGetBankCodeListMaintenance = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETBANKCODE_LISTMAINTENANCE_REQUEST });
  try {
    const data = await fetchDataGetBankCodeListMaintenance(code);
    dispatch({
      type: FETCH_GETBANKCODE_LISTMAINTENANCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETBANKCODE_LISTMAINTENANCE_FAILURE,
      payload: error.message,
    });
  }
};

//////////////////////// RECEIVABLE CODE LIST  //////////////////////////////////
export const FETCH_GETRECEIVABLECODELIST_REQUEST =
  "FETCH_GETRECEIVABLECODELIST_REQUEST";
export const FETCH_GETRECEIVABLECODELIST_SUCCESS =
  "FETCH_GETRECEIVABLECODELIST_SUCCESS";
export const FETCH_GETRECEIVABLECODELIST_FAILURE =
  "FETCH_GETRECEIVABLECODELIST_FAILURE";

export const fetchGetReceivableCodeList = (code) => async (dispatch) => {
  dispatch({ type: FETCH_GETRECEIVABLECODELIST_REQUEST });
  try {
    const data = await fetchDataGetReceivableCodeList(code);
    dispatch({
      type: FETCH_GETRECEIVABLECODELIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.error("Error fetching data:", error.message);
    dispatch({
      type: FETCH_GETRECEIVABLECODELIST_FAILURE,
      payload: error.message,
    });
  }
};
