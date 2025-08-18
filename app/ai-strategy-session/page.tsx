'use client';

import React from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import AIStrategySessionForm from "@/components/ai-strategy-session-form";

export default function AIStrategySessionPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Schedule Your Free AI Strategy Session
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Ready to turn your AI assessment into action? Schedule a complimentary 30-minute strategy session with our experts. We'll analyze your top priorities and provide a tailored implementation plan with estimated ROI.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <AIStrategySessionForm onSuccess={() => {}} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
