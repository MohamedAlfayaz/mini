import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { InvoiceItem } from "./reusable/InvoiceItem";
import { InvoiceModal } from "./reusable/InvoiceModal";
import logo from "../assets/logo.png";
import "../App.css";

const countries = {
  India: [
    "Maharashtra",
    "TamilNadu",
    "karnataka",
    "Karala",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gijarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Madhaya Pradesh",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Telangana",
    "Tripura",
    "Uttra Pradesh",
    "Uttarakhand",
    "Wesrt Bengal",
    "Jammu",
    "Kashmir",
    "Delhi",
    "Puducherry",
    "Ladakh",
    "Lakshadweep",
    "Chandigarh",
  ],
  // USA: ["California", "Texas", "Florida"],
  // Canada: ["Ontario", "Quebec", "British Colum"],
  // Srilanka: [
  //   "Colombo",
  //   "Gampaha",
  //   "Kalutara",
  //   "Kandy",
  //   "Matale",
  //   "Nuwara Eliya",
  //   "Galle",
  //   "Matara",
  //   "Hambantota",
  //   "Jaffna",
  //   "Kilinachchi",
  //   "Mannar",
  //   "Vavuniya",
  //   "Mullaitivu",
  //   "Trincomaloa",
  //   "Batticaloa",
  //   "Ampara",
  //   "Kurunegala",
  //   "Puttalam",
  //   "Anuradhapura",
  //   "Polonnaruwa",
  //   "Badulla",
  //   "Monaragala",
  //   "Ratnapura",
  //   "Kegalle",
  // ],
};

