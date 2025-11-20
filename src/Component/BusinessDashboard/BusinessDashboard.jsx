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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// --- API URLs ---
const MAIN_API_URL = "https://crystalsolutions.com.pk/api/CSDashboard.php";
const DAILY_COLLECTION_API_URL =
  "https://crystalsolutions.com.pk/api/DailyMemberCollection.php";

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
// Format date DD-MM-YYYY
const getCurrentDateFormatted = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
// ----------------------
// Vertical Stats Card
// ----------------------
const VerticalStatsCard = ({ stats, cardTitle = null }) => (
  <div className="p-2 rounded-xl shadow-xl bg-white border border-gray-100 flex flex-col w-full h-full">
    {cardTitle && (
      <>
        <h3 className="text-base font-bold text-gray-800 mb-1 px-2">
          {cardTitle}
        </h3>
        <hr className="mb-1 border-gray-100" />
      </>
    )}

    {stats.map((stat, index) => (
      <div
        key={stat.title}
        className={`flex justify-between items-center p-1 ${
          index < stats.length - 1 ? "border-b border-gray-100" : ""
        } transition duration-150 hover:bg-gray-50`}
      >
        <p className="text-xs font-medium text-gray-500">{stat.title}</p>

        <h2
          className={`text-sm font-semibold ${
            stat.isDark
              ? "text-gray-900"
              : stat.isNegative
              ? "text-red-600"
              : "text-gray-800"
          }`}
        >
          {String(stat.value)}
        </h2>
      </div>
    ))}
  </div>
);
const DailyCollectionCard = ({ detail, totalAmount, cardTitle = null }) => {
  return (
    <div className="p-2 rounded-xl shadow-xl bg-white border border-gray-100 flex flex-col w-[300px] h-[400px]">
      {cardTitle && (
        <>
          <h3 className="text-base font-bold text-gray-800 mb-1 px-2">
            {cardTitle}
          </h3>
          <hr className="mb-1 border-gray-100" />
        </>
      )}
      {/* Header */}
      <div className="flex justify-between items-center p-1 font-bold text-xs text-gray-600 border-b border-gray-200">
        <p className="w-2/3">Member</p>
        <p className="w-1/3 text-right">Collection</p>
      </div>
      {/* Scrollable List */}
      <div className="flex-grow overflow-y-auto max-h-[300px]">
        {detail.length > 0 ? (
          detail.map((item, index) => (
            <div
              key={item["Trn#"] + index}
              className="flex justify-between items-center p-1 transition duration-150 hover:bg-gray-50 last:border-b-0"
            >
              <p className="text-xs text-gray-800 font-medium w-2/3 truncate">
                {item.Member}
              </p>
              <h2 className="text-sm font-semibold text-gray-800 w-1/3 text-right">
                {item.Collection}
              </h2>
            </div>
          ))
        ) : (
          <p className="text-xs text-center p-4 text-gray-500">
            No collections found for today.
          </p>
        )}
      </div>
      <hr className="mt-1 border-gray-200" />
      {/* Footer */}
      <div className="flex justify-between items-center px-1 py-1 bg-gray-50 rounded-b-lg mt-auto">
        <p className="text-sm font-bold text-gray-800">Total Amount</p>
        <h2 className="text-base font-semibold text-black">{totalAmount}</h2>
      </div>
    </div>
  );
};
// ----------------------
// Horizontal Stats Card
// ----------------------
const HorizontalStatsCard = ({ stats, cardTitle = null }) => (
  <div className="px-2 py-1 rounded-xl shadow-xl bg-white border border-gray-100 flex flex-col w-full h-fit">
    {cardTitle && (
      <>
        <h3 className="text-base font-bold text-gray-800 mb-1 px-2">
          {cardTitle}
        </h3>
        <hr className="mb-1 border-gray-100" />
      </>
    )}

    <div className="flex justify-between items-center gap-2 h-fit">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className={`flex flex-col items-center w-1/4 p-0.5 text-center ${
            index < stats.length - 1 ? "border-r border-gray-200" : ""
          }`}
        >
          <p className="text-xs font-semibold text-gray-600 mb-1">
            {stat.title}
          </p>

          <h2
            className={`text-sm font-bold ${
              stat.isNegative ? "text-red-600" : "text-gray-800"
            }`}
          >
            {String(stat.value)}
          </h2>
        </div>
      ))}
    </div>
  </div>
);
// ----------------------
// Dashboard Component
// ----------------------
const BusinessDashboard = () => {
  const [data, setData] = useState(null);
  const [dailyCollection, setDailyCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailyCollectionLoading, setDailyCollectionLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyCollectionError, setDailyCollectionError] = useState(null);
  const currentDate = getCurrentDateFormatted();
  // const currentDate = "13-11-2025";

  // Fetch Main Dashboard
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = new FormData();
        formData.append("code", "CRYSTALSOFT");
        formData.append("FLocCod", "001");
        formData.append("FYerDsc", "2025-2025");

        const response = await axios.post(MAIN_API_URL, formData);
        setData(response.data);
      } catch (err) {
        setError("Couldn't fetch main dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch Daily Collection
  useEffect(() => {
    const fetchDailyCollectionData = async () => {
      try {
        const formData = new FormData();
        formData.append("code", "CRYSTALSOFT");
        formData.append("FLocCod", "001");
        formData.append("FYerDsc", "2025-2025");
        formData.append("FIntDat", currentDate);
        formData.append("FFnlDat", currentDate);

        const response = await axios.post(DAILY_COLLECTION_API_URL, formData);
        setDailyCollection(response.data);
      } catch (err) {
        setDailyCollectionError("Couldn't fetch daily collection data.");
      } finally {
        setDailyCollectionLoading(false);
      }
    };

    fetchDailyCollectionData();
  }, [currentDate]);

  // month-wise data
  const parseData = (dataObject) => {
    if (!dataObject) return Array(12).fill(0);

    return months.map((month) => {
      const valueString = dataObject[month];
      if (!valueString) return 0;

      const cleanedValue = valueString.toString().replace(/,/g, "");
      const value = parseFloat(cleanedValue);

      return isNaN(value) ? 0 : value;
    });
  };

  if (loading || dailyCollectionLoading) {
    return (
      <div className="text-center p-10 text-xl text-black">
        Loading Dashboard Data...
      </div>
    );
  }

  if (error || dailyCollectionError) {
    return (
      <div className="text-center p-10 text-xl text-red-600">
        Error: {error || dailyCollectionError}
      </div>
    );
  }

  if (!data) return null;

  // Chart Data
  const collectionData = parseData(data.Collection);
  const expenseData = parseData(data.Expense);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Monthly Collection vs Expense",
        font: { size: 16, weight: "bold" },
      },
    },
  };

  const statsFromImage = [
    { title: "Total Balance", value: data.TotalBal, isDark: true },
    { title: "Total Arrear", value: data.TotalArrear },
    { title: "Total Collection", value: data.TotalCol },
    { title: "Total Expense", value: data.TotalExp },
    {
      title: "Profit",
      value: data.TotalProfit,
      isNegative: data.TotalProfit?.toString().includes("-"),
    },
  ];

  const membershipStats = [
    { title: "Total Members", value: data.TotalMembers },
    { title: "Today Members", value: data.TodayMembers },
    { title: "Month Member", value: data.MonthMembers },
    { title: "Month Leave Member", value: data.MonthLeaveMember },
  ];

  const feeAgingStats = [
    { title: "30 Days", value: data.PayDay30 },
    { title: "60 Days", value: data.PayDay60 },
    { title: "90 Days", value: data.PayDay90 },
    { title: "90+ Days", value: data.PayDay90Above },
  ];

  const monthBilling = [
    { title: "Monthly Bill", value: data["Month-Bil"] },
    { title: "Monthly Call", value: data["Month-Cal"] },
    { title: "Monthly Reminder", value: data["Month-Rem"] },
    { title: "Today Bill", value: data["Today-Bil"] },
    { title: "Today Call", value: data["Today-Cal"] },
    { title: "Today Reminder", value: data["Today-Rem"] },
  ];

  const dailyDetail = dailyCollection?.Detail || [];
  const dailyTotal = dailyCollection?.["Total Amount"] || "0";

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Financial Dashboard
      </h1>

      {/* Stats Cards */}
      <section className="mb-6 grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2">
          <VerticalStatsCard
            stats={statsFromImage}
            cardTitle="Financial Overview"
          />
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2">
          <VerticalStatsCard
            stats={membershipStats}
            cardTitle="Membership Stats"
          />
        </div>

        <div className="col-span-12 sm:col-span-12 lg:col-span-4 xl:col-span-2">
          {/* <HorizontalStatsCard
            stats={feeAgingStats}
            cardTitle="Fee Aging Status"
          /> */}
          <VerticalStatsCard stats={feeAgingStats} cardTitle="Fee Aging" />
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2">
          <VerticalStatsCard stats={monthBilling} cardTitle="Monthly Billing" />
        </div>

        {/* <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2">
          <VerticalStatsCard stats={DailyBilling} cardTitle="Daily Billing" />
        </div> */}
      </section>

      {/* Graph */}

      <section className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {/* 1. Daily Collection Card  */}
        <div className="col-span-1">
          <DailyCollectionCard
            detail={dailyDetail}
            totalAmount={dailyTotal}
            cardTitle={`Daily Collection (${currentDate})`}
          />
        </div>

        {/* 2. Graph  */}
        <div className="col-span-1 lg:col-span-3">
          <div className="bg-white p-6 rounded-xl shadow-xl border h-[400px] w-[610px]">
            <div className="h-[350px]">
              <Bar
                options={chartOptions}
                data={{
                  labels: months,
                  datasets: [
                    {
                      label: "Collection",
                      data: collectionData,
                      backgroundColor: "rgba(24, 153, 31, 0.81)",
                      borderRadius: 8,
                    },
                    {
                      label: "Expense",
                      data: expenseData,
                      backgroundColor: "rgba(190, 218, 68, 1)",
                      borderRadius: 8,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessDashboard;

