'use client';

import React, { useState, useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Task {
  name: string;
  painPoint: string;
}

interface Category {
  category: string;
  tasks: Task[];
}

interface ScoreData {
  name: string;
  score: number;
}

const AIOpportunityAssessment: React.FC = () => {
  const [totalScore, setTotalScore] = useState<number>(0);
  const [readinessLevel, setReadinessLevel] = useState<string>('-');
  const [readinessDescription, setReadinessDescription] = useState<string>('Complete the scorecard to see your results.');
  const [topPriorities, setTopPriorities] = useState<ScoreData[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  // Data extracted from the provided document
  const scorecardData: Category[] = [
    {
      category: 'Marketing & Lead Generation',
      tasks: [
        { name: 'Content Creation (Blogs, Social Posts, Ad Copy)', painPoint: "Time-consuming; struggles with consistent output and brand voice; writer's block delays campaigns." },
        { name: 'Lead Data Enrichment', painPoint: 'Incomplete or inaccurate lead data; high manual effort; sales team wastes time on research instead of selling.' },
        { name: 'Social Media Monitoring', painPoint: 'Miss important customer feedback; slow response times to complaints or praise; lack of insight into brand sentiment.' },
        { name: 'Ad Campaign Personalization & Optimization', painPoint: 'Low engagement; wasted ad spend on the wrong audience; inability to scale personalization.' }
      ]
    },
    {
      category: 'Sales & Customer Service',
      tasks: [
        { name: 'Initial Lead Qualification', painPoint: 'Reps waste significant time on unqualified leads; 24/7 response is impossible.' },
        { name: 'Lead Scoring & Prioritization', painPoint: 'High-potential leads are missed or contacted too late; inconsistent follow-up.' },
        { name: 'Meeting Summaries & Follow-ups', painPoint: 'Inconsistent notes; action items are forgotten; follow-ups are delayed.' },
        { name: 'Answering Repetitive Customer Questions', painPoint: 'High support workload on simple questions; long wait times for customers with basic queries.' }
      ]
    },
    {
      category: 'Operations & Administration',
      tasks: [
        { name: 'Invoice & Receipt Processing', painPoint: 'Prone to data entry errors; slow and tedious process; delays in payments and reporting.' },
        { name: 'Generating Standard Business Reports', painPoint: 'Takes hours or days; data can be outdated; prone to human error.' },
        { name: 'Scheduling Meetings', painPoint: 'Wastes significant time in back-and-forth emails; creates a poor client experience.' },
        { name: 'Expense Management & Fraud Detection', painPoint: 'Slow reimbursement cycles; poor compliance with spending policies; risk of fraud.' }
      ]
    },
    {
      category: 'Human Resources',
      tasks: [
        { name: 'Recruitment: Resume Screening & Candidate Sourcing', painPoint: 'Time-consuming; high-quality candidates are missed; unconscious bias can influence decisions.' },
        { name: 'Employee Onboarding', painPoint: 'Inconsistent onboarding experience; new hires are overwhelmed; administrative delays.' },
        { name: 'Employee Training & Development', painPoint: 'Low engagement with generic training; skills gaps are not effectively addressed.' },
        { name: 'Performance Management & Reviews', painPoint: 'Recency bias skews reviews; feedback is often subjective and lacks data.' }
      ]
    },
    {
      category: 'Other High-Impact Areas',
      tasks: [
        { name: 'Task & Project Management', painPoint: 'Overlooked deadlines, poor collaboration, lack of a single source of truth for project status.' },
        { name: 'Creative Design & Media Generation', painPoint: 'High costs, slow turnaround times, inconsistent branding across different assets.' },
        { name: 'Cybersecurity Monitoring', painPoint: 'High vulnerability to sophisticated attacks; significant compliance and data breach risks.' },
        { name: 'E-commerce Optimization', painPoint: 'Lost sales from poor personalization, inventory mismatches, and non-competitive pricing.' }
      ]
    }
  ];

  // Function to generate a unique ID for each task
  const toKebabCase = (str: string): string => {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // Handle rating change
  const handleRatingChange = (taskName: string, rating: number) => {
    setScores(prev => ({
      ...prev,
      [taskName]: rating
    }));
  };

  // Calculate results
  const calculateResults = () => {
    let newTotalScore = 0;
    const scoreArray: ScoreData[] = [];

    Object.entries(scores).forEach(([taskName, score]) => {
      newTotalScore += score;
      if (score > 0) {
        scoreArray.push({ name: taskName, score });
      }
    });

    // Animate score update
    let currentScore = 0;
    const scoreAnimation = setInterval(() => {
      if (currentScore >= newTotalScore) {
        clearInterval(scoreAnimation);
        setTotalScore(newTotalScore);
      } else {
        currentScore++;
        setTotalScore(currentScore);
      }
    }, 20);

    // Determine readiness level
    let level = '';
    let description = '';
    if (newTotalScore >= 1 && newTotalScore <= 35) {
      level = 'Explorer';
      description = "You're just beginning. Focus on a single, low-risk pilot project to build confidence and demonstrate value.";
    } else if (newTotalScore > 35 && newTotalScore <= 70) {
      level = 'Implementer';
      description = "You have clear opportunities. Prioritize the top 2-3 tasks and build a phased implementation roadmap.";
    } else if (newTotalScore > 70) {
      level = 'Innovator';
      description = "Your business is ripe for transformation. A strategic, top-down approach is critical to maximize impact.";
    } else {
      level = '-';
      description = 'Complete the scorecard to see your results.';
    }

    setReadinessLevel(level);
    setReadinessDescription(description);

    // Determine top 3 priorities
    scoreArray.sort((a, b) => b.score - a.score);
    const top3 = scoreArray.slice(0, 3);
    setTopPriorities(top3);

    // Scroll to results
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <React.Fragment>
      <Header />
      <div className="bg-slate-50 text-slate-800">
        <style jsx>{`
        body {
          font-family: 'Inter', sans-serif;
        }
        .task-card {
          transition: all 0.3s ease-in-out;
        }
        .task-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }
        .rating input[type="radio"] {
          display: none;
        }
        .rating label {
          cursor: pointer;
          transition: color 0.2s ease-in-out;
        }
        .rating input[type="radio"]:checked ~ label,
        .rating:hover input[type="radio"] ~ label,
        .rating:hover input[type="radio"]:checked ~ label {
          color: #f59e0b; /* amber-500 */
        }
        .rating input[type="radio"]:hover ~ label {
           color: #f59e0b;
        }

        /* Style for the stars from right to left on hover */
        .rating:hover label {
          color: #f59e0b !important;
        }
        .rating label:hover ~ label {
           color: #d1d5db !important; /* gray-400 */
        }
        .results-card {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>


      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">Unlock Your AI Potential</h2>
          <p className="text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto mb-8">Move from abstract concepts to concrete action. Use this interactive scorecard to systematically scan your business operations and pinpoint the best opportunities for AI automation.</p>
          <a href="#scorecard" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">Start Your Assessment</a>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <section id="scorecard">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Evaluate Your Business Processes</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">For each task, describe your current process and score its automation potential from 1 (Low) to 5 (High).</p>
          </div>

          {/* Scorecard Grid */}
          <div className="space-y-8">
            {scorecardData.map((cat, catIndex) => (
              <div key={catIndex} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h4 className="text-2xl font-bold text-indigo-700 mb-6">{cat.category}</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {cat.tasks.map((task, taskIndex) => {
                    const taskId = toKebabCase(task.name);
                    return (
                      <div key={taskIndex} className="task-card bg-slate-50 border border-slate-200 rounded-lg p-5">
                        <h5 className="font-bold text-lg text-slate-800">{task.name}</h5>
                        <p className="text-sm text-slate-500 mt-1 mb-4"><strong>Pain Point:</strong> {task.painPoint}</p>
                        
                        <div className="mb-4">
                          <label htmlFor={`process-${taskId}`} className="block text-sm font-medium text-slate-700 mb-1">How We Do It Now</label>
                          <textarea 
                            id={`process-${taskId}`} 
                            rows={2} 
                            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Automation Potential (1-5)</label>
                          <div className="rating flex flex-row-reverse justify-end items-center text-3xl text-slate-300">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <React.Fragment key={rating}>
                                <input 
                                  type="radio" 
                                  id={`star${rating}-${taskId}`} 
                                  name={`rating-${taskId}`} 
                                  value={rating}
                                  checked={scores[task.name] === rating}
                                  onChange={() => handleRatingChange(task.name, rating)}
                                />
                                <label htmlFor={`star${rating}-${taskId}`} title={`${rating} ${rating === 1 ? 'star' : 'stars'}`}>★</label>
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Results Section */}
        <section id="results" className="mt-20 pt-10">
          <div className="sticky top-20">
            <div className="bg-white/70 results-card border border-slate-200 rounded-2xl shadow-lg p-8">
              <h3 className="text-3xl font-bold text-center text-slate-900 mb-6">Your AI Readiness Report</h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center">
                  <p className="text-slate-600 text-lg mb-2">Total Score</p>
                  <p className="text-7xl font-extrabold text-blue-700">{totalScore}</p>
                  <p className="mt-2 text-2xl font-bold text-slate-800">{readinessLevel}</p>
                  <p className="text-slate-500 mt-1 max-w-xs mx-auto">{readinessDescription}</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Top 3 Automation Priorities:</h4>
                  <ol className="list-decimal list-inside space-y-3">
                    {topPriorities.length > 0 ? (
                      topPriorities.map((item, index) => (
                        <li key={index} className="text-slate-700 font-medium text-lg">
                          {item.name} <span className="text-sm font-normal text-amber-600 ml-2">(Score: {item.score})</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-slate-600">Fill out the scorecard to see your top priorities.</li>
                    )}
                  </ol>
                </div>
              </div>
              <div className="text-center mt-8">
                <button 
                  onClick={calculateResults}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 w-full md:w-auto"
                >
                  Calculate My Score
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AIOpportunityAssessment;
