import { Outlet, createRootRoute } from '@tanstack/react-router'
import { LoginModalProvider } from '../pages/getStarted/LoginModal'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <LoginModalProvider>
      <Outlet />
    </LoginModalProvider>
  )
}
