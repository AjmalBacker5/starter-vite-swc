import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/enter-phone");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Freetta</h1>
          <p className="text-muted-foreground">
            Connect with like-minded individuals in the atheist community
          </p>
        </div>

        <div className="relative h-64 w-full rounded-lg overflow-hidden my-8">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
            alt="Couple"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <Button className="w-full py-6 text-lg" onClick={handleNavigation}>
            Get Started
          </Button>
          <Button
            variant="outline"
            className="w-full py-6 text-lg"
            onClick={handleNavigation}
          >
            Log In
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
