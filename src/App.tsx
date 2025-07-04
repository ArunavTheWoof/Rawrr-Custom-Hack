import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser, SignInButton } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingState from "@/components/LoadingState";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Cards from "./pages/Cards";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Sign-in page component
const SignInPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rawrr-dark via-purple-900 to-rawrr-dark p-4">
    <Card className="w-full max-w-md glass-effect border-white/10 animate-scale-in">
      <CardHeader className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-rawrr-orange to-rawrr-orange-light rounded-full mx-auto flex items-center justify-center mb-6 animate-glow-pulse">
          <span className="text-3xl font-bold text-white">R</span>
        </div>
        <CardTitle className="text-3xl font-bold text-white mb-2">
          Welcome to Rawrr.io
        </CardTitle>
        <CardDescription className="text-white/70 text-lg">
          Your digital identity evolution starts here
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="text-white/80 mb-6">
            Join thousands of digital souls exploring their authentic selves
          </p>
        </div>
        <SignInButton 
          mode="modal" 
          fallbackRedirectUrl="/home"
        >
          <Button 
            className="w-full bg-gradient-to-r from-rawrr-orange to-rawrr-orange-light hover:from-rawrr-orange-light hover:to-rawrr-orange text-white font-semibold py-4 text-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]" 
            size="lg"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
        </SignInButton>
        <div className="text-center space-y-4">
          <p className="text-xs text-white/40">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
          <p className="text-rawrr-orange text-sm font-medium animate-bounce-subtle">
            ✨ Join the digital soul evolution ✨
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();
  
  // Show loading while auth state is being determined
  if (!isLoaded) {
    return <LoadingState type="auth" message="Authenticating..." />;
  }
  
  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
};

// Public route wrapper (for sign-in page)
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
          {/* Default route redirects to sign-in */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          
          {/* Public sign-in route */}
          <Route 
            path="/signin" 
            element={
              <PublicRoute>
                <SignInPage />
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
