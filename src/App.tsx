import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import OnboardingFlow from "./pages/OnboardingFlow";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Cards from "./pages/Cards";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <SignedOut>
                  <OnboardingFlow />
                </SignedOut>
                <SignedIn>
                  <Home />
                </SignedIn>
              </>
            } 
          />
          <Route 
            path="/home" 
            element={
              <SignedIn>
                <Home />
              </SignedIn>
            } 
          />
          <Route 
            path="/update" 
            element={
              <SignedIn>
                <Update />
              </SignedIn>
            } 
          />
          <Route 
            path="/cards" 
            element={
              <SignedIn>
                <Cards />
              </SignedIn>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <SignedIn>
                <Profile />
              </SignedIn>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
