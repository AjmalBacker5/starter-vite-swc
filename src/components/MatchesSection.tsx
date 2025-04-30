import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MatchProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  photo: string;
  matchDate: Date;
}

const MatchesSection = () => {
  const [activeTab, setActiveTab] = useState("matches");

  // Mock data for matches
  const matches: MatchProfile[] = [
    {
      id: "1",
      name: "Priya Sharma",
      age: 28,
      location: "Mumbai, Maharashtra",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
      matchDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      id: "2",
      name: "Ananya Patel",
      age: 26,
      location: "Delhi, NCR",
      photo:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
      matchDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    },
  ];

  // Mock data for likes sent
  const likesSent: MatchProfile[] = [
    {
      id: "3",
      name: "Rahul Kapoor",
      age: 32,
      location: "Bangalore, Karnataka",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      matchDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    },
    {
      id: "4",
      name: "Vikram Singh",
      age: 30,
      location: "Pune, Maharashtra",
      photo:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80",
      matchDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    },
  ];

  // Mock data for likes received
  const likesReceived: MatchProfile[] = [
    {
      id: "5",
      name: "Neha Gupta",
      age: 27,
      location: "Chennai, Tamil Nadu",
      photo:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80",
      matchDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    },
    {
      id: "6",
      name: "Arjun Mehta",
      age: 29,
      location: "Hyderabad, Telangana",
      photo:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80",
      matchDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
  ];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "1 day ago";
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <div className="container px-4 py-6 flex-1">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Connections</h1>

      <Tabs
        defaultValue="matches"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="who-i-like">Who I Like</TabsTrigger>
            <TabsTrigger value="likes-me">Likes Me</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="matches" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.length > 0 ? (
              matches.map((match) => (
                <Card key={match.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={match.photo} alt={match.name} />
                        <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-medium">
                          {match.name}, {match.age}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {match.location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Matched {formatDate(match.matchDate)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                      <Button size="sm">Message</Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">
                  No matches yet. Keep swiping!
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="who-i-like" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likesSent.length > 0 ? (
              likesSent.map((profile) => (
                <Card key={profile.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={profile.photo} alt={profile.name} />
                        <AvatarFallback>
                          {profile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-medium">
                          {profile.name}, {profile.age}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {profile.location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Liked {formatDate(profile.matchDate)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button size="sm" variant="outline" className="w-full">
                        Withdraw Interest
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">
                  You haven't liked anyone yet.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="likes-me" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likesReceived.length > 0 ? (
              likesReceived.map((profile) => (
                <Card key={profile.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={profile.photo} alt={profile.name} />
                        <AvatarFallback>
                          {profile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-medium">
                          {profile.name}, {profile.age}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {profile.location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Liked you {formatDate(profile.matchDate)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button size="sm" variant="outline">
                        Pass
                      </Button>
                      <Button size="sm">Like Back</Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">
                  No one has liked you yet. Keep improving your profile!
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchesSection;
