import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { formatNumberWithCommas } from "../../../utils/helpers.js";
import { exportPDF } from "../components/ExportPDF";
import { exportCSV } from "../components/ExportCSV";


export default function AmericanAdvance() {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "tcstcod",
    direction: "asc",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const form = new FormData();
    form.append("code", "AMRELEC");

    const res = await axios.post(
      "https://crystalsolutions.com.pk/api/AmericanAdvanceCustomers.php",
      form
    );

    setRows(
      res.data.map((row) => ({
        ...row,
        address: `${row.tadd001 || ""} ${row.tadd002 || ""}`.trim(),
      }))
    );
  };

  const columnsConfig = [
    { header: "Code", key: "tcstcod", align: "center", uiWidth: 70 },
    { header: "Customer", key: "tcstdsc", align: "left", uiWidth: 190 },
    { header: "Status", key: "tcststs", align: "center", uiWidth: 40 },
    { header: "Contact", key: "tcntper", align: "left", uiWidth: 120 },
    { header: "Address", key: "address", align: "left", uiWidth: 160 },
    { header: "Phone", key: "tphnnum", align: "left", uiWidth: 90 },
    { header: "Mobile", key: "tmobnum", align: "center", uiWidth: 90 },
    { header: "Salesman", key: "SalesMan", align: "left", uiWidth: 100 },
    { header: "Balance", key: "balance", align: "right", uiWidth: 80 },
  ];

  // Convert uiWidth → % proportional
  const totalUiWidth = columnsConfig.reduce((sum, col) => sum + col.uiWidth, 0);
  const getWidthPercent = (col) => (col.uiWidth / totalUiWidth) * 100 + "%";

  const filteredData = useMemo(() => {
    let data = rows;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter((row) => {
        return (
          row.tcstcod?.toLowerCase().includes(q) ||
          row.tcstdsc?.toLowerCase().includes(q) ||
          row.tcststs?.toLowerCase().includes(q) ||
          row.tcntper?.toLowerCase().includes(q) ||
          row.tmobnum?.toLowerCase().includes(q) ||
          row.SalesMan?.toLowerCase().includes(q) ||
          row.address?.toLowerCase().includes(q)
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

  const totalBalance = filteredData.reduce(
    (sum, item) => sum + (parseFloat(item.balance) || 0),
    0
  );

  const handlePDF = () => {
    exportPDF({
      rows: filteredData,
      columnsConfig,
      totalCollection: totalBalance,
      companyName: "CRYSTAL SOLUTIONS",
      reportName: "American Advance Customers",
    });
  };

  const handleCSV = () => {
    exportCSV({
      rows: filteredData,
      columnsConfig,
      totalCollection: totalBalance,
      companyName: "CRYSTAL SOLUTIONS",
      reportName: "American Advance Customers",
    });
  };

  return (
    <div className="flex justify-center pt-8">
      <div className="w-[auto] bg-white border border-gray-300 rounded-md shadow-lg">
        <div className="p-3 border-b bg-blue-800 rounded-t-md">
          <h2 className="text-lg text-center font-semibold text-white leading-tight">
            Advance Customers
          </h2>
          <p className="text-xs text-center text-white mt-1 leading-tight">
            Customer Advance Report
          </p>
        </div>

        <div className="p-2 border-b flex flex-col md:flex-row gap-2 justify-between items-center">
          <div className="relative w-full md:w-64">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-2 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 py-1.5 pr-2 w-full border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              className="bg-red-600 text-white px-3 py-1 text-xs rounded"
              onClick={handlePDF}
            >
              Export PDF
            </button>
            <button
              className="bg-blue-700 text-white px-3 py-1 text-xs rounded ml-2"
              onClick={handleCSV}
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-y-auto max-h-[65vh]">
          <table className="text-[11px] border-collapse w-full">
            <thead className="bg-blue-800 sticky top-0 z-20 text-[11px]">
              <tr>
                {columnsConfig.map((col) => (
                  <th
                    key={col.key}
                    style={{
                      width: getWidthPercent(col),
                      maxWidth: getWidthPercent(col),
                    }}
                    className="p-1 text-white border text-center select-none"
                    onClick={() => {
                      setSortConfig((prev) => ({
                        key: col.key,
                        direction:
                          prev.key === col.key && prev.direction === "asc"
                            ? "desc"
                            : "asc",
                      }));
                    }}
                  >
                    {col.header}
                    <span
                      className={`ml-1 ${
                        sortConfig.key === col.key
                          ? "text-red-500"
                          : "text-gray-300"
                      }`}
                    >
                      {sortConfig.key === col.key
                        ? sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"
                        : "△"}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } text-[11px] leading-tight`}
                >
                  {columnsConfig.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        width: getWidthPercent(col),
                        maxWidth: getWidthPercent(col),
                      }}
                      className={`p-1 border overflow-hidden text-ellipsis whitespace-nowrap ${
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                          ? "text-center"
                          : "text-left"
                      }`}
                      title={item[col.key]}
                    >
                      {col.key === "balance"
                        ? formatNumberWithCommas(item[col.key])
                        : item[col.key]?.trim?.() ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between px-6 py-2 bg-blue-800 border-t rounded-b-md text-xs">
          <span className="text-white">{filteredData.length}</span>
          <span className="font-semibold text-white">
            {formatNumberWithCommas(totalBalance.toFixed(2))}
          </span>
        </div>
      </div>
    </div>
  );
}
