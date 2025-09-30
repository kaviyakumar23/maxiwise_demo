import GetStarted from "../../../components/common/GetStarted"
import A_Element from "../../../assets/images/3D_A.png"
import Blocks from "../../../assets/images/blocks.png"

const Section_3 = () => {
    return (
        <div className="bg-navy min-h-screen relative overflow-hidden">
            {/* Main content container */}
            <div className="h-screen flex">
                {/* Left content section - positioned lower than center */}
                <div className="w-1/2 pl-16 z-20 flex flex-col justify-center pt-32">
                    <div className="font-outfit font-medium text-7xl text-purple leading-tight mb-8">
                        <h1 className="mb-2">Built for</h1>
                        <h1>Everyone</h1>
                    </div>
                    <div className="font-outfit font-normal text-xl text-white mb-8 leading-relaxed max-w-lg">
                        <p>Whether you're a first-time investor or an evolved one,</p>
                        <p>Maxiwise makes complex decisions simple.</p>
                    </div>
                    <GetStarted />
                </div>
                
                {/* Right side - empty for absolute positioning */}
                <div className="w-1/2 relative">
                </div>
            </div>
            
            {/* Background Blocks - larger and positioned at bottom-right area */}
            <div className="absolute bottom-0 right-0 z-5" style={{ width: '600px', height: '500px' }}>
                <img 
                    src={Blocks} 
                    alt="3D Blocks" 
                    className="w-full h-full object-contain opacity-90"
                />
            </div>
            
            {/* 3D "A" Element - positioned to overlap center, above blocks */}
            <div className="absolute top-1/2 left-[55%] transform -translate-x-1/2 -translate-y-1/2 z-15">
                <img 
                    src={A_Element} 
                    alt="3D A Element" 
                    className="w-auto h-[450px] object-contain"
                />
            </div>
        </div>
    )
}

export default Section_3