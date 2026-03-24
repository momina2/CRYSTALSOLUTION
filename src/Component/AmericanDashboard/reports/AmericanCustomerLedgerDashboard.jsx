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
import { useRef } from "react";

const REPORT_NAME = "Customer Ledger";
const COMPANY_NAME = "AMERICAN ELECTRONICS";

const toNumber = (val) => {
  if (val === null || val === undefined || val === "") return 0;
  return Number(String(val).replace(/,/g, "")) || 0;
};
const showIfNonZero = (val) => {
  const num = toNumber(val);
  return num === 0 ? "" : num.toLocaleString();
};
function useQueryParams() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const hasAnyAgingValue = (stats = []) =>
  stats.some((s) => Number(s.amount) !== 0);

const columnsConfig = [
  {
    header: "Date",
    key: "ttrndat",
    alignment: "left",
    uiWidth: 90,
    pdfWidth: 16,
    excelWidth: 15,
  },
  {
    header: "Type",
    key: "ttrntyp",
    alignment: "center",
    uiWidth: 50,
    pdfWidth: 14,
    excelWidth: 15,
  },
  {
    header: "Trn#",
    key: "ttrnnum",
    alignment: "left",
    uiWidth: 53,
    pdfWidth: 16,
    excelWidth: 15,
  },
  {
    header: "Description",
    key: "ttrndsc",
    alignment: "left",
    uiWidth: 360,
    pdfWidth: 65,
    excelWidth: 40,
  },
  {
    header: "Qty",
    key: "titmqnt",
    alignment: "right",
    uiWidth: 60,
    pdfWidth: 12,
    excelWidth: 10,
  },
  {
    header: "Rate",
    key: "tsalrat",
    alignment: "right",
    uiWidth: 80,
    pdfWidth: 14,
    excelWidth: 10,
  },
  {
    header: "Debit",
    key: "debit",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 16,
    excelWidth: 18,
  },
  {
    header: "Credit",
    key: "credit",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 16,
    excelWidth: 18,
  },
  {
    header: "Balance",
    key: "balance",
    alignment: "right",
    uiWidth: 140,
    pdfWidth: 18,
    excelWidth: 18,
  },
  {
    header: "",
    key: "scrollSpacer",
    alignment: "center",
    uiWidth: 20,
    pdfWidth: 0,
    excelWidth: 0,
  },
];

