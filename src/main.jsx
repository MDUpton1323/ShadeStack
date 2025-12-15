import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.jsx";
import "./index.css";

const container = document.getElementById("root");
const root = ReactDom.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
