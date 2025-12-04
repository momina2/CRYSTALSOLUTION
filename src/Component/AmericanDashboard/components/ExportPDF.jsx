// // src/components/export/ExportPDF.js
// import jsPDF from "jspdf";

// export function exportPDF({
//   rows,
//   columnsConfig,
//   totalCollection,
//   companyName,
//   reportName,
//   font = "Helvetica",
// }) {
//   const doc = new jsPDF("landscape", "pt", "A4"); // <-- REAL A4 DPI MODE

//   const keys = columnsConfig.map((c) => c.key);
//   const headers = columnsConfig.map((c) => c.header);

//   // consistent cell width for all columns
//   const colWidth = 115;
//   const pdfWidths = columnsConfig.map(() => colWidth);

//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();

//   const totalWidth = colWidth * columnsConfig.length;
//   const tableX = (pageWidth - totalWidth) / 2;

//   const HEADER_HEIGHT = 20;
//   const ROW_HEIGHT_MIN = 16; // minimum
//   const TOP_OFFSET = 60;

//   doc.setFont(font, "bold");
//   doc.setFontSize(18);
//   doc.text(companyName, pageWidth / 2, 30, { align: "center" });

//   doc.setFont(font, "normal");
//   doc.setFontSize(12);
//   doc.text(reportName, pageWidth / 2, 48, { align: "center" });

//   // header
//   let x = tableX;
//   doc.setFontSize(10);
//   doc.setFont(font, "bold");

//   headers.forEach((h) => {
//     doc.setFillColor(210);
//     doc.rect(x, TOP_OFFSET, colWidth, HEADER_HEIGHT, "F");
//     doc.rect(x, TOP_OFFSET, colWidth, HEADER_HEIGHT);

//     doc.text(h, x + colWidth / 2, TOP_OFFSET + 12, { align: "center" });

//     x += colWidth;
//   });

//   let y = TOP_OFFSET + HEADER_HEIGHT;

//   function wrapText(text, maxWidth) {
//     return doc.splitTextToSize(text, maxWidth - 6);
//   }

//   rows.forEach((item) => {
//     const rowData = keys.map((k) => String(item[k] ?? ""));

//     // calculate proper row height
//     const splitTexts = rowData.map((txt) => wrapText(txt, colWidth));
//     const rowHeight = Math.max(
//       ...splitTexts.map((arr) => arr.length * ROW_HEIGHT_MIN)
//     );

//     // page break if needed
//     if (y + rowHeight > pageHeight - 50) {
//       doc.addPage();
//       y = TOP_OFFSET;

//       // print header again
//       let hx = tableX;
//       doc.setFont(font, "bold");
//       doc.setFontSize(10);
//       headers.forEach((h) => {
//         doc.setFillColor(210);
//         doc.rect(hx, y, colWidth, HEADER_HEIGHT, "F");
//         doc.rect(hx, y, colWidth, HEADER_HEIGHT);
//         doc.text(h, hx + colWidth / 2, y + 12, { align: "center" });
//         hx += colWidth;
//       });
//       y += HEADER_HEIGHT;
//     }

//     let cx = tableX;
//     doc.setFont(font, "normal");
//     doc.setFontSize(9);

//     splitTexts.forEach((wrappedTxtArr) => {
//       // cell
//       doc.rect(cx, y, colWidth, rowHeight);

//       wrappedTxtArr.forEach((line, idx) => {
//         doc.text(line, cx + 4, y + 12 + idx * ROW_HEIGHT_MIN);
//       });

//       cx += colWidth;
//     });

//     y += rowHeight;
//   });

//   // TOTAL ROW
//   const totalRow = new Array(headers.length).fill("");
//   totalRow[0] = "TOTAL";
//   totalRow[headers.length - 1] = totalCollection.toFixed(2);

//   if (y + ROW_HEIGHT_MIN > pageHeight - 50) {
//     doc.addPage();
//     y = TOP_OFFSET;
//   }

//   let tx = tableX;
//   doc.setFont(font, "bold");
//   doc.setFontSize(10);

