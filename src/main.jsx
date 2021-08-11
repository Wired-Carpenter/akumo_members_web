import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RouteManager } from "./Router";
import { Head } from "./components/common/head";
import "./css/variables.less";
import "./css/global.less";
// import "bootstrap/dist/css/bootstrap.min.css";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
}

ReactDOM.render(
  // <React.StrictMode>
  <>
    <Head />
    <BrowserRouter>
      <RouteManager />
    </BrowserRouter>
  </>,
  // </React.StrictMode>,
  document.getElementById("root")
);
