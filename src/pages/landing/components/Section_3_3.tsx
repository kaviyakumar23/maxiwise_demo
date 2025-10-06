import GetStarted from "../../../components/common/GetStarted"
import Trust from "../../../assets/images/Trust.png"

const Section_3_3 = () => {
    return (
        <div className="bg-navy min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
                {/* Left Content */}
                <div className="flex-1 max-w-2xl lg:mt-32">
                    <div className="bg-navy font-outfit text-purple font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6 sm:mb-8">
                        <h1>Decisions You</h1>
                        <h1>Can Trust</h1>
                    </div>
                    <div className="text-white font-normal text-sm sm:text-lg lg:text-xl mb-8 sm:mb-10 lg:mb-12 leading-relaxed">
                        <p>No noise, no hype-just transparency, integrity, and</p>
                        <p>insights you can act on.</p>
                    </div>
                    <div>
                        <GetStarted
                        className="text-black rounded-full"
                        />
                    </div>
                </div>
                
                {/* Right Image */}
                <div className="flex-1 flex justify-center items-center lg:-mt-16">
                    <img 
                        src={Trust} 
                        alt="Trust" 
                        className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] xl:w-[652.55px] xl:h-[652.55px] object-contain"
                    />
                </div>
            </div>
        </div>
    )
}

export default Section_3_3