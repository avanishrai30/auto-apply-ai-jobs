
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, LineChart, Clock, Calendar, ArrowUpRight, Briefcase, Search } from 'lucide-react';
import JobList from '@/components/job-applications/JobList';
import CoverLetterGenerator from '@/components/ai-tools/CoverLetterGenerator';
import { mockJobs } from '@/utils/mockData';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  
  // Calculate statistics from mock data
  const totalApplied = mockJobs.filter(job => job.status === 'applied' || job.status === 'interviewing' || job.status === 'viewed').length;
  const totalInterviews = mockJobs.filter(job => job.status === 'interviewing').length;
  const totalViewed = mockJobs.filter(job => job.status === 'viewed').length;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your applications and find new opportunities
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button className="btn-primary">
            <Search className="mr-2 h-4 w-4" />
            Auto-Apply Now
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplied}</div>
            <p className="text-xs text-muted-foreground">
              +5 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInterviews}</div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Application Views</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViewed}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalApplied > 0 ? `${Math.round((totalInterviews / totalApplied) * 100)}%` : '0%'}
            </div>
            <p className="text-xs text-muted-foreground">
              Interview conversion rate
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity Feed Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your application updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockJobs
                .filter(job => job.status)
                .slice(0, 5)
                .map(job => (
                  <div key={job.id} className="flex items-start space-x-4">
                    <div className="mt-1">
                      {job.status === 'applied' && <Clock className="h-5 w-5 text-blue-500" />}
                      {job.status === 'viewed' && <CheckCircle className="h-5 w-5 text-purple-500" />}
                      {job.status === 'interviewing' && <Calendar className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{job.title}</p>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                      <div className="flex items-center">
                        <Badge variant="outline" className="text-xs">
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-2">
                          {job.appliedDate?.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              
              {mockJobs.filter(job => job.status).length === 0 && (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No activity yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="jobs">Available Jobs</TabsTrigger>
              <TabsTrigger value="applications">My Applications</TabsTrigger>
              <TabsTrigger value="tools">AI Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="jobs" className="pt-6">
              <JobList />
            </TabsContent>
            
            <TabsContent value="applications" className="pt-6">
              <JobList />
            </TabsContent>
            
            <TabsContent value="tools" className="pt-6">
              <CoverLetterGenerator />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
