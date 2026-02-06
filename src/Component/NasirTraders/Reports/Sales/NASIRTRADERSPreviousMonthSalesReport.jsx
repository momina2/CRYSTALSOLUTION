import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../../../../ThemeContext";
import NavComponent from "../../../MainComponent/Navform/navbarform";
import SingleButton from "../../../MainComponent/Button/SingleButton/SingleButton";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import "../../NasirTradersDashboard.css";
import jsPDF from "jspdf";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";
import { FaClipboardList, FaFileInvoiceDollar } from "react-icons/fa";
import Select from "react-select";

const REPORT_NAME = "January Sales Report 2026";
const COMPANY_NAME = "Nasir Trading";

const columnsConfig = [
  // {
  //   header: "Lgr",
  //   key: "ledgerBtn",
  //   alignment: "center",
  //   uiWidth: 50,
  //   pdfWidth: 0,
  //   excelWidth: 0,
  // },
  // {
  //   header: "P.R",
  //   key: "progressBtn",
  //   alignment: "center",
  //   uiWidth: 50,
  //   pdfWidth: 0,
  //   excelWidth: 0,
  // },
  {
    header: "Code",
    key: "code",
    alignment: "left",
    uiWidth: 150,
    pdfWidth: 20,
    excelWidth: 15,
  },
  {
    header: "Description",
    key: "Description",
    alignment: "left",
    uiWidth: 320,
    pdfWidth: 80,
    excelWidth: 40,
  },

  {
    header: "Rate",
    key: "Rate",
    alignment: "right",
    uiWidth: 70,
    pdfWidth: 80,
    excelWidth: 40,
  },
  {
    header: "Qnty",
    key: "Qnty",
    alignment: "right",
    uiWidth: 80,
    pdfWidth: 35,
    excelWidth: 30,
  },
  {
    header: "Sale Amount",
    key: "Sale Amount",
    alignment: "right",
    uiWidth: 130,
    pdfWidth: 25,
    excelWidth: 20,
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

const sortAZ = (arr, labelKey) =>
  [...arr].sort((a, b) =>
    a[labelKey]?.toLowerCase().localeCompare(b[labelKey]?.toLowerCase()),
  );

const toOptions = (arr, valueKey, labelKey) =>
  [...arr]
    .sort((a, b) =>
      a[labelKey]?.toLowerCase().localeCompare(b[labelKey]?.toLowerCase()),
    )
    .map((item) => ({
      value: item[valueKey],
      label: item[labelKey]?.trim(),
    }));

export default function NASIRTRADERSPreviousMonthSalesReport() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fromDate, setFromDate] = useState("2026-01-01");
  const [toDate, setToDate] = useState("2026-01-31");
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
  const [city, setCity] = useState(null);
  const [region, setRegion] = useState(null);
  const [salesman, setSalesman] = useState(null);
  const [company, setCompany] = useState(null);
  const [store, setStore] = useState(null);
  const [category, setCategory] = useState(null);

  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [stores, setStores] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // const [salesmens, setSalesmens] = useState([]);

  // const minParam = query.get("min") || "0";
  // const maxParam = query.get("max") || "99999999";
  // const labelParam = query.get("label") || "";

  // const [errorMessage, setErrorMessage] = useState("");

  const companyOptions = toOptions(companies, "tcmpcod", "tcmpdsc");
  const storeOptions = toOptions(stores, "tstrcod", "tstrdsc");
  const categoryOptions = toOptions(categoryList, "tctgcod", "tctgdsc");

  const {
    isSidebarVisible,
    getcolor,
    fontcolor,
    getnavbarbackgroundcolor,
    getfontstyle,
    getdatafontsize,
  } = useTheme();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const form = new FormData();
      form.append("code", "NASIRTRD");
      form.append("FLocCod", "001");
      form.append("FYerDsc", "2019-2025");

      form.append("FIntDat", fromDate);
      form.append("FFnlDat", toDate);
      // form.append("FCtyCod", city?.value || "");
      // form.append("FRegCod", region?.value || "");
      // form.append("FSalCod", salesman?.value || "");
      form.append("FCmpCod", company?.value || "");
      // form.append("FCstCod", customer?.value || "");
      form.append("FCtgCod", category?.value || "");
      form.append("FTrnTyp", "");
      form.append("FStrCod", store?.value || "");
      form.append("FSchTxt", "");

      // form.append("FSalCod", "");

      const res = await axios.post(
        "https://crystalsolutions.pk/api/ItemSaleSummary.php",
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

  const fetchStores = async () => {
    try {
      const form = new FormData();
      form.append("code", "NASIRTRD");
      form.append("FLocCod", "001");

      const res = await axios.post(
        "https://crystalsolutions.pk/api/GetStore.php",
        form,
      );

      setStores(res.data || []);
    } catch (err) {
      console.error("Store Fetch Error", err);
      setStores([]);
    }
  };

  const fetchCompany = async () => {
    try {
      const form = new FormData();
      form.append("code", "NASIRTRD");

      const res = await axios.post(
        "https://crystalsolutions.pk/api/GetCompany.php",
        form,
      );

      setCompanies(res.data || []);
    } catch (err) {
      console.error("Company Fetch Error", err);
      setCompanies([]);
    }
  };

  const fetchCategory = async () => {
    try {
      const form = new FormData();
      form.append("code", "NASIRTRD");

      const res = await axios.post(
        "https://crystalsolutions.pk/api/GetCatg.php",
        form,
      );

      setCategoryList(res.data || []);
    } catch (err) {
      console.error("Category Fetch Error", err);
      setCategory([]);
    }
  };
  useEffect(() => {
    fetchData();
    fetchCities();
    fetchRegions();
    fetchSalesmen();
    fetchStores();
    fetchCategory();
    fetchCompany();
  }, []);

  const handleSelect = () => {
    if (!fromDate || !toDate) return;

    if (fromDate > toDate) {
      alert("From date cannot be greater than To date");
      return;
    }

    // ✅ URL update
    navigate(
      `?from=${fromDate}&to=${toDate}` +
        `&company=${company?.value || ""}` +
        `&category=${category?.value || ""}` +
        `&store=${store?.value || ""}`, // ✅ ADD THIS
      { replace: true },
    );

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

    totalRow[keys.length - 1] = totalSaleAmount.toLocaleString();
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

    // 🔍 Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      data = data.filter(
        (row) =>
          row.code?.toLowerCase().includes(q) ||
          row.Description?.trim().toLowerCase().includes(q) ||
          row.Qnty?.toString().includes(q) ||
          row.Rate?.toString().includes(q) ||
          row["Sale Amount"]?.toString().includes(q),
      );
    }

    // 🔃 Sorting
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        // 🔢 Numeric columns
        if (["Qnty", "Rate", "Sale Amount"].includes(sortConfig.key)) {
          const aNum = Number(String(aVal || 0).replace(/,/g, ""));
          const bNum = Number(String(bVal || 0).replace(/,/g, ""));

          return sortConfig.direction === "ascending"
            ? aNum - bNum
            : bNum - aNum;
        }

        // 🔤 Text columns
        const aStr = String(aVal ?? "").toLowerCase();
        const bStr = String(bVal ?? "").toLowerCase();

        return sortConfig.direction === "ascending"
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }

    return data;
  }, [rows, searchQuery, sortConfig]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return sortedTableData;

    const q = searchQuery.toLowerCase().trim();

    return sortedTableData.filter((row) => {
      return (
        row.code?.toLowerCase().includes(q) ||
        row.Description?.trim().toLowerCase().includes(q) ||
        row.Qnty?.toString().includes(q) ||
        row.Rate?.toString().includes(q) ||
        row["Sale Amount"]?.toString().includes(q)
      );
    });
  }, [sortedTableData, searchQuery]);

  const totalQuantity = useMemo(() => {
    return filteredData.reduce((sum, row) => {
      const val = Number(String(row.Qnty || "0").replace(/,/g, ""));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }, [filteredData]);

  const totalSaleAmount = useMemo(() => {
    return filteredData.reduce((sum, row) => {
      const val = Number(String(row["Sale Amount"] || "0").replace(/,/g, ""));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }, [filteredData]);

  const filterRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const filterLabelStyle = {
    width: "80px",
    fontSize: getdatafontsize,
    fontFamily: getfontstyle,
    textAlign: "left",
  };

  const selectStyles = {
    container: (base) => ({
      ...base,
      width: "220px",
      fontFamily: getfontstyle,
      fontSize: getdatafontsize,
    }),

    control: (base) => ({
      ...base,
      minHeight: "28px",
      height: "28px",
      backgroundColor: "#fff",
      border: "1px solid #000",
      borderRadius: "0px",
      boxShadow: "none",
      justifyContent: "flex-start",
    }),

    valueContainer: (base) => ({
      ...base,
      padding: "0 6px",
      justifyContent: "flex-start",
      textAlign: "left",
    }),

    singleValue: (base) => ({
      ...base,
      color: "#000",
      lineHeight: "26px",
      textAlign: "left",
      marginLeft: "0px",
    }),

    placeholder: (base) => ({
      ...base,
      color: "#000",
      textAlign: "left",
      marginLeft: "0px",
    }),

    input: (base) => ({
      ...base,
      textAlign: "left",
    }),

    indicatorsContainer: (base) => ({
      ...base,
      height: "28px",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      padding: "2px 6px",
      color: "#000",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    menu: (base) => ({
      ...base,
      borderRadius: "0px",
      border: "1px solid #000",
      boxShadow: "none",
    }),

    option: (base) => ({
      ...base,
      textAlign: "left",
      padding: "4px 8px",
      color: "#000",
    }),

    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  const handleCSV = () => {
    exportCSV({
      rows: sortedTableData,
      columnsConfig,
      totalCollection: totalSaleAmount,
      totalQnty: totalQuantity,
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
              padding: "10px 12px",
              gap: "12px",
              flexWrap: "wrap", // responsive
            }}
          >
            {/* LEFT — DATE + SEARCH */}
            {/* TOP ROW — FROM / TO LEFT, SEARCH RIGHT */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* LEFT — FROM / TO */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                {/* FROM */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span
                    style={{
                      width: "45px",
                      fontSize: getdatafontsize,
                      fontFamily: getfontstyle,
                    }}
                  >
                    From :
                  </span>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    style={{
                      height: "28px",
                      width: "140px",
                      border: "1px solid #000",
                      borderRadius: "0px",
                      padding: "0 6px",
                      fontSize: getdatafontsize,
                      fontFamily: getfontstyle,
                      outline: "none",
                      backgroundColor: "white",
                    }}
                  />
                </div>

                {/* TO */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span
                    style={{
                      width: "45px",
                      fontSize: getdatafontsize,
                      fontFamily: getfontstyle,
                    }}
                  >
                    To :
                  </span>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    style={{
                      height: "28px",
                      width: "140px",
                      border: "1px solid #000",
                      borderRadius: "0px",
                      padding: "0 6px",
                      fontSize: getdatafontsize,
                      fontFamily: getfontstyle,
                      outline: "none",
                      backgroundColor: "white",
                    }}
                  />
                </div>
              </div>

              {/* RIGHT — SEARCH (push to right) */}
              <div
                style={{
                  marginLeft: "auto", // 🔥 MAGIC LINE
                  minWidth: "220px",
                  maxWidth: "360px",
                  border: "1px solid #000",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  padding: "2px 8px",
                  height: "28px",
                }}
              >
                <MagnifyingGlassIcon
                  style={{ width: "16px", height: "16px" }}
                />
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

            {/* FILTER ROW — LEFT & RIGHT STACKS */}
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              {/* LEFT — 3 DROPDOWNS (VERTICAL, LEFT ALIGNED) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px",
                  // padding: "0 2px",
                }}
              >
                {/* CUSTOMER */}

                {/* <div style={filterRowStyle}>
                  <span style={filterLabelStyle}>Customer :</span>
                  <Select
                    options={customerOptions}
                    value={customer}
                    onChange={setCustomer}
                    placeholder="ALL"
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />
                </div> */}

                {/* COMPANY */}

                <div style={filterRowStyle}>
                  <span style={filterLabelStyle}>Company :</span>
                  <Select
                    options={companyOptions}
                    value={company}
                    onChange={setCompany}
                    placeholder="ALL"
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />
                </div>

                <div style={filterRowStyle}>
                  <span style={filterLabelStyle}>Store :</span>
                  <Select
                    options={storeOptions}
                    value={store}
                    onChange={setStore}
                    placeholder="ALL"
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />
                </div>
              </div>

              {/* RIGHT — 3 DROPDOWNS (VERTICAL, RIGHT ALIGNED) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "4px",
                  marginLeft: "auto",
                }}
              >
                {/* CATEGORY */}

                <div style={filterRowStyle}>
                  <span style={filterLabelStyle}>Category :</span>
                  <Select
                    options={categoryOptions}
                    value={category}
                    onChange={setCategory}
                    placeholder="ALL"
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />
                </div>
                {/* CITY */}

                {/* <div style={filterRowStyle}>
                  <span style={filterLabelStyle}>City :</span>
                  <Select
                    options={cityOptions}
                    value={city}
                    onChange={setCity}
                    placeholder="ALL"
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />
                </div> */}

                {/* REGION (future API) */}

                {/* <div style={filterRowStyle}>
                  <span style={filterLabelStyle}>Region :</span>
                  <Select
                    options={regionOptions}
                    value={region}
                    onChange={setRegion}
                    placeholder="ALL"
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />
                </div> */}

                {/* SALESMAN (future API) */}
                {/* <div style={filterRowStyle}>
                  <span style={filterLabelStyle}>Salesman :</span>
                  <Select
                    options={salesmanOptions}
                    value={salesman}
                    onChange={setSalesman}
                    placeholder="ALL"
                    isSearchable
                    isClearable
                    styles={selectStyles}
                  />
                </div> */}
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
                  {column.key === "Qnty" ? (
                    <span
                      style={{
                        display: "block",
                        textAlign: "right",
                        width: "100%",
                      }}
                    >
                      {totalQuantity.toLocaleString()}
                    </span>
                  ) : column.key === "Sale Amount" ? (
                    <span
                      style={{
                        display: "block",
                        textAlign: "right",
                        width: "100%",
                      }}
                    >
                      {totalSaleAmount.toLocaleString()}
                    </span>
                  ) : index === 0 ? (
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
            <SingleButton text="Select" onClick={handleSelect} />
          </div>
        </div>
      </div>
    </>
  );
}
