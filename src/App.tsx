import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import MasterCustomer from "./pages/MasterCustomer";
import MasterRoom from "./pages/MasterRoom";
import KelolaPinjaman from "./pages/KelolaPinjaman";
import CustomerDashboard from "./pages/CustomerDashboard";
import DaftarRuangan from "./pages/DaftarRuangan";
import RiwayatPinjaman from "./pages/RiwayatPinjaman";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<MasterCustomer />} />
        <Route path="/admin/rooms" element={<MasterRoom />} />
        <Route path="/admin/bookings" element={<KelolaPinjaman />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/rooms" element={<DaftarRuangan />} />
        <Route path="/customer/history" element={<RiwayatPinjaman />} />
      </Routes>
    </Router>
  );
}

export default App;