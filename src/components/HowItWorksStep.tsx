import React from 'react';
import type { HowItWorksStep as HowItWorksStepType } from '@/types';

export default function HowItWorksStep({ number, title, description }: HowItWorksStepType) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      <span className="text-2xl font-bold text-purple-600 mb-2">{number}</span>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}