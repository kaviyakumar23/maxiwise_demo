import GetStarted from "../../../components/common/GetStarted"
import Upscale from "../../../assets/images/Upscale.png"

const Section_3_2 = () => {
    return (
        <div className="bg-purple flex items-center min-h-screen px-8 py-16">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left content - keeping original styling */}
                    <div className="flex flex-col gap-4">
                        <div className="text-navy font-outfit font-medium text-7xl leading-tight">
                            <h1>Guided by</h1>
                            <h1>Experts</h1>
                        </div>
                        <div className="text-navy font-outfit font-normal text-xl leading-relaxed">
                            <p>Our proprietary CARRVA framework (<span className="font-bold">Consistency,</span></p>
                            <p><span className="font-bold">Alpha, Returns, Risk, Volatility, Analysis</span>) is battle-</p>
                            <p>tested with India's top family offices.</p>
                        </div>
                        
                        {/* Rating badge - keeping blue styling */}
                        <div className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-full w-fit text-sm font-medium">
                            <span>4.84.81</span>
                            <span className="bg-blue-400 px-2 py-0.5 rounded-full text-xs">90</span>
                        </div>
                        
                        <div>
                            <GetStarted 
                                color="indigo"
                                className="font-medium rounded-full"
                            />
                        </div>
                    </div>
                    
                    {/* Right content - your original image */}
                    <div className="flex justify-center lg:justify-end">
                        <img src={Upscale} alt="Upscale" className="max-w-full h-auto" />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Section_3_2