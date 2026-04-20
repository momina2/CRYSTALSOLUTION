import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NasirTradersDashboard.css";
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
import { getOrganisationData } from "../Auth";

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
  LineController,
);
// API URLs
const DASHBOARD_DAILY = "https://crystalsolutions.pk/api/DashboardDaily.php";

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

// const YearlySPCGraph = ({ dailyData }) => {
//   if (!dailyData) return null;

//   const dateParts = currentDate.split("-");
//   const currentYear = parseInt(dateParts[2], 10);
//   const lastYear = currentYear - 1;

//   const toMillion = (value) => {
//     if (!value) return 0;
//     const num = Number(value.toString().replace(/,/g, ""));
//     return num / 1_000_000;
//   };

//   const data = {
//     labels: [String(lastYear), String(currentYear)],
//     datasets: [
//       {
//         label: "Sales",
//         data: [
//           toMillion(dailyData.LastYearSaleAmount),
//           toMillion(dailyData.YearSaleAmount),
//         ],
//         backgroundColor: "#5790FF",
//         borderRadius: 6,
//         barThickness: 10,
//       },
//       {
//         label: "Purchase",
//         data: [
//           toMillion(dailyData.LastYearPurAmount),
//           toMillion(dailyData.YearPurAmount),
//         ],
//         backgroundColor: "#FFADAD",
//         borderRadius: 6,
//         barThickness: 10,
//       },
//       {
//         label: "Collection",
//         data: [
//           toMillion(dailyData.LastYearCollection),
//           toMillion(dailyData.CurrentYearCollection),
//         ],
//         backgroundColor: "#2BBEB9",
//         borderRadius: 6,
//         barThickness: 10,
//       },
//       {
//         label: "Payment",
//         data: [
//           toMillion(dailyData.LastYearPayment),
//           toMillion(dailyData.CurrentYearPayment),
//         ],
//         backgroundColor: "#7A5EFF",
//         borderRadius: 6,
//         barThickness: 10,
//       },
//       {
//         label: "Expense",
//         data: [
//           toMillion(dailyData.LastYearExpense),
//           toMillion(dailyData.CurrentYearExpense),
//         ],
//         backgroundColor: "#FFD66B",
//         borderRadius: 6,
//         barThickness: 10,
//       },
//       {
//         label: "Margin",
//         data: [
//           toMillion(dailyData.LastYearMargin),
//           toMillion(dailyData.CurrentYearMargin),
//         ],
//         backgroundColor: "#6FCF97",
//         borderRadius: 6,
//         barThickness: 10,
//       },
//     ],
//   };

//   const options = {
//     indexAxis: "y",
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "bottom",
//         labels: {
//           usePointStyle: true,
//           padding: 10,
//           font: { size: 11, weight: 600 },
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           callback: (value) => `${value}M`,
//           color: "#6b7280",
//         },
//         grid: { color: "rgba(0,0,0,0.05)" },
//         border: { display: false },
//       },
//       y: {
//         grid: { display: false },
//         ticks: { color: "#4b5563" },
//         border: { display: false },
//       },
//     },
//   };

//   return (
//     <div className="w-[400px] h-[230px] bg-white shadow-sm border border-gray-100 p-3 rounded-lg">
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// const YearlySPCGraph = ({ dailyData }) => {
//   // ===== STATE (ALWAYS FIRST) =====
//   const today = new Date();
//   const currentYear = today.getFullYear();
//   const lastYear = currentYear - 1;

//   const [selectedYear, setSelectedYear] = useState(currentYear);

//   // ===== SAFE GUARD =====
//   if (!dailyData) return null;

//   // ===== HELPERS =====
//   const toMillion = (value) => {
//     if (!value) return 0;
//     const num = Number(value.toString().replace(/,/g, ""));
//     return num / 1_000_000;
//   };

//   const isCurrentYear = selectedYear === currentYear;

//   // ===== CHART DATA =====
//   const data = {
//     labels: ["Sales", "Purchase", "Collection", "Payment", "Expense", "Margin"],
//     datasets: [
//       {
//         label: selectedYear,
//         data: [
//           isCurrentYear
//             ? toMillion(dailyData.YearSaleAmount)
//             : toMillion(dailyData.LastYearSaleAmount),

