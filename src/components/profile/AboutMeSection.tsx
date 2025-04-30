import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AboutMeSectionProps {
  aboutMe: string;
  setAboutMe: (value: string) => void;
}

const AboutMeSection = ({ aboutMe, setAboutMe }: AboutMeSectionProps) => {
  return (
    <div className="p-6 pb-20 space-y-4">
      <h2 className="text-xl font-semibold mb-4">About Me</h2>

      <div className="space-y-2">
        <Label htmlFor="aboutMe">Tell potential matches about yourself</Label>
        <Textarea
          id="aboutMe"
          placeholder="Share your interests, values, and what you're looking for in a partner..."
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          className="min-h-[150px]"
        />
        <p className="text-sm text-muted-foreground">
          {aboutMe.length}/500 characters
          {aboutMe.length < 50 && aboutMe.length > 0 && (
            <span className="text-red-500 ml-2">
              Please write at least 50 characters
            </span>
          )}
        </p>
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-medium mb-2">Tips for a great bio:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Share your interests and hobbies</li>
          <li>Mention your stance on atheism/secularism</li>
          <li>Describe what you're looking for in a partner</li>
          <li>Add some personality and humor</li>
          <li>Be authentic and honest</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutMeSection;
