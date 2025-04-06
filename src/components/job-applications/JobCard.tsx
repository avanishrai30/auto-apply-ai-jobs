
import React from 'react';
import { format } from 'date-fns';
import { Calendar, DollarSign, MapPin, Briefcase, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface JobCardProps {
  job: Job;
  onApply: (jobId: string) => void;
  onViewDetails: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onApply, onViewDetails }) => {
  const { toast } = useToast();
  
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'viewed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'interviewing':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'offered':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const handleApply = () => {
    toast({
      title: 'Application Sent',
      description: `Your application for ${job.title} at ${job.company} has been submitted.`,
    });
    onApply(job.id);
  };

  return (
    <Card className="card-hover w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold line-clamp-1">{job.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <span className="font-medium">{job.company}</span>
              {job.status && (
                <Badge 
                  variant="outline" 
                  className={`ml-2 ${getStatusColor(job.status)}`}
                >
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
              )}
            </CardDescription>
          </div>
          {job.companyLogo && (
            <div className="h-12 w-12 rounded-md overflow-hidden bg-white">
              <img 
                src={job.companyLogo} 
                alt={`${job.company} logo`} 
                className="h-full w-full object-contain"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-y-2">
          <div className="flex items-center text-sm text-muted-foreground mr-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mr-4">
            <Briefcase className="h-4 w-4 mr-1" />
            <span className="capitalize">{job.jobType.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{format(job.postedDate, 'MMM d, yyyy')}</span>
          </div>
        </div>
        
        {job.salary && (
          <div className="flex items-center text-sm">
            <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>
              ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} {job.salary.currency}
            </span>
          </div>
        )}
        
        <p className="text-sm line-clamp-2">{job.description}</p>
        
        <div className="flex flex-wrap gap-2 pt-1">
          {job.requirements.slice(0, 3).map((req, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {req.split(' ')[0]}
            </Badge>
          ))}
          {job.requirements.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{job.requirements.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between space-x-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onViewDetails(job)}
        >
          View Details
        </Button>
        {job.status ? (
          <Button 
            className="flex-1"
            variant="secondary"
            onClick={() => onViewDetails(job)}
          >
            View Application
          </Button>
        ) : (
          <Button 
            className="flex-1 btn-primary"
            onClick={handleApply}
          >
            Quick Apply
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
