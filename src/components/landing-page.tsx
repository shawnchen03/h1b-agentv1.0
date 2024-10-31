'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Briefcase, FileText, MessageSquare, LayoutDashboard, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"

export function LandingPageComponent() {
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
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <Briefcase className="h-8 w-8 mb-2 text-purple-600" />
                  <CardTitle className="text-purple-600">Job Match AI</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Our AI algorithm matches your profile with H1B-friendly job opportunities tailored to your skills and experience.</CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <FileText className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle className="text-blue-600">Resume Optimizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Enhance your resume with our AI-powered tool, optimizing it for ATS systems and H1B sponsorship requirements.</CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <MessageSquare className="h-8 w-8 mb-2 text-purple-600" />
                  <CardTitle className="text-purple-600">Interview Simulator</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Practice with our AI-driven interview simulator, featuring H1B-specific questions and real-time feedback.</CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <GraduationCap className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle className="text-blue-600">Visa Process Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Navigate the complex H1B visa process with our step-by-step guide and personalized checklist.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
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
      <footer className="w-full py-6 bg-gradient-to-r from-purple-100 to-blue-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">© 2024 H1B Career Advisor. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-sm hover:underline underline-offset-4 text-gray-600 hover:text-purple-600 transition-colors" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm hover:underline underline-offset-4 text-gray-600 hover:text-purple-600 transition-colors" href="#">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}