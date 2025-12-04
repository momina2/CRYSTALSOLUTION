// // AmericanDashboard.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // API URLs (Keep as is)
// const ADMIN_INFO_API_URL = "https://crystalsolutions.com.pk/api/AdminInfo.php";
// const MONTHLY_COMPARISON_API_URL =
//   "https://crystalsolutions.com.pk/api/MonthlyComparison.php";
// const DASHBOARD_DAILY =
//   "https://crystalsolutions.com.pk/api/DashboardDaily.php";
// const DASHBOARD_DAILY_WEB =
//   "https://crystalsolutions.com.pk/api/DashboardDailyWeb.php";
// const AMERICAN_AGGING_API_URL =
//   "https://crystalsolutions.com.pk/api/AmericanAdminAgging.php";

// const months = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// // --- 1. Date function for dd-mm-yyyy (Used by daily, web, etc.) ---
// const getCurrentDateFormatted = () => {
//   const date = new Date();
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`; // e.g., 28-11-2025
// };

// // --- 2. New Date function for yyyy-mm-dd (REQUIRED FOR AmericanAdminAgging) ---
// const getAggingDateFormatted = () => {
//   const date = new Date();
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${year}-${month}-${day}`; // e.g., 2025-11-28
// };

// const currentDate = getCurrentDateFormatted(); // Used for APIs needing dd-mm-yyyy format

// // --- ** Soft Color Palette for Charts ** ---
// const ChartColors = {
//   Sales: "rgba(79, 109, 255, 0.8)", // Softer, professional blue
//   Purchase: "rgba(255, 126, 149, 0.8)", // Muted pink/red
//   Expense: "rgba(255, 192, 90, 0.8)", // Warm yellow/orange
//   Collection: "rgba(43, 190, 185, 0.8)", // Calm teal
//   YearlySales: "#5790FF", // Lighter blue for yearly Sales
//   YearlyPurchase: "#FFADAD", // Softer red for yearly Purchase
//   YearlyCollection: "#A0FFD1", // Mint green for yearly Collection
// };

// // ----------------------
// // YearlySalePurchaseGraph
// // ----------------------
// const YearlySPCGraph = ({ apiData }) => {
//   const YearBar = Bar;

//   if (!apiData) return null;

//   const dateParts = currentDate.split("-");
//   const currentYear = parseInt(dateParts[2], 10);
//   const lastYear = currentYear - 1;

//   const formatToMillions = (value) => {
//     if (!value) return 0;
//     const number = Number(value.toString().replace(/,/g, ""));
//     return number / 1_000_000;
//   };

//   const lastYearSale = formatToMillions(apiData.LastYearSaleAmount);
//   const currentYearSale = formatToMillions(apiData.YearSaleAmount);
//   const lastYearPur = formatToMillions(apiData.LastYearPurAmount);
//   const currentYearPur = formatToMillions(apiData.YearPurAmount);
//   const lastYearCollection = formatToMillions(apiData.LastYearCollection);
//   const currentYearCollection = formatToMillions(apiData.CurrentYearCollection);

//   const data = {
//     labels: [String(lastYear), String(currentYear)],
//     datasets: [
//       {
//         label: "Sales",
//         data: [lastYearSale, currentYearSale],
//         backgroundColor: ChartColors.YearlySales,
//         borderRadius: 10,
//         barThickness: 18,
//       },
//       {
//         label: "Purchase",
//         data: [lastYearPur, currentYearPur],
//         backgroundColor: ChartColors.YearlyPurchase,
//         borderRadius: 10,
//         barThickness: 18,
//       },
//       {
//         label: "Collection",
//         data: [lastYearCollection, currentYearCollection],
//         backgroundColor: ChartColors.YearlyCollection,
//         borderRadius: 10,
//         barThickness: 18,
//       },
//     ],
//   };

//   const options = {
//     indexAxis: "y",
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: { usePointStyle: true, padding: 16 },
//       },
//       title: {
//         display: true,
//         text: "Yearly Comparison (in Millions)",
//         color: "#111827",
//         font: {
//           size: 13,
//           weight: "600",
//           family:
//             '"SF Pro Display","SF Pro Text",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: { callback: (value) => value + "M", color: "#6b7280" },
//         grid: { display: true, color: "rgba(0,0,0,0.04)" },
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
//     <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-4 h-[260px]">
//       <YearBar data={data} options={options} />
//     </div>
//   );
// };

// // ----------------------
// // Staff Summary Card
// // ----------------------
// const StaffSummaryCard = ({ webData }) => {
//   if (!webData) return null;

//   return (
//     <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-4">
//       <h3 className="text-xs font-semibold text-gray-800 mb-3 tracking-wide">
//         Staff Summary
//       </h3>

//       <div className="grid grid-cols-2 grid-rows-2 divide-x divide-y divide-gray-100 text-center text-[12px]">
//         <div className="p-3">
//           <p className="text-[11px] font-medium text-gray-500">SalesMan</p>
//           <p className="text-lg font-semibold text-indigo-700">
//             {webData?.SalesMan || "-"}
//           </p>
//         </div>

//         <div className="p-3">
//           <p className="text-[11px] font-medium text-gray-500">City</p>
//           <p className="text-lg font-semibold text-indigo-700">
//             {webData?.Stores || "-"}
//           </p>
//         </div>

//         <div className="p-3">
//           <p className="text-[11px] font-medium text-gray-500">Region</p>
//           <p className="text-lg font-semibold text-indigo-700">
//             {webData?.Region || "-"}
//           </p>
//         </div>

//         <div className="p-3">
//           <p className="text-[11px] font-medium text-gray-500">Managers</p>
//           <p className="text-lg font-semibold text-indigo-700">
//             {webData?.Managers || "-"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ----------------------
// // New finance Card
// // ----------------------
// const FinanceSummaryCard = ({ webData }) => {
//   if (!webData) return null;

//   return (
//     <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-4">
//       <h3 className="text-xs font-semibold text-gray-800 mb-3 tracking-wide">
//         Financial Summary
//       </h3>

//       <div className="grid grid-cols-2 grid-rows-2 divide-x divide-y divide-gray-100 text-center text-[12px]">
//         <div className="p-3">
//           <p className="text-[11px] font-medium text-gray-500">Receivable</p>
//           <p className="text-lg font-semibold text-indigo-700">
//             {webData?.Receivable || "-"}
//           </p>
//         </div>

//         <div className="p-3">
//           <p className="text-[11px] font-medium text-gray-500">Payable</p>
//           <p className="text-lg font-semibold text-indigo-700">
//             {webData?.Payable || "-"}
//           </p>
//         </div>

//         <div className="p-3">
//           <p className="text-[11px] font-medium text-gray-500">Stock</p>
//           <p className="text-lg font-semibold text-indigo-700">
//             {webData?.["Total Stock"] || "-"}
//           </p>
//         </div>

//         <div className="p-3">
//           <p className="text-[11px] font-medium text-gray-500">Expense</p>
//           <p className="text-lg font-semibold text-indigo-700">
//             {webData?.Expense || "-"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ----------------------
// // Horizontal Balance Card
// // ----------------------
// const HorizontalBalanceCard = ({ mainData, cardTitle = null }) => {
//   const formatValue = (key) => mainData[key] || "N/A";

//   return (
//     <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md">
//       {cardTitle && (
//         <h3 className="text-xs font-semibold text-gray-800 tracking-wide">
//           {cardTitle}
//         </h3>
//       )}

//       <div className="flex justify-between items-end border-b border-gray-100 pb-3">
//         <div>
//           <p className="text-[11px] font-medium text-gray-500">
//             Total Customers
//           </p>
//           <h2 className="text-3xl font-semibold text-indigo-800 mt-1">
//             {formatValue("Total Customer")}
//           </h2>
//         </div>

