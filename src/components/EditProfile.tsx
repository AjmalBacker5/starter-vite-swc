import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ImageSection from "./profile/ImageSection";
import AboutMeSection from "./profile/AboutMeSection";
import WorkAndEducationSection from "./profile/WorkAndEducationSection";
import MyBasicsSection from "./profile/MyBasicsSection";
import LocationSection from "./profile/LocationSection";

const EditProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("images");

  // State for uploaded images
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // State for about me section
  const [aboutMe, setAboutMe] = useState<string>("");

  // State for work and education section
  const [jobTitle, setJobTitle] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [school, setSchool] = useState<string>("");

  // State for my basics section
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [exercise, setExercise] = useState<string>("");
  const [educationLevel, setEducationLevel] = useState<string>("");
  const [drinking, setDrinking] = useState<string>("");
  const [smoking, setSmoking] = useState<string>("");
  const [kids, setKids] = useState<string>("");
  const [politics, setPolitics] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  // State for location section
  const [currentCity, setCurrentCity] = useState<string>("");
  const [currentState, setCurrentState] = useState<string>("");
  const [homeTown, setHomeTown] = useState<string>("");
  const [homeState, setHomeState] = useState<string>("");
  const [relocate, setRelocate] = useState<string>("");

  // Calculate profile completion percentage based on filled sections
  const calculateProfileCompletion = () => {
    let completedSections = 0;

    // Check if images section is complete (at least 2 images)
    if (uploadedImages.length >= 2) completedSections++;

    // Check if about me section is complete (at least 50 characters)
    if (aboutMe.trim().length >= 50) completedSections++;

    // Check if work and education section is complete (all fields filled)
    if (jobTitle && company && education && school) completedSections++;

    // Check if my basics section is complete (all fields filled)
    if (
      height &&
      weight &&
      exercise &&
      educationLevel &&
      drinking &&
      smoking &&
      kids &&
      politics &&
      gender
    ) {
      completedSections++;
    }

    // Check if location section is complete (all fields filled)
    if (currentCity && currentState && homeTown && homeState && relocate) {
      completedSections++;
    }

    // Total number of sections
    const totalSections = 5;

    return Math.round((completedSections / totalSections) * 100);
  };

  const profileCompletionPercentage = calculateProfileCompletion();

  const sections = [
    { id: "images", name: "Images" },
    { id: "about", name: "About Me" },
    { id: "work", name: "Work and Education" },
    { id: "basics", name: "My Basics" },
    { id: "location", name: "Location" },
  ];

  // Render section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case "images":
        return (
          <ImageSection
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
        );
      case "about":
        return <AboutMeSection aboutMe={aboutMe} setAboutMe={setAboutMe} />;
      case "work":
        return (
          <WorkAndEducationSection
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            company={company}
            setCompany={setCompany}
            education={education}
            setEducation={setEducation}
            school={school}
            setSchool={setSchool}
          />
        );
      case "basics":
        return (
          <MyBasicsSection
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            exercise={exercise}
            setExercise={setExercise}
            educationLevel={educationLevel}
            setEducationLevel={setEducationLevel}
            drinking={drinking}
            setDrinking={setDrinking}
            smoking={smoking}
            setSmoking={setSmoking}
            kids={kids}
            setKids={setKids}
            politics={politics}
            setPolitics={setPolitics}
            gender={gender}
            setGender={setGender}
          />
        );
      case "location":
        return (
          <LocationSection
            currentCity={currentCity}
            setCurrentCity={setCurrentCity}
            currentState={currentState}
            setCurrentState={setCurrentState}
            homeTown={homeTown}
            setHomeTown={setHomeTown}
            homeState={homeState}
            setHomeState={setHomeState}
            relocate={relocate}
            setRelocate={setRelocate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-screen-xl mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center h-16 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Edit Profile</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container px-4 py-4 max-w-md mx-auto">
        {/* Profile Completion Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Profile Completion</h2>
              <span className="text-lg font-medium">
                {profileCompletionPercentage}%
              </span>
            </div>
            <Progress
              value={profileCompletionPercentage}
              className="h-2 mb-2"
            />
            {profileCompletionPercentage < 100 && (
              <p className="text-sm text-muted-foreground mt-2">
                Your profile is {profileCompletionPercentage}% complete. Add
                more details to increase your chances of finding a match.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Section Navigation */}
        <div className="flex overflow-x-auto mb-6 pb-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              className="mr-2 whitespace-nowrap flex-shrink-0"
              size="sm"
              onClick={() => setActiveSection(section.id)}
            >
              {section.name}
            </Button>
          ))}
        </div>

        {/* Section Content */}
        <Card className="mb-6">
          <CardContent className="p-0">{renderSectionContent()}</CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditProfile;
