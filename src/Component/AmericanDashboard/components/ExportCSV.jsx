// // src/components/export/ExportCSV.js

// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";

// export async function exportCSV({
//   rows,
//   columnsConfig,
//   totalCollection,
//   companyName,
//   reportName,
// }) {
//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet("Report");

//   const headers = columnsConfig.map((c) => c.header);
//   const keys = columnsConfig.map((c) => c.key);

//   // Title
//   worksheet.addRow([companyName]);
//   worksheet.mergeCells(1, 1, 1, headers.length);
//   worksheet.getRow(1).font = { bold: true, size: 16 };
//   worksheet.getRow(1).alignment = { horizontal: "center" };

//   worksheet.addRow([reportName]);
//   worksheet.mergeCells(2, 1, 2, headers.length);
//   worksheet.getRow(2).alignment = { horizontal: "center" };
//   worksheet.addRow([]);

//   // Column headers
//   const headerRow = worksheet.addRow(headers);
//   headerRow.eachCell((cell) => {
//     cell.font = { bold: true };
//     cell.alignment = { horizontal: "center", vertical: "middle" };
//     cell.border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//     cell.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "FFE2E2E2" },
//     };
//   });

//   // Data rows
//   rows.forEach((item) => {
//     const row = worksheet.addRow(keys.map((key) => item[key]));

//     row.eachCell((cell, index) => {
//       const col = columnsConfig[index];

//       cell.border = {
//         top: { style: "thin" },
//         left: { style: "thin" },
//         bottom: { style: "thin" },
//         right: { style: "thin" },
//       };
//       cell.alignment = {
//         horizontal: col?.align || "left",
//         vertical: "middle",
//       };
//     });
//   });

//   // Total Row
//   const totalRow = new Array(headers.length).fill("");
//   totalRow[0] = "TOTAL";
//   totalRow[headers.length - 1] = totalCollection.toFixed(2);
//   const tRow = worksheet.addRow(totalRow);

//   tRow.eachCell((cell, index) => {
//     cell.font = { bold: true };

//     cell.border = {
//       top: { style: "double" },
//       left: { style: "thin" },
//       bottom: { style: "double" },
//       right: { style: "thin" },
//     };

//     const col = columnsConfig[index];

//     cell.alignment = {
//       horizontal: col?.align || "left",
//       vertical: "middle",
//     };
//   });

//   // Set column widths
//   columnsConfig.forEach((col, i) => {
//     worksheet.getColumn(i + 1).width = col.excelWidth || 20;
//   });

//   // Save file
//   const buffer = await workbook.xlsx.writeBuffer();
//   saveAs(
//     new Blob([buffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     }),
//     `${reportName}.xlsx`
//   );
// }



