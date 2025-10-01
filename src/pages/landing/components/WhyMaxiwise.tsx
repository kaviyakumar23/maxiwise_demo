import { useState, useRef, useEffect } from "react";
import Section_3 from "./Section_3";
import Section_3_1 from "./Section_3_1";
import Section_3_2 from "./Section_3_2";
import Section_3_3 from "./Section_3_3";

const WhyMaxiwise = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isInCurtainMode, setIsInCurtainMode] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Array of your 4 components
    const sections = [Section_3, Section_3_1, Section_3_2, Section_3_3];
    const totalSections = sections.length;

    // Handle scroll to detect when we enter/exit curtain mode
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            
            const rect = containerRef.current.getBoundingClientRect();
            const containerTop = rect.top;
            const windowHeight = window.innerHeight;
            
            // Enter curtain mode when component reaches top of viewport
            if (containerTop <= 0 && containerTop > -windowHeight && !isInCurtainMode) {
                setIsInCurtainMode(true);
                setScrollProgress(0);
            }
            // Exit curtain mode when scrolling up past component
            else if (containerTop > 0 && isInCurtainMode) {
                setIsInCurtainMode(false);
                setScrollProgress(0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial calculation
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isInCurtainMode]);

    // Handle wheel events for curtain navigation (hijack scroll when in curtain mode)
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (!isInCurtainMode) return;
            
            e.preventDefault(); // Prevent normal page scroll
            
            const delta = e.deltaY * 0.005; // Much more sensitive - normal scrolling feel
            const newProgress = Math.max(0, Math.min(totalSections - 1, scrollProgress + delta));
            
            // If trying to scroll up from first section, exit curtain mode and go to previous section
            if (scrollProgress <= 0 && delta < 0) {
                setIsInCurtainMode(false);
                setScrollProgress(0);
                // Scroll to the previous section (Section_2)
                const section2 = document.getElementById('section-2');
                if (section2) {
                    section2.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            }
            
            // If trying to scroll down from last section, exit curtain mode and continue to next section
            if (scrollProgress >= totalSections - 1 && delta > 0) {
                setIsInCurtainMode(false);
                setScrollProgress(0);
                // Scroll to the next section (About component)
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            }
            
            setScrollProgress(newProgress);
        };

        if (isInCurtainMode) {
            window.addEventListener('wheel', handleWheel, { passive: false });
            return () => window.removeEventListener('wheel', handleWheel);
        }
    }, [isInCurtainMode, scrollProgress, totalSections]);

    return (
        <div 
            ref={containerRef}
            className="relative overflow-hidden h-screen"
        >
            {sections.map((SectionComponent, index) => {
                // Calculate curtain effect for each section
                const sectionProgress = Math.max(0, Math.min(1, scrollProgress - index));
                
                return (
                    <div 
                        key={index} 
                        className="absolute top-0 left-0 w-full h-screen"
                        style={{
                            zIndex: totalSections - index,
                            transform: `translateY(${sectionProgress * -100}%)`,
                            borderRadius: sectionProgress > 0 ? '0 0 50px 50px' : '0'
                        }}
                    >
                        <SectionComponent />
                    </div>
                );
            })}
        </div>
    );
};

export default WhyMaxiwise;