/**
 * CurtainScroller - Usage Examples
 * 
 * This file demonstrates how to use the CurtainScroller component
 * for creating smooth, scrubbed curtain reveal scroll experiences.
 */

import CurtainScroller from "./CurtainScroller";

// Example 1: Basic Usage with 4 hero sections
export function BasicExample() {
  return (
    <CurtainScroller
      sections={[
        <HeroOne key="hero-1" />,
        <HeroTwo key="hero-2" />,
        <HeroThree key="hero-3" />,
        <HeroFour key="hero-4" />,
      ]}
    >
      {/* Content below scrolls normally after the curtain sequence */}
      <section className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h2 className="text-4xl font-bold">Normal Scrolling Content</h2>
      </section>
    </CurtainScroller>
  );
}

// Example 2: With additional content below
export function AdvancedExample() {
  return (
    <CurtainScroller
      sections={[
        <HeroOne key="hero-1" />,
        <HeroTwo key="hero-2" />,
        <HeroThree key="hero-3" />,
        <HeroFour key="hero-4" />,
      ]}
    >
      <ContentSections />
    </CurtainScroller>
  );
}

// Example 3: Multiple curtain scrollers
export function MultipleExample() {
  return (
    <>
      <CurtainScroller
        sections={[
          <Hero1 key="1" />, 
          <Hero2 key="2" />, 
          <Hero3 key="3" />, 
          <Hero4 key="4" />
        ]}
      />
      <ContentSections />
    </>
  );
}

// Sample hero components for demonstration
function HeroOne() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Section One</h1>
        <p className="text-2xl">Scroll down to reveal the next section</p>
      </div>
    </div>
  );
}

function HeroTwo() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Section Two</h1>
        <p className="text-2xl">Keep scrolling for more</p>
      </div>
    </div>
  );
}

function HeroThree() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Section Three</h1>
        <p className="text-2xl">One more to go</p>
      </div>
    </div>
  );
}

function HeroFour() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Section Four</h1>
        <p className="text-2xl">The final reveal</p>
      </div>
    </div>
  );
}

function Hero1() {
  return <div className="w-full h-full bg-indigo-600" />;
}

function Hero2() {
  return <div className="w-full h-full bg-purple-600" />;
}

function Hero3() {
  return <div className="w-full h-full bg-pink-600" />;
}

function Hero4() {
  return <div className="w-full h-full bg-rose-600" />;
}

function ContentSections() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Additional Content</h2>
        <p className="text-lg text-gray-600 mb-4">
          This content scrolls normally after the curtain reveal sequence completes.
        </p>
        <p className="text-lg text-gray-600">
          You can add any components here - they will behave like regular scrolling content.
        </p>
      </div>
    </div>
  );
}

/**
 * Key Features:
 * 
 * 1. Smooth, scrubbed scrolling - no snapping
 * 2. Progressive reveal - each section acts as a curtain over the next
 * 3. Staggered animations - each section starts revealing after previous is 50% done
 * 4. Section 4 stays visible as final reveal
 * 5. Simple API - just pass 4 sections
 * 
 * Implementation (matches CodePen pattern):
 * - Single ScrollTrigger on container
 * - Container pins at "top top"
 * - First 3 panels animate with stagger: 0.5
 * - All panels absolutely positioned and overlapping
 * - Z-index determines stacking (earlier = higher)
 * - Wrapper provides 400vh scroll space
 * 
 * Performance:
 * - GSAP handles all transforms and easing
 * - Hardware-accelerated transforms (translate3d)
 * - Automatic cleanup prevents memory leaks
 * - Minimal React state updates
 */

