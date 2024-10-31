'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Send } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function GetStartedForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleStartJourney = () => {
    // Here you would typically submit the form data
    // For now, we'll just navigate to the dashboard
    router.push('/control-panel');
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <Button onClick={() => setStep(2)} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
              Next <ChevronLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="education" className="text-sm font-medium text-gray-700">Current Education Level</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="phd">Ph.D.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="graduation" className="text-sm font-medium text-gray-700">Expected Graduation Date</label>
              <Input id="graduation" type="date" />
            </div>
            <div className="space-y-2">
              <label htmlFor="major" className="text-sm font-medium text-gray-700">Field of Study / Major</label>
              <Input id="major" placeholder="e.g., Computer Science" />
            </div>
            <div className="flex justify-between">
              <Button onClick={() => setStep(1)} variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setStep(3)} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                Next <ChevronLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="interests" className="text-sm font-medium text-gray-700">Industries / Job Positions of Interest</label>
              <Input id="interests" placeholder="e.g., Software Engineering, Data Science" />
            </div>
            <div className="space-y-2">
              <label htmlFor="goals" className="text-sm font-medium text-gray-700">Career Goals</label>
              <Textarea id="goals" placeholder="Describe your career objectives and what you hope to achieve" />
            </div>
            <div className="flex justify-between">
              <Button onClick={() => setStep(2)} variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleStartJourney} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                Start My Career Journey <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="bg-white shadow-lg border-purple-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Get Started with H1B Career Advisor</CardTitle>
        <CardDescription>Please provide your information to receive personalized career advice.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex justify-between">
          {[1, 2, 3].map((i) => (
            <Badge key={i} variant={step >= i ? "default" : "outline"} className="w-20 justify-center">
              Step {i}
            </Badge>
          ))}
        </div>
        {renderStep()}
      </CardContent>
    </Card>
  );
}
