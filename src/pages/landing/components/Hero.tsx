import GetStarted from "../../../components/common/GetStarted"
import backgroundHero from "../../../assets/images/Background_Hero_page.png"
import backgroundGradient from "../../../assets/images/hero-bg.png"
export const Hero = () => {
    return(
    <>
        <div className="min-h-screen bg-white h-100vh bg-cover bg-center relative font-outfit" style={{ backgroundImage: `url(${backgroundGradient}), url(${backgroundHero})` }}>
            {/* Gradient overlay matching design specs */}
            <div 
                className="absolute inset-0 opacity-10 blur-[10px]" 
                style={{
                    background: `linear-gradient(to bottom right, #AC72FF, rgba(172, 114, 255, 0))`,
                    mixBlendMode: 'hue'
                }}
            ></div>
            
            {/* Desktop Layout (1025px and above) */}
            <div className="relative z-10 hidden xl:flex justify-between items-end min-h-[calc(100vh-80px)] px-8 py-16 tracking-normal">
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

                {/* Bottom section - CTA and footer */}
                <div className="flex flex-col items-end right-0 bottom-0 gap-6">
                    <div className="flex flex-col items-end">
                        <GetStarted />
                    </div>
                    <div className="text-white text-md font-normal">
                        Want to talk or need help? <span className="font-bold hover"> <a href="#"> Get in touch →</a></span>
                    </div>
                </div>
            </div>

            {/* Tablet Layout (768px - 1024px) */}
            <div className="relative z-10 hidden md:flex xl:hidden justify-between items-end min-h-[calc(100vh-80px)] px-6 py-12 tracking-normal">
                <div className="flex flex-col items-start bottom-0 left-0 text-white">
                    <div>
                        <h1 className="text-5xl lg:text-6xl font-medium leading-tight">
                            Clarity in
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-5xl lg:text-6xl font-medium leading-tight mb-4">
                            Every Choice
                        </h1>
                    </div>
                    <div className="max-w-lg">
                        <p className="text-lg font-normal leading-relaxed">
                            We believe clarity is the most powerful investment tool
                        </p>
                    </div>
                </div>

                {/* Tablet CTA Section */}
                <div className="flex flex-col items-end right-0 bottom-0 gap-4">
                    <div className="flex flex-col items-end">
                        <GetStarted className="w-50" />
                    </div>
                    <div className="text-white text-sm font-normal text-right max-w-xs">
                        Want to talk or need help? <span className="font-bold hover"> <a href="#"> Get in touch →</a></span>
                    </div>
                </div>
            </div>

            {/* Mobile Layout (below 768px) */}
            <div className="relative z-10 flex md:hidden flex-col justify-center items-start min-h-screen px-6 pt-8">
                <div className="flex flex-col items-start text-white mb-8">
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-medium leading-tight">
                            Clarity in
                        </h1>
                    </div>
                    <div>
                        <h1 className="text-4xl sm:text-5xl font-medium leading-tight mb-6">
                            Every Choice
                        </h1>
                    </div>
                    <div className="max-w-sm">
                        <p className="text-base sm:text-lg leading-relaxed font-normal">
                            We believe clarity is the most powerful investment tool
                        </p>
                    </div>
                </div>

                {/* Mobile CTA Section */}
                <div className="flex flex-col content-end gap-4 pt-18">
                    <GetStarted className="w-46" />
                    <div className="text-white text-sm font-normal">
                        Want to talk or need help? <span className="font-bold"> <a href="#"> Get in touch →</a></span>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default Hero