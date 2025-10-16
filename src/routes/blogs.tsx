import { createFileRoute, Outlet } from '@tanstack/react-router'
import { LoginModalProvider } from '../pages/getStarted/LoginModal'

export const Route = createFileRoute('/blogs')({
  component: BlogsLayout,
})

function BlogsLayout() {
  return (
    <LoginModalProvider>
      <Outlet />
    </LoginModalProvider>
  )
}

