
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Upload, BarChart, Bot, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Apply to jobs <span className="gradient-text">automatically</span> with AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              MeOne automates LinkedIn job applications with AI, applying to jobs based on your resume, preferences, and strategy.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="btn-primary text-lg px-8 py-6" asChild>
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/profile">
                  Complete Your Profile
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How MeOne Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Set up once and let our AI take care of your job applications
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Upload Your Resume</h3>
                  <p className="text-muted-foreground">
                    Upload your resume and our AI extracts your skills and experience
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Set Your Preferences</h3>
                  <p className="text-muted-foreground">
                    Tell us what jobs you're looking for and how many applications per day
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">AI Auto-Applies</h3>
                  <p className="text-muted-foreground">
                    Our AI finds matching jobs and applies for you, even when you're offline
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Use MeOne?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Save time and increase your chances of landing your dream job
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Save Hundreds of Hours</h3>
                  <p className="text-muted-foreground">
                    No more manual applications. MeOne applies to jobs while you focus on interviews and networking.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI-Optimized Applications</h3>
                  <p className="text-muted-foreground">
                    Our AI customizes your applications for each job, increasing your chances of getting noticed.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Apply to More Jobs</h3>
                  <p className="text-muted-foreground">
                    Cast a wider net by applying to more positions than humanly possible, increasing your opportunity pool.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Track Everything in One Place</h3>
                  <p className="text-muted-foreground">
                    Monitor all your applications, interviews, and offers in a single dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-meone-blue to-meone-purple text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your job search?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who are saving time and landing more interviews with MeOne.
            </p>
            <Button className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6" asChild>
              <Link to="/dashboard">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