//         <div className="text-right">
//           <p className="text-[11px] font-medium text-gray-500">Total Balance</p>
//           <h2 className="text-xl font-semibold text-gray-900 mt-1">
//             {formatValue("Total Balance")}
//           </h2>
//         </div>
//       </div>

//       <div className="grid grid-cols-4 gap-2 text-center pt-1">
//         <div className="flex flex-col px-1">
//           <p className="text-[11px] font-medium text-gray-500 mb-1">
//             Non Active
//           </p>
//           <h4 className="text-lg font-semibold text-sky-700">
//             {formatValue("Non Active")}
//           </h4>
//           <p className="text-[11px] text-gray-400 mt-1">-</p>
//         </div>

//         <div className="flex flex-col px-1">
//           <p className="text-[11px] font-medium text-gray-500 mb-1">Advance</p>
//           <h4 className="text-lg font-semibold text-sky-700">
//             {formatValue("Advance Customer")}
//           </h4>
//           <p
//             className="text-[11px] mt-1 truncate text-emerald-600"
//             title={formatValue("Advance Amount")}
//           >
//             {formatValue("Advance Amount")}
//           </p>
//         </div>

//         <div className="flex flex-col px-1">
//           <p className="text-[11px] font-medium text-gray-500 mb-1">Nil</p>
//           <h4 className="text-lg font-semibold text-sky-700">
//             {formatValue("Nil Customer")}
//           </h4>
//           <p className="text-[11px] text-gray-400 mt-1">-</p>
//         </div>

//         <div className="flex flex-col px-1">
//           <p className="text-[11px] font-medium text-gray-500 mb-1">
//             Outstanding
//           </p>
//           <h4 className="text-lg font-semibold text-sky-700">
//             {formatValue("OutStanding Customer")}
//           </h4>
//           <p
//             className="text-[11px] text-red-500 mt-1 truncate"
//             title={formatValue("OutStanding Amount")}
//           >
//             {formatValue("OutStanding Amount")}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ----------------------
// // New Sales Card
// // ----------------------
// const NewSalesCard = ({ salesData, cardTitle = "Sale" }) => {
//   if (!salesData) return null;

//   const amount2024 = salesData.LastYearSaleAmount || "N/A";
//   const quantity2024 = salesData.LastYearSaleQnty || "N/A";
//   const amount2025 = salesData.YearSaleAmount || "N/A";
//   const quantity2025 = salesData.YearSaleQnty || "N/A";

//   const currentMonthAmount = salesData.MonthSaleAmount || "N/A";
//   const currentMonthQuantity = salesData.MonthSaleQnty || "N/A";
//   const lastYearMonthAmount = salesData.LastYearMonthSaleAmount || "N/A";
//   const lastYearMonthQuantity = salesData.LastYearMonthSaleQnty || "N/A";
//   const previousMonthAmount = salesData.PreviousMonthSaleAmount || "N/A";
//   const previousMonthQuantity = salesData.PreviousMonthSaleQnty || "N/A";

//   const dateParts = currentDate.split("-");
//   const currentMonthIndex = parseInt(dateParts[1], 10) - 1;
//   const currentYear = parseInt(dateParts[2], 10);
//   const lastYear = currentYear - 1;

//   const currentMonthName = months[currentMonthIndex];
//   let previousMonthIndex = currentMonthIndex - 1;
//   if (previousMonthIndex < 0) previousMonthIndex = 11;
//   const previousMonthName = months[previousMonthIndex];

//   const labelLastYearSameMonth = `${currentMonthName} ${lastYear}`;
//   const labelCurrentMonth = `${currentMonthName} ${currentYear}`;
//   const labelPreviousMonth = `${previousMonthName} ${currentYear}`;

//   return (
//     <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md">
//       {cardTitle && (
//         <h3 className="text-xs font-semibold text-gray-800 mb-1 tracking-wide">
//           {cardTitle}
//         </h3>
//       )}

//       <div className="flex justify-between items-start border-b border-gray-100 pb-3">
//         <div className="flex flex-col items-start min-w-0 pr-3 w-1/2">
//           <h4 className="text-xs font-semibold text-gray-500 mb-1">
//             {lastYear}
//           </h4>
//           <h5
//             className="text-xl font-semibold text-indigo-800 truncate"
//             title={`Quantity: ${quantity2024}`}
//           >
//             {quantity2024}
//           </h5>
//           <h5
//             className="text-[12px] font-normal text-gray-500 truncate"
//             title={`Amount: ${amount2024}`}
//           >
//             {amount2024}
//           </h5>
//         </div>

//         <div className="flex flex-col items-end min-w-0 pl-3 w-1/2">
//           <h4 className="text-xs font-semibold text-gray-500 mb-1">
//             {currentYear}
//           </h4>
//           <h5
//             className="text-xl font-semibold text-indigo-800 truncate"
//             title={`Quantity: ${quantity2025}`}
//           >
//             {quantity2025}
//           </h5>
//           <h5
//             className="text-[12px] font-normal text-gray-500 truncate"
//             title={`Amount: ${amount2025}`}
//           >
//             {amount2025}
//           </h5>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-2 text-center pt-1">
//         <div className="flex flex-col p-1">
//           <p className="text-[11px] font-medium text-gray-500 mb-1">
//             {labelLastYearSameMonth}
//           </p>
//           <h4 className="text-lg font-semibold text-sky-700">
//             {lastYearMonthQuantity}
//           </h4>
//           <p
//             className="text-[12px] font-normal text-gray-500 mt-1 truncate"
//             title={lastYearMonthAmount}
//           >
//             {lastYearMonthAmount}
//           </p>
//         </div>

//         <div className="flex flex-col p-1">
//           <p className="text-[11px] font-medium text-gray-500 mb-1">
//             {labelCurrentMonth}
//           </p>
//           <h4 className="text-lg font-semibold text-sky-700">
//             {currentMonthQuantity}
//           </h4>
//           <p
//             className="text-[12px] font-normal text-gray-500 mt-1 truncate"
//             title={currentMonthAmount}
//           >
//             {currentMonthAmount}
//           </p>
//         </div>

//         <div className="flex flex-col p-1">
//           <p className="text-[11px] font-medium text-gray-500 mb-1">
//             {labelPreviousMonth}
//           </p>
//           <h4 className="text-lg font-semibold text-sky-700">
//             {previousMonthQuantity}
//           </h4>
//           <p
//             className="text-[12px] font-normal text-gray-500 mt-1 truncate"
//             title={previousMonthAmount}
//           >
//             {previousMonthAmount}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ----------------------
// // New Purchase Card
// // ----------------------
// const NewPurchaseCard = ({ purchaseData, cardTitle = "Purchase" }) => {
//   if (!purchaseData) return null;

//   const quantityLastYear = purchaseData.LastYearPurQnty ?? "N/A";
//   const amountLastYear = purchaseData.LastYearPurAmount ?? "N/A";
//   const quantityCurrentYear = purchaseData.YearPurQnty ?? "N/A";
//   const amountCurrentYear = purchaseData.YearPurAmount ?? "N/A";

//   const currentMonthAmount = purchaseData.MonthPurAmount ?? "N/A";
//   const currentMonthQuantity = purchaseData.MonthPurQnty ?? "N/A";
//   const lastYearMonthAmount = purchaseData.LastYearMonthPurAmount ?? "N/A";
//   const lastYearMonthQuantity = purchaseData.LastYearMonthPurQnty ?? "N/A";
//   const previousMonthAmount = purchaseData.PreviousMonthPurAmount ?? "N/A";
//   const previousMonthQuantity = purchaseData.PreviousMonthPurQnty ?? "N/A";

//   const dateParts = currentDate.split("-");
//   const currentMonthIndex = parseInt(dateParts[1], 10) - 1;
//   const currentYear = parseInt(dateParts[2], 10);
//   const lastYear = currentYear - 1;

