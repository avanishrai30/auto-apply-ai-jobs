
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { JobPreferences, ExperienceLevel, JobType } from '@/types';
import { X } from 'lucide-react';

interface PreferencesFormProps {
  initialPreferences?: JobPreferences;
  onSave: (preferences: JobPreferences) => void;
}

const defaultPreferences: JobPreferences = {
  roles: [],
  locations: [],
  experience: 'mid',
  jobTypes: ['full-time'],
  industries: [],
  autoApplyCount: 10
};

const PreferencesForm: React.FC<PreferencesFormProps> = ({ 
  initialPreferences = defaultPreferences,
  onSave 
}) => {
  const [preferences, setPreferences] = useState<JobPreferences>(initialPreferences);
  const [newRole, setNewRole] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newIndustry, setNewIndustry] = useState('');

  const handleAddRole = () => {
    if (newRole.trim() && !preferences.roles.includes(newRole.trim())) {
      setPreferences(prev => ({
        ...prev,
        roles: [...prev.roles, newRole.trim()]
      }));
      setNewRole('');
    }
  };

  const handleRemoveRole = (role: string) => {
    setPreferences(prev => ({
      ...prev,
      roles: prev.roles.filter(r => r !== role)
    }));
  };

  const handleAddLocation = () => {
    if (newLocation.trim() && !preferences.locations.includes(newLocation.trim())) {
      setPreferences(prev => ({
        ...prev,
        locations: [...prev.locations, newLocation.trim()]
      }));
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (location: string) => {
    setPreferences(prev => ({
      ...prev,
      locations: prev.locations.filter(l => l !== location)
    }));
  };

  const handleAddIndustry = () => {
    if (newIndustry.trim() && !preferences.industries.includes(newIndustry.trim())) {
      setPreferences(prev => ({
        ...prev,
        industries: [...prev.industries, newIndustry.trim()]
      }));
      setNewIndustry('');
    }
  };

  const handleRemoveIndustry = (industry: string) => {
    setPreferences(prev => ({
      ...prev,
      industries: prev.industries.filter(i => i !== industry)
    }));
  };

  const handleExperienceChange = (value: string) => {
    setPreferences(prev => ({
      ...prev,
      experience: value as ExperienceLevel
    }));
  };

  const handleJobTypeToggle = (type: JobType) => {
    setPreferences(prev => {
      if (prev.jobTypes.includes(type)) {
        return {
          ...prev,
          jobTypes: prev.jobTypes.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          jobTypes: [...prev.jobTypes, type]
        };
      }
    });
  };

  const handleAutoApplyCountChange = (value: number[]) => {
    setPreferences(prev => ({
      ...prev,
      autoApplyCount: value[0]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(preferences);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Job Preferences</CardTitle>
          <CardDescription>
            Help us understand what jobs you're looking for
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Job Roles */}
          <div className="space-y-2">
            <Label htmlFor="roles">Preferred Job Titles / Roles</Label>
            <div className="flex gap-2">
              <Input
                id="new-role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddRole} disabled={!newRole.trim()}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {preferences.roles.length > 0 ? (
                preferences.roles.map((role) => (
                  <Badge key={role} variant="secondary" className="flex items-center gap-1">
                    {role}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveRole(role)}
                    />
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No roles added yet</p>
              )}
            </div>
          </div>
          
          {/* Locations */}
          <div className="space-y-2">
            <Label htmlFor="locations">Preferred Locations</Label>
            <div className="flex gap-2">
              <Input
                id="new-location"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA or Remote"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddLocation} disabled={!newLocation.trim()}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {preferences.locations.length > 0 ? (
                preferences.locations.map((location) => (
                  <Badge key={location} variant="secondary" className="flex items-center gap-1">
                    {location}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveLocation(location)}
                    />
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No locations added yet</p>
              )}
            </div>
          </div>
          
          {/* Experience Level */}
          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select
              value={preferences.experience}
              onValueChange={handleExperienceChange}
            >
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry-Level</SelectItem>
                <SelectItem value="mid">Mid-Level</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="director">Director</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Job Types */}
          <div className="space-y-2">
            <Label>Job Types</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
              {(['full-time', 'part-time', 'contract', 'internship', 'remote', 'hybrid'] as JobType[]).map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`job-type-${type}`}
                    checked={preferences.jobTypes.includes(type)}
                    onCheckedChange={() => handleJobTypeToggle(type)}
                  />
                  <Label htmlFor={`job-type-${type}`} className="capitalize">
                    {type.replace('-', ' ')}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Industries */}
          <div className="space-y-2">
            <Label htmlFor="industries">Industries of Interest</Label>
            <div className="flex gap-2">
              <Input
                id="new-industry"
                value={newIndustry}
                onChange={(e) => setNewIndustry(e.target.value)}
                placeholder="e.g. Technology"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddIndustry} disabled={!newIndustry.trim()}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {preferences.industries.length > 0 ? (
                preferences.industries.map((industry) => (
                  <Badge key={industry} variant="secondary" className="flex items-center gap-1">
                    {industry}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveIndustry(industry)}
                    />
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No industries added yet</p>
              )}
            </div>
          </div>
          
          {/* Auto-Apply Count */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="auto-apply-count">Applications Per Day</Label>
              <span className="text-sm font-medium">{preferences.autoApplyCount}</span>
            </div>
            <Slider
              id="auto-apply-count"
              min={1}
              max={50}
              step={1}
              value={[preferences.autoApplyCount]}
              onValueChange={handleAutoApplyCountChange}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>25</span>
              <span>50</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full btn-primary">Save Preferences</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default PreferencesForm;
