import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../../../ThemeContext";
import NavComponent from "../../MainComponent/Navform/navbarform";
import SingleButton from "../../MainComponent/Button/SingleButton/SingleButton";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import "../NasirTradersDashboard.css";
import jsPDF from "jspdf";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";
import { FaClipboardList, FaFileInvoiceDollar } from "react-icons/fa";

const REPORT_NAME = "Nasir Traders Receivable Report";
const COMPANY_NAME = "Nasir Traders";

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
    key: "tcstcod",
    alignment: "center",
    uiWidth: 100,
    pdfWidth: 20,
    excelWidth: 15,
  },
  {
    header: "Name",
    key: "tcstdsc",
    alignment: "left",
    uiWidth: 320,
    pdfWidth: 80,
    excelWidth: 40,
  },
  {
    header: "Salesman",
    key: "SalesMan",
    alignment: "left",
    uiWidth: 150,
    pdfWidth: 35,
    excelWidth: 30,
  },
  {
    header: "Region",
    key: "Region",
    alignment: "left",
    uiWidth: 190,
    pdfWidth: 25,
    excelWidth: 20,
  },
  {
    header: "City",
    key: "City",
    alignment: "left",
    uiWidth: 150,
    pdfWidth: 25,
    excelWidth: 18,
  },
  {
    header: "Opening",
    key: "Opening",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 25,
    excelWidth: 18,
  },
  {
    header: "Debit",
    key: "Debit",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 25,
    excelWidth: 18,
  },
  {
    header: "Credit",
    key: "Credit",
    alignment: "right",
    uiWidth: 120,
    pdfWidth: 25,
    excelWidth: 18,
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

export default function NASIRTRADERSReceivableReport() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fromDate, setFromDate] = useState("2025-01-01");
  const [toDate, setToDate] = useState("2025-12-31");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const showIfNonZero = (val) => {
    if (val === null || val === undefined) return "";

    const num = Number(String(val).replace(/,/g, ""));
    if (!num || num === 0) return "";

    return val;
  };

  const query = useQueryParams();
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [salesman, setSalesman] = useState("");
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [salesmen, setSalesmen] = useState([]);

  const {
    isSidebarVisible,
    getcolor,
    fontcolor,
    getnavbarbackgroundcolor,
    getfontstyle,
    getdatafontsize,
  } = useTheme();

  // === API CALL =====
  // useEffect(() => {
  //   fetchData();
  // }, [minParam, maxParam]);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const form = new FormData();
      form.append("code", "NASIRTRD");
      form.append("FIntDat", fromDate);
      form.append("FFnlDat", toDate);
      form.append("FCtyCod", city || "");
      form.append("FRegCod", region || "");
      form.append("FSalCod", salesmen || "");

      const res = await axios.post(
        "https://crystalsolutions.pk/api/AmericanReceivableReport.php",
        form,
        { timeout: 20000 },
      );

      const arr = res?.data?.Detail ?? [];
      setRows(arr);
    } catch (err) {
      console.error("FetchError:", err);
      setRows([]);
    }
    setIsLoading(false);
  };

  const fetchCities = async () => {
    try {
      const form = new FormData();
      form.append("code", "NASIRTRD");

      const res = await axios.post(
        "https://crystalsolutions.pk/api/GetCities.php",
        form,
      );

      setCities(res.data || []);
    } catch (err) {
      console.error("City Fetch Error", err);
      setCities([]);
    }
  };
  const fetchRegions = async () => {
    try {
      const form = new FormData();
      form.append("code", "NASIRTRD");

      const res = await axios.post(
        "https://crystalsolutions.pk/api/GetRegions.php",
        form,
      );

      setRegions(res.data || []);
    } catch (err) {
      console.error("Region Fetch Error", err);
      setRegions([]);
    }
  };
  const fetchSalesmen = async () => {
    try {
      const form = new FormData();
      form.append("code", "NASIRTRD");

      const res = await axios.post(
        "https://crystalsolutions.pk/api/GetSalesMen.php",
        form,
      );

      setSalesmen(res.data || []);
    } catch (err) {
      console.error("Salesman Fetch Error", err);
      setSalesmen([]);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCities();
    fetchRegions();
    fetchSalesmen();
  }, []);

  const handleSelect = () => {
    if (!fromDate || !toDate) return;
    if (fromDate > toDate) {
      alert("From date cannot be greater than To date");
      return;
    }
    fetchData();
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
      (c) => c.key !== "scrollSpacer" && "progressBtn" && "ledgerBtn",
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
          (row.tcstcod || "").toLowerCase().includes(q) ||
          (row.tcstdsc || "").trim().toLowerCase().includes(q) ||
          (row.tmobnum || "").toLowerCase().includes(q) ||
          (row.SalesMan || "").toLowerCase().includes(q) ||
          (row.Region || "").toLowerCase().includes(q) ||
          (row.City || "").toLowerCase().includes(q) ||
          (row.Balance ?? "").toString().includes(q),
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
    if (!searchQuery) return sortedTableData;

    const q = searchQuery.toLowerCase().trim();

    return sortedTableData.filter((row) => {
      return (
        (row.tcstcod || "").toLowerCase().includes(q) ||
        (row.tcstdsc || "").trim().toLowerCase().includes(q) ||
        (row.tmobnum || "").toLowerCase().includes(q) ||
        (row.SalesMan || "").toLowerCase().includes(q) ||
        (row.Region || "").toLowerCase().includes(q) ||
        (row.City || "").toLowerCase().includes(q) ||
        (row.Balance ?? "").toString().includes(q)
      );
    });
  }, [sortedTableData, searchQuery]);

  const totalDebit = useMemo(() => {
    return filteredData.reduce((sum, row) => {
      const val = Number(String(row.Debit || "0").replace(/,/g, ""));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }, [filteredData]);

  const totalCredit = useMemo(() => {
    return filteredData.reduce((sum, row) => {
      const val = Number(String(row.Credit || "0").replace(/,/g, ""));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }, [filteredData]);

  const totalBalance = useMemo(() => {
    return filteredData.reduce((sum, row) => {
      const val = Number(String(row.Balance || "0").replace(/,/g, ""));
      return sum + (isNaN(val) ? 0 : val);
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
          <NavComponent textdata={REPORT_NAME} />
          {/* DATE + DROPDOWNS + SEARCH ROW */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px",
              gap: "10px",
            }}
          >
            {/* LEFT — DATE + SELECT */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* From */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  backgroundColor: "white",
                  border: "1px solid #dadada",
                  padding: "2px 8px",
                }}
              >
                <span style={{ fontSize: "12px" }}>From</span>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: getdatafontsize,
                  }}
                />
              </div>

              {/* To */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  backgroundColor: "white",
                  border: "1px solid #dadada",
                  padding: "2px 8px",
                }}
              >
                <span style={{ fontSize: "12px" }}>To</span>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: getdatafontsize,
                  }}
                />
              </div>
            </div>

            {/* CENTER — 3 DROPDOWNS */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* CITY */}
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  minWidth: "160px",
                  padding: "4px 6px",
                  border: "1px solid #dadada",
                  backgroundColor: "white",
                  fontSize: getdatafontsize,
                  fontFamily: getfontstyle,
                }}
              >
                <option value="">City</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.tctycod}>
                    {c.tctycod} - {(c.tctydsc || "").trim()}
                  </option>
                ))}
              </select>

              {/* REGION (future API) */}
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                style={{
                  minWidth: "160px",
                  padding: "4px 6px",
                  border: "1px solid #dadada",
                  backgroundColor: "white",
                  fontSize: getdatafontsize,
                  fontFamily: getfontstyle,
                }}
              >
                {/* ALL */}
                <option value="">Regions</option>

                {regions.map((r) => (
                  <option key={r.id} value={r.tregcod}>
                    {r.tregcod} - {(r.tregdsc || "").trim()}
                  </option>
                ))}
              </select>

              {/* SALESMAN (future API) */}
              <select
                value={salesman}
                onChange={(e) => setSalesman(e.target.value)}
                style={{
                  minWidth: "160px",
                  padding: "4px 6px",
                  border: "1px solid #dadada",
                  backgroundColor: "white",
                  fontSize: getdatafontsize,
                  fontFamily: getfontstyle,
                }}
              >
                <option value="">SalesMen</option>

                {Array.isArray(salesmen) &&
                  salesmen.map((s) => (
                    <option key={s.id} value={s.tsalcod}>
                      {s.tsalcod} - {(s.tsalnam || "").trim()}
                    </option>
                  ))}
              </select>
            </div>

            {/* RIGHT — SEARCH */}
            <div
              style={{
                minWidth: "260px",
                maxWidth: "400px",
                border: `1px solid ${softTableStyles.softBorderColor}`,
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                padding: "2px 8px",
              }}
            >
              <MagnifyingGlassIcon style={{ width: "16px", height: "16px" }} />
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
                          whiteSpace: "nowrap",
                        }}
                      >
                        {column.key === "scrollSpacer" ? (
                          ""
                        ) : column.key === "Opening" ? (
                          showIfNonZero(item.Opening)
                        ) : column.key === "Debit" ? (
                          showIfNonZero(item.Debit)
                        ) : column.key === "Credit" ? (
                          showIfNonZero(item.Credit)
                        ) : column.key === "Balance" ? (
                          showIfNonZero(item.Balance)
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
                                  `${
                                    window.location.origin
                                  }/crystalsol/AmericanProgressReportDashboard?code=${
                                    item.tcstcod
                                  }&name=${encodeURIComponent(item.tcstdsc)}`,
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
                                  `${
                                    window.location.origin
                                  }/crystalsol/AmericanCustomerLedgerDashboard?code=${
                                    item.tcstcod
                                  }&name=${encodeURIComponent(item.tcstdsc)}`,
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
              const isTotalColumn = ["Debit", "Credit", "Balance"].includes(
                column.key,
              );

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
                    paddingRight: isTotalColumn ? "6px" : "5px",
                    paddingLeft: isTotalColumn ? "0px" : "5px",
                    fontWeight: "bold",
                    fontSize: getdatafontsize,
                    fontFamily: getfontstyle,
                  }}
                >
                  {column.key === "Debit" ? (
                    <span>{totalDebit.toLocaleString()}</span>
                  ) : column.key === "Credit" ? (
                    <span>{totalCredit.toLocaleString()}</span>
                  ) : column.key === "Balance" ? (
                    <span>{totalBalance.toLocaleString()}</span>
                  ) : index === 2 ? (
                    <span>{filteredData.length}</span>
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
            <SingleButton text="Select" onClick={handleSelect} />

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
