import React, { useState } from "react";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import UserManagement from "./Pages/UserManagement";
import ProductManagement from "./Pages/ProductManagement";
import OrderManagement from "./Pages/OrderManagement";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  if (activePage === "users") {
    return <UserManagement onBack={() => setActivePage("dashboard")} />;
  }
  if (activePage === "products") {
    return <ProductManagement onBack={() => setActivePage("dashboard")} />;
  }
  if (activePage === "orders") {
    return <OrderManagement onBack={() => setActivePage("dashboard")} />;
  }

  return <Dashboard onNavigate={setActivePage} />;
}
