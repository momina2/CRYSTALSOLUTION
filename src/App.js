import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "./firebase.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage1 from "./Component/MainComponent/HomePage/Homepage";
import { ThemeProvider } from "./ThemeContext";
import Loginn from "./Component/MainComponent/Loginn/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Component/MainComponent/Layout/Layout.js";
import MenuAdmin from "./Component/MainComponent/Header/Admin/MenuAdmin/MenuAdmin.jsx";
import MessageScreen from "./Component/MainComponent/Header/Message/MessageScreen.jsx";
import AdminCustomers from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminCustomers.jsx";
import AdminUserManagement from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminUserManagement/AdminUserManagement.jsx";
import AdminAddUser from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminUserManagement/AdminAddUser/AdminAddUser.jsx";
import AdminMenuUser from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminUserManagement/AdminMenuUser/AdminMenuUser.jsx";
import AdminCustomerMenu from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminCustomerMenu/AdminCustomerMenu/AdminCustomerMenu.jsx";
import Customer from "./Component/MainComponent/Header/Admin/AdminCustomer/SaveCustomer.jsx";
import AdminCusotmerYears from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminCustomerYears/AdminCusotmerYears.jsx";
import AdminCustomerBranches from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminCustomerBranches/AdminCustomerBranches.jsx";
import AdminBranchesUser from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminUserManagement/AdminBranchesUser/AdminBranchesUser.jsx";
import AdminYearUser from "./Component/MainComponent/Header/Admin/AdminCustomer/AdminUserManagement/AdminYearUser/AdminYearUser.jsx";

import CompanyList from "./Component/Reports/List/CompanyList.js";
import CategoryList from "./Component/Reports/List/CategoryList.js";
import ChartofAccount from "./Component/Reports/List/ChartofAccount.js";
import StoreList from "./Component/Reports/List/StoreList.jsx";
import GeneralLedger from "./Component/Reports/ledgers/GeneralLedger.js";
import SupplierLedger from "./Component/Reports/ledgers/SupplierLedger.js";
import CustomerLedger from "./Component/Reports/ledgers/CustomerLedger.js";
import BankRegisterLedger from "./Component/Reports/ledgers/BankRegisterLedger.js";
import ReceivableReport from "./Component/Reports/Misc Report/ReceivableReport.jsx";
import DailyCollectionReport from "./Component/Reports/DailyReport/DailyCollectionReport.jsx";
import DailyCashBankBalance from "./Component/Reports/DailyReport/CashandBankBalance.jsx";

import CapacityList from "./Component/Reports/List/CapacityList.js";
import TypeList from "./Component/Reports/List/TypeList.js";
import EmployeeList from "./Component/Reports/List/EmployeeList.js";
import UserList from "./Component/Reports/List/UserList.js";
import DailySaleReport from "./Component/Reports/DailyReport/DailySaleReport.jsx";
import DailyPurchaseReport from "./Component/Reports/DailyReport/DailyPurchaseReport.jsx";
import ItemList from "./Component/Reports/List/ItemList.js";
import ItemPriceList from "./Component/Reports/List/PriceList.js";
import ItemPriceListA from "./Component/Reports/List/PriceListA.js";