//           isCurrentYear
//             ? toMillion(dailyData.YearPurAmount)
//             : toMillion(dailyData.LastYearPurAmount),

//           isCurrentYear
//             ? toMillion(dailyData.CurrentYearCollection)
//             : toMillion(dailyData.LastYearCollection),

//           isCurrentYear
//             ? toMillion(dailyData.CurrentYearPayment)
//             : toMillion(dailyData.LastYearPayment),

//           isCurrentYear
//             ? toMillion(dailyData.CurrentYearExpense)
//             : toMillion(dailyData.LastYearExpense),

//           isCurrentYear
//             ? toMillion(dailyData.CurrentYearMargin)
//             : toMillion(dailyData.LastYearMargin),
//         ],
//         backgroundColor: [
//           "#5790FF",
//           "#FFADAD",
//           "#2BBEB9",
//           "#7A5EFF",
//           "#FFD66B",
//           "#6FCF97",
//         ],
//         borderRadius: 6,
//         barThickness: 28,
//       },
//     ],
//   };

//   // ===== OPTIONS =====
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//     },
//     scales: {
//       y: {
//         ticks: {
//           callback: (value) => `${value}M`,
//         },
//       },
//       x: {
//         grid: { display: false },
//       },
//     },
//   };

//   return (
//     <div className="w-[450px] h-[260px] bg-white border p-3 rounded-lg">
//       {/* YEAR SWITCH */}
//       <div className="flex justify-center gap-2 mb-2">
//         <button
//           onClick={() => setSelectedYear(lastYear)}
//           className={`px-3 py-1 text-sm rounded border ${
//             selectedYear === lastYear ? "bg-blue-500 text-white" : "bg-white"
//           }`}
//         >
//           {lastYear}
//         </button>

//         <button
//           onClick={() => setSelectedYear(currentYear)}
//           className={`px-3 py-1 text-sm rounded border ${
//             selectedYear === currentYear ? "bg-blue-500 text-white" : "bg-white"
//           }`}
//         >
//           {currentYear}
//         </button>
//       </div>

