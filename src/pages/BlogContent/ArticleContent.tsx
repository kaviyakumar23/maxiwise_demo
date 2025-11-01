import Bad from "../../assets/images/Bad.svg"
import Neutral from "../../assets/images/Neutral.svg"
import Great from "../../assets/images/Great.svg"
import type { BlogArticle } from "../../data/blogData"

interface ArticleContentProps {
    article: BlogArticle;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
    return (
        <div id="blog-content" className="container mx-auto px-4 py-8 md:py-12 lg:py-16 font-outfit max-w-7xl">
            {/* Introduction Section */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-navy mb-6 md:mb-8 leading-tight lg:leading-[60px] tracking-[-1.4px]">
                Introduction
            </h2>
            
            <p className="text-gray text-base md:text-lg font-normal leading-relaxed md:leading-[27px] mb-6 md:mb-8">
                {article.content.introduction}
            </p>

            {/* Content Sections */}
            {article.content.sections.map((section, index) => (
                <div key={index} className="mb-6 md:mb-8">
                    <h3 className="text-xl md:text-2xl font-medium text-navy mb-3 md:mb-4 leading-tight md:leading-[30px] tracking-[-0.6px]">
                        {section.heading}
                    </h3>
                    
                    <p className="text-gray font-normal text-base md:text-lg leading-relaxed md:leading-[27px] mb-4 md:mb-6">
                        {section.content}
                    </p>

                    {/* Bullet Points if available */}
                    {section.bullets && section.bullets.length > 0 && (
                        <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6 text-gray font-normal text-base md:text-lg leading-relaxed md:leading-[27px]">
                            {section.bullets.map((bullet, bulletIndex) => (
                                <li key={bulletIndex} className="flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}

            {/* Quote Block */}
            {article.content.quote && (
                <div className="bg-[#E8D8FF] rounded-2xl p-5 md:p-8 mb-6 md:mb-8">
                    <p className="text-navy text-lg md:text-2xl font-medium leading-relaxed md:leading-[30px]">
                        "{article.content.quote}"
                    </p>
                </div>
            )}

            {/* Conclusion */}
            {article.content.conclusion && (
                <>
                    <h3 className="text-xl md:text-2xl font-medium text-navy mb-3 md:mb-4 leading-tight md:leading-[30px] tracking-[-0.6px]">
                        Conclusion
                    </h3>
                    <p className="text-gray font-normal text-base md:text-lg leading-relaxed md:leading-[27px] mb-12 md:mb-16">
                        {article.content.conclusion}
                    </p>
                </>
            )}

            {/* Article Rating Section */}
            <div className="flex flex-col items-center text-center py-8 md:py-12">
                <h3 className="text-xl md:text-2xl lg:text-lg font-bold text-[#1F2937] mb-8 md:mb-10">
                    How would you rate this article?
                </h3>
                
                <div className="flex items-center justify-between w-full max-w-xl md:max-w-2xl lg:max-w-3xl px-4">
                    {/* Bad Rating */}
                    <button className="flex flex-col items-center gap-3 md:gap-4 group cursor-pointer transition-all hover:scale-110">
                        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                            <img src={Bad} alt="Bad" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-navy text-sm md:text-base font-normal">Bad</span>
                    </button>

                    {/* Neutral Rating */}
                    <button className="flex flex-col items-center gap-3 md:gap-4 group cursor-pointer transition-all hover:scale-110">
                        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                            <img src={Neutral} alt="Neutral" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-navy text-sm md:text-base font-normal">Neutral</span>
                    </button>

                    {/* Great Rating */}
                    <button className="flex flex-col items-center gap-3 md:gap-4 group cursor-pointer transition-all hover:scale-110">
                        <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                            <img src={Great} alt="Great" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-navy text-sm md:text-base font-normal">Great</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ArticleContent