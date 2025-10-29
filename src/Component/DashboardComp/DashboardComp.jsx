"use client";

import { useState, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  Scatter,
} from "recharts";
import {
  DollarSign,
  FileText,
  TrendingUp,
  Search,
  Zap,
  Award,
  ChevronDown,
  ChevronUp,
} from "react-feather";
import "./DashboardComp.css";

const DashboardComplain = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [dateRange, setDateRange] = useState("month");
  const [activeChart, setActiveChart] = useState("performance");
  const [expandedSections, setExpandedSections] = useState({
    complaints: true,
    technicians: true,
    companies: true,
    financial: true,
  });

  const mainContentRef = useRef(null);
  const complaintsRef = useRef(null);
  const techniciansRef = useRef(null);
  const companiesRef = useRef(null);
  const financialRef = useRef(null);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Scroll to section
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Sample data based on the provided information
  const complaintData = [
    {
      Date: "23-02-2025",
      "Job#": "000107",
      Customer: "ABRAR",
      Mobile: "03006950457",
      Item: "AUTO MACHINE",
      Technician: "FAIZAN",
      Type: "REPAIRING",
      Parts: 2000,
      Profit: 1000,
    },
    {
      Date: "23-02-2025",
      "Job#": "000111",
      Customer: "ASIF",
      Mobile: "03004722370",
      Item: "MACHINE",
      Technician: "AZMAT",
      Type: "REPAIRING",
      Parts: 250,
      Profit: 0,
    },
    {
      Date: "24-02-2025",
      "Job#": "000120",
      Customer: "SAEED AHMED",
      Mobile: "03214609331",
      Item: "OVEN",
      Technician: "NUMAN",
      Type: "REPAIRING",
      Parts: 3500,
      Profit: 0,
    },
    {
      Date: "16-02-2025",
      "Job#": "000019",
      Customer: "ALI HAIDER",
      Mobile: "03061006294",
      Item: "AUTO MACHINE",
      Technician: "TARIQ",
      Type: "REPAIRING",
      Parts: 0,
      Profit: 0,
      Charges: 550,
    },
    {
      Date: "16-02-2025",
      "Job#": "000021",
      Customer: "FARHAN",
      Mobile: "03336965761",
      Item: "WASHING MACHINE",
      Technician: "FARHAN",
      Type: "REPAIRING",
      Parts: 0,
      Profit: 0,
      Charges: 550,
    },
    {
      Date: "25-02-2025",
      "Job#": "000125",
      Customer: "MUHAMMAD ALI",
      Mobile: "03214567890",
      Item: "REFRIGERATOR",
      Technician: "IRFAN",
      Type: "REPAIRING",
      Parts: 1500,
      Profit: 500,
    },
    {
      Date: "26-02-2025",
      "Job#": "000126",
      Customer: "AHMAD KHAN",
      Mobile: "03001234567",
      Item: "AC",
      Technician: "DANIYAL",
      Type: "REPAIRING",
      Parts: 3000,
      Profit: 800,
    },
    {
      Date: "27-02-2025",
      "Job#": "000127",
      Customer: "USMAN ALI",
      Mobile: "03339876543",
      Item: "WASHING MACHINE",
      Technician: "FARHAN",
      Type: "REPAIRING",
      Parts: 1200,
      Profit: 300,
    },
  ];

  const technicianData = [
    {
      Code: "001",
      Technician: "FARHAN",
      Repairing: 22,
      Service: 0,
      Workshop: 8,
      Installations: 6,
      TotalJobs: 36,
      Charges: 28550,
      Parts: 51000,
      Profit: 4200,
      TotalAmt: 83750,
    },
    {
      Code: "002",
      Technician: "AZMAT",
      Repairing: 23,
      Service: 0,
      Workshop: 1,
      Installations: 1,
      TotalJobs: 25,
      Charges: 95000,
      Parts: 13250,
      Profit: 5500,
      TotalAmt: 113750,
    },
    {
      Code: "003",
      Technician: "IRFAN",
      Repairing: 130,
      Service: 0,
      Workshop: 0,
      Installations: 0,
      TotalJobs: 130,
      Charges: 70760,
      Parts: 2550,
      Profit: 100,
      TotalAmt: 73410,
    },
    {
      Code: "004",
      Technician: "DANIYAL",
      Repairing: 14,
      Service: 0,
      Workshop: 0,
      Installations: 0,
      TotalJobs: 14,
      Charges: 10951,
      Parts: 1750,
      Profit: 500,
      TotalAmt: 13201,
    },
    {
      Code: "005",
      Technician: "FAIZAN",
      Repairing: 30,
      Service: 1,
      Workshop: 0,
      Installations: 1,
      TotalJobs: 32,
      Charges: 15501,
      Parts: 2000,
      Profit: 1000,
      TotalAmt: 18501,
    },
    {
      Code: "006",
      Technician: "NUMAN",
      Repairing: 18,
      Service: 2,
      Workshop: 3,
      Installations: 2,
      TotalJobs: 25,
      Charges: 22500,
      Parts: 15000,
      Profit: 2500,
      TotalAmt: 40000,
    },
    {
      Code: "007",
      Technician: "TARIQ",
      Repairing: 15,
      Service: 5,
      Workshop: 2,
      Installations: 3,
      TotalJobs: 25,
      Charges: 18000,
      Parts: 12000,
      Profit: 1800,
      TotalAmt: 31800,
    },
  ];

  const companyData = [
    {
      Code: "001",
      Company: "HAIER",
      Repairing: 20,
      Service: 1,
      Workshop: 3,
      Installations: 4,
      TotalJobs: 28,
      Charges: 27357,
      Parts: 8850,
      Profit: 500,
      TotalAmt: 36707,
    },
    {
      Code: "003",
      Company: "SUPER ASIA",
      Repairing: 2,
      Service: 0,
      Workshop: 4,
      Installations: 0,
      TotalJobs: 6,
      Charges: 4050,
      Parts: 50,
      Profit: 0,
      TotalAmt: 4100,
    },
    {
      Code: "004",
      Company: "PEL",
      Repairing: 9,
      Service: 0,
      Workshop: 2,
      Installations: 2,
      TotalJobs: 13,
      Charges: 18302,
      Parts: 3600,
      Profit: 0,
      TotalAmt: 21902,
    },
    {
      Code: "005",
      Company: "DAWLANCE",
      Repairing: 15,
      Service: 2,
      Workshop: 3,
      Installations: 5,
      TotalJobs: 25,
      Charges: 30000,
      Parts: 15000,
      Profit: 3000,
      TotalAmt: 48000,
    },
    {
      Code: "006",
      Company: "ORIENT",
      Repairing: 8,
      Service: 1,
      Workshop: 1,
      Installations: 2,
      TotalJobs: 12,
      Charges: 12000,
      Parts: 6000,
      Profit: 1500,
      TotalAmt: 19500,
    },
  ];

  const referenceData = [
    {
      Code: "001",
      Reference: "PAK ALI ELECTRONICS",
      TotalJobs: 8,
      Charges: 8704,
      Parts: 3000,
      Profit: 1000,
      TotalAmt: 12704,
    },
    {
      Code: "002",
      Reference: "HAIER SAHIWAL",
      TotalJobs: 3,
      Charges: 1002,
      Parts: 0,
      Profit: 0,
      TotalAmt: 1002,
    },
    {
      Code: "003",
      Reference: "NONE",
      TotalJobs: 54,
      Charges: 66554,
      Parts: 22550,
      Profit: 1250,
      TotalAmt: 90354,
    },
  ];

  const collectionData = [
    {
      "Trn#": "000142",
      Date: "06-01-2025",
      Type: "BRV",
      "A/C Description": "ASIF (SALE)",
      Description: "RECEIVED AG. INV#001238 DATED 06/01/2025",
      Amount: 63000,
    },
    {
      "Trn#": "000143",
      Date: "18-01-2025",
      Type: "BRV",
      "A/C Description": "ADVANCE FROM CUSTOMERS",
      Description: "ADVANCE RECEIVED AGT INV#3038 IN MB",
      Amount: 50000,
    },
    {
      "Trn#": "000144",
      Date: "20-01-2025",
      Type: "BRV",
      "A/C Description": "ASIF (SALE)",
      Description: "RECEIVED AG. INV#001283 DATED 20/01/2025",
      Amount: 14000,
    },
    {
      "Trn#": "000145",
      Date: "25-01-2025",
      Type: "BRV",
      "A/C Description": "AHMAD (SALE)",
      Description: "RECEIVED AG. INV#001290 DATED 25/01/2025",
      Amount: 35000,
    },
    {
      "Trn#": "000146",
      Date: "28-01-2025",
      Type: "BRV",
      "A/C Description": "USMAN (SALE)",
      Description: "RECEIVED AG. INV#001295 DATED 28/01/2025",
      Amount: 22000,
    },
  ];

  const paymentData = [
    {
      "Trn#": "000138",
      Date: "04-01-2025",
      Type: "SRN",
      "A/C Description": "",
      Description: "UNITED MICROWAVE OVEN 20 LITER PUSH",
      Amount: 14000,
    },
    {
      "Trn#": "000288",
      Date: "03-01-2025",
      Type: "BPV",
      "A/C Description": "DAWLANCE COMPANY",
      Description: "CH#31708238 DT:03-01-25 MB",
      Amount: 1000000,
    },
    {
      "Trn#": "000289",
      Date: "10-01-2025",
      Type: "BPV",
      "A/C Description": "HAIER COMPANY",
      Description: "CH#31708240 DT:10-01-25 MB",
      Amount: 500000,
    },
    {
      "Trn#": "000290",
      Date: "15-01-2025",
      Type: "BPV",
      "A/C Description": "PEL COMPANY",
      Description: "CH#31708245 DT:15-01-25 MB",
      Amount: 300000,
    },
  ];

  // Derived data for charts
  const jobTypeData = [
    {
      name: "Repairing",
      value: technicianData.reduce((sum, tech) => sum + tech.Repairing, 0),
    },
    {
      name: "Service",
      value: technicianData.reduce((sum, tech) => sum + tech.Service, 0),
    },
    {
      name: "Workshop",
      value: technicianData.reduce((sum, tech) => sum + tech.Workshop, 0),
    },
    {
      name: "Installations",
      value: technicianData.reduce((sum, tech) => sum + tech.Installations, 0),
    },
  ];

  const techPerformanceData = technicianData.map((tech) => ({
    name: tech.Technician,
    jobs: tech.TotalJobs,
    revenue: tech.TotalAmt / 1000, // Scaled for better visualization
    profit: tech.Profit,
  }));

  const companyPerformanceData = companyData.map((company) => ({
    name: company.Company,
    jobs: company.TotalJobs,
    revenue: company.TotalAmt / 1000, // Scaled for better visualization
    profit: company.Profit,
  }));

  // Monthly trend data (simulated)
  const monthlyTrendData = [
    { name: "Jan", jobs: 45, revenue: 120, profit: 25 },
    { name: "Feb", jobs: 52, revenue: 140, profit: 30 },
    { name: "Mar", jobs: 48, revenue: 130, profit: 28 },
    { name: "Apr", jobs: 61, revenue: 150, profit: 35 },
    { name: "May", jobs: 55, revenue: 145, profit: 32 },
    { name: "Jun", jobs: 67, revenue: 160, profit: 38 },
    { name: "Jul", jobs: 70, revenue: 170, profit: 40 },
    { name: "Aug", jobs: 62, revenue: 155, profit: 36 },
    { name: "Sep", jobs: 75, revenue: 180, profit: 42 },
    { name: "Oct", jobs: 80, revenue: 190, profit: 45 },
    { name: "Nov", jobs: 85, revenue: 200, profit: 48 },
    { name: "Dec", jobs: 90, revenue: 210, profit: 50 },
  ];

  // Technician radar data
  const technicianRadarData = technicianData.map((tech) => ({
    subject: tech.Technician,
    A: tech.Repairing / 20, // Scaled for better visualization
    B: tech.Workshop / 2, // Scaled for better visualization
    C: tech.Installations / 2, // Scaled for better visualization
    D: tech.Profit / 1000, // Scaled for better visualization
    fullMark: 10,
  }));

  // Item category data (simulated)
  const itemCategoryData = [
    { name: "Washing Machine", value: 35 },
    { name: "Refrigerator", value: 25 },
    { name: "AC", value: 20 },
    { name: "Microwave", value: 15 },
    { name: "Other", value: 5 },
  ];

  // Financial area chart data (simulated)
  const financialAreaData = [
    { name: "Jan", revenue: 120, expenses: 80, profit: 40 },
    { name: "Feb", revenue: 140, expenses: 95, profit: 45 },
    { name: "Mar", revenue: 130, expenses: 90, profit: 40 },
    { name: "Apr", revenue: 150, expenses: 100, profit: 50 },
    { name: "May", revenue: 145, expenses: 98, profit: 47 },
    { name: "Jun", revenue: 160, expenses: 105, profit: 55 },
    { name: "Jul", revenue: 170, expenses: 110, profit: 60 },
    { name: "Aug", revenue: 155, expenses: 100, profit: 55 },
    { name: "Sep", revenue: 180, expenses: 115, profit: 65 },
    { name: "Oct", revenue: 190, expenses: 120, profit: 70 },
    { name: "Nov", revenue: 200, expenses: 125, profit: 75 },
    { name: "Dec", revenue: 210, expenses: 130, profit: 80 },
  ];

  // Technician efficiency data (simulated)
  const techEfficiencyData = technicianData.map((tech) => ({
    name: tech.Technician,
    efficiency: (tech.Profit / tech.TotalJobs) * 10, // Scaled for better visualization
    jobsPerDay: tech.TotalJobs / 30, // Assuming 30 days
    amt: tech.TotalAmt / 10000, // Scaled for better visualization
  }));

  const financialSummary = {
    totalCollections: collectionData.reduce(
      (sum, item) => sum + item.Amount,
      0
    ),
    totalPayments: paymentData.reduce((sum, item) => sum + item.Amount, 0),
    totalRevenue: technicianData.reduce((sum, tech) => sum + tech.TotalAmt, 0),
    totalProfit: technicianData.reduce((sum, tech) => sum + tech.Profit, 0),
  };

  // Filter complaints based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredComplaints(complaintData);
    } else {
      const filtered = complaintData.filter(
        (complaint) =>
          complaint.Customer.toLowerCase().includes(
            searchQuery.toLowerCase()
          ) ||
          complaint["Job#"].includes(searchQuery) ||
          complaint.Mobile.includes(searchQuery) ||
          complaint.Item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredComplaints(filtered);
    }
  }, [searchQuery]);

  // Initialize filtered complaints
  useEffect(() => {
    setFilteredComplaints(complaintData);
  }, []);

  // Colors for charts
  const COLORS = ["#4361ee", "#3a0ca3", "#7209b7", "#f72585", "#4cc9f0"];
  const AREA_COLORS = ["#4361ee", "#f72585", "#4cc9f0"];

  return (
    <div className="unified-dashboard">
      {/* Scrollable Main Content */}
      <div className="dashboard-content" ref={mainContentRef}>
        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-icon jobs">
              <FileText size={24} />
            </div>
            <div className="card-content">
              <h3>Total Jobs</h3>
              <p>
                {technicianData.reduce((sum, tech) => sum + tech.TotalJobs, 0)}
              </p>
              <span className="trend positive">
                +12% <TrendingUp size={14} />
              </span>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon revenue">
              <DollarSign size={24} />
            </div>
            <div className="card-content">
              <h3>Total Revenue</h3>
              <p>Rs. {financialSummary.totalRevenue.toLocaleString()}</p>
              <span className="trend positive">
                +8% <TrendingUp size={14} />
              </span>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon profit">
              <TrendingUp size={24} />
            </div>
            <div className="card-content">
              <h3>Total Profit</h3>
              <p>Rs. {financialSummary.totalProfit.toLocaleString()}</p>
              <span className="trend positive">
                +15% <TrendingUp size={14} />
              </span>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon collections">
              <Zap size={24} />
            </div>
            <div className="card-content">
              <h3>Efficiency Rate</h3>
              <p>87%</p>
              <span className="trend positive">
                +5% <TrendingUp size={14} />
              </span>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon technicians">
              <Award size={24} />
            </div>
            <div className="card-content">
              <h3>Top Performer</h3>
              <p>AZMAT</p>
              <span className="trend">5 Star Rating</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Job Types Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={jobTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {jobTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Item Categories</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={itemCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {itemCategoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Technician Performance</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={techPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jobs" fill="#4361ee" name="Jobs" />
                <Bar dataKey="revenue" fill="#f72585" name="Revenue (K)" />
                <Bar dataKey="profit" fill="#4cc9f0" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Company Performance</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={companyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jobs" fill="#4361ee" name="Jobs" />
                <Bar dataKey="revenue" fill="#f72585" name="Revenue (K)" />
                <Bar dataKey="profit" fill="#4cc9f0" name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Technician Efficiency</h3>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={techEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="efficiency" fill="#4361ee" name="Efficiency" />
                <Line
                  type="monotone"
                  dataKey="jobsPerDay"
                  stroke="#f72585"
                  name="Jobs/Day"
                />
                <Scatter dataKey="amt" fill="#4cc9f0" name="Amount (K)" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Monthly Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4361ee"
                  activeDot={{ r: 8 }}
                  name="Revenue (K)"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#f72585"
                  name="Profit (K)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Main Chart Section */}
        <div className="main-chart-section">
          <div className="chart-header">
            <h2>Business Performance Overview</h2>
            <div className="chart-tabs">
              <button
                className={activeChart === "performance" ? "active" : ""}
                onClick={() => setActiveChart("performance")}
              >
                Performance
              </button>
              <button
                className={activeChart === "financial" ? "active" : ""}
                onClick={() => setActiveChart("financial")}
              >
                Financial
              </button>
              <button
                className={activeChart === "technicians" ? "active" : ""}
                onClick={() => setActiveChart("technicians")}
              >
                Technicians
              </button>
            </div>
          </div>

          <div className="chart-content">
            {activeChart === "performance" && (
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="jobs"
                    fill="#4361ee"
                    name="Jobs"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f72585"
                    name="Revenue (K)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="profit"
                    stroke="#4cc9f0"
                    name="Profit (K)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            )}

            {activeChart === "financial" && (
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={financialAreaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#4361ee"
                    fill="#4361ee"
                    name="Revenue (K)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stackId="1"
                    stroke="#f72585"
                    fill="#f72585"
                    name="Expenses (K)"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stackId="1"
                    stroke="#4cc9f0"
                    fill="#4cc9f0"
                    name="Profit (K)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {activeChart === "technicians" && (
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart outerRadius={150} data={technicianRadarData[0]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} />
                  <Radar
                    name="Repairing"
                    dataKey="A"
                    stroke="#4361ee"
                    fill="#4361ee"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Workshop"
                    dataKey="B"
                    stroke="#f72585"
                    fill="#f72585"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Installations"
                    dataKey="C"
                    stroke="#4cc9f0"
                    fill="#4cc9f0"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Profit"
                    dataKey="D"
                    stroke="#7209b7"
                    fill="#7209b7"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        {/* Tables Section */}
        <div className="tables-section">
          {/* Recent Complaints */}
          <div className="table-container" ref={complaintsRef}>
            <div className="table-header">
              <h3>Recent Complaints</h3>
              <div className="table-actions">
                <button className="view-all-btn">View All</button>
                <button
                  className="toggle-btn"
                  onClick={() => toggleSection("complaints")}
                >
                  {expandedSections.complaints ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
              </div>
            </div>
            {expandedSections.complaints && (
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Job#</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Mobile</th>
                      <th>Item</th>
                      <th>Technician</th>
                      <th>Parts</th>
                      <th>Profit</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint, index) => (
                      <tr key={index}>
                        <td>{complaint["Job#"]}</td>
                        <td>{complaint.Date}</td>
                        <td>{complaint.Customer}</td>
                        <td>{complaint.Mobile}</td>
                        <td>{complaint.Item}</td>
                        <td>{complaint.Technician}</td>
                        <td>Rs. {complaint.Parts.toLocaleString()}</td>
                        <td>Rs. {complaint.Profit.toLocaleString()}</td>
                        <td>
                          <span className="status-badge completed">
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Technician Performance */}
          <div className="table-container" ref={techniciansRef}>
            <div className="table-header">
              <h3>Technician Performance</h3>
              <div className="table-actions">
                <button className="view-all-btn">View All</button>
                <button
                  className="toggle-btn"
                  onClick={() => toggleSection("technicians")}
                >
                  {expandedSections.technicians ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
              </div>
            </div>
            {expandedSections.technicians && (
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Technician</th>
                      <th>Total Jobs</th>
                      <th>Repairing</th>
                      <th>Workshop</th>
                      <th>Installations</th>
                      <th>Charges</th>
                      <th>Parts</th>
                      <th>Profit</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {technicianData.map((tech, index) => (
                      <tr key={index}>
                        <td>{tech.Technician}</td>
                        <td>{tech.TotalJobs}</td>
                        <td>{tech.Repairing}</td>
                        <td>{tech.Workshop}</td>
                        <td>{tech.Installations}</td>
                        <td>Rs. {tech.Charges.toLocaleString()}</td>
                        <td>Rs. {tech.Parts.toLocaleString()}</td>
                        <td>Rs. {tech.Profit.toLocaleString()}</td>
                        <td>
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={i < 4 ? "star filled" : "star"}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Company Performance */}
          <div className="table-container" ref={companiesRef}>
            <div className="table-header">
              <h3>Company Performance</h3>
              <div className="table-actions">
                <button className="view-all-btn">View All</button>
                <button
                  className="toggle-btn"
                  onClick={() => toggleSection("companies")}
                >
                  {expandedSections.companies ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
              </div>
            </div>
            {expandedSections.companies && (
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Total Jobs</th>
                      <th>Repairing</th>
                      <th>Service</th>
                      <th>Workshop</th>
                      <th>Installations</th>
                      <th>Charges</th>
                      <th>Parts</th>
                      <th>Profit</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companyData.map((company, index) => (
                      <tr key={index}>
                        <td>{company.Company}</td>
                        <td>{company.TotalJobs}</td>
                        <td>{company.Repairing}</td>
                        <td>{company.Service}</td>
                        <td>{company.Workshop}</td>
                        <td>{company.Installations}</td>
                        <td>Rs. {company.Charges.toLocaleString()}</td>
                        <td>Rs. {company.Parts.toLocaleString()}</td>
                        <td>Rs. {company.Profit.toLocaleString()}</td>
                        <td>Rs. {company.TotalAmt.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Financial Summary */}
          <div className="financial-summary" ref={financialRef}>
            <div className="table-container">
              <div className="table-header">
                <h3>Recent Collections</h3>
                <div className="table-actions">
                  <button className="view-all-btn">View All</button>
                  <button
                    className="toggle-btn"
                    onClick={() => toggleSection("financial")}
                  >
                    {expandedSections.financial ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                </div>
              </div>
              {expandedSections.financial && (
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Trn#</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>A/C Description</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collectionData.map((collection, index) => (
                        <tr key={index}>
                          <td>{collection["Trn#"]}</td>
                          <td>{collection.Date}</td>
                          <td>{collection.Type}</td>
                          <td>{collection["A/C Description"]}</td>
                          <td>Rs. {collection.Amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="table-container">
              <div className="table-header">
                <h3>Recent Payments</h3>
                <div className="table-actions">
                  <button className="view-all-btn">View All</button>
                </div>
              </div>
              {expandedSections.financial && (
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Trn#</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>A/C Description</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentData.map((payment, index) => (
                        <tr key={index}>
                          <td>{payment["Trn#"]}</td>
                          <td>{payment.Date}</td>
                          <td>{payment.Type}</td>
                          <td>{payment["A/C Description"]}</td>
                          <td>Rs. {payment.Amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComplain;