//       {/* GRAPH */}
//       <div className="h-[200px]">
//         <Bar data={data} options={options} />
//       </div>
//     </div>
//   );
// };
const YearlySPCGraph = ({ dailyData }) => {
  const YearBar = Bar;
  if (!dailyData) return null;

  const dateParts = currentDate.split("-");
  const currentYear = parseInt(dateParts[2], 10);
  const lastYear = currentYear - 1;

  const formatToMillions = (value) => {
    if (!value) return 0;
    const number = Number(value.toString().replace(/,/g, ""));
    return number / 1_000_000;
  };

  const lastYearSale = formatToMillions(dailyData.LastYearSaleAmount);
  const currentYearSale = formatToMillions(dailyData.YearSaleAmount);
  const lastYearPur = formatToMillions(dailyData.LastYearPurAmount);
  const currentYearPur = formatToMillions(dailyData.YearPurAmount);
  const lastYearCollection = formatToMillions(dailyData.LastYearCollection);
  const currentYearCollection = formatToMillions(
    dailyData.CurrentYearCollection,
  );

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
    <div className="w-full h-[180px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-center">
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
                "_blank",
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
                "_blank",
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
                  "_blank",
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
                  "_blank",
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
                  "_blank",
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
            <span
              className="text-[16px] font-semibold text-sky-700 pl-1 cursor-pointer hover:underline"
              onClick={() =>
                window.open(
                  window.location.origin + "/crystalsol/AmericanManagersReport",
                  "_blank",
                )
              }
            >
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

          <h4
            className="text-[15px] font-semibold text-indigo-800 cursor-pointer hover:underline"
            title={webData?.Receivable}
            onClick={() =>
              window.open(
                window.location.origin + "/crystalsol/AmericanReceivableReport",
                "_blank",
              )
            }
          >
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
                "_blank",
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
                "_blank",
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
                "_blank",
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
                "_blank",
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
                "_blank",
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

  // ===== YEARLY =====
  const amountLastYear = salesData.LastCompleteYearSaleAmount || "N/A";
  const quantityLastYear = salesData.LastCompleteYearSaleQnty || "N/A";

  const amountCurrentYear = salesData.CurrentYearSaleAmount || "N/A";
  const quantityCurrentYear = salesData.CurrentYearSaleQnty || "N/A";

  // ===== MONTHLY =====
  const currentMonthAmount = salesData.CurrentMonthSaleAmount || "N/A";
  const currentMonthQuantity = salesData.CurrentMonthSaleQnty || "N/A";

  const lastMonthAmount = salesData.LastMonthSaleAmount || "N/A";
  const lastMonthQuantity = salesData.LastMonthSaleQnty || "N/A";

  // ===== DATE LABELS (NO CHANGE) =====
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
  const labelPreviousMonth = `${previousMonthName} ${lastYear}`;

  return (
    <div className="w-full h-[180px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-between">
      {/* HEADER */}
      <p className="text-[16px] font-medium text-black">Sale</p>

      {/* TOP YEARLY */}
      <div className="grid grid-cols-2 gap-1 leading-tight">
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-700">{lastYear}</p>
          <h4
            className="text-[16px] font-semibold text-indigo-800 hover:underline cursor-pointer"
            title={quantityLastYear}
            onClick={() =>
              window.open(
                window.location.origin +
                  "/crystalsol/NASIRTRADERSLastYearSaleReport",
                "_blank",
              )
            }
          >
            {quantityLastYear}
          </h4>
          <p className="text-[10px] text-gray-500">{amountLastYear}</p>
        </div>

        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-700">{currentYear}</p>
          <h4
            className="text-[16px] font-semibold text-indigo-800 hover:underline cursor-pointer"
            title={quantityCurrentYear}
            onClick={() =>
              window.open(
                window.location.origin +
                  "/crystalsol/NASIRTRADERSCurrentYearSaleReport",
                "_blank",
              )
            }
          >
            {quantityCurrentYear}
          </h4>
          <p className="text-[10px] text-gray-500">{amountCurrentYear}</p>
        </div>
      </div>

      {/* BOTTOM MONTHLY */}
      <div className="grid grid-cols-3 gap-1 text-center leading-tight">
        <div>
          <p className="text-[10px] text-gray-500">{labelLastYearSameMonth}</p>
          <h4
            className="text-[16px] font-semibold text-indigo-800 hover:underline cursor-pointer"
            title={lastMonthQuantity}
            onClick={() =>
              window.open(
                window.location.origin +
                  "/crystalsol/NASIRTRADERSLastYearSameMonthSaleReport",
                "_blank",
              )
            }
          >
            {lastMonthQuantity}
          </h4>
          <p className="text-[10px] text-gray-500 mt-[-2px]">
            {lastMonthAmount}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-gray-500">{labelCurrentMonth}</p>
          <h4
            className="text-[16px] font-semibold text-indigo-800 hover:underline cursor-pointer"
            title={currentMonthQuantity}
            onClick={() =>
              window.open(
                window.location.origin +
                  "/crystalsol/NASIRTRADERSCurrentMonthSaleReport",
                "_blank",
              )
            }
          >
            {currentMonthQuantity}
          </h4>
          <p className="text-[10px] text-gray-500 mt-[-2px]">
            {currentMonthAmount}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-gray-500">{labelPreviousMonth}</p>
          <h4
            className="text-[16px] font-semibold text-indigo-800 hover:underline cursor-pointer"
            title={lastMonthQuantity}
            onClick={() =>
              window.open(
                window.location.origin +
                  "/crystalsol/NASIRTRADERSPreviousMonthSaleReport",
                "_blank",
              )
            }
          >
            {lastMonthQuantity}
          </h4>
          <p className="text-[10px] text-gray-500 mt-[-2px]">
            {lastMonthAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

const companiesData = [
  { company: "Dawlance", percentage: 78, color: "#FACC15" },
  { company: "Haier", percentage: 65, color: "#FB923C" },
  { company: "Orient", percentage: 52, color: "#EF4444" },
  { company: "Gree", percentage: 40, color: "#EC4899" },
];

// ----------------------
// New Companies Card (COMPACT)
// ----------------------
const TopCompaniesSalesCard = ({ companiesData }) => {
  if (!companiesData || companiesData.length === 0) return null;

  return (
    <div className="w-full h-[250px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col">
      {/* HEADER */}
      <p className="text-[12px] font-medium text-black mb-2">Top Companies</p>

      {/* BARS */}
      <div className="flex flex-col gap-3">
        {companiesData.slice(0, 4).map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* LEFT PERCENTAGE CIRCLE */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold text-white"
              style={{ backgroundColor: item.color }}
            >
              {item.percentage}%
            </div>

            {/* BAR */}
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
              <div
                className="h-6 rounded-full flex items-center px-3 text-[12px] font-medium text-white"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              >
                {item.company}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ----------------------
// New Purchase Card (COMPACT LIKE SALES)
// ----------------------
const NewPurchaseCard = ({ purchaseData }) => {
  if (!purchaseData) return null;

  // ===== YEARLY =====
  const quantityLastYear = purchaseData.LastYearPurchaseQnty || "N/A";
  const amountLastYear = purchaseData.LastYearPurchaseAmount || "N/A";

  const quantityCurrentYear = purchaseData.CurrentYearPurchaseQnty || "N/A";
  const amountCurrentYear = purchaseData.CurrentYearPurchaseAmount || "N/A";

  // ===== MONTHLY =====
  const currentMonthQuantity = purchaseData.CurrentMonthPurchaseQnty || "N/A";
  const currentMonthAmount = purchaseData.CurrentMonthPurchaseAmount || "N/A";

  const lastMonthQuantity = purchaseData.LastMonthPurchaseQnty || "N/A";
  const lastMonthAmount = purchaseData.LastMonthPurchaseAmount || "N/A";

  // ===== DATE LABELS (NO DESIGN CHANGE) =====
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
  const labelPreviousMonth = `${previousMonthName} ${lastYear}`;

  return (
    <div className="w-full h-[180px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-between">
      {/* HEADER */}
      <p className="text-[16px] font-medium text-black">Purchase</p>

      {/* TOP YEARLY */}
      <div className="grid grid-cols-2 gap-1 text-center leading-tight">
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-700">{lastYear}</p>
          <h4
            className="text-[16px] font-semibold text-indigo-800 hover:underline cursor-pointer"
            title={quantityLastYear}
            onClick={() =>
              window.open(
                window.location.origin +
                  "/crystalsol/NASIRTRADERSLastYearPurchaseReport",
                "_blank",
              )
            }
          >
            {quantityLastYear}
          </h4>
          <p className="text-[10px] text-gray-500">{amountLastYear}</p>
        </div>

        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-800">{currentYear}</p>
          <h4
            className="text-[16px] font-semibold text-indigo-800 hover:underline cursor-pointer"
            title={quantityCurrentYear}
            onClick={() =>
              window.open(
                window.location.origin +
                  "/crystalsol/NASIRTRADERSCurrentYearsPurchaseReport",
                "_blank",
              )
            }
          >
            {quantityCurrentYear}
          </h4>
          <p className="text-[10px] text-gray-500">{amountCurrentYear}</p>
        </div>
      </div>

      {/* BOTTOM MONTHLY */}
      <div className="grid grid-cols-3 gap-1 text-center leading-tight">
        <div>
          <p className="text-[10px] font-normal text-gray-500">
            {labelLastYearSameMonth}
          </p>
          <h4
            className="text-[16px] font-semibold text-indigo-800 hover:underline cursor-pointer"
            title={lastMonthQuantity}
            onClick={() =>
              window.open(
                window.location.origin +
                  "/crystalsol/NASIRTRADERSLastYearSameMonthPurchaseReport",
                "_blank",
              )
            }
          >
            {lastMonthQuantity}
          </h4>
          <p className="text-[10px] text-gray-500 mt-[-2px]">
            {lastMonthAmount}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-normal text-gray-500">
            {labelCurrentMonth}
          </p>
          <h4
            className="text-[16px] font-semibold text-indigo-800 hover:underline cursor-pointer"
            title={currentMonthQuantity}
            onClick={() =>
              window.open(
                window.location.origin +
                  "/crystalsol/NASIRTRADERSCurrentMonthPurchaseReport",
                "_blank",
              )
            }
          >
            {currentMonthQuantity}
          </h4>
          <p className="text-[10px] text-gray-500 mt-[-2px]">
            {currentMonthAmount}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-normal text-gray-500">
            {labelPreviousMonth}
          </p>
          <h4
            className="text-[16px] font-semibold text-indigo-800 hover:underline cursor-pointer"
            title={lastMonthQuantity}
            onClick={() =>
              window.open(
                window.location.origin +
                  "/crystalsol/NASIRTRADERSPreviousMonthPurchaseReport",
                "_blank",
              )
            }
          >
            {lastMonthQuantity}
          </h4>
          <p className="text-[10px] text-gray-500 mt-[-2px]">
            {lastMonthAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// Label Switch Card (Collection Values Mapping)
// ----------------------
const CollectionSwitchCard = ({ dailyData }) => {
  const [active, setActive] = React.useState("Collection");

  const labels = ["Collection", "Payment", "Expense", "Margin"];

  const valueMap = {
    Collection: [
      { label: "2026", value: dailyData?.TodayCollection || "-" },
      { label: "2025", value: dailyData?.LastCompleteYearCollection || "-" },
      { label: "Jan 2026", value: dailyData?.CurrentMonthCollection || "-" },
      {
        label: "Dec 2025",
        value: dailyData?.LastYearCollection || "-",
      },
    ],
    Payment: [
      { label: "2026", value: dailyData?.TodayPayment || "-" },
      { label: "2025", value: dailyData?.LastCompleteYearPayment || "-" },
      { label: "Jan 2026", value: dailyData?.CurrentMonthPayment || "-" },
      { label: "Dec 2025", value: dailyData?.LastYearPayment || "-" },
    ],
    Expense: [
      { label: "2026", value: dailyData?.TodayExpense || "-" },
      { label: "2025", value: dailyData?.LastCompleteYearExpense || "-" },
      { label: "Jan 2026", value: dailyData?.CurrentMonthExpense || "-" },
      { label: "Dec 2025", value: dailyData?.LastYearExpense || "-" },
    ],
    Margin: [
      { label: "2026", value: dailyData?.TodayMargin || "-" },
      { label: "2025", value: dailyData?.LastCompleteYearMargin || "-" },
      { label: "Jan 2026", value: dailyData?.CurrentMonthMargin || "-" },
      { label: "Dec 2025", value: dailyData?.LastYearMargin || "-" },
    ],
  };

  return (
    <div className="w-full max-w-[460px] h-[180px] bg-white border border-gray-200 rounded-xl shadow-sm flex overflow-hidden">
      {/* LEFT COLUMN */}
      <div className="w-1/2 bg-gray-50">
        {labels.map((label) => (
          <div
            key={label}
            onClick={() => setActive(label)}
            className={`px-3 py-2.5 text-sm cursor-pointer transition
              ${
                active === label
                  ? "bg-white font-semibold text-indigo-700 border-l-4 border-indigo-600"
                  : "text-gray-600 hover:bg-white"
              }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-1/2 px-6 py-5 flex flex-col justify-center gap-3">
        <p className="text-[11px] text-gray-400 text-center tracking-widest uppercase">
          {active}
        </p>

        {valueMap[active].map((item, index) => (
          <div key={index} className="flex items-center text-[12px]">
            <span className="w-[90px] text-gray-500 whitespace-nowrap">
              {item.label}
            </span>

            <span className="text-[10px] flex-1 text-right font-semibold text-gray-900 tabular-nums whitespace-nowrap">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CashBankDistributionChart = ({ dailyData }) => {
  if (!dailyData) return null;

  // ===== HELPER =====
  const toNumber = (val) =>
    Number((val || "0").toString().replace(/,/g, "")) || 0;

  // ===== VALUES =====
  const cashBank = toNumber(dailyData?.CashBankBal);
  const receivable = toNumber(dailyData?.Receivable);
  const payable = toNumber(dailyData?.Payable);
  const stock = toNumber(dailyData?.["Total Stock"]);

  // ===== GOOGLE PIE DATA =====
  const chartData = [
    ["Type", "Amount"],
    ["Cash / Bank", Math.abs(cashBank)],
    ["Receivable", Math.abs(receivable)],
    ["Payable", Math.abs(payable)],
    ["Stock", Math.abs(stock)],
  ];

  // ===== COLORS =====
  const colors = [
    "#4F46E5", // Cash / Bank (Indigo)
    "#109744", // Receivable (Green)
    "#DC2626", // Payable (Red)
    "#FFD66B", // Stock (Yellow)
  ];

  // ===== CHART OPTIONS (SAME STYLE) =====
  const options = {
    is3D: true,
    pieHole: 0.35,
    pieStartAngle: 100,
    legend: "none",
    colors,
    chartArea: {
      width: "95%",
      height: "90%",
    },
  };

  return (
    <div className="w-full h-[180px] bg-white shadow-md border border-gray-200 p-2 rounded-lg flex">
      {/* LEFT SIDE LEGEND */}
      <div className="w-[40%] flex flex-col justify-center space-y-2 pr-2">
        {[
          { label: "Cash / Bank", color: colors[0] },
          { label: "Receivable", color: colors[1] },
          { label: "Payable", color: colors[2] },
          { label: "Stock", color: colors[3] },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />

            {/* CASH / BANK */}
            {item.label === "Cash / Bank" && (
              <>
                <span
                  className="text-[11px] text-indigo-700 hover:underline cursor-pointer"
                  onClick={() =>
                    window.open(
                      window.location.origin +
                        "/crystalsol/NASIRTRADERSCashReport",
                      "_blank",
                    )
                  }
                >
                  Cash
                </span>
                <span className="text-[11px] text-gray-500"> / </span>
                <span
                  className="text-[11px] text-indigo-700 hover:underline cursor-pointer"
                  onClick={() =>
                    window.open(
                      window.location.origin +
                        "/crystalsol/NASIRTRADERSBankReport",
                      "_blank",
                    )
                  }
                >
                  Bank
                </span>
              </>
            )}

            {/* RECEIVABLE */}
            {item.label === "Receivable" && (
              <span
                className="text-[11px] text-indigo-700 hover:underline cursor-pointer"
                onClick={() =>
                  window.open(
                    window.location.origin +
                      "/crystalsol/NASIRTRADERSReceivableReport",
                    "_blank",
                  )
                }
              >
                Receivable
              </span>
            )}

            {/* OTHER LABELS */}
            {item.label !== "Cash / Bank" && item.label !== "Receivable" && (
              <span className="text-[11px] text-gray-600 truncate">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE PIE */}
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

const SalesDistributionChart = ({ dailyData }) => {
  if (!dailyData) return null;

  // ===== HELPER =====
  const toNumber = (val) =>
    Number((val || "0").toString().replace(/,/g, "")) || 0;

  // ===== VALUES =====
  const cashSale = toNumber(dailyData?.CashSaleAmount);
  const creditSale = toNumber(dailyData?.CreditSaleAmount);
  const installmentSale = toNumber(dailyData?.InstallmentSaleAmount);
  const salesMan = toNumber(dailyData?.SalesMan);

  // ===== GOOGLE PIE DATA =====
  const chartData = [
    ["Type", "Amount"],
    ["Cash Sale", Math.abs(cashSale)],
    ["Credit Sale", Math.abs(creditSale)],
    ["Installment Sale", Math.abs(installmentSale)],
    ["Salesman", Math.abs(salesMan)],
  ];

  // ===== COLORS (SAME THEME, DIFFERENT SHADES) =====
  const colors = [
    "#2563EB", // Cash Sale (Blue)
    "#16A34A", // Credit Sale (Green)
    "#F97316", // Installment (Orange)
    "#7C3AED", // Salesman (Purple)
  ];

  // ===== CHART OPTIONS (SAME STYLE) =====
  const options = {
    is3D: true,
    pieHole: 0.35,
    pieStartAngle: 100,
    legend: "none",
    colors,
    chartArea: {
      width: "95%",
      height: "90%",
    },
  };

  return (
    <div className="w-full h-[180px] bg-white shadow-md border border-gray-200 p-2 rounded-lg flex">
      {/* LEFT SIDE LEGEND */}
      <div className="w-[40%] flex flex-col justify-center space-y-2 pr-2">
        {[
          { label: "Cash Sale", value: cashSale, color: colors[0] },
          { label: "Credit Sale", value: creditSale, color: colors[1] },
          {
            label: "Installment Sale",
            value: installmentSale,
            color: colors[2],
          },
          { label: "Salesman", value: salesMan, color: colors[3] },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            {/* COLOR DOT */}
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />

            {/* LABEL */}
            <span className="text-[11px] text-gray-600 truncate">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE PIE */}
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
const StoreStaffSummaryCard = ({ dailyData }) => {
  if (!dailyData) return null;

  const items = [
    { label: "Stores", value: dailyData?.Stores },
    { label: "SalesMan", value: dailyData?.SalesMan },
    { label: "Employee", value: dailyData?.Employee },
    { label: "O/S Invoices", value: dailyData?.OutstandingInvoices },
    { label: "New Arrival", value: dailyData?.NewArrival },
    { label: "Item Level", value: dailyData?.ItemLevel },
  ];

  return (
    <div className="w-full h-[180px] bg-white shadow-sm border border-gray-100 p-2 rounded-lg flex flex-col justify-between">
      {/* BODY */}
      <div className="flex flex-col gap-[6px] px-1 flex-1 justify-center">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center text-[13px] text-gray-700"
          >
            {/* LABEL */}
            <span className="whitespace-nowrap">{item.label}</span>

            {/* DOTTED LINE */}
            <span className="flex-1 border-b border-dotted border-gray-300 mx-2" />

            {/* VALUE */}
            <span className="font-semibold text-indigo-800 tabular-nums">
              {item.value ?? "-"}
            </span>
          </div>
        ))}
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
        rangeLabel,
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
      rangeLabel,
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
      (mainData?.["OutStanding Customer"] || "0").toString().replace(/,/g, ""),
    ) || 0;

  const nil =
    Number((mainData?.["Nil Customer"] || "0").toString().replace(/,/g, "")) ||
    0;

  const advance =
    Number(
      (mainData?.["Advance Customer"] || "0").toString().replace(/,/g, ""),
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
const NasirTRD = () => {
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

  // const organisation = getOrganisationData();
  const organisation = getOrganisationData();

  console.log("ORG:", organisation); // 👈 yahan likho

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const dailyFormData = new FormData();
        // dailyFormData.append("code", "NASIRTRD");

        dailyFormData.append("code", organisation.code);
        dailyFormData.append("FRepDat", currentDate);
        dailyFormData.append("FLocCod", "001");

        const [dailyResponse] = await Promise.all([
          axios.post(DASHBOARD_DAILY, dailyFormData),
        ]);

        let daily = dailyResponse.data;
        if (Array.isArray(daily)) {
          daily = daily.length ? daily[0] : {};
        }
        if (!daily || typeof daily !== "object") daily = {};
        setDailyData(daily);
      } catch (err) {
        console.error("API Error:", err);
        setDailyData({});
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
        <div className="dashboard-scroll-fix">
          <div
            className="dashboard-zoom"
            style={{
              fontFamily:
                '"SF Pro Display","SF Pro Text",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
            }}
          >
            <div className="max-w-7xl mx-auto gap-2">
              {/* TOP METRIC CARDS */}

              <section className="mb-2 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                <NewSalesCard salesData={dailyData} />
                <NewPurchaseCard purchaseData={dailyData} />
                <CollectionSwitchCard dailyData={dailyData} />
                <CashBankDistributionChart dailyData={dailyData} />
                <YearlySPCGraph dailyData={dailyData} />
                <SalesDistributionChart dailyData={dailyData} />
                <StoreStaffSummaryCard dailyData={dailyData} />
                <TopCompaniesSalesCard companiesData={companiesData} />
              </section>

              {/* --- BIG LOWER SECTION --- */}
              {/* <section className="grid gap-2 mt-0">
                <div className="grid gap-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                  <YearlySPCGraph apiData={webData} />
                </div>

                <div className="relative bg-white rounded-lg shadow-sm border border-gray-100 pt-3 px-4 pb-4 h-[300px] w-[660px]">
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
                        const avgSales =
                          salesData.reduce((a, b) => a + b, 0) /
                          salesData.length;
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
                                    callback: (value) =>
                                      `${value / 1_000_000}M`,
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
              </section> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NasirTRD;
