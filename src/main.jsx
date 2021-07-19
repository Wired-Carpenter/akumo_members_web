import React from "react";
import ReactDOM from "react-dom";
import { RouteManager } from "./Router";
import { Head } from "./components/common/head";
import "./css/variables.less";
import "./css/global.less";
// import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Head />
    <RouteManager />
  </React.StrictMode>,
  document.getElementById("root")
);
