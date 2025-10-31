import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allow, children }) {
  const { user } = useAuth();

  // Nếu chưa đăng nhập, chuyển hướng về trang login
  if (!user) return <Navigate to="/login" replace />;

  // Nếu role không hợp lệ, chuyển hướng về trang 403 hoặc home
  if (allow && !allow.includes(user.role)) return <Navigate to="/" replace />;

  // Nếu hợp lệ, render children
  return children;
}
