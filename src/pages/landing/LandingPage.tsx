import { useEffect } from "react"
import { useLocation } from "@tanstack/react-router"
import Header from "../../components/common/Header"
import Hero from "./components/Hero"
// import FundPerforming from "./components/FundPerforming"
import Section_2 from "./components/Section_2"
import WhyMaxiwise from "./components/WhyMaxiwise"
// import About from "./components/About"
// import Founders from "./components/Founders"
import Articles from "./components/Articles"
import Start_Now from "./components/Start_Now"
import Footer from "./components/Footer"
import { LoginModalProvider } from "../getStarted/LoginModal"
import Engine from "./components/Engine"


const LandingPageContent = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(location.hash)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0)
    }
  }, [location.hash])

  return (
    <>
      <Header />
      <div id="hero" data-header-section>
        <Hero />
      </div>
      <div id="section-2" data-header-section>
        <Section_2 />
      </div>
      <div id="why-maxiwise" data-header-section>
        <WhyMaxiwise />
      </div>
      {/* <div id="funds" data-header-section>
        <FundPerforming />
      </div> */}
      <div id="engine" data-header-section>
        <Engine />
      </div> 
      <div id="articles" data-header-section>
        <Articles />
      </div>
      <div id="start-now" data-header-section>
        <Start_Now />
      </div>
      <div id="footer" data-header-section>
        <Footer />
      </div>
    </>
  )
}

export const LandingPage = () => {
  return (
    <LoginModalProvider>
      <LandingPageContent />
    </LoginModalProvider>
  )
}