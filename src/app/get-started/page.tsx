'use client';

import React from 'react';
import ResumeUpload from '@/components/resume-upload';
import GetStartedForm from '@/components/GetStartedForm';

const GetStartedPage = () => {
  const [resumeUploaded, setResumeUploaded] = React.useState(false);

  const handleResumeUpload = () => {
    setResumeUploaded(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Get Started</h1>
      {!resumeUploaded ? (
        <ResumeUpload onUploadSuccess={handleResumeUpload} />
      ) : (
        <GetStartedForm />
      )}
    </div>
  );
};

export default GetStartedPage;
