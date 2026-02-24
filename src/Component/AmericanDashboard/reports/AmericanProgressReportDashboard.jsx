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
];

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
  // const query = useQueryParams();
  // const custCode = query.get("code");
  // const custName = query.get("name");
  const query = useQueryParams();

  const [custCode] = useState(() => query.get("code"));
  const [custName] = useState(() => query.get("name"));

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

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const defaultDate = `${yyyy}-${mm}-${dd}`;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [appliedYear, setAppliedYear] = useState(currentYear);

  const formatDateDDMMYYYY = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const [cusDate] = useState(formatDateDDMMYYYY(new Date()));
  // const [cusDate, setCusDate] = useState(`31-12-${currentYear}`);
  const [appliedDate, setAppliedDate] = useState(`31-12-${currentYear}`);

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
    0,
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

  const fetchProgress = async (year, date) => {
    if (!custCode) {
      console.error("Customer code missing — API call blocked");
      return;
    }

    try {
      setIsLoading(true);

      const form = new FormData();
      form.append("code", "AMRELEC");
      form.append("cusId", custCode);
      form.append("cusYear", year);
      form.append("cusDate", date);
      console.log("API Request FormData:", custCode, year, date);

      const res = await axios.post(
        "https://crystalsolutions.pk/api/AmericanCustomerProgress.php",
        form,
      );

      const progressList = res.data?.Progress;
      if (!Array.isArray(progressList)) return;

      const totalRow = progressList.find(
        (r) => String(r.Month).toLowerCase() === "total",
      );

      setRows(
        progressList
          .filter((r) => String(r.Month).toLowerCase() !== "total")
          .map((r) => ({
            sr: r["Sr#"],
            month: r.Month,
            debit: r.Debit,
            credit: r.Credit,
            balance: r.Balance,
          })),
      );

      setApiData({ ...res.data, totalRow });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const initDate = `31-12-${currentYear}`;
  //   fetchProgress(currentYear, initDate);
  // }, []);

  useEffect(() => {
    if (!custCode) {
      alert("Customer not selected properly");
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayDate = formatDateDDMMYYYY(today);

    // setCusDate(todayDate);
    fetchProgress(todayYear, todayDate);
  }, []);

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

  const yearOptions = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
  ];

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
          v !== null && v !== undefined ? String(v).toLowerCase() : "",
        )
        .join(" ");
      return rowString.includes(search);
    });
  }, [sortedTableData, searchQuery]);

  const totalDebit = useMemo(
    () => filteredData.reduce((sum, r) => sum + toNumber(r.debit), 0),
    [filteredData],
  );

  const totalCredit = useMemo(
    () => filteredData.reduce((sum, r) => sum + toNumber(r.credit), 0),
    [filteredData],
  );

  const totalBalance = useMemo(
    () => filteredData.reduce((sum, r) => sum + toNumber(r.balance), 0),
    [filteredData],
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

  // const handleSelect = () => {
  //   const today = new Date();
  //   const todayYear = today.getFullYear();

  //   let apiDate;
  //   let apiYear;

  //   if (selectedYear > todayYear) {
  //     const dd = String(today.getDate()).padStart(2, "0");
  //     const mm = String(today.getMonth() + 1).padStart(2, "0");
  //     const yyyy = todayYear;

  //     apiDate = `${dd}-${mm}-${yyyy}`;
  //     apiYear = todayYear;
  //   } else {
  //     apiDate = `31-12-${selectedYear}`;
  //     apiYear = selectedYear;
  //   }

  //   setAppliedYear(apiYear);
  //   setCusDate(apiDate);

  //   fetchProgress(apiYear, apiDate);
  // };

  const handleSelect = () => {
    const today = new Date();
    const todayYear = today.getFullYear();

    let apiDate;
    let apiYear;

    if (selectedYear > todayYear) {
      apiDate = formatDateDDMMYYYY(today);
      apiYear = todayYear;
    } else {
      apiDate = `31-12-${selectedYear}`;
      apiYear = selectedYear;
    }

    setAppliedYear(apiYear);
    fetchProgress(apiYear, apiDate);
  };
  const exportPDFHandler = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // ================= COLORS =================
    const COLORS = {
      headerBg: [225, 228, 235],
      balanceBg: [232, 238, 255],
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
          "F",
        );

        doc.setFont(
          row[1] === "Total" ? "Helvetica" : "Helvetica",
          row[1] === "Total" ? "bold" : "normal",
        );

        let cx = x;
        row.forEach((cell, c) => {
          doc.text(
            String(cell),
            c >= 2 ? cx + columnWidths[c] - 2 : cx + 2,
            cy + 4,
            { align: c >= 2 ? "right" : "left" },
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

    // worksheet.addRow([`Date: ${toApiDate(cusDate)}`]);
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
        }),
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
      `${reportName}.xlsx`,
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
          <NavComponent textdata={`${headerCode} | ${headerName}`} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 10px",
              backgroundColor: "white",
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
                type="text"
                value={cusDate}
                readOnly
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: getdatafontsize,
                  fontFamily: getfontstyle,
                  backgroundColor: "transparent",
                  cursor: "default",
                  width: "90px",
                  height: "15px",
                  pointerEvents: "none",
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
                    : "left",
                );

                let content = "";
                if (column.key === "month") content = "";

                if (column.key === "debit")
                  content = showIfNonZero(
                    apiData?.totalRow?.Debit ?? totalDebit,
                  ).toLocaleString();

                if (column.key === "credit")
                  content = showIfNonZero(
                    apiData?.totalRow?.Credit ?? totalCredit,
                  ).toLocaleString();

                if (column.key === "balance")
                  content = showIfNonZero(
                    apiData?.totalRow?.Balance ?? totalBalance,
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
                        column.key,
                      )
                        ? "flex-end"
                        : "flex-start",
                      paddingRight: ["debit", "credit", "balance"].includes(
                        column.key,
                      )
                        ? "5px"
                        : "0px",
                      paddingLeft: ["debit", "credit", "balance"].includes(
                        column.key,
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
                            creditAmount || 0,
                          ).toLocaleString()}`
                        : ""}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

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
                  margin: "0 auto",
                }}
              >
                {hasAnyAgingValue(stats) && (
                  <HorizontalAggingRangeCard stats={stats} />
                )}
              </div>
            )}
            {/* <SingleButton title="Select" onClick={handleSelect} /> */}
            <SingleButton
              text="Select"
              onClick={handleSelect}
              disabled={isLoading}
            />

            <SingleButton text="PDF" onClick={exportPDFHandler} />
            <SingleButton text="Excel" onClick={handleCSV} />
          </div>
        </div>
      </div>
    </>
  );
}
