import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./main.css";
import AppRouter from "./AppRouter";

import AuthProvider from "./providers/AuthProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ResponsiveProvider } from "./providers/ResponsiveContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ThemeProvider>
      <ResponsiveProvider> 
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ResponsiveProvider>
    </ThemeProvider>
  </AuthProvider>
);
