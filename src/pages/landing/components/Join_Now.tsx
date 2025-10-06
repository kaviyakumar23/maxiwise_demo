import Star from "../../../assets/images/Star.png"
import Join_now_bg from "../../../assets/images/Join_now_bg.png"
import GetStarted from "../../../components/common/GetStarted"

const Join_Now = () => {
    return (
        <div className="h-[400px] sm:h-[500px] lg:h-[600px] bg-cover bg-center relative flex justify-center items-center px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${Join_now_bg})` }}>
            <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 max-w-4xl mx-auto">
                {/* JOIN NOW section */}
                <div className="flex items-center gap-2">
                    <img src={Star} alt="Star" className="w-3 h-3 sm:w-4 sm:h-4" />
                    <p className="font-outfit font-medium text-xs sm:text-sm text-white leading-[16px] sm:leading-[19.6px] tracking-[-0.36px] sm:tracking-[-0.42px]">JOIN NOW</p>
                </div>
                
                {/* Main heading */}
                <h1 className="font-outfit font-medium text-white text-center text-[28px] sm:text-[40px] lg:text-[56px] leading-[32px] sm:leading-[44px] lg:leading-[61.6px] tracking-[-0.84px] sm:tracking-[-1.2px] lg:tracking-[-1.68px] px-2">
                    Your Decision Lens
                </h1>
                
                {/* Description text */}
                <div className="text-center px-2 sm:px-4">
                    <p className="font-outfit font-normal text-center text-[14px] sm:text-[18px] lg:text-[22px] text-white leading-[20px] sm:leading-[25.2px] lg:leading-[30.8px] tracking-[-0.2px] sm:tracking-[-0.26px] lg:tracking-[-0.32px]">
                        Maxiwise is designed to simplify investing so you <br /> can focus on living the life you want.        
                    </p>
                </div>
                
                {/* Get Started button */}
                <div className="flex justify-center w-full sm:w-auto">
                    <GetStarted className="w-full sm:w-auto min-w-[200px] sm:min-w-[240px]" />
                </div>
            </div>
        </div>
    )
}

export default Join_Now