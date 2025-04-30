import React, { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProfileCard from "./ProfileCard";

const Home = () => {
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(2);

  // Mock user data
  const user = {
    name: "Arjun",
    age: 32,
    location: "Mumbai, India",
    education: "Ph.D. in Physics",
    career: "Research Scientist",
    interests: ["Science", "Philosophy", "Reading", "Hiking", "Travel"],
    atheismStance: "Secular Humanist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun",
    matches: 5,
    newMatches: 2,
  };

  // Mock potential matches data
  const potentialMatches = [
    {
      id: "1",
      name: "Priya Sharma",
      age: 28,
      location: "Bangalore, India",
      education: "M.Tech in Computer Science",
      career: "Software Engineer at Tech Corp",
      interests: ["Reading", "Hiking", "Philosophy", "Science", "Travel"],
      atheismStance: "Secular Humanist",
      photos: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
      ],
      bio: "Passionate about technology and rational thinking. Looking for someone who values critical thinking and shares similar worldviews. Love exploring new places and ideas.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-screen-xl mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="text-primary font-bold text-2xl">
              <span className="text-primary">Free</span>
              <span className="text-rose-500">tta</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.matches} matches
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Three Column Layout */}
      <main className="flex-1 container px-4 py-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - User Profile */}
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">
                    {user.name}, {user.age}
                  </h2>
                  <p className="text-muted-foreground">{user.location}</p>
                </div>

                <div className="space-y-4 text-left">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Education
                    </h3>
                    <p>{user.education}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Career
                    </h3>
                    <p>{user.career}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Stance on Atheism
                    </h3>
                    <p>{user.atheismStance}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Interests
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6" variant="outline">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Profile Card */}
          <div className="md:col-span-1">
            <ProfileCard
              profile={potentialMatches[0]}
              onSwipeLeft={() => console.log("Swiped left")}
              onSwipeRight={() => console.log("Swiped right")}
            />
          </div>

          {/* Right Column - Detailed Profile Information */}
          <div className="md:col-span-1">
            <Card className="h-full overflow-auto">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  {potentialMatches[0].name}'s Profile
                </h2>

                <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      About
                    </h3>
                    <p className="text-sm">{potentialMatches[0].bio}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Location
                    </h3>
                    <p className="text-sm">{potentialMatches[0].location}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Education
                    </h3>
                    <p className="text-sm">{potentialMatches[0].education}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Career
                    </h3>
                    <p className="text-sm">{potentialMatches[0].career}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Stance on Atheism
                    </h3>
                    <p className="text-sm">
                      {potentialMatches[0].atheismStance}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Interests
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {potentialMatches[0].interests.map((interest, index) => (
                        <Badge key={index} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Photos
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {potentialMatches[0].photos.map((photo, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-md overflow-hidden"
                        >
                          <img
                            src={photo}
                            alt={`${potentialMatches[0].name} photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className="w-full" variant="outline">
                    View Full Profile
                  </Button>
                  <Button className="w-full">Send Message</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 bg-background">
        <div className="container flex flex-col md:flex-row items-center justify-between px-4 text-sm text-muted-foreground">
          <p>© 2023 Freetta. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <Button variant="link" size="sm" className="text-xs">
              Privacy Policy
            </Button>
            <Button variant="link" size="sm" className="text-xs">
              Terms of Service
            </Button>
            <Button variant="link" size="sm" className="text-xs">
              Contact Us
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
