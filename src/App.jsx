import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import CustomerDashboard from "./pages/customer/Dashboard";
import BookingPage from "./pages/customer/BookingPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import ServiceStatus from "./pages/customer/ServiceStatus";
import Profile from "./pages/customer/Profile";

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<div className="p-6">Welcome to EV Service</div>} />
          <Route path="/customer" element={
            <ProtectedRoute allow={["customer"]}>
              <Layout><CustomerDashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/customer/booking" element={
            <ProtectedRoute allow={["customer"]}>
              <Layout><BookingPage /></Layout>
            </ProtectedRoute>
          } />
          {/* add login/403 pages if needed */}
          <Route path="/customer/status" element={
            <ProtectedRoute allow={["customer"]}>
              <Layout><ServiceStatus /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/customer/profile" element={
            <ProtectedRoute allow={["customer"]}>
              <Layout><Profile /></Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
