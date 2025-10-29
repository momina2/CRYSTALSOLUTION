"use client";

import { useState, useEffect, useRef } from "react";
import "./DashboardPOS.css";

const DashboardPOS = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("30");
  const [activeTab, setActiveTab] = useState("overview");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isScrolled, setIsScrolled] = useState(false);
  const tableRef = useRef(null);

  // Customer data from the provided file
  const customerData = [
    {
      id: "NASIRTPOS",
      name: "NASIR TRADER",
      address: "Attaturk Block Ata Turk Block Garden Town, Lahore",
      phone: "0300 4021070",
      mobile: "03004021070",
      status: "active",
      lastPaymentAmount: 5000,
      lastPaymentDueDate: "2025-01-01",
      nextPaymentAmount: 5000,
      nextPaymentDueDate: "2025-01-01",
      lastLoginUser: "sohaib",
      lastLoginTime: "2025-03-26 11:24",
      lastLogoutUser: "sohaib",
      lastLogoutTime: "2025-03-27 22:04",
      sessionTime: 40,
      lastPurchaseDate: "2025-03-25",
      lastInvoiceNumber: "000078",
      paymentDue: false,
    },
    {
      id: "ZSELECPOS",
      name: "ZS ELECTRONICS",
      address: "9-11 Rehman Chamnber, 132-Temple Road, Lahore",
      phone: "03219452633",
      mobile: "03219452633",
      status: "active",
      lastPaymentAmount: 5000,
      lastPaymentDueDate: "2025-01-30",
      nextPaymentAmount: 5000,
      nextPaymentDueDate: "2025-01-01",
      lastLoginUser: "sohaib",
      lastLoginTime: "2025-05-12 14:13",
      lastLogoutUser: "sohaib",
      lastLogoutTime: "2025-05-14 19:22",
      sessionTime: 53,
      lastPurchaseDate: "2025-05-10",
      lastInvoiceNumber: "000092",
      paymentDue: false,
    },
    {
      id: "FARHANPOS",
      name: "FARHAN TRADERS",
      address: "489-D Joher Town Lahore",
      phone: "03226538248",
      mobile: "03226538248",
      status: "active",
      lastPaymentAmount: 500,
      lastPaymentDueDate: "2025-01-01",
      nextPaymentAmount: 5000,
      nextPaymentDueDate: "2025-06-01",
      lastLoginUser: "sohaib",
      lastLoginTime: "2025-05-12 14:28",
      lastLogoutUser: null,
      lastLogoutTime: null,
      sessionTime: null,
      lastPurchaseDate: "2025-05-11",
      lastInvoiceNumber: "000085",
      paymentDue: true,
    },
    {
      id: "QAISERPOS",
      name: "QAISER ELECTRONICS",
      address: "Link McLeod Road Patiala Ground, Lahore",
      phone: "37229668",
      mobile: "0337229668",
      status: "active",
      lastPaymentAmount: 5000,
      lastPaymentDueDate: "2025-01-01",
      nextPaymentAmount: 5000,
      nextPaymentDueDate: "2025-01-01",
      lastLoginUser: "sohaib",
      lastLoginTime: "2025-05-13 16:27",
      lastLogoutUser: null,
      lastLogoutTime: null,
      sessionTime: null,
      lastPurchaseDate: "2025-05-12",
      lastInvoiceNumber: "000086",
      paymentDue: false,
    },
    {
      id: "AHMADPOS",
      name: "AHMAD CORPORATION",
      address: "Link McLeod Road Patiala Ground, Lahore",
      phone: "37310068",
      mobile: "0337310068",
      status: "active",
      lastPaymentAmount: 500,
      lastPaymentDueDate: "2025-01-01",
      nextPaymentAmount: 5000,
      nextPaymentDueDate: "2025-06-15",
      lastLoginUser: "sohaib",
      lastLoginTime: "2025-05-13 16:44",
      lastLogoutUser: null,
      lastLogoutTime: null,
      sessionTime: null,
      lastPurchaseDate: "2025-05-13",
      lastInvoiceNumber: "000087",
      paymentDue: true,
    },
    {
      id: "MARIGPOS",
      name: "MARIGOLD CENTRE",
      address: "23 Abid Market, Temple Road, Lahore",
      phone: "04236371441",
      mobile: "04236371441",
      status: "active",
      lastPaymentAmount: 5000,
      lastPaymentDueDate: "2025-01-01",
      nextPaymentAmount: 5000,
      nextPaymentDueDate: "2025-01-01",
      lastLoginUser: "sohaib",
      lastLoginTime: "2025-05-14 18:36",
      lastLogoutUser: null,
      lastLogoutTime: null,
      sessionTime: null,
      lastPurchaseDate: "2025-05-14",
      lastInvoiceNumber: "000088",
      paymentDue: true,
    },
    {
      id: "MARIGPPOS",
      name: "MARIGOLD ENTERPRISES",
      address: "3-Link McLeod Road Patiala Ground Lahore",
      phone: "04236371441",
      mobile: "04236371441",
      status: "active",
      lastPaymentAmount: 5000,
      lastPaymentDueDate: "2025-01-01",
      nextPaymentAmount: 5000,
      nextPaymentDueDate: "2025-01-01",
      lastLoginUser: "sohaib",
      lastLoginTime: "2025-05-14 19:42",
      lastLogoutUser: null,
      lastLogoutTime: null,
      sessionTime: null,
      lastPurchaseDate: "2025-05-14",
      lastInvoiceNumber: "000089",
      paymentDue: false,
    },
    {
      id: "IMTIAZPOS",
      name: "IMTIAZ STORE",
      address: "124-A, Temple Road, Lahore",
      phone: "04237234640",
      mobile: "04237234640",
      status: "active",
      lastPaymentAmount: 5000,
      lastPaymentDueDate: "2025-01-01",
      nextPaymentAmount: 5000,
      nextPaymentDueDate: "2025-01-01",
      lastLoginUser: "sohaib",
      lastLoginTime: "2025-05-15 16:06",
      lastLogoutUser: null,
      lastLogoutTime: null,
      sessionTime: null,
      lastPurchaseDate: "2025-05-15",
      lastInvoiceNumber: "000090",
      paymentDue: false,
    },
    {
      id: "ECOOLPOS",
      name: "ELECTRO COOL CITY",
      address: "124-A, Temple Road, Lahore",
      phone: "04237234640",
      mobile: "04237234640",
      status: "active",
      lastPaymentAmount: 5000,
      lastPaymentDueDate: "2025-01-01",
      nextPaymentAmount: 5000,
      nextPaymentDueDate: "2025-01-01",
      lastLoginUser: "sohaib",
      lastLoginTime: "2025-05-15 16:38",
      lastLogoutUser: null,
      lastLogoutTime: null,
      sessionTime: null,
      lastPurchaseDate: "2025-05-15",
      lastInvoiceNumber: "000091",
      paymentDue: false,
    },
    {
      id: "SOLEXPOS",
      name: "SOLEX CORPORATION",
      address: "122-Temple Road, Milan Centre, Abid Market, Lahore",
      phone: "04237173016",
      mobile: "04237173016",
      status: "active",
      lastPaymentAmount: 5000,
      lastPaymentDueDate: "2025-01-01",
      nextPaymentAmount: 5000,
      nextPaymentDueDate: "2025-01-01",
      lastLoginUser: "sohaib",
      lastLoginTime: "2025-05-15 17:47",
      lastLogoutUser: null,
      lastLogoutTime: null,
      sessionTime: null,
      lastPurchaseDate: "2025-05-15",
      lastInvoiceNumber: "000093",
      paymentDue: false,
    },
    // Add some inactive customers for demonstration
    {
      id: "TECHPOS",
      name: "TECH SOLUTIONS",
      address: "45 Main Boulevard, Gulberg, Lahore",
      phone: "04235761234",
      mobile: "03335761234",
      status: "inactive",
      lastPaymentAmount: 5000,
      lastPaymentDueDate: "2024-12-01",
      nextPaymentAmount: 5000,
      nextPaymentDueDate: "2025-01-01",
      lastLoginUser: "admin",
      lastLoginTime: "2025-01-15 10:22",
      lastLogoutUser: "admin",
      lastLogoutTime: "2025-01-15 11:45",
      sessionTime: 83,
      lastPurchaseDate: "2025-01-10",
      lastInvoiceNumber: "000075",
      paymentDue: true,
    },
    {
      id: "DIGITALPOS",
      name: "DIGITAL WORLD",
      address: "78 Ferozepur Road, Lahore",
      phone: "04237654321",
      mobile: "03007654321",
      status: "inactive",
      lastPaymentAmount: 5000,
      lastPaymentDueDate: "2024-11-15",
      nextPaymentAmount: 5000,
      nextPaymentDueDate: "2024-12-15",
      lastLoginUser: "admin",
      lastLoginTime: "2024-12-05 09:15",
      lastLogoutUser: "admin",
      lastLogoutTime: "2024-12-05 10:30",
      sessionTime: 75,
      lastPurchaseDate: "2024-12-01",
      lastInvoiceNumber: "000070",
      paymentDue: true,
    },
  ];

  // Handle scroll event for table shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollTop } = tableRef.current;
        setIsScrolled(scrollTop > 0);
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener("scroll", handleScroll);
      return () => tableElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Filter customers based on search and active tab
  const filteredCustomers = customerData.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === "overview" ||
      (activeTab === "active" && customer.status === "active") ||
      (activeTab === "inactive" && customer.status === "inactive") ||
      (activeTab === "payments" && customer.paymentDue) ||
      (activeTab === "alerts" &&
        getDaysSinceLogin(customer.lastLoginTime) > 30);

    return matchesSearch && matchesTab;
  });

  // Sort customers based on selected column and direction
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let valueA = a[sortColumn];
    let valueB = b[sortColumn];

    // Handle special cases for date sorting
    if (sortColumn.includes("date") || sortColumn.includes("time")) {
      valueA = valueA ? new Date(valueA).getTime() : 0;
      valueB = valueB ? new Date(valueB).getTime() : 0;
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle sorting when a column header is clicked
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Calculate summary metrics
  const summaryMetrics = {
    totalCustomers: customerData.length,
    activeCustomers: customerData.filter((c) => c.status === "active").length,
    paymentDue: customerData.filter((c) => c.paymentDue).length,
    inactiveCustomers: customerData.filter((c) => c.status === "inactive")
      .length,
    totalRevenue: customerData.reduce(
      (sum, customer) => sum + customer.lastPaymentAmount,
      0
    ),
    averageSessionTime: Math.round(
      customerData.reduce(
        (sum, customer) => sum + (customer.sessionTime || 0),
        0
      ) / customerData.filter((c) => c.sessionTime).length
    ),
  };

  // Helper functions for formatting and calculations
  function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function formatDateTime(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getDaysSinceLogin(dateString) {
    if (!dateString) return 999;
    const loginDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - loginDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  // Draw charts when component mounts
  useEffect(() => {
    drawActivityChart();
    drawDistributionChart();
    drawRevenueChart();

    // Redraw charts on window resize
    const handleResize = () => {
      drawActivityChart();
      drawDistributionChart();
      drawRevenueChart();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to draw the activity chart
  function drawActivityChart() {
    const canvas = document.getElementById("activity-chart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match container
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Sample data for the chart
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
    const loginData = [65, 59, 80, 81, 56, 55, 72, 68, 85, 90, 95, 92];
    const purchaseData = [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 71, 88];

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set chart dimensions
    const chartWidth = width - 60;
    const chartHeight = height - 60;
    const startX = 40;
    const startY = 20;

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, startY + chartHeight);
    ctx.lineTo(startX + chartWidth, startY + chartHeight);
    ctx.strokeStyle = "#e2e8f0";
    ctx.stroke();

    // Draw grid lines
    ctx.beginPath();
    for (let i = 0; i <= 5; i++) {
      const y = startY + chartHeight - (i * chartHeight) / 5;
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + chartWidth, y);

      // Add y-axis labels
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText((i * 20).toString(), startX - 5, y + 3);
    }
    ctx.strokeStyle = "#e2e8f0";
    ctx.stroke();

    // Draw x-axis labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    const barWidth = chartWidth / months.length;
    for (let i = 0; i < months.length; i++) {
      const x = startX + i * barWidth + barWidth / 2;
      ctx.fillText(months[i], x, startY + chartHeight + 15);
    }

    // Draw login data line
    ctx.beginPath();
    for (let i = 0; i < loginData.length; i++) {
      const x = startX + i * barWidth + barWidth / 2;
      const y = startY + chartHeight - (loginData[i] * chartHeight) / 100;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Add gradient area under login data line
    const loginGradient = ctx.createLinearGradient(
      0,
      startY,
      0,
      startY + chartHeight
    );
    loginGradient.addColorStop(0, "rgba(99, 102, 241, 0.2)");
    loginGradient.addColorStop(1, "rgba(99, 102, 241, 0)");

    ctx.beginPath();
    ctx.moveTo(startX, startY + chartHeight);
    for (let i = 0; i < loginData.length; i++) {
      const x = startX + i * barWidth + barWidth / 2;
      const y = startY + chartHeight - (loginData[i] * chartHeight) / 100;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(startX + chartWidth, startY + chartHeight);
    ctx.closePath();
    ctx.fillStyle = loginGradient;
    ctx.fill();

    // Add dots for login data
    for (let i = 0; i < loginData.length; i++) {
      const x = startX + i * barWidth + barWidth / 2;
      const y = startY + chartHeight - (loginData[i] * chartHeight) / 100;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#6366f1";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw purchase data line
    ctx.beginPath();
    for (let i = 0; i < purchaseData.length; i++) {
      const x = startX + i * barWidth + barWidth / 2;
      const y = startY + chartHeight - (purchaseData[i] * chartHeight) / 100;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Add gradient area under purchase data line
    const purchaseGradient = ctx.createLinearGradient(
      0,
      startY,
      0,
      startY + chartHeight
    );
    purchaseGradient.addColorStop(0, "rgba(16, 185, 129, 0.2)");
    purchaseGradient.addColorStop(1, "rgba(16, 185, 129, 0)");

    ctx.beginPath();
    ctx.moveTo(startX, startY + chartHeight);
    for (let i = 0; i < purchaseData.length; i++) {
      const x = startX + i * barWidth + barWidth / 2;
      const y = startY + chartHeight - (purchaseData[i] * chartHeight) / 100;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(startX + chartWidth, startY + chartHeight);
    ctx.closePath();
    ctx.fillStyle = purchaseGradient;
    ctx.fill();

    // Add dots for purchase data
    for (let i = 0; i < purchaseData.length; i++) {
      const x = startX + i * barWidth + barWidth / 2;
      const y = startY + chartHeight - (purchaseData[i] * chartHeight) / 100;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#10b981";
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Add legend
    const legendX = startX + 10;
    const legendY = startY + 20;

    // Login legend
    ctx.beginPath();
    ctx.moveTo(legendX, legendY);
    ctx.lineTo(legendX + 20, legendY);
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(legendX + 10, legendY, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#6366f1";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Logins", legendX + 30, legendY + 4);

    // Purchase legend
    ctx.beginPath();
    ctx.moveTo(legendX + 100, legendY);
    ctx.lineTo(legendX + 120, legendY);
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(legendX + 110, legendY, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#10b981";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Purchases", legendX + 130, legendY + 4);
  }

  // Function to draw the distribution chart
  function drawDistributionChart() {
    const canvas = document.getElementById("distribution-chart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match container
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Sample data for the chart
    const data = [
      { label: "Active", value: 65, color: "#10b981" },
      { label: "Inactive", value: 20, color: "#f43f5e" },
      { label: "Pending", value: 15, color: "#f59e0b" },
    ];

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Draw pie chart
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 60;

    let startAngle = 0;

    // Draw shadow for the entire pie
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.restore();

    data.forEach((item) => {
      // Calculate angle
      const angle = (item.value / total) * 2 * Math.PI;

      // Draw pie slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      // Calculate label position
      const labelAngle = startAngle + angle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

      // Draw label
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${Math.round((item.value / total) * 100)}%`,
        labelX,
        labelY
      );

      startAngle += angle;
    });

    // Draw center circle (donut hole)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Draw total in center
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${total}`, centerX, centerY - 10);

    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.fillText("Customers", centerX, centerY + 10);

    // Draw legend
    const legendX = centerX - 100;
    const legendY = height - 60;

    data.forEach((item, index) => {
      const itemY = legendY + index * 25;

      // Draw color box with rounded corners
      ctx.beginPath();
      ctx.roundRect(legendX, itemY, 15, 15, 3);
      ctx.fillStyle = item.color;
      ctx.fill();

      // Draw label
      ctx.fillStyle = "#64748b";
      ctx.font = "13px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(`${item.label} (${item.value})`, legendX + 25, itemY + 7);
    });
  }

  // Function to draw the revenue chart
  function drawRevenueChart() {
    const canvas = document.getElementById("revenue-chart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match container
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Sample data for the chart
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
    const revenueData = [
      4500, 5200, 4800, 5500, 6200, 5800, 6500, 7200, 6800, 7500, 8200, 7800,
    ];

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set chart dimensions
    const chartWidth = width - 60;
    const chartHeight = height - 60;
    const startX = 50;
    const startY = 20;

    // Draw axes
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, startY + chartHeight);
    ctx.lineTo(startX + chartWidth, startY + chartHeight);
    ctx.strokeStyle = "#e2e8f0";
    ctx.stroke();

    // Draw grid lines
    ctx.beginPath();
    for (let i = 0; i <= 5; i++) {
      const y = startY + chartHeight - (i * chartHeight) / 5;
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + chartWidth, y);

      // Add y-axis labels
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(`${(i * 2000).toLocaleString()}`, startX - 5, y + 3);
    }
    ctx.strokeStyle = "#e2e8f0";
    ctx.stroke();

    // Draw x-axis labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    const barWidth = (chartWidth / months.length) * 0.7;
    const barSpacing = chartWidth / months.length;

    for (let i = 0; i < months.length; i++) {
      const x = startX + i * barSpacing + barSpacing / 2;
      ctx.fillText(months[i], x, startY + chartHeight + 15);
    }

    // Draw bars
    for (let i = 0; i < revenueData.length; i++) {
      const x = startX + i * barSpacing + barSpacing * 0.15;
      const barHeight = (revenueData[i] / 10000) * chartHeight;
      const y = startY + chartHeight - barHeight;

      // Create gradient
      const gradient = ctx.createLinearGradient(x, y, x, startY + chartHeight);
      gradient.addColorStop(0, "#6366f1");
      gradient.addColorStop(1, "#a5b4fc");

      // Draw bar with rounded top corners
      const cornerRadius = 4;

      ctx.beginPath();
      ctx.moveTo(x + cornerRadius, y);
      ctx.lineTo(x + barWidth - cornerRadius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + cornerRadius);
      ctx.lineTo(x + barWidth, startY + chartHeight);
      ctx.lineTo(x, startY + chartHeight);
      ctx.lineTo(x, y + cornerRadius);
      ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
      ctx.closePath();

      // Add shadow
      ctx.shadowColor = "rgba(99, 102, 241, 0.3)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 3;

      ctx.fillStyle = gradient;
      ctx.fill();

      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Add value on top of bar
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        `${revenueData[i].toLocaleString()}`,
        x + barWidth / 2,
        y - 8
      );
    }
  }

  return (
    <div className="customer-dashboard" style={{ marginTop: "-40px" }}>
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon customers">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="card-content">
            <h3>Total Customers</h3>
            <p>{summaryMetrics.totalCustomers}</p>
            <span className="trend positive">
              +12%{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon revenue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="card-content">
            <h3>Total Revenue</h3>
            <p>Rs. {summaryMetrics.totalRevenue.toLocaleString()}</p>
            <span className="trend positive">
              +8%{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon active">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="card-content">
            <h3>Active Customers</h3>
            <p>{summaryMetrics.activeCustomers}</p>
            <span className="trend positive">
              +5%{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon payment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
          </div>
          <div className="card-content">
            <h3>Payments Due</h3>
            <p>{summaryMetrics.paymentDue}</p>
            <span className="trend negative">
              +3{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                <polyline points="17 18 23 18 23 12"></polyline>
              </svg>
            </span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon alerts">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div className="card-content">
            <h3>Inactive Customers</h3>
            <p>{summaryMetrics.inactiveCustomers}</p>
            <span className="trend negative">
              +2{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                <polyline points="17 18 23 18 23 12"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="dashboard-nav">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          Overview
        </button>
        <button
          className={activeTab === "active" ? "active" : ""}
          onClick={() => setActiveTab("active")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Active Customers
        </button>
        <button
          className={activeTab === "inactive" ? "active" : ""}
          onClick={() => setActiveTab("inactive")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Inactive Customers
        </button>
        <button
          className={activeTab === "payments" ? "active" : ""}
          onClick={() => setActiveTab("payments")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
          Payments
        </button>
        <button
          className={activeTab === "usage" ? "active" : ""}
          onClick={() => setActiveTab("usage")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          Usage Analytics
        </button>
        <button
          className={activeTab === "alerts" ? "active" : ""}
          onClick={() => setActiveTab("alerts")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          Alerts
          {summaryMetrics.paymentDue > 0 && (
            <span className="alert-badge">{summaryMetrics.paymentDue}</span>
          )}
        </button>
      </div>

      {/* Customer Table */}
      <div className="table-container" style={{ width: "100%" }}>
        <div className="table-header">
          <h3>
            {activeTab === "overview"
              ? "All Customers"
              : activeTab === "active"
              ? "Active Customers"
              : activeTab === "inactive"
              ? "Inactive Customers"
              : activeTab === "payments"
              ? "Payment Status"
              : activeTab === "usage"
              ? "Usage Analytics"
              : "Inactive Alerts"}
          </h3>
          <div className="table-actions">
            <button className="export-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export Data
            </button>
          </div>
        </div>

        <div
          className={`table-scroll ${isScrolled ? "scrolled" : ""}`}
          ref={tableRef}
        >
          <table>
            <thead>
              <tr>
                <th className="sortable" onClick={() => handleSort("name")}>
                  Customer Name
                  {sortColumn === "name" && (
                    <span className="sort-icon">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="sortable"
                  onClick={() => handleSort("lastLoginTime")}
                >
                  Last Login
                  {sortColumn === "lastLoginTime" && (
                    <span className="sort-icon">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th>Last User</th>
                <th
                  className="sortable"
                  onClick={() => handleSort("lastPaymentDueDate")}
                >
                  Payment Due
                  {sortColumn === "lastPaymentDueDate" && (
                    <span className="sort-icon">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th
                  className="sortable"
                  onClick={() => handleSort("lastPaymentAmount")}
                >
                  Last Payment
                  {sortColumn === "lastPaymentAmount" && (
                    <span className="sort-icon">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th>Last Invoice</th>
                <th
                  className="sortable"
                  onClick={() => handleSort("lastPurchaseDate")}
                >
                  Last Purchase
                  {sortColumn === "lastPurchaseDate" && (
                    <span className="sort-icon">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                <th>Session Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCustomers.map((customer) => (
                <tr key={customer.id} className="table-row">
                  <td className="customer-name" style={{ textAlign: "left" }}>
                    <div>
                      <span className="name">{customer.name}</span>
                      <span className="id">{customer.id}</span>
                    </div>
                  </td>
                  <td className="last-login" style={{ textAlign: "left" }}>
                    <div>
                      <span>{formatDateTime(customer.lastLoginTime)}</span>
                      <span
                        className={`days-badge ${
                          getDaysSinceLogin(customer.lastLoginTime) > 30
                            ? "danger"
                            : getDaysSinceLogin(customer.lastLoginTime) > 7
                            ? "warning"
                            : "success"
                        }`}
                      >
                        {getDaysSinceLogin(customer.lastLoginTime) === 999
                          ? "Never"
                          : `${getDaysSinceLogin(
                              customer.lastLoginTime
                            )} days ago`}
                      </span>
                    </div>
                  </td>
                  <td>{customer.lastLoginUser || "N/A"}</td>
                  <td>{formatDate(customer.lastPaymentDueDate)}</td>
                  <td>
                    {customer.lastPaymentAmount
                      ? `Rs. ${customer.lastPaymentAmount.toLocaleString()}`
                      : "N/A"}
                  </td>
                  <td>{customer.lastInvoiceNumber || "N/A"}</td>
                  <td>{formatDate(customer.lastPurchaseDate)}</td>
                  <td>
                    {customer.sessionTime
                      ? `${customer.sessionTime} min`
                      : "N/A"}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        customer.status === "active"
                          ? "active"
                          : customer.status === "inactive"
                          ? "inactive"
                          : "pending"
                      }`}
                    >
                      {customer.status === "active"
                        ? "Active"
                        : customer.status === "inactive"
                        ? "Inactive"
                        : "Pending"}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn view" title="View Details">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                      <button className="action-btn message" title="Message">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </button>
                      <button className="action-btn edit" title="Edit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section" style={{ marginBottom: "10px" }}>
        <div className="chart-row">
          <div className="chart-card activity-chart">
            <div className="chart-header">
              <h3>
                <i className="fas fa-chart-line"></i> Customer Activity Timeline
              </h3>
              <div className="time-filter">
                <select className="time-select">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                </select>
              </div>
            </div>
            <div className="chart-container">
              <canvas id="activity-chart"></canvas>
            </div>
            <div className="chart-footer">
              <span className="trend-up">
                <i className="fas fa-arrow-up"></i> 12% from last period
              </span>
              <button className="details-btn">View Details</button>
            </div>
          </div>

          <div className="chart-card distribution-chart">
            <div className="chart-header">
              <h3>
                <i className="fas fa-users"></i> Customer Distribution
              </h3>
            </div>
            <div className="chart-container">
              <canvas id="distribution-chart"></canvas>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="color-swatch primary"></span>New
              </div>
              <div className="legend-item">
                <span className="color-swatch secondary"></span>Returning
              </div>
              <div className="legend-item">
                <span className="color-swatch tertiary"></span>Inactive
              </div>
            </div>
          </div>

          <div className="chart-card revenue-chart">
            <div className="chart-header">
              <h3>
                <i className="fas fa-dollar-sign"></i> Revenue Overview
              </h3>
              <div className="revenue-badge">$24,580</div>
            </div>
            <div className="chart-container">
              <canvas id="revenue-chart"></canvas>
            </div>
            <div className="metric-grid">
              <div className="metric">
                <div className="metric-value">$8,420</div>
                <div className="metric-label">Weekly Avg</div>
              </div>
              <div className="metric">
                <div className="metric-value trend-up">+18%</div>
                <div className="metric-label">MoM Growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPOS;
