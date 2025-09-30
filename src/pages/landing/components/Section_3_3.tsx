import GetStarted from "../../../components/common/GetStarted"
import Trust from "../../../assets/images/Trust.png"

const Section_3_3 = () => {
    return (
        <div className="bg-navy min-h-screen flex items-center justify-center px-8 py-16">
            <div className="max-w-7xl w-full flex items-center justify-between gap-16">
                {/* Left Content */}
                <div className="flex-1 max-w-2xl mt-32">
                    <div className="bg-navy font-outfit text-purple font-medium text-7xl leading-tight mb-8">
                        <h1>Decisions You</h1>
                        <h1>Can Trust</h1>
                    </div>
                    <div className="text-white font-normal text-xl mb-12 leading-relaxed">
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
                <div className="flex-1 flex justify-center items-center -mt-16">
                    <img 
                        src={Trust} 
                        alt="Trust" 
                        className="w-[652.55px] h-[652.55px] object-contain"
                    />
                </div>
            </div>
        </div>
    )
}

export default Section_3_3