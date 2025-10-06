import Header from "../../components/common/Header"
import Hero from "./components/Hero"
import Section_2 from "./components/Section_2"
import WhyMaxiwise from "./components/WhyMaxiwise"
import About from "./components/About"
import Founders from "./components/Founders"
import Articles from "./components/Articles"
import Join_Now from "./components/Join_Now"
import Footer from "./components/Footer"
import { LoginModalProvider } from "../getStarted/LoginModal"

const LandingPageContent = () => {
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
      <div id="about" data-header-section>
        <About />
      </div>
      <div id="founders" data-header-section>
        <Founders />
      </div>
      <div id="articles" data-header-section>
        <Articles />
      </div>
      <div id="join-now" data-header-section>
        <Join_Now />
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