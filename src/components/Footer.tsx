import React from 'react';

import Link from 'next/link';

export default function Footer() {
  return (
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
  );
}