//   const currentMonthName = months[currentMonthIndex];
//   let previousMonthIndex = currentMonthIndex - 1;
//   if (previousMonthIndex < 0) previousMonthIndex = 11;
//   const previousMonthName = months[previousMonthIndex];

//   const labelLastYearSameMonth = `${currentMonthName} ${lastYear}`;
//   const labelCurrentMonth = `${currentMonthName} ${currentYear}`;
//   const labelPreviousMonth = `${previousMonthName} ${currentYear}`;

//   return (
//     <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md">
//       {cardTitle && (
//         <h3 className="text-xs font-semibold text-gray-800 mb-1 tracking-wide">
//           {cardTitle}
//         </h3>
//       )}

//       <div className="flex justify-between items-start border-b border-gray-100 pb-3">
//         <div className="flex flex-col items-start min-w-0 pr-3 w-1/2">
//           <h4 className="text-xs font-semibold text-gray-500 mb-1">
//             {lastYear}
//           </h4>
//           <h5 className="text-xl font-semibold text-indigo-800 truncate">
//             {quantityLastYear}
//           </h5>
//           <h5 className="text-[12px] font-normal text-gray-500 truncate">
//             {amountLastYear}
//           </h5>
//         </div>

//         <div className="flex flex-col items-end min-w-0 pl-3 w-1/2">
//           <h4 className="text-xs font-semibold text-gray-500 mb-1">
//             {currentYear}
//           </h4>
//           <h5 className="text-xl font-semibold text-indigo-800 truncate">
//             {quantityCurrentYear}
//           </h5>
//           <h5 className="text-[12px] font-normal text-gray-500 truncate">
//             {amountCurrentYear}
//           </h5>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-2 text-center pt-1">
//         <div className="flex flex-col p-1">
//           <p className="text-[11px] font-medium text-gray-500 mb-1">
//             {labelLastYearSameMonth}
//           </p>
//           <h4 className="text-lg font-semibold text-sky-700">
//             {lastYearMonthQuantity}
//           </h4>
//           <p className="text-[12px] font-normal text-gray-500 mt-1 truncate">
//             {lastYearMonthAmount}
//           </p>
//         </div>

//         <div className="flex flex-col p-1">
//           <p className="text-[11px] font-medium text-gray-500 mb-1">
//             {labelCurrentMonth}
//           </p>
//           <h4 className="text-lg font-semibold text-sky-700">
//             {currentMonthQuantity}
//           </h4>
//           <p className="text-[12px] font-normal text-gray-500 mt-1 truncate">
//             {currentMonthAmount}
//           </p>
//         </div>

//         <div className="flex flex-col p-1">
//           <p className="text-[11px] font-medium text-gray-500 mb-1">
//             {labelPreviousMonth}
//           </p>
//           <h4 className="text-lg font-semibold text-sky-700">
//             {previousMonthQuantity}
//           </h4>
//           <p className="text-[12px] font-normal text-gray-500 mt-1 truncate">
//             {previousMonthAmount}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ----------------------
// // New Collection Card
// // ----------------------
// const NewCollectionCard = ({ salesData, cardTitle = "Collection" }) => {
//   if (!salesData) return null;

//   const CollectionAmount2024 = salesData.LastYearCollection || "N/A";
//   const amount2025 = salesData.CurrentYearCollection || "N/A";

//   const currentMonthCollection = salesData.MonthCollection || "N/A";
//   const previousMonthCollection = salesData.PreviousMonthCollection || "N/A";

//   const dateParts = currentDate.split("-");
//   const currentMonthIndex = parseInt(dateParts[1], 10) - 1;
//   const currentYear = parseInt(dateParts[2], 10);
//   const lastYear = currentYear - 1;

//   const currentMonthName = months[currentMonthIndex];
//   let previousMonthIndex = currentMonthIndex - 1;
//   if (previousMonthIndex < 0) previousMonthIndex = 11;
//   const previousMonthName = months[previousMonthIndex];

//   const labelCurrentMonth = `${currentMonthName} ${currentYear}`;
//   const labelPreviousMonth = `${previousMonthName} ${currentYear}`;

//   return (
//     <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md">
//       {cardTitle && (
//         <h3 className="text-xs font-semibold text-gray-800 mb-1 tracking-wide">
//           {cardTitle}
//         </h3>
//       )}

//       <div className="flex justify-around items-start border-b border-gray-100 pb-3">
//         <div className="flex flex-col items-start min-w-0 pr-3">
//           <h4 className="text-xs font-semibold text-gray-500 mb-1">
//             {lastYear}
//           </h4>
//           <h5 className="text-lg font-semibold text-indigo-800">
//             {CollectionAmount2024}
//           </h5>
//         </div>

//         <div className="flex flex-col items-end min-w-0 pl-3">
//           <h4 className="text-xs font-semibold text-gray-500 mb-1">
//             {currentYear}
//           </h4>
//           <h5 className="text-lg font-semibold text-indigo-800">
//             {amount2025}
//           </h5>
//         </div>
//       </div>

//       <div className="pt-2 flex-grow flex items-center justify-center">
//         <div className="flex justify-center items-center text-center w-full">
//           <div className="flex flex-col p-2 border-r border-gray-100 flex-1">
//             <p className="text-[11px] font-medium text-gray-500 mb-1">
//               {labelCurrentMonth}
//             </p>
//             <p
//               className="text-lg font-semibold text-sky-700 mt-1"
//               title={currentMonthCollection}
//             >
//               {currentMonthCollection}
//             </p>
//           </div>

//           <div className="flex flex-col p-2 flex-1">
//             <p className="text-[11px] font-medium text-gray-500 mb-1">
//               {labelPreviousMonth}
//             </p>
//             <p
//               className="text-lg font-semibold text-sky-700 mt-1"
//               title={previousMonthCollection}
//             >
//               {previousMonthCollection}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ----------------------
// // New Payment Card
// // ----------------------
// const NewPaymentCard = ({ salesData, cardTitle = "Payment" }) => {
//   if (!salesData) return null;

//   const PaymentAmount2024 = salesData.LastYearPayment || "N/A";
//   const amount2025 = salesData.CurrentYearPayment || "N/A";
//   const currentMonthPayment = salesData.MonthPayment || "N/A";
//   const previousMonthPayment = salesData.PreviousMonthPayment || "N/A";

//   const dateParts = currentDate.split("-");
//   const currentMonthIndex = parseInt(dateParts[1], 10) - 1;
//   const currentYear = parseInt(dateParts[2], 10);
//   const lastYear = currentYear - 1;

//   const currentMonthName = months[currentMonthIndex];
//   let previousMonthIndex = currentMonthIndex - 1;
//   if (previousMonthIndex < 0) previousMonthIndex = 11;
//   const previousMonthName = months[previousMonthIndex];

//   const labelCurrentMonth = `${currentMonthName} ${currentYear}`;
//   const labelPreviousMonth = `${previousMonthName} ${currentYear}`;

//   return (
//     <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md">
//       {cardTitle && (
//         <h3 className="text-xs font-semibold text-gray-800 mb-1 tracking-wide">
//           {cardTitle}
//         </h3>
//       )}

//       <div className="flex justify-around items-start border-b border-gray-100 pb-3">
//         <div className="flex flex-col items-start min-w-0 pr-3">
//           <h4 className="text-xs font-semibold text-gray-500 mb-1">
//             {lastYear}
//           </h4>
//           <h5 className="text-lg font-semibold text-indigo-800">
//             {PaymentAmount2024}
//           </h5>
//         </div>

//         <div className="flex flex-col items-end min-w-0 pl-3">
//           <h4 className="text-xs font-semibold text-gray-500 mb-1">
//             {currentYear}
//           </h4>
//           <h5 className="text-lg font-semibold text-indigo-800">
//             {amount2025}
//           </h5>
//         </div>
//       </div>

