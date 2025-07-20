import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga4";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";

if (import.meta.env.PROD) {
  const GA_MEASUREMENT_ID = "G-F8DS5Y4Y1Y";

  ReactGA.initialize(GA_MEASUREMENT_ID);
} else {
  console.log(`当前环境: ${import.meta.env.MODE}`);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
