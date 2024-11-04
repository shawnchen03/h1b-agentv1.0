'use client';

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Redirect to Auth0 login
      window.location.href = '/api/auth/login'
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] shadow-lg rounded-lg border-0 bg-white/20 backdrop-blur-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">Welcome Back</CardTitle>
            <CardDescription className="text-center text-gray-200">
              Please sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/20 border-0 placeholder-gray-300 text-white"
                />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/20 border-0 placeholder-gray-300 text-white"
                />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white" type="submit">
                Sign In
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-gray-200">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Button 
                variant="outline" 
                className="bg-white/20 hover:bg-white/30 text-white border-0"
                onClick={() => window.location.href = '/api/auth/login'}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/20 hover:bg-white/30 text-white border-0"
                onClick={() => window.location.href = '/api/auth/login'}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.88 12.04q0 .45-.11.87-.31 1.16-1.45 1.16t-1.45-1.16q-.11-.42-.11-.87t.11-.87q.31-1.16 1.45-1.16t1.45 1.16q.11.42.11.87zm4.12 2.04v.98H5.95v-.98q0-.56.18-1.02.18-.47.73-.93.55-.46 1.1-.69.56-.23.87-.23.19 0 .79.15.6.15 1.17.15.55 0 1.15-.15.6-.15.79-.15.31 0 .87.23.55.23 1.1.69.55.46.73.93.18.46.18 1.02zm3.77-1.17q0 .45-.11.87-.31 1.16-1.45 1.16t-1.45-1.16q-.11-.42-.11-.87t.11-.87q.31-1.16 1.45-1.16t1.45 1.16q.11.42.11.87zm4.12 2.04v.98H13.8v-.98q0-.56.18-1.02.18-.47.73-.93.55-.46 1.1-.69.56-.23.87-.23.19 0 .79.15.6.15 1.17.15.55 0 1.15-.15.6-.15.79-.15.31 0 .87.23.55.23 1.1.69.55.46.73.93.18.46.18 1.02z" />
                </svg>
                Outlook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/forgot-password" className="text-sm text-center text-gray-200 hover:text-white">
                Forgot your password?
              </Link>
            </motion.div>
            <div className="text-sm text-center text-gray-200">
              Don't have an account?{" "}
              <Link href="/api/auth/login?screen_hint=signup" className="text-white hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
} 