const HorizontalAggingRangeCard = ({ stats }) => (
  <div
    style={{
      width: "65%",
      backgroundColor: "white",
      border: "1px solid #000",
      borderRadius: "6px",
      padding: "4px",
      marginBottom: "6px",
    }}
  >
    <div style={{ display: "flex", textAlign: "center", paddingTop: "2px" }}>
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            padding: "4px 2px",
            borderRight: i !== stats.length - 1 ? "1px solid #000" : "none",
          }}
        >
          <p
            style={{
              marginBottom: "4px",
              fontSize: "12px",
              borderBottom: "1px solid #000",
              paddingBottom: "2px",
            }}
          >
            {s.range}
          </p>

          <p style={{ fontSize: "13px", fontWeight: 600, color: "#000" }}>
            {showIfNonZero(s.amount || 0)}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default function AmericanCustomerLedgerDashboard() {
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

  // date defaults
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const defaultToDate = `${yyyy}-${mm}-${dd}`;
  const defaultFromDate = `${yyyy}-01-01`;

  const [tempFromDate, setTempFromDate] = useState(defaultFromDate);
  const [tempToDate, setTempToDate] = useState(defaultToDate);

  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);

  const [selectedFilters, setSelectedFilters] = useState({});

  const handleChange = (key, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const requestIdRef = useRef(0);

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

  // helpers
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
    return `${d}-${m}-${y}`; // DD-MM-YYYY
  };

  const fetchLedger = async () => {
    if (!custCode) {
      console.error("Customer code missing — API blocked");
      return;
    }

    if (!fromDate || !toDate) {
      alert("From and To dates are required");
      return;
    }

    if (fromDate > toDate) {
      alert("From date cannot be greater than To date");
      return;
    }

    const currentRequestId = ++requestIdRef.current;

    try {
      setIsLoading(true);

      const form = new FormData();
      form.append("code", "AMRELEC");
      form.append("FAccCod", custCode);

      // 🔒 ONLY THESE TWO DATES — NO YEAR LOGIC ANYWHERE
      form.append("FIntDat", toApiDate(fromDate));
      form.append("FFnlDat", toApiDate(toDate));

      console.log(
        "Ledger API Request:",
        custCode,
        toApiDate(fromDate),
        toApiDate(toDate),
      );

      const res = await axios.post(
        "https://crystalsolutions.pk/api/AmericanCustomerLedger.php",
        form,
      );

      if (currentRequestId !== requestIdRef.current) return;

      const data = res.data || null;
      setApiData(data);

      const finalRows = (data?.Header || []).map((r) => ({
        ...r,
        code: custCode,
      }));

      setRows(finalRows);
    } catch (err) {
      if (currentRequestId !== requestIdRef.current) return;
      console.error("Ledger API error:", err);
      setRows([]);
      setApiData(null);
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  };

  // useEffect(() => {
  //   fetchLedger();
  // }, []);

  useEffect(() => {
    fetchLedger();
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      fetchLedger();
    }
  }, [fromDate, toDate]);

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
  // 🔹 helper to safely convert string numbers like "1,234,567" to number

  const apiTotalBalance = useMemo(
    () => showIfNonZero(apiData?.Balance),
    [apiData],
  );

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

        const numericKeys = [
          "debit",
          "credit",
          "balance",
          "titmqnt",
          "tsalrat",
        ];
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
    () =>
      filteredData.reduce((sum, row) => {
        const value = parseFloat(row.debit ?? 0);
        return sum + (isNaN(value) ? 0 : value);
      }, 0),
    [filteredData],
  );

  const totalCredit = useMemo(
    () =>
      filteredData.reduce((sum, row) => {
        const value = parseFloat(row.credit ?? 0);
        return sum + (isNaN(value) ? 0 : value);
      }, 0),
    [filteredData],
  );

  // const totalBalance = useMemo(
  //   () =>
  //     filteredData.reduce((sum, row) => {
  //       const value = parseFloat(row.balance ?? 0);
  //       return sum + (isNaN(value) ? 0 : value);
  //     }, 0),
  //   [filteredData],
  // );

  const totalQty = useMemo(
    () =>
      filteredData.reduce((sum, row) => {
        const value = toNumber(row.titmqnt);
        return sum + value;
      }, 0),
    [filteredData],
  );

  const stats = useMemo(() => {
    if (!apiData) return [];

    return [
      { range: "01-30", amount: apiData.amt001 ?? 0 },
      { range: "31-60", amount: apiData.amt002 ?? 0 },
      { range: "61-90", amount: apiData.amt003 ?? 0 },
      { range: "91-120", amount: apiData.amt004 ?? 0 },
      { range: "121-150", amount: apiData.amt005 ?? 0 },
      { range: "150+", amount: apiData.amt006 ?? 0 },
    ];
  }, [apiData]);

  const exportPDFHandler = () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  const rowHeight = 5;
  const headerHeight = 6;
  const startY = 30;
  const maxY = 280;

  let y = startY;

  // ===== TITLE =====
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(16);
  doc.text(COMPANY_NAME, pageWidth / 2, 12, { align: "center" });

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Customer Ledger (${toDate})`, pageWidth / 2, 20, {
    align: "center",
  });

  doc.setFontSize(10);
  // doc.text(`Account: ${headerName}`, 10, 26);

  // ===== COLUMNS =====
  const pdfColumns = columnsConfig.filter(
    (c) => c.key !== "scrollSpacer"
  );

  const keys = pdfColumns.map((c) => c.key);
  const headers = pdfColumns.map((c) => c.header);
  const colWidths = pdfColumns.map((c) => c.pdfWidth);

  const tableWidth = colWidths.reduce((a, b) => a + b, 0);
  const startX = (pageWidth - tableWidth) / 2;

  // ===== HEADER (NO COLOR) =====
  let curX = startX;

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(9);

  headers.forEach((h, i) => {
    const w = colWidths[i];
    doc.rect(curX, y, w, headerHeight);
    doc.text(h, curX + w / 2, y + headerHeight - 2, { align: "center" });
    curX += w;
  });

  y += headerHeight;

  // ===== PAGE BREAK =====
  const checkPageBreak = () => {
    if (y + rowHeight > maxY) {
      doc.addPage();
      y = startY;

      let curX = startX;
      headers.forEach((h, i) => {
        const w = colWidths[i];
        doc.rect(curX, y, w, headerHeight);
        doc.text(h, curX + w / 2, y + headerHeight - 2, {
          align: "center",
        });
        curX += w;
      });

      y += headerHeight;
    }
  };

  // ===== DATA =====
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);

  filteredData.forEach((row) => {
    checkPageBreak();

    let curX = startX;

    keys.forEach((key, i) => {
      const w = colWidths[i];
      let value = row[key] ?? "";

      if (
        ["debit", "credit", "balance", "titmqnt", "tsalrat"].includes(key)
      ) {
        value = showIfNonZero(value);
      }

      doc.rect(curX, y, w, rowHeight);

      if (
        ["debit", "credit", "balance", "titmqnt", "tsalrat"].includes(key)
      ) {
        doc.text(String(value), curX + w - 2, y + rowHeight - 2, {
          align: "right",
        });
      } else {
        doc.text(String(value), curX + 2, y + rowHeight - 2);
      }

      curX += w;
    });

    y += rowHeight;
  });

  // ===== TOTAL ROW =====
  checkPageBreak();

  let curX2 = startX;
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8);

  keys.forEach((key, i) => {
    const w = colWidths[i];

    let value = "";

    if (i === 0) value = filteredData.length;
    else if (key === "titmqnt") value = showIfNonZero(totalQty);
    else if (key === "debit") value = showIfNonZero(totalDebit);
    else if (key === "credit") value = showIfNonZero(totalCredit);
    else if (key === "balance") value = showIfNonZero(apiData?.Balance);

    doc.rect(curX2, y, w, rowHeight);

    doc.text(String(value), curX2 + w - 2, y + rowHeight - 2, {
      align: "right",
    });

    curX2 += w;
  });

  y += rowHeight + 4;

  // ===== AGING BOX (KEEP BUT CLEAN) =====
  if (apiData) {
    const labels = ["01-30", "31-60", "61-90", "91-120", "121-150", "150+"];
    const values = [
      apiData?.amt001,
      apiData?.amt002,
      apiData?.amt003,
      apiData?.amt004,
      apiData?.amt005,
      apiData?.amt006,
    ];

    const boxWidth = tableWidth / 6;
    let x = startX;

    doc.setFont("Helvetica", "bold");

    labels.forEach((label, i) => {
      doc.rect(x, y, boxWidth, 10);

      doc.text(label, x + boxWidth / 2, y + 3, { align: "center" });

      doc.setFont("Helvetica", "normal");
      doc.text(showIfNonZero(values[i]), x + boxWidth / 2, y + 8, {
        align: "center",
      });

      doc.setFont("Helvetica", "bold");
      x += boxWidth;
    });
  }

  // ===== SAVE =====
  doc.save(`CustomerLedger_${toDate}.pdf`);
};

  // EXCEL EXPORT (Advance style)
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

    worksheet.addRow([reportName]);
    worksheet.mergeCells(2, 1, 2, headers.length);
    worksheet.getRow(2).alignment = { horizontal: "center" };
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
          // if (key === "code") return custCode || "";
          if (
            ["debit", "credit", "balance", "titmqnt", "tsalrat"].includes(key)
          ) {
            return showIfNonZero(item[key] || 0).toLocaleString();
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
    totalRowData[headers.length - 1] = totalCollection.toLocaleString();
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
      totalCollection: apiTotalBalance,
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
          {/* HEADER */}
          {/* <NavComponent textdata={REPORT_NAME} /> */}
          <NavComponent textdata={`${custCode} | ${custName}`} />

          {/* SEARCH + DATE FILTER ROW */}
          <div
            style={{
              height: "auto",
              marginTop: "4px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              padding: "0 12px",
            }}
          >
            {/* LEFT SIDE — DATE FILTERS */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* From Date */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  backgroundColor: "white",
                  borderRadius: "2px",
                  border: "1px solid #dadada",
                  padding: "2px 8px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#555" }}>From</span>
                <input
                  type="date"
                  value={tempFromDate}
                  onChange={(e) => setTempFromDate(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: getdatafontsize,
                    fontFamily: getfontstyle,
                  }}
                />
              </div>

              {/* To Date */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  backgroundColor: "white",
                  borderRadius: "2px",
                  border: "1px solid #dadada",
                  padding: "2px 8px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#555" }}>To</span>
                <input
                  type="date"
                  value={tempToDate}
                  onChange={(e) => setTempToDate(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: getdatafontsize,
                    fontFamily: getfontstyle,
                  }}
                />
              </div>
            </div>

            {/* RIGHT SIDE — SEARCH BAR */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  minWidth: "220px",
                  maxWidth: "260px",
                  border: "1px solid #dadada",
                  borderRadius: "2px",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  padding: "2px 8px",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MagnifyingGlassIcon
                    className="text-gray-500"
                    style={{ width: "16px", height: "16px" }}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    paddingLeft: "6px",
                    fontSize: getdatafontsize,
                    fontFamily: getfontstyle,
                  }}
                />
              </div>
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
            className="table-scroll ledger-table-scroll"
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
                    {!isLoading && filteredData.length === 0 && (
                      <tr>
                        <td
                          colSpan={columnsConfig.length}
                          className="text-center"
                          style={{ padding: "12px", color: "#888" }}
                        >
                          No data found for selected date range
                        </td>
                      </tr>
                    )}
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
                          } else if (key === "code") {
                            value = custCode || "";
                          } else if (
                            [
                              "debit",
                              "credit",
                              "balance",
                              "titmqnt",
                              "tsalrat",
                            ].includes(key)
                          ) {
                            value = showIfNonZero(
                              item[key] || 0,
                            ).toLocaleString();
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
                      length: Math.max(0, 20 - filteredData.length),
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

                {/* TOTAL ROW — INSIDE TABLE */}
                <tr
                  style={{
                    backgroundColor: getnavbarbackgroundcolor,
                    color: "white",
                    fontWeight: "bold",
                    position: "sticky",
                    bottom: 0,
                    zIndex: 1,
                    borderTop: "2px solid #555",
                    borderBottom: "2px solid #555",
                  }}
                >
                  {columnsConfig.map((column, index) => {
                    const baseStyle = {
                      width: column.uiWidth,
                      padding: "8px 6px",
                      borderTop: `2px solid ${softTableStyles.softBorderColor}`,
                    };

                    // spacer
                    if (column.key === "scrollSpacer") {
                      return <td key={index} style={baseStyle} />;
                    }

                    // ROW COUNT
                    if (index === 0) {
                      return (
                        <td key={index} style={baseStyle}>
                          {filteredData.length}
                        </td>
                      );
                    }
                    // ✅ QTY TOTAL
                    if (column.key === "titmqnt") {
                      return (
                        <td key={index} className="text-end" style={baseStyle}>
                          {showIfNonZero(totalQty).toLocaleString()}
                        </td>
                      );
                    }

                    // ✅ DEBIT TOTAL
                    if (column.key === "debit") {
                      return (
                        <td key={index} className="text-end" style={baseStyle}>
                          {showIfNonZero(totalDebit).toLocaleString()}
                        </td>
                      );
                    }

                    // ✅ CREDIT TOTAL
                    if (column.key === "credit") {
                      return (
                        <td key={index} className="text-end" style={baseStyle}>
                          {showIfNonZero(totalCredit).toLocaleString()}
                        </td>
                      );
                    }

                    // BALANCE (API)
                    if (column.key === "balance") {
                      return (
                        <td key={index} className="text-end" style={baseStyle}>
                          {apiTotalBalance.toLocaleString()}
                        </td>
                      );
                    }

                    // EMPTY CELLS
                    return <td key={index} style={baseStyle} />;
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          {/* TOTAL ROW (bottom of table) */}
          {/* <div
            style={{
              borderBottom: `1px solid ${softTableStyles.softBorderColor}`,
              borderTop: `2px solid ${softTableStyles.softBorderColor}`,
              height: "24px",
              display: "flex",
              width: "100%",
            }}
          >
            {columnsConfig.map((column, index) => {
              const isTotalColumn = column.key === "balance";

              const alignmentClass = getAlignmentClass(
                isTotalColumn ? "right" : "left"
              );

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
                    justifyContent: isTotalColumn ? "flex-end" : "flex-start",
                    paddingRight: isTotalColumn ? "5px" : "0px",
                    paddingLeft: isTotalColumn ? "0px" : "5px",
                    fontWeight: "bold",
                    fontSize: getdatafontsize,
                    fontFamily: getfontstyle,
                  }}
                >
                  {column.key === "balance" ? (
                    <span>{totalBalance.toLocaleString()}</span>
                  ) : index === 0 ? (
                    <span>{filteredData.length}</span>
                  ) : column.key === "scrollSpacer" ? (
                    ""
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div> */}

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
                  margin: "5px",
                  marginBottom: "2px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <HorizontalAggingRangeCard stats={stats} />
              </div>
            )}

            <SingleButton
              text="Select"
              onClick={() => {
                setFromDate(tempFromDate);
                setToDate(tempToDate);
              }}
            />

            <SingleButton
              text="PDF"
              onClick={exportPDFHandler}
              onFocus={(e) => (e.currentTarget.style.border = "2px solid red")}
              onBlur={(e) =>
                (e.currentTarget.style.border = `1px solid ${fontcolor}`)
              }
            />
            <SingleButton
              text="Excel"
              onClick={handleCSV}
              onFocus={(e) => (e.currentTarget.style.border = "2px solid red")}
              onBlur={(e) =>
                (e.currentTarget.style.border = `1px solid ${fontcolor}`)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
