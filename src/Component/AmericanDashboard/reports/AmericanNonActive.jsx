// // import React, { useEffect, useState, useMemo } from "react";
// // import axios from "axios";
// // import { useTheme } from "../../../ThemeContext";
// // import NavComponent from "../../MainComponent/Navform/navbarform";
// // import SingleButton from "../../MainComponent/Button/SingleButton/SingleButton";
// // import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// // import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
// // import "../AmericanDashboard.css";
// // import jsPDF from "jspdf";
// // import ExcelJS from "exceljs";
// // import { saveAs } from "file-saver";

// // const REPORT_NAME = "American Non-Active Customers";
// // const COMPANY_NAME = "CRYSTAL SOLUTIONS";

// // const columnsConfig = [
// //   {
// //     header: "Code",
// //     key: "tacccod",
// //     alignment: "left",
// //     uiWidth: 80,
// //     pdfWidth: 20,
// //     excelWidth: 15,
// //   },
// //   {
// //     header: "Name",
// //     key: "tcstdsc",
// //     alignment: "left",
// //     uiWidth: 360,
// //     pdfWidth: 80,
// //     excelWidth: 40,
// //   },
// //   // {
// //   //   header: "Salesman",
// //   //   key: "SalesMan",
// //   //   alignment: "left",
// //   //   uiWidth: 200,
// //   //   pdfWidth: 35,
// //   //   excelWidth: 30,
// //   // },
// //   {
// //     header: "Mobile",
// //     key: "tmobnum",
// //     alignment: "left",
// //     uiWidth: 110,
// //     pdfWidth: 25,
// //     excelWidth: 20,
// //   },
// //   {
// //     header: "Opening",
// //     key: "Opening",
// //     alignment: "right",
// //     uiWidth: 120,
// //     pdfWidth: 25,
// //     excelWidth: 18,
// //   },{
// //     header: "Debit",
// //     key: "Debit",
// //     alignment: "right",
// //     uiWidth: 120,
// //     pdfWidth: 25,
// //     excelWidth: 18,
// //   },{
// //     header: "Credit",
// //     key: "Credit",
// //     alignment: "right",
// //     uiWidth: 120,
// //     pdfWidth: 25,
// //     excelWidth: 18,
// //   },

// //   {
// //     header: "Balance",
// //     key: "Balance",
// //     alignment: "right",
// //     uiWidth: 120,
// //     pdfWidth: 25,
// //     excelWidth: 18,
// //   },
// //   {
// //     header: "",
// //     key: "scrollSpacer",
// //     alignment: "center",
// //     uiWidth: 20,
// //     pdfWidth: 0,
// //     excelWidth: 0,
// //   },
// // ];

// // export default function AmericanNonActive() {
// //   const [rows, setRows] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [selectedRowIndex, setSelectedRowIndex] = useState(null);

// //   const [sortConfig, setSortConfig] = useState({
// //     key: null,
// //     direction: "ascending",
// //   });

// //   const {
// //     isSidebarVisible,
// //     getcolor,
// //     fontcolor,
// //     getnavbarbackgroundcolor,
// //     getfontstyle,
// //     getdatafontsize,
// //   } = useTheme();

// //   // ----------- FETCH API (same as pehle) -----------
// //   // === API CALL =====
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setIsLoading(true);

// //         const form = new FormData();
// //         form.append("code", "AMRELEC");

// //         const res = await axios.post(
// //           "https://crystalsolutions.com.pk/api/AmericanNonActiveCustomers.php",
// //           form,
// //           { timeout: 20000 }
// //         );

// //         const arr = res?.data?? [];
// //         setRows(arr);
// //       } catch (err) {
// //         console.error("FetchError:", err);
// //         setRows([]);
// //       }
// //       setIsLoading(false);
// //     };
// //     fetchData();
// //   }, []);
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////           DESIGN 1
// //   // const exportPDFHandler = () => {
// //   //   const doc = new jsPDF({ orientation: "portrait" });

// //   //   // -------- PDF CONFIG ----------
// //   //   const topMargin = 16; // top space for header
// //   //   const rowHeight = 5; // normal row height
// //   //   const headerHeight = 8; // table header height
// //   //   const maxRowY = 280; // printable area before adding new page

// //   //   // ------- TITLE --------
// //   //   function drawTitle() {
// //   //     doc.setFont("Helvetica", "bold");
// //   //     doc.setFontSize(20);
// //   //     doc.text("CRYSTAL SOLUTIONS", 105, 16, { align: "center" });

// //   //     doc.setFont("Helvetica", "normal");
// //   //     doc.setFontSize(13);
// //   //     doc.text(REPORT_NAME, 105, 24, { align: "center" });
// //   //   }

// //   //   // --------- TABLE HEADER ---------
// //   //   const pdfColumns = columnsConfig.filter((c) => c.key !== "scrollSpacer");
// //   //   const keys = pdfColumns.map((c) => c.key);
// //   //   const headers = pdfColumns.map((c) => c.header);
// //   //   const colWidths = pdfColumns.map((c) => c.pdfWidth);

// //   //   const tableWidth = colWidths.reduce((a, b) => a + b, 0);
// //   //   const startX = (210 - tableWidth) / 2; // page width 210mm
// //   //   let y = 32;

// //   //   function drawHeader() {
// //   //     doc.setFont("Helvetica", "bold");
// //   //     doc.setFontSize(9);
// //   //     let curX = startX;

// //   //     headers.forEach((header, i) => {
// //   //       let w = colWidths[i];
// //   //       doc.setFillColor(220);
// //   //       doc.rect(curX, y, w, headerHeight, "F");
// //   //       doc.rect(curX, y, w, headerHeight);
// //   //       doc.text(String(header), curX + w / 2, y + headerHeight - 3, {
// //   //         align: "center",
// //   //       });
// //   //       curX += w;
// //   //     });

// //   //     y += headerHeight;
// //   //   }

// //   //   // ---------- DRAW ONE ROW ----------
// //   //   function drawRow(row, isTotal) {
// //   //     let curX = startX;

// //   //     row.forEach((cell, cIndex) => {
// //   //       let w = colWidths[cIndex];
// //   //       doc.rect(curX, y, w, rowHeight);

// //   //       doc.setFont("Helvetica", isTotal ? "bold" : "normal");
// //   //       doc.setFontSize(8);

// //   //       if (cIndex === colWidths.length - 1) {
// //   //         doc.text(String(cell), curX + w - 2, y + rowHeight - 2, {
// //   //           align: "right",
// //   //         });
// //   //       } else {
// //   //         doc.text(String(cell), curX + 2, y + rowHeight - 2);
// //   //       }
// //   //       curX += w;
// //   //     });

// //   //     y += rowHeight;
// //   //   }

// //   //   // ---------- PAGE BREAK HANDLER -----------
// //   //   function checkPageBreak() {
// //   //     if (y > maxRowY) {
// //   //       doc.addPage();
// //   //       y = topMargin;
// //   //       drawTitle();
// //   //       y = 32;
// //   //       drawHeader();
// //   //     }
// //   //   }

// //   //   // ---------- START PRINT ----------
// //   //   drawTitle();
// //   //   y = 32;
// //   //   drawHeader();

// //   //   const dataRows = sortedTableData.map((row) =>
// //   //     keys.map((key) => row[key] ?? "")
// //   //   );
// //   //   const totalRow = new Array(keys.length).fill("");
// //   //   totalRow[0] = sortedTableData.length.toString();

