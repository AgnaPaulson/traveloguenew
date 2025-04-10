
import React, { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface LoginTabsProps {
  navigate: NavigateFunction;
}

const LoginTabs: React.FC<LoginTabsProps> = ({ navigate }) => {
  const { firebaseConfigured } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  
  // If Firebase is not configured, show simplified login
  if (!firebaseConfigured) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Travelogue</CardTitle>
          <CardDescription className="text-center">
            Authentication is temporarily disabled
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {authError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          
          <div className="text-center py-4">
            <p className="mb-4">
              To enable authentication, you need to configure Firebase. For now, you can continue to the app.
            </p>
            <Button 
              className="w-full bg-travel-primary hover:bg-travel-dark"
              onClick={() => navigate('/')}
            >
              Continue to Application
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Normal login tabs with authentication
  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login">Sign In</TabsTrigger>
        <TabsTrigger value="register">Sign Up</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <LoginForm navigate={navigate} />
      </TabsContent>
      
      <TabsContent value="register">
        <RegisterForm navigate={navigate} />
      </TabsContent>
    </Tabs>
  );
};

export default LoginTabs;
