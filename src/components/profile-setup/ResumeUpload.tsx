
import React, { useState } from 'react';
import { Upload, FileText, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ResumeUploadProps {
  onUpload: (file: File) => void;
  resumeUrl?: string;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUpload, resumeUrl }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      validateAndUploadFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndUploadFile(droppedFile);
    }
  };

  const validateAndUploadFile = (selectedFile: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(selectedFile.type)) {
      setUploadStatus('error');
      setErrorMessage('Only PDF and Word documents are allowed.');
      return;
    }
    
    if (selectedFile.size > maxSize) {
      setUploadStatus('error');
      setErrorMessage('File size must be less than 5MB.');
      return;
    }
    
    setFile(selectedFile);
    setUploadStatus('success');
    onUpload(selectedFile);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resume Upload</CardTitle>
        <CardDescription>
          Upload your resume to help us match you with the right jobs
        </CardDescription>
      </CardHeader>
      <CardContent>
        {resumeUrl || uploadStatus === 'success' ? (
          <div className="flex items-center justify-between p-4 border rounded-md bg-secondary">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <p className="font-medium">{file?.name || 'Resume.pdf'}</p>
                <p className="text-sm text-muted-foreground">
                  {file?.size ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Document'}
                </p>
              </div>
            </div>
            <Check className="h-5 w-5 text-green-500" />
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-all ${
              isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('resume-upload')?.click()}
          >
            <input
              id="resume-upload"
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-1">Upload your resume</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mt-3 flex items-center space-x-2 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{errorMessage}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {(resumeUrl || uploadStatus === 'success') && (
          <Button 
            variant="outline" 
            onClick={() => {
              setFile(null);
              setUploadStatus('idle');
            }}
          >
            Replace Resume
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResumeUpload;