//       <div className="pt-2 flex-grow flex items-center justify-center">
//         <div className="flex justify-center items-center text-center w-full">
//           <div className="flex flex-col p-2 border-r border-gray-100 flex-1">
//             <p className="text-[11px] font-medium text-gray-500 mb-1">
//               {labelCurrentMonth}
//             </p>
//             <p
//               className="text-lg font-semibold text-sky-700 mt-1"
//               title={currentMonthPayment}
//             >
//               {currentMonthPayment}
//             </p>
//           </div>

//           <div className="flex flex-col p-2 flex-1">
//             <p className="text-[11px] font-medium text-gray-500 mb-1">
//               {labelPreviousMonth}
//             </p>
//             <p
//               className="text-lg font-semibold text-sky-700 mt-1"
//               title={previousMonthPayment}
//             >
//               {previousMonthPayment}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ------------------------------
// // Horizontal Range Card
// // ------------------------------
// const HorizontalRangeCard = ({ stats, cardTitle = null }) => (
//   <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-3 flex flex-col transition-all duration-300 hover:shadow-md">
//     {cardTitle && (
//       <>
//         <h3 className="text-xs font-semibold text-gray-800 mb-2 px-1 tracking-wide">
//           {cardTitle}
//         </h3>
//         <hr className="mb-2 border-gray-100" />
//       </>
//     )}

//     <div className="flex justify-between divide-x divide-gray-100">
//       {stats.map((stat) => (
//         <div
//           key={stat.range}
//           className="flex-1 px-2 py-1 flex flex-col items-center min-w-0 rounded-md hover:bg-gray-50 transition"
//         >
//           <p className="text-[11px] font-medium text-gray-500 mb-1">
//             {stat.range}
//           </p>
//           <p
//             className="text-lg font-semibold text-indigo-800"
//             title={`Customers: ${stat.numbers}`}
//           >
//             {String(stat.numbers)}
//           </p>

//           <p
//             className="text-[11px] font-normal text-gray-500 truncate mt-0.5"
//             title={`Amount: ${stat.amount}`}
//           >
//             {String(stat.amount)}
//           </p>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // ------------------------------
// // Horizontal Agging Range Card
// // ------------------------------
// const HorizontalAggingRangeCard = ({ stats, cardTitle = null }) => (
//   <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-3 flex flex-col transition-all duration-300 hover:shadow-md">
//     {cardTitle && (
//       <>
//         <h3 className="text-xs font-semibold text-gray-800 mb-2 px-1 tracking-wide">
//           {cardTitle}
//         </h3>
//         <hr className="mb-2 border-gray-100" />
//       </>
//     )}

//     <div className="flex justify-between divide-x divide-gray-100">
//       {stats.map((stat) => (
//         <div
//           key={stat.range}
//           className="flex-1 px-2 py-1 flex flex-col items-center min-w-0 rounded-md hover:bg-gray-50 transition"
//         >
//           <p className="text-[11px] font-medium text-gray-500 mb-1">
//             {stat.range}
//           </p>
//           <p
//             className="text-lg font-semibold text-indigo-800"
//             title={`Customers: ${stat.numbers}`}
//           >
//             {String(stat.numbers)}
//           </p>

//           <p
//             className="text-[11px] font-normal text-gray-500 truncate mt-0.5"
//             title={`Amount: ${stat.amount}`}
//           >
//             {String(stat.amount)}
//           </p>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // ----------------------
// // PKR Formatter
// // ----------------------
// const formatPKR = (value) => {
//   if (!value || value === "N/A") return "N/A";

//   const number = Number(value.toString().replace(/,/g, ""));
//   if (isNaN(number)) return value;

//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "PKR",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(number);
// };

// // ----------------------
// // New Cash Bank Card
// // ----------------------
// const NewCashBankCard = ({ balanceData, cardTitle = "Cash/Bank Balance" }) => {
//   if (!balanceData) return null;

//   const cashBalance = balanceData.CashBal || "N/A";
//   const bankBalance = balanceData.BankBal || "N/A";

//   const formattedCash = formatPKR(cashBalance);
//   const formattedBank = formatPKR(bankBalance);

//   return (
//     <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md">
//       {cardTitle && (
//         <h3 className="text-xs font-semibold text-gray-800 tracking-wide">
//           {cardTitle}
//         </h3>
//       )}

//       <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
//         <p className="text-[11px] font-medium text-gray-500 mb-1">
//           Cash Balance
//         </p>
//         <h2 className="text-lg font-semibold text-indigo-800 text-center">
//           {formattedCash}
//         </h2>
//       </div>

//       <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
//         <p className="text-[11px] font-medium text-gray-500 mb-1">
//           Bank Balance
//         </p>
//         <h2 className="text-lg font-semibold text-indigo-800 text-center">
//           {formattedBank}
//         </h2>
//       </div>
//     </div>
//   );
// };

// // ----------------------
// // DASHBOARD MAIN COMPONENT
// // ----------------------
// const AmericanDashboard = () => {
//   const [adminData, setAdminData] = useState(null);
//   const [monthlyData, setMonthlyData] = useState(null);
//   const [dailyData, setDailyData] = useState(null);
//   const [dailyWebData, setDailyWebData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [aggingData, setAggingData] = useState(null);

//   const parseData = (dataObject, prefix = "") => {
//     if (!dataObject) return Array(12).fill(0);

//     return months.map((month) => {
//       const key = `${prefix}${month}`;
//       const valueString = dataObject[key];
//       if (!valueString) return 0;

//       const cleanedValue = valueString.toString().replace(/,/g, "");
//       const value = parseFloat(cleanedValue);
//       return isNaN(value) ? 0 : value;
//     });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const adminFormData = new FormData();
//         adminFormData.append("code", "AMRELEC");

//         const monthlyFormData = new FormData();
//         monthlyFormData.append("code", "AMRELEC");
//         monthlyFormData.append("FRepYer", "2025");

//         const dailyFormData = new FormData();
//         dailyFormData.append("code", "AMRELEC");
//         dailyFormData.append("FRepDat", currentDate);
//         dailyFormData.append("FLocCod", "001");

//         const dailyWebFormData = new FormData();
//         dailyWebFormData.append("code", "AMRELEC");
//         dailyWebFormData.append("FRepDat", currentDate);
//         dailyWebFormData.append("FLocCod", "001");

//         const americanAggingFormData = new FormData();
//         americanAggingFormData.append("code", "AMRELEC");
//         americanAggingFormData.append("FRepDat", getAggingDateFormatted());

//         const [
//           adminResponse,
//           monthlyResponse,
//           dailyResponse,
//           dailyWebResponse,
//           dailyAggingResponse,
//         ] = await Promise.all([
//           axios.post(ADMIN_INFO_API_URL, adminFormData),
//           axios.post(MONTHLY_COMPARISON_API_URL, monthlyFormData),
//           axios.post(DASHBOARD_DAILY, dailyFormData),
//           axios.post(DASHBOARD_DAILY_WEB, dailyWebFormData),
//           axios.post(AMERICAN_AGGING_API_URL, americanAggingFormData),
//         ]);

//         setAdminData(adminResponse.data);
//         setMonthlyData(monthlyResponse.data);

//         const dailyResponseData = Array.isArray(dailyResponse.data)
//           ? dailyResponse.data[0]
//           : dailyResponse.data;
//         setDailyData(dailyResponseData);

//         const dailyWebResponseData = Array.isArray(dailyWebResponse.data)
//           ? dailyWebResponse.data[0]
//           : dailyWebResponse.data;
//         setDailyWebData(dailyWebResponseData);

