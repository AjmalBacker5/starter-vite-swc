import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

const PreferencesSection = () => {
  const [ageRange, setAgeRange] = useState<[number, number]>([25, 40]);
  const [heightRange, setHeightRange] = useState<[number, number]>([150, 190]);
  const [distanceRange, setDistanceRange] = useState<number>(50);
  const [genderPreference, setGenderPreference] = useState<string>("female");
  const [selectedEducation, setSelectedEducation] = useState<string[]>([]);

  const toggleEducation = (value: string) => {
    if (selectedEducation.includes(value)) {
      setSelectedEducation(selectedEducation.filter((item) => item !== value));
    } else {
      setSelectedEducation([...selectedEducation, value]);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Preferences</h1>

      <Tabs defaultValue="filters">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="filters">Match Filters</TabsTrigger>
          <TabsTrigger value="settings">App Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="filters">
          <Card>
            <CardHeader>
              <CardTitle>Match Preferences</CardTitle>
              <CardDescription>
                Set your preferences to find your ideal match
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Looking for</Label>
                  <RadioGroup
                    value={genderPreference}
                    onValueChange={setGenderPreference}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Woman</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Man</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Age Range</Label>
                    <span className="text-sm text-muted-foreground">
                      {ageRange[0]} - {ageRange[1]} years
                    </span>
                  </div>
                  <Slider
                    defaultValue={ageRange}
                    min={18}
                    max={70}
                    step={1}
                    onValueChange={(value) =>
                      setAgeRange(value as [number, number])
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      Same City
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Same State
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Same Country
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Anywhere
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Education Level</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={
                        selectedEducation.includes("high-school")
                          ? "default"
                          : "outline"
                      }
                      className="justify-start"
                      onClick={() => toggleEducation("high-school")}
                    >
                      High School
                    </Button>
                    <Button
                      variant={
                        selectedEducation.includes("bachelors")
                          ? "default"
                          : "outline"
                      }
                      className="justify-start"
                      onClick={() => toggleEducation("bachelors")}
                    >
                      Bachelor's
                    </Button>
                    <Button
                      variant={
                        selectedEducation.includes("masters")
                          ? "default"
                          : "outline"
                      }
                      className="justify-start"
                      onClick={() => toggleEducation("masters")}
                    >
                      Master's
                    </Button>
                    <Button
                      variant={
                        selectedEducation.includes("doctorate")
                          ? "default"
                          : "outline"
                      }
                      className="justify-start"
                      onClick={() => toggleEducation("doctorate")}
                    >
                      Doctorate
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-verified">
                    Show verified profiles only
                  </Label>
                  <Switch id="show-verified" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="active-recently">Active in last 7 days</Label>
                  <Switch id="active-recently" defaultChecked />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Height Range</Label>
                    <span className="text-sm text-muted-foreground">
                      {heightRange[0]} - {heightRange[1]} cm
                    </span>
                  </div>
                  <Slider
                    defaultValue={heightRange}
                    min={140}
                    max={220}
                    step={1}
                    onValueChange={(value) =>
                      setHeightRange(value as [number, number])
                    }
                  />
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>App Settings</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Push Notifications</Label>
                <Switch id="notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="location">Share Location</Label>
                <Switch id="location" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="incognito">Incognito Mode</Label>
                <Switch id="incognito" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreferencesSection;
