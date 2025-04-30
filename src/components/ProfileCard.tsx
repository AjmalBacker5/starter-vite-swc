import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Heart,
  X,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProfileCardProps {
  profile?: {
    id: string;
    name: string;
    age: number;
    location: string;
    education: string;
    career: string;
    interests: string[];
    atheismStance: string;
    photos: string[];
    bio: string;
  };
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onViewDetails?: () => void;
  onChat?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile = {
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
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  onViewDetails = () => {},
  onChat = () => {},
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPhotoIndex < profile.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const handleDragStart = (e: React.MouseEvent) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setDragOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Determine if the drag was a swipe (threshold of 100px)
    if (dragOffset.x > 100) {
      onSwipeRight();
    } else if (dragOffset.x < -100) {
      onSwipeLeft();
    }

    // Reset drag offset
    setDragOffset({ x: 0, y: 0 });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-background">
      <motion.div
        className="relative"
        animate={{
          x: dragOffset.x,
          rotate: dragOffset.x * 0.05, // slight rotation based on drag
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <Card className="overflow-hidden shadow-lg rounded-xl border-2 border-border">
          <div className="relative h-[500px] w-full">
            {/* Photo carousel */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${profile.photos[currentPhotoIndex]})`,
              }}
            />

            {/* Photo navigation */}
            <div className="absolute inset-x-0 top-4 flex justify-between px-4">
              <div className="flex space-x-2">
                {profile.photos.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-12 rounded-full ${index === currentPhotoIndex ? "bg-primary" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </div>

            {/* Left/Right arrows */}
            {currentPhotoIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full"
                onClick={prevPhoto}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}

            {currentPhotoIndex < profile.photos.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full"
                onClick={nextPhoto}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}

            {/* Profile info overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h2 className="text-2xl font-bold">
                {profile.name}, {profile.age}
              </h2>
              <p className="text-sm opacity-90">{profile.location}</p>
              <p className="text-sm mt-1 opacity-90">{profile.career}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-primary/20 text-primary-foreground"
                >
                  {profile.atheismStance}
                </Badge>
                {profile.interests.slice(0, 3).map((interest, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-white/10 text-white border-white/20"
                  >
                    {interest}
                  </Badge>
                ))}
                {profile.interests.length > 3 && (
                  <Badge
                    variant="outline"
                    className="bg-white/10 text-white border-white/20"
                  >
                    +{profile.interests.length - 3} more
                  </Badge>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="mt-3 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(true);
                }}
              >
                <Info className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>

          <CardContent className="p-4 flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={onSwipeLeft}
            >
              <X className="h-8 w-8" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
              onClick={onChat}
            >
              <MessageCircle className="h-8 w-8" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
              onClick={onSwipeRight}
            >
              <Heart className="h-8 w-8" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed profile dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile.photos[0]} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                {profile.name}, {profile.age}
              </div>
            </DialogTitle>
            <DialogDescription>{profile.location}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                About
              </h3>
              <p className="mt-1">{profile.bio}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Education
              </h3>
              <p className="mt-1">{profile.education}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Career
              </h3>
              <p className="mt-1">{profile.career}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Stance on Atheism
              </h3>
              <p className="mt-1">{profile.atheismStance}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Interests
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={() => {
                  setShowDetails(false);
                  onSwipeLeft();
                }}
              >
                <X className="h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => {
                  setShowDetails(false);
                  onChat();
                }}
              >
                <MessageCircle className="h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                onClick={() => {
                  setShowDetails(false);
                  onSwipeRight();
                }}
              >
                <Heart className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileCard;
