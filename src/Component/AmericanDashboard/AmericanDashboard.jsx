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
const AMERICAN_AGGING_API_URL =
  "https://crystalsolutions.com.pk/api/AmericanAdminAgging.php";

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

// --- 1. Date function for dd-mm-yyyy (Used by daily, web, etc.) ---
const getCurrentDateFormatted = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`; // e.g., 28-11-2025
};

// --- 2. New Date function for yyyy-mm-dd (REQUIRED FOR AmericanAdminAgging) ---
const getAggingDateFormatted = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`; // e.g., 2025-11-28
};

const currentDate = getCurrentDateFormatted(); // Used for APIs needing dd-mm-yyyy format

// --- ** Soft Color Palette for Charts ** ---
const ChartColors = {
  Sales: "rgba(79, 109, 255, 0.8)", // Softer, professional blue
  Purchase: "rgba(255, 126, 149, 0.8)", // Muted pink/red
  Expense: "rgba(255, 192, 90, 0.8)", // Warm yellow/orange
  Collection: "rgba(43, 190, 185, 0.8)", // Calm teal
  YearlySales: "#5790FF", // Lighter blue for yearly Sales
  YearlyPurchase: "#FFADAD", // Softer red for yearly Purchase
  YearlyCollection: "#A0FFD1", // Mint green for yearly Collection
};
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
  const lastYearCollection = formatToMillions(apiData.LastYearCollection);
  const currentYearCollection = formatToMillions(apiData.CurrentYearCollection);

  const data = {
    // DYNAMIC LABELS
    labels: [String(lastYear), String(currentYear)],
    datasets: [
      {
        label: "Sales",
        data: [lastYearSale, currentYearSale],
        backgroundColor: ChartColors.YearlySales, // Updated Color
        borderRadius: 8, // Increased radius for softer look
        barThickness: 18,
      },
      {
        label: "Purchase",
        data: [lastYearPur, currentYearPur],
        backgroundColor: ChartColors.YearlyPurchase, // Updated Color
        borderRadius: 8, // Increased radius for softer look
        barThickness: 18,
      },
      {
        label: "Collection",
        data: [lastYearCollection, currentYearCollection],
        backgroundColor: ChartColors.YearlyCollection, // Updated Color
        borderRadius: 8, // Increased radius for softer look
        barThickness: 18,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { usePointStyle: true, padding: 20 } }, // Professional Legend
      title: {
        display: true,
        text: "Yearly Comparison (in Millions)", // Added title for clarity
        color: "#333",
        font: {
          size: 16,
          weight: "bold",
          family: 'Inter, "Segoe UI", sans-serif',
        },
      },
    },
    scales: {
      x: {
        ticks: { callback: (value) => value + "M", color: "#6b7280" },
        grid: { display: true, color: "rgba(0, 0, 0, 0.05)" }, // Softer grid lines
        border: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { color: "#374151" },
        border: { display: false },
      },
    },
  };

  return (
    <div
      style={{
        width: "650px", // Adjusted width to match other container
        height: "260px",
        background: "white",
        borderRadius: "12px", // Increased radius
        padding: "15px",
        border: "1px solid #e0e0e0", // Lighter border
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", // Softer shadow
      }}
    >
      <YearBar data={data} options={options} />
    </div>
  );
};
const HorizontalBalanceCard = ({ mainData, cardTitle = null }) => {
  const formatValue = (key) => mainData[key] || "N/A";

  return (
    <div
      className="p-3 rounded-xl shadow-lg bg-white border border-gray-100 flex flex-col gap-3 flex-shrink-0 transition-all duration-300 hover:shadow-xl" // Added soft shadow and hover effect
      style={{ width: "370px", height: "280px" }}
    >
      {cardTitle && (
        <>
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-2 border-gray-100">
            {cardTitle}
          </h3>
        </>
      )}

      {/* Top Row */}
      <div className="flex justify-between items-end border-b pb-3 mb-2 border-gray-200">
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-gray-500">Total Customers</p>
          <h2 className="text-4xl font-extrabold text-[#1f4a9b] mt-1">
            {formatValue("Total Customer")}
          </h2>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-sm font-medium text-gray-500">Total Balance</p>
          <h2 className="text-2xl font-bold text-black mt-1">
            {formatValue("Total Balance")}
          </h2>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-4 gap-1 text-center pt-1">
        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">Non Active</p>
          <h4 className="text-xl font-semibold text-[#0077b6]">
            {formatValue("Non Active")}
          </h4>
          <p className="text-xs text-gray-500 mt-1">-</p>
        </div>

        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">Advance</p>
          <h4 className="text-xl font-semibold text-[#0077b6]">
            {formatValue("Advance Customer")}
          </h4>
          <p
            className={`text-xs font-normal mt-1 truncate text-green-600`} // Green for advance amount
            title={formatValue("Advance Amount")}
          >
            {formatValue("Advance Amount")}
          </p>
        </div>

        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">Nil</p>
          <h4 className="text-xl font-semibold text-[#0077b6]">
            {formatValue("Nil Customer")}
          </h4>
          <p className="text-xs text-gray-500 mt-1">-</p>
        </div>

        <div className="flex flex-col p-1 ">
          <p className="text-xs font-medium text-gray-500 mb-1">Outstanding</p>
          <h4 className="text-xl font-semibold text-[#0077b6]">
            {formatValue("OutStanding Customer")}
          </h4>
          <p
            className="text-xs font-normal text-red-600 mt-1 truncate" // Red for outstanding amount
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
// New Sales Card
// ----------------------
const NewSalesCard = ({ salesData, cardTitle = "Sale" }) => {
  if (!salesData) return null;

  const amount2024 = salesData.LastYearSaleAmount || "N/A";
  const quantity2024 = salesData.LastYearSaleQnty || "N/A";
  const amount2025 = salesData.YearSaleAmount || "N/A";
  const quantity2025 = salesData.YearSaleQnty || "N/A";

  const currentMonthAmount = salesData.MonthSaleAmount || "N/A";
  const currentMonthQuantity = salesData.MonthSaleQnty || "N/A";
  const lastYearMonthAmount = salesData.LastYearMonthSaleAmount || "N/A";
  const lastYearMonthQuantity = salesData.LastYearMonthSaleQnty || "N/A";
  const previousMonthAmount = salesData.PreviousMonthSaleAmount || "N/A";
  const previousMonthQuantity = salesData.PreviousMonthSaleQnty || "N/A";

  const dateParts = currentDate.split("-");
  const currentMonthIndex = parseInt(dateParts[1], 10) - 1;
  const currentYear = parseInt(dateParts[2], 10);
  const lastYear = currentYear - 1;

  const currentMonthName = months[currentMonthIndex];
  let previousMonthIndex = currentMonthIndex - 1;
  if (previousMonthIndex < 0) previousMonthIndex = 11;
  const previousMonthName = months[previousMonthIndex];

  const labelLastYearSameMonth = `${currentMonthName} ${lastYear}`;
  const labelCurrentMonth = `${currentMonthName} ${currentYear}`;
  const labelPreviousMonth = `${previousMonthName} ${currentYear}`;

  return (
    <div
      className="p-3 rounded-xl shadow-lg bg-white border border-gray-100 flex flex-col gap-3 flex-shrink-0 transition-all duration-300 hover:shadow-xl"
      style={{ width: "320px", height: "280px" }}
    >
      {cardTitle && (
        <>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{cardTitle}</h3>
        </>
      )}

      {/* Top Row - Year-by-Year Comparison */}
      <div className="flex justify-between items-start border-b pb-3 mb-2 border-gray-200">
        <div className="flex flex-col items-center min-w-0 pr-2 w-1/2">
          <h4 className="text-md font-bold text-gray-500 mb-2">{lastYear}</h4>
          <h5
            className="text-xl font-bold text-[#1f4a9b] truncate"
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
            className="text-xl font-bold text-[#1f4a9b] truncate"
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

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-2 text-center pt-1">
        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelLastYearSameMonth}
          </p>
          <h4 className="text-lg font-semibold text-[#0077b6]">
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
          <h4 className="text-lg font-semibold text-[#0077b6]">
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
          <h4 className="text-lg font-semibold text-[#0077b6]">
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
// New Purchase Card
// ----------------------
const NewPurchaseCard = ({ purchaseData, cardTitle = "Purchase" }) => {
  if (!purchaseData) return null;

  const quantityLastYear = purchaseData.LastYearPurQnty ?? "N/A";
  const amountLastYear = purchaseData.LastYearPurAmount ?? "N/A";
  const quantityCurrentYear = purchaseData.YearPurQnty ?? "N/A";
  const amountCurrentYear = purchaseData.YearPurAmount ?? "N/A";

  const currentMonthAmount = purchaseData.MonthPurAmount ?? "N/A";
  const currentMonthQuantity = purchaseData.MonthPurQnty ?? "N/A";
  const lastYearMonthAmount = purchaseData.LastYearMonthPurAmount ?? "N/A";
  const lastYearMonthQuantity = purchaseData.LastYearMonthPurQnty ?? "N/A";
  const previousMonthAmount = purchaseData.PreviousMonthPurAmount ?? "N/A";
  const previousMonthQuantity = purchaseData.PreviousMonthPurQnty ?? "N/A";

  const dateParts = currentDate.split("-");
  const currentMonthIndex = parseInt(dateParts[1], 10) - 1;
  const currentYear = parseInt(dateParts[2], 10);
  const lastYear = currentYear - 1;

  const currentMonthName = months[currentMonthIndex];
  let previousMonthIndex = currentMonthIndex - 1;
  if (previousMonthIndex < 0) previousMonthIndex = 11;
  const previousMonthName = months[previousMonthIndex];

  const labelLastYearSameMonth = `${currentMonthName} ${lastYear}`;
  const labelCurrentMonth = `${currentMonthName} ${currentYear}`;
  const labelPreviousMonth = `${previousMonthName} ${currentYear}`;

  return (
    <div
      className="p-3 rounded-xl shadow-lg bg-white border border-gray-100 flex flex-col gap-3 flex-shrink-0 transition-all duration-300 hover:shadow-xl"
      style={{ width: "320px", height: "280px" }}
    >
      {cardTitle && (
        <h3 className="text-lg font-bold text-gray-800 mb-2">{cardTitle}</h3>
      )}

      {/* Year Comparison */}
      <div className="flex justify-between items-start border-b pb-3 mb-2 border-gray-200">
        <div className="flex flex-col items-center min-w-0 pr-2 w-1/2">
          <h4 className="text-md font-bold text-gray-500 mb-2">{lastYear}</h4>
          <h5 className="text-xl font-bold text-[#1f4a9b] truncate">
            {quantityLastYear}
          </h5>
          <h5 className="text-sm font-normal text-gray-500 truncate">
            {amountLastYear}
          </h5>
        </div>

        <div className="flex flex-col items-center min-w-0 pl-4 w-1/2">
          <h4 className="text-md font-bold text-gray-500 mb-2">
            {currentYear}
          </h4>
          <h5 className="text-xl font-bold text-[#1f4a9b] truncate">
            {quantityCurrentYear}
          </h5>
          <h5 className="text-sm font-normal text-gray-500 truncate">
            {amountCurrentYear}
          </h5>
        </div>
      </div>

      {/* Month Comparison */}
      <div className="grid grid-cols-3 gap-2 text-center pt-1">
        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelLastYearSameMonth}
          </p>
          <h4 className="text-lg font-semibold text-[#0077b6]">
            {lastYearMonthQuantity}
          </h4>
          <p className="text-sm font-normal text-gray-500 mt-1 truncate">
            {lastYearMonthAmount}
          </p>
        </div>

        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelCurrentMonth}
          </p>
          <h4 className="text-lg font-semibold text-[#0077b6]">
            {currentMonthQuantity}
          </h4>
          <p className="text-sm font-normal text-gray-500 mt-1 truncate">
            {currentMonthAmount}
          </p>
        </div>

        <div className="flex flex-col p-1">
          <p className="text-xs font-medium text-gray-500 mb-1">
            {labelPreviousMonth}
          </p>
          <h4 className="text-lg font-semibold text-[#0077b6]">
            {previousMonthQuantity}
          </h4>
          <p className="text-sm font-normal text-gray-500 mt-1 truncate">
            {previousMonthAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// New Collection Card
// ----------------------
const NewCollectionCard = ({ salesData, cardTitle = "Collection" }) => {
  if (!salesData) return null;

  const CollectionAmount2024 = salesData.LastYearCollection || "N/A";
  const amount2025 = salesData.CurrentYearCollection || "N/A";

  const currentMonthCollection = salesData.MonthCollection || "N/A";
  const previousMonthCollection = salesData.PreviousMonthCollection || "N/A";

  const dateParts = currentDate.split("-");
  const currentMonthIndex = parseInt(dateParts[1], 10) - 1;
  const currentYear = parseInt(dateParts[2], 10);
  const lastYear = currentYear - 1;

  const currentMonthName = months[currentMonthIndex];
  let previousMonthIndex = currentMonthIndex - 1;
  if (previousMonthIndex < 0) previousMonthIndex = 11;
  const previousMonthName = months[previousMonthIndex];

  const labelCurrentMonth = `${currentMonthName} ${currentYear}`;
  const labelPreviousMonth = `${previousMonthName} ${currentYear}`;

  return (
    <div
      className="p-3 rounded-xl shadow-lg bg-white border border-gray-100 flex flex-col gap-3 flex-shrink-0 transition-all duration-300 hover:shadow-xl"
      style={{ width: "320px", height: "280px" }}
    >
      {cardTitle && (
        <h3 className="text-lg font-bold text-gray-800 mb-2">{cardTitle}</h3>
      )}

      {/* Year Comparison */}
      <div className="flex justify-around items-start border-b pb-3 mb-2 border-gray-200">
        <div className="flex flex-col items-center min-w-0 pr-2">
          <h4 className="text-md font-bold text-gray-500 mb-2">{lastYear}</h4>
          <h5 className="text-lg font-bold text-[#1f4a9b]">
            {CollectionAmount2024}
          </h5>
        </div>

        <div className="flex flex-col items-center min-w-0 pl-4">
          <h4 className="text-md font-bold text-gray-500 mb-2">
            {currentYear}
          </h4>
          <h5 className="text-lg font-bold text-[#1f4a9b]">{amount2025}</h5>
        </div>
      </div>

      {/* Bottom Row - Monthly Comparison */}
      <div className="pt-2 flex-grow flex items-center justify-center">
        <div className="flex justify-center items-center text-center w-full">
          <div className="flex flex-col p-2 border-r border-gray-200 flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">
              {labelCurrentMonth}
            </p>
            <p
              className="text-lg font-semibold text-[#0077b6] mt-1"
              title={currentMonthCollection}
            >
              {currentMonthCollection}
            </p>
          </div>

          <div className="flex flex-col p-2 flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">
              {labelPreviousMonth}
            </p>
            <p
              className="text-lg font-semibold text-[#0077b6] mt-1"
              title={previousMonthCollection}
            >
              {previousMonthCollection}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// New Payment Card
// ----------------------
const NewPaymentCard = ({ salesData, cardTitle = "Payment" }) => {
  if (!salesData) return null;

  const PaymentAmount2024 = salesData.LastYearPayment || "N/A";
  const amount2025 = salesData.CurrentYearPayment || "N/A";
  const currentMonthPayment = salesData.MonthPayment || "N/A";
  const previousMonthPayment = salesData.PreviousMonthPayment || "N/A";

  const dateParts = currentDate.split("-");
  const currentMonthIndex = parseInt(dateParts[1], 10) - 1;
  const currentYear = parseInt(dateParts[2], 10);
  const lastYear = currentYear - 1;

  const currentMonthName = months[currentMonthIndex];
  let previousMonthIndex = currentMonthIndex - 1;
  if (previousMonthIndex < 0) previousMonthIndex = 11;
  const previousMonthName = months[previousMonthIndex];

  const labelCurrentMonth = `${currentMonthName} ${currentYear}`;
  const labelPreviousMonth = `${previousMonthName} ${currentYear}`;

  return (
    <div
      className="p-3 rounded-xl shadow-lg bg-white border border-gray-100 flex flex-col gap-3 flex-shrink-0 transition-all duration-300 hover:shadow-xl"
      style={{ width: "320px", height: "280px" }}
    >
      {cardTitle && (
        <h3 className="text-lg font-bold text-gray-800 mb-2">{cardTitle}</h3>
      )}

      {/* Year Comparison */}
      <div className="flex justify-around items-start border-b pb-3 mb-2 border-gray-200">
        <div className="flex flex-col items-center min-w-0 pr-2">
          <h4 className="text-md font-bold text-gray-500 mb-2">{lastYear}</h4>
          <h5 className="text-lg font-bold text-[#1f4a9b]">
            {PaymentAmount2024}
          </h5>
        </div>

        <div className="flex flex-col items-center min-w-0 pl-4">
          <h4 className="text-md font-bold text-gray-500 mb-2">
            {currentYear}
          </h4>
          <h5 className="text-lg font-bold text-[#1f4a9b]">{amount2025}</h5>
        </div>
      </div>

      {/* Month Comparison */}
      <div className="pt-2 flex-grow flex items-center justify-center">
        <div className="flex justify-center items-center text-center w-full">
          <div className="flex flex-col p-2 border-r border-gray-200 flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">
              {labelCurrentMonth}
            </p>
            <p
              className="text-lg font-semibold text-[#0077b6] mt-1"
              title={currentMonthPayment}
            >
              {currentMonthPayment}
            </p>
          </div>

          <div className="flex flex-col p-2 flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">
              {labelPreviousMonth}
            </p>
            <p
              className="text-lg font-semibold text-[#0077b6] mt-1"
              title={previousMonthPayment}
            >
              {previousMonthPayment}
            </p>
          </div>
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
    className="p-2 rounded-xl shadow-lg bg-white border border-gray-100 flex flex-col justify-start flex-shrink-0 transition-all duration-300 hover:shadow-xl"
    style={{ width: "650px", height: "130px" }}
  >
    {cardTitle && (
      <>
        <h3 className="text-base font-semibold text-gray-800 mb-2 px-1">
          {cardTitle}
        </h3>
        <hr className="mb-2 border-gray-100" />
      </>
    )}

    <div className="flex justify-between divide-x divide-gray-200">
      {stats.map((stat) => (
        <div
          key={stat.range}
          className="flex-1 p-1 flex flex-col items-center transition duration-150 hover:bg-gray-50 min-w-0 rounded-sm"
        >
          <p className="text-xs font-medium text-gray-500 mb-1">{stat.range}</p>
          <p
            className="text-xl font-semibold text-[#1f4a9b]" // Stronger color for numbers
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

// ------------------------------
// Horizontal Agging Range Card
// ------------------------------
const HorizontalAggingRangeCard = ({ stats, cardTitle = null }) => (
  <div
    className="p-2 rounded-xl shadow-lg bg-white border border-gray-100 flex flex-col justify-start flex-shrink-0 transition-all duration-300 hover:shadow-xl"
    style={{ width: "650px", height: "130px" }} // Adjusted width to match the graph's container width
  >
    {cardTitle && (
      <>
        <h3 className="text-base font-semibold text-gray-800 mb-2 px-1">
          {cardTitle}
        </h3>
        <hr className="mb-2 border-gray-100" />
      </>
    )}

    <div className="flex justify-between divide-x divide-gray-200">
      {stats.map((stat) => (
        <div
          key={stat.range}
          className="flex-1 p-1 flex flex-col items-center transition duration-150 hover:bg-gray-50 min-w-0 rounded-sm"
        >
          <p className="text-xs font-medium text-gray-500 mb-1">{stat.range}</p>
          <p
            className="text-xl font-semibold text-[#1f4a9b]" // Stronger color for numbers
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
// PKR Formatter
// ----------------------
const formatPKR = (value) => {
  if (!value || value === "N/A") return "N/A";

  // Clean value by removing commas, handle potential non-numeric input
  const number = Number(value.toString().replace(/,/g, ""));
  if (isNaN(number)) return value;

  // Use Intl.NumberFormat for professional currency formatting
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

// ----------------------
// New Cash Bank Card
// ----------------------
const NewCashBankCard = ({ balanceData, cardTitle = "Cash/Bank Balance" }) => {
  if (!balanceData) return null;

  const cashBalance = balanceData.CashBal || "N/A";
  const bankBalance = balanceData.BankBal || "N/A";

  const formattedCash = formatPKR(cashBalance);
  const formattedBank = formatPKR(bankBalance);

  return (
    <div
      className="p-3 rounded-xl shadow-lg bg-white border border-gray-100 flex flex-col justify-start gap-3 flex-shrink-0 transition-all duration-300 hover:shadow-xl"
      style={{ width: "320px", height: "280px" }}
    >
      {cardTitle && (
        <h3 className="text-lg font-bold text-gray-800 mb-3">{cardTitle}</h3>
      )}

      {/* Cash Balance Section */}
      <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-500 mb-1">Cash Balance</p>
        <h2 className="text-xl font-semibold text-[#1f4a9b] px-2">
          {formattedCash}
        </h2>
      </div>

      {/* Bank Balance Section */}
      <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-500 mb-1">Bank Balance</p>
        <h2 className="text-xl font-semibold text-[#1f4a9b] px-2">
          {formattedBank}
        </h2>
      </div>
    </div>
  );
};

// ----------------------
// DASHBOARD MAIN COMPONENT
// ----------------------
const AmericanDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [dailyWebData, setDailyWebData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aggingData, setAggingData] = useState(null); 

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const adminFormData = new FormData();
        adminFormData.append("code", "AMRELEC");

        const monthlyFormData = new FormData();
        monthlyFormData.append("code", "AMRELEC");
        monthlyFormData.append("FRepYer", "2025");

        const dailyFormData = new FormData();
        dailyFormData.append("code", "AMRELEC");
        dailyFormData.append("FRepDat", currentDate); // Uses dd-mm-yyyy
        dailyFormData.append("FLocCod", "001");

        const dailyWebFormData = new FormData();
        dailyWebFormData.append("code", "AMRELEC");
        dailyWebFormData.append("FRepDat", currentDate); // Uses dd-mm-yyyy
        dailyWebFormData.append("FLocCod", "001");

        const americanAggingFormData = new FormData();
        americanAggingFormData.append("code", "AMRELEC");
        // FIX: Use the new yyyy-mm-dd format for the Agging API as requested
        // americanAggingFormData.append("FRepDat", getAggingDateFormatted());  
        americanAggingFormData.append("FRepDat", "2025-11-27");  

        
        const [
          adminResponse,
          monthlyResponse,
          dailyResponse,
          dailyWebResponse,
        dailyAggingResponse,
          
        ] = await Promise.all([
          axios.post(ADMIN_INFO_API_URL, adminFormData),
          axios.post(MONTHLY_COMPARISON_API_URL, monthlyFormData),
          axios.post(DASHBOARD_DAILY, dailyFormData),
          axios.post(DASHBOARD_DAILY_WEB, dailyWebFormData),
          axios.post(AMERICAN_AGGING_API_URL, americanAggingFormData),
        ]);

        setAdminData(adminResponse.data);
        setMonthlyData(monthlyResponse.data);

        const dailyResponseData = Array.isArray(dailyResponse.data)
          ? dailyResponse.data[0]
          : dailyResponse.data;
        setDailyData(dailyResponseData);

        const dailyWebResponseData = Array.isArray(dailyWebResponse.data)
          ? dailyWebResponse.data[0]
          : dailyWebResponse.data;
        setDailyWebData(dailyWebResponseData);

        const aggingResponseData = Array.isArray(dailyAggingResponse.data)
          ? dailyAggingResponse.data[0]
          : dailyAggingResponse.data;
        setAggingData(aggingResponseData);
         
      } catch (err) {
        console.error("API Error:", err);
        // Note: Data remains null/previous state on error, which is why the null check below is crucial.
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

  // Null Checks (to prevent 'Cannot read properties of null (reading 'Amt001')' error)
  const mainData = (Array.isArray(adminData) ? adminData[0] : adminData) || {};
  const webData = dailyWebData || {};
  const aggingMainData = (Array.isArray(aggingData) ? aggingData[0] : aggingData) || {};
  
  // Prepare data for Horizontal Range Card
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

  // Prepare data for Horizontal Agging Range Card

  const newRangeAggingDataKeys = [
    { range: "≤ 30", amtKey: "Amt001", nosKey: "Nos001" },
    { range: "≤ 60", amtKey: "Amt002", nosKey: "Nos002" },
    { range: "≤ 90", amtKey: "Amt003", nosKey: "Nos003" },
    { range: "≤ 120", amtKey: "Amt004", nosKey: "Nos004" },
    { range: "≤ 180M", amtKey: "Amt005", nosKey: "Nos005" },
    { range: "> 180M", amtKey: "Amt006", nosKey: "Nos006" },
  ];

  const newRangeAggingStats = newRangeAggingDataKeys.map((item) => ({
    range: item.range,
    amount: aggingMainData[item.amtKey] || "N/A",
    numbers: aggingMainData[item.nosKey] || "N/A",
  }));

  const isMonthlyDataAvailable =
    monthlyData && Object.keys(monthlyData).length > 0;

  const salesData = parseData(monthlyData, "S");
  const purchaseData = parseData(monthlyData, "P");
  const expenseData = parseData(monthlyData, "E");
  const collectionData = parseData(monthlyData, "C");

  return (
    <div
      className="p-3 bg-gray-100 min-h-screen font-sans" 
      style={{
        overflowY: "auto", 
        overflowX: "auto", 
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <hr className="mb-3 border-gray-200" />

      {/* TOP CARDS: ADDED 'flex-nowrap' */}
      <section className="mb-5 flex flex-row gap-4 justify-start flex-nowrap"> 
        {" "}
        {/* Increased gap for breathing room */}
        <HorizontalBalanceCard mainData={mainData} cardTitle="Customer" />
        <NewSalesCard salesData={webData} cardTitle="Sale" />
        <NewPurchaseCard purchaseData={webData} cardTitle="Purchase" />
        <NewCollectionCard salesData={webData} cardTitle="Collection" />
        <NewPaymentCard salesData={webData} cardTitle="Payment" />
        <NewCashBankCard balanceData={webData} cardTitle="Cash & Bank Balance" />
      </section>

      {/* MIDDLE SECTION: ADDED 'flex-nowrap' */}
      <section className="mb-3">
        <div className="flex flex-row gap-4 justify-start flex-nowrap"> 
          {" "}
          {/* LEFT SIDE — CHART + RANGE (original left content) */}
          <div className="flex flex-col gap-4 flex-shrink-0">
            <div
              className="flex-shrink-0"
              style={{ width: "650px", height: "400px" }}
            >
              <div className="bg-white pt-3 px-6 pb-4 rounded-xl shadow-lg border h-full transition-all duration-300 hover:shadow-xl">
                {" "}
                {/* Soft shadow, increased padding */}
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
                  Monthly Performance Comparison (in Millions)
                </h3>
                <div className="h-[calc(100%-48px)]">
                  {" "}
                  {/* Adjusted height for title/padding */}
                  {isMonthlyDataAvailable ? (
                    <Bar
                      data={{
                        labels: months,
                        datasets: [
                          {
                            label: "Sales",
                            data: salesData,
                            backgroundColor: ChartColors.Sales,
                            borderRadius: 6,
                          },
                          {
                            label: "Purchase",
                            data: purchaseData,
                            backgroundColor: ChartColors.Purchase,
                            borderRadius: 6,
                          },
                          {
                            label: "Expense",
                            data: expenseData,
                            backgroundColor: ChartColors.Expense,
                            borderRadius: 6,
                          },
                          {
                            label: "Collection",
                            data: collectionData,
                            backgroundColor: ChartColors.Collection,
                            borderRadius: 6,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "top",
                            labels: { usePointStyle: true, padding: 20 },
                          },
                        },
                        scales: {
                          x: { grid: { display: false } },
                          y: {
                            ticks: {
                              callback: (value) => value + "M",
                              color: "#6b7280",
                            },
                            grid: { color: "rgba(0, 0, 0, 0.05)" },
                          },
                        },
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

            {/* ORIGINAL RANGE CARD (left side) */}
            <div className="flex-shrink-0" style={{ width: "650px" }}>
              <HorizontalRangeCard
                stats={newRangeStats}
                cardTitle="Customer Amount & Count by Range"
              />
            </div>
          </div>
          {/* RIGHT SIDE — (GRAPH + MOVED AGGING CARD) */}
          <div
            className="flex flex-col gap-4 flex-shrink-0"
            style={{ width: "650px" }} // Adjusted width to maintain alignment
          >
            {/* Yearly SPC Graph (unchanged position) */}
            <div style={{ width: "650px" }}>
              <YearlySPCGraph apiData={webData} />
            </div>

            {/* HorizontalAggingRangeCard*/}
            <div style={{ width: "650px" }}>
              <HorizontalAggingRangeCard
                stats={newRangeAggingStats}
                cardTitle="Admin Agging"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AmericanDashboard;