import { createFileRoute } from '@tanstack/react-router'
import About from '../pages/landing/components/About'
import Header from '../components/common/Header'
import Footer from '../pages/landing/components/Footer'
import { LoginModalProvider } from '../pages/getStarted/LoginModal'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <LoginModalProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <About />
        <Footer />
      </div>
    </LoginModalProvider>
  )
}
