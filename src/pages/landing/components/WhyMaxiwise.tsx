import { useState, useRef, useEffect } from "react";
import WhyMaxiwiseCard from "./WhyMaxiwiseCard";

// Import images
import A_Element from "../../../assets/images/3D_A.png"
import Blocks from "../../../assets/images/Blocks.png"
import Puzzle from "../../../assets/images/Puzzle.png"
import Upscale from "../../../assets/images/Upscale.png"
import Trust from "../../../assets/images/Trust.png"

const WhyMaxiwise = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isInCurtainMode, setIsInCurtainMode] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Use refs to access latest values without causing re-renders
    const scrollProgressRef = useRef(0);
    const isInCurtainModeRef = useRef(false);
    
    // Keep refs in sync with state
    useEffect(() => {
        scrollProgressRef.current = scrollProgress;
    }, [scrollProgress]);
    
    useEffect(() => {
        isInCurtainModeRef.current = isInCurtainMode;
    }, [isInCurtainMode]);
    
    // Configuration for all 4 sections
    const sectionsData = [
        {
            // Section 1: Built for Everyone (Navy - Absolute layout)
            title: ["Built for", "Everyone"],
            description: [
                "Whether you're a first-time investor or an evolved one, Maxiwise makes complex decisions simple."
            ],
            backgroundColor: "bg-navy",
            titleColor: "text-purple",
            descriptionColor: "text-white",
            layoutType: "absolute" as const,
            images: [
                {
                    src: Blocks,
                    alt: "3D Blocks",
                    position: "absolute" as const,
                    containerClassName: "absolute bottom-0 right-0 z-5 w-[450px] sm:w-[550px] md:w-[650px] lg:w-3/4",
                    className: "w-full h-full object-contain opacity-90"
                },
                {
                    src: A_Element,
                    alt: "3D A Element",
                    position: "absolute" as const,
                    containerClassName: "absolute bottom-[25%] left-[5%] sm:left-[10%] lg:top-[10%] lg:left-[35%] z-15",
                    className: "w-auto h-[150px] sm:h-[200px] lg:h-[450px] object-contain"
                }
            ]
        },
        {
            // Section 2: Clarity over Chaos (Lime - Flex layout)
            title: ["Clarity over", "Chaos"],
            description: [
                "We decode 1.2 lakh+ data points and 20+ financial metrics into insights that actually matter."
            ],
            backgroundColor: "bg-lime",
            titleColor: "text-navy",
            descriptionColor: "text-navy",
            buttonColor: "indigo" as const,
            buttonClassName: "font-medium rounded-full",
            layoutType: "flex" as const,
            images: [
                {
                    src: Puzzle,
                    alt: "Puzzle pieces fitting together representing clarity over chaos",
                    position: "flex" as const,
                    className: "max-w-full h-auto w-[450px] sm:w-[500px] md:w-[600px] lg:w-full"
                }
            ]
        },
        {
            // Section 3: Guided by Experts (Purple - Flex layout with absolute image)
            title: ["Guided by", "Experts"],
            description: [
                "Our proprietary CARRVA framework (<span class=\"font-bold\">Consistency, Alpha, Returns, Risk, Volatility, Analysis</span>) is battle-tested with India's top family offices."
            ],
            backgroundColor: "bg-purple",
            titleColor: "text-navy",
            descriptionColor: "text-navy",
            buttonColor: "indigo" as const,
            buttonClassName: "font-medium rounded-full text-purple",
            layoutType: "flex" as const,
            images: [
                {
                    src: Upscale,
                    alt: "Upscale",
                    position: "absolute" as const,
                    containerClassName: "absolute bottom-0 -right-10 w-[85%] sm:w-[75%] md:w-[70%] lg:w-[55%] xl:w-[50%]",
                    className: "w-full h-auto"
                }
            ]
        },
        {
            // Section 4: Decisions You Can Trust (Navy - Flex layout - Centered variant)
            title: ["Decisions You", "Can Trust"],
            description: [
                "No noise, no hype—just transparency, integrity, and insights you can act on."
            ],
            backgroundColor: "bg-navy",
            titleColor: "text-purple",
            descriptionColor: "text-white",
            buttonClassName: "text-black rounded-full",
            layoutType: "flex" as const,
            containerVariant: "centered" as const,
            textContainerClass: "flex-1 max-w-2xl lg:mt-32",
            imageContainerClass: "flex-1 lg:-mt-16",
            images: [
                {
                    src: Trust,
                    alt: "Trust",
                    position: "flex" as const,
                    className: "w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] xl:w-[652.55px] xl:h-[652.55px] object-contain"
                }
            ]
        }
    ];
    
    const totalSections = sectionsData.length;

    // Handle scroll to detect when we enter/exit curtain mode
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            
            const rect = containerRef.current.getBoundingClientRect();
            const containerTop = rect.top;
            const containerBottom = rect.bottom;
            const windowHeight = window.innerHeight;
            
            const currentInCurtainMode = isInCurtainModeRef.current;
            const currentScrollProgress = scrollProgressRef.current;
            
            console.log(`Scroll detection - Top: ${containerTop.toFixed(1)}, Bottom: ${containerBottom.toFixed(1)}, WindowHeight: ${windowHeight}, InCurtainMode: ${currentInCurtainMode}, Progress: ${currentScrollProgress.toFixed(2)}`);
            
            // CRITICAL: Block all scrolling past WhyMaxiwise if sections not completed
            if (containerTop < -100 && currentScrollProgress < totalSections - 1 && !currentInCurtainMode) {
                console.log('BLOCKING: Cannot scroll past WhyMaxiwise - complete all sections first');
                setIsInCurtainMode(true);
                document.body.style.overflow = 'hidden';
                return;
            }
            
            // Enter curtain mode when component reaches viewport
            if (containerTop <= 200 && containerBottom > windowHeight * 0.3 && !currentInCurtainMode) {
                console.log('Entering curtain mode');
                setIsInCurtainMode(true);
                document.body.style.overflow = 'hidden';
            }
            // Exit curtain mode when scrolling up past component (go to previous section)
            else if (containerTop > 200 && currentInCurtainMode) {
                console.log('Exiting curtain mode - going up');
                setIsInCurtainMode(false);
                document.body.style.overflow = 'auto';
            }
            // Exit curtain mode when scrolling down past component - only if all sections completed
            else if (containerBottom < windowHeight * 0.2 && currentInCurtainMode && currentScrollProgress >= totalSections - 1) {
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
    }, [totalSections]);

    // Handle wheel events for smooth curtain navigation
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const currentInCurtainMode = isInCurtainModeRef.current;
            const currentScrollProgress = scrollProgressRef.current;
            
            if (!currentInCurtainMode) return;
            
            const delta = e.deltaY * 0.001; // Much slower scrolling sensitivity
            const newProgress = Math.max(0, Math.min(totalSections - 1, currentScrollProgress + delta));
            
            console.log(`Scroll Progress: ${currentScrollProgress.toFixed(3)} -> ${newProgress.toFixed(3)}, Delta: ${delta.toFixed(3)}`);
            
            // If trying to scroll up from first section, exit curtain mode and go to previous section
            if (currentScrollProgress <= 0 && delta < 0) {
                console.log('Exiting to Section_2');
                setIsInCurtainMode(false);
                document.body.style.overflow = 'auto';
                // Don't prevent this scroll - let it continue naturally
                return;
            }
            
            // If trying to scroll down from last section, exit curtain mode and continue to next section
            if (currentScrollProgress >= totalSections - 1 && delta > 0) {
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

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [totalSections]);

    // Global wheel listener to block fast scrolling past WhyMaxiwise
    useEffect(() => {
        const handleGlobalWheel = (e: WheelEvent) => {
            const currentInCurtainMode = isInCurtainModeRef.current;
            const currentScrollProgress = scrollProgressRef.current;
            
            if (!containerRef.current || currentInCurtainMode) return;
            
            const rect = containerRef.current.getBoundingClientRect();
            const containerTop = rect.top;
            
            // If trying to scroll down past WhyMaxiwise without completing sections
            if (containerTop <= 0 && containerTop >= -100 && currentScrollProgress < totalSections - 1 && e.deltaY > 0) {
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
    }, [totalSections]);

    // Handle keyboard navigation (optional enhancement)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const currentInCurtainMode = isInCurtainModeRef.current;
            const currentScrollProgress = scrollProgressRef.current;
            
            if (!currentInCurtainMode) return;
            
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                const newProgress = Math.min(totalSections - 1, currentScrollProgress + 1);
                setScrollProgress(newProgress);
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                const newProgress = Math.max(0, currentScrollProgress - 1);
                setScrollProgress(newProgress);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [totalSections]);

    return (
        <div 
            ref={containerRef}
            id="about"
            className="relative overflow-hidden h-screen"
        >
            {sectionsData.map((sectionData, index) => {
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
                        <WhyMaxiwiseCard
                            title={sectionData.title}
                            description={sectionData.description}
                            backgroundColor={sectionData.backgroundColor}
                            titleColor={sectionData.titleColor}
                            descriptionColor={sectionData.descriptionColor}
                            buttonColor={sectionData.buttonColor}
                            buttonClassName={sectionData.buttonClassName}
                            images={sectionData.images}
                            layoutType={sectionData.layoutType}
                            containerVariant={sectionData.containerVariant}
                            textContainerClass={sectionData.textContainerClass}
                            imageContainerClass={sectionData.imageContainerClass}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default WhyMaxiwise;