import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ProfileSection = () => {
  const navigate = useNavigate();

  // Mock profile completion percentage - this would be calculated based on actual profile data
  const profileCompletionPercentage = 65;

  const profileOptions = [
    {
      name: "Edit Profile",
      icon: <User className="h-5 w-5 mr-2" />,
      action: () => navigate("/edit-profile"),
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5 mr-2" />,
      action: () => console.log("Settings clicked"),
    },
    {
      name: "Contact and FAQs",
      icon: <HelpCircle className="h-5 w-5 mr-2" />,
      action: () => console.log("Contact and FAQs clicked"),
    },
    {
      name: "Logout",
      icon: <LogOut className="h-5 w-5 mr-2" />,
      action: () => console.log("Logout clicked"),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-screen-xl mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="text-primary font-bold text-2xl">
            <span className="text-primary">Free</span>
            <span className="text-rose-500">tta</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        {/* Profile Completion Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Profile Completion</h2>
              <span className="text-lg font-medium">
                {profileCompletionPercentage}%
              </span>
            </div>
            <Progress
              value={profileCompletionPercentage}
              className="h-2 mb-2"
            />
            {profileCompletionPercentage < 100 && (
              <p className="text-sm text-muted-foreground mt-2">
                Your profile is {profileCompletionPercentage}% complete. Add
                more details to increase your chances of finding a match.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Profile Options */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {profileOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start rounded-none h-14 px-6"
                  onClick={option.action}
                >
                  {option.icon}
                  <span>{option.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfileSection;