export const InvoiceForm = () => {
  const [state, setState] = useState({
    isOpen: false,
    currency: "₹",
    currentDate: "",
    invoiceNumber: "1",
    invoiceName: "MAX/2024/",
    billTo: "",
    billToCINNo: "",
    billToAddress: "",
    billToTel: "",
    billToFax: "",
    billToVechicle: "",
    billHSN: "",
    billToEmail: "",
    billCheck1: "",
    billCheck2: "",
    billCheck3: "",
    billFrom: "Maxmoc Motor Works India Private Limited",
    billFromName: "Sathya Bama",
    billFromPoDate: "",
    billFromPONo: "",
    billFromEmail: "sathya@maxmoc.in",
    billFromAddress: "Sona Tower, Dindigul",
    billFromcontactNo: "99528 23148",
    billFromCountry: "",
    notes: "",
    subTotal: "0.00",
    taxRate: 18,
    taxAmount: "0.00",
    country: "",
    state: "",
  });
  const [total, setTotal] = useState(0.0);

  const [items, setItems] = useState([
    {
      id: "",
      name: "",
      description: "",
      quantity: "1",
      amount: 1.0,
    },
  ]);
  const onChange = (event) => {
    setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };
  const onItemizedItemEdit = (event) => {
    const individualItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };
    var newItems = items.map((item) => {
      for (var key in item) {
        if (key === individualItem.name && item.id === individualItem.id) {
          item[key] = individualItem.value;
        }
      }
      return item;
    });
    setItems(newItems);
  };
  const handleAddEvent = (e) => {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var item = {
      id: id,
      name: "",
      amount: 1.0,
      description: "",
      quantity: 1,
    };
    setItems((items) => [...items, item]);
  };

  const handleRowDel = (item) => {
    if (items.length > 1) {
      setItems((items) => items.filter((data) => data.id !== item.id));
    } else {
      setItems([
        {
          id: "",
          name: "",
          description: "",
          quantity: "",
          amount: 1.0,
        },
      ]);
    }
  };

  const onCurrencyChange = (selectedOption) => {
    setState((state) => ({ ...state, selectedOption }));
  };

  const handleCalculateTotal = (items) => {
    var subTotal = 0;
    items.map((item) => {
      subTotal +=
        parseFloat(item.amount).toFixed(2) * parseFloat(item.quantity);
    })[0];
    const taxAmount = parseFloat(
      parseFloat(subTotal) * parseFloat(state.taxRate / 100)
    ).toFixed(2);

    const total = parseFloat(subTotal) + parseFloat(taxAmount);

    setTotal(total);

    setState(() => ({
      ...state,
      subTotal,
      taxAmount,
    }));
  };

  useEffect(() => {
    handleCalculateTotal(items);
  }, [items, state.taxRate]);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setState((state) => ({
      ...state,
      country: selectedCountry,
      state: "",
    }));
  };

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setState((state) => ({ ...state, isOpen: true }));
        }}
      >
        <Row>
          <Col md={8} lg={9}>
            <Card className="d-flex p-xl-5 my-3 my-4">
              <span
                className="mb-3 d-flex justify-content-evenly align-items-center fw-bold"
                style={{ fontSize: "20px" }}
              >
                Maxmoc Motor Works India Private Limited
                <img style={{ width: "130px" }} src={logo} alt="logo" />
              </span>
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row mb-3">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row md-3">
                  <div className="mb-2">
                    <span className="fw-bold">Invoice&nbsp;Number:&nbsp;</span>
                    <span className="current-date">
                      {state.invoiceName}
                      {state.invoiceNumber}
                    </span>
                  </div>
                </div>
              </div>
              <hr className="my-2" />
              <Row className="mb-5">
                <Col>
                  <Form.Control
                    placeholder="Invoive Number"
                    value={state.invoiceNumber}
                    type="number"
                    name="invoiceNumber"
                    className="my-2"
                    onChange={onChange}
                    autoComplete=""
                    required={true}
                  />
                  <Form.Label className="fw-bold">Customer Detail :</Form.Label>
                  <Form.Control
                    placeholder="Enter Name"
                    value={state.billTo}
                    type="text"
                    name="billTo"
                    className="my-2"
                    onChange={onChange}
                    autoComplete="name"
                    required={true}
                  ></Form.Control>
                  <Form.Control
                    placeholder="Enter Email"
                    value={state.billToEmail}
                    type="email"
                    name="billToEmail"
                    className="my-2"
                    onChange={onChange}
                    autoComplete="email"
                  ></Form.Control>
                  <Form.Control
                    placeholder="Enter Address"
                    value={state.billToAddress}
                    type="text"
                    name="billToAddress"
                    className="my-2"
                    onChange={onChange}
                    autoComplete="address"
                    required={true}
                  ></Form.Control>
                  <Form.Control
                    placeholder="Enter CIN No"
                    value={state.billToCINNo}
                    type="number"
                    name="billToCINNo"
                    className="my-2"
                    onChange={onChange}
                    autoComplete="text"
                    required={true}
                  ></Form.Control>
                  <Form.Control
                    placeholder="Enter Tel No"
                    value={state.billToTel}
                    type="number"
                    name="billToTel"
                    className="my-2"
                    onChange={onChange}
                    autoComplete="number"
                    required={true}
                  ></Form.Control>
                  <Form.Control
                    placeholder="Enter Fax No"
                    value={state.billToFax}
                    type="number"
                    name="billToFax"
                    className="my-2"
                    onChange={onChange}
                    autoComplete=""
                    required={true}
                  ></Form.Control>
                  <Form.Control
                    placeholder="Enter Vechicle No"
                    value={state.billToVechicle}
                    type="text"
                    name="billToVechicle"
                    className="my-2"
                    onChange={onChange}
                    autoComplete=""
                    required={true}
                  ></Form.Control>
                  <Form.Control
                    placeholder="Enter HSN Code"
                    value={state.billHSN}
                    type="number"
                    name="billHSN"
                    className="my-2"
                    onChange={onChange}
                    autoComplete=""
                    required={true}
                  ></Form.Control>
                  {/* <Form.Control
                    placeholder="Enter Po / Wo No"
                    value={state.billFromPONo}
                    type="number"
                    name="billFromPONo"
                    className="my-2"
                    onChange={onChange}
                    autoComplete=""
                    required={true}
                  /> */}
                  {/* <Form.Control
                    placeholder="Enter Po Date"
                    value={state.billFromPoDate}
                    type="number"
                    name="billFromPoDate"
                    className="my-2"
                    onChange={onChange}
                    autoComplete=""
                    required={true}
                  /> */}
                  <Form.Group className="my-3">
                    <Form.Label>Country:</Form.Label>
                    <Form.Select
                      name="country"
                      value={state.country}
                      onChange={handleCountryChange}
                    >
                      <option value="">-- Select --</option>
                      <option value="India">India</option>
                      {/* <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="Srilanka">Srilanka</option> */}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="my-3">
                    <Form.Label>State:</Form.Label>
                    <Form.Select
                      name="state"
                      value={state.state}
                      onChange={onChange}
                      disabled={!state.country}
                    >
                      <option value="">-- Select State --</option>
                      {countries[state.country]?.map((stateName, index) => (
                        <option key={index} value={stateName}>
                          {stateName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                {/* <Col>
                  <Form.Label className="fw-bold">
                    Production Company Detail :{" "}
                  </Form.Label>
                  <Form.Control
                    value={state.billFrom}
                    className="my-2"
                    disabled={true}
                  />
                  <Form.Control
                    placeholder="Invoive Number"
                    value={state.invoiceNumber}
                    type="number"
                    name="invoiceNumber"
                    className="my-2"
                    onChange={onChange}
                    autoComplete=""
                    required={true}
                  />
                  <Form.Control
                    placeholder="Enter Po / Wo No"
                    value={state.billFromPONo}
                    type="number"
                    name="billFromPONo"
                    className="my-2"
                    onChange={onChange}
                    autoComplete=""
                    required={true}
                  />
                  <Form.Control
                    value={state.billFromName}
                    className="my-2"
                    disabled={true}
                  />
                  <Form.Control
                    value={state.billFromEmail}
                    className="my-2"
                    disabled={true}
                  />
                  <Form.Control
                    value={state.billFromAddress}
                    className="my-2"
                    disabled={true}
                  />
                  <Form.Control
                    value={state.billFromcontactNo}
                    className="my-2"
                    disabled={true}
                  />
                </Col> */}
              </Row>
              <InvoiceItem
                items={items}
                onItemizedItemEdit={onItemizedItemEdit}
                onRowAdd={handleAddEvent}
                onRowDel={handleRowDel}
                currency={state.currency}
              />
              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold ">Subtotal:</span>
                    <span>
                      {state.currency} {state.subTotal}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold ">TaxRate:</span>
                    <span>
                      {state.taxRate} % {state.currency} {state.taxAmount}
                    </span>
                  </div>
                  <div
                    className="d-flex flex-row align-items-start justify-content-between mt-2"
                    style={{ fontSize: "1.125rem" }}
                  >
                    <span className="fw-bold">Total:</span>
                    <span>
                      {state.currency} {total}
                    </span>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={4} lg={3}>
            <div className="sticky-top pt-md-3 pt-xl-4">
              <Button
                variant="primary"
                type="submit"
                className="d-block w-100 mb-3"
              >
                Review Invoice
              </Button>
              {/* <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Currency : </Form.Label>
                <Form.Select
                  onChange={(e) =>
                    onCurrencyChange({ currency: e.target.value })
                  }
                  className="btn btn-ligt my-1"
                >
                  <option value="₹">INR</option>
                  <option value="$">USD</option>
                </Form.Select>
              </Form.Group> */}
              <Form.Group className="my-3">
                {/* <Form.Label className="fw-bold">Tax Rate:</Form.Label> */}
                <InputGroup className="my-1 flex-nowrap">
                  {/* <Form.Control
                    name="taxRate"
                    type="number"
                    value={state.taxRate}
                    onChange={onChange}
                    className="bg-whitwe-border"
                    placeholder=""
                    // min="0.00"
                    // step="0.01"
                    // max="100.00"
                  /> */}
                  {/* <Form.Control
                  name="total"
                  type="number"
                  value={state.total}
                  onChange={handleAmountChange}
                  className="bg-whitwe-border"
                  placeholder="0.00"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <p>Amount {amountinWords}</p> */}
                  {/* <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text> */}
                </InputGroup>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Form>
      <InvoiceModal
        showModal={state.isOpen}
        closeModal={() => setState((state) => ({ ...state, isOpen: false }))}
        info={state}
        items={items}
        total={total}
      />
    </>
  );
};
