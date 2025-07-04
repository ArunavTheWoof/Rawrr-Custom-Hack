
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react';
import LoadingState from "@/components/LoadingState";
import OnboardingFlow from "./pages/OnboardingFlow";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Cards from "./pages/Cards";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();
  
  // Show loading while auth state is being determined
  if (!isLoaded) {
    return <LoadingState type="auth" message="Authenticating..." />;
  }
  
  // Redirect to onboarding if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

// Public route wrapper (for onboarding page)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();
  
  // Show loading while auth state is being determined
  if (!isLoaded) {
    return <LoadingState type="auth" message="Loading Rawrr.io..." />;
  }
  
  // Redirect to home if already authenticated
  if (isSignedIn) {
    return <Navigate to="/home" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* Default route redirects to onboarding */}
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          
          {/* Public onboarding route */}
          <Route 
            path="/onboarding" 
            element={
              <PublicRoute>
                <OnboardingFlow />
              </PublicRoute>
            } 
          />
          
          {/* Protected routes */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/update" 
            element={
              <ProtectedRoute>
                <Update />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cards" 
            element={
              <ProtectedRoute>
                <Cards />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
