import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { EmployeeProvider } from "./context/EmployeeContext";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Login from "./pages/login";
import "./index.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EmployeeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </EmployeeProvider>
  </StrictMode>
);

