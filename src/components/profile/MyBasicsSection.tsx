import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MyBasicsSectionProps {
  height: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
  exercise: string;
  setExercise: React.Dispatch<React.SetStateAction<string>>;
  educationLevel: string;
  setEducationLevel: React.Dispatch<React.SetStateAction<string>>;
  weight: string;
  setWeight: React.Dispatch<React.SetStateAction<string>>;
  drinking: string;
  setDrinking: React.Dispatch<React.SetStateAction<string>>;
  smoking: string;
  setSmoking: React.Dispatch<React.SetStateAction<string>>;
  kids: string;
  setKids: React.Dispatch<React.SetStateAction<string>>;
  politics: string;
  setPolitics: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
}

const MyBasicsSection: React.FC<MyBasicsSectionProps> = ({
  height,
  setHeight,
  exercise,
  setExercise,
  educationLevel,
  setEducationLevel,
  weight,
  setWeight,
  drinking,
  setDrinking,
  smoking,
  setSmoking,
  kids,
  setKids,
  politics,
  setPolitics,
  gender,
  setGender,
}) => {
  // Check if all fields are filled
  const isComplete = [
    height,
    exercise,
    educationLevel,
    weight,
    drinking,
    smoking,
    kids,
    politics,
    gender,
  ].every((field) => field.trim() !== "");

  return (
    <div className="p-4 pb-20">
      <h2 className="text-xl font-semibold mb-4">My Basics</h2>
      <p className="text-muted-foreground mb-4">Add your personal details</p>

      <div className="grid grid-cols-1 gap-4">
        {/* Height */}
        <div>
          <Label htmlFor="height">Height</Label>
          <Select value={height} onValueChange={setHeight}>
            <SelectTrigger id="height" className="mt-1">
              <SelectValue placeholder="Select your height" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 61 }, (_, i) => i + 140).map((cm) => {
                const feet = Math.floor(cm / 30.48);
                const inches = Math.round((cm / 2.54) % 12);
                return (
                  <SelectItem key={cm} value={cm.toString()}>
                    {cm} cm ({feet}'{inches}")
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Weight */}
        <div>
          <Label htmlFor="weight">Weight</Label>
          <Select value={weight} onValueChange={setWeight}>
            <SelectTrigger id="weight" className="mt-1">
              <SelectValue placeholder="Select your weight" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 101 }, (_, i) => i + 40).map((kg) => (
                <SelectItem key={kg} value={kg.toString()}>
                  {kg} kg ({Math.round(kg * 2.20462)} lbs)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Exercise habits */}
        <div>
          <Label htmlFor="exercise">Exercise habits</Label>
          <Select value={exercise} onValueChange={setExercise}>
            <SelectTrigger id="exercise" className="mt-1">
              <SelectValue placeholder="Select your exercise habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="sometimes">Sometimes</SelectItem>
              <SelectItem value="almost-never">Almost never</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Education level */}
        <div>
          <Label htmlFor="educationLevel">Education level</Label>
          <Select value={educationLevel} onValueChange={setEducationLevel}>
            <SelectTrigger id="educationLevel" className="mt-1">
              <SelectValue placeholder="Select your education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
              <SelectItem value="masters">Master's Degree</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Drinking habits */}
        <div>
          <Label htmlFor="drinking">Drinking habits</Label>
          <Select value={drinking} onValueChange={setDrinking}>
            <SelectTrigger id="drinking" className="mt-1">
              <SelectValue placeholder="Select your drinking habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frequently">Frequently</SelectItem>
              <SelectItem value="socially">Socially</SelectItem>
              <SelectItem value="rarely">Rarely</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Smoking habits */}
        <div>
          <Label htmlFor="smoking">Smoking habits</Label>
          <Select value={smoking} onValueChange={setSmoking}>
            <SelectTrigger id="smoking" className="mt-1">
              <SelectValue placeholder="Select your smoking habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frequently">Frequently</SelectItem>
              <SelectItem value="socially">Socially</SelectItem>
              <SelectItem value="rarely">Rarely</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Looking for kids */}
        <div>
          <Label htmlFor="kids">Looking for kids</Label>
          <Select value={kids} onValueChange={setKids}>
            <SelectTrigger id="kids" className="mt-1">
              <SelectValue placeholder="Select your preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="want">Want kids</SelectItem>
              <SelectItem value="dont-want">Don't want kids</SelectItem>
              <SelectItem value="open">Open to kids</SelectItem>
              <SelectItem value="have-want-more">
                Have kids and want more
              </SelectItem>
              <SelectItem value="have-dont-want-more">
                Have kids and don't want more
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Politics preferences */}
        <div>
          <Label htmlFor="politics">Politics preferences</Label>
          <Select value={politics} onValueChange={setPolitics}>
            <SelectTrigger id="politics" className="mt-1">
              <SelectValue placeholder="Select your politics preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="liberal">Liberal</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="conservative">Conservative</SelectItem>
              <SelectItem value="not-political">Not Political</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gender */}
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger id="gender" className="mt-1">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">
                Prefer not to say
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {!isComplete && (
        <p className="text-red-500 text-sm mt-4">
          Please fill in all fields to complete this section.
        </p>
      )}
      {isComplete && (
        <p className="text-green-500 text-sm mt-4">
          Great! This section is complete.
        </p>
      )}
    </div>
  );
};

export default MyBasicsSection;
