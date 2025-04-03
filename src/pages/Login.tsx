import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock, Google, Loader } from 'lucide-react';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmail(form.email, form.password);
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };
=======
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, User as UserIcon, ArrowRight, AlertCircle, FileCode } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Login: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, firebaseConfigured } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      setIsLoading(true);
      await signInWithGoogle();
      navigate('/');
<<<<<<< HEAD
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!form.email) {
      setError('Please enter your email address');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await resetPassword(form.email);
      setResetSent(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-travel-primary hover:text-travel-dark">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {resetSent && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
              Password reset email sent! Check your inbox.
            </div>
          )}

          <form onSubmit={handleEmailSignIn} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-travel-primary focus:border-travel-primary"
                />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-travel-primary focus:border-travel-primary"
                />
                <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-travel-primary focus:ring-travel-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-sm font-medium text-travel-primary hover:text-travel-dark"
              >
                Forgot your password?
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-travel-primary hover:bg-travel-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-travel-primary"
              >
                {loading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign in
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-travel-primary"
              >
                <Google className="h-5 w-5 mr-2 text-red-600" />
                Sign in with Google
              </button>
            </div>
=======
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

  if (!firebaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Firebase Configuration Missing
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please set up your Firebase configuration
            </p>
>>>>>>> a82bc0ebdc254222bb070b68646209c48572eff2
          </div>
          
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Firebase Configuration Error</AlertTitle>
            <AlertDescription>
              <p className="mb-4">Your Firebase configuration is missing or incomplete.</p>
              <Button 
                variant="outline" 
                className="mb-4" 
                onClick={() => setShowInstructions(true)}
              >
                <FileCode className="mr-2 h-4 w-4" />
                View Setup Instructions
              </Button>
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle>Setup Options</CardTitle>
              <CardDescription>
                Choose how you want to set up Firebase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-gray-50 p-4 border">
                <h3 className="text-sm font-medium mb-2">Option 1: Environment Variables (Recommended)</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Create a <code>.env</code> file in your project root with the required Firebase variables.
                </p>
              </div>
              
              <div className="rounded-md bg-gray-50 p-4 border">
                <h3 className="text-sm font-medium mb-2">Option 2: Development Mode</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Edit <code>src/config/firebase.ts</code> and uncomment the developer mode section. Add your Firebase 
                  config directly for quick development.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Firebase Setup Instructions</DialogTitle>
              <DialogDescription>
                Follow these steps to configure Firebase
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto p-2">
              <div>
                <h3 className="text-sm font-medium mb-2">1. Create a Firebase Project</h3>
                <p className="text-sm text-gray-500">
                  Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Firebase Console</a> and create a new project if you don't have one already.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">2. Register Your Web App</h3>
                <p className="text-sm text-gray-500">
                  Click the web icon ({"</>"}) to add a web app to your Firebase project.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">3. Get Your Firebase Config</h3>
                <p className="text-sm text-gray-500">
                  After registering, you'll be shown the Firebase config object with your app's details.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">4. Set up Environment Variables</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Create a <code>.env</code> file in your project root and add these variables:
                </p>
                <pre className="bg-gray-100 p-2 rounded-md text-xs overflow-x-auto">
{`VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">5. Alternative: Dev Mode Setup</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Alternatively, you can edit <code>src/config/firebase.ts</code> directly:
                </p>
                <ol className="list-decimal pl-5 text-sm text-gray-500 space-y-1">
                  <li>Uncomment the <code>devModeConfig</code> section</li>
                  <li>Fill in your Firebase config values</li>
                  <li>Uncomment <code>const activeConfig = devModeConfig;</code></li>
                  <li>Comment out <code>const activeConfig = firebaseConfig;</code></li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">6. Enable Authentication</h3>
                <p className="text-sm text-gray-500">
                  In the Firebase Console, go to Authentication {">"} Sign-in method and enable Email/Password and Google authentication methods.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

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
