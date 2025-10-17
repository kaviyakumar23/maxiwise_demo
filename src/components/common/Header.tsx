import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "@tanstack/react-router"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
import Search from "./Search"
import SearchModal from "./SearchModal"
import GetStarted from "./GetStarted"
import { useLoginModal } from "../../pages/getStarted/LoginModal"
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
  const { openModal } = useLoginModal()
  const navigate = useNavigate()
  const location = useLocation()

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

  const navigateToSection = (sectionId: string) => {
    // Close mobile menu
    setIsMobileMenuOpen(false)
    
    // If we're already on the landing page, just scroll
    if (location.pathname === '/') {
      scrollToSection(sectionId)
    } else {
      // Navigate to landing page with hash
      navigate({ to: '/', hash: sectionId })
    }
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

  // Keyboard shortcut to open search (Cmd+K on Mac, Ctrl+K on Windows)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsSearchModalOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    // Skip intersection observer if a fixed style is provided
    if (fixedStyle) return

    const getStyleForSection = (sectionId: string): HeaderStyle => {
      switch (sectionId) {
        case 'hero':
          return 'hero'
        case 'funds':
        case 'engine':
        case 'section-2':
        case 'articles':
        case 'footer':
        case 'start-now':
          return 'light'
        case 'why-maxiwise-1': // Navy background
        case 'why-maxiwise-4': // Navy background
          return 'hero'
        case 'why-maxiwise-2': // Lime background
        case 'why-maxiwise-3': // Purple background
          return 'light'
        default:
          return 'hero'
      }
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let maxRatio = 0
      let topSectionId = ''
      
      entries.forEach((entry) => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio
          topSectionId = entry.target.id
        }
      })
      
      // Only change if section occupies more than 50% of viewport to reduce flickering
      if (topSectionId && maxRatio > 0.5) {
        setHeaderStyle(getStyleForSection(topSectionId))
      }
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.25, 0.5, 0.75, 1] // Reduced threshold points to minimize callbacks
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
          <div onClick={() => navigateToSection('funds')} className="hover:opacity-80 transition-opacity">Funds</div>
          <div onClick={() => navigateToSection('engine')} className="hover:opacity-80 transition-opacity">Engine</div>
          <Link to="/blogs" className="hover:opacity-80 transition-opacity">Blog</Link>
          <div onClick={() => navigateToSection('footer')} className="hover:opacity-80 transition-opacity">Contact</div>
        </div>
        <div className="flex justify-center">
          <Link to="/">
            <img src={styles.logo} alt="Logo" className="h-6 transition-opacity duration-300 cursor-pointer" />
          </Link>
        </div>
        <div className="flex flex-row gap-8 justify-end items-center">
          <div><Search /></div>
          <SignedOut>
            <div><GetStarted /></div>
          </SignedOut>
          <SignedIn>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </SignedIn>
        </div>
      </div>

      {/* Mobile/Tablet/Small Laptop Layout */}
      <div className="flex xl:hidden items-center justify-start px-4 py-3 relative mobile-menu-container">
        {/* Hamburger Menu - Left */}
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            className={`p-2 transition-colors duration-300 ${styles.textColor}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>

        {/* Centered Logo - Absolutely positioned to center of screen */}
        <div className="absolute left-1/2 transform -translate-x-1/2 justify-center">
          <Link to="/">
            <img src={styles.logo} alt="Logo" className="h-6 transition-opacity duration-300 cursor-pointer" />
          </Link>
        </div>

        {/* Right Side - Search Icon and Profile Icon */}
        <div className="flex items-center ml-auto justify-end gap-2">
          {/* Search Icon Only */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className={`transition-colors duration-300 ${styles.textColor}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Profile/Account Icon */}
          <SignedOut>
            <button 
              onClick={openModal}
              className={`p-2 transition-colors duration-300 ${styles.textColor}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </SignedOut>
          <SignedIn>
            <div className="p-2">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </div>
          </SignedIn>
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
              onClick={() => navigateToSection('funds')}
              className="px-6 py-3 text-left text-navy hover:bg-gray-50 transition-colors duration-200"
            >
              Funds
            </button>
            <button
              onClick={() => navigateToSection('engine')}
              className="px-6 py-3 text-left text-navy hover:bg-gray-50 transition-colors duration-200"
            >
              Engine
            </button>
            <Link
              to="/blogs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 text-left text-navy hover:bg-gray-50 transition-colors duration-200"
            >
              Blog
            </Link>
            <button
              onClick={() => navigateToSection('footer')}
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