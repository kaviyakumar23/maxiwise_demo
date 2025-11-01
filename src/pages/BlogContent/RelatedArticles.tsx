import { Link } from "@tanstack/react-router";
import { getRelatedArticles } from "../../data/blogData";

interface RelatedArticlesProps {
    currentArticleId: string;
}

const RelatedArticles = ({ currentArticleId }: RelatedArticlesProps) => {
    const articles = getRelatedArticles(currentArticleId, 3);

    return (
        <div className="bg-white py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-12">
                    <h2 className="font-outfit text-navy font-medium text-lg sm:text-2xl md:text-3xl leading-[22px] tracking-[-0.6px]">
                        Related articles
                    </h2>
                    <Link to="/blogs">
                        <button className="border border-navy text-navy font-outfit font-medium text-sm sm:text-base px-6 py-3 rounded-full hover:bg-navy hover:text-white transition-all duration-300">
                            Browse all articles
                        </button>
                    </Link>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <Link 
                            key={article.id} 
                            to="/blogs/$blogId" 
                            params={{ blogId: article.id }}
                            className="group block"
                        >
                            {/* Image Placeholder */}
                            <div className="bg-black rounded-3xl h-[280px] sm:h-[320px] mb-6 transition-transform group-hover:scale-[1.02]"></div>
                            
                            {/* Title */}
                            <h3 className="font-outfit text-navy font-medium text-xl leading-tight mb-4">
                                {article.title}
                            </h3>
                            
                            {/* Category and Date */}
                            <div className="flex items-center gap-3">
                                <span className="bg-[#E8D8FF] text-navy font-outfit font-medium text-sm px-4 py-2 rounded-full">
                                    {article.category}
                                </span>
                                <span className="text-navy font-outfit font-normal text-base">
                                    {article.date}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedArticles;

