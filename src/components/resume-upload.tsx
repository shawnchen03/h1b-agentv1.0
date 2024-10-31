'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Linkedin, GraduationCap } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
// Commented out imports for icons that are not found
// import DropboxIcon from '@/images/dropbox-icon.png';
// import GoogleDriveIcon from '@/images/google-drive-icon.png';

// TODO: Add correct paths to icon images or remove if not needed

interface ResumeUploadProps {
  onUploadSuccess: () => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUploadSuccess }) => {
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const processAndUploadFile = async (file: File) => {
    setIsUploading(true)
    setUploadStatus('idle')
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      console.log(`Successfully processed and uploaded ${file.name}`);
      setUploadStatus('success');
      onUploadSuccess();
    } catch (error) {
      console.error('Error processing file:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      await processAndUploadFile(file);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processAndUploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/30 border-b border-gray-200 sticky top-0 z-10">
        <Link className="flex items-center justify-center" href="/">
          <GraduationCap className="h-6 w-6 text-purple-600" />
          <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">H1B Career Advisor</span>
        </Link>
      </header>
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="bg-white shadow-lg border-purple-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">I already have a resume</CardTitle>
              <p className="text-sm text-gray-500">Upload document (.docx or .txt)</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Drag and drop your resume here (.docx or .txt)
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  or{" "}
                  <label htmlFor="file-upload" className="text-blue-500 hover:underline cursor-pointer">
                    choose the file
                  </label>{" "}
                  to upload
                </p>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept=".docx,.txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              <Button variant="outline" className="w-full justify-start">
                <Image src="/images/dropbox-icon.png" alt="Dropbox logo" width={24} height={24} className="mr-2" />
                Dropbox
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Image src="/images/google-drive-icon.png" alt="Google Drive logo" width={24} height={24} className="mr-2" />
                Google Drive
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn profile
              </Button>
              {isUploading && <p>Uploading...</p>}
              {uploadStatus === 'success' && <p className="text-green-500">File uploaded successfully!</p>}
              {uploadStatus === 'error' && <p className="text-red-500">Error uploading file. Please try again.</p>}
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="w-full py-6 bg-gradient-to-r from-purple-100 to-blue-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">© 2024 H1B Career Advisor. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-sm hover:underline underline-offset-4 text-gray-600 hover:text-purple-600 transition-colors" href="/terms">
                Terms of Service
              </Link>
              <Link className="text-sm hover:underline underline-offset-4 text-gray-600 hover:text-purple-600 transition-colors" href="/privacy">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ResumeUpload
