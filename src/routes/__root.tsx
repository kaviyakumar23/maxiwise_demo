import { Outlet, createRootRoute } from '@tanstack/react-router'
import { LoginModalProvider } from '../pages/getStarted/LoginModal'
import CookieConsent from '../components/common/CookieConsent'
import AnalyticsWrapper from '../components/AnalyticsWrapper'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <LoginModalProvider>
      <AnalyticsWrapper>
        <Outlet />
        <CookieConsent />
      </AnalyticsWrapper>
    </LoginModalProvider>
  )
}
