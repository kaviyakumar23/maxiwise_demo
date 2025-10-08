import GetStarted from "../../../components/common/GetStarted"
import Puzzle from "../../../assets/images/Puzzle.png"

const Section_3_1 = () => {
    return (
        <div className="bg-lime min-h-screen flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
                {/* Left Content */}
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <div className="text-navy font-outfit font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4 sm:mb-6">
                        <h1>Clarity over</h1>
                        <h1>Chaos</h1>
                    </div>
                    <div className="text-navy font-outfit font-normal text-sm sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-md">
                        <p>We decode 1.2 lakh+ data points and 20+ financial metrics into insights that actually matter.</p>
                    </div>
                    <div>
                        <GetStarted 
                            color="indigo" 
                            className="font-medium rounded-full" 
                        />
                    </div>
                </div>
                
                {/* Right Content - Puzzle Image */}
                <div className="lg:w-1/2 flex justify-center lg:justify-end w-full">
                    <img 
                        src={Puzzle} 
                        alt="Puzzle pieces fitting together representing clarity over chaos" 
                        className="max-w-full h-auto w-[450px] sm:w-[500px] md:w-[600px] lg:w-full"
                    />
                </div>
            </div>
        </div>
    )
}

export default Section_3_1