import DailyPaymentReport from "./Component/Reports/DailyReport/DailyPaymentReport.jsx";
import DailyStatusReport from "./Component/Reports/DailyReport/DailyStatusReport.jsx";
import ReceivableAging from "./Component/Reports/Misc Report/ReceivableAggingReport.jsx";
import PayableAging from "./Component/Reports/Misc Report/PayableAggingReport.jsx";
import DailyInstallationReport from "./Component/Reports/InstallationReport/DailyInstallationReport.jsx";
import InstallarPaymentReport from "./Component/Reports/InstallationReport/InstallarPaymentReport.jsx";
import PayableReport from "./Component/Reports/Misc Report/PayableReport.jsx";
import InstallarBalanceReport from "./Component/Reports/InstallationReport/InstallarBalanceReport.jsx";
import InstallarPayableReporttt from "./Component/Reports/InstallationReport/InstallarPayableReport.jsx";
import MobileLedger from "./Component/Reports/ledgers/MobileLedger.js";
import SalesDashboard from "./Component/Dashboard/Dashboar1.jsx";
import CustomerProgressLedger from "./Component/Reports/ledgers/CustomerProgressLedger.js";
import SupplierProgressLedger from "./Component/Reports/ledgers/SupplierProgressLedger.js";
import CashBook from "./Component/Reports/DailyReport/CashBook.jsx";
import CustomerSaleComparison from "./Component/Reports/ItemReport/CustomerSaleComparison.jsx";
import CustomerActivity from "./Component/Reports/ItemReport/CustomerActivity.jsx";
import SupplierPurchaseComparison from "./Component/Reports/ItemReport/SupplierPurchaseComparison.jsx";
import SupplierPurchaseReport from "./Component/Reports/ItemReport/SupplierPurchaseReport.jsx";
import CustomerSaleReport from "./Component/Reports/ItemReport/CustomerSaleReport.jsx";
import SupplierActivity from "./Component/Reports/ItemReport/SupplierActivity.jsx";
import ItemSaleSummary from "./Component/Reports/ItemReport/ItemSaleSummary.jsx";
import ItemPurchaseSummary from "./Component/Reports/ItemReport/ItemPurchaseSummary.jsx";
import ItemPurchaseReport from "./Component/Reports/ItemReport/ItemPurchaseReport.jsx";
import ItemSaleReport from "./Component/Reports/ItemReport/ItemSaleReport.jsx";
import CompanySaleComparison from "./Component/Reports/ItemReport/CompanySaleComparison.jsx";
import ItemSaleComparison from "./Component/Reports/ItemReport/ItemSaleComparison.jsx";
import DailyProfitReport from "./Component/Reports/DailyReport/DailyProfitReport.jsx";
import JournalReport from "./Component/Reports/DailyReport/Journal.jsx";
import CreditMemo from "./Component/Reports/DailyReport/CreditMemo.jsx";
import DocumentEditReport from "./Component/Reports/DailyReport/DocumentEditReport.jsx";
import ItemMonthlySaleComparison from "./Component/Reports/ItemReport/ItemMonthlySaleComparison.jsx";
import CompanyPurchaseComparison from "./Component/Reports/ItemReport/CompanyPurchaseComparison.jsx";
import ItemPurchaseComparison from "./Component/Reports/ItemReport/ItemPurchaseComparison.jsx";
import ItemMonthlyPurchaseComparison from "./Component/Reports/ItemReport/ItemMonthlyPurchaseComparison.jsx";
import CompanyMonthlySaleComparison from "./Component/Reports/ItemReport/CompanyMonthlySaleComparison.jsx";
import CompanyMonthlyPurchaseComparison from "./Component/Reports/ItemReport/CompanyMonthlyPurchaseComparison.jsx";
import CashFlowReport from "./Component/Reports/DailyReport/CashFlow.jsx";
import EmployeeAdvanceReport from "./Component/Reports/EmployeeReports/EmployeeAdvanceReport.jsx";
import EmployeeMarginReport from "./Component/Reports/EmployeeReports/EmployeeMarginReport.jsx";
import EmployeeSaleComparison from "./Component/Reports/EmployeeReports/EmployeeSaleComparison.jsx";
import EmployeeSaleReport from "./Component/Reports/EmployeeReports/EmployeeSaleReport.jsx";
import EmployeeSaleSummary from "./Component/Reports/EmployeeReports/EmployeeSaleSummary.jsx";
import EmployeeMarginSummary from "./Component/Reports/EmployeeReports/EmployeeMarginSummary.jsx";
import EmployeeMarginComparison from "./Component/Reports/EmployeeReports/EmployeeMarginComparison.jsx";
import EmployeeCommissionReport from "./Component/Reports/EmployeeReports/EmployeeCommissionReport.jsx";
import EmployeeCommissionSummary from "./Component/Reports/EmployeeReports/EmployeeCommissionSummary.jsx";
import EmployeeCommissionComparison from "./Component/Reports/EmployeeReports/EmployeeCommissionComparison.jsx";
import InstallmentBalanceReport from "./Component/Reports/InstallmentReport/InstallmentBalanceReport.jsx";
import InstallmentCollectReport from "./Component/Reports/InstallmentReport/InstallmentCollectorReport.jsx";
import InstallmentLedgerReport from "./Component/Reports/InstallmentReport/InstallmentLedgerReport.jsx";
import InstallmentSaleReport from "./Component/Reports/InstallmentReport/InstallmentSaleReport.jsx";
import ItemLedgerReport from "./Component/Reports/ledgers/ItemLedger.js";
import DashboardComplain from "./Component/DashboardComp/DashboardComp.jsx";
import MobileListReport from "./Component/Reports/List/MobileList.js";
import TechnicianList from "./Component/Reports/List/TechnicianList.js";
import ItemStockReport from "./Component/Reports/ItemReport/ItemStockReport.jsx";
import StoreStockReport from "./Component/Reports/ItemReport/ItemStoreStockReport.jsx";
import ItemStatusReport from "./Component/Reports/ItemReport/ItemStatusReport.jsx";
import ItemAggingReport from "./Component/Reports/ledgers/ItemAgging.js";
import ItemEvaluationReport from "./Component/Reports/ledgers/ItemEvaluation.js";
import InvoiceLedgerReport from "./Component/Reports/ledgers/InvoiceLedger.js";
import DailyJobReport from "./Component/Reports/DailyReport/DailyJobReport.jsx";
import DailyCollectionSummary from "./Component/Reports/DailyReport/DailyCollectionSummary.jsx";
import MobileLedgerJob from "./Component/Reports/ledgers/MobileLedgerJob.js";
import AreaList from "./Component/Reports/List/AreaList.js";
import CityList from "./Component/Reports/List/CityList.js";
import ComplaintList from "./Component/Reports/List/ComplaintList.js";
import ControlList from "./Component/Reports/List/ControlList.js";
import ReferenceList from "./Component/Reports/List/ReferenceList.js";
import WorkShopItemList from "./Component/Reports/List/WorkShopItem.js";
import SparePartProfitSummary from "./Component/Reports/JobReport/SparePartProfitSummary.jsx";
import SparePartProfitReport from "./Component/Reports/JobReport/SparePartProfitReport.jsx";
import TechnicianPerformanceReport from "./Component/Reports/JobReport/TechnicianPerformance.jsx";
import TechnicianAggingReport from "./Component/Reports/JobReport/TechnicianAgging.jsx";
import CompanyReceivableReport from "./Component/Reports/JobReport/CompanyReceivable.jsx";
import CompanyPerformanceReport from "./Component/Reports/JobReport/CompanyPerformance.jsx";
import ReferenceReceivableReport from "./Component/Reports/JobReport/ReferenceReceivable.jsx";
import ReferencePerformanceReport from "./Component/Reports/JobReport/ReferencePerformance.jsx";
import ReferenceJobStatusReport from "./Component/Reports/JobReport/ReferenceJobStatus.jsx";
import ReferenceMonthlyJobStatusReport from "./Component/Reports/JobReport/ReferenceMonthlyJobStatus.jsx";
import TechnicianJobStatusReport from "./Component/Reports/JobReport/TechnicianJobStatus.jsx";
import TechnicianMonthlyJobStatusReport from "./Component/Reports/JobReport/TechnicianMonthlyJobStatus.jsx";
import InstallmentCollectionMonthlyComparison from "./Component/Reports/InstallmentReport/InstallmentCollectionMonthlyComparison.jsx";
import InstallmentCollectionDailyComparison from "./Component/Reports/InstallmentReport/InstallmentCollectionDailyComparison.jsx";
import CompanyJobComparison from "./Component/Reports/JobReport/CompanyJobComparison.jsx";
import CategoryJobComparison from "./Component/Reports/JobReport/CategoryJobComparison.jsx";
import CompanyMonthlyJobComparison from "./Component/Reports/JobReport/CompanyMonthlyJobComparison.jsx";
import CompanyJobSummary from "./Component/Reports/JobReport/CompanyJobSummary.jsx";
import CategoryJobSummary from "./Component/Reports/JobReport/CategoryJobSummary.jsx";
import CategoryMonthlyJobComparison from "./Component/Reports/JobReport/CategoryMonthlyJobComparison.jsx";
import SalesmanList from "./Component/Reports/List/SalesmanList.js";
import CustomerListAmerican from "./Component/Reports/List/CustomerList.js";
import RegionList from "./Component/Reports/List/RegionList.js";
import ManagerList from "./Component/Reports/List/ManagerList.js";
import InstallerList from "./Component/Reports/List/InstallarList.js";
import DashboardAdminDealer from "./Component/DashboardAdminDealer/DashboardAdminDealer.jsx";
import TaxSaleRegisterReport from "./Component/Reports/Misc Report/TaxSalesRegister.jsx";
import MessageScreenforAdmin from "./Component/MainComponent/Header/Admin/Message/MessageScreen.jsx";
import DashboardPOS from "./Component/DashboardPOS/DashboardPOS.jsx";
import CategoryListPOS from "./Component/Reports/List/CategoryListPOS.js";
import ProductMaintenance from "./Component/MainComponent/Header/Admin/ProductMaintenance/ProductMaintenance.jsx";
import DailySaleReportPOS from "./Component/Reports/DailyReport/DailySaleReportPOS.jsx";
import SupplierLedgerpos from "./Component/Reports/ledgers/SupplierLedgerPos.js";
import TrainerList from "./Component/Reports/List/TrainerList.js";
import ClassList from "./Component/Reports/List/ClassList.js";
import FacilityList from "./Component/Reports/List/FacilityList.js";
import MembersList from "./Component/Reports/List/MemberList.js";
import SlotList from "./Component/Reports/List/SlotList.js";
import MemberReceiveableReport from "./Component/Reports/Misc Report/MemberReceiveableReport.jsx";
import ExpenseReportGYM from "./Component/Reports/DailyReport/ExpenseReportGYM.jsx";
import MemberCollectionSummary from "./Component/Reports/DailyReport/MemberCollectionSummary.jsx";
import MemberCollectionReport from "./Component/Reports/DailyReport/MemberCollectionReport.jsx";
import AugestLoginPage from "./Component/MainComponent/AugestLoginPage/AugestLoginPage.jsx";
import GoalList from "./Component/Reports/List/GoalList.js";
import MemberTypeList from "./Component/Reports/List/MemberTypeList.js";
import CollectorList from "./Component/Reports/List/CollectorList.js";
import MemberListCable from "./Component/Reports/List/MemberListCable.js";
import notificationSound from "../src/image/notification.wav";
import ResturentDashboard from "./Component/RestaurantDashboard/ResturentDashboard.jsx";
// import MemberCollectionReport from "./Component/Reports/DailyReport/MemberCollectionReport.jsx";
function App() {
  const queryClient = new QueryClient();
  function ConditionalLoginRoute() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const isAugustSpecialPeriod =
      currentMonth === 7 && currentDay >= 7 && currentDay <= 15;

    return isAugustSpecialPeriod ? <AugestLoginPage /> : <Loginn />;
  }
  const [notification, setNotification] = useState(null);
  const audioRef = useRef(new Audio(notificationSound));
  const playNotificationSound = () => {
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .catch((error) => console.error("Audio play failed:", error));
  };

  useEffect(() => {
    const messaging = getMessaging(app);

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      setNotification(payload.notification);
      playNotificationSound();

      // Auto-hide after 5s
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });
  }, []);

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "linear-gradient(135deg, #ffcb06, #ff9f00)",
            color: "#000",
            padding: "15px 20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 9999,
            minWidth: "250px",
            animation: "fadeIn 0.5s ease",
          }}
        >
          <h4 style={{ margin: 0, fontWeight: "bold" }}>
            {notification.title}
          </h4>
          <p style={{ margin: "5px 0 0" }}>{notification.body}</p>
        </div>
      )}
      <Router basename="/crystalsol">
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route exact path="/" element={<ConditionalLoginRoute />} />
              <Route exact path="/login" element={<ConditionalLoginRoute />} />

              <Route element={<Layout />}>
                <Route exact path="/MainPage" element={<HomePage1 />}></Route>

                <Route
                  exact
                  path="/ResturentDashboard"
                  element={<ResturentDashboard />}
                ></Route>

                <Route
                  exact
                  path="/MessageScreen"
                  element={<MessageScreen />}
                ></Route>

                <Route
                  exact
                  path="/MessageScreenforAdmin"
                  element={<MessageScreenforAdmin />}
                ></Route>

                <Route
                  exact
                  path="/ProductMaintenance"
                  element={<ProductMaintenance />}
                ></Route>

                <Route
                  exact
                  path="/AdminUserManagement/:code"
                  element={<AdminUserManagement />}
                ></Route>
                <Route
                  exact
                  path="/AdminMenuUser/:tusrid/:code"
                  element={<AdminMenuUser />}
                ></Route>
                <Route
                  exact
                  path="/AdminAddUser/:code"
                  element={<AdminAddUser />}
                ></Route>
                <Route
                  exact
                  path="/AdminCustomerMenu/:code"
                  element={<AdminCustomerMenu />}
                ></Route>
                <Route
                  exact
                  path="/AdminCustomers"
                  element={<AdminCustomers />}
                ></Route>
                <Route exact path="/MenuAdmin" element={<MenuAdmin />}></Route>
                <Route exact path="/Customers" element={<Customer />}></Route>

                <Route
                  exact
                  path="/AdminCusotmerYears/:code"
                  element={<AdminCusotmerYears />}
                ></Route>
                <Route
                  exact
                  path="/AdminCustomerBranches/:code"
                  element={<AdminCustomerBranches />}
                ></Route>

                <Route
                  exact
                  path="/AdminYearUser/:tusrid/:code"
                  element={<AdminYearUser />}
                ></Route>
                <Route
                  exact
                  path="/AdminBranchesUser/:tusrid/:code"
                  element={<AdminBranchesUser />}
                ></Route>
                <Route
                  exact
                  path="/salesdashboad"
                  element={<SalesDashboard />}
                ></Route>
                <Route
                  exact
                  path="/AdminDealer"
                  element={<DashboardAdminDealer />}
                ></Route>
                <Route
                  exact
                  path="/DashboardComplain"
                  element={<DashboardComplain />}
                ></Route>

                <Route
                  exact
                  path="/DashboardPOS"
                  element={<DashboardPOS />}
                ></Route>
                {/* /////////////////////////////////////////////////////////////////////////////
             /////////////////////////////////////////////////////////////////////////////
             /////////////////////////////   FILE //////////////////////////
             /////////////////////////////////////////////////////////////////////////////
             ///////////////////////////////////////////////////////////////////////////// */}

                {/* /////////////////////////////////////////////////////////////////////////////
             /////////////////////////////////////////////////////////////////////////////
             /////////////////////////////   REPORTS //////////////////////////
             /////////////////////////////////////////////////////////////////////////////
             ///////////////////////////////////////////////////////////////////////////// */}

                {/* ====================Routes for ledgers reports==================== */}
                <Route
                  exact
                  path="/GeneralLedger1"
                  element={<GeneralLedger />}
                />
                <Route
                  exact
                  path="/MobileLedgerJob"
                  element={<MobileLedgerJob />}
                />
                <Route
                  exact
                  path="/SupplierLedger"
                  element={<SupplierLedger />}
                />
                <Route
                  exact
                  path="/SupplierLedgerPos"
                  element={<SupplierLedgerpos />}
                />
                <Route
                  exact
                  path="/CustomerLedger"
                  element={<CustomerLedger />}
                />
                <Route
                  exact
                  path="/BankRegister"
                  element={<BankRegisterLedger />}
                />
                <Route exact path="/MobileLedger" element={<MobileLedger />} />
                <Route
                  exact
                  path="/CustomerProgress"
                  element={<CustomerProgressLedger />}
                />
                <Route
                  exact
                  path="/ItemLedger"
                  element={<ItemLedgerReport />}
                />
                <Route
                  exact
                  path="/SupplieProgress"
                  element={<SupplierProgressLedger />}
                />
                <Route
                  exact
                  path="/ItemAgging"
                  element={<ItemAggingReport />}
                />
                <Route
                  exact
                  path="/ItemEvaluation"
                  element={<ItemEvaluationReport />}
                />

                <Route
                  exact
                  path="/InvoiceLedger"
                  element={<InvoiceLedgerReport />}
                />
                {/* 
                ====================Routes for LIST REPORT ==================== */}

                <Route exact path="/CapacityList" element={<CapacityList />} />
                <Route exact path="/CompanyList" element={<CompanyList />} />
                <Route exact path="/CategoryList" element={<CategoryList />} />
                <Route
                  exact
                  path="/CategoryListPOS"
                  element={<CategoryListPOS />}
                />

                <Route exact path="/AreaList" element={<AreaList />} />
                <Route exact path="/CityList" element={<CityList />} />
                <Route exact path="/ControlList" element={<ControlList />} />
                <Route
                  exact
                  path="/ReferenceList"
                  element={<ReferenceList />}
                />

                <Route
                  exact
                  path="/ComplaintList"
                  element={<ComplaintList />}
                />

                <Route exact path="/TypeList" element={<TypeList />} />
                <Route exact path="/EmployeeList" element={<EmployeeList />} />
                <Route exact path="/ClassList" element={<ClassList />} />
                <Route exact path="/MemberList" element={<MembersList />} />
                <Route exact path="/SlotList" element={<SlotList />} />

                <Route exact path="/FacilityList" element={<FacilityList />} />

                <Route exact path="/TrainerList" element={<TrainerList />} />
                <Route exact path="/StoreList" element={<StoreList />} />
                <Route exact path="/UserList" element={<UserList />} />
                <Route
                  exact
                  path="/MobileList"
                  element={<MobileListReport />}
                />
                <Route
                  exact
                  path="/TechnicianList"
                  element={<TechnicianList />}
                />
                <Route exact path="/ItemList" element={<ItemList />} />
                <Route
                  exact
                  path="/InstallarList"
                  element={<InstallerList />}
                />

                <Route exact path="/RegionList" element={<RegionList />} />
                <Route exact path="/ManagerList" element={<ManagerList />} />

                <Route exact path="/SalesmanList" element={<SalesmanList />} />
                <Route
                  exact
                  path="/CustomerListAmerican"
                  element={<CustomerListAmerican />}
                />

                <Route
                  exact
                  path="/WorkShopItem"
                  element={<WorkShopItemList />}
                />

                <Route exact path="/PriceList" element={<ItemPriceList />} />
                <Route exact path="/PriceListA" element={<ItemPriceListA />} />

                <Route
                  exact
                  path="/CharofAccount"
                  element={<ChartofAccount />}
                />
                <Route exact path="/StoreList" element={<StoreList />} />
                <Route exact path="/GoalList" element={<GoalList />} />
                <Route
                  exact
                  path="/MemberTypeList"
                  element={<MemberTypeList />}
                />
                <Route
                  exact
                  path="/CollectorList"
                  element={<CollectorList />}
                />
                <Route
                  exact
                  path="/MemberListCable"
                  element={<MemberListCable />}
                />

                {/* ====================Routes for JOB REPORT ==================== */}
                <Route
                  exact
                  path="/SparePartsProfitSummary"
                  element={<SparePartProfitSummary />}
                />
                <Route
                  exact
                  path="/SparePartsProfitReport"
                  element={<SparePartProfitReport />}
                />
                <Route
                  exact
                  path="/TechnicianPerformance"
                  element={<TechnicianPerformanceReport />}
                />
                <Route
                  exact
                  path="/TechnicianAgging"
                  element={<TechnicianAggingReport />}
                />
                <Route
                  exact
                  path="/CompanyReceivable"
                  element={<CompanyReceivableReport />}
                />
                <Route
                  exact
                  path="/CompanyPerformance"
                  element={<CompanyPerformanceReport />}
                />
                <Route
                  exact
                  path="/ReferenceReceivable"
                  element={<ReferenceReceivableReport />}
                />
                <Route
                  exact
                  path="/ReferencePerformance"
                  element={<ReferencePerformanceReport />}
                />
                <Route
                  exact
                  path="/ReferenceJobStatus"
                  element={<ReferenceJobStatusReport />}
                />
                <Route
                  exact
                  path="/ReferenceMonthlyJobStatus"
                  element={<ReferenceMonthlyJobStatusReport />}
                />
                <Route
                  exact
                  path="/TechnicianJobStatus"
                  element={<TechnicianJobStatusReport />}
                />
                <Route
                  exact
                  path="/TechnicianMonthlyJobStatus"
                  element={<TechnicianMonthlyJobStatusReport />}
                />
                <Route
                  exact
                  path="/InstallmentCollectorMonthlyComparison"
                  element={<InstallmentCollectionMonthlyComparison />}
                />
                <Route
                  exact
                  path="/InstallmentCollectionDailyComparison"
                  element={<InstallmentCollectionDailyComparison />}
                />

                <Route
                  exact
                  path="/CompanyMonthlyJobComparison"
                  element={<CompanyMonthlyJobComparison />}
                />
                <Route
                  exact
                  path="/CategoryMonthlyJobComparison"
                  element={<CategoryMonthlyJobComparison />}
                />
                <Route
                  exact
                  path="/CategoryJobComparison"
                  element={<CategoryJobComparison />}
                />
                <Route
                  exact
                  path="/CompanyJobComparison"
                  element={<CompanyJobComparison />}
                />

                <Route
                  exact
                  path="/CompanyJobSummary"
                  element={<CompanyJobSummary />}
                />
                <Route
                  exact
                  path="/CategoryJobSummary"
                  element={<CategoryJobSummary />}
                />
                {/* ====================Routes for DAILY REPORT ==================== */}
                <Route
                  exact
                  path="/Cash&BankBalance"
                  element={<DailyCashBankBalance />}
                />
                <Route
                  exact
                  path="/DailyCollectionSummary"
                  element={<DailyCollectionSummary />}
                />
                <Route
                  exact
                  path="/DailyJobReport"
                  element={<DailyJobReport />}
                />
                <Route
                  exact
                  path="/DailyCollectionReport"
                  element={<DailyCollectionReport />}
                />
                <Route
                  exact
                  path="/DailyPaymentReport"
                  element={<DailyPaymentReport />}
                />
                <Route
                  exact
                  path="/DailyStatusReport"
                  element={<DailyStatusReport />}
                />
                <Route exact path="/SaleReport" element={<DailySaleReport />} />
                {/* <Route
                  exact
                  path="/MemberCollectionReport"
                  element={<MemberCollectionReport />}
                /> */}
                <Route
                  exact
                  path="/MemberCollectionReport"
                  element={<MemberCollectionReport />}
                />
                <Route
                  exact
                  path="/MemberCollectionSummary"
                  element={<MemberCollectionSummary />}
                />
                <Route
                  exact
                  path="/ExpenseReportGYM"
                  element={<ExpenseReportGYM />}
                />

                <Route
                  exact
                  path="/DailySaleReportPOS"
                  element={<DailySaleReportPOS />}
                />

                <Route
                  exact
                  path="/PurchaseReport"
                  element={<DailyPurchaseReport />}
                />
                <Route exact path="/CashBook" element={<CashBook />} />
                <Route exact path="/CashFlow" element={<CashFlowReport />} />

                {/* ====================Routes for ITEM REPORT ==================== */}
                <Route
                  exact
                  path="/ItemAggingReport"
                  element={<ItemAggingReport />}
                />
                <Route
                  exact
                  path="/ItemSaleSummary"
                  element={<ItemSaleSummary />}
                />

                <Route
                  exact
                  path="/ItemPurchaseSummary"
                  element={<ItemPurchaseSummary />}
                />
                <Route
                  exact
                  path="/ItemStockReport"
                  element={<ItemStockReport />}
                />
                <Route
                  exact
                  path="/StoreStockReport"
                  element={<StoreStockReport />}
                />
                <Route
                  exact
                  path="/ItemStatusReport"
                  element={<ItemStatusReport />}
                />
                <Route
                  exact
                  path="/CustomerSaleComparison"
                  element={<CustomerSaleComparison />}
                />
                <Route
                  exact
                  path="/CustomerActivity"
                  element={<CustomerActivity />}
                />
                <Route
                  exact
                  path="/SupplierPurchaseComparison"
                  element={<SupplierPurchaseComparison />}
                />
                <Route
                  exact
                  path="/CustomerSaleReport"
                  element={<CustomerSaleReport />}
                />
                <Route
                  exact
                  path="/SupplierActivity"
                  element={<SupplierActivity />}
                />

                <Route
                  exact
                  path="/SupplierPurchaseReport"
                  element={<SupplierPurchaseReport />}
                />

                <Route
                  exact
                  path="/ItemPurchaseReport"
                  element={<ItemPurchaseReport />}
                />

                <Route
                  exact
                  path="/ItemSaleReport"
                  element={<ItemSaleReport />}
                />

                <Route
                  exact
                  path="/CompanySaleComparison"
                  element={<CompanySaleComparison />}
                />

                <Route
                  exact
                  path="/DailyProfitReport"
                  element={<DailyProfitReport />}
                />
                <Route exact path="/Journal" element={<JournalReport />} />
                <Route exact path="/DailyCreditMemo" element={<CreditMemo />} />
                <Route
                  exact
                  path="/EditDocumentReport"
                  element={<DocumentEditReport />}
                />
                <Route
                  exact
                  path="/ItemMonthlySaleComparison"
                  element={<ItemMonthlySaleComparison />}
                />
                <Route
                  exact
                  path="/ComanyPurchaseComparison"
                  element={<CompanyPurchaseComparison />}
                />
                <Route
                  exact
                  path="/ItemSaleComparison"
                  element={<ItemSaleComparison />}
                />
                <Route
                  exact
                  path="/ItemPurchaseComparison"
                  element={<ItemPurchaseComparison />}
                />

                <Route
                  exact
                  path="/ItemMonthlySaleComparison"
                  element={<ItemMonthlySaleComparison />}
                />
                <Route
                  exact
                  path="/ItemMonthlyPurchaseComparison"
                  element={<ItemMonthlyPurchaseComparison />}
                />

                <Route
                  exact
                  path="/CompanyMonthlySaleComparison"
                  element={<CompanyMonthlySaleComparison />}
                />
                <Route
                  exact
                  path="/CompanyMonthlyPurchaseComparison"
                  element={<CompanyMonthlyPurchaseComparison />}
                />
                {/* ====================Routes for MISC REPORT ==================== */}

                <Route
                  exact
                  path="/ReceivableReport"
                  element={<ReceivableReport />}
                />
                <Route
                  exact
                  path="/MemberReceiveableReport"
                  element={<MemberReceiveableReport />}
                />
                <Route
                  exact
                  path="/ReceivableAggingReport"
                  element={<ReceivableAging />}
                />
                <Route
                  exact
                  path="/PayableAggingReport"
                  element={<PayableAging />}
                />
                <Route
                  exact
                  path="/PayableReport"
                  element={<PayableReport />}
                />
                <Route
                  exact
                  path="/SalesTaxRegister"
                  element={<TaxSaleRegisterReport />}
                />
                {/* ====================Routes for INSTALLATION REPORT ==================== */}
                <Route
                  exact
                  path="/DailyInstallationReport"
                  element={<DailyInstallationReport />}
                />
                <Route
                  exact
                  path="/InstallarBalanceReport"
                  element={<InstallarBalanceReport />}
                />
                <Route
                  exact
                  path="/InstallarPayableReport"
                  element={<InstallarPayableReporttt />}
                />
                <Route
                  exact
                  path="/InstallarPaymentReport"
                  element={<InstallarPaymentReport />}
                />
                {/* ====================Routes for INSTALLMETN REPORT ==================== */}
                <Route
                  exact
                  path="/InstallmentBalanceReport"
                  element={<InstallmentBalanceReport />}
                />

                <Route
                  exact
                  path="/InstallmentCollectionReport"
                  element={<InstallmentCollectReport />}
                />
                <Route
                  exact
                  path="/InstallmentLedger"
                  element={<InstallmentLedgerReport />}
                />
                <Route
                  exact
                  path="/InstallmentSaleReport"
                  element={<InstallmentSaleReport />}
                />
                {/* ====================Routes for EMPLOYEE REPORT ==================== */}
                <Route
                  exact
                  path="/EmployeeAdvanceReport"
                  element={<EmployeeAdvanceReport />}
                />

                <Route
                  exact
                  path="/EmployeeMarginReport"
                  element={<EmployeeMarginReport />}
                />
                <Route
                  exact
                  path="/EmployeeSaleComarison"
                  element={<EmployeeSaleComparison />}
                />
                <Route
                  exact
                  path="/EmployeeSaleReport"
                  element={<EmployeeSaleReport />}
                />
                <Route
                  exact
                  path="/EmployeeSaleSummary"
                  element={<EmployeeSaleSummary />}
                />
                <Route
                  exact
                  path="/EmployeeMarginSummary"
                  element={<EmployeeMarginSummary />}
                />
                <Route
                  exact
                  path="/EmployeeMarginComparison"
                  element={<EmployeeMarginComparison />}
                />

                <Route
                  exact
                  path="/EmployeeCommissionReport"
                  element={<EmployeeCommissionReport />}
                />
                <Route
                  exact
                  path="/EmployeeCommissionSummary"
                  element={<EmployeeCommissionSummary />}
                />
                <Route
                  exact
                  path="/EmployeeCommissionComparison"
                  element={<EmployeeCommissionComparison />}
                />

                {/* /////////////////////////////////////////////////////////////////////////////
             /////////////////////////////////////////////////////////////////////////////
             /////////////////////////////   UTILITIES //////////////////////////
             /////////////////////////////////////////////////////////////////////////////
             ///////////////////////////////////////////////////////////////////////////// */}
              </Route>

              {/* Rountes for List reports */}
            </Routes>
          </QueryClientProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