// //   //   totalRow[keys.length - 1] = totalBalance.toLocaleString();
// //   //   const rowsPDF = [...dataRows, totalRow];

// //   //   rowsPDF.forEach((row, index) => {
// //   //     const isTotal = index === rowsPDF.length - 1;
// //   //     checkPageBreak();
// //   //     drawRow(row, isTotal);
// //   //   });

// //   //   // ---------- SAVE ----------
// //   //   doc.save(`${REPORT_NAME}.pdf`);
// //   // };

// //   // ======================= EXCEL EXPORT =======================
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////           DESIGN 2
// //   const exportPDFHandler = () => {
// //     const doc = new jsPDF({ orientation: "portrait" });

// //     // -------- PDF CONFIG ----------
// //     const topMargin = 16;
// //     const rowHeight = 5;
// //     const headerHeight = 8;
// //     const maxRowY = 280;

// //     // ------- TITLE --------
// //     function drawTitle() {
// //       // Company name (FORMAT-2 style)
// //       doc.setFont("Helvetica", "bold");
// //       doc.setFontSize(20);
// //       doc.text("CRYSTAL SOLUTIONS", 105, 16, { align: "center" });

// //       // Report name
// //       doc.setFont("Helvetica", "normal");
// //       doc.setFontSize(12);
// //       doc.text(REPORT_NAME, 105, 24, { align: "center" });
// //     }

// //     // --------- TABLE HEADER ---------
// //     const pdfColumns = columnsConfig.filter((c) => c.key !== "scrollSpacer");
// //     const keys = pdfColumns.map((c) => c.key);
// //     const headers = pdfColumns.map((c) => c.header);
// //     const colWidths = pdfColumns.map((c) => c.pdfWidth);

// //     const tableWidth = colWidths.reduce((a, b) => a + b, 0);
// //     const startX = (210 - tableWidth) / 2;
// //     let y = 32;

// //     function drawHeader() {
// //       doc.setFont("Helvetica", "bold"); // FORMAT-2 header font
// //       doc.setFontSize(9);

// //       let curX = startX;
// //       headers.forEach((header, i) => {
// //         const w = colWidths[i];
// //         doc.rect(curX, y, w, headerHeight);
// //         doc.text(
// //           String(header).toUpperCase(),
// //           curX + w / 2,
// //           y + headerHeight - 3,
// //           { align: "center" }
// //         );
// //         curX += w;
// //       });

// //       y += headerHeight;
// //     }

// //     // ---------- DRAW ONE ROW ----------
// //     function drawRow(row, isTotal) {
// //       let curX = startX;

// //       row.forEach((cell, cIndex) => {
// //         const w = colWidths[cIndex];
// //         doc.rect(curX, y, w, rowHeight);

// //         // FORMAT-2 row font logic
// //         doc.setFont("Helvetica", isTotal ? "bold" : "normal");
// //         doc.setFontSize(8);

// //         if (cIndex === colWidths.length - 1) {
// //           doc.text(String(cell), curX + w - 2, y + rowHeight - 2, {
// //             align: "right",
// //           });
// //         } else {
// //           doc.text(String(cell), curX + 2, y + rowHeight - 2);
// //         }

// //         curX += w;
// //       });

// //       y += rowHeight;
// //     }

// //     // ---------- PAGE BREAK HANDLER ----------
// //     function checkPageBreak() {
// //       if (y > maxRowY) {
// //         doc.addPage();
// //         drawTitle();
// //         y = 32;
// //         drawHeader();
// //       }
// //     }

// //     // ---------- START PRINT ----------
// //     drawTitle();
// //     drawHeader();

// //     const dataRows = sortedTableData.map((row) =>
// //       keys.map((key) => row[key] ?? "")
// //     );

// //     const totalRow = new Array(keys.length).fill("");
// //     totalRow[0] = "TOTAL";
// //     totalRow[keys.length - 1] = totalBalance.toLocaleString();

// //     [...dataRows, totalRow].forEach((row, index) => {
// //       checkPageBreak();
// //       drawRow(row, index === dataRows.length);
// //     });

// //     // ---------- SAVE ----------
// //     doc.save(`${REPORT_NAME}.pdf`);
// //   };

// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////
// //   ///////////////////////////////////////////////////////////           DESIGN 3
// //   // const exportPDFHandler = () => {
// //   //   const doc = new jsPDF("p", "mm", "a4");

// //   //   const rowHeight = 6;
// //   //   const headerHeight = 8;
// //   //   const maxRowY = 280;

// //   //   const COLORS = {
// //   //     headerBg: [226, 232, 240], // light navy blue
// //   //     rowAlt: [248, 249, 255],
// //   //     totalBg: [226, 232, 240],
// //   //     textDark: [40, 40, 40],
// //   //     line: [200, 200, 200],
// //   //   };

// //   //   /* ---------- TITLE (NO PURPLE BOX) ---------- */
// //   //   const drawTitle = () => {
// //   //     doc.setFont("Helvetica", "bold");
// //   //     doc.setFontSize(20);
// //   //     doc.setTextColor(...COLORS.textDark);
// //   //     doc.text("CRYSTAL SOLUTIONS", 105, 16, { align: "center" });

// //   //     doc.setFont("Helvetica", "normal");
// //   //     doc.setFontSize(12);
// //   //     doc.text(REPORT_NAME, 105, 23, { align: "center" });

// //   //     // soft separator line
// //   //     doc.setDrawColor(...COLORS.line);
// //   //     doc.line(14, 26, 196, 26);
// //   //   };

// //   //   /* ---------- TABLE CONFIG ---------- */
// //   //   const pdfColumns = columnsConfig.filter((c) => c.key !== "scrollSpacer");
// //   //   const keys = pdfColumns.map((c) => c.key);
// //   //   const headers = pdfColumns.map((c) => c.header);
// //   //   const colWidths = pdfColumns.map((c) => c.pdfWidth);

// //   //   const tableWidth = colWidths.reduce((a, b) => a + b, 0);
// //   //   const startX = (210 - tableWidth) / 2;
// //   //   let y = 32;

// //   //   /* ---------- HEADER (NO BLACK BORDERS) ---------- */
// //   //   const drawHeader = () => {
// //   //     let curX = startX;

// //   //     doc.setFont("Helvetica", "bold");
// //   //     doc.setFontSize(9);
// //   //     doc.setFillColor(...COLORS.headerBg);
// //   //     doc.rect(startX, y, tableWidth, headerHeight, "F");

// //   //     headers.forEach((h, i) => {
// //   //       const w = colWidths[i];
// //   //       doc.text(String(h).toUpperCase(), curX + w / 2, y + 5, {
// //   //         align: "center",
// //   //       });
// //   //       curX += w;
// //   //     });

// //   //     // only bottom line (clean look)
// //   //     doc.setDrawColor(...COLORS.line);
// //   //     doc.line(startX, y + headerHeight, startX + tableWidth, y + headerHeight);

// //   //     y += headerHeight;
// //   //   };

// //   //   /* ---------- ROW ---------- */
// //   //   const drawRow = (row, index, isTotal) => {
// //   //     let curX = startX;

// //   //     if (!isTotal && index % 2 === 0) {
// //   //       doc.setFillColor(...COLORS.rowAlt);
// //   //       doc.rect(startX, y, tableWidth, rowHeight, "F");
// //   //     }

