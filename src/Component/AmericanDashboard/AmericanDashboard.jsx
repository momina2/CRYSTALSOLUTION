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

// API URLs

const ADMIN_INFO_API_URL = "https://crystalsolutions.com.pk/api/AdminInfo.php";
const MONTHLY_COMPARISON_API_URL =
  "https://crystalsolutions.com.pk/api/MonthlyComparison.php";

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

const currentDate = getCurrentDateFormatted();


// ----------------------
// Vertical Stats Card
// ----------------------
const VerticalStatsCard = ({ stats, cardTitle = null }) => (
  <div className="p-2 rounded-xl shadow-xl bg-white border border-gray-100 flex flex-col w-[300px] h-full">
    {cardTitle && (
      <>
        <h3 className="text-base font-bold text-gray-800 mb-1 px-2">
          {cardTitle}
        </h3>
        <hr className="mb-1 border-gray-100" />
      </>
    )}

    {stats.map((stat, index) => {
      // Check if it's the first stat, which you want to treat as the "Total"
      const isTotalStat = index === 0;

      if (isTotalStat) {
        // Special rendering for the Total stat
        return (
          <div
            key={stat.title}
            // Removed 'text-center' if it was implicitly there or from parent.
            // Explicitly ensuring flex-start alignment for its content.
            className={`flex flex-col p-1 border-b border-gray-100 transition duration-150 hover:bg-gray-50 mb-2 items-start`} // Added items-start here
          >
            {/* Title (Total) */}
            <p className="text-sm font-medium text-gray-500 mb-1">
              {stat.title}
            </p>
            {/* Value (Large size below title, now left-aligned) */}
            <h2 className={`text-3xl font-bold text-gray-900`}>
              {String(stat.value)}
            </h2>
          </div>
        );
      }

      // Default rendering for all other stats
      return (
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
      );
    })}
  </div>
);

// ----------------------
// Dashboard Component
// ----------------------
const MemberCollectionReport = () => {
  const [adminData, setAdminData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
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

  // Fetch ALL Dashboard Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // --- 1. Fetch Admin Info Data ---
        const adminFormData = new FormData();
        adminFormData.append("code", "AMRELEC");
        const adminResponse = await axios.post(
          ADMIN_INFO_API_URL,
          adminFormData
        );
        setAdminData(adminResponse.data);

        // --- 2. Fetch Monthly Comparison Data
        const monthlyFormData = new FormData();
        monthlyFormData.append("code", "AMRELEC");
        monthlyFormData.append("FRepYer", "2025");
        const monthlyResponse = await axios.post(
          MONTHLY_COMPARISON_API_URL,
          monthlyFormData
        );
        setMonthlyData(monthlyResponse.data);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Couldn't fetch all dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-10 text-xl text-black">
        Loading Admin Data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-xl text-red-600">
        Error: {error}
      </div>
    );
  }

  const mainData = Array.isArray(adminData) ? adminData[0] : adminData;
  if (!mainData)
    return (
      <div className="text-center p-10 text-xl text-gray-600">
        No primary data available for Admin Dashboard.
      </div>
    );

  // -----------------------------------------------------
  // 1. DATA FOR STATS CARDS
  // -----------------------------------------------------

  const CustomerStats = [
    { title: "Total ", value: mainData["Total Customer"] || "N/A" },
    { title: "Non Active", value: mainData["Non Active"] || "N/A" },
    {
      title: "OutStanding ",
      value: mainData["OutStanding Customer"] || "N/A",
    },
    { title: "Advance ", value: mainData["Advance Customer"] || "N/A" },
    { title: "Nil ", value: mainData["Nil Customer"] || "N/A" },
  ];

  // -------------------------------------------------------------------
  //  2. DATA FOR GRAPHS
  // -------------------------------------------------------------------

  const chart1CollectionData = parseData(mainData.Collection);
  const chart1ExpenseData = parseData(mainData.Expense);

  const chart1Options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Monthly Collection vs Expense (AdminInfo)",
        font: { size: 16, weight: "bold" },
      },
    },
  };

  // -------------------------------------------------------------------
  //  3. DATA FOR NEW MONTHLY COMPARISON GRAPH
  // -------------------------------------------------------------------

  const isMonthlyDataAvailable =
    monthlyData && Object.keys(monthlyData).length > 0;

  let salesData = Array(12).fill(0);
  let purchaseData = Array(12).fill(0);
  let expenseData = Array(12).fill(0);
  let collectionData = Array(12).fill(0);

  if (isMonthlyDataAvailable) {
    salesData = parseData(monthlyData, "S");
    purchaseData = parseData(monthlyData, "P");
    expenseData = parseData(monthlyData, "E");
    collectionData = parseData(monthlyData, "C");
  }

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
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };

  return (
    // <div div className="p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
    <div div className="p-1 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-0 px-1">
        Analytics Dashboard
      </h1>
      <hr className="mb-1 border-gray-200" />

      {/* Stats Cards Section */}
      <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="col-span-1">
          <VerticalStatsCard stats={CustomerStats} cardTitle=" Overview" />
        </div>
      </section>

      {/* Graph Section  */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Monthly Comparison Chart  */}
        <div className="col-span-1 lg:col-span-3 w-[900px]">
          <div className="bg-white p-6 rounded-xl shadow-xl border h-[400px]">
            <div className="h-[350px]">
              {isMonthlyDataAvailable ? (
                <Bar
                  options={chart2Options}
                  data={{
                    labels: months,
                    datasets: [
                      {
                        label: "Sales",
                        data: salesData,
                        backgroundColor: "rgba(54, 162, 235, 0.8)", // Blue
                        borderRadius: 6,
                        barThickness: "flex",
                        categoryPercentage: 0.8,
                        barPercentage: 0.8,
                      },
                      {
                        label: "Purchase",
                        data: purchaseData,
                        backgroundColor: "rgba(255, 99, 132, 0.8)", // Red
                        borderRadius: 6,
                      },
                      {
                        label: "Expense",
                        data: expenseData,
                        backgroundColor: "rgba(255, 206, 86, 0.8)", // Yellow
                        borderRadius: 6,
                      },
                      {
                        label: "Collection",
                        data: collectionData,
                        backgroundColor: "rgba(75, 192, 192, 0.8)", // Teal
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
      </section>
    </div>
  );
};

export default MemberCollectionReport;
