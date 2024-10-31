import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, Bell, MessageSquare } from "lucide-react";

type HeaderProps = {
  showNavLinks?: boolean;
};

export default function Header({ showNavLinks = true }: HeaderProps) {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-sm bg-white/30 border-b border-gray-200 sticky top-0 z-10">
      <Link className="flex items-center justify-center" href="/">
        <GraduationCap className="h-6 w-6 text-purple-600" />
        <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">H1B Career Advisor</span>
      </Link>
      {showNavLinks ? (
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/control-panel">
            Dashboard
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="#">
            Applications
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="#">
            Resources
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/chatbot">
            <MessageSquare className="h-5 w-5 inline-block mr-1" />
            Chatbot
          </Link>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </nav>
      ) : (
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      )}
    </header>
  );
}