//   totalRow.forEach((val) => {
//     doc.rect(tx, y, colWidth, ROW_HEIGHT_MIN);
//     doc.text(val, tx + colWidth - 8, y + 12, { align: "right" });
//     tx += colWidth;
//   });

//   doc.save(`${reportName}.pdf`);
// }

// src/components/export/ExportPDF.js
import jsPDF from "jspdf";

export function exportPDF({
  rows,
  columnsConfig,
  totalCollection,
  companyName,
  reportName,
  font = "Helvetica",
}) {
  const doc = new jsPDF("landscape", "pt", "A4");

  const keys = columnsConfig.map((c) => c.key);
  const headers = columnsConfig.map((c) => c.header);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const totalColumns = columnsConfig.length;
  const maxTableWidth = pageWidth - 90; // left & right margin safe zone
  let colWidth = maxTableWidth / totalColumns;

  if (colWidth < 70) colWidth = 70;

  const totalWidth = colWidth * totalColumns;
  const tableX = (pageWidth - totalWidth) / 2;

  const HEADER_HEIGHT = 20;
  const ROW_HEIGHT_MIN = 14;
  const TOP_OFFSET = 60;

  // TITLE
  doc.setFont(font, "bold");
  doc.setFontSize(18);
  doc.text(companyName, pageWidth / 2, 30, { align: "center" });

  doc.setFont(font, "normal");
  doc.setFontSize(12);
  doc.text(reportName, pageWidth / 2, 48, { align: "center" });

  // HEADER
  let x = tableX;

  doc.setFontSize(10);
  doc.setFont(font, "bold");

  headers.forEach((h) => {
    doc.setFillColor(210);
    doc.rect(x, TOP_OFFSET, colWidth, HEADER_HEIGHT, "F");
    doc.rect(x, TOP_OFFSET, colWidth, HEADER_HEIGHT);
    doc.text(h, x + colWidth / 2, TOP_OFFSET + 12, { align: "center" });
    x += colWidth;
  });

  let y = TOP_OFFSET + HEADER_HEIGHT;

  function wrapText(text, maxWidth) {
    return doc.splitTextToSize(text, maxWidth - 8);
  }

  // ROWS
  rows.forEach((item) => {
    const rowData = keys.map((k) => String(item[k] ?? ""));
    const wrappedLinesArr = rowData.map((txt) => wrapText(txt, colWidth));
    const rowHeight = Math.max(
      ...wrappedLinesArr.map((arr) => arr.length * ROW_HEIGHT_MIN)
    );

    if (y + rowHeight > pageHeight - 50) {
      doc.addPage();
      y = TOP_OFFSET;

      let hx = tableX;
      doc.setFont(font, "bold");
      doc.setFontSize(10);

      headers.forEach((h) => {
        doc.setFillColor(210);
        doc.rect(hx, y, colWidth, HEADER_HEIGHT, "F");
        doc.rect(hx, y, colWidth, HEADER_HEIGHT);
        doc.text(h, hx + colWidth / 2, y + 12, { align: "center" });
        hx += colWidth;
      });
      y += HEADER_HEIGHT;
    }

    let cx = tableX;
    doc.setFont(font, "normal");
    doc.setFontSize(9);

    wrappedLinesArr.forEach((lines) => {
      doc.rect(cx, y, colWidth, rowHeight);
      lines.forEach((line, i) => {
        doc.text(line, cx + 4, y + 12 + i * ROW_HEIGHT_MIN);
      });
      cx += colWidth;
    });

    y += rowHeight;
  });

  // TOTAL ROW
  const totalRow = new Array(headers.length).fill("");
  totalRow[0] = "TOTAL";
  totalRow[headers.length - 1] = totalCollection?.toFixed(2) ?? "";

  if (y + ROW_HEIGHT_MIN > pageHeight - 50) {
    doc.addPage();
    y = TOP_OFFSET;
  }

  let tx = tableX;
  doc.setFont(font, "bold");
  doc.setFontSize(10);

  totalRow.forEach((v) => {
    doc.rect(tx, y, colWidth, ROW_HEIGHT_MIN);
    doc.text(v, tx + colWidth - 8, y + 12, { align: "right" });
    tx += colWidth;
  });

  doc.save(`${reportName}.pdf`);
}
