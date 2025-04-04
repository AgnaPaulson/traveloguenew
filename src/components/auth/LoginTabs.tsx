
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface LoginTabsProps {
  navigate: NavigateFunction;
}

const LoginTabs: React.FC<LoginTabsProps> = ({ navigate }) => {
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
