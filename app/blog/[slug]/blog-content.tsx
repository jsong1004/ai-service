'use client'

import { useEffect } from 'react'

interface BlogContentProps {
  html: string
  styles: string
}

export default function BlogContent({ html, styles }: BlogContentProps) {
  useEffect(() => {
    // Add any client-side JavaScript that was in the original HTML files
    const handleScroll = () => {
      const progressBar = document.getElementById('progressBar')
      if (progressBar) {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = (scrollTop / docHeight) * 100
        progressBar.style.width = scrollPercent + '%'
      }
    }

    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('nav-item')) {
        e.preventDefault()
        const href = target.getAttribute('href')
        if (href?.startsWith('#')) {
          const element = document.querySelector(href)
          element?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    // AI Strategy Session Modal Functions
    const openStrategySessionModal = () => {
      const modal = document.getElementById('strategySessionModal')
      if (modal) {
        modal.style.display = 'flex'
        document.body.style.overflow = 'hidden'
      }
    }

    const closeStrategySessionModal = () => {
      const modal = document.getElementById('strategySessionModal')
      if (modal) {
        modal.style.display = 'none'
        document.body.style.overflow = 'auto'
      }
    }

    // Form submission handler
    const submitForm = async (event: Event) => {
      event.preventDefault()
      
      const form = event.target as HTMLFormElement
      const submitButton = document.getElementById('submitButton') as HTMLButtonElement
      const errorMessage = document.getElementById('errorMessage') as HTMLElement
      
      if (!submitButton || !errorMessage) return
      
      // Disable submit button and show loading state
      submitButton.disabled = true
      submitButton.textContent = 'Submitting...'
      errorMessage.style.display = 'none'
      
      try {
        const formData = new FormData(form)
        const data = {
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone') || '',
          company: formData.get('company'),
          industry: formData.get('industry'),
          teamSize: formData.get('teamSize'),
          topPriorities: formData.get('topPriorities'),
          message: formData.get('message') || '',
          preferredContact: 'email', // Default to email since we removed the field
          preferredDate: formData.get('preferredDate'),
          preferredTime: formData.get('preferredTime')
        }

        const response = await fetch('/api/ai-strategy-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })

        if (!response.ok) {
          throw new Error('Failed to submit form')
        }

        // Show success message
        const formContent = document.getElementById('formContent')
        if (formContent) {
          formContent.innerHTML = `
            <div class="success-message">
              <h3 class="success-title">AI Strategy Session Request Sent!</h3>
              <p class="success-text">Thank you for your request! We'll contact you within 24 hours to schedule your complimentary 30-minute AI strategy session. Check your email for confirmation details.</p>
              <button class="cta-button" onclick="closeStrategySessionModal()" style="margin-top: 20px;">Close</button>
            </div>
          `
        }

      } catch (error) {
        errorMessage.textContent = 'There was an error submitting your request. Please try again.'
        errorMessage.style.display = 'block'
        
        // Re-enable submit button
        submitButton.disabled = false
        submitButton.textContent = 'Schedule My Free AI Strategy Session'
      }
    }

    // Chart.js initialization for AI Readiness post
    const initializeCharts = () => {
      const chartElement = document.getElementById('smbChallengesChart')
      if (chartElement && window.Chart) {
        const ctx = chartElement.getContext('2d')
        new window.Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Finding New Customers', 'Measuring Performance', 'Lack of Resources', 'Retaining Customers', 'Creating Strategy'],
            datasets: [{
              label: 'Top Marketing Challenges for SMBs (%)',
              data: [60, 33, 32, 31, 25],
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Top Marketing Challenges Faced by SMBs (2024)',
                font: { size: 18 }
              },
              subtitle: {
                display: true,
                text: 'Source: Constant Contact report, via Forbes',
                font: { style: 'italic' }
              },
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Percentage of SMBs'
                }
              }
            }
          }
        })
      }
    }

    // Set minimum date to today for date inputs
    const setMinimumDate = () => {
      const today = new Date().toISOString().split('T')[0]
      const dateInput = document.getElementById('preferredDate') as HTMLInputElement
      if (dateInput) {
        dateInput.setAttribute('min', today)
      }
    }

    // Attach event handlers to global window object so inline handlers can access them
    ;(window as any).openStrategySessionModal = openStrategySessionModal
    ;(window as any).closeStrategySessionModal = closeStrategySessionModal
    ;(window as any).submitForm = submitForm

    // Set up event listeners
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleSmoothScroll)

    // Modal overlay click handler
    const modal = document.getElementById('strategySessionModal')
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeStrategySessionModal()
        }
      })
    }

    // Form submission handler
    const form = document.getElementById('strategySessionForm')
    if (form) {
      form.addEventListener('submit', submitForm)
    }

    // Initialize components
    handleScroll()
    setMinimumDate()
    
    // Initialize charts after a small delay to ensure Chart.js is loaded
    setTimeout(initializeCharts, 100)

    // Initialize tab interactions for posts that use .tab-btn/.tab-content
    const tabs = Array.from(document.querySelectorAll<HTMLElement>('.tab-btn'))
    const contents = Array.from(document.querySelectorAll<HTMLElement>('.tab-content'))

    const handleTabClick = (tab: HTMLElement) => () => {
      const targetId = tab.dataset.tab
      tabs.forEach((t) => t.classList.remove('active-tab'))
      tab.classList.add('active-tab')
      contents.forEach((content) => {
        content.classList.remove('active-content')
        if (content.id === targetId) {
          content.classList.add('active-content')
        }
      })
    }

    tabs.forEach((tab) => tab.addEventListener('click', handleTabClick(tab)))

    // Ensure last process card text is visible and correct
    const purpleCards = Array.from(
      document.querySelectorAll<HTMLElement>('.process-step.bg-purple-600')
    )
    purpleCards.forEach((card) => {
      card.classList.add('text-white')
      const heading = card.querySelector('h4') as HTMLElement | null
      if (heading && (!heading.textContent || heading.textContent.trim() === '')) {
        heading.textContent = 'Human Feedback'
      }
    })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleSmoothScroll)
      
      // Remove global functions
      delete (window as any).openStrategySessionModal
      delete (window as any).closeStrategySessionModal
      delete (window as any).submitForm

      // Remove tab listeners
      tabs.forEach((tab) => tab.removeEventListener('click', handleTabClick(tab)))
    }
  }, [html])

  return (
	<>
	  <style dangerouslySetInnerHTML={{ __html: styles }} />
	  <div dangerouslySetInnerHTML={{ __html: html }} />
	</>
  )
}