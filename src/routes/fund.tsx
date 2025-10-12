import { createFileRoute } from '@tanstack/react-router'
import FundMain from '../pages/Fund/FundMain'
import { LoginModalProvider } from '../pages/getStarted/LoginModal'

export const Route = createFileRoute('/fund')({
  component: FundPage,
})

function FundPage() {
  return (
    <LoginModalProvider>
      <FundMain />
    </LoginModalProvider>
  )
}

