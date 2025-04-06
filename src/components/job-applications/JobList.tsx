
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import JobCard from './JobCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/types';
import { mockJobs } from '@/utils/mockData';

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    filterJobs(query, filterBy, sortBy);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    filterJobs(searchQuery, filterBy, value);
  };

  const handleFilter = (value: string) => {
    setFilterBy(value);
    filterJobs(searchQuery, value, sortBy);
  };

  const filterJobs = (query: string, filter: string, sort: string) => {
    let results = [...jobs];
    
    // Apply search filter
    if (query) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filter !== 'all') {
      results = results.filter(job => job.status === filter);
    }
    
    // Apply sorting
    results.sort((a, b) => {
      if (sort === 'recent') {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      } else if (sort === 'salary-high') {
        return (b.salary?.max || 0) - (a.salary?.max || 0);
      } else if (sort === 'salary-low') {
        return (a.salary?.min || 0) - (b.salary?.min || 0);
      }
      return 0;
    });
    
    setFilteredJobs(results);
  };

  const handleApply = (jobId: string) => {
    // In a real application, this would send an API request
    // For demo purposes, we'll just update the local state
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: 'applied' as const,
          appliedDate: new Date()
        };
      }
      return job;
    });
    
    setJobs(updatedJobs);
    setFilteredJobs(
      filteredJobs.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            status: 'applied' as const,
            appliedDate: new Date()
          };
        }
        return job;
      })
    );
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs by title, company, or keywords"
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={filterBy} onValueChange={handleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="viewed">Viewed</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="offered">Offered</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={handleSort}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="salary-high">Highest Salary</SelectItem>
              <SelectItem value="salary-low">Lowest Salary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No jobs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find more jobs
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApply}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
      
      {selectedJob && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{selectedJob.title}</DialogTitle>
              <DialogDescription className="flex items-center">
                <span className="font-medium">{selectedJob.company}</span>
                {selectedJob.status && (
                  <Badge variant="outline" className="ml-2">
                    {selectedJob.status.charAt(0).toUpperCase() + selectedJob.status.slice(1)}
                  </Badge>
                )}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline">{selectedJob.location}</Badge>
                <Badge variant="outline" className="capitalize">
                  {selectedJob.jobType.replace('-', ' ')}
                </Badge>
                <Badge variant="outline">{selectedJob.experienceLevel}</Badge>
              </div>
              
              {selectedJob.salary && (
                <div className="flex items-center text-sm">
                  <span className="font-medium mr-2">Salary Range:</span>
                  ${selectedJob.salary.min.toLocaleString()} - ${selectedJob.salary.max.toLocaleString()} {selectedJob.salary.currency}
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-1">Description</h3>
                <p className="text-sm">{selectedJob.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Requirements</h3>
                <ul className="list-disc list-inside text-sm">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <DialogFooter className="flex-col sm:flex-row gap-2">
              {selectedJob.status ? (
                <span className="text-sm text-muted-foreground">
                  Applied on {selectedJob.appliedDate?.toLocaleDateString()}
                </span>
              ) : (
                <Button 
                  className="w-full sm:w-auto btn-primary"
                  onClick={() => {
                    handleApply(selectedJob.id);
                    setIsDetailsOpen(false);
                  }}
                >
                  Apply Now
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default JobList;
