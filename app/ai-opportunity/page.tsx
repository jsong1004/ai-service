'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import Header from "@/components/header";
import Footer from "@/components/footer";

// Register Chart.js components
Chart.register(...registerables);

interface OpportunityData {
  function: string;
  task: string;
  painPoint: string;
  potential: number;
  solution: string;
  complexity: string;
  price: string;
  roiMetrics: string;
  dataQuality: string;
}

const InteractiveAIOpportunity: React.FC = () => {
  const [filteredData, setFilteredData] = useState<OpportunityData[]>([]);
  const [selectedFunction, setSelectedFunction] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSubmitSuccess(false);
    setErrorMessage('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      industry: formData.get('industry'),
      teamSize: formData.get('teamSize'),
      topPriorities: formData.get('topPriorities'),
      message: formData.get('message'),
      preferredDate: formData.get('preferredDate'),
      preferredTime: formData.get('preferredTime'),
    };

    try {
      const response = await fetch('/api/ai-strategy-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        setErrorMessage('Failed to submit form. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Data extracted from the provided document
  const scorecardData: OpportunityData[] = [
    {
      "function": "Marketing & Lead Generation",
      "task": "Content Creation",
      "painPoint": "Time-consuming; struggles with consistent output and brand voice; writer's block delays campaigns.",
      "potential": 4,
      "solution": "Use Generative AI (e.g., Jasper, ChatGPT, Writesonic) to draft articles, social media posts, and ad copy from a single brief, then have a human editor refine and approve.",
      "complexity": "Low to Medium",
      "price": "Free Tier, $",
      "roiMetrics": "- Reduction in content creation time (hours/piece).<br>- Increased content output volume (e.g., from 2 to 8 blogs/mo).<br>- Lower Customer Acquisition Cost (CAC).",
      "dataQuality": "- <b>Accuracy:</b> Documented brand voice guidelines.<br>- <b>Completeness:</b> Historical content performance data for optimization."
    },
    {
      "function": "Marketing & Lead Generation",
      "task": "Lead Data Enrichment",
      "painPoint": "Incomplete or inaccurate lead data; high manual effort; sales team wastes time on research instead of selling.",
      "potential": 5,
      "solution": "Implement a data enrichment tool (e.g., Clearbit, Datanyze, Seamless.AI) that automatically appends firmographic and demographic data to lead records in the CRM in real-time.",
      "complexity": "Medium",
      "price": "$$to$$$",
      "roiMetrics": "- Time saved on manual research (hours/week per rep).<br>- Improved lead segmentation and personalization effectiveness.<br>- Higher lead-to-opportunity conversion rates.",
      "dataQuality": "- <b>Accuracy:</b> High quality of initial lead data (e.g., valid email).<br>- <b>Uniqueness:</b> Low duplicate rate in the source CRM."
    },
    {
      "function": "Marketing & Lead Generation",
      "task": "Social Media Monitoring",
      "painPoint": "Miss important customer feedback; slow response times to complaints or praise; lack of insight into brand sentiment and competitor strategy.",
      "potential": 3,
      "solution": "Implement a social listening tool (e.g., Brand24, Mentionlytics, Sprout Social) to automatically track brand mentions, keywords, and competitor activity in real-time and analyze sentiment.",
      "complexity": "Low to Medium",
      "price": "$ to $$",
      "roiMetrics": "- Reduction in average response time to mentions.<br>- Improvement in brand sentiment score over time.<br>- Increased Share of Voice (SOV) compared to competitors.",
      "dataQuality": "N/A (relies on external public data)."
    },
    {
      "function": "Marketing & Lead Generation",
      "task": "Ad Campaign Personalization & Optimization",
      "painPoint": "Low engagement; wasted ad spend on the wrong audience; inability to scale personalization across different segments.",
      "potential": 5,
      "solution": "Leverage AI within ad platforms (e.g., Google, Meta) or use dedicated ad creation tools (e.g., AdCreative.ai, Mesha) to hyper-target audiences based on predictive analytics and generate hundreds of ad variations.",
      "complexity": "Medium to High",
      "price": "$$to$$$",
      "roiMetrics": "- Increase in Return on Ad Spend (ROAS).<br>- Lift in conversion rates for personalized vs. generic ads.<br>- Reduction in Cost Per Acquisition (CPA).",
      "dataQuality": "- <b>Timeliness & Accuracy:</b> Real-time customer behavior data.<br>- <b>Completeness:</b> Rich customer profiles with multiple data points."
    },
    {
      "function": "Sales & Customer Service",
      "task": "Initial Lead Qualification",
      "painPoint": "Reps waste significant time on unqualified leads; 24/7 response is impossible, leading to lost opportunities with 'night owl' prospects.",
      "potential": 5,
      "solution": "Deploy an AI chatbot (e.g., Tidio, Intercom, WotNot) on the website to engage visitors 24/7, ask qualifying questions (e.g., budget, timeline), and automatically book meetings for qualified leads on sales reps' calendars.",
      "complexity": "Low to Medium",
      "price": "Free Tier, $",
      "roiMetrics": "- Number of Marketing Qualified Leads (MQLs) generated automatically.<br>- Reduction in lead response time (from hours to seconds).<br>- Increase in sales meetings booked.",
      "dataQuality": "- <b>Validity:</b> Clearly defined and documented lead qualification criteria (e.g., BANT framework)."
    },
    {
      "function": "Sales & Customer Service",
      "task": "Lead Scoring & Prioritization",
      "painPoint": "High-potential leads are missed or contacted too late; inconsistent follow-up across the team; sales efforts are not focused on the most promising opportunities.",
      "potential": 5,
      "solution": "Use predictive AI lead scoring features within a CRM (e.g., HubSpot, Salesforce Einstein) to analyze dozens of signals (demographic, behavioral, engagement) and assign a score indicating conversion likelihood.",
      "complexity": "Medium to High",
      "price": "$$to$$$",
      "roiMetrics": "- Increase in lead-to-opportunity conversion rate.<br>- Reduction in sales cycle length.<br>- Increase in sales team productivity.",
      "dataQuality": "- <b>Completeness & Accuracy:</b> Historical lead data with accurate win/loss status and associated activities."
    },
    {
      "function": "Sales & Customer Service",
      "task": "Meeting Summaries & Follow-ups",
      "painPoint": "Inconsistent notes; action items are forgotten; follow-ups are delayed; valuable customer insights are lost instead of being logged in the CRM.",
      "potential": 4,
      "solution": "Use an AI meeting assistant (e.g., Fireflies.ai, Avoma, Tactiq) to automatically join, record, transcribe, and summarize sales calls. The AI identifies key topics, action items, and questions asked.",
      "complexity": "Low",
      "price": "Free Tier, $",
      "roiMetrics": "- Time saved on manual note-taking and follow-up composition (hours/week).<br>- Increased consistency and speed of post-meeting follow-ups.<br>- Improved accuracy of call logs and notes in CRM.",
      "dataQuality": "N/A (relies on audio input)."
    },
    {
      "function": "Sales & Customer Service",
      "task": "Answering Repetitive Customer Questions",
      "painPoint": "High support workload on simple questions; long wait times for customers with basic queries; human agents are bogged down with repetitive tasks instead of solving complex issues.",
      "potential": 5,
      "solution": "Build an AI-powered knowledge base and/or chatbot (e.g., Zendesk, HelpDesk, Intercom) that provides instant, 24/7 answers to common questions, deflecting a significant portion of inbound support tickets.",
      "complexity": "Medium",
      "price": "$ to $$",
      "roiMetrics": "- Ticket deflection rate (percentage of queries resolved by AI).<br>- Reduction in first-response time for human-handled tickets.<br>- Increase in Customer Satisfaction (CSAT) scores.",
      "dataQuality": "- <b>Accuracy & Completeness:</b> Well-documented, up-to-date knowledge base articles."
    },
    {
      "function": "Operations & Administration",
      "task": "Invoice & Receipt Processing",
      "painPoint": "Prone to data entry errors; slow and tedious process; delays in vendor payments and financial reporting.",
      "potential": 5,
      "solution": "Use AI-powered Optical Character Recognition (OCR) and data extraction tools (e.g., ReceiptsAI, Ramp, Rossum) to automatically read documents, extract key data (vendor, amount, line items), and sync with accounting software.",
      "complexity": "Low to Medium",
      "price": "$ to $$",
      "roiMetrics": "- Reduction in manual data entry time.<br>- Reduction in data entry error rate.<br>- Faster invoice approval cycle time.",
      "dataQuality": "- <b>Validity:</b> Standard document formats (PDF, JPG, PNG).<br>- <b>Accuracy:</b> Legible, non-handwritten text on documents."
    },
    {
      "function": "Operations & Administration",
      "task": "Generating Standard Business Reports",
      "painPoint": "Takes hours or days each week/month; data can be outdated by the time the report is finished; prone to human error in formulas and data consolidation.",
      "potential": 4,
      "solution": "Use AI features in modern Business Intelligence (BI) tools (e.g., Power BI, Tableau) to automate data source connections, schedule report refreshes, and use natural language queries to generate insights and visualizations.",
      "complexity": "High",
      "price": "$$to$$$",
      "roiMetrics": "- Time saved on manual report creation.<br>- Increased speed and accuracy of data-driven decisions.<br>- Test Pass/Fail Rate Assessment of reports.",
      "dataQuality": "- <b>Consistency & Integrity:</b> Data must be standardized across all source systems to allow for accurate aggregation."
    },
    {
      "function": "Operations & Administration",
      "task": "Scheduling Meetings",
      "painPoint": "Back-and-forth email chains to find a suitable meeting time; wastes significant time for all parties; creates a poor, inefficient experience for clients and prospects.",
      "potential": 4,
      "solution": "Use an AI scheduling assistant (e.g., Calendly, Reclaim.ai, Motion) to automate the booking process. Share a link with available times or have the AI find the optimal time across multiple calendars automatically.",
      "complexity": "Low",
      "price": "Free Tier, $",
      "roiMetrics": "- Time saved per meeting scheduled.<br>- Reduction in time-to-schedule for client meetings.<br>- Improved meeting attendance rates due to automated reminders.",
      "dataQuality": "- <b>Accuracy & Timeliness:</b> Up-to-date personal calendar availability."
    },
    {
      "function": "Operations & Administration",
      "task": "Expense Management & Fraud Detection",
      "painPoint": "Slow reimbursement cycles; poor compliance with spending policies; risk of fraudulent or duplicate expenses being approved.",
      "potential": 4,
      "solution": "Implement AI-powered expense management tools (e.g., Expensify, Ramp) for automated receipt scanning, expense categorization, and real-time policy enforcement. Use AI fraud detection for payment processing.",
      "complexity": "Medium",
      "price": "$ to $$",
      "roiMetrics": "- Reduction in expense report processing time.<br>- Positive ROI within 8 months.<br>- Reduction in fraudulent transactions.",
      "dataQuality": "- <b>Accuracy:</b> Legible receipt data.<br>- <b>Validity:</b> Clearly defined, structured expense policies."
    },
    {
      "function": "Human Resources",
      "task": "Resume Screening & Candidate Sourcing",
      "painPoint": "Time-consuming and inefficient; high-quality candidates are missed; unconscious bias can influence screening decisions; passive candidates are not identified.",
      "potential": 5,
      "solution": "Use AI features within an Applicant Tracking System (ATS) (e.g., Manatal, Workable) to automatically parse resumes, score and rank candidates against job criteria, and source passive candidates from databases.",
      "complexity": "Medium",
      "price": "$ to $$",
      "roiMetrics": "- Reduction in time-to-fill.<br>- Reduction in cost-per-hire.<br>- Improved quality of hire and diversity.",
      "dataQuality": "- <b>Completeness & Accuracy:</b> Well-defined job descriptions and structured candidate resumes."
    },
    {
      "function": "Human Resources",
      "task": "Employee Onboarding",
      "painPoint": "Inconsistent onboarding experience; new hires are overwhelmed with information; administrative tasks delay integration into their actual role.",
      "potential": 3,
      "solution": "Automate onboarding workflows with an HRIS (e.g., BambooHR, Deel) to handle paperwork, schedule meetings, and assign tasks. Use AI chatbots to answer common new hire questions 24/7.",
      "complexity": "Medium",
      "price": "$ to $$",
      "roiMetrics": "- Reduction in time-to-productivity.<br>- Improved new hire retention.<br>- Increased new hire satisfaction.",
      "dataQuality": "- <b>Accuracy:</b> Correct new hire information (name, role, start date).<br>- <b>Validity:</b> Structured, documented onboarding checklists."
    },
    {
      "function": "Human Resources",
      "task": "Employee Training & Development",
      "painPoint": "Low engagement with training content; skills gaps are not effectively addressed; training investment does not translate to improved performance.",
      "potential": 4,
      "solution": "Use AI-powered learning platforms (e.g., Coursebox) to create personalized learning paths, generate tailored quiz content, and analyze employee skill gaps to recommend relevant training.",
      "complexity": "Medium to High",
      "price": "$$",
      "roiMetrics": "- Increase in course completion rates.<br>- Reduction in time to competence for new skills.<br>- Measurable skill improvement.",
      "dataQuality": "- <b>Accuracy:</b> Up-to-date employee skill profiles and performance data."
    },
    {
      "function": "Human Resources",
      "task": "Performance Management & Reviews",
      "painPoint": "Recency bias skews reviews; reviews are time-consuming to prepare; feedback is not actionable; goal alignment across the company is weak.",
      "potential": 4,
      "solution": "Implement AI-powered performance management tools (e.g., Lattice, Peoplebox.ai) to aggregate 360-degree feedback, analyze performance data from various systems, summarize meeting notes, and suggest data-driven discussion points for managers.",
      "complexity": "Medium",
      "price": "$",
      "roiMetrics": "- Reduction in administrative time spent on reviews.<br>- Increase in employee satisfaction with the review process.<br>- Improved goal alignment and data-driven performance conversations.",
      "dataQuality": "- <b>Consistency & Accuracy:</b> Regular, structured performance feedback and goal tracking data from multiple sources."
    },
    {
      "function": "Other High-Impact Areas",
      "task": "Task & Project Management",
      "painPoint": "Overlooked deadlines, poor collaboration, lack of a single source of truth for project status.",
      "potential": 4,
      "solution": "Utilize AI assistants in project management tools (ClickUp, Asana) to automate task creation, generate progress summaries, and flag at-risk deadlines.",
      "complexity": "Medium",
      "price": "$ to $$",
      "roiMetrics": "- 40-60% productivity boost in project completion.<br>- Reduction in time spent on project admin.",
      "dataQuality": "- <b>Completeness:</b> Consistent use of the tool for all tasks."
    },
    {
      "function": "Other High-Impact Areas",
      "task": "Creative Design & Media Generation",
      "painPoint": "High costs, slow turnaround times, inconsistent branding across different assets.",
      "potential": 5,
      "solution": "Use generative AI tools (Adobe Firefly, Midjourney, Synthesia) to create on-brand images, video, and audio content from text prompts.",
      "complexity": "Medium",
      "price": "$ to $$",
      "roiMetrics": "- 70-90% reduction in time and cost for creative assets.<br>- Increased marketing campaign velocity.",
      "dataQuality": "- <b>Accuracy:</b> Well-defined brand style guides."
    },
    {
      "function": "Other High-Impact Areas",
      "task": "Cybersecurity Monitoring",
      "painPoint": "High vulnerability to sophisticated phishing, malware, and ransomware attacks; significant compliance and data breach risks.",
      "potential": 5,
      "solution": "Deploy AI-driven security platforms (Darktrace, CrowdStrike) to proactively monitor network traffic, detect anomalous behavior, and automatically neutralize threats.",
      "complexity": "High",
      "price": "$$to$$$",
      "roiMetrics": "- 50-80% reduction in security breach risk.<br>- Faster threat detection and response times.",
      "dataQuality": "- <b>Completeness:</b> Access to all network logs and endpoint data."
    },
    {
      "function": "Other High-Impact Areas",
      "task": "E-commerce Optimization",
      "painPoint": "Lost sales from poor personalization, inventory mismatches, and non-competitive pricing.",
      "potential": 5,
      "solution": "Integrate AI tools within e-commerce platforms (Shopify Magic, Algolia) to enable dynamic pricing, personalized product recommendations, and smarter inventory forecasting.",
      "complexity": "Medium",
      "price": "$$to$$$",
      "roiMetrics": "- 30-50% potential increase in online sales.<br>- Higher Average Order Value (AOV).",
      "dataQuality": "- <b>Completeness:</b> Rich data on customer behavior and purchase history."
    }
  ];

  const complexityMap: { [key: string]: number } = { 
    "Low": 1, 
    "Low to Medium": 2, 
    "Medium": 3, 
    "Medium to High": 4, 
    "High": 5 
  };
  
  const priceMap: { [key: string]: number } = { 
    "Free Tier, $": 10, 
    "$": 12,
    "$ to $$": 20, 
    "$$": 25,
    "$$to$$$": 30 
  };
  
  const colorMap: { [key: string]: string } = {
    "Marketing & Lead Generation": 'rgba(59, 130, 246, 0.7)',
    "Sales & Customer Service": 'rgba(16, 185, 129, 0.7)',
    "Operations & Administration": 'rgba(249, 115, 22, 0.7)',
    "Human Resources": 'rgba(139, 92, 246, 0.7)',
    "Other High-Impact Areas": 'rgba(239, 68, 68, 0.7)'
  };

  const functionColorMap: { [key: string]: string } = {
    "Marketing & Lead Generation": 'text-blue-600',
    "Sales & Customer Service": 'text-emerald-600',
    "Operations & Administration": 'text-orange-600',
    "Human Resources": 'text-violet-600',
    "Other High-Impact Areas": 'text-red-600'
  };

  // Filter data based on selected filters
  const filterData = (): OpportunityData[] => {
    return scorecardData.filter(item => {
      const functionMatch = selectedFunction === 'all' || item.function === selectedFunction;
      const complexityMatch = selectedComplexity === 'all' || item.complexity === selectedComplexity;
      
      let priceMatch = true;
      if (selectedPrice !== 'all') {
        if (selectedPrice === "Free Tier, $") priceMatch = item.price === "Free Tier, $" || item.price === "$";
        else if (selectedPrice === "$ to $$") priceMatch = ["Free Tier, $", "$", "$ to $$", "$$"].includes(item.price);
        else if (selectedPrice === "$$to$$$") priceMatch = ["$ to $$", "$$", "$$to$$$"].includes(item.price);
      }

      return functionMatch && complexityMatch && priceMatch;
    });
  };

  // Get unique functions for filter dropdown
  const getUniqueFunctions = (): string[] => {
    return [...new Set(scorecardData.map(item => item.function))].sort();
  };

  // Toggle card expansion
  const toggleCardExpansion = (taskName: string) => {
    const newExpandedCards = new Set(expandedCards);
    if (newExpandedCards.has(taskName)) {
      newExpandedCards.delete(taskName);
    } else {
      newExpandedCards.add(taskName);
    }
    setExpandedCards(newExpandedCards);
  };

  // Render chart
  const renderChart = (data: OpportunityData[]) => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chartData = {
      datasets: Object.entries(colorMap).map(([func, color]) => ({
        label: func,
        data: data
          .filter(item => item.function === func)
          .map(item => ({
            x: complexityMap[item.complexity],
            y: item.potential,
            r: priceMap[item.price] || 15,
            label: item.task
          })),
        backgroundColor: color,
        borderColor: color.replace('0.7', '1'),
        borderWidth: 1,
      })),
    };

    chartInstance.current = new Chart(ctx, {
      type: 'bubble',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom' as const,
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                return context.raw.label || '';
              }
            }
          },
          title: {
            display: false
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Automation Potential (Impact)',
              font: { weight: 'bold' }
            },
            min: 0,
            max: 5.5,
            ticks: { stepSize: 1 }
          },
          x: {
            title: {
              display: true,
              text: 'Implementation Complexity (Effort)',
              font: { weight: 'bold' }
            },
            min: 0,
            max: 6,
            ticks: {
              stepSize: 1,
              callback: function(value: any) {
                return Object.keys(complexityMap).find(key => complexityMap[key] === value) || '';
              }
            }
          }
        }
      }
    });
  };

  // Update filtered data and chart when filters change
  useEffect(() => {
    const filtered = filterData();
    setFilteredData(filtered);
    renderChart(filtered);
  }, [selectedFunction, selectedComplexity, selectedPrice]);

  return (
    <React.Fragment>
      <Header />
      <div className="text-slate-800 bg-slate-50">
        <style jsx>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f8fafc; /* slate-50 */
        }
        .chart-container {
          position: relative;
          width: 100%;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          height: 450px;
          max-height: 50vh;
        }
        .card-enter {
          animation: card-enter 0.5s ease-out forwards;
        }
        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .details-content {
          transition: max-height 0.5s ease-in-out, padding 0.5s ease-in-out;
          max-height: 0;
          overflow: hidden;
        }
        .details-content.open {
          max-height: 1000px; /* Large enough for content */
        }
      `}</style>

      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Interactive SMB AI Opportunity Scorecard</h1>
          <p className="mt-2 text-lg text-slate-600 max-w-3xl mx-auto">A strategic tool to identify and prioritize AI automation initiatives for your business. Use the filters to explore opportunities and discover your next strategic move.</p>
        </header>

        <main>
          {/* Filter Controls */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 sticky top-4 z-10 border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="filter-function" className="block text-sm font-medium text-slate-700 mb-1">Business Function</label>
                <select 
                  id="filter-function" 
                  className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  value={selectedFunction}
                  onChange={(e) => setSelectedFunction(e.target.value)}
                >
                  <option value="all">All Functions</option>
                  {getUniqueFunctions().map(func => (
                    <option key={func} value={func}>{func}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="filter-complexity" className="block text-sm font-medium text-slate-700 mb-1">Implementation Complexity</label>
                <select 
                  id="filter-complexity" 
                  className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  value={selectedComplexity}
                  onChange={(e) => setSelectedComplexity(e.target.value)}
                >
                  <option value="all">All Complexities</option>
                  <option value="Low">Low</option>
                  <option value="Low to Medium">Low to Medium</option>
                  <option value="Medium">Medium</option>
                  <option value="Medium to High">Medium to High</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label htmlFor="filter-price" className="block text-sm font-medium text-slate-700 mb-1">Pricing Model</label>
                <select 
                  id="filter-price" 
                  className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                >
                  <option value="all">All Pricing Models</option>
                  <option value="Free Tier, $">Free & Low Cost ($)</option>
                  <option value="$ to $$">Low to Moderate ($ to $$)</option>
                  <option value="$$to$$$">Moderate to High ($$ to $$$)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Chart Visualization */}
          <section id="summary-view" className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-4 text-slate-900">Strategic Priority Matrix</h2>
            <p className="text-center text-slate-600 mb-6 max-w-2xl mx-auto">Visualize opportunities based on their potential impact versus implementation effort. "Quick Wins" in the top-left offer the highest potential for the lowest effort.</p>
            <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200">
              <div className="chart-container">
                <canvas ref={chartRef} id="priorityMatrixChart"></canvas>
              </div>
            </div>
          </section>

          {/* Detailed Card View */}
          <section id="detailed-view">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-900">Opportunity Details</h2>
              <div className="text-slate-600 font-medium">Showing {filteredData.length} opportunities</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.length === 0 ? (
                <p className="col-span-full text-center text-slate-500 py-10">No opportunities match the selected criteria.</p>
              ) : (
                filteredData.map((item, index) => {
                  const isExpanded = expandedCards.has(item.task);
                  const complexityColor = item.complexity.includes('Low') ? 'bg-green-100 text-green-800' : 
                                        item.complexity.includes('Medium') ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-red-100 text-red-800';
                  const potentialColor = item.potential >= 4 ? 'text-teal-600' : 'text-amber-600';

                  return (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl shadow-md border border-slate-200 p-6 flex flex-col justify-between card-enter"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div>
                        <p className={`text-sm font-medium ${functionColorMap[item.function] || 'text-teal-600'}`}>
                          {item.function}
                        </p>
                        <h3 className="text-xl font-bold mt-1 text-slate-900">{item.task}</h3>
                        <p className="text-slate-600 mt-2 text-sm">{item.painPoint}</p>
                        <div className="flex items-center justify-between mt-4 text-sm">
                          <span className="font-semibold">
                            Potential: <span className={`font-bold text-lg ${potentialColor}`}>{item.potential}/5</span>
                          </span>
                          <span className={`px-2 py-1 rounded-full font-medium ${complexityColor}`}>
                            {item.complexity}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <a href="/ai-strategy-session" 
                          className="toggle-details w-full text-center font-semibold text-teal-600 hover:text-teal-800 transition-colors"
                        >
                          {isExpanded ? 'Hide Details ▲' : 'Show Details ▼'}
                        </a>
                        <div className={`details-content mt-4 border-t pt-4 text-sm ${isExpanded ? 'open' : ''}`}>
                          <h4 className="font-bold mb-2">Potential AI Solution:</h4>
                          <p className="text-slate-600 mb-4">{item.solution}</p>
                          <h4 className="font-bold mb-2">Potential ROI Metrics:</h4>
                          <div className="text-slate-600 mb-4" dangerouslySetInnerHTML={{ __html: item.roiMetrics }}></div>
                          <h4 className="font-bold mb-2">Key Data Quality Metrics:</h4>
                          <div className="text-slate-600" dangerouslySetInnerHTML={{ __html: item.dataQuality }}></div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="mt-16 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 text-center shadow-lg">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Ready to Transform Your Business with AI?
              </h3>
              <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
                You've identified your opportunities. Now let's create a strategic roadmap to implement them. 
                Schedule a complimentary AI strategy session to develop a tailored implementation plan for your top priorities.
              </p>
              <a href="/ai-strategy-session" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Schedule My Free AI Strategy Session
              </a>
            </div>
          </section>
        </main>
      </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default InteractiveAIOpportunity;
