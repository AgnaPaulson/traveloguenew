
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Login: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      return;
    }
    
    try {
      setIsLoading(true);
      await signInWithEmail(loginEmail, loginPassword);
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerEmail || !registerPassword) {
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    try {
      setIsLoading(true);
      await signUpWithEmail(registerEmail, registerPassword);
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to Travelogue
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your personal travel companion
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        className="pl-10" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="password" 
                        type="password" 
                        className="pl-10" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-travel-primary hover:bg-travel-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full" 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Enter your details to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="register-email" 
                        type="email" 
                        placeholder="you@example.com" 
                        className="pl-10" 
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="register-password" 
                        type="password" 
                        className="pl-10" 
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        className="pl-10" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-travel-primary hover:bg-travel-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                    <UserIcon className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full" 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
