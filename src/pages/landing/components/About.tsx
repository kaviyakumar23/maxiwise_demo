import { useEffect, useRef } from "react";
import GetStarted from "../../../components/common/GetStarted";
import Barchart from "../../../assets/images/Barchart.png";
import Piechart from "../../../assets/images/Piechart.png";
import DownArrow from "../../../assets/images/down-arrow.png";
import SpiralBg from "../../../assets/images/spiral-bg-card.png";

const About = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to center on mount
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
            container.scrollLeft = scrollLeft;
        }
    }, []);

    return (
        <div id="features">
            <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="font-outfit font-normal text-lg sm:text-xl lg:text-2xl text-purple text-center mb-4 sm:mb-6">
                    <p>From Data to Decisions</p>
                </div>
                <div className="font-outfit font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-navy text-center mb-6 sm:mb-8">
                    <h1>A guided journey for</h1>
                    <h1>every investor</h1>
                </div>
                <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
                    <GetStarted />
                </div>
            </div>

            {/* Scrollable container for cards */}
            <div 
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide px-12"
                style={{
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                <div 
                    className="grid grid-cols-3 gap-8 mx-auto"
                    style={{
                        minWidth: '1400px', // Ensures cards maintain their layout
                        width: 'fit-content'
                    }}
                >
                    {/* Card 1 - Discover Fund Cards */}
                    <div
                        className="text-white relative overflow-hidden rounded-2xl"
                        style={{
                            minHeight: '400px',
                            height: 'auto',
                            background: 'linear-gradient(180deg, #170630 0%, #250456 100%)'
                        }}
                    >
                    {/* Title Section */}
                    <div className="font-outfit text-white px-10 pt-12">
                        <h1 className="font-semibold text-3xl md:text-2xl sm:text-lg">Discover Fund</h1>
                        <h1 className="mb-4 font-semibold text-3xl">Cards</h1>

                        <p className="text-base opacity-90 mt-3 text-white font-outfit font-normal">
                            Every fund explained simply: performance, risk, and fit for your goals.
                        </p>
                    </div>

                    {/* Fund Cards Visual */}
                    <div className="relative pt-20 overflow-hidden h-full">
                        <div className="flex items-start justify-center h-full gap-10">
                            {/* Left Card - Blue Gradient (70% Visible - Right side shown) */}
                            <div
                                className="rounded-lg p-4 flex flex-col justify-between relative flex-shrink-0 h-1/2"
                                style={{
                                    width: '176px', // 11rem (w-44)
                                    clipPath: 'inset(0 0 0 30%)',
                                    marginLeft: '-30%',
                                    background: `url(${SpiralBg}), linear-gradient(180deg, #1e40af 0%, #3b82f6 100%)`,
                                    backgroundSize: 'cover, 100% 100%',
                                    backgroundPosition: 'center, center',
                                    backgroundRepeat: 'no-repeat, no-repeat',
                                    backgroundBlendMode: 'overlay'
                                }}
                            >
                                <div className="text-xs font-medium text-white text-center leading-tight">Returns,<br/> Equal Risk</div>
                                <div className="text-center">
                                    <div className="text-xs font-semibold text-white">5 Funds</div>
                                    <img src={DownArrow} alt="Down Arrow" className="mx-auto mt-2 w-6 h-6" />
                                </div>
                            </div>

                            {/* Middle Card - Purple Gradient (Fully Visible) */}
                            <div
                                className="rounded-lg p-4 flex flex-col justify-between relative flex-shrink-0 h-1/2"
                                style={{
                                    width: '192px', // 12rem (w-48)
                                    background: `url(${SpiralBg}), linear-gradient(180deg, #7c3aed 0%, #a855f7 100%)`,
                                    backgroundSize: 'cover, 100% 100%',
                                    backgroundPosition: 'center, center',
                                    backgroundRepeat: 'no-repeat, no-repeat',
                                    backgroundBlendMode: 'overlay'
                                }}
                            >
                                <div className="text-xs font-medium text-white leading-tight">All Parameters</div>
                                <div className="text-center">
                                    <div className="text-xs font-semibold text-white">20 Funds</div>
                                    <img src={DownArrow} alt="Down Arrow" className="mx-auto mt-2 w-6 h-6" />
                                </div>
                            </div>

                            {/* Right Card - Lime Green Gradient (70% Visible - Left side shown) */}
                            <div
                                className="rounded-lg p-4 flex flex-col justify-between relative flex-shrink-0 h-1/2"
                                style={{
                                    width: '176px', // 11rem (w-44)
                                    clipPath: 'inset(0 30% 0 0)',
                                    marginRight: '-30%',
                                    background: `url(${SpiralBg}),  linear-gradient(149.86deg, #D1F349 0.9%, #ACD409 99.1%)`,
                                    backgroundSize: 'cover, 100% 100%',
                                    backgroundPosition: 'center, center',
                                    backgroundRepeat: 'no-repeat, no-repeat',
                                    backgroundBlendMode: 'overlay'
                                }}
                            >
                                <div className="text-xs font-medium text-navy leading-tight">Low Risk, Similar Returns</div>
                                <div className="text-center">
                                    <div className="text-xs font-semibold text-white">5 Funds</div>
                                    <img src={DownArrow} alt="Down Arrow" className="mx-auto mt-2 w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2 - CARRVA-Led Analysis */}
                <div
                    className="text-navy rounded-2xl relative overflow-hidden flex flex-col items-stretch bg-[#E2E8F0] pt-20"
                    style={{
                        minHeight: '400px',
                        height: 'auto'
                    }}
                >
                    <div className="px-10">
                        <h3 className="text-3xl font-semibold">CARRVA-Led</h3>
                        <h3 className="text-3xl font-semibold mb-4">Analysis</h3>
                        <p className="text-base opacity-90 mb-6 font-outfit font-normal">
                            Consistency-driven, alpha-focused.
                        </p>
                    </div>

                    {/* Chart Visual */}
                    <div className="flex items-center justify-center flex-1">
                        <img src={Barchart} alt="Barchart" className="object-contain max-w-full h-auto" />
                    </div>
                </div>

                {/* Card 3 - Track & Optimize */}
                <div className="bg-navy text-white rounded-2xl px-6 pt-20 overflow-hidden flex flex-col items-stretch"
                    style={{
                        minHeight: '400px',
                        height: 'auto'
                    }}>
                    <div className="px-6">
                        <h3 className="text-3xl font-semibold font-outfit text-white">Track &</h3>
                        <h3 className="text-3xl font-semibold mb-4 font-outfit text-white">Optimize</h3>
                        <p className="text-base opacity-90 mb-6 font-outfit font-normal">
                            Monitor your portfolio with continuous updates and rebalancing suggestions.
                        </p>
                    </div>

                    {/* Pie Chart Visual */}
                    <div className="flex justify-center flex-1 pt-2">
                        <img src={Piechart} alt="Piechart" className="object-contain max-w-full h-auto w-full" />
                    </div>
                </div>
                </div>
            </div>

        </div>


    )
}

export default About;