import { useEffect, useState } from "react";
import styles from "../assets/style";
import Navbar from "./Navbar";
import Post from "./Post";
import { GetAllBlog } from "../Api/Services/blog";

function Home() {
    const [blog, setBlog] = useState();
    const getAllBlogAPICall = async () => {
        const response = await GetAllBlog();
        if (response.status === 202) {
            const data = response.data;
            setBlog(data.result);
        } else {
            console.log("No blog");
        }
    };
    useEffect(() => {
        getAllBlogAPICall();
    }, []);
    return (
        <div className="w-full overflow-hidden">
            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            <div className={`mt-5 ${styles.flexStart}  ${styles.paddingX}`}>
                <div className={`${styles.boxWidth}`}>
                    {blog?.length > 0 && blog.map((post, index) => <Post key={index} {...post} />)}
                </div>
            </div>
        </div>
    );
}

export default Home;
