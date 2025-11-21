import React, { useState, useEffect, useRef } from "react";
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

// API Endpoints
const MAIN_API_URL = "https://crystalsolutions.com.pk/api/CSDashboard.php";
const DAILY_COLLECTION_API_URL =
  "https://crystalsolutions.com.pk/api/DailyMemberCollection.php";

// Array for month labels
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

/**
 * Formats the current date as DD-MM-YYYY for API consumption.
 * @returns {string} Formatted date string.
 */
const getCurrentDateFormatted = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/* ---------------- Vertical Stats Card ---------------- */
/**
 * Displays a list of statistics in a vertical card format.
 * Fix: Changed fixed width w-[400px] to flexible w-full.
 */
const VerticalStatsCard = ({ stats, cardTitle = null }) => (
  <div className="p-2 rounded-xl shadow-xl bg-white border border-gray-100 flex flex-col w-full h-full min-h-[250px]">
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

/* ---------------- Daily Collection Card ---------------- */
/**
 * Displays the daily member collection details and total.
 * Fix: Changed fixed width w-[250px] to flexible w-full.
 */
const DailyCollectionCard = ({ detail, totalAmount, cardTitle = null }) => {
  return (
    <div className="p-2 rounded-xl shadow-xl bg-white border border-gray-100 flex flex-col w-full h-[450px] min-h-[450px]">
      {cardTitle && (
        <>
          <h3 className="text-base font-bold text-gray-800 mb-1 px-2">
            {cardTitle}
          </h3>
          <hr className="mb-1 border-gray-100" />
        </>
      )}

      {/* Header Row */}
      <div className="flex justify-between items-center p-1 font-bold text-xs text-gray-600 border-b border-gray-200">
        <p className="w-2/3">Member</p>
        <p className="w-1/3 text-right">Collection</p>
      </div>

      {/* Scrollable Detail List */}
      <div className="flex-grow overflow-y-auto max-h-[350px]">
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

      {/* Total Amount Footer */}
      <div className="flex justify-between items-center px-1 py-1 bg-gray-50 rounded-b-lg mt-auto">
        <p className="text-sm font-bold text-gray-800">Total Amount</p>
        <h2 className="text-base font-semibold text-black">{totalAmount}</h2>
      </div>
    </div>
  );
};

/* ---------------- Dashboard Component ---------------- */
const BusinessDashboard = () => {
  const [data, setData] = useState(null);
  const [dailyCollection, setDailyCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailyCollectionLoading, setDailyCollectionLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyCollectionError, setDailyCollectionError] = useState(null);

  // Refs for responsive behavior
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  const currentDate = getCurrentDateFormatted();

  /* ---- Fetch Main Dashboard Data ---- */
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
        console.error("Error fetching main dashboard data:", err);
        setError("Couldn't fetch main dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ---- Fetch Daily Collection Data ---- */
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
        console.error("Error fetching daily collection data:", err);
        setDailyCollectionError("Couldn't fetch daily collection data.");
      } finally {
        setDailyCollectionLoading(false);
      }
    };

    fetchDailyCollectionData();
  }, [currentDate]);

  /**
   * Parses API data object into an array of numeric values for the chart.
   * Handles comma-separated string values and ensures 12 months are returned.
   * @param {Object} dataObject - The API response object (e.g., data.Collection).
   * @returns {number[]} Array of 12 numeric values.
   */
  const parseData = (dataObject) => {
    if (!dataObject) return Array(12).fill(0);

    return months.map((month) => {
      const valueString = dataObject[month];
      if (!valueString) return 0;

      // Clean up commas from string before parsing
      const cleanedValue = valueString.toString().replace(/,/g, "");
      const value = parseFloat(cleanedValue);

      return isNaN(value) ? 0 : value;
    });
  };

  /* ---------------- ResizeObserver for smooth chart resizing ---------------- */
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // Use ResizeObserver to trigger Chart.js resize on container changes
    const ro = new ResizeObserver(() => {
      // Debounce to avoid excessive calls
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        try {
          // Attempt to call the chart's resize method
          if (chartRef.current?.chart?.resize) {
            chartRef.current.chart.resize();
          }
        } catch (e) {
          // Silent swallow: resize is a best-effort operation
        }
      }, 120);
    });

    ro.observe(root);

    return () => {
      ro.disconnect();
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  if (loading || dailyCollectionLoading) {
    return (
      <div className="text-center p-10 text-xl text-gray-700 font-semibold bg-gray-50 min-h-screen">
        Loading Financial Dashboard Data...
      </div>
    );
  }

  if (error || dailyCollectionError) {
    return (
      <div className="text-center p-10 text-xl text-red-600 bg-gray-50 min-h-screen">
        Error: {error || dailyCollectionError}
      </div>
    );
  }

  // Ensure data exists before processing
  if (!data) return null;

  const collectionData = parseData(data.Collection);
  const expenseData = parseData(data.Expense);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 350,
      easing: "easeOutCubic",
    },
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Monthly Collection vs Expense",
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US").format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        beginAtZero: true,
        ticks: {
          // Format Y-axis ticks with commas for readability
          callback: function (value) {
            return new Intl.NumberFormat("en-US").format(value);
          },
        },
      },
    },
  };

  // Stats data aggregation
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

  // Note: Using bracket notation for keys with hyphens
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

  /* ---------------- The UI Layout ---------------- */
  return (
    <>
      <style>
        {`
          /* Chart Holder fixes */
          .chart-holder canvas {
            width: 100% !important;
            height: 100% !important;
          }
        `}
      </style>

      <div
        ref={containerRef}
        className="w-full transition-all duration-300 font-sans"
      >
        <div className="flex flex-col w-full max-w-[1600px] mx-auto">
          <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Financial Dashboard
            </h1>

            {/* Top Stats Cards Section (Responsive Grid) */}
            <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-max">
              {/* Financial Overview - XL takes 1/5th (2.4 columns) of 12 */}
              <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 min-w-0">
                <VerticalStatsCard
                  stats={statsFromImage}
                  cardTitle="Financial Overview"
                />
              </div>

              {/* Membership Stats */}
              <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 min-w-0">
                <VerticalStatsCard
                  stats={membershipStats}
                  cardTitle="Membership Stats"
                />
              </div>

              {/* Fee Aging */}
              <div className="col-span-1 sm:col-span-1 lg:col-span-1 xl:col-span-1 min-w-0">
                <VerticalStatsCard
                  stats={feeAgingStats}
                  cardTitle="Fee Aging"
                />
              </div>

              {/* Monthly Billing (Spans 2 columns on XL to give it space) */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-2 min-w-0">
                <VerticalStatsCard
                  stats={monthBilling}
                  cardTitle="Billing & Reminders"
                />
              </div>
            </section>

            {/* Chart and Daily Collection Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-max">
              {/* Daily Collection Card (Small screen 100%, Large screen 3/12) */}
              <div className="col-span-12 lg:col-span-3 min-w-0">
                <DailyCollectionCard
                  detail={dailyDetail}
                  totalAmount={dailyTotal}
                  cardTitle={`Daily Collection (${currentDate})`}
                />
              </div>

              {/* Chart (Small screen 100%, Large screen 9/12) */}
              <div className="col-span-12 lg:col-span-9 min-w-0">
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-xl border h-[450px] w-full min-w-0 chart-holder">
                  <div className="h-[400px] w-full min-w-0">
                    <Bar
                      ref={chartRef}
                      // Note: We use the ResizeObserver for controlled resize, so redraw is not needed immediately.
                      options={chartOptions}
                      data={{
                        labels: months,
                        datasets: [
                          {
                            label: "Collection",
                            data: collectionData,
                            backgroundColor: "rgba(24, 153, 31, 0.81)", // Dark Green
                            borderRadius: 8,
                          },
                          {
                            label: "Expense",
                            data: expenseData,
                            backgroundColor: "rgba(190, 218, 68, 1)", // Lime Green
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
        </div>
      </div>
    </>
  );
};

export default BusinessDashboard;
