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
const DASHBOARD_DAILY =
  "https://crystalsolutions.com.pk/api/DashboardDaily.php";

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

const currentDate = getCurrentDateFormatted(); // Current date for FRepDat

// ----------------------
// Vertical Stats Card - (No Change)
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
      const isTotalStat = index === 0;
      const hasAmount = stat.amountValue !== undefined;

      if (isTotalStat) {
        return (
          <div
            key={stat.title}
            className="flex flex-col p-1 border-b border-gray-100 transition duration-150 hover:bg-gray-50 mb-2 items-start"
          >
            <p className="text-sm font-medium text-gray-500 mb-1">
              {stat.title}
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              {String(stat.value)}
            </h2>
            {hasAmount && (
              <p className="text-sm font-semibold text-blue-600">
                {String(stat.amountValue)}
              </p>
            )}
          </div>
        );
      }

      return (
        <div
          key={stat.title}
          className={`flex justify-between items-center p-1 ${
            index < stats.length - 1 ? "border-b border-gray-100" : ""
          } transition duration-150 hover:bg-gray-50`}
        >
          <p className="text-xs font-medium text-gray-500">{stat.title}</p>

          <div className="flex flex-col items-end">
            <h2
              className={`text-sm font-semibold ${
                stat.isDark ? "text-gray-900" : "text-gray-800"
              }`}
            >
              {String(stat.value)}
            </h2>

            {hasAmount && (
              <p className="text-xs font-medium black">
                {String(stat.amountValue)}
              </p>
            )}
          </div>
        </div>
      );
    })}
  </div>
);

