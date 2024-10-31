import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Feature } from '@/types';

export default function FeatureCard({ icon, title, description }: Feature) {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-lg transition-all duration-200">
      <CardHeader>
        {icon}
        <CardTitle className="text-purple-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}