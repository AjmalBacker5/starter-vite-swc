import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationSectionProps {
  currentCity: string;
  setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
  currentState: string;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  homeTown: string;
  setHomeTown: React.Dispatch<React.SetStateAction<string>>;
  homeState: string;
  setHomeState: React.Dispatch<React.SetStateAction<string>>;
  relocate: string;
  setRelocate: React.Dispatch<React.SetStateAction<string>>;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  currentCity,
  setCurrentCity,
  currentState,
  setCurrentState,
  homeTown,
  setHomeTown,
  homeState,
  setHomeState,
  relocate,
  setRelocate,
}) => {
  // Check if all fields are filled
  const isComplete = [
    currentCity,
    currentState,
    homeTown,
    homeState,
    relocate,
  ].every((field) => field.trim() !== "");

  // List of Indian states for dropdown
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  return (
    <div className="p-4 pb-20 bg-white">
      <h2 className="text-xl font-semibold mb-4">Location</h2>
      <p className="text-muted-foreground mb-4">
        Add your current location and place of origin
      </p>

      <div className="grid grid-cols-1 gap-4">
        {/* Current City */}
        <div>
          <Label htmlFor="currentCity">Current City</Label>
          <Input
            id="currentCity"
            value={currentCity}
            onChange={(e) => setCurrentCity(e.target.value)}
            placeholder="Enter your current city"
            className="mt-1"
          />
        </div>

        {/* Current State */}
        <div>
          <Label htmlFor="currentState">Current State</Label>
          <Select value={currentState} onValueChange={setCurrentState}>
            <SelectTrigger id="currentState" className="mt-1">
              <SelectValue placeholder="Select your current state" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hometown */}
        <div>
          <Label htmlFor="homeTown">Hometown</Label>
          <Input
            id="homeTown"
            value={homeTown}
            onChange={(e) => setHomeTown(e.target.value)}
            placeholder="Enter your hometown"
            className="mt-1"
          />
        </div>

        {/* Home State */}
        <div>
          <Label htmlFor="homeState">Home State</Label>
          <Select value={homeState} onValueChange={setHomeState}>
            <SelectTrigger id="homeState" className="mt-1">
              <SelectValue placeholder="Select your home state" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Willing to Relocate */}
        <div>
          <Label htmlFor="relocate">Willing to Relocate</Label>
          <Select value={relocate} onValueChange={setRelocate}>
            <SelectTrigger id="relocate" className="mt-1">
              <SelectValue placeholder="Select your preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="maybe">Maybe</SelectItem>
              <SelectItem value="only-certain-cities">
                Only to certain cities
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

export default LocationSection;
