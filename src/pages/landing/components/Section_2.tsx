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
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const image1Ref = useRef(null);
    const image2Ref = useRef(null);
    const image3Ref = useRef(null);
    const image4Ref = useRef(null);
    const image5Ref = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const textElement = textRef.current;
        const images = [image1Ref.current, image2Ref.current, image3Ref.current, image4Ref.current, image5Ref.current];

        if (!container || !textElement || images.some(img => !img)) return;

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
                anticipatePin: 1
            }
        });

        // Animate images spreading out with slight stagger to their final positions
        // Image1 - top left
        tl.to(image1Ref.current, {
            x: -400,
            y: -150,
            scale: 1,
            opacity: 1,
            duration: 3,
            ease: "power2.out"
        }, 0);

        // Image2 - top center  
        tl.to(image2Ref.current, {
            x: 0,
            y: -300,
            scale: 1,
            opacity: 1,
            duration: 3,
            ease: "power2.out"
        }, 0.1);

        // Image3 - top right
        tl.to(image3Ref.current, {
            x: 400,
            y: -100,
            scale: 1,
            opacity: 1,
            duration: 3,
            ease: "power2.out"
        }, 0.2);

        // Image4 - bottom right
        tl.to(image4Ref.current, {
            x: 350,
            y: 200,
            scale: 1,
            opacity: 1,
            duration: 3,
            ease: "power2.out"
        }, 0.3);

        // Image5 - bottom left
        tl.to(image5Ref.current, {
            x: -350,
            y: 150,
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

        // Cleanup
        return () => {
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
                    className="absolute w-40 h-40 rounded-2xl shadow-lg object-cover"
                />
                
                <img 
                    ref={image2Ref}
                    src={Image2} 
                    alt="Second Image" 
                    className="absolute w-32 h-32 rounded-2xl shadow-lg object-cover"
                />
                
                <img 
                    ref={image3Ref}
                    src={Image3} 
                    alt="Third Image" 
                    className="absolute w-40 h-40 rounded-2xl shadow-lg object-cover"
                />
                
                <img 
                    ref={image4Ref}
                    src={Image4} 
                    alt="Fourth Image" 
                    className="absolute w-40 h-40 rounded-2xl shadow-lg object-cover"
                />
                
                <img 
                    ref={image5Ref}
                    src={Image5} 
                    alt="Fifth Image" 
                    className="absolute w-40 h-40 rounded-2xl shadow-lg object-cover"
                />
            </div>

            {/* Central Content */}
            <div 
                ref={textRef}
                className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-2xl font-normal font-outfit text-center text-purple tracking-normal mb-4">We make complex investing simple.</p>
                    <div className="text-center font-outfit font-semibold text-5xl text-navy">
                        <h1 className="mb-2">Bring clarity to every</h1>
                        <h1 className="mb-2">investment decision through</h1>
                        <h1>insights that truly matter</h1>
                    </div>
                    <div className="text-center py-10">
                        <GetStarted />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section_2