import Star from "../../../assets/images/Star.png"
import Join_now_bg from "../../../assets/images/Join_now_bg.png"
import GetStarted from "../../../components/common/GetStarted"

const Join_Now = () => {
    return (
        <div className="h-[600px] bg-cover bg-center relative flex justify-center items-center" style={{ backgroundImage: `url(${Join_now_bg})` }}>
            <div className="flex flex-col items-center gap-8">
                {/* JOIN NOW section */}
                <div className="flex items-center gap-2">
                    <img src={Star} alt="Star" className="w-4 h-4" />
                    <p className="font-outfit font-medium text-sm text-white leading-[19.6px] tracking-[-0.42px]">JOIN NOW</p>
                </div>
                
                {/* Main heading */}
                <h1 className="font-outfit font-medium text-white text-center text-[56px] leading-[61.6px] tracking-[-1.68px]">Your Decision Lens</h1>
                
                {/* Description text */}
                <div className="text-center">
                    <p className="font-outfit font-normal text-[22px] text-white leading-[30.8px] tracking-[-0.32px]">Maxiwise is designed to simplify investing so you can focus on</p>
                    <p className="font-outfit font-normal text-[22px] text-white leading-[30.8px] tracking-[-0.32px]">living the life you want.</p>
                </div>
                
                {/* Get Started button */}
                <div className="flex justify-center">
                <GetStarted />
                </div>
            </div>
        </div>
    )
}

export default Join_Now