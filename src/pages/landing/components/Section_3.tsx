import GetStarted from "../../../components/common/GetStarted"
import A_Element from "../../../assets/images/3D_A.png"
import Blocks from "../../../assets/images/Blocks.png"

const Section_3 = () => {
    return (
        <div className="bg-navy min-h-screen relative overflow-hidden">
            {/* Main content container */}
            <div className="h-screen flex flex-col lg:flex-row">
                {/* Left content section - responsive layout */}
                <div className="w-full lg:w-1/2 px-4 sm:px-8 lg:pl-16 z-20 flex flex-col justify-center pt-16 lg:pt-32">
                    <div className="font-outfit font-medium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-purple leading-tight mb-6 lg:mb-8">
                        <h1 className="mb-2">Built for</h1>
                        <h1>Everyone</h1>
                    </div>
                    <div className="font-outfit font-normal text-sm sm:text-lg lg:text-xl text-white mb-6 lg:mb-8 leading-relaxed max-w-lg">
                        <p>Whether you're a first-time investor or an evolved one,</p>
                        <p>Maxiwise makes complex decisions simple.</p>
                    </div>
                    <GetStarted />
                </div>
                
                {/* Right side - empty for absolute positioning */}
                <div className="w-full lg:w-1/2 relative">
                </div>
            </div>
            
            {/* Background Blocks - responsive positioning */}
            <div className="absolute bottom-0 right-0 z-5 w-[300px] h-[250px] sm:w-[400px] sm:h-[350px] lg:w-[600px] lg:h-[500px]">
                <img 
                    src={Blocks} 
                    alt="3D Blocks" 
                    className="w-full h-full object-contain opacity-90"
                />
            </div>
            
            {/* 3D "A" Element - responsive positioning */}
            <div className="absolute top-1/2 left-[50%] lg:left-[55%] transform -translate-x-1/2 -translate-y-1/2 z-15">
                <img 
                    src={A_Element} 
                    alt="3D A Element" 
                    className="w-auto h-[200px] sm:h-[300px] lg:h-[450px] object-contain"
                />
            </div>
        </div>
    )
}

export default Section_3