import { createFileRoute } from '@tanstack/react-router'
import { ContentMain } from '../pages/BlogContent/ContentMain'

export const Route = createFileRoute('/blogs/content')({
  component: BlogContentPage,
})

function BlogContentPage() {
  return <ContentMain />
}

