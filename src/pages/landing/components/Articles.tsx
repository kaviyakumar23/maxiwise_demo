import RightArrow from "../../../assets/images/RightArrow.png"
const Articles = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8" id="blog">
            {/* Responsive heading */}
            <div className="font-outfit font-medium text-navy text-center pt-12 sm:pt-20 lg:pt-30">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] leading-tight sm:leading-[1.2] lg:leading-[61.6px] tracking-[-0.5px] lg:tracking-[-1px]">
                    Gain valuable insights
                </h1>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] leading-tight sm:leading-[1.2] lg:leading-[61.6px] tracking-[-0.5px] lg:tracking-[-1px]">
                    from our latest news
                </h1>
            </div>
            
            {/* Responsive description */}
            <div className="font-outfit font-normal text-sm sm:text-base lg:text-lg text-[#4B5563] text-center py-4 sm:py-6 leading-relaxed sm:leading-[26.4px] tracking-[0.35px] max-w-2xl mx-auto">
                <p>Dive into our curated feed for the freshest insights</p>
                <p>and essential industry developments.</p>
            </div>
            
            {/* Read All Articles link */}
            <div className="flex justify-center mb-6 sm:mb-8">
                <a href="#" className="font-outfit font-medium text-sm sm:text-base text-[#101828] hover:underline inline-flex items-center gap-2 leading-[20.8px] tracking-[0.48px]">
                    Read All Articles
                    <img src={RightArrow} alt="RightArrow" className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
            </div>
            <div className="w-full mt-8">
                <div className="w-full bg-white py-8">
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {/* Article Card 1 */}
                        <div className="bg-gradient-to-b from-gray-700 to-black rounded-lg p-8 min-w-[400px] flex-shrink-0 h-[280px] flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-white text-sm">Insight</span>
                            </div>
                            <h3 className="text-white font-light text-base leading-tight">The Role of User Feedback in SaaS Product</h3>
                        </div>

                        {/* Article Card 2 */}
                        <div className="bg-gradient-to-b from-gray-700 to-black rounded-lg p-8 min-w-[400px] flex-shrink-0 h-[280px] flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-white text-sm">Technology</span>
                            </div>
                            <h3 className="text-white font-light text-base leading-tight">The Future of Application Design and Development</h3>
                        </div>

                        {/* Article Card 3 */}
                        <div className="bg-gradient-to-b from-gray-700 to-black rounded-lg p-8 min-w-[400px] flex-shrink-0 h-[280px] flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-white text-sm">News</span>
                            </div>
                            <h3 className="text-white font-light text-base leading-tight">Effective Marketing Strategies for Apps in 2025</h3>
                        </div>
                        <div className="bg-gradient-to-b from-gray-700 to-black rounded-lg p-8 min-w-[400px] flex-shrink-0 h-[280px] flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-white text-sm">News</span>
                            </div>
                            <h3 className="text-white font-light text-base leading-tight">Effective Marketing Strategies for Apps in 2025</h3>
                        </div>
                        <div className="bg-gradient-to-b from-gray-700 to-black rounded-lg p-8 min-w-[400px] flex-shrink-0 h-[280px] flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-white text-sm">News</span>
                            </div>
                            <h3 className="text-white font-light text-base leading-tight">Effective Marketing Strategies for Apps in 2025</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Articles