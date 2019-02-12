import React from "react";
import ReactDOM from "react-dom";

import config from "../../../config/config.json";
import modules from "./generated/modules";
import Layout from "./Layout";
import "./global.scss";

const container = document.getElementById("app");

ReactDOM.render(<Layout config={config} modules={modules} />, container);
