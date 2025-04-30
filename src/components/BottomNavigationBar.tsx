import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, MessageSquare, Sliders, User } from "lucide-react";

interface BottomNavigationBarProps {
  className?: string;
}

const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  className = "",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      name: "Discover",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Matches",
      path: "/matches",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Preferences",
      path: "/preferences",
      icon: <Sliders className="h-5 w-5" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  // Don't show navigation bar on authentication screens
  const authScreens = ["/welcome", "/enter-phone", "/verify-otp"];
  if (authScreens.includes(currentPath)) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 ${className}`}
      style={{ position: "fixed", bottom: 0, width: "100%" }}
    >
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.path ||
            (item.path === "/" && currentPath === "/");

          return (
            <button
              key={item.name}
              className={`flex flex-col items-center justify-center w-full h-full ${isActive ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigationBar;
