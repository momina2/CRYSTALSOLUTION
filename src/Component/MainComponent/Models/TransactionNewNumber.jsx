import React, { useState, useRef, useEffect } from "react";
import { Modal, Row, Col, Form, Alert } from "react-bootstrap";
import "./Models.css";
import { useTheme } from "../../../ThemeContext";

import NavComponent from "../Navform/navbarform";
import SearchInputModel from "../SearchField/SearchFieldModels";


const TransactionNewNumber = ({
  isOpen,
  handleClose,
  title,
  searchRef,
  firstColKey,
  secondColKey,
  thirdColKey,
  handleRowClick,
  technicians,
}) => {
  const {
    apiLinks,
    getcolor,
    fontcolor,getdatafontsize,
    getnavbarfontcolor,
    getnavbarbackgroundcolor,
  } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const [enterCount, setEnterCount] = useState(0);
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);
  const tableRef = useRef(null);
  const firstRowRef = useRef(null);
  const [alertData, setAlertData] = useState(null);

  const fetchDataAndDisplay = async () => {
    const columns = [
      { label: "Code", field: "tacccod", sort: "asc" },
      { label: "Description", field: "taccdsc", sort: "asc" },
      { label: "Status", field: "taccsts", sort: "asc" },
    ];
    setData({ columns, rows: technicians && technicians });
  };

  const filteredRows =
    data.rows &&
    data.rows.filter(
      (row) =>
        (row[firstColKey] &&
          row[firstColKey].toLowerCase().includes(searchText.toLowerCase())) ||
        (row[secondColKey] &&
          row[secondColKey].toLowerCase().includes(searchText.toLowerCase())) ||
        (row[thirdColKey] &&
          row[thirdColKey].toLowerCase().includes(searchText.toLowerCase()))
    );

  const handleSearchChange = (event) => {
    const uppercase = event.target.value.toUpperCase();
    setHighlightedRowIndex(0);
    setSearchText(uppercase);
  };

  const handleArrowKeyPress = (direction) => {
    if (!filteredRows || filteredRows.length === 0) return;

    let newIndex = highlightedRowIndex;
    let upindex = highlightedRowIndex - 10;
    let bottomindex = highlightedRowIndex + 10;

    if (direction === "up") {
      const rowElement = document.getElementById(`row-${upindex}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      newIndex = Math.max(0, highlightedRowIndex - 1);
    } else if (direction === "down") {
      const rowElement = document.getElementById(`row-${bottomindex}`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      newIndex = Math.min(filteredRows.length - 1, highlightedRowIndex + 1);
    }

    setHighlightedRowIndex(newIndex);
  };

  const resetTableStates = () => {
    setSearchText("");
    setData({ columns: [], rows: [] });
    setEnterCount(0);
    setHighlightedRowIndex(0);
  };

  useEffect(() => {
    if (!isOpen) {
      resetTableStates();
    }
  }, [isOpen]);

  const firstColWidth = "100px";
  const secondColWidth = "120px";
  const thirdColWidth = "450px";

  return (
    <div>
      {alertData && (
        <Alert
          severity={alertData.type}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "30%",
            marginLeft: "35%",
            zIndex: 9999,
            textAlign: "center",
          }}
        >
          {alertData.message}
        </Alert>
      )}

      <Modal
        show={isOpen}
        onHide={handleClose}
        dialogClassName="my-modal-transactionmodel"
        style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        <NavComponent textdata={title} />
        <Modal.Body style={{ backgroundColor: getcolor, color: fontcolor }}>
          <div className="row">
            <SearchInputModel
              searchText={searchText}
              setSearchText={setSearchText}
              handleSearchChange={handleSearchChange}
              handleArrowKeyPress={handleArrowKeyPress}
              fetchDataAndDisplay={fetchDataAndDisplay}
              enterCount={enterCount}
              setEnterCount={setEnterCount}
              filteredRows={filteredRows}
              highlightedRowIndex={highlightedRowIndex}
              handleRowClick={handleRowClick}
              fontcolor={fontcolor}
              searchRef={searchRef}
              autoFocus={isOpen}
            />
          </div>
          <table style={{ backgroundColor: getcolor, color: fontcolor }}>
            <thead
              style={{
                backgroundColor: getnavbarbackgroundcolor,
                color: getnavbarfontcolor,
              }}
            >
              <tr>
                <th
                  className="table-item-cashreceivevoucher"
                  style={{
                    width: firstColWidth,
                  }}
                >
                  Trn#
                </th>
                <th
                  className="table-item-cashreceivevoucher"
                  style={{
                    width: secondColWidth,
                  }}
                >
                  Date
                </th>
                <th
                  className="table-item-cashreceivevoucher"
                  style={{
                    width: thirdColWidth,
                  }}
                >
                  Description
                </th>
              </tr>
            </thead>
          </table>
          <table
            className="custom-table-filemenu"
            style={{ backgroundColor: getcolor, color: fontcolor }}
          >
            <tbody
              ref={tableRef}
              style={{
                overflowY: "auto",
                transition: "width 0.3s ease-in-out",
              }}
            >
              {!filteredRows || filteredRows.length === 0 ? (
                <>
                  {Array.from({ length: 18 }).map((_, index) => (
                    <tr
                      key={`blank-${index}`}
                      style={{ backgroundColor: getcolor, color: fontcolor }}
                    >
                      {Array.from({ length: 3 }).map((_, colIndex) => (
                        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                      ))}
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: getcolor, color: fontcolor }}>
                    <td
                      style={{
                        textAlign: "center",
                        width: firstColWidth,
                      }}
                    ></td>
                    <td
                      style={{
                        textAlign: "center",
                        width: secondColWidth,
                      }}
                    ></td>
                    <td
                      style={{
                        textAlign: "center",
                        width: thirdColWidth,
                      }}
                    ></td>
                  </tr>
                </>
              ) : (
                <>
                  {filteredRows.map((row, index) => (
                    <tr
                      style={{
                         color: highlightedRowIndex === index ? 'white' : fontcolor,
                        fontWeight:
                          highlightedRowIndex === index ? "bold" : "normal",
                        border:
                          highlightedRowIndex === index
                            ? getnavbarbackgroundcolor
                            : getnavbarbackgroundcolor,
                        backgroundColor:
                          highlightedRowIndex === index ? getnavbarbackgroundcolor : getcolor,
                      }}
                      ref={index === 0 ? firstRowRef : null}
                      key={index}
                      id={`row-${index}`}
                      onClick={() => {
                        handleRowClick(row, index);
                      }}
                    >
                      <td
                        style={{ width: firstColWidth, fontWeight: "normal" }}
                      >
                        {row[firstColKey]}
                      </td>
                      <td
                        style={{
                          width: secondColWidth,
                          textAlign: "center",
                          fontWeight: "normal",
                        }}
                      >
                        {row[secondColKey]}
                      </td>
                      <td
                        style={{
                          width: thirdColWidth,
                          textAlign: "left",
                          fontWeight: "normal",
                        }}
                      >
                        {row[thirdColKey]}
                      </td>
                    </tr>
                  ))}
                  {Array.from({
                    length: Math.max(0, 19 - filteredRows.length),
                  }).map((_, index) => (
                    <tr
                      key={`blank-${index}`}
                      style={{ backgroundColor: getcolor, color: fontcolor }}
                    >
                      {Array.from({ length: 3 }).map((_, colIndex) => (
                        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TransactionNewNumber;
