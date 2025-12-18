import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AmericanDashboard.css";
import { Bar } from "react-chartjs-2";
import { Chart } from "react-google-charts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController,
} from "chart.js";

// Register Chart.js components
import { Pie } from "react-chartjs-2";
import { ArcElement } from "chart.js";
ChartJS.register(ArcElement);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController
);

// API URLs
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

const ChartColors = {
  Sales: "rgba(79, 109, 255, 0.8)", // Softer, professional blue
  Purchase: "rgba(255, 126, 149, 0.8)", // Muted pink/red
  Expense: "rgba(255, 192, 90, 0.8)", // Warm yellow/orange
  Collection: "rgba(43, 190, 185, 0.8)", // Calm teal
  YearlySales: "#5790FF", // Lighter blue for yearly Sales
  YearlyPurchase: "#FFADAD", // Softer red for yearly Purchase
  YearlyCollection: "#A0FFD1", // Mint green for yearly Collection
};

const YearlySPCGraph = ({ apiData }) => {
  const YearBar = Bar;
  if (!apiData) return null;

  const dateParts = currentDate.split("-");
  const currentYear = parseInt(dateParts[2], 10);
  const lastYear = currentYear - 1;

  const formatToMillions = (value) => {
    if (!value) return 0;
    const number = Number(value.toString().replace(/,/g, ""));
    return number / 1_000_000;
  };

  const lastYearSale = formatToMillions(apiData.LastYearSaleAmount);
  const currentYearSale = formatToMillions(apiData.YearSaleAmount);
  const lastYearPur = formatToMillions(apiData.LastYearPurAmount);
  const currentYearPur = formatToMillions(apiData.YearPurAmount);
  const lastYearCollection = formatToMillions(apiData.LastYearCollection);
  const currentYearCollection = formatToMillions(apiData.CurrentYearCollection);

  const data = {
    labels: [String(lastYear), String(currentYear)],
    datasets: [
      {
        label: "Sales",
        data: [lastYearSale, currentYearSale],
        backgroundColor: ChartColors.YearlySales,
        borderRadius: 8,
        barThickness: 12,
      },
      {
        label: "Purchase",
        data: [lastYearPur, currentYearPur],
        backgroundColor: ChartColors.YearlyPurchase,
        borderRadius: 8,
        barThickness: 12,
      },
      {
        label: "Collection",
        data: [lastYearCollection, currentYearCollection],
        backgroundColor: ChartColors.YearlyCollection,
        borderRadius: 8,
        barThickness: 12,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 6,
          font: { size: 11, weight: 600 },
        },
      },
      // title: {
      //   display: true,
      //   text: "Yearly Comparison (in Millions)",
      //   color: "#111827",
      //   font: { size: 13, weight: 600 },
      // },
    },
    scales: {
      x: {
        ticks: { callback: (value) => value + "M", color: "#6b7280" },
        grid: { display: true, color: "rgba(0,0,0,0.04)" },
        border: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { color: "#4b5563" },
        border: { display: false },
      },
    },
  };

  return (
    <div className="w-full h-[170px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-center">
      <YearBar data={data} options={options} />
    </div>
  );
};

