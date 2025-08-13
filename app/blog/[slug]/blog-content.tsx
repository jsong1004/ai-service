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

    // Add event listeners
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleSmoothScroll)

    // Initialize progress bar
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleSmoothScroll)
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}