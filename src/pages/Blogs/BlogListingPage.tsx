import { useEffect } from "react"
import Header from "../../components/common/Header"
import BlogGrid from "./BlogGrid"
import Join_Now from "./Join_Now"
import Footer from "../landing/components/Footer"

export const BlogListingPage = () => {
    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header fixedStyle="light" />
            <BlogGrid />
            <Join_Now />
            <Footer />
        </>
    )
}