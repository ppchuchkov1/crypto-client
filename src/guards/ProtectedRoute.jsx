import { Navigate } from "react-router-dom";
import useAuthStore from "../zustang/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  // if no token redirect to login
  if (!token || token.length === 0) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