// //   //     if (isTotal) {
// //   //       doc.setFillColor(...COLORS.totalBg);
// //   //       doc.rect(startX, y, tableWidth, rowHeight, "F");
// //   //     }

// //   //     row.forEach((cell, i) => {
// //   //       const w = colWidths[i];
// //   //       doc.setFont("Helvetica", isTotal ? "bold" : "normal");
// //   //       doc.setFontSize(8);

// //   //       doc.text(
// //   //         String(cell),
// //   //         i === row.length - 1 ? curX + w - 2 : curX + 2,
// //   //         y + 4,
// //   //         { align: i === row.length - 1 ? "right" : "left" }
// //   //       );

// //   //       curX += w;
// //   //     });

// //   //     y += rowHeight;
// //   //   };

// //   //   /* ---------- PAGE BREAK ---------- */
// //   //   const checkPageBreak = () => {
// //   //     if (y > maxRowY) {
// //   //       doc.addPage();
// //   //       drawTitle();
// //   //       y = 32;
// //   //       drawHeader();
// //   //     }
// //   //   };

// //   //   /* ---------- PRINT ---------- */
// //   //   drawTitle();
// //   //   drawHeader();

// //   //   const dataRows = sortedTableData.map((r) => keys.map((k) => r[k] ?? ""));
// //   //   const totalRow = new Array(keys.length).fill("");
// //   //   totalRow[0] = "TOTAL";
// //   //   totalRow[keys.length - 1] = totalBalance.toLocaleString();

// //   //   [...dataRows, totalRow].forEach((row, i) => {
// //   //     checkPageBreak();
// //   //     drawRow(row, i, i === dataRows.length);
// //   //   });

// //   //   doc.save(`${REPORT_NAME}_Modern.pdf`);
// //   // };

// //   async function exportCSV({
// //     rows,
// //     columnsConfig,
// //     totalCollection,
// //     companyName,
// //     reportName,
// //   }) {
// //     const workbook = new ExcelJS.Workbook();
// //     const worksheet = workbook.addWorksheet("Report");

// //     const excelColumns = columnsConfig.filter((c) => c.key !== "scrollSpacer");

// //     const headers = excelColumns.map((c) => c.header);
// //     const keys = excelColumns.map((c) => c.key);

// //     worksheet.addRow([companyName]);
// //     worksheet.mergeCells(1, 1, 1, headers.length);
// //     worksheet.getRow(1).font = { bold: true, size: 16 };
// //     worksheet.getRow(1).alignment = { horizontal: "center" };

// //     worksheet.addRow([reportName]);
// //     worksheet.mergeCells(2, 1, 2, headers.length);
// //     worksheet.getRow(2).alignment = { horizontal: "center" };
// //     worksheet.addRow([]);

// //     const headerRow = worksheet.addRow(headers);
// //     headerRow.eachCell((cell) => {
// //       cell.font = { bold: true };
// //       cell.alignment = { horizontal: "center" };
// //       cell.border = {
// //         top: { style: "thin" },
// //         left: { style: "thin" },
// //         bottom: { style: "thin" },
// //         right: { style: "thin" },
// //       };
// //     });

// //     rows.forEach((item) => {
// //       const row = worksheet.addRow(keys.map((key) => item[key]));
// //       row.eachCell((cell, index) => {
// //         cell.border = {
// //           top: { style: "thin" },
// //           left: { style: "thin" },
// //           bottom: { style: "thin" },
// //           right: { style: "thin" },
// //         };
// //         cell.alignment = {
// //           horizontal: "left",
// //         };
// //       });
// //     });

// //     const totalRowData = new Array(headers.length).fill("");
// //     totalRowData[0] = rows.length.toString();
// //     totalRowData[headers.length - 1] = totalCollection.toLocaleString();
// //     const totalRow = worksheet.addRow(totalRowData);

// //     totalRow.eachCell((cell) => {
// //       cell.font = { bold: true };
// //       cell.border = {
// //         top: { style: "double" },
// //         left: { style: "thin" },
// //         bottom: { style: "double" },
// //         right: { style: "thin" },
// //       };
// //     });

// //     excelColumns.forEach((col, i) => {
// //       worksheet.getColumn(i + 1).width = col.excelWidth || col.uiWidth || 20;
// //     });

// //     const buffer = await workbook.xlsx.writeBuffer();
// //     saveAs(
// //       new Blob([buffer], {
// //         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// //       }),
// //       `${reportName}.xlsx`
// //     );
// //   }

// //   // ----------- WIDTH / TABLE SIZE -----------
// //   const totalUiWidth = columnsConfig.reduce(
// //     (sum, col) => sum + Number(col.uiWidth),
// //     0
// //   );
// //   const tableWidth = `${totalUiWidth}px`;

// //   const softTableStyles = {
// //     softBoxShadow:
// //       "0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.03)",
// //     softBorderColor: "#00000026",
// //     softRowSeparator: "#f8f9fa",
// //     softSelectedColor: "#f0f8ff",
// //   };

// //   const contentStyle = {
// //     backgroundColor: getcolor,
// //     width: tableWidth,
// //     position: "fixed",
// //     top: "50%",
// //     left: isSidebarVisible ? "50%" : "50%",
// //     transform: "translate(-50%, -50%)",
// //     transition: "left 0.3s ease-in-out, width 0.3s ease-in-out",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     overflowX: "hidden",
// //     overflowY: "auto",
// //     wordBreak: "break-word",
// //     textAlign: "center",
// //     maxWidth: "95vw",
// //     fontSize: "15px",
// //     fontStyle: "normal",
// //     fontWeight: "400",
// //     lineHeight: "23px",
// //     fontFamily: '"Poppins", sans-serif',
// //   };

// //   // ----------- HELPERS -----------
// //   const getAlignmentClass = (alignment) => {
// //     switch (alignment) {
// //       case "left":
// //         return "text-start";
// //       case "right":
// //         return "text-end";
// //       case "center":
// //         return "text-center";
// //       default:
// //         return "text-start";
// //     }
// //   };

// //   const getSortIcon = (key) => {
// //     // Selected column
// //     if (sortConfig.key === key) {
// //       return sortConfig.direction === "ascending" ? (
// //         <FaSortUp
// //           style={{
// //             marginLeft: "5px",
// //             color: "#e74c3c",
// //             transition: "0.3s",
// //           }}
// //         />
// //       ) : (
// //         <FaSortDown
// //           style={{
// //             marginLeft: "5px",
// //             color: "#e74c3c",
// //             transition: "0.3s",
// //           }}
// //         />
// //       );
// //     }

// //     // Default (unselected)
// //     return (
// //       <FaSortDown
// //         style={{
// //           marginLeft: "5px",
// //           color: "white",
// //           opacity: 0.4,
// //         }}
// //       />
// //     );
// //   };

// //   const requestSort = (key) => {
// //     let direction = "ascending";

// //     if (sortConfig.key === key && sortConfig.direction === "ascending") {
// //       direction = "descending";
// //     }

// //     setSortConfig({ key, direction });
// //   };

// //   // ----------- FILTER + SORT DATA -----------
// //   // const sortedTableData = useMemo(() => {
// //   //   let data = [...rows];

// //   //   if (searchQuery) {
// //   //     const q = searchQuery.toLowerCase();
// //   //     data = data.filter(
// //   //       (row) =>
// //   //         row.tcstcod?.toLowerCase().includes(q) ||
// //   //         row.tmobnum?.toLowerCase().includes(q) ||
// //   //         row.SalesMan?.toLowerCase().includes(q)
// //   //     );
// //   //   }

