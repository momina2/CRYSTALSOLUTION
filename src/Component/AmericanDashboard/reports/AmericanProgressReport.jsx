

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
  {
    header: "",
    key: "scrollSpacer",
    alignment: "center",
    uiWidth: 20,
    pdfWidth: 0,
    excelWidth: 0,
  },
];

// Agging Bar Card (amt001..amt006)
const HorizontalAggingRangeCard = ({ stats }) => (
  <div
    style={{
      width: "100%",
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
        justifyContent: "space-between",
        textAlign: "center",
        paddingTop: "2px",
      }}
    >
      {stats.map((s, i) => (
        <div key={i} style={{ flex: 1 }}>
          <p style={{ marginBottom: "4px", fontSize: "12px" }}>{s.range}</p>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#3f379b" }}>
            {Number(s.amount || 0).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default function AmericanProgressReport() {
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

  // 👉 Single date picker: cusDate (default = today)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const defaultDate = `${yyyy}-${mm}-${dd}`;
  const [cusDate, setCusDate] = useState(defaultDate);

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

  // helper: yyyy-mm-dd → dd-mm-yyyy
  const toApiDate = (input) => {
    if (!input) return "";
    const [y, m, d] = input.split("-");
    return `${d}-${m}-${y}`;
  };

  const fetchProgress = async () => {
    try {
      setIsLoading(true);

      const form = new FormData();
      form.append("code", "AMRELEC");
      form.append("cusId", custCode);
      form.append("cusYear", "2025");
      form.append("cusDate", toApiDate(cusDate));

      const res = await axios.post(
        "https://crystalsolutions.com.pk/api/AmericanCustomerProgress.php",
        form
      );

      const progressList = res.data?.Progress || [];

      // 👉 Extract TOTAL row from API
      const totalRow = progressList.find(
        (r) => String(r["Month"]).toLowerCase() === "total"
      );

      // 👉 Remove TOTAL row from table
      const filteredProgress = progressList.filter(
        (r) => String(r["Month"]).toLowerCase() !== "total"
      );

      // 👉 Map table rows WITHOUT total row
      const finalRows = filteredProgress.map((r) => ({
        sr: r["Sr#"],
        month: r["Month"],
        debit: r["Debit"],
        credit: r["Credit"],
        balance: r["Balance"],
      }));

      setRows(finalRows);

      // 👉 Save total row separately
      setApiData({ ...res.data, totalRow });
    } catch (err) {
      console.error("Progress API error:", err);
      setRows([]);
      setApiData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [cusDate]);

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

  // PDF EXPORT
  const exportPDFHandler = () => {
    const doc = new jsPDF({ orientation: "portrait" });

    doc.setFontSize(15);
    doc.text(COMPANY_NAME, 105, 12, { align: "center" });
    doc.text(REPORT_NAME, 105, 20, { align: "center" });
    doc.text(`Customer: ${headerCode} | ${headerName || ""}`, 10, 12);
    doc.text(`Date: ${toApiDate(cusDate)}`, 10, 18);
    doc.setFontSize(9);

    let y = 30;
    const pdfCols = columnsConfig.filter((c) => c.key !== "scrollSpacer");
    const headers = pdfCols.map((c) => c.header);

    headers.forEach((h, i) => {
      doc.text(h, 10 + i * 30, y);
    });

    y += 6;
    filteredData.forEach((r) => {
      const row = pdfCols.map((c) => {
        const key = c.key;
        if (["debit", "credit", "balance"].includes(key)) {
          return Number(r[key] || 0).toLocaleString();
        }
        return r[key] ?? "";
      });

      row.forEach((val, i) => {
        doc.text(String(val), 10 + i * 30, y);
      });
      y += 6;
      if (y > 280) {
        doc.addPage();
        y = 30;
      }
    });

    // total row
    y += 4;
    doc.text(`Total Debit: ${totalDebit.toLocaleString()}`, 10, y);
    y += 5;
    doc.text(
      `Total Credit: ${totalCredit.toLocaleString()}${
        creditAmount != null
          ? ` (Credit Amount: ${Number(creditAmount || 0).toLocaleString()})`
          : ""
      }`,
      10,
      y
    );
    y += 5;
    doc.text(`Total Balance: ${totalBalance.toLocaleString()}`, 10, y);

    doc.save(`${REPORT_NAME}_${headerCode || ""}.pdf`);
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

          {/* SEARCH + SINGLE DATE FILTER ROW */}
          <div
            style={{
              width: "100%",
              marginTop: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between", // ⭐ LEFT + RIGHT PERFECT
              paddingInline: "12px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {/* LEFT — Date Picker */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "1px solid #dadada",
                backgroundColor: "white",
                borderRadius: "2px",
                padding: "4px 10px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#555" }}>Date</span>
              <input
                type="date"
                value={cusDate}
                onChange={(e) => setCusDate(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: getdatafontsize,
                  fontFamily: getfontstyle,
                }}
              />
            </div>

            {/* RIGHT — Search Bar */}
            <div
              style={{
                minWidth: "220px",
                maxWidth: "260px",
                border: "1px solid #dadada",
                borderRadius: "2px",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                padding: "4px 10px",
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
                          } else if (
                            ["debit", "credit", "balance"].includes(key)
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
                if (column.key === "sr") content = filteredData.length;
                if (column.key === "month")
                  content = apiData?.totalRow?.Month ?? "Total";

                if (column.key === "debit")
                  content = Number(
                    apiData?.totalRow?.Debit ?? totalDebit
                  ).toLocaleString();

                if (column.key === "credit")
                  content = Number(
                    apiData?.totalRow?.Credit ?? totalCredit
                  ).toLocaleString();

                if (column.key === "balance")
                  content = Number(
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
                  width: "70%", // ⭐ width same rahegi
                  margin: "0 auto", // ⭐ THIS centers the whole card irrespective of width
                }}
              >
                <HorizontalAggingRangeCard stats={stats} />
              </div>
            )}
            <SingleButton text="PDF" onClick={exportPDFHandler} />
            <SingleButton text="Excel" onClick={handleCSV} />
          </div>
        </div>
      </div>
    </>
  );
}
