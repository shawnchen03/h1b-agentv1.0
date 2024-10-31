import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardTabs from '@/components/DashboardTabs';

export default function ControlPanel() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <Header />
      <main className="flex-1 py-6 px-4 overflow-y-auto">
        <div className="container mx-auto max-w-6xl">
          <DashboardTabs />
        </div>
      </main>
      <Footer />
    </div>
  );
}