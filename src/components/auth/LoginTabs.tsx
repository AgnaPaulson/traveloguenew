
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

interface LoginTabsProps {
  navigate: NavigateFunction;
}

const LoginTabs: React.FC<LoginTabsProps> = ({ navigate }) => {
  const handleContinue = () => {
    navigate('/');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Welcome to Travelogue</CardTitle>
        <CardDescription className="text-center">
          Authentication is temporarily disabled
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-4">
          <p className="mb-4">
            Login and authentication have been temporarily disabled to showcase the project.
            Authentication will be properly implemented later.
          </p>
          <Button 
            className="w-full bg-travel-primary hover:bg-travel-dark"
            onClick={handleContinue}
          >
            Continue to Application
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginTabs;
