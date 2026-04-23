import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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

const REPORT_NAME = "Region Customers Report";
const COMPANY_NAME = "AMERICAN ELECTRONIC";

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
    header: "Prg",
    key: "progressBtn",
    alignment: "center",
    uiWidth: 50,
    pdfWidth: 0,
    excelWidth: 0,
  },

  {
    header: "Code",
    key: "tacccod",
    alignment: "center",
    uiWidth: 120,
    pdfWidth: 20,
    excelWidth: 8,
  },
  {
    header: "Customer",
    key: "tcstdsc",
    alignment: "left",
    uiWidth: 320,
    pdfWidth: 80,
    excelWidth: 20,
  },

  {
    header: "Mobile",
    key: "tmobnum",
    alignment: "center",
    uiWidth: 140,
    pdfWidth: 25,
    excelWidth: 15,
  },
  {
    header: "Contact",
    key: "tcntper",
    alignment: "left",
    uiWidth: 200,
    pdfWidth: 25,
    excelWidth: 15,
  },
  {
    header: "Salesman",
    key: "tsaldsc",
    alignment: "left",
    uiWidth: 180,
    pdfWidth: 25,
    excelWidth: 15,
  },
  {
    header: "Balance",
    key: "Bal",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 25,
    excelWidth: 15,
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
// function useQueryParams() {
//   const { search } = useLocation();
//   return useMemo(() => new URLSearchParams(search), [search]);
// }

export default function AmericanRegionDetailsReport() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  //Totals
  const [apiTotalBalance, setApiTotalBalance] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const CtyCod = params.get("tregcod");
  const CtyName = params.get("name");
  console.log("URL:", location.search);
  console.log("CtyCod:", CtyCod);
  // const query = useQueryParams();
  // const CtyCod = query.get("tregcod");
  // const CtyName = query.get("name");

  const headerCode = CtyCod || "";
  const headerName = CtyName || "";

  const {
    isSidebarVisible,
    getcolor,
    fontcolor,
    getnavbarbackgroundcolor,
    getfontstyle,
    getdatafontsize,
  } = useTheme();

  // === API CALL =====
  const fetchData = async () => {
    try {
      setIsLoading(true);

      const form = new FormData();
      form.append("code", "AMRELEC");
      form.append("FRegCod", CtyCod);

      const res = await axios.post(
        "https://crystalsolutions.pk/api/AmericanRegionCustomers.php",
        form,
      );

      const DetailsList = Array.isArray(res.data)
        ? res.data.map((row) => ({
            tacccod: row.tacccod?.trim(),
            tcstdsc: row.tcstdsc?.trim(),
            tmobnum: row.tmobnum?.trim(),
            tcntper: row.tcntper?.trim(),
            tsaldsc: row.tsaldsc?.trim(),
            Bal: Number(String(row.Balance ?? 0).replace(/,/g, "")),
          }))
        : [];

      setRows(DetailsList);
      const total = DetailsList.reduce((sum, r) => sum + r.Bal, 0);
      setApiTotalBalance(total);
    } catch (err) {
      console.error("Progress API error:", err);
      setRows([]);
      // setApiData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (val) => {
    const num = Number(val);
    if (isNaN(num)) return "0";
    return Math.trunc(num).toLocaleString();
  };

  useEffect(() => {
    if (CtyCod !== null) {
      fetchData();
    }
  }, [CtyCod]);
  const exportPDFHandler = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();

    const rowHeight = 6;
    const headerHeight = 7;
    const startY = 30;
    const maxY = 280;

    let y = startY;

    // ===== TITLE =====
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text(COMPANY_NAME, pageWidth / 2, 12, { align: "center" });

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`${headerCode} | ${headerName}`, pageWidth / 2, 20, {
      align: "center",
    });

    // ===== FILTER COLUMNS (REMOVE RPT + SPACER) =====
    const pdfColumns = columnsConfig.filter(
      (c) => !["scrollSpacer", "rptBtn"].includes(c.key),
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

    sortedTableData.forEach((row) => {
      checkPageBreak();

      let curX = startX;

      keys.forEach((key, i) => {
        const w = colWidths[i];
        let value = row[key] ?? "";

        if (key === "Bal") {
          value = Number(value || 0).toLocaleString();
        }

        doc.rect(curX, y, w, rowHeight);

        if (key === "Bal" || key === "Nos") {
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

    // ===== TOTAL =====
    checkPageBreak();

    let curX2 = startX;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(8);

    keys.forEach((key, i) => {
      const w = colWidths[i];

      let value = "";

      if (key === "tacccod") value = filteredData.length;
      else if (key === "Bal") value = apiTotalBalance.toLocaleString();

      doc.rect(curX2, y, w, rowHeight);

      doc.text(String(value), curX2 + w - 2, y + rowHeight - 2, {
        align: "right",
      });

      curX2 += w;
    });

    // ===== SAVE =====
    doc.save(`${headerCode}_${headerName}.pdf`);
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
    totalRowData[headers.length - 1] = formatNumber(totalCollection);

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
    if (nonSortableKeys.includes(key)) return null; // ❌ no arrows on buttons

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
  const nonSortableKeys = ["ledgerBtn", "progressBtn", "scrollSpacer"];

  // ----------- FILTER + SORT DATA -----------
  const sortedTableData = useMemo(() => {
    let data = [...rows];

    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      data = data.filter(
        (row) =>
          row.tacccod?.toLowerCase().includes(q) ||
          row.tcstdsc?.toLowerCase().includes(q) ||
          row.tmobnum?.includes(q) ||
          // row.Nos?.toString().includes(q) ||
          row.Bal?.toString().includes(q), // ✅ BALANCE
      );
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key] ?? "";
        const bVal = b[sortConfig.key] ?? "";

        // Balance numeric sort
        if (sortConfig.key === "Bal") {
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
    if (!searchQuery) return sortedTableData;

    const q = searchQuery.toLowerCase().trim();

    return sortedTableData.filter((row) => {
      return (
        row.tacccod?.toLowerCase().includes(q) ||
        row.tcstdsc?.toLowerCase().includes(q) ||
        row.tmobnum?.includes(q) ||
        row.tcntper?.toLowerCase().includes(q) ||
        row.tsaldsc?.toLowerCase().includes(q)
      );
    });
  }, [sortedTableData, searchQuery]);

  // const totalBalance = useMemo(() => {
  //   return sortedTableData.reduce((sum, row) => {
  //     return sum + (row.Bal || 0);
  //   }, 0);
  // }, [sortedTableData]);
  const totalBalance = useMemo(() => {
    return filteredData.reduce((sum, row) => {
      return sum + (row.Bal || 0);
    }, 0);
  }, [filteredData]);
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
          <NavComponent textdata={`${headerCode} | ${headerName}`} />

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
                        ) : column.key === "Bal" ? (
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
                              style={{ cursor: "pointer", color: "#17a2b8" }}
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  `${window.location.origin}/crystalsol/AmericanProgressReportDashboard?code=${item.tacccod}&name=${encodeURIComponent(item.tcstdsc)}`,
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
                                  `${window.location.origin}/crystalsol/AmericanCustomerLedgerDashboard?code=${item.tacccod}&name=${encodeURIComponent(item.tcstdsc)}`,
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

                {Array.from({ length: 25 - filteredData.length }).map(
                  (_, idx) => (
                    <tr
                      key={`empty-${idx}`}
                      style={{
                        backgroundColor: idx % 2 === 0 ? getcolor : "#f8f9ff",
                      }}
                    >
                      {columnsConfig.map((column, index) => (
                        <td
                          key={index}
                          style={{
                            width: column.uiWidth,
                            padding: "8px 6px",
                            height: "24px",
                            borderBottom: `1px solid ${softTableStyles.softRowSeparator}`,
                          }}
                        >
                          {/* empty cell */}
                        </td>
                      ))}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>

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
              const isTotalColumn = index === columnsConfig.length - 2;

              const alignmentClass = getAlignmentClass(
                isTotalColumn ? "right" : "left",
              );

              return (
                <div
                  key={`total-col-${index}`}
                  className={alignmentClass}
                  style={{
                    width: column.uiWidth,
                    background: getnavbarbackgroundcolor,
                    color: "white",
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
                  {column.key === "tacccod" ? (
                    <span>{filteredData.length}</span> // total customers count
                  ) : column.key === "Bal" ? (
                    <span>{apiTotalBalance.toLocaleString()}</span> // total balance
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>

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
