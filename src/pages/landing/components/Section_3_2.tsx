import GetStarted from "../../../components/common/GetStarted"
import Upscale from "../../../assets/images/Upscale.png"

const Section_3_2 = () => {
    return (
        <div className="bg-purple min-h-screen flex relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
                {/* Left content */}
                <div className="lg:w-1/2 mb-8 lg:mb-0 relative z-10">
                    <div className="text-navy font-outfit font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4 sm:mb-6">
                        <h1>Guided by</h1>
                        <h1>Experts</h1>
                    </div>
                    <div className="text-navy font-outfit font-normal text-sm sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-md">
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
            
            {/* Image positioned at bottom right */}
            <div className="absolute bottom-0 -right-10 w-[85%] sm:w-[75%] md:w-[70%] lg:w-[55%] xl:w-[50%]">
                <img src={Upscale} alt="Upscale" className="w-full h-auto" />
            </div>
        </div>
    )
}

export default Section_3_2