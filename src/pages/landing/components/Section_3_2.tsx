import GetStarted from "../../../components/common/GetStarted"
import Upscale from "../../../assets/images/Upscale.png"

const Section_3_2 = () => {
    return (
        <div className="bg-purple flex items-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
                    
                    {/* Left content - responsive styling */}
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <div className="text-navy font-outfit font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                            <h1>Guided by</h1>
                            <h1>Experts</h1>
                        </div>
                        <div className="text-navy font-outfit font-normal text-sm sm:text-lg lg:text-xl leading-relaxed">
                            <p>Our proprietary CARRVA framework (<span className="font-bold">Consistency,</span></p>
                            <p><span className="font-bold">Alpha, Returns, Risk, Volatility, Analysis</span>) is battle-</p>
                            <p>tested with India's top family offices.</p>
                        </div>
                        
                        {/* Rating badge - responsive styling */}
                        <div className="flex items-center gap-2 bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-full w-fit text-xs sm:text-sm font-medium">
                            <span>4.84.81</span>
                            <span className="bg-blue-400 px-1.5 sm:px-2 py-0.5 rounded-full text-xs">90</span>
                        </div>
                        
                        <div>
                            <GetStarted 
                                color="indigo"
                                className="font-medium rounded-full"
                            />
                        </div>
                    </div>
                    
                    {/* Right content - responsive image */}
                    <div className="flex justify-center lg:justify-end">
                        <img src={Upscale} alt="Upscale" className="max-w-full h-auto w-[250px] sm:w-[350px] lg:w-full" />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Section_3_2