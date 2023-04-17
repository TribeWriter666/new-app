import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ element, ...rest }) {
  const isAuthenticated = !!localStorage.getItem("supabase.auth.token");
  return isAuthenticated ? (
    <Route element={element} {...rest} />
  ) : (
    <Navigate to="/" />
  );
}

export default ProtectedRoute;
