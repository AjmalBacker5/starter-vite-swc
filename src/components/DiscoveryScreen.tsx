import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProfileCard from "./ProfileCard";

interface Profile {
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
}

interface DiscoveryScreenProps {
  onMatch?: (profile: Profile) => void;
  onSkip?: (profile: Profile) => void;
  onLike?: (profile: Profile) => void;
}

const DiscoveryScreen: React.FC<DiscoveryScreenProps> = ({
  onMatch = () => {},
  onSkip = () => {},
  onLike = () => {},
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<string | null>(null);
  const [showMatchDialog, setShowMatchDialog] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  // Mock profiles data
  const profiles: Profile[] = [
    {
      id: "1",
      name: "Priya Sharma",
      age: 28,
      location: "Mumbai, Maharashtra",
      education: "M.Tech, Computer Science",
      career: "Software Engineer at Google",
      interests: ["Reading", "Hiking", "Philosophy", "Science"],
      atheismStance: "Secular Humanist",
      photos: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
      ],
      bio: "Passionate about technology and rational thinking. Looking for someone who values science and critical thinking.",
    },
    {
      id: "2",
      name: "Arjun Patel",
      age: 32,
      location: "Bangalore, Karnataka",
      education: "PhD, Physics",
      career: "Research Scientist",
      interests: ["Astronomy", "Chess", "Documentaries", "Travel"],
      atheismStance: "Agnostic Atheist",
      photos: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80",
      ],
      bio: "Exploring the universe through science. Seeking a partner who appreciates intellectual discussions and adventure.",
    },
    {
      id: "3",
      name: "Neha Gupta",
      age: 26,
      location: "Delhi, NCR",
      education: "MBA, Finance",
      career: "Investment Banker",
      interests: ["Economics", "Yoga", "Art", "Cooking"],
      atheismStance: "Secular Buddhist",
      photos: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80",
      ],
      bio: "Analytical mind with a creative soul. Looking for someone who values independence and intellectual growth.",
    },
  ];

  const handleSwipe = (direction: string) => {
    setDirection(direction);

    const currentProfile = profiles[currentIndex];

    if (direction === "right") {
      onLike(currentProfile);
      // Simulate a match with 30% probability
      if (Math.random() < 0.3) {
        setMatchedProfile(currentProfile);
        setShowMatchDialog(true);
        onMatch(currentProfile);
      }
    } else {
      onSkip(currentProfile);
    }

    // Move to next profile after animation completes
    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Reset to first profile when we reach the end
        setCurrentIndex(0);
      }
      setDirection(null);
    }, 300);
  };

  const handleInfoClick = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowInfoDialog(true);
  };

  const currentProfile = profiles[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-background p-4">
      <div className="w-full max-w-md mx-auto relative h-[70vh]">
        <AnimatePresence>
          {direction ? (
            <motion.div
              key={currentIndex}
              initial={{ scale: 1 }}
              animate={{
                x:
                  direction === "left" ? -300 : direction === "right" ? 300 : 0,
                opacity: 0,
                scale: 0.8,
              }}
              transition={{ duration: 0.3 }}
              className="absolute w-full h-full"
            >
              <ProfileCard profile={currentProfile} />
            </motion.div>
          ) : (
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <ProfileCard profile={currentProfile} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full p-6"
          onClick={() => handleSwipe("left")}
        >
          <X className="h-8 w-8 text-destructive" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="rounded-full p-6"
          onClick={() => handleInfoClick(currentProfile)}
        >
          <Info className="h-8 w-8 text-primary" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="rounded-full p-6"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="h-8 w-8 text-green-500" />
        </Button>
      </div>

      {/* Match Dialog */}
      <Dialog open={showMatchDialog} onOpenChange={setShowMatchDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-primary">
              It's a Match!
            </DialogTitle>
            <DialogDescription className="text-center">
              You and {matchedProfile?.name} have liked each other
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center space-x-4 my-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="Your profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
              <img
                src={matchedProfile?.photos[0]}
                alt={matchedProfile?.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => setShowMatchDialog(false)}>
              Keep Swiping
            </Button>
            <Button>Send Message</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Info Dialog */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedProfile?.name}, {selectedProfile?.age}
            </DialogTitle>
            <DialogDescription>{selectedProfile?.location}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Photo carousel */}
            <div className="relative w-full h-80 bg-muted rounded-lg overflow-hidden">
              {selectedProfile?.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${selectedProfile?.name} photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ))}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">About</h3>
              <p>{selectedProfile?.bio}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Education</h3>
              <p>{selectedProfile?.education}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Career</h3>
              <p>{selectedProfile?.career}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Stance on Atheism</h3>
              <p>{selectedProfile?.atheismStance}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProfile?.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <Button variant="outline" onClick={() => handleSwipe("left")}>
              <X className="mr-2 h-4 w-4" /> Pass
            </Button>
            <Button onClick={() => handleSwipe("right")}>
              <Heart className="mr-2 h-4 w-4" /> Like
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiscoveryScreen;
