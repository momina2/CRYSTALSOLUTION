import React, { useState, useEffect, useRef, useMemo } from "react"; 
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../ThemeContext";
import {
  getUserData,
  getOrganisationData,
  getLocationnumber,
  getYearDescription,
} from "../../Auth";
import NavComponent from "../../MainComponent/Navform/navbarform";
import SingleButton from "../../MainComponent/Button/SingleButton/SingleButton";
import {} from "react-select";
import { BsCalendar } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import "react-calendar/dist/Calendar.css";
import { useHotkeys } from "react-hotkeys-hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa"; 

// =====================================
// 1. REPORT CONFIGURATION & CONSTANTS 
// =====================================
const REPORT_CONFIG = {
  API_LINK: "/DailyMemberCollectionSummary.php",
  REPORT_NAME: "Daily Member Collection Detail Report Summary",
  API_PARAMS: {
    ORGANISATION_CODE: "code",
    LOCATION_NUMBER: "FLocCod",
    YEAR_DESCRIPTION: "FYerDsc",
    FROM_DATE: "FIntDat",
    TO_DATE: "FFnlDat",
  },
  TABLE: {
    HEADERS: ["Date", "Day", "Member", "Collection"],
    KEYS: ["Date", "Day", "Members", "Collection"],
    UI_WIDTHS: {
      col001: "80px",
      col002: "80px",
      col003: "80px",
      col004: "100px",
    },
    PDF_WIDTHS: [22, 22, 20, 20],
    EXCEL_WIDTHS: [12, 12, 12, 12],
    ALIGNMENTS: ["left", "left", "left", "right"],
    PDF_ALIGNMENTS: ["left", "left", "left", "right"],
    TOTAL_COLUMN_INDEX: 3, 
  },
};

const getColumnConfig = (config) => {
  const {
    HEADERS,
    KEYS,
    UI_WIDTHS,
    PDF_WIDTHS,
    EXCEL_WIDTHS,
    ALIGNMENTS,
    PDF_ALIGNMENTS,
  } = config;
  const columns = HEADERS.map((header, index) => ({
    header,
    key: KEYS[index],
    uiWidth: UI_WIDTHS[`col${String(index + 1).padStart(3, "0")}`],
    pdfWidth: PDF_WIDTHS[index],
    excelWidth: EXCEL_WIDTHS[index],
    alignment: ALIGNMENTS[index],
    pdfAlignment: PDF_ALIGNMENTS[index],
  }));
  return columns;
};
const columnsConfig = getColumnConfig(REPORT_CONFIG.TABLE);

const calculateTableWidth = (widths) => {
  const totalWidth = Object.values(widths).reduce(
    (sum, width) => sum + parseInt(width),
    0
  );
  return `${totalWidth}px`;
};

// ===================
// 2. DATE UTILITIES
// ===================
const convertToDate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  return new Date(year, month - 1, day);
};

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatDate1 = (date) => {
  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;
};

