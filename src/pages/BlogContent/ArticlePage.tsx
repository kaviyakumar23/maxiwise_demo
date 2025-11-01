import { useEffect } from "react"
import Header from "../../components/common/Header"
import Contents from "./Contents"
import ArticleContent from "./ArticleContent"
import Join_Now from "../Blogs/Join_Now"
import Footer from "../landing/components/Footer"
import RelatedArticles from "./RelatedArticles"
import { getBlogById } from "../../data/blogData"

interface ArticlePageProps {
    blogId: string;
}

export const ArticlePage = ({ blogId }: ArticlePageProps) => {
    const article = getBlogById(blogId);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, [blogId]);

    // If article not found, show error or redirect
    if (!article) {
        return (
            <>
                <Header fixedStyle="light" />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-navy mb-4">Article Not Found</h1>
                        <p className="text-gray mb-6">The article you're looking for doesn't exist.</p>
                        <a href="/blogs" className="text-purple hover:underline">Go back to all articles</a>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header fixedStyle="light" />
            <div className="mx-auto px-0 sm:px-0 pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 lg:pb-16">
                <Contents article={article} />
            </div>
            <ArticleContent article={article} />
            <RelatedArticles currentArticleId={article.id} />
            <Join_Now />
            <Footer />
        </>
    )
}

