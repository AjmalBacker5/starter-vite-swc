import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, ChevronLeft, ChevronRight, Check, X } from "lucide-react";

interface ProfileCreationProps {
  onComplete?: () => void;
}

const ProfileCreation = ({ onComplete = () => {} }: ProfileCreationProps) => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    age: "",
    gender: "",
    location: "",
    phone: "",
    email: "",

    // Education
    education: "",
    institution: "",
    graduationYear: "",

    // Career
    profession: "",
    company: "",
    income: "",

    // Interests
    interests: [],
    hobbies: "",

    // Atheism Stance
    atheismStance: "",
    religiousBackground: "",
    viewsOnReligion: "",

    // Preferences
    ageRange: { min: 18, max: 40 },
    locationPreference: "",
    educationPreference: "",
    lookingFor: "",
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePhotoUpload = () => {
    // Mock photo upload - in a real app, this would handle file selection and upload
    const newPhoto = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;
    setPhotos([...photos, newPhoto]);
  };

  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background">
      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create Your Profile
          </CardTitle>
          <Progress value={(step / totalSteps) * 100} className="h-2 mt-4" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>
              Step {step} of {totalSteps}
            </span>
            <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium">Basic Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    min="18"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium">Education Details</h3>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="education">Highest Education</Label>
                  <Select
                    value={formData.education}
                    onValueChange={(value) =>
                      setFormData({ ...formData, education: value })
                    }
                  >
                    <SelectTrigger id="education">
                      <SelectValue placeholder="Select your highest education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="bachelors">
                        Bachelor's Degree
                      </SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD or Doctorate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Institution/University</Label>
                  <Input
                    id="institution"
                    placeholder="Enter your institution or university"
                    value={formData.institution}
                    onChange={(e) =>
                      setFormData({ ...formData, institution: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Input
                    id="graduationYear"
                    placeholder="Year of graduation"
                    value={formData.graduationYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        graduationYear: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium">Career Information</h3>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession/Occupation</Label>
                  <Input
                    id="profession"
                    placeholder="Enter your profession"
                    value={formData.profession}
                    onChange={(e) =>
                      setFormData({ ...formData, profession: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    placeholder="Enter your company or organization"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income Range</Label>
                  <Select
                    value={formData.income}
                    onValueChange={(value) =>
                      setFormData({ ...formData, income: value })
                    }
                  >
                    <SelectTrigger id="income">
                      <SelectValue placeholder="Select your income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5lpa">₹0 - ₹5 LPA</SelectItem>
                      <SelectItem value="5-10lpa">₹5 - ₹10 LPA</SelectItem>
                      <SelectItem value="10-15lpa">₹10 - ₹15 LPA</SelectItem>
                      <SelectItem value="15-25lpa">₹15 - ₹25 LPA</SelectItem>
                      <SelectItem value="25+lpa">₹25+ LPA</SelectItem>
                      <SelectItem value="prefer-not">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium">Personal Interests</h3>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Select Your Interests</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Reading",
                      "Travel",
                      "Music",
                      "Movies",
                      "Art",
                      "Sports",
                      "Cooking",
                      "Photography",
                      "Technology",
                      "Science",
                      "Philosophy",
                      "Politics",
                    ].map((interest) => (
                      <div
                        key={interest}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={interest.toLowerCase()}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                interests: [...formData.interests, interest],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                interests: formData.interests.filter(
                                  (i) => i !== interest,
                                ),
                              });
                            }
                          }}
                        />
                        <Label htmlFor={interest.toLowerCase()}>
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hobbies">
                    Tell us more about your hobbies
                  </Label>
                  <Textarea
                    id="hobbies"
                    placeholder="Describe your hobbies and interests in detail"
                    rows={4}
                    value={formData.hobbies}
                    onChange={(e) =>
                      setFormData({ ...formData, hobbies: e.target.value })
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium">
                Stance on Atheism/Secularism
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="atheismStance">
                    How would you describe your stance?
                  </Label>
                  <RadioGroup
                    value={formData.atheismStance}
                    onValueChange={(value) =>
                      setFormData({ ...formData, atheismStance: value })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="atheist" id="atheist" />
                      <Label htmlFor="atheist">Atheist</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="agnostic" id="agnostic" />
                      <Label htmlFor="agnostic">Agnostic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="secular" id="secular" />
                      <Label htmlFor="secular">Secular</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="humanist" id="humanist" />
                      <Label htmlFor="humanist">Humanist</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other-stance" />
                      <Label htmlFor="other-stance">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="religiousBackground">
                    Religious Background
                  </Label>
                  <Select
                    value={formData.religiousBackground}
                    onValueChange={(value) =>
                      setFormData({ ...formData, religiousBackground: value })
                    }
                  >
                    <SelectTrigger id="religiousBackground">
                      <SelectValue placeholder="Select your religious background" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="muslim">Muslim</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="sikh">Sikh</SelectItem>
                      <SelectItem value="jain">Jain</SelectItem>
                      <SelectItem value="buddhist">Buddhist</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="viewsOnReligion">
                    Your views on religion
                  </Label>
                  <Textarea
                    id="viewsOnReligion"
                    placeholder="Share your thoughts on religion and secularism"
                    rows={4}
                    value={formData.viewsOnReligion}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        viewsOnReligion: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium">Photos & Preferences</h3>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Upload Your Photos</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <Avatar className="w-full h-32 rounded-md">
                          <AvatarImage
                            src={photo}
                            alt="Profile photo"
                            className="object-cover"
                          />
                          <AvatarFallback>Photo</AvatarFallback>
                        </Avatar>
                        <button
                          className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemovePhoto(index)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}

                    {photos.length < 6 && (
                      <button
                        onClick={handlePhotoUpload}
                        className="w-full h-32 border-2 border-dashed border-muted-foreground rounded-md flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                      >
                        <Upload size={24} />
                        <span className="mt-2 text-sm">Upload Photo</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload up to 6 photos. First photo will be your profile
                    picture.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Match Preferences</h4>

                  <div className="space-y-2">
                    <Label htmlFor="lookingFor">Looking For</Label>
                    <Select
                      value={formData.lookingFor}
                      onValueChange={(value) =>
                        setFormData({ ...formData, lookingFor: value })
                      }
                    >
                      <SelectTrigger id="lookingFor">
                        <SelectValue placeholder="What are you looking for?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marriage">Marriage</SelectItem>
                        <SelectItem value="long-term">
                          Long-term Relationship
                        </SelectItem>
                        <SelectItem value="friendship">
                          Friendship First
                        </SelectItem>
                        <SelectItem value="casual">Casual Dating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="locationPreference">
                      Location Preference
                    </Label>
                    <Select
                      value={formData.locationPreference}
                      onValueChange={(value) =>
                        setFormData({ ...formData, locationPreference: value })
                      }
                    >
                      <SelectTrigger id="locationPreference">
                        <SelectValue placeholder="Select location preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="same-city">Same City</SelectItem>
                        <SelectItem value="same-state">Same State</SelectItem>
                        <SelectItem value="anywhere-india">
                          Anywhere in India
                        </SelectItem>
                        <SelectItem value="worldwide">Worldwide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="educationPreference">
                      Education Preference
                    </Label>
                    <Select
                      value={formData.educationPreference}
                      onValueChange={(value) =>
                        setFormData({ ...formData, educationPreference: value })
                      }
                    >
                      <SelectTrigger id="educationPreference">
                        <SelectValue placeholder="Select education preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Education Level</SelectItem>
                        <SelectItem value="graduate">
                          Graduate or Higher
                        </SelectItem>
                        <SelectItem value="postgraduate">
                          Postgraduate or Higher
                        </SelectItem>
                        <SelectItem value="doctorate">Doctorate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between p-6 pt-0">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button onClick={handleNext}>
            {step === totalSteps ? (
              <>
                Complete
                <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileCreation;
