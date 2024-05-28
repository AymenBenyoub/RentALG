import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// eslint-disable-next-line no-unused-vars
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
