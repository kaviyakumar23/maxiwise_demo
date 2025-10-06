import { useState, useEffect } from "react"
import Search from "./Search"
import GetStarted from "./GetStarted"
import Logo from "../../assets/images/Logo.png"
import LogoBlack from "../../assets/images/Logo_black.png"
import LogoWhite from "../../assets/images/Logo-white.png"

type HeaderStyle = 'hero' | 'light' | 'dark'

const Header = () => {
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>('hero')

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in center of viewport
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          
          switch (sectionId) {
            case 'hero':
              setHeaderStyle('hero')
              break
            case 'section-2':
            case 'about':
            case 'founders':
            case 'articles':
            case 'footer':
              setHeaderStyle('light')
              break
            case 'why-maxiwise':
            case 'join-now':
              setHeaderStyle('dark')
              break
            default:
              setHeaderStyle('hero')
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll('[data-header-section]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  // Determine styles based on current header style
  const getHeaderStyles = () => {
    switch (headerStyle) {
      case 'light':
        return {
          background: 'bg-white shadow-sm',
          textColor: 'text-navy',
          logo: LogoBlack
        }
      case 'dark':
        return {
          background: 'bg-transparent',
          textColor: 'text-white',
          logo: LogoWhite
        }
      case 'hero':
      default:
        return {
          background: 'bg-transparent',
          textColor: 'text-white',
          logo: Logo
        }
    }
  }

  const styles = getHeaderStyles()

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${styles.background}`}>
      {/* Desktop Layout */}
      <div className="hidden xl:grid grid-cols-3 items-center px-8 py-4">
        <div className={`p-2 flex flex-row gap-12 cursor-pointer transition-colors duration-300 ${styles.textColor}`}>
          <div>About</div>
          <div>Features</div>
          <div>Blog</div>
          <div>Contact</div>
        </div>
        <div className="flex justify-center">
          <div>
            <img src={styles.logo} alt="Logo" className="h-10 transition-opacity duration-300" />
          </div>
        </div>
        <div className="flex flex-row gap-8 justify-end items-center">
          <div><Search /></div>
          <div><GetStarted /></div>
        </div>
      </div>

      {/* Mobile/Tablet/Small Laptop Layout */}
      <div className="flex xl:hidden items-center justify-start px-4 py-3 relative">
        {/* Hamburger Menu - Left */}
        <div className="flex items-center">
          <button className={`p-2 transition-colors duration-300 ${styles.textColor}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Centered Logo - Absolutely positioned to center of screen */}
        <div className="absolute left-1/2 transform -translate-x-1/2 justify-center">
          <img src={LogoWhite} alt="Logo" className="h-8 transition-opacity duration-300" />
        </div>

        {/* Right Side - Search Icon and Profile Icon */}
        <div className="flex items-center ml-auto justify-end">
          {/* Search Icon Only */}
          <button className={`transition-colors duration-300 ${styles.textColor}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Profile/Account Icon */}
          <button className={`p-2 transition-colors duration-300 ${styles.textColor}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header