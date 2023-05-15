import "./index.css";
//import reportWebVitals from './reportWebVitals';

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import NotificationProvider from "./context/NotificationProvider";




ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </NotificationProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
