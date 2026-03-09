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

const REPORT_NAME = "Customer Balance by Range";
const COMPANY_NAME = "CRYSTAL SOLUTIONS";

const columnsConfig = [
  {
    header: "Lgr",
    key: "ledgerBtn",
    alignment: "center",
    uiWidth: 50,
    pdfWidth: 0,
    excelWidth: 0,
  },
  {
    header: "P.R",
    key: "progressBtn",
    alignment: "center",
    uiWidth: 50,
    pdfWidth: 0,
    excelWidth: 0,
  },
  {
    header: "Code",
    key: "tacccod",
    alignment: "left",
    uiWidth: 80,
    pdfWidth: 20,
    excelWidth: 15,
  },
  {
    header: "Name",
    key: "tcstdsc",
    alignment: "left",
    uiWidth: 360,
    pdfWidth: 80,
    excelWidth: 40,
  },
  // {
  //   header: "Salesman",
  //   key: "SalesMan",
  //   alignment: "left",
  //   uiWidth: 200,
  //   pdfWidth: 35,
  //   excelWidth: 30,
  // },
  {
    header: "Mobile",
    key: "tmobnum",
    alignment: "left",
    uiWidth: 110,
    pdfWidth: 25,
    excelWidth: 20,
  },

  {
    header: "Balance",
    key: "Balance",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 25,
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
function useQueryParams() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function CustomerBalance() {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const nonSortableKeys = ["ledgerBtn", "progressBtn", "scrollSpacer"];

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const query = useQueryParams();

  const minParam = query.get("min") || "-99999999";
  const maxParam = query.get("max") || "99999999";
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

  // ----------- FETCH API (same as pehle) -----------
  // === API CALL =====
  useEffect(() => {
    fetchData();
  }, [minParam, maxParam]);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const form = new FormData();
      form.append("code", "AMRELEC");
      form.append("FIntAmt", minParam);
      form.append("FFnlAmt", maxParam);

      const res = await axios.post(
        "https://crystalsolutions.pk/api/AmericanCustomerBalance.php",
        form,
      );

      let dataRows = [];

      if (Array.isArray(res.data)) {
        dataRows = res.data;
      } else if (Array.isArray(res.data.Detail)) {
        dataRows = res.data.Detail;
      }

      const mapped = dataRows.map((row) => ({
        ...row,
      }));

      setRows(mapped);
      setErrorMessage("");
    } catch (err) {
      console.error("API error:", err);
      setErrorMessage("Unable to retrieve data. Please try again.");
      setRows([]);
    }

    setIsLoading(false);
  };

  const exportPDFHandler = () => {
    const doc = new jsPDF({ orientation: "portrait" });

    // -------- PDF CONFIG ----------
    const topMargin = 16; // top space for header
    const rowHeight = 5; // normal row height
    const headerHeight = 8; // table header height
    const maxRowY = 280; // printable area before adding new page

    // ------- TITLE --------
    function drawTitle() {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(20);
      doc.text("CRYSTAL SOLUTIONS", 105, 16, { align: "center" });

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(13);
      doc.text(REPORT_NAME, 105, 24, { align: "center" });
    }

    // --------- TABLE HEADER ---------
    const pdfColumns = columnsConfig.filter(
      (c) => !["ledgerBtn", "progressBtn", "scrollSpacer"].includes(c.key),
    );

    const keys = pdfColumns.map((c) => c.key);
    const headers = pdfColumns.map((c) => c.header);
    const colWidths = pdfColumns.map((c) => c.pdfWidth);

    const tableWidth = colWidths.reduce((a, b) => a + b, 0);
    const startX = (210 - tableWidth) / 2; // page width 210mm
    let y = 32;

    function drawHeader() {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      let curX = startX;

      headers.forEach((header, i) => {
        let w = colWidths[i];
        doc.setFillColor(220);
        doc.rect(curX, y, w, headerHeight, "F");
        doc.rect(curX, y, w, headerHeight);
        doc.text(String(header), curX + w / 2, y + headerHeight - 3, {
          align: "center",
        });
        curX += w;
      });

      y += headerHeight;
    }

    // ---------- DRAW ONE ROW ----------
    function drawRow(row, isTotal) {
      let curX = startX;

      row.forEach((cell, cIndex) => {
        let w = colWidths[cIndex];
        doc.rect(curX, y, w, rowHeight);

        doc.setFont("Helvetica", isTotal ? "bold" : "normal");
        doc.setFontSize(8);

        if (cIndex === colWidths.length - 1) {
          doc.text(String(cell), curX + w - 2, y + rowHeight - 2, {
            align: "right",
          });
        } else {
          doc.text(String(cell), curX + 2, y + rowHeight - 2);
        }
        curX += w;
      });

      y += rowHeight;
    }

    // ---------- PAGE BREAK HANDLER -----------
    function checkPageBreak() {
      if (y > maxRowY) {
        doc.addPage();
        y = topMargin;
        drawTitle();
        y = 32;
        drawHeader();
      }
    }

    // ---------- START PRINT ----------
    drawTitle();
    y = 32;
    drawHeader();

    const dataRows = sortedTableData.map((row) =>
      keys.map((key) => row[key] ?? ""),
    );
    const totalRow = new Array(keys.length).fill("");
    totalRow[0] = sortedTableData.length.toString();

    totalRow[keys.length - 1] = totalBalance.toLocaleString();
    const rowsPDF = [...dataRows, totalRow];

    rowsPDF.forEach((row, index) => {
      const isTotal = index === rowsPDF.length - 1;
      checkPageBreak();
      drawRow(row, isTotal);
    });

    // ---------- SAVE ----------
    doc.save(`${REPORT_NAME}.pdf`);
  };

  // ======================= EXCEL EXPORT =======================

  async function exportCSV({
    rows,
    columnsConfig,
    totalCollection,
    companyName,
    reportName,
  }) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Report");

    const excelColumns = columnsConfig.filter(
      (c) => !["ledgerBtn", "progressBtn", "scrollSpacer"].includes(c.key),
    );

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
      const row = worksheet.addRow(keys.map((key) => item[key]));
      row.eachCell((cell, index) => {
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
    if (nonSortableKeys.includes(key)) return null; // ❌ no sort icon

    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <FaSortUp style={{ marginLeft: "5px", color: "#e74c3c" }} />
      ) : (
        <FaSortDown style={{ marginLeft: "5px", color: "#e74c3c" }} />
      );
    }

    return (
      <FaSortDown style={{ marginLeft: "5px", color: "white", opacity: 0.4 }} />
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
          row.tacccod?.toLowerCase().includes(q) ||
          row.tcstdsc?.toLowerCase().includes(q) ||
          row.tmobnum?.toLowerCase().includes(q) ||
          row.Balance?.toString().includes(q),
      );
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key] ?? "";
        const bVal = b[sortConfig.key] ?? "";

        // Balance numeric sort
        if (sortConfig.key === "Balance") {
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
          row.tacccod?.toLowerCase().includes(q) ||
          row.tcstdsc?.toLowerCase().includes(q) ||
          row.tmobnum?.toLowerCase().includes(q) ||
          row.Balance?.toString().includes(q)
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
      const value = parseFloat(row.Balance ?? 0);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  }, [sortedTableData]);

  const handleCSV = () => {
    exportCSV({
      rows: sortedTableData,
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
              justifyContent: "flex-end",
              paddingRight: "8px", // table edge se halka gap
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <div
                style={{
                  minWidth: "260px",
                  maxWidth: "400px",
                  border: `1px solid ${softTableStyles.softBorderColor}`,
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
                        nonSortableKeys.includes(column.key)
                          ? null
                          : requestSort(column.key)
                      }
                      style={{
                        cursor: nonSortableKeys.includes(column.key)
                          ? "default"
                          : "pointer",
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
                            {column.key === "scrollSpacer" ? (
                              ""
                            ) : column.key === "Balance" ? (
                              Number(item[column.key] || 0).toLocaleString()
                            ) : column.key === "progressBtn" ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <FaClipboardList
                                  size={20}
                                  style={{
                                    cursor: "pointer",
                                    color: "#17a2b8",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(
                                      `${
                                        window.location.origin
                                      }/crystalsol/AmericanProgressReportDashboard?code=${
                                        item.tacccod
                                      }&name=${encodeURIComponent(
                                        item.tcstdsc,
                                      )}`,
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
                                  style={{
                                    cursor: "pointer",
                                    color: "#28a745",
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(
                                      `${
                                        window.location.origin
                                      }/crystalsol/AmericanCustomerLedgerDashboard?code=${
                                        item.tacccod
                                      }&name=${encodeURIComponent(
                                        item.tcstdsc,
                                      )}`,
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
              borderTop: `2px solid ${softTableStyles.softBorderColor}`,
              height: "24px",
              display: "flex",
              width: "100%",
            }}
          >
            {columnsConfig.map((column, index) => (
              <div
                key={index}
                className={getAlignmentClass(column.alignment)}
                style={{
                  width: column.uiWidth,
                  background: getnavbarbackgroundcolor,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    column.key === "Balance" ? "flex-end" : "flex-start",
                  padding: "0 6px",
                  fontSize: getdatafontsize,
                  fontFamily: getfontstyle,
                }}
              >
                {column.key === "Balance"
                  ? totalBalance.toLocaleString()
                  : column.key === "tacccod"
                    ? sortedTableData.length
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
