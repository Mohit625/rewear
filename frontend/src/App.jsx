import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Admin from "./pages/Admin";
import Categories from "./pages/Categories";
import Browse from "./pages/Browse";
import HowItWorks from "./pages/HowItWorks";
import Dashboard from "./pages/Dashboard";
import Wishlist from "./pages/Wishlist";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/list-item"
              element={
                <ProtectedRoute>
                  <AddItem />
                </ProtectedRoute>
              }
            />
            {/* CATCH ALL */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
  );
}

export default App;
