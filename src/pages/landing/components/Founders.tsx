import { useEffect, useRef, useState } from "react"
import Co_founder_1 from "../../../assets/images/Co_founder_1.png"
import Co_founder_2 from "../../../assets/images/Co_founder_2.png"
import Co_founder_3 from "../../../assets/images/Co_founder_3.png"
import founderFullBg from "../../../assets/images/founder-full-bg.png"
import founderBottomBg from "../../../assets/images/founder-bototm-bg.png"

const Founders = () => {
    const [centerCardIndex, setCenterCardIndex] = useState(0) // Start with first card centered on mobile
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const founders = [
        {
            image: Co_founder_1,
            name: "Vikas Khaitan",
            title: "Co-Founder",
            rotation: "-8deg"
        },
        {
            image: Co_founder_2,
            name: "Prashant Joshi",
            title: "Co-Founder",
            rotation: "0deg"
        },
        {
            image: Co_founder_3,
            name: "Anurag Jhanwar",
            title: "Co-Founder",
            rotation: "8deg"
        }
    ]

    // Scroll detection for mobile/tablet rotation behavior
    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return

            const container = scrollContainerRef.current
            const scrollLeft = container.scrollLeft
            const containerWidth = container.clientWidth
            
            // Calculate card width dynamically based on screen size
            // Mobile: 280px + 24px gap, SM: 300px + 24px gap, MD: 320px + 24px gap
            const cardWidth = window.innerWidth >= 768 ? 344 : window.innerWidth >= 640 ? 324 : 304
            
            // Calculate which card should be centered based on scroll position
            // Add half container width to account for centering
            const adjustedScrollLeft = scrollLeft + (containerWidth / 2) - (cardWidth / 2)
            const cardIndex = Math.round(adjustedScrollLeft / cardWidth)
            const clampedIndex = Math.max(0, Math.min(2, cardIndex)) // Clamp between 0-2
            
            setCenterCardIndex(clampedIndex)
        }

        const handleResize = () => {
            // Recalculate centered card on window resize
            setTimeout(handleScroll, 100)
        }

        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true })
            window.addEventListener('resize', handleResize, { passive: true })
            
            // Initial setup: center the first card and calculate scroll position
            const timer = setTimeout(() => {
                // Scroll to center the first card (index 0)
                const cardWidth = window.innerWidth >= 768 ? 344 : window.innerWidth >= 640 ? 324 : 304
                const containerWidth = container.clientWidth
                const scrollPosition = Math.max(0, (cardWidth / 2) - (containerWidth / 2))
                
                container.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                })
                
                // Then calculate the centered card
                setTimeout(handleScroll, 100)
            }, 200)
            
            return () => {
                container.removeEventListener('scroll', handleScroll)
                window.removeEventListener('resize', handleResize)
                clearTimeout(timer)
            }
        }
    }, [])

    const FounderCard = ({ 
        founder, 
        index, 
        isDesktop = false, 
        mobileRotation = "0deg" 
    }: { 
        founder: typeof founders[0], 
        index: number, 
        isDesktop?: boolean,
        mobileRotation?: string 
    }) => (
        <div 
            className={`relative rounded-2xl overflow-hidden ${
                isDesktop 
                    ? `w-full max-w-[270px] h-[360px] mx-auto ${index != 1 ? 'top-5' : ''}` 
                    : 'w-[280px] h-[360px] sm:w-[300px] sm:h-[380px] md:w-[320px] md:h-[400px]'
            }`}
            style={{ 
                transform: `rotate(${isDesktop ? founder.rotation : mobileRotation})`,
                backgroundImage: `url(${founderFullBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
        >
            <img src={founder.image} alt={`Co-Founder ${index + 1}`} className="w-full h-full object-cover" style={{ filter: 'grayscale(100%)' }} />
            <div className="absolute inset-0 rounded-2xl"
                 style={{
                     background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 58%, #000000 100%)'
                 }}></div>
            <div className={`absolute bottom-0 left-0 right-0 rounded-b-2xl ${
                isDesktop ? 'h-32' : 'h-24 sm:h-28 md:h-32'
            }`}
                 style={{
                     backgroundImage: `url(${founderBottomBg})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'bottom',
                     maskImage: 'linear-gradient(to top, black 0%, black 70%, transparent 100%)',
                     WebkitMaskImage: 'linear-gradient(to top, black 0%, black 70%, transparent 100%)'
                 }}></div>
            <div className={`absolute text-white z-10 ${
                isDesktop ? 'bottom-4 left-4' : 'bottom-3 sm:bottom-4 left-3 sm:left-4'
            }`}>
                <p className={`font-normal font-outfit text-lime mb-px ${
                    isDesktop ? 'text-xl' : 'text-lg sm:text-xl md:text-2xl'
                }`}>{founder.name}</p>
                <p className={`font-outfit font-light text-white opacity-90 ${
                    isDesktop ? 'text-sm' : 'text-xs sm:text-sm md:text-base'
                }`}>{founder.title}</p>
            </div>
        </div>
    )

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            {/* Responsive heading */}
            <div className="mb-6 sm:mb-8 items-center justify-center">
            <h1 className="font-outfit font-medium text-navy text-center mb-6 sm:mb-8 pt-20 sm:pt-24 lg:pt-30 text-3xl sm:text-4xl md:text-5xl lg:text-[56px]">
                Built by the <span className="text-purple">Experts</span>
            </h1>
            
            {/* Responsive description */}
            <div className="font-outfit font-normal text-sm sm:text-base md:text-lg text-[#4B5563] text-center max-w-2xl mx-auto">
                <p>
                    Our team combines decades of financial expertise with a mission:
                <span className="mb-6 sm:mb-8">
                    making investing transparent and accessible for everyone.
                </span></p>
            </div>
            </div>

            {/* Desktop Layout (1280px and above) */}
            <div className="hidden xl:block">
                <div className="grid grid-cols-3 gap-4 lg:gap-6 p-6 max-w-6xl mx-auto">
                    <div className="flex justify-end">
                        <FounderCard founder={founders[0]} index={0} isDesktop={true} />
                    </div>
                    <div className="flex justify-center">
                        <FounderCard founder={founders[1]} index={1} isDesktop={true} />
                    </div>
                    <div className="flex justify-start">
                        <FounderCard founder={founders[2]} index={2} isDesktop={true} />
                    </div>
                </div>
            </div>

            {/* Mobile and Tablet Layout with Swipe (below 1280px) */}
            <div className="block xl:hidden">
                <div 
                    ref={scrollContainerRef}
                    className="overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    <div className="flex gap-6 px-4 sm:px-6 pb-4" style={{ width: 'max-content' }}>
                        {founders.map((founder, index) => {
                            // Calculate rotation based on position relative to centered card
                            let mobileRotation = "0deg"
                            
                            if (index !== centerCardIndex) {
                                // Cards to the left of center rotate left (-8deg)
                                // Cards to the right of center rotate right (+8deg)
                                if (index < centerCardIndex) {
                                    mobileRotation = "-8deg" // Left rotation for cards before center
                                } else {
                                    mobileRotation = "8deg"  // Right rotation for cards after center
                                }
                            }
                            
                            return (
                                <div 
                                    key={index} 
                                    className="flex-shrink-0 snap-center"
                                >
                                    <FounderCard 
                                        founder={founder} 
                                        index={index} 
                                        isDesktop={false}
                                        mobileRotation={mobileRotation}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Founders;