//         const aggingResponseData = Array.isArray(dailyAggingResponse.data)
//           ? dailyAggingResponse.data[0]
//           : dailyAggingResponse.data;
//         setAggingData(aggingResponseData);
//       } catch (err) {
//         console.error("API Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 text-sm">
//         Loading Admin Data...
//       </div>
//     );

//   const mainData = (Array.isArray(adminData) ? adminData[0] : adminData) || {};
//   const webData = dailyWebData || {};
//   const aggingMainData =
//     (Array.isArray(aggingData) ? aggingData[0] : aggingData) || {};

//   const newRangeDataKeys = [
//     { range: "≤ 0 (Nil)", amtKey: "Amt001", nosKey: "Nos001" },
//     { range: "< 1M", amtKey: "Amt002", nosKey: "Nos002" },
//     { range: "< 2M", amtKey: "Amt003", nosKey: "Nos003" },
//     { range: "< 5M", amtKey: "Amt004", nosKey: "Nos004" },
//     { range: "< 100M", amtKey: "Amt005", nosKey: "Nos005" },
//     { range: "> 100M", amtKey: "Amt006", nosKey: "Nos006" },
//   ];

//   const newRangeStats = newRangeDataKeys.map((item) => ({
//     range: item.range,
//     amount: mainData[item.amtKey] || "N/A",
//     numbers: mainData[item.nosKey] || "N/A",
//   }));

//   const newRangeAggingDataKeys = [
//     { range: "≤ 30", amtKey: "Amt001", nosKey: "Nos001" },
//     { range: "≤ 60", amtKey: "Amt002", nosKey: "Nos002" },
//     { range: "≤ 90", amtKey: "Amt003", nosKey: "Nos003" },
//     { range: "≤ 120", amtKey: "Amt004", nosKey: "Nos004" },
//     { range: "≤ 180M", amtKey: "Amt005", nosKey: "Nos005" },
//     { range: "> 180M", amtKey: "Amt006", nosKey: "Nos006" },
//   ];

//   const newRangeAggingStats = newRangeAggingDataKeys.map((item) => ({
//     range: item.range,
//     amount: aggingMainData[item.amtKey] || "N/A",
//     numbers: aggingMainData[item.nosKey] || "N/A",
//   }));

//   const isMonthlyDataAvailable =
//     monthlyData && Object.keys(monthlyData).length > 0;

//   const salesData = parseData(monthlyData, "S");
//   const purchaseData = parseData(monthlyData, "P");
//   const expenseData = parseData(monthlyData, "E");
//   const collectionData = parseData(monthlyData, "C");

//   return (
//     <div
//       className="min-h-screen w-full bg-gradient-to-b from-[#f3f6ff] to-[#f9fbff] px-3 py-4"
//       style={{
//         fontFamily:
//           '"SF Pro Display","SF Pro Text",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif"',
//       }}
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* HEADER */}
//         <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
//           <div>
//             <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
//               American Dashboard
//             </h1>
//             <p className="text-[11px] text-gray-500 mt-1">
//               Code: AMRELEC • Snapshot date: {currentDate}
//             </p>
//           </div>

//           {dailyData && (
//             <div className="flex items-center gap-3 text-[11px] text-gray-600">
//               <div className="px-3 py-2 bg-white rounded-full shadow-sm border border-gray-100">
//                 <span className="font-semibold text-indigo-700">
//                   Today&apos;s Sale:{" "}
//                 </span>
//                 <span>{dailyData?.TodaySale ?? "-"}</span>
//               </div>
//             </div>
//           )}
//         </header>

//         {/* TOP METRIC CARDS */}
//         <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
//           <HorizontalBalanceCard mainData={mainData} cardTitle="Customer" />
//           <NewSalesCard salesData={webData} cardTitle="Sale" />
//           <NewPurchaseCard purchaseData={webData} cardTitle="Purchase" />
//           <NewCollectionCard salesData={webData} cardTitle="Collection" />
//           <NewPaymentCard salesData={webData} cardTitle="Payment" />
//           <NewCashBankCard
//             balanceData={webData}
//             cardTitle="Cash & Bank Balance"
//           />
//         </section>

//         {/* MAIN GRID SECTION (LIKE REFERENCE: CENTER + RIGHT SIDEBAR) */}
//         <section className="grid gap-5 xl:grid-cols-3 items-start">
//           {/* LEFT / CENTER AREA */}
//           <div className="xl:col-span-2 space-y-5">
//             {/* Monthly Comparison Chart */}
//             <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 pt-3 px-4 pb-4 h-[360px]">
//               <h3 className="text-xs font-semibold text-gray-800 mb-3 border-b border-gray-100 pb-2 tracking-wide">
//                 Monthly Performance Comparison (in Millions)
//               </h3>
//               <div className="h-[calc(100%-40px)]">
//                 {isMonthlyDataAvailable ? (
//                   <Bar
//                     data={{
//                       labels: months,
//                       datasets: [
//                         {
//                           label: "Sales",
//                           data: salesData,
//                           backgroundColor: ChartColors.Sales,
//                           borderRadius: 8,
//                         },
//                         {
//                           label: "Purchase",
//                           data: purchaseData,
//                           backgroundColor: ChartColors.Purchase,
//                           borderRadius: 8,
//                         },
//                         {
//                           label: "Expense",
//                           data: expenseData,
//                           backgroundColor: ChartColors.Expense,
//                           borderRadius: 8,
//                         },
//                         {
//                           label: "Collection",
//                           data: collectionData,
//                           backgroundColor: ChartColors.Collection,
//                           borderRadius: 8,
//                         },
//                       ],
//                     }}
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       plugins: {
//                         legend: {
//                           position: "top",
//                           labels: { usePointStyle: true, padding: 16 },
//                         },
//                       },
//                       scales: {
//                         x: { grid: { display: false } },
//                         y: {
//                           ticks: {
//                             callback: (value) => value + "M",
//                             color: "#6b7280",
//                           },
//                           grid: { color: "rgba(0,0,0,0.04)" },
//                         },
//                       },
//                     }}
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-gray-500 text-sm">
//                     Monthly comparison data not available.
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Yearly SPC Graph */}
//             <YearlySPCGraph apiData={webData} />

//             {/* Customer Range Card */}
//             <HorizontalRangeCard
//               stats={newRangeStats}
//               cardTitle="Customer Amount & Count by Range"
//             />

//             {/* Admin Agging Range */}
//             <HorizontalAggingRangeCard
//               stats={newRangeAggingStats}
//               cardTitle="Admin Agging (Days)"
//             />
//           </div>

//           {/* RIGHT COLUMN (INFO SIDEBAR STYLE) */}
//           <div className="space-y-5">
//             <StaffSummaryCard webData={webData} />
//             <FinanceSummaryCard webData={webData} />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AmericanDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AmericanDashboard.css";
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
import { Pie } from "react-chartjs-2";
import { ArcElement } from "chart.js";
ChartJS.register(ArcElement);
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
        borderRadius: 10,
        barThickness: 18,
      },
      {
        label: "Purchase",
        data: [lastYearPur, currentYearPur],
        backgroundColor: ChartColors.YearlyPurchase,
        borderRadius: 10,
        barThickness: 18,
      },
      {
        label: "Collection",
        data: [lastYearCollection, currentYearCollection],
        backgroundColor: ChartColors.YearlyCollection,
        borderRadius: 10,
        barThickness: 18,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { usePointStyle: true, padding: 16 },
      },
      title: {
        display: true,
        text: "Yearly Comparison (in Millions)",
        color: "#111827",
        font: {
          size: 13,
          weight: "600",
          family:
            '"SF Pro Display","SF Pro Text",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        },
      },
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
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-4 h-[260px]">
      <YearBar data={data} options={options} />
    </div>
  );
};

