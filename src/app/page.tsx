import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';
import HowItWorksStep from '@/components/HowItWorksStep';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, Users, GraduationCap, ChevronRight, FileText, MessageSquare, LayoutDashboard, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    { icon: <Briefcase className="h-8 w-8 mb-2 text-purple-600" />, title: "Job Match AI", description: "Our AI algorithm matches your profile with H1B-friendly job opportunities tailored to your skills and experience." },
    { icon: <FileText className="h-8 w-8 mb-2 text-blue-600" />, title: "Job Match Evaluation", description: "Assess your likelihood of acceptance for specific H1B-friendly positions." },
    { icon: <MessageSquare className="h-8 w-8 mb-2 text-purple-600" />, title: "Career Timeline Planning", description: "Create a detailed roadmap to improve your chances of securing H1B sponsorship." },
    { icon: <GraduationCap className="h-8 w-8 mb-2 text-blue-600" />, title: "Personalized Advice", description: "Receive tailored guidance based on your field of study and career goals." },
  ];

  const howItWorksSteps = [
    { number: 1, title: "Provide Your Information", description: "Enter your details, including education, field of study, and career goals." },
    { number: 2, title: "AI Analysis", description: "Our AI agents analyze your profile and match it with H1B-friendly job opportunities." },
    { number: 3, title: "Receive Personalized Advice", description: "Get tailored recommendations, enhanced application materials, and a career roadmap." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-sm bg-white/30 border-b border-gray-200 sticky top-0 z-10">
        <Link className="flex items-center justify-center" href="/">
          <GraduationCap className="h-6 w-6 text-purple-600" />
          <span className="ml-2 text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">H1B Career Advisor</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/get-started">
            Get Started
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/chatbot">
            Chatbot
          </Link>
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <Link href="/control-panel">
              <LayoutDashboard className="h-5 w-5 text-purple-600" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Your AI Career Advisor for H1B Sponsorship
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mb-8">
              Empowering international students to navigate the complexities of H1B sponsorship and land their dream jobs in the US.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                <Link href="/get-started">
                  Start My Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-purple-50 to-white border-purple-100' : 'from-blue-50 to-white border-blue-100'} hover:shadow-lg transition-all duration-200`}>
                  <CardHeader>
                    {feature.icon}
                    <CardTitle className={index % 2 === 0 ? 'text-purple-600' : 'text-blue-600'}>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksSteps.map((step, index) => (
                <HowItWorksStep key={index} {...step} />
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-white to-blue-50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Ready to Start Your H1B Journey?</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mb-8">
              Take the first step towards your dream career in the US. Our AI-powered platform is here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                <Link href="/get-started">
                  Get Started Now <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/chatbot">Try Our Chatbot</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