const StaffCashSummaryCard = ({ balanceData, webData }) => {
  if (!balanceData || !webData) return null;

  const cashBalance = balanceData.CashBal || "N/A";
  const bankBalance = balanceData.BankBal || "N/A";

  const formattedCash = cashBalance;
  const formattedBank = bankBalance;

  return (
    <div className="w-full h-[170px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-between">
      {/* 🔹 TOP CASH/BANK ROW */}
      <div className="flex justify-between px-1">
        <div className="flex flex-col justify-center p-1">
          <p className="text-[15px] font-semibold text-black">Cash</p>
          <h4
            className="text-[15px] font-semibold text-indigo-800 cursor-pointer hover:underline"
            onClick={() =>
              window.open(
                window.location.origin + "/crystalsol/AmericanCashReport",
                "_blank"
              )
            }
          >
            {formattedCash}
          </h4>
        </div>

        <div className="flex flex-col justify-center p-1">
          <p className="text-[15px] font-semibold text-black">Bank</p>

          <h4
            className="text-[15px] font-semibold text-indigo-800 cursor-pointer hover:underline"
            onClick={() =>
              window.open(
                window.location.origin + "/crystalsol/AmericanBankReport",
                "_blank"
              )
            }
          >
            {formattedBank}
          </h4>
        </div>
      </div>

      {/* 🔹 STAFF GRID */}
      <div className="grid grid-cols-2 grid-rows-2 text-center leading-tight flex-1 mt-1 border-t border-gray-200">
        {/* SalesMan */}
        <div className="flex flex-col justify-center border-r border-b border-gray-100 p-1">
          <p className="text-[14px] text-gray-800">
            SalesMan:
            <span
              className="text-[16px] font-semibold text-sky-700 pl-1 cursor-pointer hover:underline"
              onClick={() =>
                window.open(
                  window.location.origin + "/crystalsol/AmericanSalesManReport",
                  "_blank"
                )
              }
            >
              {webData?.SalesMan || "-"}
            </span>
          </p>
        </div>

        {/* City */}
        {/* <div className="flex flex-col justify-center border-b border-gray-100 p-1">
          <p className="text-[14px] text-gray-800">
            City:
            <span className="text-[16px] font-semibold text-sky-700 pl-1">
              {webData?.Stores || "-"}
            </span>
          </p>
        </div> */}

        {/* City */}
        <div className="flex flex-col justify-center border-r border-b border-gray-100 p-1">
          <p className="text-[14px] text-gray-800">
            City:
            <span
              className="text-[16px] font-semibold text-sky-700 pl-1 cursor-pointer hover:underline"
              onClick={() =>
                window.open(
                  window.location.origin + "/crystalsol/AmericanCityReport",
                  "_blank"
                )
              }
            >
              {webData?.City || "-"}
            </span>
          </p>
        </div>

        {/* Region */}
        <div className="flex flex-col justify-center border-r border-b border-gray-100 p-1">
          <p className="text-[14px] text-gray-800">
            Region:
            <span
              className="text-[16px] font-semibold text-sky-700 pl-1 cursor-pointer hover:underline"
              onClick={() =>
                window.open(
                  window.location.origin + "/crystalsol/AmericanRegionReport",
                  "_blank"
                )
              }
            >
              {webData?.Region || "-"}
            </span>
          </p>
        </div>

        {/* Managers */}
        <div className="flex flex-col justify-center p-1">
          <p className="text-[14px] text-gray-800">
            Managers:
            <span className="text-[16px] font-semibold text-sky-700 pl-1">
              {webData?.Managers || "-"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const FinancialPieChart = ({ webData, balanceData }) => {
  if (!webData || !balanceData) return null;

  // ===== HELPER =====
  const toNumber = (val) =>
    Number((val || "0").toString().replace(/,/g, "")) || 0;

  const safeValue = (val) => Math.abs(val || 0);

  // ===== RAW VALUES (CAN BE NEGATIVE) =====
  const receivableRaw = toNumber(webData?.Receivable);
  const payableRaw = toNumber(webData?.Payable);
  const stockRaw = toNumber(webData?.["Total Stock"]);
  const expenseRaw = toNumber(webData?.Expense);
  const cashRaw = toNumber(balanceData?.CashBal);
  const bankRaw = toNumber(balanceData?.BankBal);

  // ===== SAFE VALUES FOR PIE (NO NEGATIVES) =====
  const receivable = safeValue(receivableRaw);
  const payable = safeValue(payableRaw);
  const stock = safeValue(stockRaw);
  const expense = safeValue(expenseRaw);
  const cash = safeValue(cashRaw);
  const bank = safeValue(bankRaw);

  // ===== GOOGLE CHART DATA =====
  const chartData = [
    ["Type", "Amount"],
    ["Receivable", receivable],
    ["Payable", payable],
    ["Stock", stock],
    ["Expense", expense],
    ["Cash", cash],
    ["Bank", bank],
  ];

  // ===== COLORS (VALID FOR GOOGLE CHARTS) =====
  const colors = [
    "#4F6DFF", // Receivable
    "#FF7E95", // Payable
    "#FFD66B", // Stock
    "#2BBEB9", // Expense
    "#7A5EFF", // Cash
    "#6FCF97", // Bank
  ];

  // ===== CHART OPTIONS (REAL 3D) =====
  const options = {
    is3D: true,
    pieHole: 0.35,
    pieStartAngle: 100,
    legend: "none", // custom legend
    colors,
    chartArea: {
      width: "95%",
      height: "90%",
    },
  };

  return (
    <div className="w-full h-[170px] bg-white shadow-md border border-gray-200 p-2 rounded-xl flex">
      {/* ===== LEFT SIDE VERTICAL LEGEND ===== */}
      <div className="w-[40%] flex flex-col justify-center space-y-2 pr-2">
        {[
          { label: "Receivable", raw: receivableRaw, color: colors[0] },
          { label: "Payable", raw: payableRaw, color: colors[1] },
          { label: "Stock", raw: stockRaw, color: colors[2] },
          { label: "Expense", raw: expenseRaw, color: colors[3] },
          { label: "Cash", raw: cashRaw, color: colors[4] },
          { label: "Bank", raw: bankRaw, color: colors[5] },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            {/* Color Dot */}
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />

            {/* Label */}
            <span className="text-[11px] text-gray-600 truncate">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* ===== RIGHT SIDE REAL 3D PIE ===== */}
      <div className="w-[60%] h-full">
        <Chart
          chartType="PieChart"
          data={chartData}
          options={options}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};
const FinanceSummaryCard = ({ webData }) => {
  if (!webData) return null;

  return (
    <div className="w-full h-[170px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-between">
      {/* HEADER */}
      <p className="text-[14px] font-medium text-black">Financial Summary</p>

      {/* GRID */}
      <div className="grid grid-cols-2 grid-rows-2 text-center leading-tight flex-1">
        <div className="flex flex-col justify-center border-r border-b border-gray-200 p-1">
          <p className="text-[12px] text-gray-800">Receivable</p>
          <h4 className="text-[15px] font-semibold text-indigo-800">
            {webData?.Receivable || "-"}
          </h4>
        </div>

        <div className="flex flex-col justify-center border-b border-gray-200 p-1">
          <p className="text-[12px] text-gray-800">Payable</p>
          <h4 className="text-[15px] font-semibold text-indigo-800">
            {webData?.Payable || "-"}
          </h4>
        </div>

        <div className="flex flex-col justify-center border-r border-gray-200 p-1">
          <p className="text-[12px] text-gray-800">Stock</p>
          <h4 className="text-[15px] font-semibold text-indigo-800">
            {webData?.["Total Stock"] || "-"}
          </h4>
        </div>

        <div className="flex flex-col justify-center p-1">
          <p className="text-[12px] text-gray-800">Expense</p>
          <h4 className="text-[15px] font-semibold text-indigo-800">
            {webData?.Expense || "-"}
          </h4>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// Horizontal Balance Card
// ----------------------
const HorizontalBalanceCard = ({ mainData, cardTitle = null }) => {
  const formatValue = (key) => mainData[key] || "N/A";

  return (
    <div className="w-full h-[170px] bg-white shadow-sm border border-gray-100 p-2 flex flex-col gap-1 rounded-lg transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[16px] font-medium text-black">Customers</p>
          <h2 className="text-2xl font-semibold text-indigo-800 mt-1">
            {formatValue("Total Customer")}
          </h2>
        </div>

        <div className="text-right">
          <p className="text-[11px] font-medium text-gray-500">Total Balance</p>

          <h2
            className="text-xl font-semibold text-gray-900 mt-1 cursor-pointer hover:text-blue-600 transition"
            onClick={() =>
              window.open(
                window.location.origin + "/crystalsol/TotalCustomers",
                "_blank"
              )
            }
          >
            {formatValue("Total Balance")}
          </h2>
        </div>
      </div>
      <div className="border-t border-gray-200 my-1"></div>
      <div className="grid grid-cols-4 gap-1 pb-1 text-center p-1">
        <div className="flex flex-col px-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">Non-Act</p>
          <h4 className="text-lg font-semibold text-sky-700">
            {formatValue("Non Active")}
          </h4>
          <p
            className="text-[11px] text-gray-500 mt-1 cursor-pointer hover:underline"
            title={formatValue("Non Active")}
            onClick={() =>
              window.open(
                window.location.origin + "/crystalsol/AmericanNonActive",
                "_blank"
              )
            }
          >
            {formatValue("Non Active Amount")}
          </p>
        </div>

        <div className="flex flex-col px-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">Advance</p>
          <h4 className="text-lg font-semibold text-sky-700">
            {formatValue("Advance Customer")}
          </h4>
          <p
            className="text-[11px] ext-emerald-600 mt-1 cursor-pointer hover:underline"
            title={formatValue("Advance Amount")}
            onClick={() =>
              window.open(
                window.location.origin + "/crystalsol/AmericanAdvance",
                "_blank"
              )
            }
          >
            {formatValue("Advance Amount")}
          </p>
        </div>

        <div className="flex flex-col px-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">Nil</p>
          <h4 className="text-lg font-semibold text-sky-700">
            {formatValue("Nil Customer")}
          </h4>
          <p
            className="text-[11px] text-gray-500 mt-1 cursor-pointer hover:underline"
            title={formatValue("Nil Amount")}
            onClick={() =>
              window.open(
                window.location.origin + "/crystalsol/AmericanNil",
                "_blank"
              )
            }
          >
            {formatValue("Nil Amount")}
          </p>
        </div>

        <div className="flex flex-col px-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">
            Outstanding
          </p>
          <h4 className="text-lg font-semibold text-sky-700">
            {formatValue("OutStanding Customer")}
          </h4>
          <p
            className="text-[11px] text-red-500 mt-1 cursor-pointer hover:underline"
            title={formatValue("OutStanding Amount")}
            onClick={() =>
              window.open(
                window.location.origin + "/crystalsol/AmericanOutstanding",
                "_blank"
              )
            }
          >
            {formatValue("OutStanding Amount")}
          </p>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// New Sales Card (COMPACT)
// ----------------------
const NewSalesCard = ({ salesData }) => {
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
    <div className="w-full h-[170px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-between">
      {/* HEADER */}
      <p className="text-[16px] font-medium text-black">Sale</p>

      {/* TOP 2024 & 2025 */}
      <div className="grid grid-cols-2 gap-1 leading-tight">
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-700">{lastYear}</p>
          <h4 className="text-[16px] font-semibold text-indigo-800">
            {quantity2024}
          </h4>
          <p className="text-[10px] text-gray-500">{amount2024}</p>
        </div>

        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-700">{currentYear}</p>
          <h4 className="text-[16px] font-semibold text-indigo-800">
            {quantity2025}
          </h4>
          <p className="text-[10px] text-gray-500">{amount2025}</p>
        </div>
      </div>

      {/* BOTTOM STATS */}
      <div className="grid grid-cols-3 gap-1 text-center leading-tight">
        <div>
          <p className="text-[10px] text-gray-500">{labelLastYearSameMonth}</p>
          <h4 className="text-[14px] font-semibold text-sky-700">
            {lastYearMonthQuantity}
          </h4>
          <p className="text-[10px] text-gray-500 mt-[-2px]">
            {lastYearMonthAmount}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-gray-500">{labelCurrentMonth}</p>
          <h4 className="text-[14px] font-semibold text-sky-700">
            {currentMonthQuantity}
          </h4>
          <p className="text-[10px] text-gray-500 mt-[-2px]">
            {currentMonthAmount}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-gray-500">{labelPreviousMonth}</p>
          <h4 className="text-[14px] font-semibold text-sky-700">
            {previousMonthQuantity}
          </h4>
          <p className="text-[10px] text-gray-500 mt-[-2px]">
            {previousMonthAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// New Purchase Card (COMPACT LIKE SALES)
// ----------------------
const NewPurchaseCard = ({ purchaseData }) => {
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
    <div className="w-full h-[170px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-between">
      {/* HEADER */}
      <p className="text-[16px] font-medium text-black">Purchase</p>

      {/* TOP 2024 & 2025 */}
      <div className="grid grid-cols-2 gap-1 text-center leading-tight">
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-800">{lastYear}</p>
          <h4 className="text-[16px] font-semibold text-indigo-800">
            {quantityLastYear}
          </h4>
          <p className="text-[10px] text-gray-500">{amountLastYear}</p>
        </div>

        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-800">{currentYear}</p>
          <h4 className="text-[16px] font-semibold text-indigo-800">
            {quantityCurrentYear}
          </h4>
          <p className="text-[10px] text-gray-500">{amountCurrentYear}</p>
        </div>
      </div>

      {/* BOTTOM STATS */}
      <div className="grid grid-cols-3 gap-1 text-center leading-tight">
        <div>
          <p className="text-[10px] font-bold text-gray-800">
            {labelLastYearSameMonth}
          </p>
          <h4 className="text-[14px] font-semibold text-sky-700">
            {lastYearMonthQuantity}
          </h4>
          <p className="text-[10px] text-gray-500 mt-[-2px]">
            {lastYearMonthAmount}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-gray-800">
            {labelCurrentMonth}
          </p>
          <h4 className="text-[14px] font-semibold text-sky-700">
            {currentMonthQuantity}
          </h4>
          <p className="text-[10px] text-gray-500 mt-[-2px]">
            {currentMonthAmount}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-gray-800">
            {labelPreviousMonth}
          </p>
          <h4 className="text-[14px] font-semibold text-sky-700">
            {previousMonthQuantity}
          </h4>
          <p className="text-[10px] text-gray-500 mt-[-2px]">
            {previousMonthAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

const NewCollectionPaymentCard = ({ salesData }) => {
  if (!salesData) return null;

  // ===== YEAR & MONTH NAME ======
  const dateParts = currentDate.split("-");
  const currentMonthIndex = parseInt(dateParts[1], 10) - 1;
  const currentYear = parseInt(dateParts[2], 10);

  const currentMonthName = months[currentMonthIndex];
  let previousMonthIndex = currentMonthIndex - 1;
  if (previousMonthIndex < 0) previousMonthIndex = 11;
  const previousMonthName = months[previousMonthIndex];

  const labelDec = `${currentMonthName} ${currentYear}`;
  const labelNov = `${previousMonthName} ${currentYear}`;

  // ========== COLLECTION ==========
  const totalCollection2025 = salesData.CurrentYearCollection || "N/A";
  const decCollection = salesData.MonthCollection || "N/A";
  const novCollection = salesData.PreviousMonthCollection || "N/A";

  // ========== PAYMENT ==========
  const totalPayment2025 = salesData.CurrentYearPayment || "N/A";
  const decPayment = salesData.MonthPayment || "N/A";
  const novPayment = salesData.PreviousMonthPayment || "N/A";

  return (
    <div className="w-full h-[170px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-between leading-tight">
      {/* COLLECTION */}
      <div>
        <p className="text-[14px] font-medium text-black">
          Collection {totalCollection2025}
        </p>

        <div className="grid grid-cols-2 text-center mt-1">
          <div>
            <p className="text-[10px] text-gray-500">{labelDec}</p>
            <p className="text-[14px] font-semibold text-sky-700">
              {decCollection}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-gray-500">{labelNov}</p>
            <p className="text-[14px] font-semibold text-sky-700">
              {novCollection}
            </p>
          </div>
        </div>
      </div>

      {/* PAYMENT */}
      <div>
        <p className="text-[14px] font-medium text-black">
          Payment {totalPayment2025}
        </p>

        <div className="grid grid-cols-2 text-center mt-1">
          <div>
            <p className="text-[10px] text-gray-500">{labelDec}</p>
            <p className="text-[14px] font-semibold text-emerald-700">
              {decPayment}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-gray-500">{labelNov}</p>
            <p className="text-[14px] font-semibold text-emerald-700">
              {novPayment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewCollectionCard = ({ salesData }) => {
  if (!salesData) return null;

  const amount2024 = salesData.LastYearCollection || "N/A";
  const amount2025 = salesData.CurrentYearCollection || "N/A";

  const currentMonthAmount = salesData.MonthCollection || "N/A";
  const previousMonthAmount = salesData.PreviousMonthCollection || "N/A";

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
    <div className="w-full h-[170px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-between">
      {/* HEADER */}
      <p className="text-[16px] font-medium text-black">Collection</p>

      {/* TOP 2024 & 2025 VALUES */}
      <div className="flex justify-between leading-tight">
        <div className="text-left">
          <p className="text-[10px] text-gray-500">{lastYear}</p>
          <h4 className="text-[16px] font-semibold text-indigo-800">
            {amount2024}
          </h4>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-gray-500">{currentYear}</p>
          <h4 className="text-[16px] font-semibold text-indigo-800">
            {amount2025}
          </h4>
        </div>
      </div>

      {/* BOTTOM STATS */}
      <div className="grid grid-cols-2 gap-1 text-center leading-tight">
        <div>
          <p className="text-[10px] text-gray-500">{labelCurrentMonth}</p>
          <h4 className="text-[14px] font-semibold text-sky-700">
            {currentMonthAmount}
          </h4>
        </div>

        <div>
          <p className="text-[10px] text-gray-500">{labelPreviousMonth}</p>
          <h4 className="text-[14px] font-semibold text-sky-700">
            {previousMonthAmount}
          </h4>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// New Payment Card (Compact)
// ----------------------
const NewPaymentCard = ({ salesData }) => {
  if (!salesData) return null;

  const amount2024 = salesData.LastYearPayment || "N/A";
  const amount2025 = salesData.CurrentYearPayment || "N/A";
  const currentMonthAmount = salesData.MonthPayment || "N/A";
  const previousMonthAmount = salesData.PreviousMonthPayment || "N/A";

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
    <div className="w-full h-[170px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-between">
      {/* HEADER */}
      <p className="text-[16px] font-medium text-black">Payment</p>

      {/* TOP YEAR VALUES */}
      <div className="flex justify-between leading-tight">
        <div className="text-left">
          <p className="text-[10px] text-gray-500">{lastYear}</p>
          <h4 className="text-[16px] font-semibold text-indigo-800">
            {amount2024}
          </h4>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-gray-500">{currentYear}</p>
          <h4 className="text-[16px] font-semibold text-indigo-800">
            {amount2025}
          </h4>
        </div>
      </div>

      {/* BOTTOM STATS */}
      <div className="grid grid-cols-2 gap-1 text-center leading-tight">
        <div>
          <p className="text-[10px] text-gray-500">{labelCurrentMonth}</p>
          <h4 className="text-[14px] font-semibold text-sky-700">
            {currentMonthAmount}
          </h4>
        </div>

        <div>
          <p className="text-[10px] text-gray-500">{labelPreviousMonth}</p>
          <h4 className="text-[14px] font-semibold text-sky-700">
            {previousMonthAmount}
          </h4>
        </div>
      </div>
    </div>
  );
};

const rangeApiMapping = {
  "≤ 0 (Nil)": { FIntAmt: -9999999999, FFnlAmt: 0 },
  "< 1M": { FIntAmt: 1, FFnlAmt: 1000000 },
  "< 2M": { FIntAmt: 1000001, FFnlAmt: 2000000 },
  "< 5M": { FIntAmt: 2000001, FFnlAmt: 5000000 },
  "< 10M": { FIntAmt: 5000001, FFnlAmt: 10000000 },
  "> 100M": { FIntAmt: 10000001, FFnlAmt: 9999999999 },
};

const HorizontalRangeCard = ({ stats }) => {
  const handleRangeClick = (rangeLabel) => {
    const mapping = rangeApiMapping[rangeLabel];
    if (!mapping) return;

    const { FIntAmt, FFnlAmt } = mapping;

    const url =
      window.location.origin +
      `/crystalsol/CustomerBalance?min=${FIntAmt}&max=${FFnlAmt}&label=${encodeURIComponent(
        rangeLabel
      )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="w-full h-[170px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-between">
      {/* HEADER */}
      <p className="text-[14px] font-semibold text-black leading-none pl-1">
        Customer Range
      </p>

      {/* BODY */}
      <div className="flex justify-between flex-1">
        {stats.map((stat) => (
          <div
            key={stat.range}
            onClick={() => handleRangeClick(stat.range)}
            className="flex-1 flex flex-col items-center justify-evenly cursor-pointer hover:bg-gray-50 transition"
          >
            <p className="text-[12px] font-medium text-gray-600 leading-none">
              {stat.range}
            </p>

            <p
              className="text-[16px] font-semibold text-indigo-800 leading-none"
              title={`Customers: ${stat.numbers}`}
            >
              {String(stat.numbers)}
            </p>

            <p
              className="text-[10px] font-medium text-gray-600 leading-none"
              title={`Amount: ${stat.amount}`}
            >
              {String(stat.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const aggingDayMapping = {
  "≤ 30": 1,
  "≤ 60": 2,
  "≤ 90": 3,
  "≤ 120": 4,
  "≤ 180M": 5,
  "> 180M": 6,
};

const handleAggingClick = (rangeLabel) => {
  const dayNum = aggingDayMapping[rangeLabel];
  if (!dayNum) return;

  const url =
    window.location.origin +
    `/crystalsol/AmericanAdminAgging?min=${dayNum}&label=${encodeURIComponent(
      rangeLabel
    )}`;

  window.open(url, "_blank");
};

const HorizontalAggingRangeCard = ({ stats }) => (
  <div className="w-full h-[170px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-between">
    {/* HEADER */}
    <p className="text-[14px] font-semibold text-black leading-none pl-1">
      Customer Agging
    </p>

    {/* BODY */}
    <div className="flex justify-between flex-1">
      {stats.map((stat) => (
        <div
          key={stat.range}
          onClick={() => handleAggingClick(stat.range)}
          className="flex-1 flex flex-col items-center justify-evenly cursor-pointer hover:bg-gray-50 transition"
        >
          <p className="text-[12px] font-medium text-gray-600 leading-none">
            {stat.range}
          </p>

          <p
            className="text-[16px] font-semibold text-indigo-800 leading-none"
            title={`Customers: ${stat.numbers}`}
          >
            {String(stat.numbers)}
          </p>

          <p
            className="text-[10px] font-medium text-gray-600 leading-none"
            title={`Amount: ${stat.amount}`}
          >
            {String(stat.amount)}
          </p>
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

  const number = Number(value.toString().replace(/,/g, ""));
  if (isNaN(number)) return value;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

const CustomerDistributionChart = ({ mainData }) => {
  if (!mainData) return null;

  const outstanding =
    Number(
      (mainData?.["OutStanding Customer"] || "0").toString().replace(/,/g, "")
    ) || 0;

  const nil =
    Number((mainData?.["Nil Customer"] || "0").toString().replace(/,/g, "")) ||
    0;

  const advance =
    Number(
      (mainData?.["Advance Customer"] || "0").toString().replace(/,/g, "")
    ) || 0;

  const nonActive =
    Number((mainData?.["Non Active"] || "0").toString().replace(/,/g, "")) || 0;

  const chartData = [
    ["Customer Type", "Count"],
    ["Outstanding", outstanding],
    ["Nil", nil],
    ["Advance", advance],
    ["Non Active", nonActive],
  ];

  const colors = ["#109744", "#805620", "#FFD66B", "#B3BBC6"];

  const options = {
    is3D: true,
    pieHole: 0.35,
    pieStartAngle: 100,
    legend: "none", // ❌ disable default legend
    colors,
    chartArea: {
      width: "95%",
      height: "90%",
    },
  };

  return (
    <div className="w-full h-[170px] bg-white shadow-md border border-gray-200 p-2 rounded-lg flex">
      {/* LEFT SIDE VERTICAL LABELS */}
      <div className="w-[40%] flex flex-col justify-center space-y-2 pr-2">
        {[
          { label: "Outstanding", value: outstanding, color: colors[0] },
          { label: "Nil", value: nil, color: colors[1] },
          { label: "Advance", value: advance, color: colors[2] },
          { label: "Non Active", value: nonActive, color: colors[3] },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            {/* Color Dot */}
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />

            {/* Label */}
            <span className="text-[11px] text-gray-600 truncate">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE 3D PIE */}
      <div className="w-[50%] h-full">
        <Chart
          chartType="PieChart"
          data={chartData}
          options={options}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

// ----------------------
// DASHBOARD MAIN COMPONENT
// ----------------------
const ElectronicsDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [dailyWebData, setDailyWebData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aggingData, setAggingData] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2025");

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
        dailyFormData.append("FRepDat", currentDate);
        dailyFormData.append("FLocCod", "001");

        const dailyWebFormData = new FormData();
        dailyWebFormData.append("code", "AMRELEC");
        dailyWebFormData.append("FRepDat", currentDate);
        dailyWebFormData.append("FLocCod", "001");

        const americanAggingFormData = new FormData();
        americanAggingFormData.append("code", "AMRELEC");
        americanAggingFormData.append("FRepDat", getAggingDateFormatted());
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

        let admin = adminResponse.data;
        if (Array.isArray(admin)) {
          admin = admin.length ? admin[0] : {};
        }
        if (typeof admin !== "object") admin = {};
        setAdminData(admin);

        let monthly = monthlyResponse.data;
        if (!monthly || typeof monthly !== "object") monthly = {};
        setMonthlyData(monthly);

        let daily = dailyResponse.data;
        if (Array.isArray(daily)) {
          daily = daily.length ? daily[0] : {};
        }
        if (!daily || typeof daily !== "object") daily = {};
        setDailyData(daily);
        let web = dailyWebResponse.data;
        if (Array.isArray(web)) {
          web = web.length ? web[0] : {};
        }
        if (!web || typeof web !== "object") web = {};
        web = {
          SalesMan: web.SalesMan || "0",
          Stores: web.Stores || web.City || "0",
          Region: web.Region || "0",
          Managers: web.Managers || "0",
          ...web,
        };

        setDailyWebData(web);
        let agging = dailyAggingResponse.data;

        if (agging && agging.Detail) {
          agging = agging;
        } else if (Array.isArray(agging)) {
          agging = agging.length ? agging[0] : {};
        } else {
          agging = {};
        }

        setAggingData(agging);
      } catch (err) {
        console.error("API Error:", err);
        setAdminData({});
        setMonthlyData({});
        setDailyData({});
        setDailyWebData({});
        setAggingData({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-50">
        <div class="three-body">
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
        </div>
        <div className="text-gray-500 text-sm tracking-wide">Loading data…</div>
      </div>
    );

  const mainData = (Array.isArray(adminData) ? adminData[0] : adminData) || {};
  const webData = dailyWebData || {};
  const aggingMainData =
    (Array.isArray(aggingData) ? aggingData[0] : aggingData) || {};

  const newRangeDataKeys = [
    { range: "≤ 0 (Nil)", amtKey: "Amt001", nosKey: "Nos001" },
    { range: "< 1M", amtKey: "Amt002", nosKey: "Nos002" },
    { range: "< 2M", amtKey: "Amt003", nosKey: "Nos003" },
    { range: "< 5M", amtKey: "Amt004", nosKey: "Nos004" },
    { range: "< 10M", amtKey: "Amt005", nosKey: "Nos005" },
    { range: "> 100M", amtKey: "Amt006", nosKey: "Nos006" },
  ];

  const newRangeStats = newRangeDataKeys.map((item) => ({
    range: item.range,
    amount: mainData[item.amtKey] || "N/A",
    numbers: mainData[item.nosKey] || "N/A",
  }));

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
    <div className="dashboard-wrapper">
      <div className="american-dashboard">
        <div
          className="dashboard-zoom"
          style={{
            fontFamily:
              '"SF Pro Display","SF Pro Text",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
          }}
        >
          <div className="max-w-7xl mx-auto gap-2 mt-1">
            {/* TOP METRIC CARDS */}
            <section className="mb-2 grid gap-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
              <HorizontalBalanceCard mainData={mainData} cardTitle="Customer" />
              <NewSalesCard salesData={webData} cardTitle="Sale" />
              <NewPurchaseCard purchaseData={webData} cardTitle="Purchase" />
              <NewCollectionPaymentCard salesData={webData} />
              <CustomerDistributionChart mainData={mainData} />
              <FinancialPieChart webData={webData} balanceData={webData} />
              <FinanceSummaryCard webData={webData} />
              <StaffCashSummaryCard balanceData={webData} webData={webData} />
            </section>

            {/* --- BIG LOWER SECTION --- */}
            <section className="grid gap-2 mt-0">
              {/* ⭐ ROW 1: SPC + Range + Agging (3 Cards) */}
              <div className="grid gap-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                <YearlySPCGraph apiData={webData} />
                <HorizontalRangeCard stats={newRangeStats} />
                <HorizontalAggingRangeCard stats={newRangeAggingStats} />
              </div>

              {/* ⭐ ROW 2: Monthly Graph (FULL WIDTH) */}
              {/* <div className="bg-white rounded-lg shadow-sm border border-gray-100 pt-3 px-4 pb-4 h-[300px] w-[660px]"> */}
              <div className="relative bg-white rounded-lg shadow-sm border border-gray-100 pt-3 px-4 pb-4 h-[300px] w-[660px]">
                {/* 🔽 YEAR DROPDOWN (TOP RIGHT) */}
                <div className="absolute top-2 right-3 z-10">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="border border-gray-300 text-xs rounded-md px-1 py-1 focus:outline-none focus:ring-0"
                  >
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>

                <div className="h-[calc(100%-10px)]">
                  {isMonthlyDataAvailable ? (
                    (() => {
                      // ==== CALCULATING AVERAGES ====
                      const avgSales =
                        salesData.reduce((a, b) => a + b, 0) / salesData.length;
                      const avgPurchase =
                        purchaseData.reduce((a, b) => a + b, 0) /
                        purchaseData.length;
                      const avgExpense =
                        expenseData.reduce((a, b) => a + b, 0) /
                        expenseData.length;
                      const avgCollection =
                        collectionData.reduce((a, b) => a + b, 0) /
                        collectionData.length;

                      return (
                        <Bar
                          data={{
                            labels: months,
                            datasets: [
                              {
                                label: "Sales",
                                data: salesData,
                                backgroundColor: ChartColors.Sales,
                                borderRadius: 8,
                              },
                              {
                                label: "Purchase",
                                data: purchaseData,
                                backgroundColor: ChartColors.Purchase,
                                borderRadius: 8,
                              },
                              {
                                label: "Expense",
                                data: expenseData,
                                backgroundColor: ChartColors.Expense,
                                borderRadius: 8,
                              },
                              {
                                label: "Collection",
                                data: collectionData,
                                backgroundColor: ChartColors.Collection,
                                borderRadius: 8,
                              },

                              // ---------- AVERAGE LINES ----------
                              {
                                label: "Sales (Avg)",
                                data: months.map(() => avgSales),
                                type: "line",
                                borderColor: ChartColors.Sales,
                                borderWidth: 1.4,
                                pointRadius: 0,
                                fill: false,
                                borderDash: [5, 5], // dotted line to distinguish
                                hidden: !salesData.some((v) => v !== 0),
                              },
                              {
                                label: "Purchase (Avg)",
                                data: months.map(() => avgPurchase),
                                type: "line",
                                borderColor: ChartColors.Purchase,
                                borderWidth: 1.4,
                                pointRadius: 0,
                                fill: false,
                                borderDash: [5, 5],
                                hidden: !purchaseData.some((v) => v !== 0),
                              },
                              {
                                label: "Expense (Avg)",
                                data: months.map(() => avgExpense),
                                type: "line",
                                borderColor: ChartColors.Expense,
                                borderWidth: 1.4,
                                pointRadius: 0,
                                fill: false,
                                borderDash: [5, 5],
                                hidden: !expenseData.some((v) => v !== 0),
                              },
                              {
                                label: "Collection (Avg)",
                                data: months.map(() => avgCollection),
                                type: "line",
                                borderColor: ChartColors.Collection,
                                borderWidth: 1.4,
                                pointRadius: 0,
                                fill: false,
                                borderDash: [5, 5],
                                hidden: !collectionData.some((v) => v !== 0),
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,

                            plugins: {
                              legend: {
                                position: "top",
                                labels: { usePointStyle: true, padding: 16 },
                                filter: (legendItem, chartData) => {
                                  return !legendItem.text.includes("(Avg)");
                                },
                              },
                            },

                            scales: {
                              x: { grid: { display: false } },
                              y: {
                                ticks: {
                                  callback: (value) => `${value / 1_000_000}M`,
                                  color: "#6b7280",
                                },
                                grid: { color: "rgba(0,0,0,0.04)" },
                              },
                            },
                          }}
                        />
                      );
                    })()
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                      Monthly comparison data not available.
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicsDashboard;
