import GetStarted from "../../../components/common/GetStarted"
import Upscale from "../../../assets/images/Upscale.png"

const Section_3_2 = () => {
    return (
        <div className="bg-purple flex items-center min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative overflow-hidden">
            <div className="container mx-auto relative z-10">
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
                        
                        <div>
                            <GetStarted 
                                color="indigo"
                                className="font-medium rounded-full text-purple"
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
            
            {/* Image positioned at bottom right */}
            <div className="absolute bottom-0 -right-10 w-[60%] sm:w-[50%] lg:w-[55%] xl:w-[50%]">
                <img src={Upscale} alt="Upscale" className="w-full h-auto" />
            </div>
        </div>
    )
}

export default Section_3_2