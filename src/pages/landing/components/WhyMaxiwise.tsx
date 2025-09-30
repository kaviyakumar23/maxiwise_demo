import { useState, useRef, useEffect } from "react";
import Section_3 from "./Section_3";
import Section_3_1 from "./Section_3_1";
import Section_3_2 from "./Section_3_2";
import Section_3_3 from "./Section_3_3";


const WhyMaxiwise = () => {
    const [currentSection, setCurrentSection] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const containerRef = useRef(null);
    const touchStartY = useRef(0);
    const lastScrollTime = useRef(0);
    
    // Array of your 4 components
    const sections = [Section_3, Section_3_1, Section_3_2, Section_3_3];
    const totalSections = sections.length;
  
    const handleScroll = (direction: string) => {
      const now = Date.now();
      
      // Throttle scroll events to prevent rapid firing
      if (now - lastScrollTime.current < 800 || isTransitioning) return;
      
      lastScrollTime.current = now;
      setIsTransitioning(true);
  
      let newSection = currentSection;
      
      if (direction === 'down' && currentSection < totalSections - 1) {
        newSection = currentSection + 1;
      } else if (direction === 'up' && currentSection > 0) {
        newSection = currentSection - 1;
      }
  
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
      }
  
      // Reset transition flag after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    };
  
    // Wheel event handler
    useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 'down' : 'up';
        handleScroll(direction);
      };
  
      const container = containerRef.current as HTMLElement | null;
      if (container) {
        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
      }
    }, [currentSection, isTransitioning]);
  
    // Touch event handlers for mobile
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      
      if (Math.abs(deltaY) > 50) { // Minimum swipe distance
        const direction = deltaY > 0 ? 'down' : 'up';
        handleScroll(direction);
      }
    };
  
    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          e.preventDefault();
          handleScroll('down');
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          handleScroll('up');
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSection, isTransitioning]);
  
    return (
      <div 
        ref={containerRef}
        className="relative h-screen overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sections Container */}
        <div 
          className="flex flex-col transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateY(-${currentSection * 100}vh)`,
            height: `${totalSections * 100}vh`
          }}
        >
          {sections.map((SectionComponent, index) => (
            <div key={index} className="h-screen flex-shrink-0">
              <SectionComponent />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default WhyMaxiwise;