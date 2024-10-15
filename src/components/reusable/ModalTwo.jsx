import React from "react";
import "./Modal.css";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "react-bootstrap";

export const ModalTwo = ({invoiceData}) => {
  return (
    <div className="p-4">
    <div className="border border-black">
      <div className="w-100">
        <div className="logo d-flex justify-content-end m-2">
          <img
            style={{ width: "150px" }}
            src="src/assets/logo.png"
            alt="logo"
            className="one"
          />
        </div>
        {/* QR Genrater */}
        <div className="d-flex my-5">
          <h4 className="d-flex p-4 align-items-center ps-5 ms-3">QR Code</h4>
          <QRCodeCanvas className="ms-5"
          value={JSON.stringify({InvoiceModal,
            invoiceName:props.info.invoiceNumber,
            totalAmount:props.total,
            customer:props.info.billTo,
          })}
          size={200}
          />
        </div>
      </div>
      <div className="para">
        <p>
          We hereby declare that the information incorporated is
          true and the value stated in the invoice is the gross
          amount receivable / advance for the services rendered / to
          be rendered
        </p>
        <p className="sub">(Subject of Dindigul Jurisdiction)</p>{" "}
        <br />
        <h6 className="add">
          Registered office Address: 3/94, N. Panjampatty,
          Alamarathupatti, Dindigul - 624303
        </h6>
      </div>
      <h6 className="h6">For MAXMOC MOTOR WORKS</h6>
      <div className="content">
        <div className="name">
          <h3>Sathish Kumar</h3>
          <h3>Murugan</h3>
        </div>
        <div className="date mb-4 pt-4 ps-3">
          <p className="m-0">
            Digitally signed by Sathish Kumar Murugan
          </p>
          <p className="m-0">E-Mail : skmurugan@maxmoc.in</p>
          <p className="m-0">
            Date : <span> {new Date().toLocaleDateString()}</span>
          </p>
        </div>
      </div>
      <div className="address d-flex align-items-center justify-content-evenly my-5">
        <div className="address-one">
          <p className="m-0">Maxmoc Motor Works</p>
          <p className="m-0">3/94, N. Panjampatty,</p>
          <p className="m-0">Alamarathupatti,</p>
          <p className="m-0">Dindigul - 624303</p>
        </div>
        <div className="address-two mb-4">
          <p className="mb-0">
            Managing Director: Sathish Kumar Murugan
          </p>
          <p className="mb-0">PAN No. AAQCM2589R</p>
        </div>
        <div className="address-table d-flex">
          <table>
            <tr>
              <td>Account Name</td>
            </tr>
            <tr>
              <td>Bank Name</td>
            </tr>
            <tr>
              <td>Account No</td>
            </tr>
            <tr>
              <td>RTGS/IFSC</td>
            </tr>
            <tr>
              <td>MICR CODE </td>
            </tr>
          </table>
          <table>
            <tr>
              <td>Maxmoc Motor Works India PVT LTD</td>
            </tr>
            <tr>
              <td>HDFC Bank Limited, Dindigul Branch</td>
            </tr>
            <tr>
              <td>50200074826031</td>
            </tr>
            <tr>
              <td>HDFC0001850</td>
            </tr>
            <tr>
              <td>625240006</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};
