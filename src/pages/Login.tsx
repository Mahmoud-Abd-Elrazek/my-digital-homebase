
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Define your password - you should change this to your preferred password
    const ownerPassword = "admin123";
    
    if (password === ownerPassword) {
      // Set authenticated flag in localStorage
      localStorage.setItem("dashboard_authenticated", "true");
      
      // Show success message
      toast({
        title: "Login successful",
        description: "Welcome to your dashboard",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg border">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Dashboard Login</h1>
          <p className="text-muted-foreground mt-2">Enter your password to access the dashboard</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          <p>Only the owner has access to the dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
