import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import MasterCustomer from "./pages/MasterCustomer";
import MasterRoom from "./pages/MasterRoom";
import KelolaPinjaman from "./pages/KelolaPinjaman";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<MasterCustomer />} />
        <Route path="/admin/rooms" element={<MasterRoom />} />
        <Route path="/admin/bookings" element={<KelolaPinjaman />} />
      </Routes>
    </Router>
  );
}

export default App;