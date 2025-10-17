import { useEffect, useRef } from "react";
import GetStarted from "../../../components/common/GetStarted"
import Image1 from "../../../assets/images/Image1.png"
import Image2 from "../../../assets/images/Image2.png"
import Image3 from "../../../assets/images/Image3.png"
import Image4 from "../../../assets/images/Image4.png"
import Image5 from "../../../assets/images/Image5.png"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section_2 = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const image1Ref = useRef<HTMLImageElement>(null);
    const image2Ref = useRef<HTMLImageElement>(null);
    const image3Ref = useRef<HTMLImageElement>(null);
    const image4Ref = useRef<HTMLImageElement>(null);
    const image5Ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const textElement = textRef.current;
        const imageRefs = [
            image1Ref.current,
            image2Ref.current,
            image3Ref.current,
            image4Ref.current,
            image5Ref.current
        ];

        if (!container || !textElement || imageRefs.some(img => !img)) return;

        // All images are guaranteed to be non-null after the check above
        const images = imageRefs.filter((img): img is HTMLImageElement => img !== null);

        // Function to get responsive positioning based on screen size
        const getResponsivePositions = () => {
            const screenWidth = window.innerWidth;
            
            if (screenWidth < 700) {
                // Mobile layout - better vertical distribution
                return {
                    image1: { x: -110, y: -300 },
                    image2: { x: 0, y: -200 },
                    image3: { x: 120, y: -280 },
                    image4: { x: 110, y: 250 },
                    image5: { x: -120, y: 180 }
                };
            } else if (screenWidth < 1024) {
                // Tablet layout - moderately compact
                return {
                    image1: { x: -200, y: -300 },
                    image2: { x: 0, y: -200 },
                    image3: { x: 200, y: -280 },
                    image4: { x: 130, y: 300 },
                    image5: { x: -130, y: 280 }
                };
            } else {
                // Desktop layout (original)
                return {
                    image1: { x: -400, y: -150 },
                    image2: { x: 0, y: -300 },
                    image3: { x: 400, y: -100 },
                    image4: { x: 350, y: 200 },
                    image5: { x: -350, y: 150 }
                };
            }
        };

        // Function to create and run the animation
        const createAnimation = () => {
            // Clear any existing ScrollTriggers
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            const positions = getResponsivePositions();

            // Set initial state - all images at center, text hidden
            gsap.set(images, { 
                x: 0, 
                y: 0,
                scale: 0.8,
                opacity: 0.9
            });
            gsap.set(textElement, { 
                opacity: 0, 
                y: 50 
            });

            // Create timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "center center",
                    end: "bottom center",
                    scrub: 1.2,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true, // Recalculate on refresh for mobile
                    refreshPriority: -1 // Prevent issues with iOS Safari momentum scrolling
                }
            });

            // Animate images spreading out with slight stagger to their final positions
            // Image1 - top left
            tl.to(image1Ref.current, {
                x: positions.image1.x,
                y: positions.image1.y,
                scale: 1,
                opacity: 1,
                duration: 3,
                ease: "power2.out"
            }, 0);

            // Image2 - top center  
            tl.to(image2Ref.current, {
                x: positions.image2.x,
                y: positions.image2.y,
                scale: 1,
                opacity: 1,
                duration: 3,
                ease: "power2.out"
            }, 0.1);

            // Image3 - top right
            tl.to(image3Ref.current, {
                x: positions.image3.x,
                y: positions.image3.y,
                scale: 1,
                opacity: 1,
                duration: 3,
                ease: "power2.out"
            }, 0.2);

            // Image4 - bottom right
            tl.to(image4Ref.current, {
                x: positions.image4.x,
                y: positions.image4.y,
                scale: 1,
                opacity: 1,
                duration: 3,
                ease: "power2.out"
            }, 0.3);

            // Image5 - bottom left
            tl.to(image5Ref.current, {
                x: positions.image5.x,
                y: positions.image5.y,
                scale: 1,
                opacity: 1,
                duration: 3,
                ease: "power2.out"
            }, 0.4);

            // Animate text fade in (starts after images finish moving)
            tl.to(textElement, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, 1.5);

            return tl;
        };

        // Create initial animation
        createAnimation();

        // Add resize listener to handle orientation changes and window resizing
        let resizeTimeout: number;
        const handleResize = () => {
            // Debounce resize events
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                createAnimation();
            }, 150);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        // Refresh ScrollTrigger after images load (helps on mobile)
        const imageLoadPromises = images.map(img => {
            if (img instanceof HTMLImageElement) {
                return img.complete ? Promise.resolve() : new Promise<void>(resolve => {
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                });
            }
            return Promise.resolve();
        });

        Promise.all(imageLoadPromises).then(() => {
            ScrollTrigger.refresh();
        });

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
            clearTimeout(resizeTimeout);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className="relative min-h-screen bg-gray-50 overflow-hidden"
        >
            {/* Images - All positioned at center initially, will spread on scroll */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img 
                    ref={image1Ref}
                    src={Image1} 
                    alt="First Image" 
                    className="absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-xl sm:rounded-2xl shadow-lg object-cover"
                />
                
                <img 
                    ref={image2Ref}
                    src={Image2} 
                    alt="Second Image" 
                    className="absolute w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 rounded-xl sm:rounded-2xl shadow-lg object-cover"
                />
                
                <img 
                    ref={image3Ref}
                    src={Image3} 
                    alt="Third Image" 
                    className="absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-xl sm:rounded-2xl shadow-lg object-cover"
                />
                
                <img 
                    ref={image4Ref}
                    src={Image4} 
                    alt="Fourth Image" 
                    className="absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-xl sm:rounded-2xl shadow-lg object-cover"
                />
                
                <img 
                    ref={image5Ref}
                    src={Image5} 
                    alt="Fifth Image" 
                    className="absolute w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 rounded-xl sm:rounded-2xl shadow-lg object-cover"
                />
            </div>

            {/* Central Content */}
            <div 
                ref={textRef}
                className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-normal font-outfit text-center text-purple tracking-normal mb-3 sm:mb-4">We make complex investing simple</p>
                    <div className="text-center font-outfit font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-navy leading-tight">
                        <h1 className="mb-1 sm:mb-2">Bring clarity to every</h1>
                        <h1 className="mb-1 sm:mb-2">investment decision through</h1>
                        <h1>insights that truly matter</h1>
                    </div>
                    <div className="text-center py-6 sm:py-8 lg:py-10">
                        <GetStarted />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section_2