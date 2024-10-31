import { ReactNode } from 'react';

export type Message = {
    id: number;
    text: string;
    sender: 'user' | 'ai';
  };
  
  export type QuickReply = {
    id: number;
    text: string;
  };
  
  export type Feature = {
    icon: ReactNode;
    title: string;
    description: string;
  };
  
  export type HowItWorksStep = {
    number: number;
    title: string;
    description: string;
  };