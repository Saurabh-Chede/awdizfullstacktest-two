import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useSelector((state) => state.auth);

  console.log("ProtectedRoute", {
    loading,
    user,
    allowedRoles,
    path: window.location.pathname,
  });

  console.log("PROTECTED", loading, user);

  if (loading) return <h1>Loading...</h1>;

  if (!user) {
    console.log("Redirect: No User");
    return <Navigate to="/" replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    console.log("Redirect: Role Not Allowed");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;