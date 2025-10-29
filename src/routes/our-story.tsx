import { createFileRoute } from '@tanstack/react-router'
import OurStory from '../pages/OurStory/OurStory'

export const Route = createFileRoute('/our-story')({
  component: OurStoryPage,
})

function OurStoryPage() {
  return <OurStory />
}

