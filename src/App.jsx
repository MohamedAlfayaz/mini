import { useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import { InvoiceForm } from "./components/InvoiceForm";
import { Header } from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,Route,Routes, } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Container>
          <div className="App d-flex flex-column align-items-center justify-content-center w-100">
            <Routes>
              <Route path="/" element={<InvoiceForm />} />
            </Routes>
          </div>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
