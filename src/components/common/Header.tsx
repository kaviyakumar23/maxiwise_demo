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
    <div className={`fixed top-0 left-0 w-full z-50 grid grid-cols-3 items-center px-8 py-4 transition-all duration-300 ${styles.background}`}>
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
  )
}

export default Header