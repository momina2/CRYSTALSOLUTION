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

const REPORT_NAME = "Customer Agging";
const COMPANY_NAME = "American Electronics";

const columnsConfig = [
  {
    header: "Code",
    key: "Code",
    alignment: "left",
    uiWidth: 80,
    pdfWidth: 20,
    excelWidth: 15,
  },
  {
    header: "Customer",
    key: "Customer",
    alignment: "left",
    uiWidth: 320,
    pdfWidth: 80,
    excelWidth: 40,
  },
  {
    header: "0-30",
    key: "Amt001",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 20,
    excelWidth: 10,
  },
  {
    header: "30-60",
    key: "Amt002",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 20,
    excelWidth: 10,
  },

  {
    header: "60-90",
    key: "Amt003",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 20,
    excelWidth: 10,
  },
  {
    header: "90-120",
    key: "Amt004",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 20,
    excelWidth: 10,
  },
  {
    // header: "120 ≤ 180",
    header: "120-180",
    key: "Amt005",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 20,
    excelWidth: 10,
  },
  {
    header: "180+",
    key: "Amt006",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 20,
    excelWidth: 10,
  },
  {
    header: "Total",
    key: "Total",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 25,
    excelWidth: 10,
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
function useQueryParams() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function AmericanAdminAgging() {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const query = useQueryParams();

  const NumDays = query.get("min") || "0";
  //   const maxParam = query.get("max") || "99999999";
  const labelParam = query.get("label") || "";

  const [errorMessage, setErrorMessage] = useState("");

  const {
    isSidebarVisible,
    getcolor,
    fontcolor,
    getnavbarbackgroundcolor,
    getfontstyle,
    getdatafontsize,
  } = useTheme();

  // 👉 Single date picker: cusDate (default = today)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const defaultDate = `${yyyy}-${mm}-${dd}`;
  const [RepDate, setRepDate] = useState(defaultDate);
  const [columnTotals, setColumnTotals] = useState({});

  const toApiDate = (input) => {
    if (!input) return "";
    const [y, m, d] = input.split("-");
    return `${y}-${m}-${d}`;
  };

  // ----------- FETCH API (same as pehle) -----------
  // === API CALL =====
  useEffect(() => {
    fetchData();
  }, [NumDays]);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const form = new FormData();
      form.append("code", "AMRELEC");
      form.append("FRepDat", toApiDate(RepDate));
      form.append("FDayNum", NumDays);

      const res = await axios.post(
        "https://crystalsolutions.com.pk/api/AmericanAdminAgging.php",
        form
      );

      let dataRows = [];

      if (Array.isArray(res.data.Detail)) {
        dataRows = res.data.Detail;
      } else if (Array.isArray(res.data)) {
        dataRows = res.data;
      }

      const mapped = dataRows.map((row) => ({
        ...row,
      }));

      setRows(mapped);
      setColumnTotals({
        Amt001: res.data.Amt001,
        Amt002: res.data.Amt002,
        Amt003: res.data.Amt003,
        Amt004: res.data.Amt004,
        Amt005: res.data.Amt005,
        Amt006: res.data.Amt006,
        Total: res.data.Total,
      });
      setErrorMessage("");
    } catch (err) {
      console.error("API error:", err);
      setErrorMessage("Unable to retrieve data. Please try again.");
      setRows([]);
    }

    setIsLoading(false);
  };

  // const exportPDFHandler = () => {
  //   const doc = new jsPDF({ orientation: "portrait" });

  //   // -------- PDF CONFIG ----------
  //   const topMargin = 16; // top space for header
  //   const rowHeight = 5; // normal row height
  //   const headerHeight = 8; // table header height
  //   const maxRowY = 280; // printable area before adding new page

  //   // ------- TITLE --------
  //   function drawTitle() {
  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(20);
  //     doc.text("CRYSTAL SOLUTIONS", 105, 16, { align: "center" });

  //     doc.setFont("Helvetica", "normal");
  //     doc.setFontSize(13);
  //     doc.text(REPORT_NAME, 105, 24, { align: "center" });
  //   }

  //   // --------- TABLE HEADER ---------
  //   const pdfColumns = columnsConfig.filter((c) => c.key !== "scrollSpacer");
  //   const keys = pdfColumns.map((c) => c.key);
  //   const headers = pdfColumns.map((c) => c.header);
  //   const colWidths = pdfColumns.map((c) => c.pdfWidth);

  //   const tableWidth = colWidths.reduce((a, b) => a + b, 0);
  //   const startX = (210 - tableWidth) / 2; // page width 210mm
  //   let y = 32;

  //   function drawHeader() {
  //     doc.setFont("Helvetica", "bold");
  //     doc.setFontSize(9);
  //     let curX = startX;

  //     headers.forEach((header, i) => {
  //       let w = colWidths[i];
  //       doc.setFillColor(220);
  //       doc.rect(curX, y, w, headerHeight, "F");
  //       doc.rect(curX, y, w, headerHeight);
  //       doc.text(String(header), curX + w / 2, y + headerHeight - 3, {
  //         align: "center",
  //       });
  //       curX += w;
  //     });

  //     y += headerHeight;
  //   }

  //   // ---------- DRAW ONE ROW ----------
  //   function drawRow(row, isTotal) {
  //     let curX = startX;

  //     row.forEach((cell, cIndex) => {
  //       let w = colWidths[cIndex];
  //       doc.rect(curX, y, w, rowHeight);

  //       doc.setFont("Helvetica", isTotal ? "bold" : "normal");
  //       doc.setFontSize(8);

  //       if (cIndex === colWidths.length - 1) {
  //         doc.text(String(cell), curX + w - 2, y + rowHeight - 2, {
  //           align: "right",
  //         });
  //       } else {
  //         doc.text(String(cell), curX + 2, y + rowHeight - 2);
  //       }
  //       curX += w;
  //     });

  //     y += rowHeight;
  //   }

  //   // ---------- PAGE BREAK HANDLER -----------
  //   function checkPageBreak() {
  //     if (y > maxRowY) {
  //       doc.addPage();
  //       y = topMargin;
  //       drawTitle();
  //       y = 32;
  //       drawHeader();
  //     }
  //   }

  //   // ---------- START PRINT ----------
  //   drawTitle();
  //   y = 32;
  //   drawHeader();

  //   const dataRows = sortedTableData.map((row) =>
  //     keys.map((key) => row[key] ?? "")
  //   );
  //   const totalRow = new Array(keys.length).fill("");
  //   totalRow[0] = sortedTableData.length.toString();

  //   totalRow[keys.length - 1] = totalBalance.toLocaleString();
  //   const rowsPDF = [...dataRows, totalRow];

  //   rowsPDF.forEach((row, index) => {
  //     const isTotal = index === rowsPDF.length - 1;
  //     checkPageBreak();
  //     drawRow(row, isTotal);
  //   });

  //   // ---------- SAVE ----------
  //   doc.save(`${REPORT_NAME}.pdf`);
  // };

  const exportPDFHandler = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();

    const topMargin = 16;
    const rowHeight = 5;
    const headerHeight = 8;
    const maxRowY = 190;

    const numericKeys = [
      "Amt001",
      "Amt002",
      "Amt003",
      "Amt004",
      "Amt005",
      "Amt006",
      "Total",
    ];

    function drawTitle() {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.text("CRYSTAL SOLUTIONS", pageWidth / 2, 14, { align: "center" });

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(12);
      doc.text(REPORT_NAME, pageWidth / 2, 22, { align: "center" });
    }

    const pdfColumns = columnsConfig.filter((c) => c.key !== "scrollSpacer");
    const keys = pdfColumns.map((c) => c.key);
    const headers = pdfColumns.map((c) => c.header);
    const colWidths = pdfColumns.map((c) => c.pdfWidth);

    const tableWidth = colWidths.reduce((a, b) => a + b, 0);
    const startX = (pageWidth - tableWidth) / 2;

    let y = 30;

    function drawHeader() {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);

      let curX = startX;
      headers.forEach((h, i) => {
        const w = colWidths[i];
        doc.setFillColor(230);
        doc.rect(curX, y, w, headerHeight, "F");
        doc.rect(curX, y, w, headerHeight);
        doc.text(h, curX + w / 2, y + headerHeight - 3, { align: "center" });
        curX += w;
      });

      y += headerHeight;
    }

    function checkPageBreak() {
      if (y + rowHeight > maxRowY) {
        doc.addPage();
        drawTitle();
        y = 30;
        drawHeader();
      }
    }

    function drawRow(row, isTotal = false) {
      let curX = startX;

      row.forEach((cell, i) => {
        const w = colWidths[i];
        const key = keys[i];

        doc.rect(curX, y, w, rowHeight);
        doc.setFont("Helvetica", isTotal ? "bold" : "normal");
        doc.setFontSize(8);

        if (numericKeys.includes(key)) {
          doc.text(String(cell || ""), curX + w - 2, y + rowHeight - 2, {
            align: "right",
          });
        } else {
          doc.text(String(cell || ""), curX + 2, y + rowHeight - 2);
        }

        curX += w;
      });

      y += rowHeight;
    }

    // ===== START =====
    drawTitle();
    drawHeader();

    sortedTableData.forEach((row) => {
      checkPageBreak();
      drawRow(keys.map((k) => row[k] ?? ""));
    });

    // ===== TOTAL ROW =====
    const totalRow = keys.map((key) => {
      if (key === "Code") return sortedTableData.length.toString();
      if (columnTotals?.[key]) return columnTotals[key];
      return "";
    });

    checkPageBreak();
    drawRow(totalRow, true);

    doc.save(`${REPORT_NAME}.pdf`);
  };

  // ======================= EXCEL EXPORT =======================

  // async function exportCSV({
  //   rows,
  //   columnsConfig,
  //   totalCollection,
  //   companyName,
  //   reportName,
  // }) {
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet("Report");

  //   const excelColumns = columnsConfig.filter((c) => c.key !== "scrollSpacer");

  //   const headers = excelColumns.map((c) => c.header);
  //   const keys = excelColumns.map((c) => c.key);

  //   worksheet.addRow([companyName]);
  //   worksheet.mergeCells(1, 1, 1, headers.length);
  //   worksheet.getRow(1).font = { bold: true, size: 16 };
  //   worksheet.getRow(1).alignment = { horizontal: "center" };

  //   worksheet.addRow([reportName]);
  //   worksheet.mergeCells(2, 1, 2, headers.length);
  //   worksheet.getRow(2).alignment = { horizontal: "center" };
  //   worksheet.addRow([]);

  //   const headerRow = worksheet.addRow(headers);
  //   headerRow.eachCell((cell) => {
  //     cell.font = { bold: true };
  //     cell.alignment = { horizontal: "center" };
  //     cell.border = {
  //       top: { style: "thin" },
  //       left: { style: "thin" },
  //       bottom: { style: "thin" },
  //       right: { style: "thin" },
  //     };
  //   });

  //   rows.forEach((item) => {
  //     const row = worksheet.addRow(keys.map((key) => item[key]));
  //     row.eachCell((cell, index) => {
  //       cell.border = {
  //         top: { style: "thin" },
  //         left: { style: "thin" },
  //         bottom: { style: "thin" },
  //         right: { style: "thin" },
  //       };
  //       cell.alignment = {
  //         horizontal: "left",
  //       };
  //     });
  //   });

  //   const totalRowData = new Array(headers.length).fill("");
  //   totalRowData[0] = rows.length.toString();
  //   totalRowData[headers.length - 1] = totalCollection.toLocaleString();
  //   const totalRow = worksheet.addRow(totalRowData);

  //   totalRow.eachCell((cell) => {
  //     cell.font = { bold: true };
  //     cell.border = {
  //       top: { style: "double" },
  //       left: { style: "thin" },
  //       bottom: { style: "double" },
  //       right: { style: "thin" },
  //     };
  //   });

  //   excelColumns.forEach((col, i) => {
  //     worksheet.getColumn(i + 1).width = col.excelWidth || col.uiWidth || 20;
  //   });

  //   const buffer = await workbook.xlsx.writeBuffer();
  //   saveAs(
  //     new Blob([buffer], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     }),
  //     `${reportName}.xlsx`
  //   );
  // }

  async function exportCSV({
    rows,
    columnsConfig,
    columnTotals, // ⭐ ADD THIS
    companyName,
    reportName,
  }) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    const excelColumns = columnsConfig.filter((c) => c.key !== "scrollSpacer");

    const headers = excelColumns.map((c) => c.header);
    const keys = excelColumns.map((c) => c.key);

    // ===== TITLE =====
    worksheet.addRow([companyName]);
    worksheet.mergeCells(1, 1, 1, headers.length);
    worksheet.getRow(1).font = { bold: true, size: 16 };
    worksheet.getRow(1).alignment = { horizontal: "center" };

    worksheet.addRow([reportName]);
    worksheet.mergeCells(2, 1, 2, headers.length);
    worksheet.getRow(2).alignment = { horizontal: "center" };
    worksheet.addRow([]);

    // ===== HEADER =====
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

    // ===== DATA ROWS =====
    rows.forEach((item) => {
      const row = worksheet.addRow(keys.map((key) => item[key]));
      row.eachCell((cell, index) => {
        const key = keys[index];

        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        cell.alignment = {
          horizontal:
            key && (key.startsWith("Amt") || key === "Total")
              ? "right"
              : "left",
        };
      });
    });

    // ===== TOTAL ROW (COLUMN-WISE) =====
    const totalRowData = keys.map((key) => {
      if (key === "Code") return rows.length.toString();
      if (columnTotals?.[key]) return columnTotals[key];
      return "";
    });

    const totalRow = worksheet.addRow(totalRowData);

    totalRow.eachCell((cell, index) => {
      const key = keys[index];

      cell.font = { bold: true };
      cell.border = {
        top: { style: "double" },
        left: { style: "thin" },
        bottom: { style: "double" },
        right: { style: "thin" },
      };

      cell.alignment = {
        horizontal:
          key && (key.startsWith("Amt") || key === "Total") ? "left" : "right",
      };
    });

    // ===== COLUMN WIDTHS =====
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

  // ----------- WIDTH / TABLE SIZE -----------
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

  // ----------- HELPERS -----------
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
    // Selected column
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

    // Default (unselected)
    return (
      <FaSortDown
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

  // ----------- FILTER + SORT DATA -----------
  const sortedTableData = useMemo(() => {
    let data = [...rows];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (row) =>
          row.Code?.toLowerCase().includes(q) ||
          row.Amt001?.toLowerCase().includes(q) ||
          row.Amt002?.toLowerCase().includes(q) ||
          row.Amt003?.toLowerCase().includes(q) ||
          row.Amt004?.toLowerCase().includes(q) ||
          row.Amt005?.toLowerCase().includes(q) ||
          row.Amt006?.toLowerCase().includes(q) ||
          row.Customer?.toLowerCase().includes(q) ||
          row.Total?.toLowerCase().includes(q)
      );
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key] ?? "";
        const bVal = b[sortConfig.key] ?? "";

        // Balance numeric sort
        if (sortConfig.key === "balance") {
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
  }, [rows, searchQuery, sortConfig]);

  const filteredData = useMemo(() => {
    let data = rows;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter((row) => {
        return (
          row.Code?.toLowerCase().includes(q) ||
          row.Amt001?.toLowerCase().includes(q) ||
          row.Amt002?.toLowerCase().includes(q) ||
          row.Amt003?.toLowerCase().includes(q) ||
          row.Amt004?.toLowerCase().includes(q) ||
          row.Amt005?.toLowerCase().includes(q) ||
          row.Amt006?.toLowerCase().includes(q) ||
          row.Customer?.toLowerCase().includes(q) ||
          row.Total?.toLowerCase().includes(q)
        );
      });
    }

    if (sortConfig.key) {
      data = [...data].sort((a, b) => {
        const valueA = a[sortConfig.key] ?? "";
        const valueB = b[sortConfig.key] ?? "";

        if (!isNaN(valueA) && !isNaN(valueB)) {
          return sortConfig.direction === "asc"
            ? Number(valueA) - Number(valueB)
            : Number(valueB) - Number(valueA);
        }

        return sortConfig.direction === "asc"
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
      });
    }

    return data;
  }, [rows, searchQuery, sortConfig]);

  const totalBalance = useMemo(() => {
    return sortedTableData.reduce((sum, row) => {
      const value = Number((row.Total || "0").toString().replace(/,/g, ""));
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  }, [sortedTableData]);

  const handleCSV = () => {
    exportCSV({
      rows: sortedTableData,
      columnsConfig,
      columnTotals, // ⭐ MUST
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
          {/* NAV HEADER BAR (same look as MemberCollectionReport) */}
          <NavComponent textdata={REPORT_NAME} />

          {/* SEARCH ROW */}
          <div
            className="row"
            style={{
              height: "auto",
              marginTop: "8px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  minWidth: "260px",
                  maxWidth: "400px",
                  border: `1px solid ${softTableStyles.softBorderColor}`,
                  borderRadius: "20px",
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
                      onClick={() => requestSort(column.key)}
                      style={{
                        width: column.uiWidth,
                        padding: "8px 6px",
                        borderBottom: `2px solid ${softTableStyles.softBorderColor}`,
                      }}
                    >
                      <div className="sortable-header">
                        {column.header}
                        {getSortIcon(column.key)}
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
                ...(sortedTableData.length > 0 ? { tableLayout: "fixed" } : {}),
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
                    {sortedTableData.map((item, i) => (
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
                        {columnsConfig.map((column, index) => (
                          <td
                            key={index}
                            className={getAlignmentClass(column.alignment)}
                            style={{
                              width: column.uiWidth,
                              padding: "8px 6px",
                              borderBottom: `1px solid ${softTableStyles.softRowSeparator}`,
                            }}
                          >
                            {column.key === "scrollSpacer"
                              ? "" // ➤ empty column
                              : column.key === "balance"
                              ? Number(item[column.key] || 0).toLocaleString()
                              : item[column.key]}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Blank rows to keep table height nice */}
                    {Array.from({
                      length: Math.max(0, 27 - sortedTableData.length),
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
            {columnsConfig.map((column, index) => (
              <div
                key={`total-col-${index}`}
                className={getAlignmentClass(column.alignment)}
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
                    column.alignment === "right" ? "flex-end" : "flex-start",
                  padding: "0 6px",
                  fontWeight: "bold",
                  fontSize: getdatafontsize,
                  fontFamily: getfontstyle,
                }}
              >
                {/* ⭐ column specific total */}
                {columnTotals[column.key]
                  ? Number(
                      columnTotals[column.key].toString().replace(/,/g, "")
                    ).toLocaleString()
                  : column.key === "Code"
                  ? filteredData.length
                  : ""}
              </div>
            ))}
          </div>

          {/* ACTION BUTTONS – Only PDF & Excel */}
          <div
            style={{
              margin: "5px",
              marginBottom: "2px",
            }}
          >
            {/* <SingleButton
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
            /> */}
            <SingleButton
              text="PDF"
              onClick={(e) => {
                e.preventDefault(); // ✅ STOP SUBMIT
                exportPDFHandler();
              }}
            />

            <SingleButton
              text="Excel"
              onClick={(e) => {
                e.preventDefault(); // ✅ STOP SUBMIT
                handleCSV();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