// //   //   if (sortConfig.key) {
// //   //     data.sort((a, b) => {
// //   //       const aVal = a[sortConfig.key] ?? "";
// //   //       const bVal = b[sortConfig.key] ?? "";

// //   //       // Balance numeric sort
// //   //       if (sortConfig.key === "balance") {
// //   //         const aNum = parseFloat(aVal) || 0;
// //   //         const bNum = parseFloat(bVal) || 0;
// //   //         return sortConfig.direction === "ascending"
// //   //           ? aNum - bNum
// //   //           : bNum - aNum;
// //   //       }

// //   //       return sortConfig.direction === "ascending"
// //   //         ? String(aVal).localeCompare(String(bVal))
// //   //         : String(bVal).localeCompare(String(aVal));
// //   //     });
// //   //   }

// //   //   return data;
// //   // }, [rows, searchQuery, sortConfig]);

// //   const sortedTableData = useMemo(() => {
// //     let data = [...rows];

// //     if (searchQuery) {
// //       const q = searchQuery.toLowerCase().trim();

// //       data = data.filter((row) => {
// //         return (
// //           row.tacccod?.toLowerCase().includes(q) || // ✅ Code
// //           row.tcstdsc?.toLowerCase().includes(q) || // ✅ Name (FIXED)
// //           row.tmobnum?.toLowerCase().includes(q) || // ✅ Mobile
// //           row.Balance?.toString().includes(q) // ✅ Balance
// //         );
// //       });
// //     }

// //     if (sortConfig.key) {
// //       data.sort((a, b) => {
// //         const aVal = a[sortConfig.key] ?? "";
// //         const bVal = b[sortConfig.key] ?? "";

// //         if (sortConfig.key === "Balance") {
// //           return sortConfig.direction === "ascending"
// //             ? parseFloat(aVal || 0) - parseFloat(bVal || 0)
// //             : parseFloat(bVal || 0) - parseFloat(aVal || 0);
// //         }

// //         return sortConfig.direction === "ascending"
// //           ? String(aVal).localeCompare(String(bVal))
// //           : String(bVal).localeCompare(String(aVal));
// //       });
// //     }

// //     return data;
// //   }, [rows, searchQuery, sortConfig]);

// //   const filteredData = useMemo(() => {
// //     let data = rows;

// //     if (searchQuery) {
// //       const q = searchQuery.toLowerCase();
// //       data = data.filter((row) => {
// //         return (
// //           row.tacccod?.toLowerCase().includes(q) ||
// //           row.tmobnum?.toLowerCase().includes(q) ||
// //           row.tcstdsc?.toLowerCase().includes(q) ||
// //           row.Balance?.toString().includes(q)
// //         );
// //       });
// //     }

// //     if (sortConfig.key) {
// //       data = [...data].sort((a, b) => {
// //         const valueA = a[sortConfig.key] ?? "";
// //         const valueB = b[sortConfig.key] ?? "";

// //         if (!isNaN(valueA) && !isNaN(valueB)) {
// //           return sortConfig.direction === "asc"
// //             ? Number(valueA) - Number(valueB)
// //             : Number(valueB) - Number(valueA);
// //         }

// //         return sortConfig.direction === "asc"
// //           ? String(valueA).localeCompare(String(valueB))
// //           : String(valueB).localeCompare(String(valueA));
// //       });
// //     }

// //     return data;
// //   }, [rows, searchQuery, sortConfig]);

// //   const totalBalance = useMemo(() => {
// //     return sortedTableData.reduce((sum, row) => {
// //       const value = parseFloat(row.Balance ?? 0);
// //       return sum + (isNaN(value) ? 0 : value);
// //     }, 0);
// //   }, [sortedTableData]);

// //   const handleCSV = () => {
// //     exportCSV({
// //       rows: sortedTableData,
// //       columnsConfig,
// //       totalCollection: totalBalance,
// //       companyName: COMPANY_NAME,
// //       reportName: REPORT_NAME,
// //     });
// //   };

// //   return (
// //     <>
// //       <style>
// //         {`
// //           .sortable-header {
// //             cursor: pointer;
// //             user-select: none;
// //             display: flex;
// //             align-items: center;
// //             justify-content: center;
// //             width: 100%;
// //           }

// //           .table-scroll {
// //             overflow-y: auto;
// //             overflow-x: hidden;
// //             -ms-overflow-style: auto;
// //             scrollbar-width: auto;
// //           }
// //         `}
// //       </style>

// //       <div style={contentStyle}>
// //         <div
// //           style={{
// //             backgroundColor: getcolor,
// //             color: fontcolor,
// //             width: "100%",
// //             border: `1px solid ${softTableStyles.softBorderColor}`,
// //             borderRadius: "12px",
// //             boxShadow: softTableStyles.softBoxShadow,
// //           }}
// //         >
// //           {/* NAV HEADER BAR (same look as MemberCollectionReport) */}
// //           <NavComponent textdata={REPORT_NAME} />

// //           {/* SEARCH ROW */}
// //           <div
// //             className="row"
// //             style={{
// //               height: "auto",
// //               marginTop: "8px",
// //               marginBottom: "8px",
// //               display: "flex",
// //               justifyContent: "flex-end",
// //               paddingRight: "8px", // table edge se halka gap
// //             }}
// //           >
// //             <div
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "flex-end",
// //                 gap: "10px",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   minWidth: "260px",
// //                   maxWidth: "400px",
// //                   border: `1px solid ${softTableStyles.softBorderColor}`,
// //                   borderRadius: "2px",
// //                   backgroundColor: "white",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   padding: "2px 8px",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     width: "16px",
// //                     height: "16px",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                   }}
// //                 >
// //                   <MagnifyingGlassIcon
// //                     className="text-gray-500"
// //                     style={{ width: "16px", height: "16px" }}
// //                   />
// //                 </div>

// //                 <input
// //                   type="text"
// //                   placeholder="Search..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   style={{
// //                     flex: 1,
// //                     border: "none",
// //                     outline: "none",
// //                     paddingLeft: "6px",
// //                     fontSize: getdatafontsize,
// //                     fontFamily: getfontstyle,
// //                   }}
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           {/* TABLE HEADER (fixed) */}
// //           <div
// //             style={{
// //               overflowY: "auto",
// //               width: "100%",
// //               overflowX: "hidden",
// //             }}
// //           >
// //             <table
// //               className="myTable"
// //               style={{
// //                 fontSize: getdatafontsize,
// //                 fontFamily: getfontstyle,
// //                 width: "100%",
// //                 position: "relative",
// //                 tableLayout: "fixed",
// //               }}
// //             >
// //               <thead
// //                 style={{
// //                   fontSize: getdatafontsize,
// //                   fontFamily: getfontstyle,
// //                   fontWeight: "bold",
// //                   height: "24px",
// //                   position: "sticky",
// //                   top: 0,
// //                   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
// //                   backgroundColor: getnavbarbackgroundcolor,
// //                 }}
// //               >
// //                 <tr
// //                   style={{
// //                     backgroundColor: getnavbarbackgroundcolor,
// //                     color: "white",
// //                   }}
// //                 >
// //                   {columnsConfig.map((column, index) => (
// //                     <td
// //                       key={index}
// //                       onClick={() => requestSort(column.key)}
// //                       style={{
// //                         width: column.uiWidth,
// //                         padding: "8px 6px",
// //                         borderBottom: `2px solid ${softTableStyles.softBorderColor}`,
// //                       }}
// //                     >
// //                       <div className="sortable-header">
// //                         {column.header}
// //                         {getSortIcon(column.key)}
// //                       </div>
// //                     </td>
// //                   ))}
// //                 </tr>
// //               </thead>
// //             </table>
// //           </div>

