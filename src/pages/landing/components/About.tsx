import GetStarted from "../../../components/common/GetStarted";
import Barchart from "../../../assets/images/Barchart.png";
import Piechart from "../../../assets/images/Piechart.png";
import DownArrow from "../../../assets/images/down-arrow.png";
import SpiralBg from "../../../assets/images/spiral-bg-card.png";

const About = () => {
    return (
        <div>
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
            {/* Mobile/Tablet: Horizontal scroll container */}
            <div className="lg:hidden">
                <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    <div className="flex gap-6 px-4 sm:px-6 pb-4" style={{ width: 'max-content' }}>
                        {/* Cards will be rendered here for mobile/tablet */}
                        {/* Card 1 - Discover Fund Cards */}
                        <div
                            className="text-white relative overflow-hidden rounded-lg p-4 sm:p-6 flex-shrink-0 snap-center"
                            style={{
                                width: '280px',
                                minHeight: '400px',
                                height: 'auto',
                                background: 'linear-gradient(180deg, #170630 0%, #250456 100%)'
                            }}
                        >
                            {/* Title Section */}
                            <div className="font-outfit text-white px-2 sm:px-4">
                                <h1 className="font-semibold text-xl sm:text-2xl">Discover Fund</h1>
                                <h1 className="mb-3 sm:mb-4 font-semibold text-xl sm:text-2xl">Cards</h1>

                                <p className="text-sm sm:text-base opacity-90 mt-2 sm:mt-3 text-white font-outfit font-normal">
                                    Every fund explained simply: performance, risk, and fit for your goals.
                                </p>
                            </div>

                            {/* Fund Cards Visual */}
                            <div className="relative mt-4 sm:mt-6 overflow-hidden">
                                <div className="flex space-x-2 sm:space-x-3" style={{ 
                                    transform: 'translateX(-20px)', 
                                    width: 'calc(100% + 40px)' 
                                }}>
                                    {/* Left Card - Blue Gradient (Partially Hidden) */}
                                    <div
                                        className="rounded-lg p-2 sm:p-3 flex flex-col justify-between relative flex-shrink-0 w-20 sm:w-24 h-28 sm:h-32"
                                        style={{
                                            background: `url(${SpiralBg}), linear-gradient(180deg, #1e40af 0%, #3b82f6 100%)`,
                                            backgroundSize: 'cover, 100% 100%',
                                            backgroundPosition: 'center, center',
                                            backgroundRepeat: 'no-repeat, no-repeat',
                                            backgroundBlendMode: 'overlay'
                                        }}
                                    >
                                        <div className="text-xs font-medium text-white leading-tight">Returns, Equal Risk</div>
                                        <div className="text-center">
                                            <div className="text-xs font-semibold text-white">5 Funds</div>
                                            <img src={DownArrow} alt="Down Arrow" className="mx-auto mt-1 w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Middle Card - Purple Gradient (Fully Visible) */}
                                    <div
                                        className="rounded-lg p-2 sm:p-3 flex flex-col justify-between relative flex-shrink-0 w-20 sm:w-24 h-28 sm:h-32"
                                        style={{
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
                                            <img src={DownArrow} alt="Down Arrow" className="mx-auto mt-1 w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Right Card - Lime Green Gradient (Partially Hidden) */}
                                    <div
                                        className="rounded-lg p-2 sm:p-3 flex flex-col justify-between relative flex-shrink-0 w-20 sm:w-24 h-28 sm:h-32"
                                        style={{
                                            background: `url(${SpiralBg}), linear-gradient(180deg, #65a30d 0%, #84cc16 100%)`,
                                            backgroundSize: 'cover, 100% 100%',
                                            backgroundPosition: 'center, center',
                                            backgroundRepeat: 'no-repeat, no-repeat',
                                            backgroundBlendMode: 'overlay'
                                        }}
                                    >
                                        <div className="text-xs font-medium text-white leading-tight">Low Risk, Similar Returns</div>
                                        <div className="text-center">
                                            <div className="text-xs font-semibold text-white">5 Funds</div>
                                            <img src={DownArrow} alt="Down Arrow" className="mx-auto mt-1 w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 - CARRVA-Led Analysis */}
                        <div
                            className="text-black rounded-lg relative overflow-hidden flex flex-col items-stretch bg-[#E2E8F0] px-4 pt-4 sm:px-6 sm:pt-6 flex-shrink-0 snap-center"
                            style={{
                                width: '280px',
                                minHeight: '400px',
                                height: 'auto'
                            }}
                        >
                            <div className="px-2 sm:px-4">
                                <h3 className="text-xl sm:text-2xl font-semibold">CARRVA-Led</h3>
                                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Analysis</h3>
                                <p className="text-sm sm:text-base opacity-90 mb-4 sm:mb-6 font-outfit font-normal">
                                    Consistency-driven, alpha-focused.
                                </p>
                            </div>

                            {/* Chart Visual */}
                            <div className="flex items-center justify-center flex-1">
                                <img src={Barchart} alt="Barchart" className="object-contain max-w-full h-auto" />
                            </div>
                        </div>

                        {/* Card 3 - Track & Optimize */}
                        <div 
                            className="bg-navy text-white rounded-lg p-4 sm:p-6 overflow-hidden flex flex-col items-stretch flex-shrink-0 snap-center"
                            style={{
                                width: '280px',
                                minHeight: '400px',
                                height: 'auto'
                            }}
                        >
                            <div className="px-2 sm:px-4">
                                <h3 className="text-xl sm:text-2xl font-semibold font-outfit text-white">Track &</h3>
                                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 font-outfit text-white">Optimize</h3>
                                <p className="text-sm sm:text-base opacity-90 mb-4 sm:mb-6 font-outfit font-normal">
                                    Monitor your portfolio with continuous updates and rebalancing suggestions.
                                </p>
                            </div>

                            {/* Pie Chart Visual */}
                            <div className="flex items-center justify-center flex-1">
                                <img src={Piechart} alt="Piechart" className="object-contain max-w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden lg:grid grid-cols-3 gap-8 rounded-2xl w-full max-w-7xl mx-auto px-8">
                {/* Card 1 - Discover Fund Cards */}
                <div
                    className="text-white relative overflow-hidden rounded-lg p-6"
                    style={{
                        minHeight: '400px',
                        height: 'auto',
                        background: 'linear-gradient(180deg, #170630 0%, #250456 100%)'
                    }}
                >
                    {/* Title Section */}
                    <div className="font-outfit text-white px-6">
                        <h1 className="font-semibold text-3xl">Discover Fund</h1>
                        <h1 className="mb-4 font-semibold text-3xl">Cards</h1>

                        <p className="text-base opacity-90 mt-3 text-white font-outfit font-normal">
                            Every fund explained simply: performance, risk, and fit for your goals.
                        </p>
                    </div>

                    {/* Fund Cards Visual */}
                    <div className="relative mt-8 overflow-hidden">
                        <div className="flex space-x-3" style={{ 
                            transform: 'translateX(-35px)', 
                            width: 'calc(100% + 70px)' 
                        }}>
                            {/* Left Card - Blue Gradient (Partially Hidden) */}
                            <div
                                className="rounded-lg p-4 flex flex-col justify-between relative flex-shrink-0 w-36 h-48"
                                style={{
                                    background: `url(${SpiralBg}), linear-gradient(180deg, #1e40af 0%, #3b82f6 100%)`,
                                    backgroundSize: 'cover, 100% 100%',
                                    backgroundPosition: 'center, center',
                                    backgroundRepeat: 'no-repeat, no-repeat',
                                    backgroundBlendMode: 'overlay'
                                }}
                            >
                                <div className="text-xs font-medium text-white leading-tight">Returns, Equal Risk</div>
                                <div className="text-center">
                                    <div className="text-xs font-semibold text-white">5 Funds</div>
                                    <img src={DownArrow} alt="Down Arrow" className="mx-auto mt-2 w-6 h-6" />
                                </div>
                            </div>

                            {/* Middle Card - Purple Gradient (Fully Visible) */}
                            <div
                                className="rounded-lg p-4 flex flex-col justify-between relative flex-shrink-0 w-36 h-48"
                                style={{
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

                            {/* Right Card - Lime Green Gradient (Partially Hidden) */}
                            <div
                                className="rounded-lg p-4 flex flex-col justify-between relative flex-shrink-0 w-36 h-48"
                                style={{
                                    background: `url(${SpiralBg}), linear-gradient(180deg, #65a30d 0%, #84cc16 100%)`,
                                    backgroundSize: 'cover, 100% 100%',
                                    backgroundPosition: 'center, center',
                                    backgroundRepeat: 'no-repeat, no-repeat',
                                    backgroundBlendMode: 'overlay'
                                }}
                            >
                                <div className="text-xs font-medium text-white leading-tight">Low Risk, Similar Returns</div>
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
                    className="text-black rounded-lg relative overflow-hidden flex flex-col items-stretch bg-[#E2E8F0] pt-10"
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
                <div className="bg-navy text-white rounded-lg p-6 overflow-hidden flex flex-col items-stretch"
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
                    <div className="flex items-center justify-center flex-1">
                        <img src={Piechart} alt="Piechart" className="object-contain max-w-full h-auto" />
                    </div>
                </div>
            </div>

        </div>


    )
}

export default About;