// ----------------------
// Staff Summary Card
// ----------------------
const StaffSummaryCard = ({ webData }) => {
  if (!webData) return null;

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-4">
      <h3 className="text-xs font-semibold text-gray-800 mb-3 tracking-wide">
        Staff Summary
      </h3>

      <div className="grid grid-cols-2 grid-rows-2 divide-x divide-y divide-gray-100 text-center text-[12px]">
        <div className="p-3">
          <p className="text-[11px] font-medium text-gray-500">SalesMan</p>
          <p className="text-lg font-semibold text-indigo-700">
            {webData?.SalesMan || "-"}
          </p>
        </div>

        <div className="p-3">
          <p className="text-[11px] font-medium text-gray-500">City</p>
          <p className="text-lg font-semibold text-indigo-700">
            {webData?.Stores || "-"}
          </p>
        </div>

        <div className="p-3">
          <p className="text-[11px] font-medium text-gray-500">Region</p>
          <p className="text-lg font-semibold text-indigo-700">
            {webData?.Region || "-"}
          </p>
        </div>

        <div className="p-3">
          <p className="text-[11px] font-medium text-gray-500">Managers</p>
          <p className="text-lg font-semibold text-indigo-700">
            {webData?.Managers || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// New Financial Pie Chart
// ----------------------
const FinancialPieChart = ({ webData }) => {
  if (!webData) return null;

  const rawValues = {
    receivable: webData?.Receivable || "0",
    payable: webData?.Payable || "0",
    stock: webData?.["Total Stock"] || "0",
    expense: webData?.Expense || "0",
  };

  const numericValues = {
    receivable: Number(rawValues.receivable.replace(/,/g, "")) || 0,
    payable: Number(rawValues.payable.replace(/,/g, "")) || 0,
    stock: Number(rawValues.stock.replace(/,/g, "")) || 0,
    expense: Number(rawValues.expense.replace(/,/g, "")) || 0,
  };

  const dynamicColors = [
    numericValues.receivable < 0 ? "#FF3B30" : "#4F6DFF",
    numericValues.payable < 0 ? "#FF3B30" : "#FF7E95",
    numericValues.stock < 0 ? "#FF3B30" : "#FFD66B",
    numericValues.expense < 0 ? "#FF3B30" : "#2BBEB9",
  ];

  const data = {
    labels: ["Receivable", "Payable", "Stock", "Expense"],
    datasets: [
      {
        data: [
          Math.abs(numericValues.receivable),
          Math.abs(numericValues.payable),
          Math.abs(numericValues.stock),
          Math.abs(numericValues.expense),
        ],
        backgroundColor: dynamicColors,
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutout: "62%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 12,
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (ctx) {
            const dataset = ctx.dataset.data;
            const total = dataset.reduce((a, b) => a + b, 0);
            const value = dataset[ctx.dataIndex];
            const percentage = ((value / total) * 100).toFixed(1);

            const original = [
              numericValues.receivable,
              numericValues.payable,
              numericValues.stock,
              numericValues.expense,
            ][ctx.dataIndex];

            return `${
              ctx.label
            }: ${original.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="financial-pie-card">
      <h3 className="text-xs font-semibold text-gray-800 tracking-wide mb-2">
        Financial Breakdown
      </h3>
      <div className="financial-pie-wrapper">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};
// ----------------------
// New finance Card
// ----------------------
const FinanceSummaryCard = ({ webData }) => {
  if (!webData) return null;

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-4">
      <h3 className="text-xs font-semibold text-gray-800 mb-3 tracking-wide">
        Financial Summary
      </h3>

      <div className="grid grid-cols-2 grid-rows-2 divide-x divide-y divide-gray-100 text-center text-[12px]">
        <div className="p-3">
          <p className="text-[11px] font-medium text-gray-500">Receivable</p>
          <p className="text-lg font-semibold text-indigo-700">
            {webData?.Receivable || "-"}
          </p>
        </div>

        <div className="p-3">
          <p className="text-[11px] font-medium text-gray-500">Payable</p>
          <p className="text-lg font-semibold text-indigo-700">
            {webData?.Payable || "-"}
          </p>
        </div>

        <div className="p-3">
          <p className="text-[11px] font-medium text-gray-500">Stock</p>
          <p className="text-lg font-semibold text-indigo-700">
            {webData?.["Total Stock"] || "-"}
          </p>
        </div>

        <div className="p-3">
          <p className="text-[11px] font-medium text-gray-500">Expense</p>
          <p className="text-lg font-semibold text-indigo-700">
            {webData?.Expense || "-"}
          </p>
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
    <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md">
      {cardTitle && (
        <h3 className="text-xs font-semibold text-gray-800 tracking-wide">
          {cardTitle}
        </h3>
      )}

      <div className="flex justify-between items-end border-b border-gray-100 pb-3">
        <div>
          <p className="text-[11px] font-medium text-gray-500">
            Total Customers
          </p>
          <h2 className="text-3xl font-semibold text-indigo-800 mt-1">
            {formatValue("Total Customer")}
          </h2>
        </div>

        <div className="text-right">
          <p className="text-[11px] font-medium text-gray-500">Total Balance</p>
          <h2 className="text-xl font-semibold text-gray-900 mt-1">
            {formatValue("Total Balance")}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center pt-1">
        <div className="flex flex-col px-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">
            Non-Active
          </p>
          <h4 className="text-lg font-semibold text-sky-700">
            {formatValue("Non Active")}
          </h4>
          <p
            className="text-[11px] text-gray-500 mt-1 truncate cursor-pointer hover:underline"
            title={formatValue("Non Active")}
            onClick={() =>
              window.open(
                window.location.origin + "/AmericanNonActive",
                "_blank"
              )
            }
          >
            {formatValue("Non Active")}
          </p>
        </div>

        <div className="flex flex-col px-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">Advance</p>
          <h4 className="text-lg font-semibold text-sky-700">
            {formatValue("Advance Customer")}
          </h4>
          <p
            className="text-[11px] ext-emerald-600 mt-1 truncate cursor-pointer hover:underline"
            title={formatValue("Advance Amount")}
            onClick={() =>
              window.open(window.location.origin + "/AmericanAdvance", "_blank")
            }
          >
            {formatValue("Advance Amount")}
          </p>
        </div>

        {/* <div className="flex flex-col px-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">Nil</p>
          <h4 className="text-lg font-semibold text-sky-700">
            {formatValue("Nil Customer")}
          </h4>
          <p className="text-[11px] text-gray-400 mt-1">-</p>
        </div> */}
        <div className="flex flex-col px-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">Nil</p>
          <h4 className="text-lg font-semibold text-sky-700">
            {formatValue("Nil Customer")}
          </h4>
          <p
            className="text-[11px] text-gray-500 mt-1 truncate cursor-pointer hover:underline"
            title={formatValue("Nil Amount")}
            onClick={() =>
              window.open(window.location.origin + "/AmericanNil", "_blank")
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
            className="text-[11px] text-red-500 mt-1 truncate cursor-pointer hover:underline"
            title={formatValue("OutStanding Amount")}
            onClick={() =>
              window.open(
                window.location.origin + "/AmericanOutstanding",
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
    <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md">
      {cardTitle && (
        <h3 className="text-xs font-semibold text-gray-800 mb-1 tracking-wide">
          {cardTitle}
        </h3>
      )}

      <div className="flex justify-between items-start border-b border-gray-100 pb-3">
        <div className="flex flex-col items-start min-w-0 pr-3 w-1/2">
          <h4 className="text-xs font-semibold text-gray-500 mb-1">
            {lastYear}
          </h4>
          <h5
            className="text-xl font-semibold text-indigo-800 truncate"
            title={`Quantity: ${quantity2024}`}
          >
            {quantity2024}
          </h5>
          <h5
            className="text-[12px] font-normal text-gray-500 truncate"
            title={`Amount: ${amount2024}`}
          >
            {amount2024}
          </h5>
        </div>

        <div className="flex flex-col items-end min-w-0 pl-3 w-1/2">
          <h4 className="text-xs font-semibold text-gray-500 mb-1">
            {currentYear}
          </h4>
          <h5
            className="text-xl font-semibold text-indigo-800 truncate"
            title={`Quantity: ${quantity2025}`}
          >
            {quantity2025}
          </h5>
          <h5
            className="text-[12px] font-normal text-gray-500 truncate"
            title={`Amount: ${amount2025}`}
          >
            {amount2025}
          </h5>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center pt-1">
        <div className="flex flex-col p-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">
            {labelLastYearSameMonth}
          </p>
          <h4 className="text-lg font-semibold text-sky-700">
            {lastYearMonthQuantity}
          </h4>
          <p
            className="text-[12px] font-normal text-gray-500 mt-1 truncate"
            title={lastYearMonthAmount}
          >
            {lastYearMonthAmount}
          </p>
        </div>

        <div className="flex flex-col p-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">
            {labelCurrentMonth}
          </p>
          <h4 className="text-lg font-semibold text-sky-700">
            {currentMonthQuantity}
          </h4>
          <p
            className="text-[12px] font-normal text-gray-500 mt-1 truncate"
            title={currentMonthAmount}
          >
            {currentMonthAmount}
          </p>
        </div>

        <div className="flex flex-col p-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">
            {labelPreviousMonth}
          </p>
          <h4 className="text-lg font-semibold text-sky-700">
            {previousMonthQuantity}
          </h4>
          <p
            className="text-[12px] font-normal text-gray-500 mt-1 truncate"
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
    <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md">
      {cardTitle && (
        <h3 className="text-xs font-semibold text-gray-800 mb-1 tracking-wide">
          {cardTitle}
        </h3>
      )}

      <div className="flex justify-between items-start border-b border-gray-100 pb-3">
        <div className="flex flex-col items-start min-w-0 pr-3 w-1/2">
          <h4 className="text-xs font-semibold text-gray-500 mb-1">
            {lastYear}
          </h4>
          <h5 className="text-xl font-semibold text-indigo-800 truncate">
            {quantityLastYear}
          </h5>
          <h5 className="text-[12px] font-normal text-gray-500 truncate">
            {amountLastYear}
          </h5>
        </div>

        <div className="flex flex-col items-end min-w-0 pl-3 w-1/2">
          <h4 className="text-xs font-semibold text-gray-500 mb-1">
            {currentYear}
          </h4>
          <h5 className="text-xl font-semibold text-indigo-800 truncate">
            {quantityCurrentYear}
          </h5>
          <h5 className="text-[12px] font-normal text-gray-500 truncate">
            {amountCurrentYear}
          </h5>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center pt-1">
        <div className="flex flex-col p-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">
            {labelLastYearSameMonth}
          </p>
          <h4 className="text-lg font-semibold text-sky-700">
            {lastYearMonthQuantity}
          </h4>
          <p className="text-[12px] font-normal text-gray-500 mt-1 truncate">
            {lastYearMonthAmount}
          </p>
        </div>

        <div className="flex flex-col p-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">
            {labelCurrentMonth}
          </p>
          <h4 className="text-lg font-semibold text-sky-700">
            {currentMonthQuantity}
          </h4>
          <p className="text-[12px] font-normal text-gray-500 mt-1 truncate">
            {currentMonthAmount}
          </p>
        </div>

        <div className="flex flex-col p-1">
          <p className="text-[11px] font-medium text-gray-500 mb-1">
            {labelPreviousMonth}
          </p>
          <h4 className="text-lg font-semibold text-sky-700">
            {previousMonthQuantity}
          </h4>
          <p className="text-[12px] font-normal text-gray-500 mt-1 truncate">
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
    <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md">
      {cardTitle && (
        <h3 className="text-xs font-semibold text-gray-800 mb-1 tracking-wide">
          {cardTitle}
        </h3>
      )}

      <div className="flex justify-around items-start border-b border-gray-100 pb-3">
        <div className="flex flex-col items-start min-w-0 pr-3">
          <h4 className="text-xs font-semibold text-gray-500 mb-1">
            {lastYear}
          </h4>
          <h5 className="text-lg font-semibold text-indigo-800">
            {CollectionAmount2024}
          </h5>
        </div>

        <div className="flex flex-col items-end min-w-0 pl-3">
          <h4 className="text-xs font-semibold text-gray-500 mb-1">
            {currentYear}
          </h4>
          <h5 className="text-lg font-semibold text-indigo-800">
            {amount2025}
          </h5>
        </div>
      </div>

      <div className="pt-2 flex-grow flex items-center justify-center">
        <div className="flex justify-center items-center text-center w-full">
          <div className="flex flex-col p-2 border-r border-gray-100 flex-1">
            <p className="text-[11px] font-medium text-gray-500 mb-1">
              {labelCurrentMonth}
            </p>
            <p
              className="text-lg font-semibold text-sky-700 mt-1"
              title={currentMonthCollection}
            >
              {currentMonthCollection}
            </p>
          </div>

          <div className="flex flex-col p-2 flex-1">
            <p className="text-[11px] font-medium text-gray-500 mb-1">
              {labelPreviousMonth}
            </p>
            <p
              className="text-lg font-semibold text-sky-700 mt-1"
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
    <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md">
      {cardTitle && (
        <h3 className="text-xs font-semibold text-gray-800 mb-1 tracking-wide">
          {cardTitle}
        </h3>
      )}

      <div className="flex justify-around items-start border-b border-gray-100 pb-3">
        <div className="flex flex-col items-start min-w-0 pr-3">
          <h4 className="text-xs font-semibold text-gray-500 mb-1">
            {lastYear}
          </h4>
          <h5 className="text-lg font-semibold text-indigo-800">
            {PaymentAmount2024}
          </h5>
        </div>

        <div className="flex flex-col items-end min-w-0 pl-3">
          <h4 className="text-xs font-semibold text-gray-500 mb-1">
            {currentYear}
          </h4>
          <h5 className="text-lg font-semibold text-indigo-800">
            {amount2025}
          </h5>
        </div>
      </div>

      <div className="pt-2 flex-grow flex items-center justify-center">
        <div className="flex justify-center items-center text-center w-full">
          <div className="flex flex-col p-2 border-r border-gray-100 flex-1">
            <p className="text-[11px] font-medium text-gray-500 mb-1">
              {labelCurrentMonth}
            </p>
            <p
              className="text-lg font-semibold text-sky-700 mt-1"
              title={currentMonthPayment}
            >
              {currentMonthPayment}
            </p>
          </div>

          <div className="flex flex-col p-2 flex-1">
            <p className="text-[11px] font-medium text-gray-500 mb-1">
              {labelPreviousMonth}
            </p>
            <p
              className="text-lg font-semibold text-sky-700 mt-1"
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

// --- Range → API Params Mapping ---
// yahan values aap apne hisaab se adjust bhi kar sakti hain
const rangeApiMapping = {
  "≤ 0 (Nil)": { FIntAmt: -999999999, FFnlAmt: 0 },
  "< 1M": { FIntAmt: 1, FFnlAmt: 1000000 },
  "< 2M": { FIntAmt: 1000000, FFnlAmt: 2000000 },
  "< 5M": { FIntAmt: 2000000, FFnlAmt: 5000000 },
  "< 100M": { FIntAmt: 5000000, FFnlAmt: 100000000 },
  "> 100M": { FIntAmt: 100000000, FFnlAmt: 9999999999 },
};

// ------------------------------
// Horizontal Range Card (CLICKABLE)
// ------------------------------
const HorizontalRangeCard = ({ stats, cardTitle = null }) => {
  const handleRangeClick = (rangeLabel) => {
    const mapping = rangeApiMapping[rangeLabel];
    if (!mapping) return;

    const { FIntAmt, FFnlAmt } = mapping;

    // naya tab open with query params (min, max, label)
    const url =
      window.location.origin +
      `/CustomerBalance?min=${FIntAmt}&max=${FFnlAmt}&label=${encodeURIComponent(
        rangeLabel
      )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-3 flex flex-col transition-all duration-300 hover:shadow-md">
      {cardTitle && (
        <>
          <h3 className="text-xs font-semibold text-gray-800 mb-2 px-1 tracking-wide">
            {cardTitle}
          </h3>
          <hr className="mb-2 border-gray-100" />
        </>
      )}

      <div className="flex justify-between divide-x divide-gray-100">
        {stats.map((stat) => (
          <div
            key={stat.range}
            className="flex-1 px-2 py-1 flex flex-col items-center min-w-0 rounded-md hover:bg-gray-50 cursor-pointer transition"
            onClick={() => handleRangeClick(stat.range)}
          >
            <p className="text-[11px] font-medium text-gray-500 mb-1">
              {stat.range}
            </p>
            <p
              className="text-lg font-semibold text-indigo-800"
              title={`Customers: ${stat.numbers}`}
            >
              {String(stat.numbers)}
            </p>

            <p
              className="text-[11px] font-normal text-gray-500 truncate mt-0.5"
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

// ------------------------------
// Horizontal Agging Range Card
// ------------------------------
const HorizontalAggingRangeCard = ({ stats, cardTitle = null }) => (
  <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-3 flex flex-col transition-all duration-300 hover:shadow-md">
    {cardTitle && (
      <>
        <h3 className="text-xs font-semibold text-gray-800 mb-2 px-1 tracking-wide">
          {cardTitle}
        </h3>
        <hr className="mb-2 border-gray-100" />
      </>
    )}

    <div className="flex justify-between divide-x divide-gray-100">
      {stats.map((stat) => (
        <div
          key={stat.range}
          className="flex-1 px-2 py-1 flex flex-col items-center min-w-0 rounded-md hover:bg-gray-50 transition"
        >
          <p className="text-[11px] font-medium text-gray-500 mb-1">
            {stat.range}
          </p>
          <p
            className="text-lg font-semibold text-indigo-800"
            title={`Customers: ${stat.numbers}`}
          >
            {String(stat.numbers)}
          </p>

          <p
            className="text-[11px] font-normal text-gray-500 truncate mt-0.5"
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
    <div className="w-full bg-white rounded-[20px] shadow-sm border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md">
      {cardTitle && (
        <h3 className="text-xs font-semibold text-gray-800 tracking-wide">
          {cardTitle}
        </h3>
      )}

      <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
        <p className="text-[11px] font-medium text-gray-500 mb-1">
          Cash Balance
        </p>
        <h2 className="text-lg font-semibold text-indigo-800 text-center">
          {formattedCash}
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
        <p className="text-[11px] font-medium text-gray-500 mb-1">
          Bank Balance
        </p>
        <h2 className="text-lg font-semibold text-indigo-800 text-center">
          {formattedBank}
        </h2>
      </div>
    </div>
  );
};

// ----------------------
// Customer Distribution Chart
// ----------------------
const CustomerDistributionChart = ({ mainData }) => {
  if (!mainData) return null;

  const rawValues = {
    nonActive: mainData?.["Non Active"] || "0",
    advance: mainData?.["Advance Customer"] || "0",
    nil: mainData?.["Nil Customer"] || "0",
    outstanding: mainData?.["OutStanding Customer"] || "0",
  };

  const numericValues = {
    nonActive: Number(rawValues.nonActive.toString().replace(/,/g, "")) || 0,
    advance: Number(rawValues.advance.toString().replace(/,/g, "")) || 0,
    nil: Number(rawValues.nil.toString().replace(/,/g, "")) || 0,
    outstanding:
      Number(rawValues.outstanding.toString().replace(/,/g, "")) || 0,
  };

  const colors = ["#B3BBC6", "#4F6DFF", "#FFD66B", "#FF7E95"];

  const data = {
    labels: ["Non Active", "Advance", "Nil", "Outstanding"],
    datasets: [
      {
        data: [
          numericValues.nonActive,
          numericValues.advance,
          numericValues.nil,
          numericValues.outstanding,
        ],
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutout: "62%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 10,
          font: { size: 12, weight: 500 },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = ctx.dataset.data[ctx.dataIndex];
            return `${ctx.label}: ${val.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="customer-pie-card">
      <h3 className="text-xs font-semibold text-gray-800 tracking-wide mb-2">
        Customer Distribution
      </h3>
      <div className="customer-pie-wrapper">
        <Pie data={data} options={options} />
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
    { range: "< 100M", amtKey: "Amt005", nosKey: "Nos005" },
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
    <div
      className="american-dashboard dashboard-scroll"
      style={{
        fontFamily:
          '"SF Pro Display","SF Pro Text",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif"',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              American Dashboard
            </h1>
            <p className="text-[11px] text-gray-500 mt-1">
              Code: AMRELEC • Snapshot date: {currentDate}
            </p>
          </div>

          {dailyData && (
            <div className="flex items-center gap-3 text-[11px] text-gray-600">
              <div className="px-3 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                <span className="font-semibold text-indigo-700">
                  Today&apos;s Sale:{" "}
                </span>
                <span>{dailyData?.TodaySale ?? "-"}</span>
              </div>
            </div>
          )}
        </header>

        {/* TOP METRIC CARDS */}
        <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <HorizontalBalanceCard mainData={mainData} cardTitle="Customer" />
          <NewSalesCard salesData={webData} cardTitle="Sale" />
          <NewPurchaseCard purchaseData={webData} cardTitle="Purchase" />
          <NewCollectionCard salesData={webData} cardTitle="Collection" />
          <NewPaymentCard salesData={webData} cardTitle="Payment" />
          <NewCashBankCard
            balanceData={webData}
            cardTitle="Cash & Bank Balance"
          />
        </section>

        {/* MAIN GRID SECTION (LIKE REFERENCE: CENTER + RIGHT SIDEBAR) */}
        <section className="grid gap-5 xl:grid-cols-3 items-start">
          {/* LEFT / CENTER AREA */}
          <div className="xl:col-span-2 space-y-5">
            {/* Monthly Comparison Chart */}
            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 pt-3 px-4 pb-4 h-[360px]">
              <h3 className="text-xs font-semibold text-gray-800 mb-3 border-b border-gray-100 pb-2 tracking-wide">
                Monthly Performance Comparison (in Millions)
              </h3>
              <div className="h-[calc(100%-40px)]">
                {isMonthlyDataAvailable ? (
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
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top",
                          labels: { usePointStyle: true, padding: 16 },
                        },
                      },
                      scales: {
                        x: { grid: { display: false } },
                        y: {
                          ticks: {
                            callback: (value) => value + "M",
                            color: "#6b7280",
                          },
                          grid: { color: "rgba(0,0,0,0.04)" },
                        },
                      },
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                    Monthly comparison data not available.
                  </div>
                )}
              </div>
            </div>

            {/* Yearly SPC Graph */}
            <YearlySPCGraph apiData={webData} />

            {/* Customer Range Card */}
            <HorizontalRangeCard
              stats={newRangeStats}
              cardTitle="Customer Amount & Count by Range"
            />

            {/* Admin Agging Range */}
            <HorizontalAggingRangeCard
              stats={newRangeAggingStats}
              cardTitle="Admin Agging (Days)"
            />
          </div>

          {/* RIGHT COLUMN (INFO SIDEBAR STYLE) */}
          <div className="space-y-5">
            <StaffSummaryCard webData={webData} />
            <FinanceSummaryCard webData={webData} />
            <FinancialPieChart webData={webData} />
            <CustomerDistributionChart mainData={mainData} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AmericanDashboard;