// //           {/* TABLE BODY */}
// //           <div
// //             className="table-scroll"
// //             style={{
// //               backgroundColor: "white",
// //               borderBottom: `1px solid ${softTableStyles.softBorderColor}`,
// //               maxHeight: "50vh",
// //               width: "100%",
// //               wordBreak: "break-word",
// //             }}
// //           >
// //             <table
// //               className="myTable"
// //               style={{
// //                 fontSize: getdatafontsize,
// //                 fontFamily: getfontstyle,
// //                 width: tableWidth,
// //                 position: "relative",
// //                 ...(sortedTableData.length > 0 ? { tableLayout: "fixed" } : {}),
// //               }}
// //             >
// //               <tbody>
// //                 {isLoading ? (
// //                   <>
// //                     <tr
// //                       style={{
// //                         backgroundColor: getcolor,
// //                         color: fontcolor,
// //                       }}
// //                     >
// //                       <td
// //                         colSpan={columnsConfig.length}
// //                         className="text-center"
// //                         style={{ padding: "10px" }}
// //                       >
// //                         Fetching data...
// //                       </td>
// //                     </tr>
// //                     {Array.from({ length: 20 }).map((_, rowIndex) => (
// //                       <tr
// //                         key={`blank-loading-${rowIndex}`}
// //                         style={{
// //                           backgroundColor: getcolor,
// //                           color: fontcolor,
// //                         }}
// //                       >
// //                         {columnsConfig.map((_, colIndex) => (
// //                           <td key={`blank-loading-${rowIndex}-${colIndex}`}>
// //                             &nbsp;
// //                           </td>
// //                         ))}
// //                       </tr>
// //                     ))}
// //                   </>
// //                 ) : (
// //                   <>
// //                     {sortedTableData.map((item, i) => (
// //                       <tr
// //                         key={i}
// //                         onClick={() => setSelectedRowIndex(i)}
// //                         style={{
// //                           cursor: "pointer",
// //                           color: selectedRowIndex === i ? "white" : fontcolor,
// //                           backgroundColor:
// //                             selectedRowIndex === i
// //                               ? getnavbarbackgroundcolor // ✅ theme color
// //                               : i % 2 === 0
// //                               ? getcolor
// //                               : "#f8f9ff",
// //                           transition: "background-color 0.2s ease",
// //                         }}
// //                       >
// //                         {columnsConfig.map((column, index) => (
// //                           <td
// //                             key={index}
// //                             className={getAlignmentClass(column.alignment)}
// //                             style={{
// //                               width: column.uiWidth,
// //                               padding: "8px 6px",
// //                               borderBottom: `1px solid ${softTableStyles.softRowSeparator}`,
// //                             }}
// //                           >
// //                             {column.key === "scrollSpacer"
// //                               ? "" // ➤ empty column
// //                               : column.key === "balance"
// //                               ? Number(item[column.key] || 0).toLocaleString()
// //                               : item[column.key]}
// //                           </td>
// //                         ))}
// //                       </tr>
// //                     ))}

// //                     {/* Blank rows to keep table height nice */}
// //                     {Array.from({
// //                       length: Math.max(0, 27 - sortedTableData.length),
// //                     }).map((_, rowIndex) => (
// //                       <tr
// //                         key={`blank-${rowIndex}`}
// //                         style={{
// //                           backgroundColor: getcolor,
// //                           color: fontcolor,
// //                         }}
// //                       >
// //                         {columnsConfig.map((_, colIndex) => (
// //                           <td key={`blank-${rowIndex}-${colIndex}`}>&nbsp;</td>
// //                         ))}
// //                       </tr>
// //                     ))}

// //                     {/* Dummy row to keep widths */}
// //                     <tr>
// //                       {columnsConfig.map((column, index) => (
// //                         <td
// //                           key={`dummy-bottom-${index}`}
// //                           style={{ width: column.uiWidth }}
// //                         ></td>
// //                       ))}
// //                     </tr>
// //                   </>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* TOTAL ROW (bottom of table) */}
// //           <div
// //             style={{
// //               borderBottom: `1px solid ${softTableStyles.softBorderColor}`,
// //               borderTop: `2px solid ${softTableStyles.softBorderColor}`,
// //               height: "24px",
// //               display: "flex",
// //               width: "100%",
// //             }}
// //           >
// //             {columnsConfig.map((column, index) => {
// //               const isTotalColumn = index === columnsConfig.length - 2; // ⭐ BALANCE is now 2nd last

// //               const alignmentClass = getAlignmentClass(
// //                 isTotalColumn ? "right" : "left"
// //               );

// //               return (
// //                 <div
// //                   key={`total-col-${index}`}
// //                   className={alignmentClass}
// //                   style={{
// //                     width: column.uiWidth,
// //                     background: getcolor,
// //                     borderRight:
// //                       index < columnsConfig.length - 1
// //                         ? `1px solid ${softTableStyles.softBorderColor}`
// //                         : "none",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: isTotalColumn ? "flex-end" : "flex-start",
// //                     paddingRight: isTotalColumn ? "5px" : "0px",
// //                     paddingLeft: isTotalColumn ? "0px" : "5px",
// //                     fontWeight: "bold",
// //                     fontSize: getdatafontsize,
// //                     fontFamily: getfontstyle,
// //                   }}
// //                 >
// //                   {column.key === "balance" ? (
// //                     <span>{totalBalance.toLocaleString()}</span>
// //                   ) : index === 0 ? (
// //                     <span>{filteredData.length}</span>
// //                   ) : column.key === "scrollSpacer" ? (
// //                     ""
// //                   ) : (
// //                     ""
// //                   )}
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {/* ACTION BUTTONS – Only PDF & Excel */}
// //           <div
// //             style={{
// //               margin: "5px",
// //               marginBottom: "2px",
// //             }}
// //           >
// //             <SingleButton
// //               text="PDF"
// //               onClick={exportPDFHandler}
// //               onFocus={(e) => (e.currentTarget.style.border = "2px solid red")}
// //               onBlur={(e) =>
// //                 (e.currentTarget.style.border = `1px solid ${fontcolor}`)
// //               }
// //             />
// //             <SingleButton
// //               text="Excel"
// //               onClick={handleCSV}
// //               onFocus={(e) => (e.currentTarget.style.border = "2px solid red")}
// //               onBlur={(e) =>
// //                 (e.currentTarget.style.border = `1px solid ${fontcolor}`)
// //               }
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

