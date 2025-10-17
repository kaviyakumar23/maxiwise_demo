import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { LoginModalProvider } from '../pages/getStarted/LoginModal'

export const Route = createFileRoute('/blogs')({
  component: BlogsLayout,
})

function BlogsLayout() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <LoginModalProvider>
      <Outlet />
    </LoginModalProvider>
  )
}

