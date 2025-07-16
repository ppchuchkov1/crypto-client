import { Navigate } from "react-router-dom";
import useAuthStore from "../zustang/useAuthStore";

const GuestRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  // if has token redirect to home
  if (token && token.length > 0) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
