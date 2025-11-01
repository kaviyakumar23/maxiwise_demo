import { createFileRoute } from '@tanstack/react-router'
import { BlogListingPage } from '../pages/Blogs/BlogListingPage'

export const Route = createFileRoute('/blogs/')({
  component: BlogsIndexPage,
})

function BlogsIndexPage() {
  return <BlogListingPage />
}

