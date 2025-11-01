import Vector from "../../assets/images/Vector.svg";
import { Link } from "@tanstack/react-router";
import { blogArticles } from "../../data/blogData";

const BlogGrid = () => {
    // Get featured article (first one) and next 3 for the top section
    const featuredArticle = blogArticles[0];
    const topArticles = blogArticles.slice(1, 4);
    
    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                <h1 className="font-outfit text-navy text-center font-medium text-5xl sm:text-6xl leading-tight tracking-[-1.8px] mb-4">
                    Decisions that matter
                </h1>
                <p className="font-outfit text-[#4B5563] text-center font-normal text-lg leading-[27px] tracking-[-0.54px]">
                    Simplifying everything that makes investing intimidating
                </p>
            </div>

            {/* Grid Layout Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Side - Large Featured Card */}
                    <Link 
                        to="/blogs/$blogId" 
                        params={{ blogId: featuredArticle.id }}
                        className="bg-black rounded-3xl p-8 flex items-end min-h-[600px] lg:min-h-[700px] relative overflow-hidden group cursor-pointer"
                    >
                        <div className="relative z-10 w-full">
                            <div className="bg-white rounded-2xl p-6 transition-transform group-hover:scale-[1.02]">
                                <h3 className="font-outfit text-navy font-medium text-2xl leading-tight mb-4">
                                    {featuredArticle.title}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-[#E8D8FF] text-navy font-outfit font-medium text-sm px-4 py-2 rounded-full">
                                            {featuredArticle.category}
                                        </span>
                                        <span className="text-navy font-outfit font-normal text-base">
                                            {featuredArticle.date}
                                        </span>
                                    </div>
                                    <div className="bg-[#E8D8FF] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#d4c4f0] transition-colors">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 13L13 7M13 7H9M13 7V11" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Right Side - Three Light Purple Cards */}
                    <div className="flex flex-col gap-6">
                        {topArticles.map((article) => (
                            <Link 
                                key={article.id}
                                to="/blogs/$blogId" 
                                params={{ blogId: article.id }}
                                className="bg-[#E8D8FF33] rounded-2xl p-6 flex flex-col justify-between min-h-[220px] group cursor-pointer hover:bg-[#E8D8FF4D] transition-colors"
                            >
                                <div>
                                    <h3 className="font-outfit text-navy font-medium text-xl leading-tight mb-4">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-[#E8D8FF] text-navy font-outfit font-medium text-sm px-4 py-2 rounded-full">
                                            {article.category}
                                        </span>
                                        <span className="text-navy font-outfit font-normal text-base">
                                            {article.date}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="bg-[#E8D8FF] w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#d4c4f0] transition-colors">
                                        <img src={Vector} alt="Vector" className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Latest Posts Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {/* Header with filters */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h2 className="font-outfit text-navy font-medium text-3xl leading-tight">
                        All articles
                    </h2>
                    <div className="flex items-center gap-2 flex-wrap">
                        <button className="bg-[#E8D8FF] text-navy font-outfit font-medium text-sm px-4 py-2 rounded-full hover:bg-[#d4c4f0] transition-colors">
                            All
                        </button>
                        <button className="bg-transparent text-navy font-outfit font-medium text-sm px-4 py-2 rounded-full hover:bg-[#E8D8FF33] transition-colors">
                            Perspective
                        </button>
                        <button className="bg-transparent text-navy font-outfit font-medium text-sm px-4 py-2 rounded-full hover:bg-[#E8D8FF33] transition-colors">
                            Selection
                        </button>
                        <button className="bg-transparent text-navy font-outfit font-medium text-sm px-4 py-2 rounded-full hover:bg-[#E8D8FF33] transition-colors">
                            Methodology
                        </button>
                    </div>
                </div>

                {/* Grid of Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {blogArticles.map((article) => (
                        <Link 
                            key={article.id}
                            to="/blogs/$blogId" 
                            params={{ blogId: article.id }}
                            className="group block"
                        >
                            <div className="bg-navy rounded-3xl h-[320px] mb-4 transition-transform group-hover:scale-[1.02]"></div>
                            <h3 className="font-outfit text-navy font-medium text-xl leading-tight mb-3">
                                {article.title}
                            </h3>
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
    )
}

export default BlogGrid