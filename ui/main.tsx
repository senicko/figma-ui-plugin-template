import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { Ui } from "./ui";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Ui />
  </React.StrictMode>
);
