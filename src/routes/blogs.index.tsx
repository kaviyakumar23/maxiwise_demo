import { createFileRoute } from '@tanstack/react-router'
import { BlogMain } from '../pages/Blogs/BlogMain'

export const Route = createFileRoute('/blogs/')({
  component: BlogsIndexPage,
})

function BlogsIndexPage() {
  return <BlogMain />
}

