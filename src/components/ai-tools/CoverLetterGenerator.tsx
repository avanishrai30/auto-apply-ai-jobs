
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockJobs, mockUserProfile, generateCoverLetter } from '@/utils/mockData';
import { Loader2 } from 'lucide-react';

const CoverLetterGenerator: React.FC = () => {
  const { toast } = useToast();
  const [selectedJobId, setSelectedJobId] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAutoGenerate, setIsAutoGenerate] = useState(true);

  const handleJobChange = (jobId: string) => {
    setSelectedJobId(jobId);
    
    if (isAutoGenerate) {
      generateCoverLetterForJob(jobId);
    } else {
      setCoverLetter('');
    }
  };

  const generateCoverLetterForJob = (jobId: string) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const selectedJob = mockJobs.find(job => job.id === jobId);
      
      if (selectedJob) {
        const generatedLetter = generateCoverLetter(selectedJob, mockUserProfile);
        setCoverLetter(generatedLetter);
      }
      
      setIsGenerating(false);
    }, 1500);
  };

  const handleGenerateClick = () => {
    if (!selectedJobId) {
      toast({
        title: 'No Job Selected',
        description: 'Please select a job to generate a cover letter.',
        variant: 'destructive'
      });
      return;
    }
    
    generateCoverLetterForJob(selectedJobId);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    toast({
      title: 'Copied to Clipboard',
      description: 'Cover letter has been copied to clipboard.',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Cover Letter Generator</CardTitle>
        <CardDescription>
          Generate tailored cover letters for your job applications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="job-select">Select a Job</Label>
          <Select value={selectedJobId} onValueChange={handleJobChange}>
            <SelectTrigger id="job-select">
              <SelectValue placeholder="Choose a job posting" />
            </SelectTrigger>
            <SelectContent>
              {mockJobs.map(job => (
                <SelectItem key={job.id} value={job.id}>
                  {job.title} at {job.company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="auto-generate"
            checked={isAutoGenerate}
            onCheckedChange={setIsAutoGenerate}
          />
          <Label htmlFor="auto-generate">Auto-generate on job selection</Label>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="cover-letter">Cover Letter</Label>
            {!isAutoGenerate && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateClick}
                disabled={!selectedJobId || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating
                  </>
                ) : (
                  'Generate'
                )}
              </Button>
            )}
          </div>
          
          <div className="relative">
            <Textarea
              id="cover-letter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder={
                selectedJobId
                  ? isGenerating
                    ? 'Generating your cover letter...'
                    : 'Your AI-generated cover letter will appear here'
                  : 'Select a job to generate a cover letter'
              }
              className="min-h-[300px] resize-none font-mono text-sm"
              disabled={isGenerating}
            />
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <div className="flex flex-col items-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-2 text-sm">Generating personalized cover letter...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <p className="text-xs text-muted-foreground">
          Customize this letter to better match your tone and style
        </p>
        <Button
          onClick={handleCopyToClipboard}
          disabled={!coverLetter || isGenerating}
        >
          Copy to Clipboard
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoverLetterGenerator;