// ===================
// 3. MAIN COMPONENT
// ===================
export default function MemberCollectionSummaryReport() {
  const navigate = useNavigate();
  const user = getUserData();
  const organisation = getOrganisationData();
  const reportName = REPORT_CONFIG.REPORT_NAME;
  const { PDF_WIDTHS, TOTAL_COLUMN_INDEX } = REPORT_CONFIG.TABLE;
  const { API_PARAMS } = REPORT_CONFIG;
  const toRef = useRef(null);
  const fromRef = useRef(null);
  const selectButtonRef = useRef(null);
  const yeardescription = getYearDescription();
  const locationnumber = getLocationnumber();
  const [totalCollection, setTotalCollection] = useState("");
  const [selectedfromDate, setSelectedfromDate] = useState(null);
  const [fromInputDate, setfromInputDate] = useState("");
  const [fromCalendarOpen, setfromCalendarOpen] = useState(false);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [toInputDate, settoInputDate] = useState("");
  const [toCalendarOpen, settoCalendarOpen] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("custom");
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const {
    isSidebarVisible,
    getcolor,
    fontcolor,
    apiLinks,
    getnavbarbackgroundcolor,
    getLocationNumber,
    getyeardescription,
    getfromdate,
    gettodate,
    getfontstyle,
    getdatafontsize,
  } = useTheme();

  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", getcolor);
  }, [getcolor]);

  const comapnyname = organisation.description;

  // Global Date Limits
  const GlobalfromDate = convertToDate(getfromdate);
  const GlobaltoDate = convertToDate(gettodate);
  const GlobalfromDate1 = formatDate1(GlobalfromDate);
  const GlobaltoDate1 = formatDate1(GlobaltoDate);

  // Handlers
  const toggleFromCalendar = () => setfromCalendarOpen((prevOpen) => !prevOpen);
  const toggleToCalendar = () => settoCalendarOpen((prevOpen) => !prevOpen);
  const handlefromDateChange = (date) => {
    setSelectedfromDate(date);
    setfromInputDate(date ? formatDate(date) : "");
    setfromCalendarOpen(false);
  };
  const handlefromInputChange = (e) => {
    setfromInputDate(e.target.value);
  };

  const handleToDateChange = (date) => {
    setSelectedToDate(date);
    settoInputDate(date ? formatDate(date) : "");
    settoCalendarOpen(false);
  };
  const handleToInputChange = (e) => {
    settoInputDate(e.target.value);
  };

  function fetchDailyMemberCollectionDetailReport() {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    let errorType = "";

    if (!fromInputDate) {
      errorType = "fromDate";
    } else if (!toInputDate) {
      errorType = "toDate";
    } else if (!dateRegex.test(fromInputDate)) {
      errorType = "fromDateInvalid";
    } else if (!dateRegex.test(toInputDate)) {
      errorType = "toDateInvalid";
    } else {
      const formatInput = (dateStr) =>
        dateStr.replace(/^(\d{2})(\d{2})(\d{4})$/, "$1-$2-$3");

      const enteredFromDate = convertToDate(formatInput(fromInputDate));
      const enteredToDate = convertToDate(formatInput(toInputDate));

      if (GlobalfromDate && enteredFromDate < GlobalfromDate) {
        errorType = "fromDateBeforeGlobal";
      } else if (GlobaltoDate && enteredFromDate > GlobaltoDate) {
        errorType = "fromDateAfterGlobal";
      } else if (GlobaltoDate && enteredToDate > GlobaltoDate) {
        errorType = "toDateAfterGlobal";
      } else if (GlobaltoDate && enteredToDate < GlobalfromDate) {
        errorType = "toDateBeforeGlobal";
      } else if (enteredToDate < enteredFromDate) {
        errorType = "toDateBeforeFromDate";
      }
    }

    switch (errorType) {
      case "fromDate":
        toast.error("From date is required");
        return;
      case "toDate":
        toast.error("To date is required");
        return;
      case "fromDateInvalid":
        toast.error("From date must be in the format dd-mm-yyyy");
        return;
      case "toDateInvalid":
        toast.error("To date must be in the format dd-mm-yyyy");
        return;
      case "fromDateBeforeGlobal":
      case "fromDateAfterGlobal":
        toast.error(
          `From date must be after ${GlobalfromDate1} and before ${GlobaltoDate1}`
        );
        return;
      case "toDateAfterGlobal":
      case "toDateBeforeGlobal":
        toast.error(
          `To date must be after ${GlobalfromDate1} and before ${GlobaltoDate1}`
        );
        return;
      case "toDateBeforeFromDate":
        toast.error("To date must be after from date");
        return;
      default:
        break;
    }

    document.getElementById(
      "fromdatevalidation"
    ).style.border = `1px solid ${fontcolor}`;
    document.getElementById(
      "todatevalidation"
    ).style.border = `1px solid ${fontcolor}`;

    const apiMainUrl = apiLinks + REPORT_CONFIG.API_LINK;
    setIsLoading(true);

    const formMainData = new URLSearchParams({
      [API_PARAMS.ORGANISATION_CODE]: organisation.code,
      [API_PARAMS.LOCATION_NUMBER]: locationnumber || getLocationNumber,
      [API_PARAMS.YEAR_DESCRIPTION]: yeardescription || getyeardescription,
      [API_PARAMS.FROM_DATE]: fromInputDate,
      [API_PARAMS.TO_DATE]: toInputDate,
    }).toString();

    axios
      .post(apiMainUrl, formMainData)
      .then((response) => {
        setIsLoading(false);

        if (response.data && Array.isArray(response.data.Detail)) {
          setTableData(response.data.Detail);
          setSortConfig({ key: null, direction: "ascending" }); 

          const apiTotal =
            response.data["Total Amount"] ||
            response.data["TotalAmount"] ||
            response.data.TotalAmount ||
            response.data.total_amount ||
            "0";

          setTotalCollection(apiTotal);
        } else {
          setTableData([]);
          setTotalCollection("0");
        }
      })
      .catch((error) => {
        console.error("Error fetching report:", error);
        setIsLoading(false);
        setTableData([]);
        setTotalCollection("0");
      });
  }

  useEffect(() => {
    const hasComponentMountedPreviously = sessionStorage.getItem(
      "componentMountedDetail"
    );
    if (!hasComponentMountedPreviously || (fromRef && fromRef.current)) {
      if (fromRef && fromRef.current) {
        setTimeout(() => {
          fromRef.current.focus();
          fromRef.current.select();
        }, 0);
      }
      sessionStorage.setItem("componentMountedDetail", "true");
    }
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    setSelectedToDate(currentDate);
    settoInputDate(formatDate(currentDate));
    const firstDateOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    setSelectedfromDate(firstDateOfCurrentMonth);
    setfromInputDate(formatDate(firstDateOfCurrentMonth));
  }, []);

  const parseValue = (value, key) => {
    if (key === "Collection") {
      const num = parseFloat(String(value).replace(/[^0-9.-]+/g, ""));
      return isNaN(num) ? 0 : num;
    } else if (key === "Members") {
      const num = parseInt(String(value).replace(/[^0-9]+/g, ""));
      return isNaN(num) ? 0 : num;
    } else if (key === "Date") {
      const parts = String(value).split('-');
      if (parts.length === 3) {
        const [day, month, year] = parts.map(Number);
        return new Date(year, month - 1, day).getTime(); 
      }
      return value; 
    }
    return String(value).toLowerCase(); 
  };

  const sortedTableData = useMemo(() => {
    let sortableItems = [...tableData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aVal = parseValue(a[sortConfig.key], sortConfig.key);
        const bVal = parseValue(b[sortConfig.key], sortConfig.key);

        if (aVal < bVal) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tableData, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <FaSortUp style={{ marginLeft: "5px" }} />
      ) : (
        <FaSortDown style={{ marginLeft: "5px" }} />
      );
    }
    return <FaSort style={{ marginLeft: "5px", opacity: 0.4 }} />;
  };


  // ====================
  // 4. PDF EXPORT LOGIC
  // ====================
  const exportPDFHandler = () => {
    const doc = new jsPDF({ orientation: "portrait" });
    const columnWidths = PDF_WIDTHS;
    const { KEYS: keys } = REPORT_CONFIG.TABLE;

    const dataRows = sortedTableData.map((item) => 
      keys.map((key) => {
        return String(item[key] || "");
      })
    );

    const totalRowData = new Array(keys.length).fill("");
    totalRowData[0] = "Total";
    totalRowData[TOTAL_COLUMN_INDEX] = String(totalCollection);

    const rows = [...dataRows, totalRowData];

    const getTotalTableWidth = () =>
      columnWidths.reduce((acc, width) => acc + width, 0);
    const totalWidth = getTotalTableWidth();
    const tableStartX = (doc.internal.pageSize.width - totalWidth) / 2;
    const pageHeight = doc.internal.pageSize.height;

    const paddingTop = 15;
    const headerY = 35;
    const rowHeight = 5;
    const headerHeight = 6;
    const footerHeight = 15;
    const tableBodyTopY = headerY + headerHeight;
    const availableSpace = pageHeight - footerHeight - tableBodyTopY;

    let rowsPerPage = Math.floor(availableSpace / rowHeight);

    rowsPerPage = Math.max(1, rowsPerPage - 2);

    doc.setFont(getfontstyle);
    doc.setFontSize(10);

    const getCurrentDateTime = () => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const hh = String(today.getHours()).padStart(2, "0");
      const mi = String(today.getMinutes()).padStart(2, "0");
      const ss = String(today.getSeconds()).padStart(2, "0");
      return { date: `${dd}-${mm}-${yyyy}`, time: `${hh}:${mi}:${ss}` };
    };

    const { date, time } = getCurrentDateTime();

    const addTitle = (
      title,
      pageNumber,
      startY,
      titleFontSize = 18,
      pageNumberFontSize = 10
    ) => {
      doc.setFontSize(titleFontSize);
      doc.text(title, doc.internal.pageSize.width / 2, startY, {
        align: "center",
      });

      const rightX = doc.internal.pageSize.width - 10;
      doc.setFontSize(pageNumberFontSize);
      doc.text(
        `Page ${pageNumber}`,
        rightX - 5,
        doc.internal.pageSize.height - 10,
        { align: "right" }
      );
    };

    const addFooter = (lineX, lineY) => {
      const lineWidth = getTotalTableWidth();
      doc.setLineWidth(0.3);
      doc.line(lineX, lineY, lineX + lineWidth, lineY);
      const headingFontSize = 12;

      const headingX = lineX + 2;
      const headingY = lineY + 5;
      doc.setFontSize(headingFontSize);
      doc.setTextColor(0);
      doc.text(`Crystal Solution \t ${date} \t ${time}`, headingX, headingY);
    };

    const addTableHeaders = (startX, startY) => {
      doc.setFont(getfontstyle, "bold");
      doc.setFontSize(12);

      columnsConfig.forEach((column, index) => {
        const cellWidth = column.pdfWidth;
        const cellX = startX + cellWidth / 2;
        const cellY = startY + headerHeight / 2 + 1.5;
        doc.setFillColor(200, 200, 200);
        doc.rect(startX, startY, cellWidth, headerHeight, "F");
        doc.setLineWidth(0.2);
        doc.rect(startX, startY, cellWidth, headerHeight);
        doc.setTextColor(0);
        doc.text(column.header, cellX, cellY, { align: "center" });
        startX += column.pdfWidth;
      });

      doc.setFont("Helvetica");
      doc.setFontSize(12);
    };

    const addTableRows = (startX, startY, startIndex, endIndex, isLastPage) => {
      const tableWidth = getTotalTableWidth();
      doc.setFontSize(10);

      const rowsToRender = endIndex - startIndex;

      for (let i = startIndex; i < endIndex; i++) {
        const row = rows[i];

        const isTotalRow = i === rows.length - 1;

        const isLastRowOnPage = i === endIndex - 1;

        const isOddRow = (i - startIndex) % 2 !== 0;

        let currentX = startX;

        if (isTotalRow) {
          doc.setFont("Helvetica", "bold");
        }

        const rowRelativeIndex = i - startIndex;
        const rowTopY = startY + headerHeight + rowRelativeIndex * rowHeight;

        if (isOddRow && !isTotalRow) {
          doc.setFillColor(240);
          doc.rect(startX, rowTopY, tableWidth, rowHeight, "F");
        }

        row.forEach((cell, cellIndex) => {
          const cellWidth = columnWidths[cellIndex];
          const cellValue = String(cell);
          let align = columnsConfig[cellIndex].pdfAlignment;
          let cellX = currentX + 2;

          if (align === "right") {
            cellX = currentX + cellWidth - 2;
          } else if (align === "center") {
            cellX = currentX + cellWidth / 2;
          }

          if (isTotalRow && cellIndex === 0) {
            align = "center";
            cellX = currentX + cellWidth / 2;
          }

          const cellY = rowTopY + rowHeight / 2 + 0.5;
          doc.setTextColor(0);

          if (!isTotalRow) {
            doc.setFont("Helvetica", "normal");
          }

          doc.text(cellValue, cellX, cellY, {
            align: align,
            baseline: "middle",
          });

          const rowBottomY = rowTopY + rowHeight;

          doc.setDrawColor(0);

          if (isTotalRow) {
            doc.setLineWidth(0.3);
            doc.line(startX, rowTopY, startX + tableWidth, rowTopY);
            doc.line(startX, rowTopY + 0.5, startX + tableWidth, rowTopY + 0.5);
            doc.line(startX, rowBottomY, startX + tableWidth, rowBottomY);
            doc.line(
              startX,
              rowBottomY - 0.5,
              startX + tableWidth,
              rowBottomY - 0.5
            );

            doc.setLineWidth(0.2);
            if (cellIndex === 0) {
              doc.line(currentX, rowTopY, currentX, rowBottomY);
            }
            doc.line(
              currentX + cellWidth,
              rowTopY,
              currentX + cellWidth,
              rowBottomY
            ); 
          } else {
            doc.setLineWidth(0.2);
            doc.rect(currentX, rowTopY, cellWidth, rowHeight);
          }

          currentX += cellWidth;
        });

        if (isTotalRow) {
          doc.setFont("Helvetica", "normal");
        }
      }
    };

    const handlePagination = () => {
      let currentPageIndex = 0;
      let pageNumber = 1;
      const totalRows = rows.length;

      while (currentPageIndex * rowsPerPage < totalRows) {
        let startY = paddingTop;
        if (pageNumber > 1) {
          doc.addPage();
        }

        addTitle(comapnyname, pageNumber, startY, 18);
        startY += 5;
        addTitle(
          `${reportName} From ${fromInputDate} To ${toInputDate}`,
          pageNumber,
          startY,
          12
        );
        startY += 5;

        const startIndex = currentPageIndex * rowsPerPage;
        let endIndex = Math.min(startIndex + rowsPerPage, totalRows);

        const isTotalRowOnNextPage =
          rows.length - 1 >= startIndex && rows.length - 1 >= endIndex;

        if (isTotalRowOnNextPage && rows.length > startIndex) {
          if (rows.length - startIndex === 1) {
            endIndex = rows.length;
          }
        }

        addTableHeaders(tableStartX, headerY);

        const isLastPage = endIndex === totalRows;
        addTableRows(tableStartX, headerY, startIndex, endIndex, isLastPage);

        if (isLastPage) {
          const lineX = (doc.internal.pageSize.width - totalWidth) / 2;
          const lineY = pageHeight - footerHeight + 5;
          addFooter(lineX, lineY);
        }

        currentPageIndex++;
        pageNumber++;
      }
    };

    handlePagination();
    doc.save(`${reportName} From ${fromInputDate} To ${toInputDate}.pdf`);
  };

  // ==========================
  // 5. CSV/EXCEL EXPORT LOGIC
  // ==========================

  const handleDownloadCSV = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Daily Collection Detail");

    const { HEADERS: headers, KEYS: keys } = REPORT_CONFIG.TABLE;
    const numColumns = headers.length;
    const excelColumnsConfig = columnsConfig;
    const font = (size, bold = false) => ({
      name: getfontstyle || "Helvetica",
      size,
      bold,
    });

    const headerStyle = {
      font: font(10, true),
      alignment: { horizontal: "center", vertical: "middle" },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFC6D9F7" },
      },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };
    const tableContentStyle = {
      font: font(10),
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    worksheet.addRow([]);

    const companyRow = worksheet.addRow([comapnyname]);
    companyRow.eachCell((cell) => {
      cell.font = font(18, true);
      cell.alignment = { horizontal: "center" };
    });
    worksheet.getRow(companyRow.number).height = 30;
    worksheet.mergeCells(
      `A${companyRow.number}:${String.fromCharCode(64 + numColumns)}${
        companyRow.number
      }`
    );

    const storeListRow = worksheet.addRow([
      `${reportName} From ${fromInputDate} To ${toInputDate}`,
    ]);
    storeListRow.eachCell((cell) => {
      cell.font = font(10);
      cell.alignment = { horizontal: "center" };
    });
    worksheet.mergeCells(
      `A${storeListRow.number}:${String.fromCharCode(64 + numColumns)}${
        storeListRow.number
      }`
    );

    worksheet.addRow([]);
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => Object.assign(cell, headerStyle));
    
    sortedTableData.forEach((item) => {
      const row = worksheet.addRow(
        keys.map((key) => {
          return item[key];
        })
      );

      row.eachCell((cell, colIndex) => {
        Object.assign(cell, tableContentStyle);
        cell.alignment = {
          horizontal: excelColumnsConfig[colIndex - 1].alignment || "left",
          vertical: "middle",
        };
        if (colIndex - 1 === TOTAL_COLUMN_INDEX) {
          cell.numFmt = "#,##0.00";
        }
      });
    });

    excelColumnsConfig.forEach((column, index) => {
      worksheet.getColumn(index + 1).width = column.excelWidth;
    });

    const totalRowData = new Array(numColumns).fill("");
    totalRowData[0] = "Total";
    totalRowData[TOTAL_COLUMN_INDEX] = String(totalCollection);
    const totalRow = worksheet.addRow(totalRowData);

    totalRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true };
      cell.border = {
        top: { style: "double" },
        left: { style: "thin" },
        bottom: { style: "double" },
        right: { style: "thin" },
      };

      const columnIndex = colNumber - 1;

      if (columnIndex === 0) {
        cell.alignment = { horizontal: "left" };
      } else if (columnIndex === TOTAL_COLUMN_INDEX) {
        cell.alignment = { horizontal: "right" };
        cell.numFmt = "#,##0.00";
      } else {
        cell.alignment = {
          horizontal: excelColumnsConfig[columnIndex].alignment || "left",
        };
      }
    });

    worksheet.addRow([]);
    const today = new Date();
    const currentTime = today.toLocaleTimeString("en-US", { hour12: false });
    const currentdate = formatDate(today);
    const userid = user.tusrid;

    const dateTimeRow = worksheet.addRow([
      `DATE:   ${currentdate}  TIME:   ${currentTime}`,
    ]);
    dateTimeRow.eachCell((cell) => {
      cell.font = font(10);
      cell.alignment = { horizontal: "left" };
    });
    worksheet.mergeCells(
      `A${dateTimeRow.number}:${String.fromCharCode(64 + numColumns)}${
        dateTimeRow.number
      }`
    );

    const dateTimeRow1 = worksheet.addRow([`USER ID:  ${userid}`]);
    dateTimeRow1.eachCell((cell) => {
      cell.font = font(10);
      cell.alignment = { horizontal: "left" };
    });
    worksheet.mergeCells(
      `A${dateTimeRow1.number}:${String.fromCharCode(64 + numColumns)}${
        dateTimeRow1.number
      }`
    );

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${reportName} From ${fromInputDate} To ${toInputDate}.xlsx`);
  };

  // ======================
  // 6. UI CONFIG & LOGIC
  // ======================

  const { UI_WIDTHS } = REPORT_CONFIG.TABLE;
  const tableWidth = calculateTableWidth(UI_WIDTHS);

  useHotkeys("alt+s", fetchDailyMemberCollectionDetailReport, {
    preventDefault: true,
    enableOnFormTags: true,
  });
  useHotkeys("alt+p", exportPDFHandler, {
    preventDefault: true,
    enableOnFormTags: true,
  });
  useHotkeys("alt+e", handleDownloadCSV, {
    preventDefault: true,
    enableOnFormTags: true,
  });
  useHotkeys("esc", () => navigate("/MainPage"));

  const [setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const softTableStyles = {
    softBoxShadow:
      "0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.03)",
    softBorderColor: "#e9ecef",
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
    transition: isSidebarVisible
      ? "left 3s ease-in-out, width 2s ease-in-out"
      : "left 3s ease-in-out, width 2s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    overflowX: "auto",
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

  const [isFilterApplied] = useState(false);
  let totalEnteries = 0;
  const [selectedRowId] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const rowRefs = useRef([]);
  const handleRowClick = (index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (isFilterApplied || sortedTableData.length > 0) {
      setSelectedIndex(0);
      rowRefs.current[0]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      setSelectedIndex(-1);
    }
  }, [sortedTableData, isFilterApplied]);

  useEffect(() => {
    if (selectedRowId !== null) {
      const newIndex = sortedTableData.findIndex(
        (item) => item.tcmpcod === selectedRowId
      );
      setSelectedIndex(newIndex);
    }
  }, [sortedTableData, selectedRowId]);

  const handleKeyDown = (e) => {
    if (selectedIndex === -1) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      scrollToSelectedRow();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, sortedTableData.length - 1)
      );
      scrollToSelectedRow();
    }
  };

  const scrollToSelectedRow = () => {
    if (selectedIndex !== -1 && rowRefs.current[selectedIndex]) {
      rowRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    if (selectedIndex !== -1 && rowRefs.current[selectedIndex]) {
      rowRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  const handleRadioChange = (days) => {
    setSelectedRadio(days === 0 ? "custom" : `${days}days`);
    if (days !== 0) {
      const toDate = convertToDate(toInputDate);
      const fromDate = new Date(toDate);
      fromDate.setUTCDate(fromDate.getUTCDate() - days);
      setSelectedfromDate(fromDate);
      setfromInputDate(formatDate(fromDate));
    }
  };

  useEffect(() => {
    if (selectedRadio === "custom") {
      const currentDate = new Date();
      const firstDateOfCurrentMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      setSelectedfromDate(firstDateOfCurrentMonth);
      setfromInputDate(formatDate(firstDateOfCurrentMonth));
      setSelectedToDate(currentDate);
      settoInputDate(formatDate(currentDate));
    } else {
      const days = parseInt(selectedRadio.replace("days", ""));
      if (!isNaN(days) && toInputDate) {
        const toDate = convertToDate(toInputDate);
        const fromDate = new Date(toDate);
        fromDate.setUTCDate(fromDate.getUTCDate() - days);
        setSelectedfromDate(fromDate);
        setfromInputDate(formatDate(fromDate));
      }
    }
  }, [selectedRadio, toInputDate]);

  const focusNextElement = (currentRef, nextRef) => {
    if (currentRef.current && nextRef.current) {
      currentRef.current.focus();
      nextRef.current.focus();
    }
  };

  const validateAndFormatDate = (
    inputDate,
    dateRef,
    nextRef,
    isToDate = false
  ) => {
    const formattedDate = inputDate.replace(
      /^(\d{2})(\d{2})(\d{4})$/,
      "$1-$2-$3"
    );

    if (
      !/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(formattedDate)
    ) {
      toast.error("Date must be in the format dd-mm-yyyy");
      return null;
    }

    const [day, month, year] = formattedDate.split("-").map(Number);
    const enteredDate = new Date(year, month - 1, day);
    const daysInMonth = new Date(year, month, 0).getDate();

    if (month < 1 || month > 12 || day < 1 || day > daysInMonth) {
      toast.error("Invalid date. Please check the day and month.");
      return null;
    }

    if (enteredDate < GlobalfromDate || enteredDate > GlobaltoDate) {
      toast.error(
        `Date must be between ${GlobalfromDate1} and ${GlobaltoDate1}`
      );
      return null;
    }

    if (isToDate) {
      const fromDateToCheck = fromInputDate.replace(
        /^(\d{2})(\d{2})(\d{4})$/,
        "$1-$2-$3"
      );
      if (enteredDate < convertToDate(fromDateToCheck)) {
        toast.error("To date must be after from date");
        return null;
      }
    }
    dateRef.current.value = formattedDate;

    if (nextRef) {
      focusNextElement(dateRef, nextRef);
    }

    return formattedDate;
  };

  const handleFromDateEnter = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const result = validateAndFormatDate(e.target.value, fromRef, toRef);
    if (result) {
      setfromInputDate(result);
    }
  };

  const handleToDateEnter = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const result = validateAndFormatDate(
      e.target.value,
      toRef,
      selectButtonRef,
      true
    );
    if (result) {
      settoInputDate(result);
      selectButtonRef.current.focus();
    }
  };

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

  return (
    <>
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .table-scroll::-webkit-scrollbar {
              display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .table-scroll {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
          }
          /* Custom style for sortable header */
          .sortable-header {
            cursor: pointer;
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center; /* Center the content */
            width: 100%; /* Ensure it takes full cell width */
          }
        `}
      </style>
      <ToastContainer />
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
          <NavComponent textdata={reportName} />

          <div
            className="d-flex align-items-center"
            style={{
              flex: "1 1 auto",
              minWidth: "260px",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              {["custom", "30days", "60days", "90days"].map((val) => (
                <div
                  key={val}
                  className="d-flex align-items-baseline"
                  style={{ marginRight: "8px" }}
                >
                  <input
                    type="radio"
                    name="dateRange"
                    id={val}
                    checked={selectedRadio === val}
                    onChange={() =>
                      handleRadioChange(
                        val === "custom" ? 0 : parseInt(val.replace("days", ""))
                      )
                    }
                  />
                  &nbsp;
                  <label
                    htmlFor={val}
                    style={{
                      fontSize: getdatafontsize,
                      fontFamily: getfontstyle,
                    }}
                  >
                    {val === "custom" ? "Custom" : val.replace("days", " Days")}
                  </label>
                </div>
              ))}
            </div>
          </div>
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
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div
                className="d-flex align-items-center"
                style={{
                  flex: "1 1 auto",
                  minWidth: "220px",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <label htmlFor="fromDatePicker">
                    <span
                      style={{
                        fontSize: getdatafontsize,
                        fontFamily: getfontstyle,
                        fontWeight: "bold",
                      }}
                    >
                      From :&nbsp;
                    </span>
                  </label>
                </div>
                <div
                  id="fromdatevalidation"
                  style={{
                    width: "135px",
                    border: `1px solid ${fontcolor}`,
                    display: "flex",
                    alignItems: "center",
                    height: "24px",
                    justifyContent: "center",
                    background: getcolor,
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.border = "2px solid red")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.border = `1px solid ${fontcolor}`)
                  }
                >
                  <input
                    style={{
                      height: "20px",
                      width: "90px",
                      paddingLeft: "5px",
                      outline: "none",
                      border: "none",
                      fontSize: getdatafontsize,
                      fontFamily: getfontstyle,
                      backgroundColor: getcolor,
                      color: fontcolor,
                      opacity: selectedRadio === "custom" ? 1 : 0.5,
                      pointerEvents:
                        selectedRadio === "custom" ? "auto" : "none",
                    }}
                    id="frominputid"
                    value={fromInputDate}
                    ref={fromRef}
                    onChange={handlefromInputChange}
                    onKeyDown={handleFromDateEnter}
                    autoComplete="off"
                    placeholder="dd-mm-yyyy"
                    aria-label="Date Input"
                    disabled={selectedRadio !== "custom"}
                  />
                  <DatePicker
                    selected={selectedfromDate}
                    onChange={handlefromDateChange}
                    dateFormat="dd-MM-yyyy"
                    popperPlacement="bottom"
                    showPopperArrow={false}
                    open={fromCalendarOpen}
                    dropdownMode="select"
                    customInput={
                      <div>
                        <BsCalendar
                          onClick={
                            selectedRadio === "custom"
                              ? toggleFromCalendar
                              : undefined
                          }
                          style={{
                            cursor:
                              selectedRadio === "custom"
                                ? "pointer"
                                : "default",
                            marginLeft: "18px",
                            fontSize: getdatafontsize,
                            fontFamily: getfontstyle,
                            color: fontcolor,
                            opacity: selectedRadio === "custom" ? 1 : 0.5,
                          }}
                          disabled={selectedRadio !== "custom"}
                        />
                      </div>
                    }
                    disabled={selectedRadio !== "custom"}
                  />
                </div>
              </div>

              <div
                className="d-flex align-items-center"
                style={{
                  flex: "1 1 auto",
                  minWidth: "200px",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <label htmlFor="toDatePicker">
                    <span
                      style={{
                        fontSize: getdatafontsize,
                        fontFamily: getfontstyle,
                        fontWeight: "bold",
                      }}
                    >
                      To :&nbsp;
                    </span>
                  </label>
                </div>
                <div
                  id="todatevalidation"
                  style={{
                    width: "135px",
                    border: `1px solid ${fontcolor}`,
                    display: "flex",
                    alignItems: "center",
                    height: "24px",
                    justifyContent: "center",
                    background: getcolor,
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.border = "2px solid red")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.border = `1px solid ${fontcolor}`)
                  }
                >
                  <input
                    ref={toRef}
                    style={{
                      height: "20px",
                      width: "90px",
                      paddingLeft: "5px",
                      outline: "none",
                      border: "none",
                      fontSize: getdatafontsize,
                      fontFamily: getfontstyle,
                      backgroundColor: getcolor,
                      color: fontcolor,
                      opacity: selectedRadio === "custom" ? 1 : 0.5,
                      pointerEvents:
                        selectedRadio === "custom" ? "auto" : "none",
                    }}
                    value={toInputDate}
                    onChange={handleToInputChange}
                    onKeyDown={handleToDateEnter}
                    id="toDatePicker"
                    autoComplete="off"
                    placeholder="dd-mm-yyyy"
                    aria-label="To Date Input"
                    disabled={selectedRadio !== "custom"}
                  />
                  <DatePicker
                    selected={selectedToDate}
                    onChange={handleToDateChange}
                    dateFormat="dd-MM-yyyy"
                    popperPlacement="bottom"
                    showPopperArrow={false}
                    open={toCalendarOpen}
                    dropdownMode="select"
                    customInput={
                      <div>
                        <BsCalendar
                          onClick={
                            selectedRadio === "custom"
                              ? toggleToCalendar
                              : undefined
                          }
                          style={{
                            cursor:
                              selectedRadio === "custom"
                                ? "pointer"
                                : "default",
                            marginLeft: "18px",
                            fontSize: getdatafontsize,
                            fontFamily: getfontstyle,
                            color: fontcolor,
                            opacity: selectedRadio === "custom" ? 1 : 0.5,
                          }}
                          disabled={selectedRadio !== "custom"}
                        />
                      </div>
                    }
                    disabled={selectedRadio !== "custom"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Header Container Div - Removed negative margin */}
            <div
              style={{
                overflowY: "auto",
                width: "100%",
                overflowX: "hidden",
              }}
            >
              <table
                className="myTable"
                id="tableBody"
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
                          padding: "12px 8px",
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
            {/* Table Body Container Div */}
            <div
              className="table-scroll"
              style={{
                backgroundColor: "white",
                borderBottom: `1px solid ${softTableStyles.softBorderColor}`,
                overflowY: "auto",
                maxHeight: "50vh",
                width: "100%",
                wordBreak: "break-word",
                overflowX: "auto",
              }}
            >
              <table
                className="myTable"
                id="tableBody"
                style={{
                  fontSize: getdatafontsize,
                  fontFamily: getfontstyle,
                  width: "100%",
                  position: "relative",
                  ...(sortedTableData.length > 0 ? { tableLayout: "fixed" } : {}), 
                }}
              >
                <tbody id="tablebody">
                  {isLoading ? (
                    <>
                      <tr
                        style={{
                          backgroundColor: getcolor,
                        }}
                      >
                        <td
                          colSpan={columnsConfig.length}
                          className="text-center"
                        >
                          <Spinner animation="border" variant="primary" />
                        </td>
                      </tr>
                      {Array.from({ length: Math.max(0, 27 - 5) }).map(
                        (_, rowIndex) => (
                          <tr
                            key={`blank-${rowIndex}`}
                            style={{
                              backgroundColor: getcolor,
                              color: fontcolor,
                            }}
                          >
                            {columnsConfig.map((_, colIndex) => (
                              <td key={`blank-${rowIndex}-${colIndex}`}>
                                &nbsp;
                              </td>
                            ))}
                          </tr>
                        )
                      )}
                      <tr>
                        {columnsConfig.map((column, index) => (
                          <td
                            key={`dummy-${index}`}
                            style={{ width: column.uiWidth }}
                          ></td>
                        ))}
                      </tr>
                    </>
                  ) : (
                    <>
                      {sortedTableData.map((item, i) => { 
                        totalEnteries += 1;
                        return (
                          <tr
                            key={`${i}-${selectedIndex}`}
                            ref={(el) => (rowRefs.current[i] = el)}
                            onClick={() => handleRowClick(i)}
                            className={
                              selectedIndex === i ? "selected-background" : ""
                            }
                            style={{
                              color: fontcolor,
                              backgroundColor:
                                selectedIndex === i
                                  ? softTableStyles.softSelectedColor
                                  : getcolor,
                              transition: "background-color 0.2s ease",
                            }}
                          >
                            {columnsConfig.map((column, index) => (
                              <td
                                key={index}
                                className={getAlignmentClass(column.alignment)}
                                style={{
                                  width: column.uiWidth,
                                  padding: "10px 8px",
                                  borderBottom: `1px solid ${softTableStyles.softRowSeparator}`, 
                                }}
                              >
                                {item[column.key]}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
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
                            <td key={`blank-${rowIndex}-${colIndex}`}>
                              &nbsp;
                            </td>
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
              const isTotalColumn = index === TOTAL_COLUMN_INDEX;
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
                  }}
                >
                  {isTotalColumn ? (
                    <span className="mobileledger_total">
                      {totalCollection}
                    </span>
                  ) : index === 0 ? (
                    "Total"
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
          {/* Action Buttons */}
          <div
            style={{
              margin: "5px",
              marginBottom: "2px",
            }}
          >
            <SingleButton
              to="/MainPage"
              text="Return"
              onFocus={(e) => (e.currentTarget.style.border = "2px solid red")}
              onBlur={(e) =>
                (e.currentTarget.style.border = `1px solid ${fontcolor}`)
              }
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
              onClick={handleDownloadCSV}
              onFocus={(e) => (e.currentTarget.style.border = "2px solid red")}
              onBlur={(e) =>
                (e.currentTarget.style.border = `1px solid ${fontcolor}`)
              }
            />
            <SingleButton
              id="searchsubmit"
              text="Select"
              ref={selectButtonRef}
              onClick={fetchDailyMemberCollectionDetailReport}
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