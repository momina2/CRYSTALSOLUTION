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
import { FaClipboardList, FaFileInvoiceDollar } from "react-icons/fa";

const REPORT_NAME = "Customer Agging";
const COMPANY_NAME = "American Electronics";

const baseColumns = [
  {
    header: "Lgr",
    key: "ledgerBtn",
    alignment: "center",
    uiWidth: 50,
  },
  {
    header: "P.R",
    key: "progressBtn",
    alignment: "center",
    uiWidth: 50,
  },
  {
    header: "Code",
    key: "Code",
    alignment: "center",
    uiWidth: 90,
  },
  {
    header: "Customer",
    key: "Customer",
    alignment: "left",
    uiWidth: 340,
  },

  // 🔥 AGGING COLUMNS (ADD THESE)
  {
    key: "Amt001",
    alignment: "right",
    uiWidth: 120,
  },
  {
    key: "Amt002",
    alignment: "right",
    uiWidth: 120,
  },
  {
    key: "Amt003",
    alignment: "right",
    uiWidth: 120,
  },
  {
    key: "Amt004",
    alignment: "right",
    uiWidth: 120,
  },
  {
    key: "Amt005",
    alignment: "right",
    uiWidth: 120,
  },
  {
    key: "Amt006",
    alignment: "right",
    uiWidth: 120,
  },

  {
    header: "Total",
    key: "Total",
    alignment: "right",
    uiWidth: 100,
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
const showIfNonZero = (val) => {
  const num = Number((val ?? "0").toString().replace(/,/g, ""));
  if (!num) return "";
  return num.toLocaleString();
};

export default function AmericanAdminAgging() {
  const getRangeLabel = (index) => {
    const ranges = ["0-30", "31-60", "61-90", "91-120", "121-150", "151+"];
    return ranges[index] || "";
  };
  const query = useQueryParams();

  // ✅ FIRST declare state

  const NumDays = query.get("min") || "1";
  const getStartDay = (num) => {
    const map = {
      1: 0,
      2: 31,
      3: 61,
      4: 91,
      5: 121,
      6: 151,
    };
    return map[num] || 0;
  };

  // const [FRepDay, setFRepDay] = useState(NumDays);

  // ✅ THEN useMemo
  const columnsConfig = useMemo(() => {
    return baseColumns.map((col) => {
      if (col.key.startsWith("Amt")) {
        const index = parseInt(col.key.replace("Amt00", "")) - 1;

        return {
          ...col,
          header: getRangeLabel(index), // ✅ correct ranges
        };
      }
      return col;
    });
  }, []);
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [FRepDay, setFRepDay] = useState(query.get("days") || "30");

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

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

  // useEffect(() => {
  //   setFRepDay(query.get("days") || "30");
  // }, [query]);
  // const FRepDay = query.get("days") || "30";
// const NumDays = query.get("min") || "1";
  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const form = new FormData();
      form.append("code", "AMRELEC");
      form.append("FRepDat", toApiDate(RepDate));
      form.append("FDayNum", NumDays); // ✅ correct

      form.append("FRepDay", FRepDay || "0");

      const res = await axios.post(
        "https://crystalsolutions.pk/api/AmericanAdminAgging.php",
        form,
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
  useEffect(() => {
    if (FRepDay) {
      fetchData();
    }
  }, [FRepDay, NumDays, RepDate]);

  const exportPDFHandler = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();

    const rowHeight = 6;
    const headerHeight = 7;
    const startY = 25;
    const maxY = 190;

    let y = startY;

    // ===== TITLE =====
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text(COMPANY_NAME, pageWidth / 2, 10, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(REPORT_NAME, pageWidth / 2, 17, { align: "center" });

    // ===== COLUMNS =====
    const pdfColumns = columnsConfig.filter(
      (c) => !["scrollSpacer", "ledgerBtn", "progressBtn"].includes(c.key),
    );

    const keys = pdfColumns.map((c) => c.key);
    const headers = pdfColumns.map((c) => c.header);
    const colWidths = pdfColumns.map((c) => c.pdfWidth);

    const tableWidth = colWidths.reduce((a, b) => a + b, 0);
    const startX = (pageWidth - tableWidth) / 2;

    // ===== HEADER (NO COLOR - SIMPLE) =====
    let curX = startX;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);

    headers.forEach((h, i) => {
      const w = colWidths[i];

      doc.rect(curX, y, w, headerHeight); // simple border
      doc.text(h, curX + w / 2, y + headerHeight - 2, { align: "center" });

      curX += w;
    });

    y += headerHeight;

    // ===== PAGE BREAK =====
    const checkPageBreak = () => {
      if (y + rowHeight > maxY) {
        doc.addPage();
        y = startY;

        // redraw header
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

    // ===== DATA ROWS =====
    doc.setFont("Helvetica", "normal");

    sortedTableData.forEach((row) => {
      checkPageBreak();

      let curX = startX;

      keys.forEach((key, i) => {
        const w = colWidths[i];
        const value = row[key] ?? "";

        doc.rect(curX, y, w, rowHeight);

        if (
          [
            "Amt001",
            "Amt002",
            "Amt003",
            "Amt004",
            "Amt005",
            "Amt006",
            "Total",
          ].includes(key)
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

    keys.forEach((key, i) => {
      const w = colWidths[i];

      let value = "";

      if (key === "Code") value = sortedTableData.length;
      else if (runtimeColumnTotals[key]) value = runtimeColumnTotals[key];

      doc.rect(curX2, y, w, rowHeight);

      doc.text(String(value), curX2 + w - 2, y + rowHeight - 2, {
        align: "right",
      });

      curX2 += w;
    });

    // ===== SAVE =====
    doc.save(`${REPORT_NAME}.pdf`);
  };

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
      `${reportName}.xlsx`,
    );
  }

  // ----------- WIDTH / TABLE SIZE -----------
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
          row.Total?.toLowerCase().includes(q),
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
          return sortConfig.direction === "ascending"
            ? Number(valueA) - Number(valueB)
            : Number(valueB) - Number(valueA);
        }

        return sortConfig.direction === "ascending"
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

  const runtimeColumnTotals = useMemo(() => {
    const totals = {
      Amt001: 0,
      Amt002: 0,
      Amt003: 0,
      Amt004: 0,
      Amt005: 0,
      Amt006: 0,
      Total: 0,
    };

    sortedTableData.forEach((row) => {
      Object.keys(totals).forEach((key) => {
        const val = Number((row[key] || "0").toString().replace(/,/g, ""));
        totals[key] += isNaN(val) ? 0 : val;
      });
    });

    return totals;
  }, [sortedTableData]);

  const handleCSV = () => {
    exportCSV({
      rows: sortedTableData,
      columnsConfig,
      columnTotals,
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
            width: "max-content",     
            minWidth: "100%",        
            // width: "100%",
            tableLayout: "fixed",
          }

          .table-scroll {
            overflow-y: auto;
            overflow-x: hidden;
            -ms-overflow-style: auto;
            scrollbar-width: auto;
            height: "400px" 
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px",
              width: "100%",
            }}
          >
            {/* LEFT SIDE */}
            {/* <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: getdatafontsize }}>Days :</span>
              <input
                type="text"
                value={`${getStartDay(Number(NumDays))}-${FRepDay === "999999" ? "+" : FRepDay}`}
                readOnly
              />
            </div> */}

            {/* RIGHT SIDE */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "auto", // 🔥 pushes to right
                border: `1px solid ${softTableStyles.softBorderColor}`,
                backgroundColor: "#fff",
                padding: "0 6px",
                height: "28px",
                width: "220px", // 🔥 fixed width
              }}
            >
              <MagnifyingGlassIcon
                style={{ width: "14px", marginRight: "4px" }}
              />

              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: getdatafontsize,
                  fontFamily: getfontstyle,
                }}
              />
            </div>
          </div>
          <div
            className="table-scroll"
            style={{
              maxHeight: "60vh",
              overflowY: "auto",
              width: "100%",
            }}
          >
            <table
              className="myTable"
              style={{
                width: tableWidth, // ✅ important
                minWidth: tableWidth, // ✅ important
                tableLayout: "fixed", // ✅ important
                borderCollapse: "collapse",
                fontSize: getdatafontsize,
                fontFamily: getfontstyle,
              }}
            >
              {/* HEADER */}
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: getnavbarbackgroundcolor,
                  color: "white",
                  zIndex: 2,
                }}
              >
                <tr>
                  {columnsConfig.map((column, index) => (
                    <th
                      key={index}
                      onClick={() => requestSort(column.key)}
                      style={{
                        width: column.uiWidth,
                        padding: "2px 4px",
                        borderRight: `1px solid ${softTableStyles.softBorderColor}`,
                        borderBottom: `2px solid ${softTableStyles.softBorderColor}`,
                        backgroundColor: getnavbarbackgroundcolor,
                        color: "white",
                        fontWeight: "600",
                        height: "22px",
                      }}
                    >
                      <div className="sortable-header">
                        {column.header}
                        {getSortIcon(column.key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {sortedTableData.map((item, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedRowIndex(i)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedRowIndex === i
                          ? getnavbarbackgroundcolor
                          : "white",
                      color: selectedRowIndex === i ? "white" : "black",
                      transition: "0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedRowIndex !== i) {
                        e.currentTarget.style.backgroundColor = "#f5f7fa";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedRowIndex !== i) {
                        e.currentTarget.style.backgroundColor = "white";
                      }
                    }}
                  >
                    {columnsConfig.map((column, index) => (
                      <td
                        key={`total-${index}`}
                        className={getAlignmentClass(column.alignment)}
                        style={{
                          width: column.uiWidth,
                          whiteSpace: "nowrap",
                          padding: "8px 6px", // ✅ same as body
                          borderRight: `1px solid ${softTableStyles.softBorderColor}`,
                          borderTop: `2px solid ${softTableStyles.softBorderColor}`,
                        }}
                      >
                        {column.key === "progressBtn" ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <FaClipboardList
                              size={20}
                              style={{ cursor: "pointer", color: "#17a2b8" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  `${window.location.origin}/crystalsol/AmericanProgressReportDashboard?code=${item.Code}&name=${encodeURIComponent(item.Customer)}`,
                                  "_blank",
                                );
                              }}
                            />
                          </div>
                        ) : column.key === "ledgerBtn" ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <FaFileInvoiceDollar
                              size={20}
                              style={{ cursor: "pointer", color: "#28a745" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  `${window.location.origin}/crystalsol/AmericanCustomerLedgerDashboard?code=${item.Code}&name=${encodeURIComponent(item.Customer)}`,
                                  "_blank",
                                );
                              }}
                            />
                          </div>
                        ) : (
                          item[column.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr
                  style={{
                    backgroundColor: getnavbarbackgroundcolor,
                    color: "white",
                    fontWeight: "bold",
                    position: "sticky",
                    bottom: 0,
                  }}
                >
                  {columnsConfig.map((column, index) => {
                    const key = column.key;

                    let value = "";

                    if (key === "Code") {
                      value = sortedTableData.length;
                    } else if (runtimeColumnTotals[key]) {
                      value = runtimeColumnTotals[key].toLocaleString();
                    }

                    return (
                      <td
                        key={`total-${index}`}
                        className={getAlignmentClass(column.alignment)}
                        style={{
                          width: column.uiWidth,
                          padding: "6px",
                          borderTop: `2px solid ${softTableStyles.softBorderColor}`,
                        }}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          {/* ACTION BUTTONS – Only PDF & Excel */}
          <div
            style={{
              margin: "5px",
              marginBottom: "2px",
            }}
          >
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
