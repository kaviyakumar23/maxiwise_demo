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
        let isScrolling = false;
        
        const handleScroll = () => {
            if (!containerRef.current || isScrolling) return;
            
            const rect = containerRef.current.getBoundingClientRect();
            const containerTop = rect.top;
            const containerBottom = rect.bottom;
            const windowHeight = window.innerHeight;
            
            console.log(`Scroll detection - Top: ${containerTop.toFixed(1)}, Bottom: ${containerBottom.toFixed(1)}, WindowHeight: ${windowHeight}, InCurtainMode: ${isInCurtainMode}, Progress: ${scrollProgress.toFixed(2)}`);
            
            // CRITICAL: Block all scrolling past WhyMaxiwise if sections not completed
            if (containerTop < -100 && scrollProgress < totalSections - 1 && !isInCurtainMode) {
                console.log('BLOCKING: Cannot scroll past WhyMaxiwise - complete all sections first');
                setIsInCurtainMode(true);
                document.body.style.overflow = 'hidden';
                return;
            }
            
            // Enter curtain mode when component reaches viewport
            if (containerTop <= 200 && containerBottom > windowHeight * 0.3 && !isInCurtainMode) {
                console.log('Entering curtain mode');
                setIsInCurtainMode(true);
                document.body.style.overflow = 'hidden';
            }
            // Exit curtain mode when scrolling up past component (go to previous section)
            else if (containerTop > 200 && isInCurtainMode) {
                console.log('Exiting curtain mode - going up');
                setIsInCurtainMode(false);
                document.body.style.overflow = 'auto';
            }
            // Exit curtain mode when scrolling down past component - only if all sections completed
            else if (containerBottom < windowHeight * 0.2 && isInCurtainMode && scrollProgress >= totalSections - 1) {
                console.log('Exiting curtain mode - going down (all sections completed)');
                setIsInCurtainMode(false);
                document.body.style.overflow = 'auto';
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial calculation
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto'; // Cleanup
        };
    }, [isInCurtainMode, scrollProgress, totalSections]);

    // Handle wheel events for smooth curtain navigation
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (!isInCurtainMode) return;
            
            const delta = e.deltaY * 0.001; // Much slower scrolling sensitivity
            const newProgress = Math.max(0, Math.min(totalSections - 1, scrollProgress + delta));
            
            console.log(`Scroll Progress: ${scrollProgress.toFixed(3)} -> ${newProgress.toFixed(3)}, Delta: ${delta.toFixed(3)}`);
            
            // If trying to scroll up from first section, exit curtain mode and go to previous section
            if (scrollProgress <= 0 && delta < 0) {
                console.log('Exiting to Section_2');
                setIsInCurtainMode(false);
                document.body.style.overflow = 'auto';
                // Don't prevent this scroll - let it continue naturally
                return;
            }
            
            // If trying to scroll down from last section, exit curtain mode and continue to next section
            if (scrollProgress >= totalSections - 1 && delta > 0) {
                console.log('Exiting to About section - all sections completed');
                setIsInCurtainMode(false);
                document.body.style.overflow = 'auto';
                // Don't prevent this scroll - let it continue naturally to About section
                return;
            }
            
            // Only prevent default scroll if we're staying in curtain mode
            e.preventDefault();
            setScrollProgress(newProgress);
        };

        if (isInCurtainMode) {
            window.addEventListener('wheel', handleWheel, { passive: false });
            return () => window.removeEventListener('wheel', handleWheel);
        }
    }, [isInCurtainMode, scrollProgress, totalSections]);

    // Global wheel listener to block fast scrolling past WhyMaxiwise
    useEffect(() => {
        const handleGlobalWheel = (e: WheelEvent) => {
            if (!containerRef.current || isInCurtainMode) return;
            
            const rect = containerRef.current.getBoundingClientRect();
            const containerTop = rect.top;
            
            // If trying to scroll down past WhyMaxiwise without completing sections
            if (containerTop <= 0 && containerTop >= -100 && scrollProgress < totalSections - 1 && e.deltaY > 0) {
                console.log('GLOBAL BLOCK: Preventing fast scroll past WhyMaxiwise');
                e.preventDefault();
                
                // Force into curtain mode
                setIsInCurtainMode(true);
                document.body.style.overflow = 'hidden';
            }
        };

        window.addEventListener('wheel', handleGlobalWheel, { passive: false });
        
        return () => {
            window.removeEventListener('wheel', handleGlobalWheel);
        };
    }, [isInCurtainMode, scrollProgress, totalSections]);

    // Handle keyboard navigation (optional enhancement)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isInCurtainMode) return;
            
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                const newProgress = Math.min(totalSections - 1, scrollProgress + 1);
                setScrollProgress(newProgress);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                const newProgress = Math.max(0, scrollProgress - 1);
                setScrollProgress(newProgress);
            }
        };

        if (isInCurtainMode) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isInCurtainMode, scrollProgress, totalSections]);

    return (
        <div 
            ref={containerRef}
            id="about"
            className="relative overflow-hidden h-screen"
        >
            {sections.map((SectionComponent, index) => {
                // Calculate curtain effect for each section
                const sectionProgress = Math.max(0, Math.min(1, scrollProgress - index));
                const translateY = sectionProgress * -100;
                
                // Debug logging for section transforms
                if (isInCurtainMode) {
                    console.log(`Section ${index}: progress=${sectionProgress.toFixed(3)}, translateY=${translateY.toFixed(1)}%`);
                }
                
                return (
                    <div 
                        key={index} 
                        className="absolute top-0 left-0 w-full h-screen"
                        style={{
                            zIndex: totalSections - index,
                            transform: `translateY(${translateY}%)`,
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