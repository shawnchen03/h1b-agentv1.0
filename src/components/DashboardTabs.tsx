'use client';

import React from 'react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FileText, MessageSquare, DollarSign } from "lucide-react";

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="job-search">Job Search</TabsTrigger>
        <TabsTrigger value="tools">Career Tools</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard" className="space-y-4">
        <Card className="bg-white shadow-lg border-purple-100">
          <CardHeader>
            <CardTitle>Welcome back, User!</CardTitle>
            <CardDescription>Here's an overview of your H1B job search progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Applications Submitted</span>
                  <span className="text-sm font-medium">15/50</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                    <Badge>+20%</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-xs text-muted-foreground">+3 from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
                    <Badge>+5%</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">+1 from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                    <Badge>+10%</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">120</div>
                    <p className="text-xs text-muted-foreground">+22 from last month</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg border-purple-100">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Badge className="mr-2">New</Badge>
                <span>Applied to Software Engineer position at TechCorp</span>
              </li>
              <li className="flex items-center">
                <Badge variant="secondary" className="mr-2">Update</Badge>
                <span>Updated resume with new project details</span>
              </li>
              <li className="flex items-center">
                <Badge variant="outline" className="mr-2">Scheduled</Badge>
                <span>Interview scheduled with InnovateTech for next Tuesday</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="job-search" className="space-y-4">
        <Card className="bg-white shadow-lg border-purple-100">
          <CardHeader>
            <CardTitle>H1B Job Search Configuration</CardTitle>
            <CardDescription>Customize your job search parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="job-titles" className="text-sm font-medium text-gray-700">Job Titles</label>
              <Input id="job-titles" placeholder="e.g., Data Analyst, Data Scientist, UX Researcher" />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium text-gray-700">Location</label>
              <Input id="location" placeholder="e.g., Remote, New York, San Francisco" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">H1B Sponsorship Filter</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Auto-Apply to Matching Jobs</span>
              <Switch />
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
              Save Configuration
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg border-purple-100">
          <CardHeader>
            <CardTitle>Job Search Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">152</div>
                <div className="text-sm text-gray-600">Matching Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">48</div>
                <div className="text-sm text-gray-600">Applied</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-sm text-gray-600">Offers</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="tools" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-white shadow-lg border-purple-100">
            <CardHeader>
              <CardTitle>Resume Builder</CardTitle>
              <CardDescription>Create an ATS-friendly resume tailored for H1B positions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                <FileText className="mr-2 h-4 w-4" /> Build Your Resume
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg border-purple-100">
            <CardHeader>
              <CardTitle>Cover Letter Generator</CardTitle>
              <CardDescription>Generate customized cover letters for each application</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                <FileText className="mr-2 h-4 w-4" /> Create Cover Letter
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg border-purple-100">
            <CardHeader>
              <CardTitle>Interview Simulator</CardTitle>
              <CardDescription>Practice H1B-specific interview questions with AI</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                <MessageSquare className="mr-2 h-4 w-4" /> Start Practice
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg border-purple-100">
            <CardHeader>
              <CardTitle>Salary Negotiation Coach</CardTitle>
              <CardDescription>Learn strategies for negotiating your H1B salary</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                <DollarSign className="mr-2 h-4 w-4" /> Start Coaching
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
