import GetStarted from "../../../components/common/GetStarted"
import backgroundHero from "../../../assets/images/Background_Hero_page.png"
export const Hero = () => {
    return(
    <>
        <div className="min-h-screen bg-white h-100vh bg-cover bg-center relative" style={{ backgroundImage: `url(${backgroundHero})` }}>
            {/* Gradient overlay matching design specs */}
            <div 
                className="absolute inset-0 opacity-10 blur-[10px]" 
                style={{
                    background: `linear-gradient(to bottom right, #AC72FF, rgba(172, 114, 255, 0))`,
                    mixBlendMode: 'hue'
                }}
            ></div>
            
            <div className="relative z-10 flex justify-between items-end min-h-[calc(100vh-80px)] px-8 py-16 tracking-normal ">
                <div className="flex flex-col items-start bottom-0 left-0 text-white">
                    <div>
                        <h1 className="text-7xl font-medium leading-tight">
                            Clarity in
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-7xl font-medium leading-tight mb-4">
                            Every Choice
                        </h1>
                    </div>
                    <div>
                        <p className="text-xl leading-relaxed font-normal">
                            We believe clarity is the most powerful investment tool
                        </p>
                    </div>
                </div>
                {/* </div> */}

                {/* Bottom section - CTA and footer */}
                <div className="flex flex-col items-end right-0 bottom-0 gap-6">
                    {/* Left side - Empty space
            
            {/* Right side - Get Started button and help link */}
                    <div className="flex flex-col items-end">
                        <GetStarted />
                    </div>
                    <div className="text-white text-xl font-normal">
                            Want to talk or need help? <span className="font-bold hover"> <a href="#"> Get in touch →</a></span>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default Hero