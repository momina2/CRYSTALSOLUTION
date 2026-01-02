import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTheme } from "../../../ThemeContext";
import NavComponent from "../../MainComponent/Navform/navbarform";
import SingleButton from "../../MainComponent/Button/SingleButton/SingleButton";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import "../AmericanDashboard.css";
import jsPDF from "jspdf";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";

const REPORT_NAME = "Customer Progress";
const COMPANY_NAME = "CRYSTAL SOLUTIONS";

function useQueryParams() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}
const showIfNonZero = (val) => {
  const num = toNumber(val);
  return num === 0 ? "" : num.toLocaleString();
};

const hasAnyAgingValue = (stats = []) =>
  stats.some((s) => Number(s.amount) !== 0);
// 👉 Progress table columns as per API
const columnsConfig = [
  {
    header: "Sr#",
    key: "sr",
    alignment: "left",
    uiWidth: 60,
    pdfWidth: 15,
    excelWidth: 8,
  },
  {
    header: "Month",
    key: "month",
    alignment: "left",
    uiWidth: 140,
    pdfWidth: 40,
    excelWidth: 20,
  },
  {
    header: "Debit",
    key: "debit",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 25,
    excelWidth: 15,
  },
  {
    header: "Credit",
    key: "credit",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 25,
    excelWidth: 15,
  },
  {
    header: "Balance",
    key: "balance",
    alignment: "right",
    uiWidth: 130,
    pdfWidth: 25,
    excelWidth: 18,
  },
  // {
  //   header: "",
  //   key: "scrollSpacer",
  //   alignment: "center",
  //   uiWidth: 20,
  //   pdfWidth: 0,
  //   excelWidth: 0,
  // },
];

// Agging Bar Card (amt001..amt006)
// const HorizontalAggingRangeCard = ({ stats }) => (
//   <div
//     style={{
//       width: "100%",
//       backgroundColor: "white",
//       border: "1px solid #dadada",
//       borderRadius: "6px",
//       padding: "4px",
//       marginBottom: "6px",
//     }}
//   >
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         textAlign: "center",
//         paddingTop: "2px",
//       }}
//     >
//       {stats.map((s, i) => (
//         <div key={i} style={{ flex: 1 }}>
//           <p style={{ marginBottom: "4px", fontSize: "12px" }}>{s.range}</p>
//           <p style={{ fontSize: "13px", fontWeight: 600, color: "#3f379b" }}>
//             {Number(s.amount || 0).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   </div>
// );
// const [appliedDate, setAppliedDate] = useState(defaultDate);

const toNumber = (val) => {
  if (val === null || val === undefined) return 0;
  return Number(String(val).replace(/,/g, "")) || 0;
};

const currentYear = new Date().getFullYear();

