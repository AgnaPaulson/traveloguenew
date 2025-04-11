
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Login from './pages/Login';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./pages/NotFound";
import SignUp from './pages/SignUp';
import ChatBotButton from './components/ChatBotButton';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <div className="pt-16"> {/* Added padding to account for fixed navbar */}
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Index />
                      </ProtectedRoute>
                    }
                  />
                  {/* Placeholder routes for navigation - will redirect to NotFound until implemented */}
                  <Route
                    path="/trips"
                    element={
                      <ProtectedRoute>
                        <NotFound />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/map"
                    element={
                      <ProtectedRoute>
                        <NotFound />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/finances"
                    element={
                      <ProtectedRoute>
                        <NotFound />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/album"
                    element={
                      <ProtectedRoute>
                        <NotFound />
                      </ProtectedRoute>
                    }
                  />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <ChatBotButton />
            </div>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
