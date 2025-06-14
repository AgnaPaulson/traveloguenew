import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoginTabs from './LoginTabs';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-travel-secondary">
            Welcome to Travelogue
          </DialogTitle>
          <DialogDescription className="text-center text-travel-secondary/70">
            Please sign in to access this feature
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <LoginTabs navigate={navigate} showAdPanel={false} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;