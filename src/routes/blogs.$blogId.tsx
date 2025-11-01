import { createFileRoute } from '@tanstack/react-router'
import { ArticlePage } from '../pages/BlogContent/ArticlePage'

export const Route = createFileRoute('/blogs/$blogId')({
  component: BlogArticlePage,
})

function BlogArticlePage() {
  const { blogId } = Route.useParams()
  return <ArticlePage blogId={blogId} />
}
