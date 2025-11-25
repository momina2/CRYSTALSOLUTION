import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// API URLs (Keep as is)
const ADMIN_INFO_API_URL = "https://crystalsolutions.com.pk/api/AdminInfo.php";
const MONTHLY_COMPARISON_API_URL =
  "https://crystalsolutions.com.pk/api/MonthlyComparison.php";
const DASHBOARD_DAILY =
  "https://crystalsolutions.com.pk/api/DashboardDaily.php";
const DASHBOARD_DAILY_WEB =
  "https://crystalsolutions.com.pk/api/DashboardDailyWeb.php";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getCurrentDateFormatted = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const currentDate = getCurrentDateFormatted();

// ----------------------
// YearlySalePurchaseGraph
// ----------------------
const YearlySPCGraph = ({ apiData }) => {
  const YearBar = Bar;

  if (!apiData) return null;

  // DYNAMIC YEAR CALCULATION
  const dateParts = currentDate.split("-");
  const currentYear = parseInt(dateParts[2], 10); // e.g., 2025
  const lastYear = currentYear - 1; // e.g., 2024

  const formatToMillions = (value) => {
    if (!value) return 0;
    const number = Number(value.toString().replace(/,/g, ""));
    return number / 1_000_000;
  };

  // Data extraction
  const lastYearSale = formatToMillions(apiData.LastYearSaleAmount);
  const currentYearSale = formatToMillions(apiData.YearSaleAmount);
  const lastYearPur = formatToMillions(apiData.LastYearPurAmount);
  const currentYearPur = formatToMillions(apiData.YearPurAmount);
  const lastYearCollection = formatToMillions(apiData.Collection);
  const currentYearCollection = formatToMillions(apiData.MonthCollection);

  const data = {
    // DYNAMIC LABELS
    labels: [String(lastYear), String(currentYear)],
    datasets: [
      {
        label: "Sales",
        data: [lastYearSale, currentYearSale],
        backgroundColor: "#FFB6C1",
        borderRadius: 6,
        barThickness: 18,
      },
      {
        label: "Purchase",
        data: [lastYearPur, currentYearPur],
        backgroundColor: "#A1C6FF",
        borderRadius: 6,
        barThickness: 18,
      },
      {
        label: "Collection",
        data: [lastYearCollection, currentYearCollection],
        backgroundColor: "#a1ffb5ff",
        barThickness: 18,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Sale & Purchase Comparison",
        color: "#333",
        font: { size: 14, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: { callback: (value) => value + "M" },
        grid: { display: true },
      },
      y: { grid: { display: false } },
    },
  };

  return (
    <div
      style={{
        // FIXED GRAPH DIMENSIONS
        width: "700px",
        height: "260px",
        background: "white",
        borderRadius: "10px",
        padding: "15px",
        border: "1px solid #eee",
      }}
    >
      <YearBar data={data} options={options} />
    </div>
  );
};

// ----------------------
// Horizontal Balance Card (Customer Balances)
// ----------------------
const HorizontalBalanceCard = ({ mainData, cardTitle = null }) => {
  const formatValue = (key) => mainData[key] || "N/A";

  return (
    <div
      // FIXED CARD DIMENSIONS - INCREASED HEIGHT TO 220px
      className="p-4 rounded-xl shadow-md bg-white border border-gray-100 flex flex-col gap-2 flex-shrink-0"
      style={{ width: "370px", height: "280px" }}
    >
      {cardTitle && (
        <>
          <h3 className="text-base font-bold text-gray-800 mb-2">
            {cardTitle}
          </h3>
        </>
      )}

      {/* Top Row */}
      <div className="flex justify-between items-end border-b pb-2 mb-3 border-gray-200">
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-gray-500">Total</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">
            {formatValue("Total Customer")}
          </h2>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-sm font-medium text-gray-500">Balance</p>
          <h2 className="text-2xl font-bold text-black mt-1">
            {formatValue("Total Balance")}
          </h2>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-4 gap-2 text-center pt-2">
        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">Non Active</p>
          <h4 className="text-xl font-semibold text-blue-700">
            {formatValue("Non Active")}
          </h4>
          <p className="text-xs text-gray-500 mt-1">-</p>
        </div>

        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">Advance</p>
          <h4 className="text-xl font-semibold text-blue-700">
            {formatValue("Advance Customer")}
          </h4>
          <p
            className={`text-xs font-normal mt-1 truncate ${
              (formatValue("Advance Amount") || "").startsWith("-")
                ? "text-gray-500"
                : "text-gray-500"
            }`}
            title={formatValue("Advance Amount")}
          >
            {formatValue("Advance Amount")}
          </p>
        </div>

        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">Nil</p>
          <h4 className="text-xl font-semibold text-blue-700">
            {formatValue("Nil Customer")}
          </h4>
          <p className="text-xs text-gray-500 mt-1">-</p>
        </div>

        <div className="flex flex-col p-1 ">
          <p className="text-xs font-medium text-gray-500 mb-1">Outstanding</p>
          <h4 className="text-xl font-semibold text-blue-700">
            {formatValue("OutStanding Customer")}
          </h4>
          <p
            className="text-xs font-normal text-gray-500 mt-1 truncate"
            title={formatValue("OutStanding Amount")}
          >
            {formatValue("OutStanding Amount")}
          </p>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// New Sales Card (Based on DashboardDailyWeb.php data)
// ----------------------
const NewSalesCard = ({ salesData, cardTitle = "Sale" }) => {
  if (!salesData) return null;

  // --- Data Mapping for Yearly comparison (2024 vs 2025) ---
  const amount2024 = salesData.LastYearSaleAmount || "N/A";
  const quantity2024 = salesData.LastYearSaleQnty || "N/A";
  const amount2025 = salesData.YearSaleAmount || "N/A";
  const quantity2025 = salesData.YearSaleQnty || "N/A";

  // --- Data Mapping for Monthly comparison ---
  const currentMonthAmount = salesData.MonthSaleAmount || "N/A";
  const currentMonthQuantity = salesData.MonthSaleQnty || "N/A";
  const lastYearMonthAmount = salesData.LastYearMonthSaleAmount || "N/A";
  const lastYearMonthQuantity = salesData.LastYearMonthSaleQnty || "N/A";
  const previousMonthAmount = salesData.PreviousMonthSaleAmount || "N/A";
  const previousMonthQuantity = salesData.PreviousMonthSaleQnty || "N/A";

  // --- Dynamic Date Logic based on global currentDate ---
  const dateParts = currentDate.split("-");
  const currentMonthIndex = parseInt(dateParts[1], 10) - 1;
  const currentYear = parseInt(dateParts[2], 10);
  const lastYear = currentYear - 1;

  const currentMonthName = months[currentMonthIndex];

  // Calculate previous month index for labeling
  let previousMonthIndex = currentMonthIndex - 1;
  if (previousMonthIndex < 0) {
    previousMonthIndex = 11;
  }
  const previousMonthName = months[previousMonthIndex];

  // Labels
  const labelLastYearSameMonth = `${currentMonthName} ${lastYear}`;
  const labelCurrentMonth = `${currentMonthName} ${currentYear}`;
  const labelPreviousMonth = `${previousMonthName} ${currentYear}`;

  return (
    <div
      // FIXED CARD DIMENSIONS - INCREASED HEIGHT TO 220px
      className="p-4 rounded-xl shadow-md bg-white border border-gray-100 flex flex-col gap-2 flex-shrink-0"
      style={{ width: "320px", height: "280px" }}
    >
      {cardTitle && (
        <>
          <h3 className="text-base font-bold text-gray-800 mb-2">
            {cardTitle}
          </h3>
        </>
      )}

      {/* Top Row - Year-by-Year Comparison (Amount & Quantity together) */}
      <div className="flex justify-between items-start border-b pb-3 mb-3 border-gray-200">
        <div className="flex flex-col items-center min-w-0 pr-2 w-1/2">
          <h4 className="text-md font-bold text-gray-500 mb-2">{lastYear}</h4>

          <h5
            className="text-xl font-bold text-blue-700 truncate"
            title={`Quantity: ${quantity2024}`}
          >
            {quantity2024}
          </h5>

          <h5
            className="text-sm font-normal text-gray-500 truncate"
            title={`Amount: ${amount2024}`}
          >
            {amount2024}
          </h5>
        </div>

        <div className="flex flex-col items-center min-w-0 pl-4 w-1/2">
          <h4 className="text-md font-bold text-gray-500 mb-2">
            {currentYear}
          </h4>

          <h5
            className="text-xl font-bold text-blue-700 truncate"
            title={`Quantity: ${quantity2025}`}
          >
            {quantity2025}
          </h5>

          <h5
            className="text-sm font-normal text-gray-500 truncate"
            title={`Amount: ${amount2025}`}
          >
            {amount2025}
          </h5>
        </div>
      </div>

      {/* Bottom Row - Dynamic Monthly Comparison Indicators */}
      <div className="grid grid-cols-3 gap-2 text-center pt-2">
        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelLastYearSameMonth}
          </p>
          <h4 className="text-lg font-semibold text-blue-700">
            {lastYearMonthQuantity}
          </h4>
          <p
            className="text-sm font-normal text-gray-500 mt-1 truncate"
            title={lastYearMonthAmount}
          >
            {lastYearMonthAmount}
          </p>
        </div>

        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelCurrentMonth}
          </p>
          <h4 className="text-lg font-semibold text-blue-700">
            {currentMonthQuantity}
          </h4>
          <p
            className="text-sm font-normal text-gray-500 mt-1 truncate"
            title={currentMonthAmount}
          >
            {currentMonthAmount}
          </p>
        </div>

        <div className="flex flex-col p-1">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelPreviousMonth}
          </p>
          <h4 className="text-lg font-semibold text-blue-700">
            {previousMonthQuantity}
          </h4>
          <p
            className="text-sm font-normal text-gray-500 mt-1 truncate"
            title={previousMonthAmount}
          >
            {previousMonthAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// New Purchase Card (Based on DashboardDailyWeb.php data)
// ----------------------
const NewPurchaseCard = ({ purchaseData, cardTitle = "Purchase" }) => {
  if (!purchaseData) return null;

  const quantityLastYear = purchaseData.LastYearPurQnty ?? "N/A"; //2024 - Qnty
  const amountLastYear = purchaseData.LastYearPurAmount ?? "N/A"; //2024 - Amount
  const quantityCurrentYear = purchaseData.YearPurQnty ?? "N/A"; //2025 - Qnty
  const amountCurrentYear = purchaseData.YearPurAmount ?? "N/A"; //2025 - Amount

  // --- Data Mapping for Monthly comparison ---
  const currentMonthAmount = purchaseData.MonthPurAmount ?? "N/A"; //Nov 2025 - Amount
  const currentMonthQuantity = purchaseData.MonthPurQnty ?? "N/A"; //Nov 2025 - Qnty
  const lastYearMonthAmount = purchaseData.LastYearMonthPurAmount ?? "N/A"; //Nov 2024 - Amount
  const lastYearMonthQuantity = purchaseData.LastYearMonthPurQnty ?? "N/A"; //Nov 2024 - Qnty
  const previousMonthAmount = purchaseData.PreviousMonthPurAmount ?? "N/A"; //Oct 2025 - Amount
  const previousMonthQuantity = purchaseData.PreviousMonthPurQnty ?? "N/A"; //Oct 2025 - Qnty

  // --- Dynamic Date Logic based on global currentDate ---
  const dateParts = currentDate.split("-");
  const currentMonthIndex = parseInt(dateParts[1], 10) - 1;
  const currentYear = parseInt(dateParts[2], 10);
  const lastYear = currentYear - 1;

  const currentMonthName = months[currentMonthIndex];

  // Calculate previous month index for labeling
  let previousMonthIndex = currentMonthIndex - 1;
  if (previousMonthIndex < 0) {
    previousMonthIndex = 11;
  }
  const previousMonthName = months[previousMonthIndex];

  // Labels
  const labelLastYearSameMonth = `${currentMonthName} ${lastYear}`;
  const labelCurrentMonth = `${currentMonthName} ${currentYear}`;
  const labelPreviousMonth = `${previousMonthName} ${currentYear}`;

  return (
    <div
      // FIXED CARD DIMENSIONS - INCREASED HEIGHT TO 220px
      className="p-4 rounded-xl shadow-md bg-white border border-gray-100 flex flex-col gap-2 flex-shrink-0"
      style={{ width: "320px", height: "280px" }}
    >
      {cardTitle && (
        <>
          <h3 className="text-base font-bold text-gray-800 mb-2">
            {cardTitle}
          </h3>
        </>
      )}

      {/* Top Row - Year-by-Year Comparison (Amount & Quantity together) */}
      <div className="flex justify-between items-start border-b pb-3 mb-3 border-gray-200">
        <div className="flex flex-col items-center min-w-0 pr-2 w-1/2">
          <h4 className="text-md font-bold text-gray-500 mb-2">{lastYear}</h4>

          <h5
            className="text-xl font-bold text-blue-700 truncate"
            title={`Quantity: ${quantityLastYear}`}
          >
            {quantityLastYear}
          </h5>

          <h5
            className="text-sm font-normal text-gray-500 truncate"
            title={`Amount: ${amountLastYear}`}
          >
            {amountLastYear}
          </h5>
        </div>

        <div className="flex flex-col items-center min-w-0 pl-4 w-1/2">
          <h4 className="text-md font-bold text-gray-500 mb-2">
            {currentYear}
          </h4>

          <h5
            className="text-xl font-bold text-blue-700 truncate"
            title={`Quantity: ${quantityCurrentYear}`}
          >
            {quantityCurrentYear}
          </h5>

          <h5
            className="text-sm font-normal text-gray-500 truncate"
            title={`Amount: ${amountCurrentYear}`}
          >
            {amountCurrentYear}
          </h5>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center pt-2">
        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelLastYearSameMonth}
          </p>
          <h4 className="text-lg font-semibold text-blue-700">
            {lastYearMonthQuantity}
          </h4>
          <p
            className="text-sm font-normal text-gray-500 mt-1 truncate"
            title={lastYearMonthAmount}
          >
            {lastYearMonthAmount}
          </p>
        </div>

        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelCurrentMonth}
          </p>
          <h4 className="text-lg font-semibold text-blue-700">
            {currentMonthQuantity}
          </h4>
          <p
            className="text-sm font-normal text-gray-500 mt-1 truncate"
            title={currentMonthAmount}
          >
            {currentMonthAmount}
          </p>
        </div>

        <div className="flex flex-col p-1">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelPreviousMonth}
          </p>
          <h4 className="text-lg font-semibold text-blue-700">
            {previousMonthQuantity}
          </h4>
          <p
            className="text-sm font-normal text-gray-500 mt-1 truncate"
            title={previousMonthAmount}
          >
            {previousMonthAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// New Collection Card (Based on DashboardDailyWeb.php data)
// ----------------------
const NewCollectionCard = ({ salesData, cardTitle = "Sale" }) => {
  if (!salesData) return null;

  // Since Collection Card is using Sale Data keys from dailyWebData, the mapping remains the same
  // --- Data Mapping for Yearly comparison (2024 vs 2025) ---
  const amount2024 = salesData.LastYearSaleAmount || "N/A";
  const quantity2024 = salesData.LastYearSaleQnty || "N/A";
  const amount2025 = salesData.YearSaleAmount || "N/A";
  const quantity2025 = salesData.YearSaleQnty || "N/A";

  // --- Data Mapping for Monthly comparison ---
  const currentMonthAmount = salesData.MonthSaleAmount || "N/A";
  const currentMonthQuantity = salesData.MonthSaleQnty || "N/A";
  const lastYearMonthAmount = salesData.LastYearMonthSaleAmount || "N/A";
  const lastYearMonthQuantity = salesData.LastYearMonthSaleQnty || "N/A";
  const previousMonthAmount = salesData.PreviousMonthSaleAmount || "N/A";
  const previousMonthQuantity = salesData.PreviousMonthSaleQnty || "N/A";

  // --- Dynamic Date Logic based on global currentDate ---
  const dateParts = currentDate.split("-");
  const currentMonthIndex = parseInt(dateParts[1], 10) - 1;
  const currentYear = parseInt(dateParts[2], 10);
  const lastYear = currentYear - 1;

  const currentMonthName = months[currentMonthIndex];

  //  previous month labeling
  let previousMonthIndex = currentMonthIndex - 1;
  if (previousMonthIndex < 0) {
    previousMonthIndex = 11;
  }
  const previousMonthName = months[previousMonthIndex];

  // Labels
  const labelLastYearSameMonth = `${currentMonthName} ${lastYear}`;
  const labelCurrentMonth = `${currentMonthName} ${currentYear}`;
  const labelPreviousMonth = `${previousMonthName} ${currentYear}`;

  return (
    <div
      // FIXED CARD DIMENSIONS - INCREASED HEIGHT TO 220px
      className="p-4 rounded-xl shadow-md bg-white border border-gray-100 flex flex-col gap-2 flex-shrink-0"
      style={{ width: "320px", height: "280px" }}
    >
      {cardTitle && (
        <>
          <h3 className="text-base font-bold text-gray-800 mb-2">
            {cardTitle}
          </h3>
        </>
      )}

      <div className="flex justify-between items-start border-b pb-3 mb-3 border-gray-200">
        <div className="flex flex-col items-center min-w-0 pr-2 w-1/2">
          <h4 className="text-md font-bold text-gray-500 mb-2">{lastYear}</h4>

          <h5
            className="text-xl font-bold text-blue-700 truncate"
            title={`Quantity: ${quantity2024}`}
          >
            {quantity2024}
          </h5>

          <h5
            className="text-sm font-normal text-gray-500 truncate"
            title={`Amount: ${amount2024}`}
          >
            {amount2024}
          </h5>
        </div>

        <div className="flex flex-col items-center min-w-0 pl-4 w-1/2">
          <h4 className="text-md font-bold text-gray-500 mb-2">
            {currentYear}
          </h4>

          {/* Quantity (YearSaleQnty) */}
          <h5
            className="text-xl font-bold text-blue-700 truncate"
            title={`Quantity: ${quantity2025}`}
          >
            {quantity2025}
          </h5>

          {/* Amount (YearSaleAmount) */}
          <h5
            className="text-sm font-normal text-gray-500 truncate"
            title={`Amount: ${amount2025}`}
          >
            {amount2025}
          </h5>
        </div>
      </div>

      {/* Bottom Row  */}
      <div className="grid grid-cols-3 gap-2 text-center pt-2">
        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelLastYearSameMonth}
          </p>
          <h4 className="text-lg font-semibold text-blue-700">
            {lastYearMonthQuantity}
          </h4>
          <p
            className="text-sm font-normal text-gray-500 mt-1 truncate"
            title={lastYearMonthAmount}
          >
            {lastYearMonthAmount}
          </p>
        </div>

        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelCurrentMonth}
          </p>
          <h4 className="text-lg font-semibold text-blue-700">
            {currentMonthQuantity}
          </h4>
          <p
            className="text-sm font-normal text-gray-500 mt-1 truncate"
            title={currentMonthAmount}
          >
            {currentMonthAmount}
          </p>
        </div>

        <div className="flex flex-col p-1">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelPreviousMonth}
          </p>
          <h4 className="text-lg font-semibold text-blue-700">
            {previousMonthQuantity}
          </h4>
          <p
            className="text-sm font-normal text-gray-500 mt-1 truncate"
            title={previousMonthAmount}
          >
            {previousMonthAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

// ------------------------------
// Horizontal Range Card
// ------------------------------
const HorizontalRangeCard = ({ stats, cardTitle = null }) => (
  <div
    // FIXED RANGE CARD DIMENSIONS
    className="p-2 rounded-xl shadow-xl bg-white border border-gray-100 flex flex-col justify-start flex-shrink-0"
    style={{ width: "650px", height: "130px" }}
  >
    {cardTitle && (
      <>
        <h3 className="text-base font-semibold text-gray-800 mb-1 px-1">
          {cardTitle}
        </h3>
        <hr className="mb-2 border-gray-100" />
      </>
    )}

    <div className="flex justify-between divide-x divide-gray-200">
      {stats.map((stat) => (
        <div
          key={stat.range}
          className="flex-1 p-1 flex flex-col items-center transition duration-150 hover:bg-gray-50 min-w-0"
        >
          <p className="text-xs font-medium text-gray-500 mb-1">{stat.range}</p>
          <p
            className="text-xl font-semibold text-blue-700"
            title={`Customers: ${stat.numbers}`}
          >
            {String(stat.numbers)}
          </p>

          <h2
            className="text-xs font-normal text-gray-500 truncate mb-0.5"
            title={`Amount: ${stat.amount}`}
          >
            {String(stat.amount)}
          </h2>
        </div>
      ))}
    </div>
  </div>
);

// ----------------------
// AmericanDashboard Component
// ----------------------
const AmericanDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null); // Daily Sales/Purchase/Collection (DashboardDaily.php)
  const [dailyWebData, setDailyWebData] = useState(null); // Web Sales (DashboardDailyWeb.php)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseData = (dataObject, prefix = "") => {
    if (!dataObject) return Array(12).fill(0);

    return months.map((month) => {
      const key = `${prefix}${month}`;
      const valueString = dataObject[key];
      if (!valueString) return 0;

      const cleanedValue = valueString.toString().replace(/,/g, "");
      const value = parseFloat(cleanedValue);

      return isNaN(value) ? 0 : value;
    });
  };

  // Fetch dashboard data (Keep as is)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const adminFormData = new FormData();
        adminFormData.append("code", "AMRELEC");

        const monthlyFormData = new FormData();
        monthlyFormData.append("code", "AMRELEC");
        monthlyFormData.append("FRepYer", "2025");

        const dailyFormData = new FormData();
        dailyFormData.append("code", "AMRELEC");
        dailyFormData.append("FRepDat", currentDate);
        dailyFormData.append("FLocCod", "001");

        const dailyWebFormData = new FormData();
        dailyWebFormData.append("code", "AMRELEC");
        dailyWebFormData.append("FRepDat", currentDate);
        dailyWebFormData.append("FLocCod", "001");

        // Use Promise.all to fetch all data concurrently
        const [
          adminResponse,
          monthlyResponse,
          dailyResponse,
          dailyWebResponse,
        ] = await Promise.all([
          axios.post(ADMIN_INFO_API_URL, adminFormData),
          axios.post(MONTHLY_COMPARISON_API_URL, monthlyFormData),
          axios.post(DASHBOARD_DAILY, dailyFormData),
          axios.post(DASHBOARD_DAILY_WEB, dailyWebFormData),
        ]);

        setAdminData(adminResponse.data);
        setMonthlyData(monthlyResponse.data);

        // Ensure single object extraction from potentially array response
        const dailyResponseData = Array.isArray(dailyResponse.data)
          ? dailyResponse.data[0]
          : dailyResponse.data;
        setDailyData(dailyResponseData);

        const dailyWebResponseData = Array.isArray(dailyWebResponse.data)
          ? dailyWebResponse.data[0]
          : dailyWebResponse.data;
        setDailyWebData(dailyWebResponseData);
      } catch (err) {
        console.error("API Fetch Error Details:", err);
        if (err.response) {
          console.error("Response Status:", err.response.status);
          console.error("Response Data:", err.response.data);
        }
        setError(
          "Couldn't fetch dashboard data. Please check network and API responses."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center p-10 text-xl text-black">
        Loading Admin Data...
      </div>
    );

  if (error)
    return (
      <div className="text-center p-10 text-xl text-red-600 font-semibold">
        Error: {error}
      </div>
    );

  // Safely extract data
  const mainData = Array.isArray(adminData) ? adminData[0] : adminData;
  const dailySaleData = dailyData;
  const webData = dailyWebData;

  if (!mainData || !dailySaleData || !webData)
    return (
      <div className="text-center p-10 text-xl text-gray-600">
        Data loading failed or initial data is empty.
      </div>
    );

  // Range Card Keys
  const newRangeDataKeys = [
    { range: "≤ 0 (Nil)", amtKey: "Amt001", nosKey: "Nos001" },
    { range: "< 1M", amtKey: "Amt002", nosKey: "Nos002" },
    { range: "< 2M", amtKey: "Amt003", nosKey: "Nos003" },
    { range: "< 5M", amtKey: "Amt004", nosKey: "Nos004" },
    { range: "< 100M", amtKey: "Amt005", nosKey: "Nos005" },
    { range: "> 100M", amtKey: "Amt006", nosKey: "Nos006" },
  ];

  const newRangeStats = newRangeDataKeys.map((item) => ({
    range: item.range,
    amount: mainData[item.amtKey] || "N/A",
    numbers: mainData[item.nosKey] || "N/A",
  }));

  // Graphs
  const isMonthlyDataAvailable =
    monthlyData && Object.keys(monthlyData).length > 0;

  const salesData = parseData(monthlyData, "S");
  const purchaseData = parseData(monthlyData, "P");
  const expenseData = parseData(monthlyData, "E");
  const collectionData = parseData(monthlyData, "C");

  const chart2Options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Monthly Overview - 2025",
        font: { size: 16, weight: "bold" },
      },
    },
    scales: {
      x: { categoryPercentage: 0.9, barPercentage: 0.9 },
      y: {},
    },
  };

  // ----------------------
  // Rendered Dashboard Layout
  // ----------------------
  return (
    // **Main Scrollable Container**
    <div
      className="p-1 bg-gray-50 min-h-screen font-sans"
      style={{
        // This makes the entire content scrollable if it exceeds screen dimensions
        overflow: "auto",
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <hr className="mb-1 border-gray-200" />

      {/* ---------------------- Top Cards (4 Horizontal Cards) ---------------------- */}
      <section className="mb-4 flex flex-row gap-3">
        <HorizontalBalanceCard mainData={mainData} cardTitle="Customer" />
        <NewSalesCard salesData={webData} cardTitle="Sale" />
        <NewPurchaseCard purchaseData={webData} cardTitle="Purchase" />
        <NewCollectionCard salesData={webData} cardTitle="Collection" />
      </section>

      {/* ---------------------- Middle Section: Charts and Range Card ---------------------- */}
      <section className="mb-3">
        {/* Enforcing horizontal arrangement for the charts and range card */}
        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-3">
            {/* Monthly Chart Container (Fixed Width/Height) */}
            <div
              className="flex-shrink-0"
              style={{ width: "650px", height: "400px" }}
            >
              <div className="bg-white p-6 rounded-xl shadow-xl border h-full">
                <div className="h-full">
                  {isMonthlyDataAvailable ? (
                    <Bar
                      options={chart2Options}
                      data={{
                        labels: months,
                        datasets: [
                          {
                            label: "Sales",
                            data: salesData,
                            backgroundColor: "rgba(54, 162, 235, 0.8)",
                            borderRadius: 6,
                          },
                          {
                            label: "Purchase",
                            data: purchaseData,
                            backgroundColor: "rgba(255, 99, 132, 0.8)",
                            borderRadius: 6,
                          },
                          {
                            label: "Expense",
                            data: expenseData,
                            backgroundColor: "rgba(255, 206, 86, 0.8)",
                            borderRadius: 6,
                          },
                          {
                            label: "Collection",
                            data: collectionData,
                            backgroundColor: "rgba(75, 192, 192, 0.8)",
                            borderRadius: 6,
                          },
                        ],
                      }}
                    />
                  ) : (
                    <div className="text-center p-10 text-lg text-gray-500">
                      Monthly comparison data not available.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Range Card (Fixed Width/Height) - Placed below the monthly chart */}
            <div className="flex-shrink-0" style={{ width: "650px" }}>
              <HorizontalRangeCard
                stats={newRangeStats}
                cardTitle="Customer Amount & Count by Range"
              />
            </div>
          </div>

          {/* Yearly Comparison Graph (Fixed Width/Height) */}
          <div className="flex-shrink-0 pt-1" style={{ width: "500px" }}>
            <YearlySPCGraph apiData={webData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AmericanDashboard;
