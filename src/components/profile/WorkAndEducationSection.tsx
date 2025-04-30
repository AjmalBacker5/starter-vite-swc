import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WorkAndEducationSectionProps {
  jobTitle: string;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  company: string;
  setCompany: React.Dispatch<React.SetStateAction<string>>;
  education: string;
  setEducation: React.Dispatch<React.SetStateAction<string>>;
  school: string;
  setSchool: React.Dispatch<React.SetStateAction<string>>;
}

const WorkAndEducationSection: React.FC<WorkAndEducationSectionProps> = ({
  jobTitle,
  setJobTitle,
  company,
  setCompany,
  education,
  setEducation,
  school,
  setSchool,
}) => {
  return (
    <div className="p-4 pb-20 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Work and Education</h2>
      <p className="text-muted-foreground mb-4">
        Add your job and education information
      </p>

      {/* Job Information */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Job Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="e.g. Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="e.g. Tech Solutions Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Education Information */}
      <div>
        <h3 className="text-lg font-medium mb-3">Education Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="education">Highest Education</Label>
            <Input
              id="education"
              placeholder="e.g. Bachelor's Degree"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="school">School/University</Label>
            <Input
              id="school"
              placeholder="e.g. University of Technology"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {(!jobTitle || !company || !education || !school) && (
        <p className="text-red-500 text-sm mt-4">
          Please fill in all fields to complete this section.
        </p>
      )}
      {jobTitle && company && education && school && (
        <p className="text-green-500 text-sm mt-4">
          Great! This section is complete.
        </p>
      )}
    </div>
  );
};

export default WorkAndEducationSection;
