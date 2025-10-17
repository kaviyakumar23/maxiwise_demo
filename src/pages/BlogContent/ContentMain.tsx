import Header from "../../components/common/Header"
import Contents from "./Contents"
import SingleBlog from "./SingleBlog"
import Join_Now from "../Blogs/Join_Now"
import Footer from "../landing/components/Footer"
import RelatedArticles from "./RelatedArticles"

export const ContentMain = () => {
    return (
        <>
            <Header fixedStyle="light" />
            <div className="mx-auto px-4 sm:px-6 pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 lg:pb-16">
                <Contents/>
            </div>
            <SingleBlog />
            <RelatedArticles />
            <Join_Now />
            <Footer />
        </>
    )
}

