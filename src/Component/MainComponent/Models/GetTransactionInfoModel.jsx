import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./Models.css";
import { useTheme } from "../../../ThemeContext";
import NavComponent from "../Navform/navbarform";

const GetTransactionInfoModel = ({
  isOpen,
  handleClose,
  title,
  technicians,
  // setTechnicians, // make sure parent passes setTechnicians
}) => {
  const {
    getcolor,
    fontcolor,
  } = useTheme();
  // Reset technicians when modal closes
  // useEffect(() => {
  //   if (!isOpen) {
  //     setTechnicians(null); // reset technicians when modal is closed
  //   }
  // }, [isOpen, setTechnicians]);

  return (
    <div>
      <Modal
        show={isOpen}
        onHide={handleClose}
        dialogClassName="my-modal-GetTransactionInfoModel"
        style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
        centered
      >
        <NavComponent textdata={title} />
        <Modal.Body
          style={{
            backgroundColor: getcolor,
            color: fontcolor,
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          {technicians ? (
            <div className="transaction-info">
              <div className="info-card">
                <h6>Created By</h6>
                <p>
                  <strong>User:</strong> {technicians.FInsUsr}
                </p>
                <p>
                  <strong>Date:</strong> {technicians.FInsDat}
                </p>
              </div>

              <div className="info-card">
                <h6>Updated By</h6>
                <p>
                  <strong>User:</strong> {technicians.FUpdUsr}
                </p>
                <p>
                  <strong>Date:</strong> {technicians.FUpdDat}
                </p>
              </div>
            </div>
          ) : (
            <p style={{ textAlign: "center", opacity: 0.7 }}>
              No transaction data available
            </p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GetTransactionInfoModel;