const HorizontalAggingRangeCard = ({ stats }) => (
  <div
    style={{
      height: "50%",
      width: "100%",
      backgroundColor: "white",
      border: "1px solid #000",
      borderRadius: "6px",
      padding: "4px",
      marginBottom: "6px",
    }}
  >
    <div
      style={{
        display: "flex",
        textAlign: "center",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            padding: "6px 2px",
            borderRight: i !== stats.length - 1 ? "1px solid #000" : "none",
          }}
        >
          {/* Range */}
          <p
            style={{
              marginBottom: "4px",
              fontSize: "12px",
              borderBottom: "1px solid #000",
              paddingBottom: "3px",
            }}
          >
            {s.range}
          </p>

          {/* Amount */}
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#000",
            }}
          >
            {showIfNonZero(s.amount).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default function AmericanProgressReportDashboard() {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [appliedYear, setAppliedYear] = useState(currentYear);

  const query = useQueryParams();
  const custCode = query.get("code");
  const custName = query.get("name");

  const [headerCode] = useState(custCode);
  const [headerName] = useState(custName);

  const [rows, setRows] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // 👉 Single date picker: cusDate (default = today)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const defaultDate = `${yyyy}-${mm}-${dd}`;
  const [cusDate, setCusDate] = useState(defaultDate);
  const [appliedDate, setAppliedDate] = useState(defaultDate);

  const {
    isSidebarVisible,
    getcolor,
    fontcolor,
    getnavbarbackgroundcolor,
    getfontstyle,
    getdatafontsize,
  } = useTheme();

  const totalUiWidth = columnsConfig.reduce(
    (sum, col) => sum + Number(col.uiWidth),
    0
  );
  const tableWidth = `${totalUiWidth}px`;

  const softTableStyles = {
    softBoxShadow:
      "0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.03)",
    softBorderColor: "#00000026",
    softRowSeparator: "#f8f9fa",
    softSelectedColor: "#f0f8ff",
  };

  const contentStyle = {
    backgroundColor: getcolor,
    width: tableWidth,
    position: "fixed",
    top: "50%",
    left: 0,
    right: 0,
    margin: "0 auto",
    transform: "translateY(-50%)",
    transition: "width 0.3s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    overflowX: "hidden",
    overflowY: "auto",
    maxWidth: "95vw",
  };

  const toApiDate = (input) => {
    if (!input) return "";
    const [y, m, d] = input.split("-");
    return `${d}-${m}-${y}`;
  };

  // const fetchProgress = async () => {
  //   try {
  //     setIsLoading(true);

  //     const form = new FormData();
  //     form.append("code", "AMRELEC");
  //     form.append("cusId", custCode);
  //     form.append("cusYear", selectedYear);

  //     form.append("cusDate", toApiDate(cusDate));

  //     const res = await axios.post(
  //       "https://crystalsolutions.com.pk/api/AmericanCustomerProgress.php",
  //       form
  //     );

  //     const progressList = res.data?.Progress || [];

  //     // 👉 Extract TOTAL row from API
  //     const totalRow = progressList.find(
  //       (r) => String(r["Month"]).toLowerCase() === "total"
  //     );

  //     // 👉 Remove TOTAL row from table
  //     const filteredProgress = progressList.filter(
  //       (r) => String(r["Month"]).toLowerCase() !== "total"
  //     );

  //     // 👉 Map table rows WITHOUT total row
  //     const finalRows = filteredProgress.map((r) => ({
  //       sr: r["Sr#"],
  //       month: r["Month"],
  //       debit: r["Debit"],
  //       credit: r["Credit"],
  //       balance: r["Balance"],
  //     }));

  //     setRows(finalRows);

  //     // 👉 Save total row separately
  //     setApiData({ ...res.data, totalRow });
  //   } catch (err) {
  //     console.error("Progress API error:", err);
  //     setRows([]);
  //     setApiData(null);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchProgress = async (year = appliedYear, date = appliedDate) => {
    try {
      setIsLoading(true);

      const form = new FormData();
      form.append("code", "AMRELEC");
      form.append("cusId", custCode);
      form.append("cusYear", year);
      form.append("cusDate", toApiDate(date));

      const res = await axios.post(
        "https://crystalsolutions.com.pk/api/AmericanCustomerProgress.php",
        form
      );

      const progressList = res.data?.Progress || [];

      const totalRow = progressList.find(
        (r) => String(r["Month"]).toLowerCase() === "total"
      );

      const filteredProgress = progressList.filter(
        (r) => String(r["Month"]).toLowerCase() !== "total"
      );

      setRows(
        filteredProgress.map((r) => ({
          sr: r["Sr#"],
          month: r["Month"],
          debit: r["Debit"],
          credit: r["Credit"],
          balance: r["Balance"],
        }))
      );

      setApiData({ ...res.data, totalRow });
    } catch (err) {
      console.error(err);
      setRows([]);
      setApiData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAppliedYear(currentYear);
    setAppliedDate(defaultDate);

    fetchProgress(currentYear, defaultDate);
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   fetchProgress();
  // }, [cusDate]);

  useEffect(() => {
    const current = new Date(cusDate);
    const newDate = new Date(
      selectedYear,
      current.getMonth(),
      current.getDate()
    );

    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, "0");
    const dd = String(newDate.getDate()).padStart(2, "0");

    setCusDate(`${yyyy}-${mm}-${dd}`);
  }, [selectedYear]);

  useEffect(() => {
    fetchProgress(selectedYear, cusDate);
  }, [selectedYear, cusDate]);

  const getAlignmentClass = (alignment) => {
    switch (alignment) {
      case "left":
        return "text-start";
      case "right":
        return "text-end";
      case "center":
        return "text-center";
      default:
        return "text-start";
    }
  };

  const yearOptions = [currentYear, currentYear - 1, currentYear - 2];

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <FaSortUp
          style={{
            marginLeft: "5px",
            color: "#e74c3c",
            transition: "0.3s",
          }}
        />
      ) : (
        <FaSortDown
          style={{
            marginLeft: "5px",
            color: "#e74c3c",
            transition: "0.3s",
          }}
        />
      );
    }

    return (
      <FaSort
        style={{
          marginLeft: "5px",
          color: "white",
          opacity: 0.4,
        }}
      />
    );
  };

  const requestSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  // SORTED DATA
  const sortedTableData = useMemo(() => {
    let data = [...rows];

    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key] ?? "";
        const bVal = b[sortConfig.key] ?? "";

        const numericKeys = ["debit", "credit", "balance"];
        if (numericKeys.includes(sortConfig.key)) {
          const aNum = parseFloat(aVal) || 0;
          const bNum = parseFloat(bVal) || 0;
          return sortConfig.direction === "ascending"
            ? aNum - bNum
            : bNum - aNum;
        }

        return sortConfig.direction === "ascending"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    return data;
  }, [rows, sortConfig]);

  // GLOBAL SEARCH on all columns
  const filteredData = useMemo(() => {
    if (!searchQuery) return sortedTableData;

    const search = searchQuery.toLowerCase();

    return sortedTableData.filter((row) => {
      const rowString = Object.values(row)
        .map((v) =>
          v !== null && v !== undefined ? String(v).toLowerCase() : ""
        )
        .join(" ");
      return rowString.includes(search);
    });
  }, [sortedTableData, searchQuery]);

  const totalDebit = useMemo(
    () => filteredData.reduce((sum, r) => sum + showIfNonZero(r.debit), 0),
    [filteredData]
  );

  const totalCredit = useMemo(
    () => filteredData.reduce((sum, r) => sum + showIfNonZero(r.credit), 0),
    [filteredData]
  );

  const totalBalance = useMemo(
    () => filteredData.reduce((sum, r) => sum + showIfNonZero(r.balance), 0),
    [filteredData]
  );

  // Aging stats (amt001..amt006)
  const stats = apiData
    ? [
        { range: "01-30", amount: apiData.amt001 ?? 0 },
        { range: "31-60", amount: apiData.amt002 ?? 0 },
        { range: "61-90", amount: apiData.amt003 ?? 0 },
        { range: "91-120", amount: apiData.amt004 ?? 0 },
        { range: "121-150", amount: apiData.amt005 ?? 0 },
        { range: "150+", amount: apiData.amt006 ?? 0 },
      ]
    : [];

  const creditAmount =
    apiData && Object.prototype.hasOwnProperty.call(apiData, "credit amount")
      ? apiData["credit amount"]
      : null;

  const handleSelect = () => {
    setAppliedYear(selectedYear);
    setAppliedDate(cusDate);

    // 🔴 IMPORTANT: direct API call
    fetchProgress(selectedYear, cusDate);
  };
  // PDF EXPORT
  // const exportPDFHandler = () => {
  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   const pageWidth = 210;
  //   const rowHeight = 6;
  //   const headerHeight = 8;
  //   const maxY = 280;

  //   // ===== TITLE =====
  //   const drawTitle = () => {
  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(20);
  //     doc.text("CRYSTAL SOLUTIONS", pageWidth / 2, 16, { align: "center" });

  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(13);
  //     doc.text(REPORT_NAME, pageWidth / 2, 24, { align: "center" });
  //   };

  //   // ===== TABLE CONFIG =====
  //   const pdfColumns = columnsConfig.filter((c) => c.key !== "scrollSpacer");
  //   const keys = pdfColumns.map((c) => c.key);
  //   const headers = pdfColumns.map((c) => c.header);
  //   const colWidths = pdfColumns.map((c) => c.pdfWidth);

  //   const tableWidth = colWidths.reduce((a, b) => a + b, 0);
  //   const startX = (pageWidth - tableWidth) / 2;
  //   let y = 32;

  //   // ===== HEADER =====
  //   const drawHeader = () => {
  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(9);

  //     let x = startX;
  //     headers.forEach((h, i) => {
  //       const w = colWidths[i];
  //       doc.setFillColor(220);
  //       doc.rect(x, y, w, headerHeight, "F");
  //       doc.rect(x, y, w, headerHeight);
  //       doc.text(h, x + w / 2, y + 5.5, { align: "center" });
  //       x += w;
  //     });

  //     y += headerHeight;
  //   };

  //   // ===== ROW =====
  //   const drawRow = (row, isTotal = false) => {
  //     let x = startX;
  //     doc.setFont("Helvetica", isTotal ? "bold" : "normal");
  //     doc.setFontSize(8);

  //     row.forEach((cell, i) => {
  //       const w = colWidths[i];
  //       doc.rect(x, y, w, rowHeight);

  //       if (["debit", "credit", "balance"].includes(keys[i])) {
  //         doc.text(String(cell), x + w - 2, y + 4.5, { align: "right" });
  //       } else {
  //         doc.text(String(cell), x + 2, y + 4.5);
  //       }

  //       x += w;
  //     });

  //     y += rowHeight;
  //   };

  //   // ===== PAGE BREAK =====
  //   const checkPageBreak = () => {
  //     if (y > maxY) {
  //       doc.addPage();
  //       drawTitle();
  //       y = 32;
  //       drawHeader();
  //     }
  //   };

  //   // ===== START =====
  //   drawTitle();
  //   drawHeader();

  //   const bodyRows = filteredData.map((r) =>
  //     keys.map((k) =>
  //       ["debit", "credit", "balance"].includes(k)
  //         ? Number(r[k] || 0).toLocaleString()
  //         : r[k] ?? ""
  //     )
  //   );

  //   // ===== TOTAL ROW (FIXED) =====
  //   const totalRow = new Array(keys.length).fill("");
  //   totalRow[0] = filteredData.length.toString();
  //   totalRow[1] = "Total";
  //   totalRow[keys.indexOf("debit")] = totalDebit.toLocaleString();
  //   totalRow[keys.indexOf("credit")] = totalCredit.toLocaleString();
  //   totalRow[keys.indexOf("balance")] = totalBalance.toLocaleString();

  //   [...bodyRows, totalRow].forEach((row, i, arr) => {
  //     checkPageBreak();
  //     drawRow(row, i === arr.length - 1);
  //   });

  //   // ===== AGING CARD (PDF VERSION) =====
  //   if (apiData) {
  //     y += 10;

  //     const boxWidth = 28;
  //     const boxHeight = 14;
  //     const gap = 2;
  //     const totalBoxWidth = stats.length * boxWidth + (stats.length - 1) * gap;
  //     let x = (pageWidth - totalBoxWidth) / 2;

  //     doc.setFontSize(8);

  //     stats.forEach((stat) => {
  //       doc.rect(x, y, boxWidth, boxHeight);
  //       doc.text(stat.range, x + boxWidth / 2, y + 5, { align: "center" });
  //       doc.setFont("Helvetica", "bold");
  //       doc.text(
  //         Number(stat.amount || 0).toLocaleString(),
  //         x + boxWidth / 2,
  //         y + 11,
  //         { align: "center" }
  //       );
  //       doc.setFont("Helvetica", "normal");
  //       x += boxWidth + gap;
  //     });
  //   }

  //   // ===== SAVE =====
  //   doc.save(`${REPORT_NAME}.pdf`);
  // };

  // const exportPDFHandler = () => {
  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   // ================= DATA =================
  //   const rows = filteredData.map((r) => [
  //     r.sr,
  //     r.month,
  //     toNumber(r.debit).toLocaleString(),
  //     toNumber(r.credit).toLocaleString(),
  //     toNumber(r.balance).toLocaleString(),
  //   ]);

  //   // TOTAL ROW
  //   rows.push([
  //     "",
  //     "Total",
  //     toNumber(apiData?.totalRow?.Debit).toLocaleString(),
  //     toNumber(apiData?.totalRow?.Credit).toLocaleString(),
  //     toNumber(apiData?.totalRow?.Balance).toLocaleString(),
  //   ]);

  //   // Dummy row for aging
  //   rows.push(["", "", "", "", ""]);

  //   const headers = ["Sr#", "Month", "Debit", "Credit", "Balance"];
  //   const columnWidths = [15, 30, 30, 30, 30];
  //   const totalWidth = columnWidths.reduce((a, b) => a + b, 0);

  //   // ================= BASE FONT =================
  //   doc.setFont("Helvetica", "normal");
  //   doc.setFontSize(10);

  //   // ================= TABLE HEADER =================
  //   const addTableHeaders = (startX, startY) => {
  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(11);

  //     headers.forEach((h, i) => {
  //       doc.rect(startX, startY, columnWidths[i], 6.5);
  //       doc.text(h, startX + columnWidths[i] / 2, startY + 4.4, {
  //         align: "center",
  //       });
  //       startX += columnWidths[i];
  //     });

  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(10);
  //   };

  //   // ================= AGING ROW =================
  //   const drawBalanceAgingRow = (startX, startY) => {
  //     const tableWidth = columnWidths.reduce((a, b) => a + b, 0);
  //     const colW = tableWidth / 6;

  //     const labels = ["01-30", "31-60", "61-90", "91-120", "121-150", "150+"];
  //     const values = [
  //       apiData?.amt001,
  //       apiData?.amt002,
  //       apiData?.amt003,
  //       apiData?.amt004,
  //       apiData?.amt005,
  //       apiData?.amt006,
  //     ].map((v) => toNumber(v).toLocaleString());

  //     let x = startX;
  //     doc.rect(startX, startY, tableWidth, 13);

  //     for (let i = 0; i < 6; i++) {
  //       doc.rect(x, startY, colW, 13);
  //       doc.line(x, startY + 6.5, x + colW, startY + 6.5);

  //       doc.setFont("Helvetica", "bold");
  //       doc.setFontSize(9.5);
  //       doc.text(labels[i], x + colW / 2, startY + 4.6, {
  //         align: "center",
  //       });

  //       doc.setFont("Helvetica", "normal");
  //       doc.setFontSize(10.5);
  //       doc.text(values[i], x + colW / 2, startY + 11.2, {
  //         align: "center",
  //       });

  //       x += colW;
  //     }
  //   };

  //   // ================= TABLE ROWS =================
  //   const addRows = (startX, startY) => {
  //     const rowH = 5.2;

  //     rows.forEach((row, i) => {
  //       const y = startY + (i + 2) * rowH;

  //       if (i === rows.length - 1) {
  //         drawBalanceAgingRow(startX, y + 2);
  //         return;
  //       }

  //       let x = startX;

  //       if (row[1] === "Total") {
  //         doc.setFont("Helvetica", "bold");
  //       }

  //       row.forEach((cell, c) => {
  //         doc.rect(x, y, columnWidths[c], rowH);
  //         doc.text(
  //           String(cell),
  //           c >= 2 ? x + columnWidths[c] - 2 : x + 2,
  //           y + 3.7,
  //           { align: c >= 2 ? "right" : "left" }
  //         );
  //         x += columnWidths[c];
  //       });

  //       doc.setFont("Helvetica", "normal");
  //     });
  //   };

  //   // ================= HEADINGS =================
  //   const pageCenter = doc.internal.pageSize.width / 2;
  //   const tableStartX = (doc.internal.pageSize.width - totalWidth) / 2;

  //   // COMPANY NAME
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(17);
  //   doc.text("AMERICAN ELECTRONICS (SMC-PVT) LTD", pageCenter, 14, {
  //     align: "center",
  //   });

  //   // REPORT LINE
  //   doc.setFont("Helvetica", "normal");
  //   doc.setFontSize(12);
  //   doc.text(`Customer Report (${cusDate})`, pageCenter, 20, {
  //     align: "center",
  //   });

  //   // ACCOUNT
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(11);
  //   doc.text(`Account: ${headerName}`, tableStartX, 28);

  //   // ================= DRAW TABLE =================
  //   addTableHeaders(tableStartX, 32);
  //   addRows(tableStartX, 32);

  //   // ================= SAVE =================
  //   doc.save(`CustomerProgressReport_${cusDate}.pdf`);
  // };

  // const exportPDFHandler = () => {
  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   // ================= COLORS =================
  //   const COLORS = {
  //     headerBg: [236, 239, 246], // light iOS gray-blue
  //     altRow: [248, 249, 252], // zebra row
  //     totalRow: [230, 235, 255], // total highlight
  //     border: [180, 180, 180],
  //     text: [40, 40, 40],
  //   };

  //   // ================= DATA =================
  //   const rows = filteredData.map((r) => [
  //     r.sr,
  //     r.month,
  //     toNumber(r.debit).toLocaleString(),
  //     toNumber(r.credit).toLocaleString(),
  //     toNumber(r.balance).toLocaleString(),
  //   ]);

  //   rows.push([
  //     "",
  //     "Total",
  //     toNumber(apiData?.totalRow?.Debit).toLocaleString(),
  //     toNumber(apiData?.totalRow?.Credit).toLocaleString(),
  //     toNumber(apiData?.totalRow?.Balance).toLocaleString(),
  //   ]);

  //   rows.push(["", "", "", "", ""]); // aging placeholder

  //   const headers = ["Sr#", "Month", "Debit", "Credit", "Balance"];
  //   const columnWidths = [15, 30, 30, 30, 30];
  //   const totalWidth = columnWidths.reduce((a, b) => a + b, 0);

  //   // ================= BASE FONT =================
  //   doc.setFont("Helvetica", "normal");
  //   doc.setFontSize(10);
  //   doc.setTextColor(...COLORS.text);

  //   // ================= TABLE HEADER =================
  //   const addTableHeaders = (startX, startY) => {
  //     let x = startX;

  //     doc.setFillColor(...COLORS.headerBg);
  //     doc.setDrawColor(...COLORS.border);
  //     doc.rect(startX, startY, totalWidth, 7, "FD");

  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(11);

  //     headers.forEach((h, i) => {
  //       doc.text(h, x + columnWidths[i] / 2, startY + 4.8, {
  //         align: "center",
  //       });
  //       x += columnWidths[i];
  //     });

  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(10);
  //   };

  //   // ================= AGING ROW =================
  //   const drawBalanceAgingRow = (startX, startY) => {
  //     const tableWidth = columnWidths.reduce((a, b) => a + b, 0);
  //     const colW = tableWidth / 6;
  //     const rowH = 13;

  //     const labels = ["01-30", "31-60", "61-90", "91-120", "121-150", "150+"];
  //     const values = [
  //       apiData?.amt001,
  //       apiData?.amt002,
  //       apiData?.amt003,
  //       apiData?.amt004,
  //       apiData?.amt005,
  //       apiData?.amt006,
  //     ].map((v) => toNumber(v).toLocaleString());

  //     // Outer border
  //     doc.setDrawColor(180, 180, 180);
  //     doc.rect(startX, startY, tableWidth, rowH);

  //     let x = startX;

  //     for (let i = 0; i < 6; i++) {
  //       // Vertical grid line (except first)
  //       if (i !== 0) {
  //         doc.line(x, startY, x, startY + rowH);
  //       }

  //       // Horizontal divider (label / value)
  //       doc.line(x, startY + rowH / 2, x + colW, startY + rowH / 2);

  //       // Label
  //       doc.setFont("Helvetica", "bold");
  //       doc.setFontSize(9.5);
  //       doc.text(labels[i], x + colW / 2, startY + 4.5, {
  //         align: "center",
  //       });

  //       // Value
  //       doc.setFont("Helvetica", "normal");
  //       doc.setFontSize(10.5);
  //       doc.text(values[i], x + colW / 2, startY + 11, {
  //         align: "center",
  //       });

  //       x += colW;
  //     }
  //   };

  //   // ================= TABLE ROWS =================
  //   const addRows = (startX, startY) => {
  //     const rowH = 5.2;

  //     rows.forEach((row, i) => {
  //       const y = startY + (i + 2) * rowH;

  //       if (i === rows.length - 1) {
  //         drawBalanceAgingRow(startX, y + 2);
  //         return;
  //       }

  //       // Row background
  //       if (row[1] === "Total") {
  //         doc.setFillColor(...COLORS.totalRow);
  //         doc.setFont("Helvetica", "bold");
  //         doc.rect(startX, y, totalWidth, rowH, "F");
  //       } else if (i % 2 === 0) {
  //         doc.setFillColor(...COLORS.altRow);
  //         doc.rect(startX, y, totalWidth, rowH, "F");
  //       }

  //       let x = startX;
  //       row.forEach((cell, c) => {
  //         doc.text(
  //           String(cell),
  //           c >= 2 ? x + columnWidths[c] - 2 : x + 2,
  //           y + 3.7,
  //           { align: c >= 2 ? "right" : "left" }
  //         );
  //         x += columnWidths[c];
  //       });

  //       doc.setFont("Helvetica", "normal");
  //     });

  //     // Outer border only
  //     const tableHeight = (rows.length + 1) * rowH;
  //     doc.setDrawColor(...COLORS.border);
  //     doc.rect(startX, startY, totalWidth, tableHeight);
  //   };

  //   // ================= HEADINGS =================
  //   const pageCenter = doc.internal.pageSize.width / 2;
  //   const tableStartX = (doc.internal.pageSize.width - totalWidth) / 2;

  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(17);
  //   doc.text("AMERICAN ELECTRONICS (SMC-PVT) LTD", pageCenter, 14, {
  //     align: "center",
  //   });

  //   doc.setFont("Helvetica", "normal");
  //   doc.setFontSize(12);
  //   doc.text(`Customer Report (${cusDate})`, pageCenter, 20, {
  //     align: "center",
  //   });

  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(11);
  //   doc.text(`Account: ${headerName}`, tableStartX, 28);

  //   // ================= DRAW TABLE =================
  //   addTableHeaders(tableStartX, 32);
  //   addRows(tableStartX, 32);

  //   // ================= SAVE =================
  //   doc.save(`CustomerProgressReport_${cusDate}.pdf`);
  // };
  // const exportPDFHandler = () => {
  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   // ================= COLORS =================
  //   const COLORS = {
  //     headerBg: [225, 228, 235], // premium slate
  //     lineSoft: [205, 205, 205], // soft separators
  //     lineStrong: [140, 140, 140], // emphasis
  //     text: [45, 45, 45],
  //   };

  //   // ================= DATA =================
  //   const rows = filteredData.map((r) => [
  //     r.sr,
  //     r.month,
  //     toNumber(r.debit).toLocaleString(),
  //     toNumber(r.credit).toLocaleString(),
  //     toNumber(r.balance).toLocaleString(),
  //   ]);

  //   rows.push([
  //     "",
  //     "Total",
  //     toNumber(apiData?.totalRow?.Debit).toLocaleString(),
  //     toNumber(apiData?.totalRow?.Credit).toLocaleString(),
  //     toNumber(apiData?.totalRow?.Balance).toLocaleString(),
  //   ]);

  //   rows.push(["", "", "", "", ""]);

  //   const headers = ["Sr#", "Month", "Debit", "Credit", "Balance"];
  //   const columnWidths = [15, 30, 30, 30, 30];
  //   const totalWidth = columnWidths.reduce((a, b) => a + b, 0);

  //   // ================= BASE =================
  //   doc.setFont("Helvetica", "normal");
  //   doc.setFontSize(10);
  //   doc.setTextColor(...COLORS.text);

  //   // ================= HEADER =================
  //   const addTableHeaders = (x, y) => {
  //     doc.setFillColor(...COLORS.headerBg);
  //     doc.rect(x, y, totalWidth, 8, "F");

  //     doc.setDrawColor(...COLORS.lineStrong);
  //     doc.line(x, y + 8, x + totalWidth, y + 8);

  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(11);

  //     let cx = x;
  //     headers.forEach((h, i) => {
  //       doc.text(h, cx + columnWidths[i] / 2, y + 5.4, { align: "center" });
  //       cx += columnWidths[i];
  //     });

  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(10);
  //   };

  //   // ================= AGING =================
  //   const drawBalanceAgingRow = (x, y) => {
  //     const colW = totalWidth / 6;
  //     const rowH = 13;

  //     const labels = ["01-30", "31-60", "61-90", "91-120", "121-150", "150+"];
  //     const values = [
  //       apiData?.amt001,
  //       apiData?.amt002,
  //       apiData?.amt003,
  //       apiData?.amt004,
  //       apiData?.amt005,
  //       apiData?.amt006,
  //     ].map((v) => toNumber(v).toLocaleString());

  //     doc.setDrawColor(...COLORS.lineStrong);
  //     doc.rect(x, y, totalWidth, rowH);

  //     let cx = x;
  //     for (let i = 0; i < 6; i++) {
  //       if (i !== 0) doc.line(cx, y, cx, y + rowH);

  //       doc.setDrawColor(...COLORS.lineSoft);
  //       doc.line(cx, y + rowH / 2, cx + colW, y + rowH / 2);

  //       doc.setFont("Helvetica", "bold");
  //       doc.setFontSize(9.5);
  //       doc.text(labels[i], cx + colW / 2, y + 4.5, { align: "center" });

  //       doc.setFont("Helvetica", "normal");
  //       doc.setFontSize(10.5);
  //       doc.text(values[i], cx + colW / 2, y + 11, { align: "center" });

  //       cx += colW;
  //     }
  //   };

  //   // ================= ROWS =================
  //   const addRows = (x, y) => {
  //     const rowH = 5.8;
  //     const gap = 3;

  //     rows.forEach((row, i) => {
  //       const cy = y + (i + 2) * rowH;

  //       if (i === rows.length - 1) {
  //         drawBalanceAgingRow(x, cy + 3);
  //         return;
  //       }

  //       if (row[1] === "Total") {
  //         doc.setFont("Helvetica", "bold");
  //       } else {
  //         doc.setFont("Helvetica", "normal");
  //       }

  //       let cx = x;
  //       row.forEach((cell, c) => {
  //         doc.text(
  //           String(cell),
  //           c >= 2 ? cx + columnWidths[c] - 2 : cx + 2,
  //           cy + 4,
  //           { align: c >= 2 ? "right" : "left" }
  //         );
  //         cx += columnWidths[c];
  //       });

  //       // Line logic
  //       if (row[1] === "Total") {
  //         doc.setDrawColor(...COLORS.lineStrong);
  //         doc.setLineWidth(0.5);
  //       } else if (row[1] === "Opening") {
  //         doc.setDrawColor(...COLORS.lineStrong);
  //         doc.setLineWidth(0.35);
  //       } else {
  //         doc.setDrawColor(...COLORS.lineSoft);
  //         doc.setLineWidth(0.25);
  //       }

  //       doc.line(x + gap, cy + rowH, x + totalWidth - gap, cy + rowH);
  //       doc.setLineWidth(0.2);
  //     });

  //     doc.setDrawColor(...COLORS.lineStrong);
  //     doc.rect(x, y, totalWidth, (rows.length + 1) * rowH);
  //   };

  //   // ================= TITLES =================
  //   const center = doc.internal.pageSize.width / 2;
  //   const tableX = (doc.internal.pageSize.width - totalWidth) / 2;

  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(17);
  //   doc.text("AMERICAN ELECTRONICS (SMC-PVT) LTD", center, 14, {
  //     align: "center",
  //   });

  //   doc.setFontSize(12);
  //   doc.setFont("Helvetica", "normal");
  //   doc.text(`Customer Report (${cusDate})`, center, 20, { align: "center" });

  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(11);
  //   doc.text(`Account: ${headerName}`, tableX, 28);

  //   // ================= DRAW =================
  //   addTableHeaders(tableX, 32);
  //   addRows(tableX, 32);

  //   doc.save(`CustomerProgressReport_${cusDate}.pdf`);
  // };

  const exportPDFHandler = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // ================= COLORS =================
    const COLORS = {
      headerBg: [225, 228, 235],
      balanceBg: [232, 238, 255], // 🔹 balance column background
      lineSoft: [205, 205, 205],
      lineStrong: [140, 140, 140],
      text: [45, 45, 45],
    };

    // ================= DATA =================
    const rows = filteredData.map((r) => [
      r.sr,
      r.month,
      showIfNonZero(r.debit).toLocaleString(),
      showIfNonZero(r.credit).toLocaleString(),
      showIfNonZero(r.balance).toLocaleString(),
    ]);

    rows.push([
      "",
      "Total",
      showIfNonZero(apiData?.totalRow?.Debit).toLocaleString(),
      showIfNonZero(apiData?.totalRow?.Credit).toLocaleString(),
      showIfNonZero(apiData?.totalRow?.Balance).toLocaleString(),
    ]);

    rows.push(["", "", "", "", ""]);

    const headers = ["Sr#", "Month", "Debit", "Credit", "Balance"];
    const columnWidths = [15, 30, 30, 30, 30];
    const totalWidth = columnWidths.reduce((a, b) => a + b, 0);

    // ================= BASE =================
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.text);

    // ================= HEADER =================
    const addTableHeaders = (x, y) => {
      doc.setFillColor(...COLORS.headerBg);
      doc.rect(x, y, totalWidth, 8, "F");

      doc.setDrawColor(...COLORS.lineStrong);
      doc.line(x, y + 8, x + totalWidth, y + 8);

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(11);

      let cx = x;
      headers.forEach((h, i) => {
        doc.text(h, cx + columnWidths[i] / 2, y + 5.4, { align: "center" });
        cx += columnWidths[i];
      });

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
    };

    // ================= AGING =================
    const drawBalanceAgingRow = (x, y) => {
      const colW = totalWidth / 6;
      const rowH = 13;

      const labels = ["01-30", "31-60", "61-90", "91-120", "121-150", "150+"];
      const values = [
        apiData?.amt001,
        apiData?.amt002,
        apiData?.amt003,
        apiData?.amt004,
        apiData?.amt005,
        apiData?.amt006,
      ].map((v) => showIfNonZero(v).toLocaleString());

      doc.setDrawColor(...COLORS.lineStrong);
      doc.rect(x, y, totalWidth, rowH);

      let cx = x;
      for (let i = 0; i < 6; i++) {
        if (i !== 0) doc.line(cx, y, cx, y + rowH);

        doc.setDrawColor(...COLORS.lineSoft);
        doc.line(cx, y + rowH / 2, cx + colW, y + rowH / 2);

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(9.5);
        doc.text(labels[i], cx + colW / 2, y + 4.5, { align: "center" });

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(10.5);
        doc.text(values[i], cx + colW / 2, y + 11, { align: "center" });

        cx += colW;
      }
    };

    // ================= ROWS =================
    const addRows = (x, y) => {
      const rowH = 5.8;
      const gap = 3;

      const balanceX =
        x +
        columnWidths[0] +
        columnWidths[1] +
        columnWidths[2] +
        columnWidths[3];

      rows.forEach((row, i) => {
        const cy = y + (i + 2) * rowH;

        if (i === rows.length - 1) {
          drawBalanceAgingRow(x, cy + 3);
          return;
        }

        // 🔹 inset background so borders remain visible
        const inset = 0.6;

        doc.setFillColor(...COLORS.balanceBg);
        doc.rect(
          balanceX + inset,
          cy - 0.5 + inset,
          columnWidths[4] - inset * 2,
          rowH - inset * 2,
          "F"
        );

        doc.setFont(
          row[1] === "Total" ? "Helvetica" : "Helvetica",
          row[1] === "Total" ? "bold" : "normal"
        );

        let cx = x;
        row.forEach((cell, c) => {
          doc.text(
            String(cell),
            c >= 2 ? cx + columnWidths[c] - 2 : cx + 2,
            cy + 4,
            { align: c >= 2 ? "right" : "left" }
          );
          cx += columnWidths[c];
        });

        // Lines
        if (row[1] === "Total") {
          doc.setDrawColor(...COLORS.lineStrong);
          doc.setLineWidth(0.5);
        } else if (row[1] === "Opening") {
          doc.setDrawColor(...COLORS.lineStrong);
          doc.setLineWidth(0.35);
        } else {
          doc.setDrawColor(...COLORS.lineSoft);
          doc.setLineWidth(0.25);
        }

        doc.line(x + gap, cy + rowH, x + totalWidth - gap, cy + rowH);
        doc.setLineWidth(0.2);
      });

      doc.setDrawColor(...COLORS.lineStrong);
      doc.rect(x, y, totalWidth, (rows.length + 1) * rowH);
    };

    // ================= TITLES =================
    const center = doc.internal.pageSize.width / 2;
    const tableX = (doc.internal.pageSize.width - totalWidth) / 2;

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(17);
    doc.text("AMERICAN ELECTRONICS (SMC-PVT) LTD", center, 14, {
      align: "center",
    });

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Customer Report (${cusDate})`, center, 20, { align: "center" });

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`Account: ${headerName}`, tableX, 28);

    // ================= DRAW =================
    addTableHeaders(tableX, 32);
    addRows(tableX, 32);

    doc.save(`CustomerProgressReport_${cusDate}.pdf`);
  };

  // const exportPDFHandler = () => {
  //   const doc = new jsPDF("p", "mm", "a4");

  //   // ================= COLORS =================
  //   const COLORS = {
  //     headerBg: [255, 239, 230], // light orange
  //     outerBorder: [235, 120, 60],
  //     zebra: [248, 248, 248],
  //     text: [40, 40, 40],
  //   };

  //   // ================= DATA =================
  //   const rows = filteredData.map((r) => [
  //     r.sr,
  //     r.month,
  //     toNumber(r.debit).toLocaleString(),
  //     toNumber(r.credit).toLocaleString(),
  //     toNumber(r.balance).toLocaleString(),
  //   ]);

  //   rows.push([
  //     "",
  //     "Total",
  //     toNumber(apiData?.totalRow?.Debit).toLocaleString(),
  //     toNumber(apiData?.totalRow?.Credit).toLocaleString(),
  //     toNumber(apiData?.totalRow?.Balance).toLocaleString(),
  //   ]);

  //   const headers = ["Sr#", "Month", "Debit", "Credit", "Balance"];
  //   const columnWidths = [15, 35, 35, 35, 35];
  //   const tableWidth = columnWidths.reduce((a, b) => a + b, 0);
  //   const rowH = 7;

  //   const pageCenter = doc.internal.pageSize.width / 2;
  //   const startX = (doc.internal.pageSize.width - tableWidth) / 2;
  //   let startY = 34;

  //   // ================= HEADING (EXACT AS IMAGE) =================

  //   // Company name (center)
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(16);
  //   doc.text("AMERICAN ELECTRONICS (SMC-PVT) LTD", pageCenter, 14, {
  //     align: "center",
  //   });

  //   // Report line (center, just below)
  //   doc.setFont("Helvetica", "normal");
  //   doc.setFontSize(11);
  //   doc.text(`Customer Report (${cusDate})`, pageCenter, 20, {
  //     align: "center",
  //   });

  //   // Account line (LEFT aligned with table)
  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(11);
  //   doc.text(`Account: ${headerName}`, startX, 25);

  //   // ================= OUTER ROUNDED BORDER =================
  //   const tableHeight = (rows.length + 1) * rowH + 10;
  //   doc.setDrawColor(...COLORS.outerBorder);
  //   doc.setLineWidth(1);
  //   doc.roundedRect(startX - 4, startY - 6, tableWidth + 8, tableHeight, 6, 6);

  //   // ================= HEADER =================
  //   doc.setFillColor(...COLORS.headerBg);
  //   doc.roundedRect(startX, startY, tableWidth, rowH, 5, 5, "F");

  //   doc.setFont("Helvetica", "bold");
  //   doc.setFontSize(11);

  //   let x = startX;
  //   headers.forEach((h, i) => {
  //     doc.text(h, x + columnWidths[i] / 2, startY + 4.8, {
  //       align: "center",
  //     });
  //     x += columnWidths[i];
  //   });

  //   // ================= ROWS (NO GRID) =================
  //   doc.setFont("Helvetica", "normal");
  //   doc.setFontSize(10);
  //   doc.setTextColor(...COLORS.text);

  //   rows.forEach((row, rIndex) => {
  //     const y = startY + rowH * (rIndex + 1);

  //     // zebra rows
  //     if (rIndex % 2 === 0 && row[1] !== "Total") {
  //       doc.setFillColor(...COLORS.zebra);
  //       doc.rect(startX, y, tableWidth, rowH, "F");
  //     }

  //     // total row emphasis
  //     if (row[1] === "Total") {
  //       doc.setFont("Helvetica", "bold");
  //     }

  //     let cx = startX;
  //     row.forEach((cell, cIndex) => {
  //       doc.text(
  //         String(cell),
  //         cIndex >= 2 ? cx + columnWidths[cIndex] - 4 : cx + 4,
  //         y + 4.6,
  //         { align: cIndex >= 2 ? "right" : "left" }
  //       );
  //       cx += columnWidths[cIndex];
  //     });

  //     doc.setFont("Helvetica", "normal");
  //   });

  //   // ================= AGING TABLE (SOFT GRID) =================
  //   const agingY = startY + tableHeight + 8;
  //   const agingHeight = 16;
  //   const colW = tableWidth / 6;

  //   const labels = ["01-30", "31-60", "61-90", "91-120", "121-150", "150+"];
  //   const values = [
  //     apiData?.amt001,
  //     apiData?.amt002,
  //     apiData?.amt003,
  //     apiData?.amt004,
  //     apiData?.amt005,
  //     apiData?.amt006,
  //   ].map((v) => toNumber(v).toLocaleString());

  //   // Outer rounded border (same as before)
  //   doc.setDrawColor(...COLORS.outerBorder);
  //   doc.roundedRect(
  //     startX - 4,
  //     agingY - 4,
  //     tableWidth + 8,
  //     agingHeight + 6,
  //     6,
  //     6
  //   );

  //   // ---- SOFT GRID COLOR ----
  //   doc.setDrawColor(220, 220, 220); // very light gray
  //   doc.setLineWidth(0.3);

  //   let ax = startX;

  //   labels.forEach((lbl, i) => {
  //     // soft vertical divider (skip first)
  //     if (i !== 0) {
  //       doc.line(ax, agingY - 1, ax, agingY + agingHeight - 1);
  //     }

  //     // soft horizontal divider (label / value)
  //     doc.line(ax + 2, agingY + 7.5, ax + colW - 2, agingY + 7.5);

  //     // label
  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(9.5);
  //     doc.text(lbl, ax + colW / 2, agingY + 4.5, {
  //       align: "center",
  //     });

  //     // value
  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(10.5);
  //     doc.text(values[i], ax + colW / 2, agingY + 12, {
  //       align: "center",
  //     });

  //     ax += colW;
  //   });

  //   // ================= SAVE =================
  //   doc.save(`CustomerProgressReport_${cusDate}.pdf`);
  // };

  // EXCEL EXPORT
  async function exportCSV({
    rows,
    columnsConfig,
    totalCollection,
    companyName,
    reportName,
  }) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    const excelColumns = columnsConfig.filter((c) => c.key !== "scrollSpacer");

    const headers = excelColumns.map((c) => c.header);
    const keys = excelColumns.map((c) => c.key);

    worksheet.addRow([companyName]);
    worksheet.mergeCells(1, 1, 1, headers.length);
    worksheet.getRow(1).font = { bold: true, size: 16 };
    worksheet.getRow(1).alignment = { horizontal: "center" };

    worksheet.addRow([`${reportName} (${headerCode} | ${headerName || ""})`]);
    worksheet.mergeCells(2, 1, 2, headers.length);
    worksheet.getRow(2).alignment = { horizontal: "center" };

    worksheet.addRow([`Date: ${toApiDate(cusDate)}`]);
    worksheet.mergeCells(3, 1, 3, headers.length);
    worksheet.getRow(3).alignment = { horizontal: "center" };

    worksheet.addRow([]);

    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    rows.forEach((item) => {
      const row = worksheet.addRow(
        keys.map((key) => {
          if (["debit", "credit", "balance"].includes(key)) {
            return Number(item[key] || 0).toLocaleString();
          }
          return item[key] ?? "";
        })
      );
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = {
          horizontal: "left",
        };
      });
    });

    const totalRowData = new Array(headers.length).fill("");
    totalRowData[0] = rows.length.toString();
    totalRowData[headers.indexOf("Debit")] = totalDebit.toLocaleString();
    totalRowData[headers.indexOf("Credit")] = totalCredit.toLocaleString();
    totalRowData[headers.indexOf("Balance")] = totalCollection.toLocaleString();
    const totalRow = worksheet.addRow(totalRowData);

    totalRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.border = {
        top: { style: "double" },
        left: { style: "thin" },
        bottom: { style: "double" },
        right: { style: "thin" },
      };
    });

    // credit amount row (below credit total)
    if (creditAmount != null) {
      const creditRow = new Array(headers.length).fill("");
      creditRow[headers.indexOf("Credit")] =
        "Credit Amount: " + Number(creditAmount || 0).toLocaleString();
      const creditRowRef = worksheet.addRow(creditRow);
      creditRowRef.eachCell((cell) => {
        cell.font = { italic: true, size: 10 };
      });
    }

    excelColumns.forEach((col, i) => {
      worksheet.getColumn(i + 1).width = col.excelWidth || col.uiWidth || 20;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      `${reportName}.xlsx`
    );
  }

  const handleCSV = () => {
    exportCSV({
      rows: filteredData,
      columnsConfig,
      totalCollection: totalBalance,
      companyName: COMPANY_NAME,
      reportName: REPORT_NAME,
    });
  };

  return (
    <>
      <style>
        {`
          .sortable-header {
            cursor: pointer;
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
          }

          .table-scroll {
            overflow-y: auto;
            overflow-x: hidden;
            -ms-overflow-style: auto;
            scrollbar-width: auto;
          }
        `}
      </style>

      <div style={contentStyle}>
        <div
          style={{
            backgroundColor: getcolor,
            color: fontcolor,
            width: "100%",
            border: `1px solid ${softTableStyles.softBorderColor}`,
            borderRadius: "12px",
            boxShadow: softTableStyles.softBoxShadow,
          }}
        >
          {/* HEADER: code | name */}
          <NavComponent textdata={`${headerCode} | ${headerName}`} />

          {/* DATE + YEAR FILTER ROW */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 10px",
              backgroundColor: "white",
              // borderRadius: "3px",
              // border: "1px solid #000", // 🔹 outer thin black border
              margin: "6px",
            }}
          >
            {/* LEFT — DATE PICKER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #000", // 🔹 thin black
                padding: "2px 6px",
                borderRadius: "2px",
              }}
            >
              <input
                type="date"
                value={cusDate}
                onChange={(e) => setCusDate(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: getdatafontsize,
                  fontFamily: getfontstyle,
                  backgroundColor: "transparent",
                }}
              />
            </div>

            {/* RIGHT — YEAR DROPDOWN */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #000", // 🔹 thin black
                padding: "2px 6px",
                borderRadius: "2px",
              }}
            >
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: getdatafontsize,
                  fontFamily: getfontstyle,
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                {yearOptions.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* TABLE HEADER (fixed) */}
          <div
            style={{
              overflowY: "auto",
              width: "100%",
              overflowX: "hidden",
            }}
          >
            <table
              className="myTable"
              style={{
                fontSize: getdatafontsize,
                fontFamily: getfontstyle,
                width: "100%",
                position: "relative",
                tableLayout: "fixed",
              }}
            >
              <thead
                style={{
                  fontSize: getdatafontsize,
                  fontFamily: getfontstyle,
                  fontWeight: "bold",
                  height: "24px",
                  position: "sticky",
                  top: 0,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
                  backgroundColor: getnavbarbackgroundcolor,
                }}
              >
                <tr
                  style={{
                    backgroundColor: getnavbarbackgroundcolor,
                    color: "white",
                  }}
                >
                  {columnsConfig.map((column, index) => (
                    <td
                      key={index}
                      onClick={() =>
                        column.key !== "scrollSpacer" && requestSort(column.key)
                      }
                      style={{
                        width: column.uiWidth,
                        padding: "8px 6px",
                        borderBottom: `2px solid ${softTableStyles.softBorderColor}`,
                        cursor:
                          column.key === "scrollSpacer" ? "default" : "pointer",
                      }}
                    >
                      <div className="sortable-header">
                        {column.header}
                        {column.key !== "scrollSpacer" &&
                          getSortIcon(column.key)}
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
            </table>
          </div>

          {/* TABLE BODY */}
          <div
            className="table-scroll"
            style={{
              backgroundColor: "white",
              borderBottom: `1px solid ${softTableStyles.softBorderColor}`,
              maxHeight: "50vh",
              width: "100%",
              wordBreak: "break-word",
            }}
          >
            <table
              className="myTable"
              style={{
                fontSize: getdatafontsize,
                fontFamily: getfontstyle,
                width: tableWidth,
                position: "relative",
                ...(filteredData.length > 0 ? { tableLayout: "fixed" } : {}),
              }}
            >
              <tbody>
                {isLoading ? (
                  <>
                    <tr
                      style={{
                        backgroundColor: getcolor,
                        color: fontcolor,
                      }}
                    >
                      <td
                        colSpan={columnsConfig.length}
                        className="text-center"
                        style={{ padding: "10px" }}
                      >
                        Fetching data...
                      </td>
                    </tr>
                    {Array.from({ length: 20 }).map((_, rowIndex) => (
                      <tr
                        key={`blank-loading-${rowIndex}`}
                        style={{
                          backgroundColor: getcolor,
                          color: fontcolor,
                        }}
                      >
                        {columnsConfig.map((_, colIndex) => (
                          <td key={`blank-loading-${rowIndex}-${colIndex}`}>
                            &nbsp;
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {filteredData.map((item, i) => (
                      <tr
                        key={i}
                        onClick={() => setSelectedRowIndex(i)}
                        style={{
                          cursor: "pointer",
                          color: selectedRowIndex === i ? "white" : fontcolor,
                          backgroundColor:
                            selectedRowIndex === i
                              ? getnavbarbackgroundcolor // ✅ theme color
                              : i % 2 === 0
                              ? getcolor
                              : "#f8f9ff",
                          transition: "background-color 0.2s ease",
                        }}
                      >
                        {columnsConfig.map((column, index) => {
                          const key = column.key;
                          let value = "";

                          if (key === "scrollSpacer") {
                            value = "";
                          } else if (
                            ["debit", "credit", "balance"].includes(key)
                          ) {
                            value = showIfNonZero(item[key]).toLocaleString();
                          } else {
                            value = item[key] ?? "";
                          }

                          return (
                            <td
                              key={index}
                              className={getAlignmentClass(column.alignment)}
                              style={{
                                width: column.uiWidth,
                                padding: "8px 6px",
                                borderBottom: `1px solid ${softTableStyles.softRowSeparator}`,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {value}
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    {/* Blank rows to keep table height nice */}
                    {Array.from({
                      length: Math.max(0, 13 - filteredData.length),
                    }).map((_, rowIndex) => (
                      <tr
                        key={`blank-${rowIndex}`}
                        style={{
                          backgroundColor: getcolor,
                          color: fontcolor,
                        }}
                      >
                        {columnsConfig.map((_, colIndex) => (
                          <td key={`blank-${rowIndex}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}

                    {/* Dummy row to keep widths */}
                    <tr>
                      {columnsConfig.map((column, index) => (
                        <td
                          key={`dummy-bottom-${index}`}
                          style={{ width: column.uiWidth }}
                        ></td>
                      ))}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* TOTAL ROW (bottom of table)  + credit amount below credit col */}
          <div
            style={{
              borderBottom: `1px solid ${softTableStyles.softBorderColor}`,
              borderTop: `2px solid ${softTableStyles.softBorderColor}`,
              height: "auto",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {/* main total row */}
            <div
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              {columnsConfig.map((column, index) => {
                const alignmentClass = getAlignmentClass(
                  ["debit", "credit", "balance"].includes(column.key)
                    ? "right"
                    : "left"
                );

                let content = "";
                // if (column.key === "sr") content = filteredData.length;
                if (column.key === "month") content = "";

                if (column.key === "debit")
                  content = showIfNonZero(
                    apiData?.totalRow?.Debit ?? totalDebit
                  ).toLocaleString();

                if (column.key === "credit")
                  content = showIfNonZero(
                    apiData?.totalRow?.Credit ?? totalCredit
                  ).toLocaleString();

                if (column.key === "balance")
                  content = showIfNonZero(
                    apiData?.totalRow?.Balance ?? totalBalance
                  ).toLocaleString();

                return (
                  <div
                    key={`total-col-${index}`}
                    className={alignmentClass}
                    style={{
                      width: column.uiWidth,
                      background: getcolor,
                      borderRight:
                        index < columnsConfig.length - 1
                          ? `1px solid ${softTableStyles.softBorderColor}`
                          : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: ["debit", "credit", "balance"].includes(
                        column.key
                      )
                        ? "flex-end"
                        : "flex-start",
                      paddingRight: ["debit", "credit", "balance"].includes(
                        column.key
                      )
                        ? "5px"
                        : "0px",
                      paddingLeft: ["debit", "credit", "balance"].includes(
                        column.key
                      )
                        ? "0px"
                        : "5px",
                      fontWeight: "bold",
                      fontSize: getdatafontsize,
                      fontFamily: getfontstyle,
                    }}
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            {/* credit amount row → only under Credit column */}
            {creditAmount != null && (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                {columnsConfig.map((column, index) => {
                  return (
                    <div
                      key={`credit-amt-${index}`}
                      style={{
                        width: column.uiWidth,
                        background: getcolor,
                        borderRight:
                          index < columnsConfig.length - 1
                            ? `1px solid ${softTableStyles.softBorderColor}`
                            : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          column.key === "credit" ? "flex-end" : "flex-start",
                        paddingRight: column.key === "credit" ? "5px" : "0px",
                        paddingLeft: column.key === "credit" ? "0px" : "5px",
                        fontSize: "11px",
                        fontStyle: "italic",
                        color: "#333",
                      }}
                    >
                      {column.key === "credit"
                        ? `Credit Amount: ${Number(
                            creditAmount || 0
                          ).toLocaleString()}`
                        : ""}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ACTION BUTTONS – PDF & Excel */}
          <div
            style={{
              margin: "5px",
              marginBottom: "2px",
            }}
          >
            {/* AGGING CARD */}
            {apiData && (
              <div
                style={{
                  padding: "8px",
                  width: "auto",
                  margin: "0 auto", // ⭐ THIS centers the whole card irrespective of width
                }}
              >
                {hasAnyAgingValue(stats) && (
                  <HorizontalAggingRangeCard stats={stats} />
                )}
              </div>
            )}
            {/* <SingleButton title="Select" onClick={handleSelect} /> */}

            <SingleButton text="PDF" onClick={exportPDFHandler} />
            <SingleButton text="Excel" onClick={handleCSV} />
          </div>
        </div>
      </div>
    </>
  );
}
