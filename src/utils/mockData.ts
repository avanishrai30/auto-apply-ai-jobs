
import { Job, UserProfile, JobPreferences, ExperienceLevel, JobType } from '../types';

// Mock user profile
export const mockUserProfile: UserProfile = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  resumeUrl: '/assets/sample-resume.pdf',
  preferences: {
    roles: ['Frontend Developer', 'React Developer', 'UI Developer'],
    locations: ['San Francisco, CA', 'Remote'],
    experience: 'mid',
    jobTypes: ['full-time', 'remote'],
    industries: ['Technology', 'Software', 'E-commerce'],
    salary: {
      min: 100000,
      max: 150000,
      currency: 'USD'
    },
    autoApplyCount: 10
  },
  appliedJobs: ['job-1', 'job-3', 'job-5'],
  createdAt: new Date('2023-01-15'),
  updatedAt: new Date('2023-05-20')
};

// Mock job listings
export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    companyLogo: 'https://picsum.photos/seed/company1/200',
    location: 'San Francisco, CA',
    description: 'We are looking for a skilled Frontend Developer to join our team and help build exceptional user experiences.',
    requirements: [
      'Proficiency in React and TypeScript',
      'Experience with state management libraries like Redux',
      'Understanding of responsive design principles',
      '3+ years of experience in frontend development'
    ],
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD'
    },
    postedDate: new Date('2023-05-15'),
    jobType: 'full-time',
    experienceLevel: 'senior',
    industry: 'Technology',
    applicationUrl: 'https://example.com/apply/job-1',
    status: 'applied',
    appliedDate: new Date('2023-05-18')
  },
  {
    id: 'job-2',
    title: 'React Developer',
    company: 'Digital Solutions',
    companyLogo: 'https://picsum.photos/seed/company2/200',
    location: 'Remote',
    description: 'Join our remote team as a React Developer and contribute to exciting projects for our global clients.',
    requirements: [
      'Strong React.js skills',
      'Experience with modern JavaScript',
      'Good communication skills',
      '2+ years of experience'
    ],
    salary: {
      min: 90000,
      max: 130000,
      currency: 'USD'
    },
    postedDate: new Date('2023-05-10'),
    jobType: 'remote',
    experienceLevel: 'mid',
    industry: 'Software',
    applicationUrl: 'https://example.com/apply/job-2'
  },
  {
    id: 'job-3',
    title: 'UI Developer',
    company: 'Creative Agency',
    companyLogo: 'https://picsum.photos/seed/company3/200',
    location: 'New York, NY',
    description: 'Create stunning user interfaces for our clients in the e-commerce and retail sectors.',
    requirements: [
      'Advanced HTML, CSS, and JavaScript skills',
      'Experience with design tools like Figma',
      'Portfolio showcasing UI work',
      '2-4 years of relevant experience'
    ],
    postedDate: new Date('2023-05-12'),
    jobType: 'full-time',
    experienceLevel: 'mid',
    industry: 'Design',
    applicationUrl: 'https://example.com/apply/job-3',
    status: 'interviewing',
    appliedDate: new Date('2023-05-14')
  },
  {
    id: 'job-4',
    title: 'Frontend Engineer',
    company: 'E-commerce Giant',
    companyLogo: 'https://picsum.photos/seed/company4/200',
    location: 'Seattle, WA',
    description: 'Work on consumer-facing web applications that serve millions of users daily.',
    requirements: [
      'Strong JavaScript fundamentals',
      'Experience with modern frameworks like React or Vue',
      'Knowledge of web performance optimization',
      '3+ years of experience'
    ],
    salary: {
      min: 110000,
      max: 150000,
      currency: 'USD'
    },
    postedDate: new Date('2023-05-08'),
    jobType: 'full-time',
    experienceLevel: 'mid',
    industry: 'E-commerce',
    applicationUrl: 'https://example.com/apply/job-4'
  },
  {
    id: 'job-5',
    title: 'Full Stack Developer',
    company: 'Startup Innovators',
    companyLogo: 'https://picsum.photos/seed/company5/200',
    location: 'Remote',
    description: 'Join our fast-growing startup and help build our core product from the ground up.',
    requirements: [
      'Experience with React on the frontend',
      'Node.js backend experience',
      'Database design knowledge',
      '4+ years of full stack development'
    ],
    postedDate: new Date('2023-05-05'),
    jobType: 'remote',
    experienceLevel: 'senior',
    industry: 'Technology',
    applicationUrl: 'https://example.com/apply/job-5',
    status: 'viewed',
    appliedDate: new Date('2023-05-07')
  },
  {
    id: 'job-6',
    title: 'React Native Developer',
    company: 'Mobile Solutions',
    companyLogo: 'https://picsum.photos/seed/company6/200',
    location: 'Austin, TX',
    description: 'Develop cross-platform mobile applications using React Native.',
    requirements: [
      'Proficiency in React Native',
      'Understanding of mobile UI/UX principles',
      'Experience with native module integration',
      '2+ years of mobile development'
    ],
    salary: {
      min: 100000,
      max: 140000,
      currency: 'USD'
    },
    postedDate: new Date('2023-05-03'),
    jobType: 'full-time',
    experienceLevel: 'mid',
    industry: 'Mobile',
    applicationUrl: 'https://example.com/apply/job-6'
  }
];

