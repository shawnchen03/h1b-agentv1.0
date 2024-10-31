import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResourcesList() {
  const resources = [
    { title: "H1B Visa Guide", description: "Comprehensive guide to H1B visa process" },
    { title: "Resume Templates", description: "H1B-friendly resume templates" },
    { title: "Interview Prep", description: "Common interview questions for H1B applicants" },
  ];

  return (
    <div className="space-y-4">
      {resources.map((resource, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{resource.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{resource.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}