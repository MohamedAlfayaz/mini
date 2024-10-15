import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import "./Print.css";
import "./Modal.css";
import { QRCodeCanvas } from "qrcode.react";
import { Row, Col, Modal, Table, Button } from "react-bootstrap";
// import { ModalTwo } from "./ModalTwo";

export const InvoiceModal = (props) => {
  const generateInvoice = () => {
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [712, 792], // Page size for the PDF (8.5 x 11 inches in pt)
      });
      let pdfWidth = pdf.internal.pageSize.getWidth();
      let pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Calculate how many pages are needed
      let heightLeft = imgHeight;
      let position = 0;

      // Add the first image to the first page
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add more pages if the content exceeds one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight; // Move down for the next page
        pdf.addPage(); // Add a new page
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight); // Add the image for the new page
        heightLeft -= pdfHeight;
      }

      pdf.save("invoice.pdf");
    });
  };

  const convertNumberToWords = (num) => {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const thousands = ["", "Thousand", "Million", "Billion"];

    if (num === 0) return "Zero";

    let word = "";
    let i = 0;

    while (num > 0) {
      let tempNumber = num % 1000;
      if (tempNumber !== 0) {
        let str = "";
        if (tempNumber % 100 < 20 && tempNumber % 100 > 10) {
          str = teens[(tempNumber % 10) - 1] + " ";
          tempNumber = Math.floor(tempNumber / 100);
        } else {
          str = ones[tempNumber % 10] + " ";
          tempNumber = Math.floor(tempNumber / 10);

          str = tens[tempNumber % 10] + " " + str;
          tempNumber = Math.floor(tempNumber / 10);
        }

        if (tempNumber > 0) {
          str = ones[tempNumber] + " Hundred " + str;
        }

        word = str + thousands[i] + " " + word;
      }

      i++;
      num = Math.floor(num / 1000);
    }
    return word.trim();
  };

  return (
    <div>
      <Modal
        show={props.showModal}
        onHide={props.onHideModal}
        size="xl"
        className="modal"
      >
        <div id="invoiceCapture">
          <div className="page">
            <div className="p-4 my-3">
              <div className="d-flex flex-row justify-conent-between align-items-start w-100 border border-black border-bottom-0">
                <div className="w-100 my-3">
                  <h5 className="text-center">{props.info.billFrom}</h5>
                  <p className="text-center m-0">
                    3 / 94 ,N.Panjampatty,Alamarathupatti
                  </p>
                  <p className="text-center m-0"> Dindigul - 624303</p>
                  <p className="text-center m-0"> Tel : 99528 23148</p>
                  <p className="text-center fw-bold mt-2 mb-0">
                    GST No : 33AAQCM2589R1ZG
                  </p>
                </div>
                <img
                  className="m-4"
                  style={{ width: "150px" }}
                  src="src/assets/logo.png"
                  alt="logo"
                />
              </div>
              {/* <div className="one"></div> */}
              <div className="d-flex align-items-center justify-content-evenly border border-black border-bottom-0">
                <div>
                  <h5 className="text-start ms-lg-5">Invoice</h5>
                </div>
                <div className="text-center p-xl-1 xl-1 ms-5 border border-black border-bottom-0 border-top-0">
                  <input type="checkbox" />
                  <br />
                  <hr className="m-0 px-5 w-100" />
                  <input type="checkbox" />
                  <br />
                  <hr className="m-0 px-5 w-100" />
                  <input type="checkbox" />
                </div>
                <div>
                  <p className="mb-1 p-0">Original For Receipient</p>
                  <p className="mb-1 p-0">
                    Duplicate for supplier / Transporter
                  </p>
                  <p className="m-0 p-0">Triplicate for Supplier</p>
                </div>
              </div>
              <div className="ml-2 border border-black justify-content-around">
                <Row className="d-flex align-items-center">
                  <Col md={5} className="ms-4">
                    <div className="fw-bold">
                      Customer/Participant Name & Address:
                    </div>
                    <table>
                      <tr>
                        <td className="fw-bold"> {props.info.billTo || ""}</td>
                      </tr>
                      <tr>
                        <td> {props.info.billToAddress || ""}</td>
                      </tr>
                      {/* <tr>
                        <td> {props.info.billToCINNo || ""}</td>
                      </tr> */}
                      <tr>
                        <td> {props.info.billToEmail || ""}</td>
                      </tr>
                      <tr>
                        <td> <span className="fw-bold">State : </span>{props.info.state || ""}</td>
                      </tr>
                      <tr>
                        <td>Tel No : {props.info.billToTel || ""}</td>
                      </tr>
                      <tr>
                        <td>Fax No : {props.info.billToFax || ""}</td> 
                      </tr>
                      <tr>
                        <td>Vechicle No : {props.info.billToVechicle || ""}</td>
                      </tr>
                    </table>
                  </Col>
                  {/* <p className="two"></p> */}
                  <Col
                    md={2}
                    lg={2}
                    className="border border-top-0 border-black border-bottom-0 ms-3"
                  >
                    {/* <div className="fw-bold">Production Company Details:</div> */}
                    <table className=" ps-4">
                      <tr>
                        <td>Invoice # </td> 
                      </tr>
                      <tr>
                        <td>Date </td>
                      </tr>
                      <tr>
                        <td>Your Po / Wo No </td>
                      </tr>
                      <tr>
                        <td>Po Date </td>
                      </tr>
                      <tr>
                        <td>Project Engg.Name </td>
                      </tr>
                      <tr>
                        <td>E-Mail Id </td>
                      </tr>
                      <tr>
                        <td>Contact No </td>
                      </tr>
                      {/* <tr>
                        <td>State</td>
                      </tr> */}
                      <tr>
                        <td>Country</td>
                      </tr>
                    </table>
                    {/* <div>{props.info.billFromAddress || ""}</div> */}
                  </Col>
                  <Col className="ms-4">
                    <table>
                      <tr>
                        <td></td>
                      </tr>
                      <tr className="mt-0">
                        <td >
                           {props.info.invoiceName}
                          {props.info.invoiceNumber}
                        </td>
                      </tr>
                      <tr>
                        <td>  {new Date().toLocaleDateString()}</td>
                      </tr>
                      <br />
                      <tr>
                        <td>  {props.info.billFromPONo || ""}</td>
                      </tr>
                      <br />
                      <tr>
                        <td>
                            {props.info.billFromPoDate || ""}
                          {/* {new Date().toLocaleDateString()}  */}
                        </td>
                      </tr>
                      <tr>
                        <td>  {props.info.billFromName || ""}</td>
                      </tr>
                      <tr>
                        <td>  {props.info.billFromEmail || ""}</td>
                      </tr>
                      <tr>
                        <td>  {props.info.billFromcontactNo || ""}</td>
                      </tr>
                      {/* <tr>
                        <td> : {props.info.state || ""}</td>
                      </tr> */}
                      <tr>
                        <td>  {props.info.country || ""} </td>
                      </tr>
                    </table>
                  </Col>
                </Row>
                <Table className="border border-0">
                  <thead>
                    <tr>
                      <th className="text-center border border-black border-start-0 border-end-0 border-bottom-0">
                        Sr.No
                      </th>
                      <th className="text-center border border-black border-end-0 border-bottom-0">
                        Product
                      </th>
                      <th className="text-center border border-black border-end-0 border-bottom-0">
                        HSN Code
                      </th>
                      <th className="text-center border border-black border-end-0 border-bottom-0">
                        Quantity
                      </th>
                      <th className="text-center border border-black border-end-0 border-bottom-0">
                        Rate Per
                      </th>
                      <th className="text-center border border-black border-end-0 border-bottom-0">
                        Amount(INR)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.items.map((item, i) => {
                      return (
                        <tr id={i} key={i}>
                          <td className="text-center border border-black border-start-0 border-end-0">
                            {item.name}
                          </td>
                          <td className="text-center border border-black border-end-0">
                            {item.description}
                          </td>
                          <td className="text-center border border-black border-end-0">
                            {props.info.billHSN || ""}
                          </td>
                          <td
                            className="text-center border border-black border-end-0"
                            style={{ width: "70px" }}
                          >
                            {item.quantity}
                          </td>
                          <td
                            className="text-center border border-black border-end-0 border-bottom-0"
                            style={{ width: "100px" }}
                          >
                            {props.currency} {item.amount}
                          </td>
                          <td
                            className="text-center border border-black border-end-0 border-bottom-0"
                            style={{ width: "100px" }}
                          >
                            {props.currency} {item.amount * item.quantity}
                          </td>
                        </tr>
                      );
                    })}
                    <tr></tr>
                    <tr className="text-center">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td
                        className="fw-bold border border-black border-end-0 border-bottom-0"
                        style={{ width: "100px" }}
                      >
                        SUBTOTAL
                      </td>
                      <td
                        className="text-center border border-black border-end-0"
                        style={{ width: "100px" }}
                      >
                        {props.info.currency} {props.info.subTotal} (INR)
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td
                        className="fw-bold border border-black border-end-0"
                        style={{ width: "100px" }}
                      >
                        GST @18%
                      </td>
                      <td
                        className="text-center border border-black border-end-0 border-top-0"
                        style={{ width: "100px" }}
                      >
                        {props.info.currency} {props.info.taxAmount} (INR)
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td
                        className="fw-bold border border-black border border-top-0 border-end-0"
                        style={{ width: "100px" }}
                      >
                        TOTAL
                      </td>
                      <td
                        className="text-center border border-black border-end-0 border-top-0"
                        style={{ width: "100px" }}
                      >
                        {props.info.currency} {props.total} (INR)
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <div className="ms-3">
                  <h6>
                    Amount in INR : {convertNumberToWords(props.total)} Rupees
                    Only
                  </h6>
                  <h5>
                    {props.info.notes && (
                      <div className="bg-light py-3 px-4 rounded">
                        {props.info.notes}
                      </div>
                    )}
                  </h5>
                </div>
              </div>
              <div className="d-block py-4 ps-4 border border-black border-top-0">
                <h6 className="mb-1">Payment Terms / Details</h6>
                <p className="m-0">
                  Account Name : Maxmoc Moter Works India PVT LTD
                </p>
                <p className="m-0">
                  Name of the Bank : HDFC Bank Limited, Dindigul Branch
                </p>
                <p className="m-0">Account No : 50200074826031</p>
                <p className="m-0">RTGS / IFSC : HDFC0001850</p>
                <p className="mb-0">MICR CODE : 625240006</p>
              </div>
              <div className="d-block py-4 ps-4 border border-black border-top-0">
                <h6 className="pt-2">PAN NO : AAQCM2589R</h6>
                <p className="m-0">
                  Web Site : www.maxmoc.in / support@maxmoc.in
                </p>
                <p className="mb-0">
                  We hereby declare that, The Informantion incorporated is True
                  and the value stated in invoice is the gross amount receivable
                  / abvance for the services rendered / to be rendered
                </p>
                <p className="mt-2 text-center">
                  ( Subject of Dindigul Jurisdiction )
                </p>
              </div>
              <p className="ms-3">
                Registered Office Address : 3 / 94 ,N.Panjampatty,
                Alamarathupatti, Dindigul - 624303
              </p>
            </div>
          </div>
          <div className="page-two">
            <div className="">
              {/* <ModalTwo invoiceData={props.info}/>  */}
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
            </div>
          </div>
        </div>
        <div className="pb-4 px-4">
          <Button
            variant="primary"
            className="d-block w-100 mt-3 mt-md-0"
            onClick={generateInvoice}
          >
            Download
          </Button>
        </div>
      </Modal>
    </div>
  );
};
