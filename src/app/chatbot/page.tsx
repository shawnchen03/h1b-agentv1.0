import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';

export default function ChatbotPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <Header />
      <main className="flex-1 py-6 px-4 overflow-hidden">
        <ChatInterface />
      </main>
      <Footer />
    </div>
  );
}