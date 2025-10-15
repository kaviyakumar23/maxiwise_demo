import { createFileRoute } from '@tanstack/react-router'
import FundMain from '../pages/Fund/FundMain'
import { LoginModalProvider } from '../pages/getStarted/LoginModal'

// Define search params type
type FundSearchParams = {
  fundId?: number
}

export const Route = createFileRoute('/fund')({
  component: FundPage,
  validateSearch: (search: Record<string, unknown>): FundSearchParams => {
    return {
      fundId: search.fundId as number | undefined,
    }
  },
})

function FundPage() {
  // const { fundId } = Route.useSearch()
  
  return (
    <LoginModalProvider>
      <FundMain />
    </LoginModalProvider>
  )
}

