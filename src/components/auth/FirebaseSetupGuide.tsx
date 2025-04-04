
import React, { useState } from 'react';
import { AlertCircle, FileCode } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const FirebaseSetupGuide: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(false);

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
};

export default FirebaseSetupGuide;
