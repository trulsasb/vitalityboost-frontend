import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import Shop from "./pages/Shop";

import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Payments from "./pages/admin/Payments";

import RequireAdmin from "./auth/RequireAdmin";

export default function App() {
  // 🔹 Backend-tilkoblingstest (kun for verifisering)
  useEffect(() => {
    fetch("https://DIN-BACKEND-URL/status")
      .then((res) => res
