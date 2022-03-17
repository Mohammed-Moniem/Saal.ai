import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CustomerProvider } from "./context/context";

ReactDOM.render(
  <React.StrictMode>
    <CustomerProvider>
      <App />
    </CustomerProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
