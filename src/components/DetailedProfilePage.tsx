import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Heart, X, MessageCircle, Share2, ArrowLeft } from "lucide-react";

const mockProfiles = [
  {
    id: "1",
    name: "Priya Sharma",
    age: 28,
    location: "Mumbai, India",
    occupation: "Software Engineer",
    education: "M.Tech in Computer Science",
    about:
      "Passionate about technology, philosophy, and meaningful conversations. Looking for someone who values intellectual discussions and shares my secular worldview.",
    interests: ["Reading", "Hiking", "Philosophy", "Coding", "Travel"],
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
    ],
    atheismStance:
      "Secular humanist who believes in ethics based on reason rather than religion.",
  },
  {
    id: "2",
    name: "Rahul Kapoor",
    age: 32,
    location: "Bangalore, India",
    occupation: "Data Scientist",
    education: "PhD in Statistics",
    about:
      "Rational thinker who enjoys debates on science, politics, and philosophy. Looking for a partner who values evidence-based thinking and has a curious mind.",
    interests: ["Chess", "Documentaries", "Debates", "Cooking", "Music"],
    photos: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80",
    ],
    atheismStance:
      "Atheist who respects others' right to their beliefs but values critical thinking above all.",
  },
];

const DetailedProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Find the profile based on the ID from the URL params
  const profile = mockProfiles.find((p) => p.id === id) || mockProfiles[0];

  const nextPhoto = () => {
    setActivePhotoIndex((prev) =>
      prev === profile.photos.length - 1 ? 0 : prev + 1,
    );
  };

  const prevPhoto = () => {
    setActivePhotoIndex((prev) =>
      prev === 0 ? profile.photos.length - 1 : prev - 1,
    );
  };

  return (
    <div className="container mx-auto p-4 pb-20 max-w-md">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">{profile.name}'s Profile</h1>
      </div>

      <div className="relative rounded-lg overflow-hidden mb-4 aspect-[3/4]">
        <img
          src={profile.photos[activePhotoIndex]}
          alt={`${profile.name} photo ${activePhotoIndex + 1}`}
          className="w-full h-full object-cover"
          onClick={nextPhoto}
        />

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
          {profile.photos.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full ${index === activePhotoIndex ? "w-6 bg-primary" : "w-1.5 bg-gray-300"}`}
              onClick={() => setActivePhotoIndex(index)}
            />
          ))}
        </div>

        <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-4">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full h-12 w-12"
          >
            <X className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full h-12 w-12"
          >
            <Heart className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full h-12 w-12"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full h-12 w-12"
          >
            <Share2 className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">
              {profile.name}, {profile.age}
            </h2>
            <p className="text-muted-foreground">{profile.location}</p>
          </div>

          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="interests">Interests</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">About Me</h3>
                <p>{profile.about}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">My Stance on Atheism</h3>
                <p>{profile.atheismStance}</p>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Occupation</h3>
                <p>{profile.occupation}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Education</h3>
                <p>{profile.education}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Location</h3>
                <p>{profile.location}</p>
              </div>
            </TabsContent>

            <TabsContent value="interests">
              <h3 className="font-semibold mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedProfilePage;
