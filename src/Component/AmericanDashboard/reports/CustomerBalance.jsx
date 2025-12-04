import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { formatNumberWithCommas } from "../../../utils/helpers.js";
import { exportPDF } from "../components/ExportPDF";
import { exportCSV } from "../components/ExportCSV";
import "../../../utils/helpers.js";

function useQueryParams() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function CustomerBalance() {
  const query = useQueryParams();

  const minParam = query.get("min") || "0";
  const maxParam = query.get("max") || "99999999";
  const labelParam = query.get("label") || "";

  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "tcstcod",
    direction: "asc",
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minParam, maxParam]);

  const fetchData = async () => {
    try {
      const form = new FormData();
      form.append("code", "AMRELEC");
      form.append("FIntAmt", minParam);
      form.append("FFnlAmt", maxParam);

      const res = await axios.post(
        "https://crystalsolutions.com.pk/api/CustomerBalance.php",
        form
      );

      console.log("CustomerBalance API:", res.data);

      let dataRows = [];

      if (res.data) {
        if (Array.isArray(res.data.Detail)) {
          dataRows = res.data.Detail;
        } else if (Array.isArray(res.data)) {
          dataRows = res.data;
        }
      }

      // optionally build address if tadd001/tadd002 exist
      const mapped = dataRows.map((row) => ({
        ...row,
        address: `${row.tadd001 || ""} ${row.tadd002 || ""}`.trim(),
      }));

      setRows(mapped);
    } catch (err) {
      console.error("CustomerBalance API error:", err);
      setRows([]);
    }
  };

  const columnsConfig = [
    { header: "Code", key: "tcstcod", align: "center", uiWidth: 60 },
    { header: "Customer", key: "tcstdsc", align: "left", uiWidth: 200 },
    { header: "Contact", key: "tcntper", align: "left", uiWidth: 120 },
    { header: "Address", key: "address", align: "left", uiWidth: 180 },
    { header: "Mobile", key: "tmobnum", align: "center", uiWidth: 100 },
    { header: "Salesman", key: "SalesMan", align: "left", uiWidth: 120 },
    { header: "Balance", key: "balance", align: "right", uiWidth: 90 },
  ];

  const totalUiWidth = columnsConfig.reduce((sum, col) => sum + col.uiWidth, 0);
  const getWidthPercent = (col) => (col.uiWidth / totalUiWidth) * 100 + "%";

  const filteredData = useMemo(() => {
    let data = [...rows];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter((row) => {
        return (
          row.tcstcod?.toLowerCase().includes(q) ||
          row.tcstdsc?.toLowerCase().includes(q) ||
          row.tcntper?.toLowerCase().includes(q) ||
          row.address?.toLowerCase().includes(q) ||
          row.tmobnum?.toLowerCase().includes(q) ||
          row.SalesMan?.toLowerCase().includes(q) ||
          row.balance?.toString().toLowerCase().includes(q)
        );
      });
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
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
      reportName: `Customer Range (${
        labelParam || `${minParam} - ${maxParam}`
      })`,
    });
  };

  const handleCSV = () => {
    exportCSV({
      rows: filteredData,
      columnsConfig,
      totalCollection: totalBalance,
      companyName: "CRYSTAL SOLUTIONS",
      reportName: `Customer Range (${
        labelParam || `${minParam} - ${maxParam}`
      })`,
    });
  };

  return (
    <div className="flex justify-center pt-8">
      <div className="w-[70%] bg-white border border-gray-300 rounded-md shadow-lg">
        <div className="p-3 border-b bg-blue-800 rounded-t-md">
          <h2 className="text-lg font-semibold text-center text-white leading-tight">
            Customer Balance by Range
          </h2>
          <p className="text-xs text-white text-center mt-1 leading-tight">
            Range: {labelParam || `${minParam} - ${maxParam}`}
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

        <div className="overflow-y-auto max-h-[70vh]">
          <table className="text-[11px] border-collapse w-full">
            <thead className="bg-blue-800 sticky top-0 z-20 text-[11px]">
              <tr>
                {columnsConfig.map((col) => (
                  <th
                    key={col.key}
                    style={{
                      width: getWidthPercent(col),
                    }}
                    className="p-1 text-white border text-center select-none cursor-pointer"
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
                      }}
                      className={`p-1 border whitespace-nowrap overflow-hidden text-ellipsis ${
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
                        : item[col.key]?.toString().trim?.() ?? "-"}
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
