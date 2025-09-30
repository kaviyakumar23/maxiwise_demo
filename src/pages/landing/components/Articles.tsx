import RightArrow from "../../../assets/images/RightArrow.png"
const Articles = () => {
    return (
        <div>
        <div className="font-outfit font-medium text-navy text-center pt-30 text-[56px] leading-[61.6px] tracking-[-1px]">
                <h1>Gain valuable insights</h1>
                <h1>from our latest news</h1>
        </div>
        <div className="font-outfit font-normal text-lg text-[#4B5563] text-center py-6 leading-[26.4px] tracking-[0.35px]">
            <p>Dive into our curated feed for the freshest insights</p>
            <p>and essential industry developments.</p>
        </div>
        <div className="flex justify-center">
    <a href="#" className="font-outfit font-medium text-base text-[#101828] hover:underline inline-flex items-center gap-2 leading-[20.8px] tracking-[0.48px]">
        Read All Articles
        <img src={RightArrow} alt="RightArrow" className="w-4 h-4" />
    </a>
</div>
<div className="flex mt-8">
                
                {/* Right scrollable area */}
                <div className="w-2/3 bg-white p-8">
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {/* Article Card 1 */}
                        <div className="bg-gradient-to-b from-gray-700 to-black rounded-lg p-6 min-w-[300px] flex-shrink-0">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-white text-sm">Insight</span>
                            </div>
                            <h3 className="text-white font-medium">The Role of User Feedback in SaaS Product</h3>
                        </div>
                        
                        {/* Article Card 2 */}
                        <div className="bg-gradient-to-b from-gray-700 to-black rounded-lg p-6 min-w-[300px] flex-shrink-0">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-white text-sm">Technology</span>
                            </div>
                            <h3 className="text-white font-medium">The Future of Application Design and Development</h3>
                        </div>
                        
                        {/* Article Card 3 */}
                        <div className="bg-gradient-to-b from-gray-700 to-black rounded-lg p-6 min-w-[300px] flex-shrink-0">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-white text-sm">News</span>
                            </div>
                            <h3 className="text-white font-medium">Effective Marketing Strategies for Apps in 2025</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Articles