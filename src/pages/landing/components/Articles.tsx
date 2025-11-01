import { Link } from "@tanstack/react-router"
import RightArrow from "../../../assets/images/RightArrow.png"
import { blogArticles } from "../../../data/blogData"

const Articles = () => {
    // Get first 4 articles for the featured section
    const featuredArticles = blogArticles.slice(0, 4)

    return (
        <div className="px-4 sm:px-6 lg:px-8" id="blog">
            {/* Responsive heading */}
            <div className="font-outfit font-medium text-navy text-center pt-12 sm:pt-20 lg:pt-30">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] leading-tight sm:leading-[1.2] lg:leading-[61.6px] tracking-[-0.5px] lg:tracking-[-1px]">
                    Decisions that matter
                </h1>
            </div>
            
            {/* Responsive description */}
            <div className="font-outfit font-normal text-sm sm:text-base lg:text-lg text-[#4B5563] text-center py-4 sm:py-6 leading-relaxed sm:leading-[26.4px] tracking-[0.35px] max-w-2xl mx-auto">
                <p>Simplifying everything that makes investing intimidating</p>
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
                        {featuredArticles.map((article) => (
                            <Link 
                                key={article.id} 
                                to="/blogs/$blogId" 
                                params={{ blogId: article.id }}
                                className="min-w-[350px] flex-shrink-0 hover:opacity-80 transition-opacity"
                            >
                                <h3 className="text-black font-light text-base leading-tight mb-2">
                                    {article.category}
                                </h3>
                                <h1 className="text-black font-medium text-xl leading-tight">
                                    {article.title}
                                </h1>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Articles