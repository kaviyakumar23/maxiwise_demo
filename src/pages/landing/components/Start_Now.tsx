import Join_now_bg from "../../../assets/images/Join_now_bg.png"
import GetStarted from "../../../components/common/GetStarted"

const Start_Now = () => {
    return (
        <div className="h-[400px] sm:h-[500px] lg:h-[600px] bg-cover bg-center relative flex justify-center items-center px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${Join_now_bg})` }}>
            <div className="flex flex-col items-center max-w-4xl mx-auto">
                {/* Main heading - Mobile (3 lines) */}
                <div className="block sm:hidden">
                    <h1 className="font-outfit font-medium text-white text-center text-[28px] leading-[140%] tracking-[-1px]">
                        Investing right
                    </h1>
                    <h1 className="font-outfit font-medium text-white text-center text-[28px] leading-[140%] tracking-[-1px]">
                        doesn't have to wait
                    </h1>
                    <h1 className="font-outfit font-medium text-white text-center text-[28px] leading-[140%] tracking-[-1px] mb-4">
                        till tomorrow
                    </h1>
                </div>
                
                {/* Main heading - Tablet & Desktop (2 lines) */}
                <div className="hidden sm:block">
                    <h1 className="font-outfit font-medium text-white text-center text-[40px] lg:text-[56px] leading-[140%] tracking-[-1px]">
                        Investing right doesn't have
                    </h1>
                    <h1 className="font-outfit font-medium text-white text-center text-[40px] lg:text-[56px] leading-[140%] tracking-[-1px] mb-4">
                        to wait till tomorrow
                    </h1>
                </div>
                
                {/* Get Started button */}
                <div className="flex justify-center w-full sm:w-auto py-4">
                    <GetStarted className="w-auto px-8 sm:min-w-[240px]">Start Now</GetStarted>
                </div>
            </div>
        </div>
    )
}

export default Start_Now