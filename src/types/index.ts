
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  resumeUrl?: string;
  preferences: JobPreferences;
  appliedJobs: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface JobPreferences {
  roles: string[];
  locations: string[];
  experience: ExperienceLevel;
  jobTypes: JobType[];
  industries: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  autoApplyCount: number;
}

export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'director';

export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote' | 'hybrid';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: Date;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  industry: string;
  applicationUrl: string;
  status?: ApplicationStatus;
  appliedDate?: Date;
}

export type ApplicationStatus = 'pending' | 'applied' | 'viewed' | 'interviewing' | 'rejected' | 'offered';

export interface CoverLetter {
  id: string;
  jobId: string;
  content: string;
  createdAt: Date;
}