// ----------------------
// Horizontal Balance Card
// ----------------------
const HorizontalBalanceCard = ({ mainData, cardTitle = null }) => {
  const formatValue = (key) => mainData[key] || "N/A";

  return (
    <div className="p-4 rounded-xl shadow-md bg-white border border-gray-100 flex flex-col gap-2 w-full h-full">
      {cardTitle && (
        <>
          <h3 className="text-base font-bold text-gray-800 mb-2">
            {cardTitle}
          </h3>
          {/* <hr className="mb-3 border-gray-100" /> */}
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
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">Non Active</p>
          <h4 className="text-xl font-semibold text-blue-700">
            {formatValue("Non Active")}
          </h4>
          <p className="text-xs text-gray-500 mt-1">-</p>
        </div>

        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">Outstanding</p>
          <h4 className="text-xl font-semibold text-blue-700">
            {formatValue("OutStanding Customer")}
          </h4>
          <p
            className="text-xs font-medium text-gray-500 mt-1 truncate"
            title={formatValue("OutStanding Amount")}
          >
            {formatValue("OutStanding Amount")}
          </p>
        </div>

        <div className="flex flex-col p-1 border-r border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-1">Advance</p>
          <h4 className="text-xl font-semibold text-blue-700">
            {formatValue("Advance Customer")}
          </h4>
          <p
            className={`text-xs font-medium mt-1 truncate  ${
              (formatValue("Advance Amount") || "").startsWith("-")
                ? "text-gray-500"
                : "text-gray-500"
            }`}
            title={formatValue("Advance Amount")}
          >
            {formatValue("Advance Amount")}
          </p>
        </div>

        <div className="flex flex-col p-1">
          <p className="text-xs font-medium text-gray-500 mb-1">Nil</p>
          <h4 className="text-xl font-semibold text-blue-700">
            {formatValue("Nil Customer")}
          </h4>
          <p className="text-xs text-gray-500 mt-1">-</p>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// Horizontal SaleBalance Card
// ----------------------
const HorizontalSaleBalanceCard = ({ mainData, cardTitle = null }) => {
  // Mapping the daily sales API response keys to the existing card display structure
  const dailyDataMap = {
    // Top Row
    "Total Sales": mainData["SaleQnty"], // Mapping to YTD Quantity (Total)
    "Total Amount": mainData["SaleAmount"], // Mapping to YTD Amount (Balance)

    // Bottom Row
    MonthSaleQnty: mainData["MonthSaleQnty"], // Mapping to Daily Quantity
    MonthSaleAmount: mainData["MonthSaleAmount"], // Mapping to Monthly Quantity
    YearSaleQnty: mainData["YearSaleQnty"], // Mapping to Monthly Amount
    YearSaleAmount: mainData["YearSaleAmount"], // Re-using Daily Quantity
    "Advance Amount": mainData["SaleAmount"], // Re-using Daily Amount
    "Nil Customer": mainData["SaleAmount"], // Re-using Daily Amount for Nil
  };

  const formatValue = (key) => dailyDataMap[key] || "N/A";

  return (
    <div className="p-4 rounded-xl shadow-md bg-white border border-gray-100 flex flex-col gap-2 w-full h-full">
      {cardTitle && (
        <>
          <h3 className="text-base font-bold text-gray-800 mb-2">
            {cardTitle}
          </h3>
          {/* <hr className="mb-3 border-gray-100" /> */}
        </>
      )}

      {/* Top Row - Showing Year to Date Sales */}
      <div className="flex justify-between items-end border-b pb-2 mb-3 border-gray-200">
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-gray-500">Quantity</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">
            {formatValue("Total Sales")}
          </h2>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-sm font-medium text-gray-500">Amount</p>
          <h2 className="text-2xl font-bold text-black mt-1">
            {formatValue("Total Amount")}
          </h2>
        </div>
      </div>

      {/* Bottom Row - Showing Daily and Monthly Figures */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-2 gap-2 text-center w-3/4">
          {" "}
          {/* w-3/4 or w-1/2 to control width */}
          <div className="flex flex-col p-1 border-r border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-1">Monthly</p>
            <h4 className="text-xl font-semibold text-blue-700">
              {mainData["MonthSaleQnty"] || "N/A"}
            </h4>
            <p
              className="text-xs font-medium text-gray-500 mt-1 truncate"
              title={mainData["MonthSaleAmount"] || "N/A"}
            >
              {mainData["MonthSaleAmount"] || "N/A"}
            </p>
          </div>
          <div className="flex flex-col p-1">
            <p className="text-xs font-medium text-gray-500 mb-1">Yearly</p>
            <h4 className="text-xl font-semibold text-blue-700">
              {mainData["YearSaleQnty"] || "N/A"}
            </h4>
            <p
              className="text-xs font-medium text-gray-500 mt-1 truncate"
              title={mainData["YearSaleAmount"] || "N/A"}
            >
              {mainData["YearSaleAmount"] || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// Horizontal PurchaseBalance Card
// ----------------------
const HorizontalPurchaseBalanceCard = ({ mainData, cardTitle = null }) => {
  // Mapping the daily sales API response keys to the existing card display structure
  const dailyDataMap = {
    // Top Row
    "Total Purchase": mainData["PurQnty"],
    "Total Amount": mainData["PurAmount"],

    // Bottom Row
    MonthPurQnty: mainData["MonthPurQnty"],
    MonthPurAmount: mainData["MonthPurAmount"],
    YearPurQnty: mainData["YearPurQnty"],
    YearPurAmount: mainData["YearPurAmount"],
  };

  const formatValue = (key) => dailyDataMap[key] || "N/A";

  return (
    <div className="p-4 rounded-xl shadow-md bg-white border border-gray-100 flex flex-col gap-2 w-full h-full">
      {cardTitle && (
        <>
          <h3 className="text-base font-bold text-gray-800 mb-2">
            {cardTitle}
          </h3>
          {/* <hr className="mb-3 border-gray-100" /> */}
        </>
      )}

      {/* Top Row - Showing Year to Date Sales */}
      <div className="flex justify-between items-end border-b pb-2 mb-3 border-gray-200">
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-gray-500">Quantity</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">
            {formatValue("Total Purchase")}
          </h2>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-sm font-medium text-gray-500">Amount</p>
          <h2 className="text-2xl font-bold text-black mt-1">
            {formatValue("Total Amount")}
          </h2>
        </div>
      </div>

      {/* Bottom Row - Showing Daily and Monthly Figures */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-2 gap-2 text-center w-3/4">
          {" "}
          {/* w-3/4 or w-1/2 to control width */}
          <div className="flex flex-col p-1 border-r border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-1">Monthly</p>
            <h4 className="text-xl font-semibold text-blue-700">
              {mainData["MonthPurQnty"] || "N/A"}
            </h4>
            <p
              className="text-xs font-medium text-gray-500 mt-1 truncate"
              title={mainData["MonthPurAmount"] || "N/A"}
            >
              {mainData["MonthPurAmount"] || "N/A"}
            </p>
          </div>
          <div className="flex flex-col p-1">
            <p className="text-xs font-medium text-gray-500 mb-1">Yearly</p>
            <h4 className="text-xl font-semibold text-blue-700">
              {mainData["YearPurQnty"] || "N/A"}
            </h4>
            <p
              className="text-xs font-medium text-gray-500 mt-1 truncate"
              title={mainData["YearPurAmount"] || "N/A"}
            >
              {mainData["YearPurAmount"] || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// Horizontal CollectionBalance Card
// ----------------------
const HorizontalCollectionBalanceCard = ({ mainData, cardTitle = null }) => {
  // Mapping the daily sales API response keys to the existing card display structure
  const dailyDataMap = {
    // Top Row
    "Total Collection": mainData["Collection"],
    "MonthCollection": mainData["MonthCollection"],

    // Bottom Row
    Payment: mainData["Payment"],
    MonthPayment: mainData["MonthPayment"],
    Expense: mainData["Expense"],
    MonthExpense: mainData["MonthExpense"],
    Margin: mainData["Margin"],
    MonthMargin: mainData["MonthMargin"],

  };

  const formatValue = (key) => dailyDataMap[key] || "N/A";

  return (
    <div className="p-4 rounded-xl shadow-md bg-white border border-gray-100 flex flex-col gap-2 w-full h-full">
      {cardTitle && (
        <>
          <h3 className="text-base font-bold text-gray-800 mb-2">
            {cardTitle}
          </h3>
          {/* <hr className="mb-3 border-gray-100" /> */}
        </>
      )}

      {/* Top Row - Showing Year to Date Sales */}
      <div className="flex justify-between items-end border-b pb-2 mb-3 border-gray-200">
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-gray-500">Quantity</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">
            {formatValue("Total Collection")}
          </h2>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-sm font-medium text-gray-500">Amount</p>
          <h2 className="text-2xl font-bold text-black mt-1">
            {formatValue("MonthCollection")}
          </h2>
        </div>
      </div>

      {/* Bottom Row - Showing Daily and Monthly Figures */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-3 gap-2 text-center w-3/4">
          {/* w-3/4 or w-1/2 to control width */}
          <div className="flex flex-col p-1 border-r border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-1">Payment</p>
            <h4 className="text-xl font-semibold text-blue-700">
              {mainData["Payment"] || "N/A"}
            </h4>
            <p
              className="text-xs font-medium text-gray-500 mt-1 truncate"
              title={mainData["MonthPayment"] || "N/A"}
            >
              {mainData["MonthPayment"] || "N/A"}
            </p>
          </div>
          <div className="flex flex-col p-1 border-r border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-1">Expense</p>
            <h4 className="text-xl font-semibold text-blue-700">
              {mainData["Expense"] || "N/A"}
            </h4>
            <p
              className="text-xs font-medium text-gray-500 mt-1 truncate"
              title={mainData["MonthExpense"] || "N/A"}
            >
              {mainData["MonthExpense"] || "N/A"}
            </p>
          </div>
          <div className="flex flex-col p-1">
            <p className="text-xs font-medium text-gray-500 mb-1">Margin</p>
            <h4 className="text-xl font-semibold text-blue-700">
              {mainData["Margin"] || "N/A"}
            </h4>
            <p
              className="text-xs font-medium text-gray-500 mt-1 truncate"
              title={mainData["MonthExpense"] || "N/A"}
            >
              {mainData["MonthMargin"] || "N/A"}
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
  <div className="p-2 rounded-xl shadow-xl bg-white border border-gray-100 w-[700px] h-full flex flex-col justify-start">
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
// Dashboard Component - (UPDATED API CALL DATE)
// ----------------------
const AmericanDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null); // <--- New state for daily sales
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

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const adminFormData = new FormData();
        adminFormData.append("code", "AMRELEC");

        const monthlyFormData = new FormData();
        monthlyFormData.append("code", "AMRELEC");
        monthlyFormData.append("FRepYer", "2025");

        // Daily Dashboard API Body - Using the specific date from your request
        const dailyFormData = new FormData();
        dailyFormData.append("code", "AMRELEC");
        dailyFormData.append("FRepDat", "22-11-2025"); // <--- Specific date used
        dailyFormData.append("FLocCod", "001");

        // Execute all API calls concurrently
        const [adminResponse, monthlyResponse, dailyResponse] =
          await Promise.all([
            axios.post(ADMIN_INFO_API_URL, adminFormData),
            axios.post(MONTHLY_COMPARISON_API_URL, monthlyFormData),
            axios.post(DASHBOARD_DAILY, dailyFormData), // <--- New API Call
          ]);

        setAdminData(adminResponse.data);
        setMonthlyData(monthlyResponse.data);

        // The API returns an array, but we only need the first element (the object)
        const dailyResponseData = Array.isArray(dailyResponse.data)
          ? dailyResponse.data[0]
          : dailyResponse.data;
        setDailyData(dailyResponseData);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Couldn't fetch dashboard data.");
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
      <div className="text-center p-10 text-xl text-black">Error: {error}</div>
    );

  const mainData = Array.isArray(adminData) ? adminData[0] : adminData;
  const dailySaleData = dailyData;

  if (!mainData || !dailySaleData)
    return (
      <div className="text-center p-10 text-xl text-gray-600">
        No primary or daily sales data available.
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
  // Dashboard Component
  // ----------------------
  return (
    <div className="p-1 bg-gray-50 min-h-screen font-sans">
      <hr className="mb-1 border-gray-200" />

      {/* ---------------------- Top Cards (4 Horizontal Cards) ---------------------- */}
      <section className="mb-4 grid grid-cols-4 gap-3">
        <HorizontalBalanceCard mainData={mainData} cardTitle="Customer" />
        <HorizontalPurchaseBalanceCard
          mainData={dailySaleData}
          cardTitle="Purchase"
        />

        {/* Using dailySaleData for Sale Card */}
        <HorizontalSaleBalanceCard mainData={dailySaleData} cardTitle="Sale" />
        <HorizontalCollectionBalanceCard mainData={dailySaleData} cardTitle="Collection" />

      </section>

      {/* ---------------------- Bottom Section (Chart + Range Card) ---------------------- */}
      <section className="mb-3 grid grid-cols-1 gap-3">
        {/* Chart */}
        <div className="w-[700px]">
          <div className="h-[400px]">
            <div className="bg-white p-6 rounded-xl shadow-xl border h-full">
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

          {/* Range Card */}
          <div className="w-full mt-3">
            <HorizontalRangeCard
              stats={newRangeStats}
              cardTitle="Customer Amount & Count by Range"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AmericanDashboard;
