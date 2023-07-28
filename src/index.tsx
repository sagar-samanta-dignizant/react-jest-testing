import * as ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";

import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./styles/main.css";

const rootNode = document.getElementById("root");
//The BrowserRouter component provides client-side routing functionality for the application, allowing the user to navigate between different pages without reloading the entire application. 
// /The HelmetProvider component allows the application to dynamically set meta tags and other header information for each page.
ReactDOM.render(
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>,
  rootNode
);
