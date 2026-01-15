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
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Route>

      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="payments" element={<Payments />} />
      </Route>
    </Routes>
  );
}
