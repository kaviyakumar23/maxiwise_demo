import { useState, useEffect } from "react"
import { Link } from "@tanstack/react-router"
import Search from "./Search"
import SearchModal from "./SearchModal"
import GetStarted from "./GetStarted"
import Logo from "../../assets/images/Logo.png"
import LogoBlack from "../../assets/images/LogoBlack.png"
import LogoWhite from "../../assets/images/LogoWhite.png"

type HeaderStyle = 'hero' | 'light' | 'dark'

interface HeaderProps {
  fixedStyle?: HeaderStyle
}

const Header = ({ fixedStyle }: HeaderProps = {}) => {
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>(fixedStyle || 'hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    // Skip intersection observer if a fixed style is provided
    if (fixedStyle) return

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
  }, [fixedStyle])

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
          logo: Logo
        }
      case 'hero':
      default:
        return {
          background: 'bg-transparent',
          textColor: 'text-white',
          logo: LogoWhite
        }
    }
  }

  const styles = getHeaderStyles()

  return (
    <div className={`fixed top-0 left-0 w-screen z-50 transition-all duration-300 ${styles.background}`}>
      {/* Desktop Layout */}
      <div className="hidden xl:grid grid-cols-3 items-center px-8 py-4">
        <div className={`p-2 flex flex-row gap-12 cursor-pointer transition-colors duration-300 ${styles.textColor}`}>
          <div onClick={() => scrollToSection('about')} className="hover:opacity-80 transition-opacity">About</div>
          <div onClick={() => scrollToSection('features')}>Features</div>
          <Link to="/blogs" className="hover:opacity-80 transition-opacity">Blog</Link>
          <div onClick={() => scrollToSection('contact')}>Contact</div>
        </div>
        <div className="flex justify-center">
          <div>
            <img src={styles.logo} alt="Logo" className="h-6 transition-opacity duration-300" />
          </div>
        </div>
        <div className="flex flex-row gap-8 justify-end items-center">
          <div><Search /></div>
          <div><GetStarted /></div>
        </div>
      </div>

      {/* Mobile/Tablet/Small Laptop Layout */}
      <div className="flex xl:hidden items-center justify-start px-4 py-3 relative mobile-menu-container">
        {/* Hamburger Menu - Left */}
        <div className="flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 transition-colors duration-300 text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>

        {/* Centered Logo - Absolutely positioned to center of screen */}
        <div className="absolute left-1/2 transform -translate-x-1/2 justify-center">
          <img src={LogoWhite} alt="Logo" className="h-5 transition-opacity duration-300" />
        </div>

        {/* Right Side - Search Icon and Profile Icon */}
        <div className="flex items-center ml-auto justify-end gap-2">
          {/* Search Icon Only */}
          <button 
            onClick={() => setIsSearchModalOpen(true)}
            className="transition-colors duration-300 text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Profile/Account Icon */}
          <button className="p-2 transition-colors duration-300 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Modal for Mobile */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40 mobile-menu-container">
          <div className="flex flex-col py-4">
            <button 
              onClick={() => scrollToSection('about')} 
              className="px-6 py-3 text-left text-navy hover:bg-gray-50 transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="px-6 py-3 text-left text-navy hover:bg-gray-50 transition-colors duration-200"
            >
              Features
            </button>
            <Link 
              to="/blogs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 text-left text-navy hover:bg-gray-50 transition-colors duration-200"
            >
              Blog
            </Link>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="px-6 py-3 text-left text-navy hover:bg-gray-50 transition-colors duration-200"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header