// Mock cover letter template
export const mockCoverLetterTemplate = `
Dear Hiring Manager,

I am writing to express my interest in the [Job Title] position at [Company Name]. With my experience in [Key Skill] and passion for [Industry/Field], I believe I would be a valuable addition to your team.

Throughout my career, I have developed strong skills in [Relevant Skills] which align perfectly with the requirements in your job description. In my previous role at [Previous Company], I successfully [Achievement] which resulted in [Positive Outcome].

What draws me to [Company Name] is your commitment to [Company Value/Mission]. I am particularly excited about the opportunity to contribute to [Specific Project/Goal mentioned in job description].

I am confident that my technical abilities, combined with my collaborative approach and problem-solving mindset, make me an excellent candidate for this role.

I look forward to the opportunity to discuss how my background, skills, and experiences would be an ideal fit for this position and your company.

Thank you for considering my application.

Sincerely,
[Your Name]
`;

// Helper function to filter jobs based on user preferences
export const filterJobsByPreferences = (jobs: Job[], preferences: JobPreferences): Job[] => {
  return jobs.filter(job => {
    // Filter by role
    const roleMatch = preferences.roles.some(role => 
      job.title.toLowerCase().includes(role.toLowerCase()));
    
    // Filter by location
    const locationMatch = preferences.locations.some(location => 
      location.toLowerCase() === 'remote' 
        ? job.location.toLowerCase() === 'remote' 
        : job.location.toLowerCase().includes(location.toLowerCase()));
    
    // Filter by job type
    const jobTypeMatch = preferences.jobTypes.includes(job.jobType);
    
    // Filter by industry
    const industryMatch = preferences.industries.some(industry => 
      job.industry.toLowerCase().includes(industry.toLowerCase()));
    
    // Filter by experience level (optional)
    const experienceLevelMatch = job.experienceLevel === preferences.experience;
    
    // Filter by salary (optional)
    let salaryMatch = true;
    if (preferences.salary && job.salary) {
      salaryMatch = job.salary.min <= preferences.salary.max && 
                    job.salary.max >= preferences.salary.min;
    }
    
    return roleMatch && locationMatch && jobTypeMatch && industryMatch && 
           experienceLevelMatch && salaryMatch;
  });
};

// Helper function to generate a personalized cover letter
export const generateCoverLetter = (job: Job, userProfile: UserProfile): string => {
  let coverLetter = mockCoverLetterTemplate;
  
  coverLetter = coverLetter.replace('[Job Title]', job.title);
  coverLetter = coverLetter.replace('[Company Name]', job.company);
  coverLetter = coverLetter.replace('[Company Name]', job.company); // Replace second occurrence
  
  // Extract key skills from user profile and job
  const keySkill = job.requirements[0]?.split(' ')[0] || 'frontend development';
  coverLetter = coverLetter.replace('[Key Skill]', keySkill);
  
  coverLetter = coverLetter.replace('[Industry/Field]', job.industry);
  
  // Combine requirements for relevant skills
  const relevantSkills = job.requirements.slice(0, 2).join(' and ');
  coverLetter = coverLetter.replace('[Relevant Skills]', relevantSkills);
  
  coverLetter = coverLetter.replace('[Previous Company]', 'my previous company');
  coverLetter = coverLetter.replace('[Achievement]', 'implemented new features and optimized performance');
  coverLetter = coverLetter.replace('[Positive Outcome]', 'a 30% improvement in user engagement');
  
  coverLetter = coverLetter.replace('[Company Value/Mission]', 'innovation and user-centric design');
  coverLetter = coverLetter.replace('[Specific Project/Goal mentioned in job description]', job.description.split('.')[0]);
  
  coverLetter = coverLetter.replace('[Your Name]', userProfile.name);
  
  return coverLetter;
};