const REPORT_NAME = "Non-Active Customers";
const COMPANY_NAME = "American Trading";

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
    uiWidth: 300,
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
    header: "SalesMan",
    key: "tsaldsc",
    alignment: "left",
    uiWidth: 120,
    pdfWidth: 25,
    excelWidth: 20,
  },
  {
    header: "Balance",
    key: "Balance",
    alignment: "right",
    uiWidth: 100,
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
const toNumber = (val) => {
  if (val === null || val === undefined) return 0;
  return Number(String(val).replace(/,/g, "")) || 0;
};

export default function AmericanNonActive() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const query = useQueryParams();
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const minParam = query.get("min") || "0";
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

  // === API CALL =====
  // useEffect(() => {
  //   fetchData();
  // }, [minParam, maxParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const form = new FormData();
        form.append("code", "AMRELEC");

        const res = await axios.post(
          "https://crystalsolutions.pk/api/AmericanNonActiveCustomers.php",
          form,
          { timeout: 20000 }
        );

        const arr = res?.data ?? [];
        setRows(arr);
      } catch (err) {
        console.error("FetchError:", err);
        setRows([]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
      (c) => c.key !== "scrollSpacer" && "progressBtn" && "ledgerBtn"
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
      keys.map((key) => row[key] ?? "")
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
      (c) => !["ledgerBtn", "progressBtn", "scrollSpacer"].includes(c.key)
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
          row.tcstdsc?.trim().toLowerCase().includes(q) || // ✅ NAME FIX
          row.tmobnum?.toLowerCase().includes(q) ||
          row.tsaldsc?.toLowerCase().includes(q)
          // row.balance?.toString().includes(q) // ✅ BALANCE
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
        row.tacccod?.toLowerCase().includes(q) ||
        row.tcstdsc?.trim().toLowerCase().includes(q) || // ✅ NAME FIX
        row.tmobnum?.toLowerCase().includes(q) ||
        row.tsaldsc?.toLowerCase().includes(q)
        // row.balance?.toString().includes(q) // ✅ BALANCE
      );
    });
  }, [sortedTableData, searchQuery]);

  const totalBalance = useMemo(() => {
    return filteredData.reduce((sum, row) => {
      const value = toNumber(row.Balance);
      return sum + value;
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
                        ) : column.key === "Balance" ? (
                          toNumber(item.Balance).toLocaleString()
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
                                    item.tacccod
                                  }&name=${encodeURIComponent(item.tcstdsc)}`,
                                  "_blank"
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
                                    item.tacccod
                                  }&name=${encodeURIComponent(item.tcstdsc)}`,
                                  "_blank"
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
                  )
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
                isTotalColumn ? "right" : "left"
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
                  {column.key === "Balance" ? (
                    <span>{toNumber(totalBalance).toLocaleString()}</span>
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

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { useTheme } from "../../../ThemeContext";
// import NavComponent from "../../MainComponent/Navform/navbarform";
// import SingleButton from "../../MainComponent/Button/SingleButton/SingleButton";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import "../AmericanDashboard.css";

// /* ================= CONSTANTS ================= */

// const REPORT_NAME = "Non-Active Customers";

// const TABS = {
//   ALL: "ALL",
//   DAILY: "DAILY",
//   PUBLIC: "PUBLIC",
// };

// const QA_MODE = {
//   QTY: "QTY",
//   ITEM: "ITEM",
// };

// const softTableStyles = {
//   softBorderColor: "#00000026",
// };

// const MONTHS = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// const QTY_VALUES = [30, 45, 60, 75, 55, 70, 40, 85, 50, 65, 35, 80];
// const ITEM_VALUES = [40, 55, 50, 70, 60, 90, 45, 95, 55, 75, 40, 85];

// const columnsConfig = [
//   { header: "Code", key: "tacccod", alignment: "left", uiWidth: 80 },
//   { header: "Name", key: "tcstdsc", alignment: "left", uiWidth: 320 },
//   { header: "Mobile", key: "tmobnum", alignment: "left", uiWidth: 120 },
//   { header: "SalesMan", key: "tsaldsc", alignment: "left", uiWidth: 160 },
//   { header: "Balance", key: "Balance", alignment: "right", uiWidth: 120 },
//   { header: "Quantity-Amount", key: "qa", alignment: "center", uiWidth: 260 },
//   { header: "", key: "scrollSpacer", alignment: "center", uiWidth: 20 },
// ];

// const toNumber = (v) =>
//   v === null || v === undefined ? 0 : Number(String(v).replace(/,/g, "")) || 0;

// /* ================= COMPONENT ================= */

// export default function AmericanNonActiveCustomers() {
//   const {
//     isSidebarVisible,
//     getcolor,
//     fontcolor,
//     getnavbarbackgroundcolor,
//     getfontstyle,
//     getdatafontsize,
//   } = useTheme();

//   const [rows, setRows] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState(TABS.ALL);
//   const [qaMode, setQaMode] = useState(QA_MODE.QTY);

//   /* ================= API ================= */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const form = new FormData();
//         form.append("code", "AMRELEC");
//         const res = await axios.post(
//           "https://crystalsolutions.pk/api/AmericanNilCustomers.php",
//           form,
//           { timeout: 20000 },
//         );
//         setRows(res?.data ?? []);
//       } catch {
//         setRows([]);
//       }
//     };
//     fetchData();
//   }, []);

//   /* ================= FILTER ================= */
//   const filteredData = useMemo(() => {
//     if (!searchQuery) return rows;
//     const q = searchQuery.toLowerCase().trim();
//     return rows.filter(
//       (r) =>
//         r.tacccod?.toLowerCase().includes(q) ||
//         r.tcstdsc?.toLowerCase().includes(q) ||
//         r.tmobnum?.toLowerCase().includes(q) ||
//         r.tsaldsc?.toLowerCase().includes(q),
//     );
//   }, [rows, searchQuery]);

//   const totalBalance = useMemo(
//     () => filteredData.reduce((s, r) => s + toNumber(r.Balance), 0),
//     [filteredData],
//   );

//   const totalUiWidth = columnsConfig.reduce(
//     (sum, col) => sum + Number(col.uiWidth),
//     0,
//   );
//   const tableWidth = `${totalUiWidth}px`;

//   const contentStyle = {
//     backgroundColor: getcolor,
//     width: tableWidth,
//     position: "fixed",
//     top: "50%",
//     left: isSidebarVisible ? "50%" : "50%",
//     transform: "translate(-50%, -50%)",
//     maxWidth: "95vw",
//   };

//   return (
//     <div style={contentStyle}>
//       <div
//         style={{
//           backgroundColor: getcolor,
//           color: fontcolor,
//           borderRadius: 12,
//           border: "1px solid #00000026",
//         }}
//       >
//         <NavComponent textdata={REPORT_NAME} />

//         {/* SEARCH */}
//         <div
//           style={{ display: "flex", justifyContent: "flex-end", padding: 8 }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               background: "white",
//               border: "1px solid #ccc",
//               padding: "2px 8px",
//               width: 260,
//             }}
//           >
//             <MagnifyingGlassIcon style={{ width: 16, height: 16 }} />
//             <input
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search..."
//               style={{
//                 border: "none",
//                 outline: "none",
//                 marginLeft: 6,
//                 fontSize: getdatafontsize,
//                 fontFamily: getfontstyle,
//                 width: "100%",
//               }}
//             />
//           </div>
//         </div>

//         {/* ================= TABLE HEADER ================= */}
//         <table
//           className="myTable"
//           style={{
//             width: tableWidth,
//             tableLayout: "fixed",
//             fontSize: getdatafontsize,
//             fontFamily: getfontstyle,
//             paddingRight: "14px", // ✅ scrollbar compensation
//           }}
//         >
//           <thead
//             style={{
//               backgroundColor: getnavbarbackgroundcolor,
//               color: "white",
//               position: "sticky",
//               top: 0,
//             }}
//           >
//             <tr>
//               <td colSpan={columnsConfig.length} style={{ padding: 0 }}>
//                 <div style={{ display: "flex", padding: "6px 8px 0" }}>
//                   {Object.values(TABS).map((tab) => {
//                     const active = activeTab === tab;
//                     return (
//                       <div
//                         key={tab}
//                         onClick={() => setActiveTab(tab)}
//                         style={{
//                           padding: "6px 14px",
//                           marginRight: 6,
//                           cursor: "pointer",
//                           background: active ? "white" : "transparent",
//                           color: active ? getnavbarbackgroundcolor : "white",
//                           borderTopLeftRadius: 10,
//                           borderTopRightRadius: 10,
//                         }}
//                       >
//                         {tab}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </td>
//             </tr>

//             <tr>
//               {columnsConfig.map((c, i) => (
//                 <td
//                   key={i}
//                   style={{
//                     width: c.uiWidth,
//                     padding: 6,
//                     textAlign: c.alignment,
//                   }}
//                 >
//                   {c.key === "qa" ? (
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         gap: 6,
//                       }}
//                     >
//                       {Object.values(QA_MODE).map((m) => (
//                         <button
//                           key={m}
//                           onClick={() => setQaMode(m)}
//                           style={{
//                             padding: "2px 10px",
//                             borderRadius: 4,
//                             border: "1px solid white",
//                             background: qaMode === m ? "white" : "transparent",
//                             color:
//                               qaMode === m ? getnavbarbackgroundcolor : "white",
//                             cursor: "pointer",
//                           }}
//                         >
//                           {m === "QTY" ? "Quantity" : "Item"}
//                         </button>
//                       ))}
//                     </div>
//                   ) : (
//                     c.header
//                   )}
//                 </td>
//               ))}
//             </tr>
//           </thead>
//         </table>

//         {/* ================= TABLE BODY ================= */}
//         <div
//           className="table-scroll"
//           style={{
//             backgroundColor: "white",
//             maxHeight: "50vh",
//             overflowY: "scroll", // ✅ force scrollbar
//             overflowX: "hidden",
//             borderBottom: `1px solid ${softTableStyles.softBorderColor}`,
//           }}
//         >
//           <table
//             className="myTable"
//             style={{
//               width: tableWidth,
//               tableLayout: "fixed",
//               fontSize: getdatafontsize,
//               fontFamily: getfontstyle,
//             }}
//           >
//             <tbody>
//               {filteredData.map((row, i) => {
//                 const percent =
//                   qaMode === QA_MODE.QTY
//                     ? QTY_VALUES[i % 12]
//                     : ITEM_VALUES[i % 12];

//                 return (
//                   <tr key={i}>
//                     {columnsConfig.map((c, ci) => (
//                       <td
//                         key={ci}
//                         style={{
//                           width: c.uiWidth,
//                           padding: 6,
//                           textAlign: c.alignment,
//                         }}
//                       >
//                         {c.key === "qa" ? (
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 6,
//                             }}
//                           >
//                             <span style={{ width: 30 }}>{MONTHS[i % 12]}</span>
//                             <div
//                               style={{
//                                 flex: 1,
//                                 height: 6,
//                                 background: "#e0e0e0",
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   width: `${percent}%`,
//                                   height: "100%",
//                                   background: "#4caf50",
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         ) : c.key === "Balance" ? (
//                           toNumber(row.Balance).toLocaleString()
//                         ) : c.key === "scrollSpacer" ? (
//                           ""
//                         ) : (
//                           row[c.key]
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* TOTAL */}
//         <div
//           style={{
//             display: "flex",
//             background: getnavbarbackgroundcolor,
//             color: "white",
//           }}
//         >
//           {columnsConfig.map((c, i) => (
//             <div
//               key={i}
//               style={{
//                 width: c.uiWidth,
//                 padding: 6,
//                 textAlign: c.alignment,
//                 fontWeight: "bold",
//               }}
//             >
//               {i === 0 && filteredData.length}
//               {c.key === "Balance" && totalBalance.toLocaleString()}
//             </div>
//           ))}
//         </div>

//         {/* EXPORT */}
//         <div
//           style={{
//             padding: 6,
//             display: "flex",
//             justifyContent: "center",
//             gap: 10,
//           }}
//         >
//           <SingleButton text="PDF" />
//           <SingleButton text="Excel" />
//         </div>
//       </div>
//     </div>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { useTheme } from "../../../ThemeContext";
// import NavComponent from "../../MainComponent/Navform/navbarform";
// import SingleButton from "../../MainComponent/Button/SingleButton/SingleButton";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import "../AmericanDashboard.css";
// import { FaSortUp, FaSortDown } from "react-icons/fa";

// /* ================= CONSTANTS ================= */

// const REPORT_NAME = "Quantity-Amount wise Items";

// const TABS = {
//   ALL: "ALL",
//   DAILY: "DAILY",
//   PUBLIC: "PUBLIC",
// };

// const QA_MODE = {
//   QTY: "QTY",
//   ITEM: "ITEM",
// };

// const SCROLLBAR_WIDTH = 14;

// const MONTHS = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// const QTY_VALUES = [30, 45, 60, 75, 55, 70, 40, 85, 50, 65, 35, 80];
// const ITEM_VALUES = [40, 55, 50, 70, 60, 90, 45, 95, 55, 75, 40, 85];

// const columnsConfig = [
//   { header: "Code", key: "tacccod", alignment: "left", uiWidth: 80 },
//   { header: "Name", key: "tcstdsc", alignment: "left", uiWidth: 320 },
//   { header: "Mobile", key: "tmobnum", alignment: "left", uiWidth: 120 },
//   { header: "SalesMan", key: "tsaldsc", alignment: "left", uiWidth: 160 },
//   { header: "Balance", key: "Balance", alignment: "right", uiWidth: 120 },
//   { header: "Quantity-Amount", key: "qa", alignment: "center", uiWidth: 260 },
//   {
//     header: "",
//     key: "scrollSpacer",
//     alignment: "center",
//     uiWidth: SCROLLBAR_WIDTH,
//   },
// ];

// const toNumber = (v) =>
//   v === null || v === undefined ? 0 : Number(String(v).replace(/,/g, "")) || 0;

// /* ================= COMPONENT ================= */

// export default function AmericanNonActiveCustomers() {
//   const [sortConfig, setSortConfig] = useState({
//     key: null,
//     direction: "ascending",
//   });

//   const getSortIcon = (key) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === "ascending" ? (
//         <FaSortUp style={{ marginLeft: 5, color: "#e74c3c" }} />
//       ) : (
//         <FaSortDown style={{ marginLeft: 5, color: "#e74c3c" }} />
//       );
//     }
//     return (
//       <FaSortDown style={{ marginLeft: 5, color: "white", opacity: 0.4 }} />
//     );
//   };

//   const requestSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   const {
//     getcolor,
//     fontcolor,
//     getnavbarbackgroundcolor,
//     getfontstyle,
//     getdatafontsize,
//   } = useTheme();

//   const [rows, setRows] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState(TABS.ALL);
//   const [qaMode, setQaMode] = useState(QA_MODE.QTY);

//   /* ================= API ================= */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const form = new FormData();
//         form.append("code", "AMRELEC");
//         const res = await axios.post(
//           "https://crystalsolutions.pk/api/AmericanNilCustomers.php",
//           form,
//           { timeout: 20000 },
//         );
//         setRows(res?.data ?? []);
//       } catch {
//         setRows([]);
//       }
//     };
//     fetchData();
//   }, []);

//   /* ================= FILTER ================= */
//   const sortedData = useMemo(() => {
//     let data = [...rows];

//     if (searchQuery) {
//       const q = searchQuery.toLowerCase().trim();
//       data = data.filter(
//         (r) =>
//           r.tacccod?.toLowerCase().includes(q) ||
//           r.tcstdsc?.toLowerCase().includes(q) ||
//           r.tmobnum?.toLowerCase().includes(q) ||
//           r.tsaldsc?.toLowerCase().includes(q) ||
//           r.Balance?.toString().includes(q),
//       );
//     }

//     if (sortConfig.key) {
//       data.sort((a, b) => {
//         const aVal = a[sortConfig.key] ?? "";
//         const bVal = b[sortConfig.key] ?? "";

//         if (sortConfig.key === "Balance") {
//           return sortConfig.direction === "ascending"
//             ? toNumber(aVal) - toNumber(bVal)
//             : toNumber(bVal) - toNumber(aVal);
//         }

//         return sortConfig.direction === "ascending"
//           ? String(aVal).localeCompare(String(bVal))
//           : String(bVal).localeCompare(String(aVal));
//       });
//     }

//     return data;
//   }, [rows, searchQuery, sortConfig]);

//   const totalBalance = useMemo(
//     () => sortedData.reduce((s, r) => s + toNumber(r.Balance), 0),
//     [sortedData],
//   );

//   const tableWidth = columnsConfig.reduce((s, c) => s + c.uiWidth, 0) + "px";

//   return (
//     <div
//       style={{
//         backgroundColor: getcolor,
//         width: tableWidth,
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         maxWidth: "95vw",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: getcolor,
//           color: fontcolor,
//           borderRadius: 12,
//           border: "1px solid #00000026",
//         }}
//       >
//         <NavComponent textdata={REPORT_NAME} />

//         {/* SEARCH */}
//         <div
//           style={{ display: "flex", justifyContent: "flex-end", padding: 8 }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               background: "white",
//               border: "1px solid #ccc",
//               padding: "2px 8px",
//               width: 260,
//             }}
//           >
//             <MagnifyingGlassIcon style={{ width: 16, height: 16 }} />
//             <input
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search..."
//               style={{
//                 border: "none",
//                 outline: "none",
//                 marginLeft: 6,
//                 fontSize: getdatafontsize,
//                 fontFamily: getfontstyle,
//                 width: "100%",
//               }}
//             />
//           </div>
//         </div>

//         {/* ================= TABS ================= */}
//         <div
//           style={{
//             display: "flex",
//             padding: "6px 8px 0",
//             backgroundColor: getnavbarbackgroundcolor,
//           }}
//         >
//           {Object.values(TABS).map((tab) => {
//             const active = activeTab === tab;
//             return (
//               <div
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 style={{
//                   padding: "6px 14px",
//                   marginRight: 6,
//                   cursor: "pointer",
//                   background: active ? "white" : "transparent",
//                   color: active ? getnavbarbackgroundcolor : "white",
//                   borderTopLeftRadius: 10,
//                   borderTopRightRadius: 10,
//                   fontSize: "12px",
//                   fontWeight: 500,
//                 }}
//               >
//                 {tab}
//               </div>
//             );
//           })}
//         </div>

//         {/* ================= HEADER ================= */}
//         <table
//           className="myTable"
//           style={{
//             width: tableWidth,
//             tableLayout: "fixed",
//             fontSize: getdatafontsize,
//             fontFamily: getfontstyle,
//           }}
//         >
//           <thead
//             style={{
//               backgroundColor: getnavbarbackgroundcolor,
//               color: "white",
//             }}
//           >
//             <tr>
//               {columnsConfig.map((c, i) => (
//                 <th
//                   key={i}
//                   onClick={() =>
//                     c.key !== "qa" &&
//                     c.key !== "scrollSpacer" &&
//                     requestSort(c.key)
//                   }
//                   style={{
//                     cursor:
//                       c.key !== "qa" && c.key !== "scrollSpacer"
//                         ? "pointer"
//                         : "default",
//                     width: c.uiWidth,
//                     padding: "2px",
//                     textAlign: "center",
//                     fontWeight: "600",
//                     borderRight: "1px solid #ffffff55",
//                     borderBottom: "1px solid #ffffff55",
//                   }}
//                 >
//                   {c.key === "qa" ? (
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         gap: 6,
//                       }}
//                     >
//                       {Object.values(QA_MODE).map((m) => (
//                         <button
//                           key={m}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setQaMode(m);
//                           }}
//                           style={{
//                             padding: "2px 10px",
//                             borderRadius: 4,
//                             border: "1px solid white",
//                             background: qaMode === m ? "white" : "transparent",
//                             color:
//                               qaMode === m ? getnavbarbackgroundcolor : "white",
//                             fontSize: "11px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           {m === "QTY" ? "Quantity" : "Amount"}
//                         </button>
//                       ))}
//                     </div>
//                   ) : (
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         gap: 4,
//                       }}
//                     >
//                       {c.header}
//                       {c.key !== "scrollSpacer" && getSortIcon(c.key)}
//                     </div>
//                   )}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//         </table>

//         {/* ================= BODY ================= */}
//         <div
//           className="table-scroll"
//           style={{ background: "white", maxHeight: "50vh" }}
//         >
//           <table
//             className="myTable"
//             style={{ width: tableWidth, tableLayout: "fixed" }}
//           >
//             <tbody>
//               {sortedData.map((row, i) => (
//                 <tr key={i}>
//                   {columnsConfig.map((c, ci) => (
//                     <td key={ci} style={{ width: c.uiWidth, padding: 6 }}>
//                       {c.key === "qa" ? (
//                         <div style={{ display: "flex", gap: 6 }}>
//                           <span style={{ width: 30 }}>{MONTHS[i % 12]}</span>
//                           <div
//                             style={{
//                               flex: 1,
//                               height: 6,
//                               background: "#e0e0e0",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 width: `${
//                                   qaMode === QA_MODE.QTY
//                                     ? QTY_VALUES[i % 12]
//                                     : ITEM_VALUES[i % 12]
//                                 }%`,
//                                 height: "100%",
//                                 background:
//                                   qaMode === QA_MODE.QTY
//                                     ? "#4caf50"
//                                     : "#2196f3",
//                               }}
//                             />
//                           </div>
//                         </div>
//                       ) : c.key === "Balance" ? (
//                         toNumber(row.Balance).toLocaleString()
//                       ) : (
//                         row[c.key]
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* TOTAL */}
//         <div
//           style={{
//             display: "flex",
//             background: getnavbarbackgroundcolor,
//             color: "white",
//             fontSize: "12px",
//             padding: "2px 0",
//           }}
//         >
//           {columnsConfig.map((c, i) => (
//             <div key={i} style={{ width: c.uiWidth, padding: 2 }}>
//               {i === 0 && sortedData.length}
//               {c.key === "Balance" && totalBalance.toLocaleString()}
//             </div>
//           ))}
//         </div>

//         {/* EXPORT */}
//         <div
//           style={{
//             padding: 6,
//             display: "flex",
//             justifyContent: "center",
//             gap: 10,
//           }}
//         >
//           <SingleButton text="PDF" />
//           <SingleButton text="Excel" />
//         </div>
//       </div>
//     </div>
//   );
// }
