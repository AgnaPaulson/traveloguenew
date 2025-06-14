
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginModalProvider } from './contexts/LoginModalContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Login from './pages/Login';
import LoginModal from './components/auth/LoginModal';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./pages/NotFound";
import SignUp from './pages/SignUp';
import ChatBotButton from './components/ChatBotButton';
import { useLoginModal } from './contexts/LoginModalContext';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal } = useLoginModal();

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16"> {/* Added padding to account for fixed navbar */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Index />} />
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
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LoginModalProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Router>
              <AppContent />
            </Router>
          </TooltipProvider>
        </QueryClientProvider>
      </LoginModalProvider>
    </AuthProvider>
  );
};

export default App;
