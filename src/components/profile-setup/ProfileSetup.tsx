
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResumeUpload from './ResumeUpload';
import PreferencesForm from './PreferencesForm';
import { JobPreferences } from '@/types';
import { mockUserProfile } from '@/utils/mockData';

const ProfileSetup: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('resume');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [preferences, setPreferences] = useState<JobPreferences>(mockUserProfile.preferences);

  const handleResumeUpload = (file: File) => {
    setResumeFile(file);
    toast({
      title: 'Resume Uploaded',
      description: 'Your resume has been successfully uploaded.',
    });

    // Automatically move to the next tab after upload
    setTimeout(() => {
      setActiveTab('preferences');
    }, 1000);
  };

  const handlePreferencesSave = (updatedPreferences: JobPreferences) => {
    setPreferences(updatedPreferences);
    toast({
      title: 'Preferences Saved',
      description: 'Your job preferences have been successfully saved.',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Profile Setup</h2>
      <p className="text-muted-foreground">
        Complete your profile to start getting matched with relevant jobs
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="preferences">Job Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resume" className="mt-6">
          <ResumeUpload 
            onUpload={handleResumeUpload} 
            resumeUrl={mockUserProfile.resumeUrl}
          />
          
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setActiveTab('preferences')}>
              Continue to Preferences
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="preferences" className="mt-6">
          <PreferencesForm 
            initialPreferences={preferences}
            onSave={handlePreferencesSave} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSetup;
