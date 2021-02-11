//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import Home from "./home";

//include your index.scss file into the bundle
import "../js/styles.css";

//render your react application
ReactDOM.render(<Home />, document.querySelector("#app"));
