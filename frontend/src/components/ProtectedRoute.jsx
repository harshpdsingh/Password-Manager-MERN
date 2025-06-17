import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token not found, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token found, render the child component
  return children;
};

export default ProtectedRoute;
