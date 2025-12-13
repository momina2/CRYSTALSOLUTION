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

const REPORT_NAME = "Customer Ledger";
const COMPANY_NAME = "CRYSTAL SOLUTIONS";

function useQueryParams() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const columnsConfig = [
  {
    header: "Code",
    key: "code",
    alignment: "left",
    uiWidth: 80,
    pdfWidth: 16,
    excelWidth: 15,
  },
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
    alignment: "left",
    uiWidth: 70,
    pdfWidth: 14,
    excelWidth: 15,
  },
  {
    header: "Trn#",
    key: "ttrnnum",
    alignment: "left",
    uiWidth: 80,
    pdfWidth: 16,
    excelWidth: 15,
  },
  {
    header: "Description",
    key: "ttrndsc",
    alignment: "left",
    uiWidth: 160,
    pdfWidth: 65,
    excelWidth: 40,
  },
  {
    header: "Qty",
    key: "titmqnt",
    alignment: "right",
    uiWidth: 80,
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
    uiWidth: 80,
    pdfWidth: 16,
    excelWidth: 18,
  },
  {
    header: "Credit",
    key: "credit",
    alignment: "right",
    uiWidth: 80,
    pdfWidth: 16,
    excelWidth: 18,
  },
  {
    header: "Balance",
    key: "balance",
    alignment: "right",
    uiWidth: 80,
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
      width: "60%",
      backgroundColor: "white",
      border: "1px solid #dadada",
      borderRadius: "6px",
      padding: "4px",
      marginBottom: "6px",
    }}
  >
    <div
      style={{
        display: "flex",
        textAlign: "center",
        paddingTop: "2px",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            padding: "4px 2px",
            borderRight: i !== stats.length - 1 ? "1px solid #dadada" : "none", // vertical grid
          }}
        >
          <p
            style={{
              marginBottom: "4px",
              fontSize: "12px",
              borderBottom: "1px solid #dadada", // horizontal grid
              paddingBottom: "2px",
            }}
          >
            {s.range}
          </p>

          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#3f379b",
            }}
          >
            {Number(s.amount || 0).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default function AmericanCustomerLedger() {
  const query = useQueryParams();
  const custCode = query.get("code");
  const custName = query.get("name");

  const [headerCode] = useState(custCode);
  const [headerName] = useState(custName);

  const [rows, setRows] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // date filters (option 1: default = 1st of month to today)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const defaultToDate = `${yyyy}-${mm}-${dd}`;
  const defaultFromDate = `${yyyy}-01-01`;

  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);

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
    left: isSidebarVisible ? "50%" : "50%",
    transform: "translate(-50%, -50%)",
    transition: "left 0.3s ease-in-out, width 0.3s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowX: "hidden",
    overflowY: "auto",
    wordBreak: "break-word",
    textAlign: "center",
    maxWidth: "95vw",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "23px",
    fontFamily: '"Poppins", sans-serif',
  };

  // helpers
  const toApiDate = (input) => {
    if (!input) return "";
    const [y, m, d] = input.split("-");
    return `${d}-${m}-${y}`;
  };

  const fetchLedger = async () => {
    try {
      setIsLoading(true);

      const form = new FormData();
      form.append("code", "AMRELEC");
      form.append("FIntDat", toApiDate(fromDate));
      form.append("FFnlDat", toApiDate(toDate));
      form.append("FAccCod", custCode);

      const res = await axios.post(
        "https://crystalsolutions.com.pk/api/AmericanCustomerLedger.php",
        form
      );

      setApiData(res.data || null);

      const finalRows = (res.data?.Header || []).map((r) => ({
        ...r,
        code: custCode,
      }));

      setRows(finalRows);
    } catch (err) {
      console.error("Ledger API error:", err);
      setRows([]);
      setApiData(null);
    } finally {
      setIsLoading(false);
    }
  };

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
          v !== null && v !== undefined ? String(v).toLowerCase() : ""
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
    [filteredData]
  );

  const totalCredit = useMemo(
    () =>
      filteredData.reduce((sum, row) => {
        const value = parseFloat(row.credit ?? 0);
        return sum + (isNaN(value) ? 0 : value);
      }, 0),
    [filteredData]
  );

  const totalBalance = useMemo(
    () =>
      filteredData.reduce((sum, row) => {
        const value = parseFloat(row.balance ?? 0);
        return sum + (isNaN(value) ? 0 : value);
      }, 0),
    [filteredData]
  );

  const stats = apiData
    ? [
        { range: "01-30", amount: apiData.amt001 ?? apiData.Amt001 ?? 0 },
        { range: "31-60", amount: apiData.amt002 ?? apiData.Amt002 ?? 0 },
        { range: "61-90", amount: apiData.amt003 ?? apiData.Amt003 ?? 0 },
        { range: "91-120", amount: apiData.amt004 ?? apiData.Amt004 ?? 0 },
        { range: "121-150", amount: apiData.amt005 ?? apiData.Amt005 ?? 0 },
        { range: "150+", amount: apiData.amt006 ?? apiData.Amt006 ?? 0 },
      ]
    : [];

  // PDF EXPORT (simple)
  // const exportPDFHandler = () => {
  //   const doc = new jsPDF({ orientation: "portrait" });

  //   doc.setFontSize(15);
  //   doc.text(COMPANY_NAME, 105, 12, { align: "center" });
  //   doc.text(REPORT_NAME, 105, 20, { align: "center" });
  //   doc.text(`Customer: ${custCode || ""}`, 10, 12);
  //   doc.text(`From: ${toApiDate(fromDate)}  To: ${toApiDate(toDate)}`, 10, 18);
  //   doc.setFontSize(9);

  //   let y = 30;
  //   const pdfCols = columnsConfig.filter((c) => c.key !== "scrollSpacer");
  //   const headers = pdfCols.map((c) => c.header);

  //   headers.forEach((h, i) => {
  //     doc.text(h, 10 + i * 22, y);
  //   });

  //   y += 6;
  //   filteredData.forEach((r) => {
  //     const row = pdfCols.map((c) => {
  //       const key = c.key;
  //       if (key === "code") return custCode || "";
  //       if (
  //         ["debit", "credit", "balance", "titmqnt", "tsalrat"].includes(key)
  //       ) {
  //         return Number(r[key] || 0).toLocaleString();
  //       }
  //       return r[key] ?? "";
  //     });

  //     row.forEach((val, i) => {
  //       doc.text(String(val), 10 + i * 22, y);
  //     });
  //     y += 6;
  //     if (y > 280) {
  //       doc.addPage();
  //       y = 30;
  //     }
  //   });

  //   doc.save(`${REPORT_NAME}_${custCode || ""}.pdf`);
  // };

  const exportPDFHandler = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // ===== CONFIG =====
    const pageWidth = 210;
    const rowHeight = 6;
    const headerHeight = 8;
    const maxY = 280;

    // ===== TITLE =====
    const drawTitle = () => {
      // ===== MAIN TITLE =====
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(20);
      doc.text("CRYSTAL SOLUTIONS", pageWidth / 2, 16, { align: "center" });

      // ===== REPORT NAME =====
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(13);
      doc.text(REPORT_NAME, pageWidth / 2, 24, { align: "center" });

      // ===== META INFO (LEFT) =====
      doc.setFontSize(9);
      doc.text(`Customer: ${headerCode || ""} | ${headerName || ""}`, 10, 30);
      doc.text(
        `From: ${toApiDate(fromDate)}   To: ${toApiDate(toDate)}`,
        10,
        35
      );
    };

    // ===== COLUMNS =====
    const pdfColumns = columnsConfig.filter((c) => c.key !== "scrollSpacer");
    const keys = pdfColumns.map((c) => c.key);
    const headers = pdfColumns.map((c) => c.header);
    const colWidths = pdfColumns.map((c) => c.pdfWidth);

    const tableWidth = colWidths.reduce((a, b) => a + b, 0);
    const startX = (pageWidth - tableWidth) / 2;
    let y = 42;

    // ===== TABLE HEADER =====
    const drawHeader = () => {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);

      let x = startX;
      headers.forEach((h, i) => {
        const w = colWidths[i];
        doc.setFillColor(220);
        doc.rect(x, y, w, headerHeight, "F");
        doc.rect(x, y, w, headerHeight);
        doc.text(h, x + w / 2, y + 5.5, { align: "center" });
        x += w;
      });

      y += headerHeight;
    };

    // ===== ROW =====
    const drawRow = (row, isTotal = false) => {
      let x = startX;
      doc.setFont("Helvetica", isTotal ? "bold" : "normal");
      doc.setFontSize(7);

      row.forEach((cell, i) => {
        const w = colWidths[i];
        const key = keys[i];
        doc.rect(x, y, w, rowHeight);

        // 🔹 Numeric columns → right aligned
        if (
          ["debit", "credit", "balance", "titmqnt", "tsalrat"].includes(key)
        ) {
          doc.text(String(cell), x + w - 2, y + 4.5, { align: "right" });
        }

        // 🔹 Description column → trimmed to avoid overflow
        else if (key === "ttrndsc") {
          const safeText =
            String(cell || "").length > 45
              ? String(cell).substring(0, 45) + "…"
              : String(cell || "");

          doc.text(safeText, x + 2, y + 4.5);
        }

        // 🔹 Normal text
        else {
          doc.text(String(cell || ""), x + 2, y + 4.5);
        }

        x += w;
      });

      y += rowHeight;
    };

    // ===== PAGE BREAK =====
    const checkPageBreak = () => {
      if (y > maxY) {
        doc.addPage();
        drawTitle();
        y = 32;
        drawHeader();
      }
    };

    // ===== START =====
    drawTitle();
    drawHeader();

    const bodyRows = filteredData.map((r) =>
      keys.map((k) => {
        if (k === "code") return headerCode || "";
        if (["debit", "credit", "balance", "titmqnt", "tsalrat"].includes(k)) {
          return Number(r[k] || 0).toLocaleString();
        }
        return r[k] ?? "";
      })
    );

    // ===== TOTAL ROW =====
    const totalRow = new Array(keys.length).fill("");
    totalRow[0] = filteredData.length.toString();
    totalRow[keys.indexOf("debit")] = totalDebit.toLocaleString();
    totalRow[keys.indexOf("credit")] = totalCredit.toLocaleString();
    totalRow[keys.indexOf("balance")] = totalBalance.toLocaleString();

    [...bodyRows, totalRow].forEach((row, idx, arr) => {
      checkPageBreak();
      drawRow(row, idx === arr.length - 1);
    });

    // ===== AGING CARD (PDF) =====
    if (apiData && stats.length) {
      y += 10;

      const boxWidth = 28;
      const boxHeight = 14;
      const gap = 2;
      const totalBoxWidth = stats.length * boxWidth + (stats.length - 1) * gap;
      let x = (pageWidth - totalBoxWidth) / 2;

      doc.setFontSize(8);

      stats.forEach((stat) => {
        doc.rect(x, y, boxWidth, boxHeight);

        doc.text(stat.range, x + boxWidth / 2, y + 5, {
          align: "center",
        });

        doc.setFont("Helvetica", "bold");
        doc.text(
          Number(stat.amount || 0).toLocaleString(),
          x + boxWidth / 2,
          y + 11,
          { align: "center" }
        );

        doc.setFont("Helvetica", "normal");
        x += boxWidth + gap;
      });
    }

    // ===== SAVE =====
    doc.save(`${REPORT_NAME}_${headerCode || ""}.pdf`);
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
          if (key === "code") return custCode || "";
          if (
            ["debit", "credit", "balance", "titmqnt", "tsalrat"].includes(key)
          ) {
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
          {/* HEADER */}
          {/* <NavComponent textdata={REPORT_NAME} /> */}
          <NavComponent textdata={`${headerCode} | ${headerName}`} />

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
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
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
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
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
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
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
                        style={{
                          color: fontcolor,
                          backgroundColor: i % 2 === 0 ? getcolor : "#f8f9ff",
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
                            value = Number(item[key] || 0).toLocaleString();
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
                      length: Math.max(0, 27 - filteredData.length),
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

          {/* TOTAL ROW (bottom of table) */}
          <div
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
                  width: "100%",
                  display: "flex",
                  justifyContent: "center", // horizontally center
                  alignItems: "center", // vertically align if height grows
                }}
              >
                <HorizontalAggingRangeCard stats={stats} />
              </div>
            )}
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
