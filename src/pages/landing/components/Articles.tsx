import { Link } from "@tanstack/react-router"
import RightArrow from "../../../assets/images/RightArrow.png"
const Articles = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8" id="blog">
            {/* Responsive heading */}
            <div className="font-outfit font-medium text-navy text-center pt-12 sm:pt-20 lg:pt-30">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] leading-tight sm:leading-[1.2] lg:leading-[61.6px] tracking-[-0.5px] lg:tracking-[-1px]">
                    Decisions that matter
                </h1>
                {/* <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] leading-tight sm:leading-[1.2] lg:leading-[61.6px] tracking-[-0.5px] lg:tracking-[-1px]">
                    from our latest news
                </h1> */}
            </div>
            
            {/* Responsive description */}
            <div className="font-outfit font-normal text-sm sm:text-base lg:text-lg text-[#4B5563] text-center py-4 sm:py-6 leading-relaxed sm:leading-[26.4px] tracking-[0.35px] max-w-2xl mx-auto">
                <p>Simplifying everything that</p>
                <p>makes investing intimidating</p>
            </div>
            
            {/* Read All Articles link */}
            <div className="flex justify-center mb-6 sm:mb-8">
                <Link to="/blogs" className="font-outfit font-medium text-sm sm:text-base text-[#101828] hover:underline inline-flex items-center gap-2 leading-[20.8px] tracking-[0.48px]">
                    Read All Articles
                    <img src={RightArrow} alt="RightArrow" className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
            </div>
            <div className="w-full mt-8">
                <div className="w-full bg-white py-8 ml-4">
                    <div className="flex gap-10 overflow-x-auto pb-4">
                        {/* Article Card 1 */}
                        <div className="min-w-[350px] flex-shrink-0">
                            <h3 className="text-black font-light text-base leading-tight mb-2">Perspective</h3>
                            <h1 className="text-black font-medium text-xl leading-tight">How Rich Really Get<br/>Richer?</h1>
                        </div>

                        {/* Article Card 2 */}
                        <div className="min-w-[350px] flex-shrink-0">
                            <h3 className="text-black font-light text-base leading-tight mb-2">Selection</h3>
                            <h1 className="text-black font-medium text-xl leading-tight">Does Expense Ratio Matter?</h1>
                        </div>

                        {/* Article Card 3 */}
                        <div className="min-w-[350px] flex-shrink-0">
                            <h3 className="text-black font-light text-base leading-tight mb-2">Portfolio Management</h3>
                            <h1 className="text-black font-medium text-xl leading-tight">Stay Invested or Exit – How to<br/>Decide?</h1>
                        </div>

                        {/* Article Card 4 */}
                        <div className="min-w-[350px] flex-shrink-0">
                            <h3 className="text-black font-light text-base leading-tight mb-2">Perspective</h3>
                            <h1 className="text-black font-medium text-xl leading-tight">Red Flags in Funds You Should Never<br/>Ignore</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Articles