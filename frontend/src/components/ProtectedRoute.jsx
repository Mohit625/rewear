import { useAuth } from "@/auth/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  console.log("=== PROTECTED ROUTE DEBUG ===");
  console.log("isLoading:", isLoading);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
  console.log("token exists:", !!localStorage.getItem("auth_token"));
  console.log("location:", location.pathname);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-green-600" />
          <span>Checking authentication...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
