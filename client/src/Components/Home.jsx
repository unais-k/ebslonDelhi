import { useEffect, useState } from "react";
import styles from "../assets/style";
import Navbar from "./Navbar";
import Post from "./Post";
import { GetAllBlog } from "../Api/Services/blog";
import Loader from "./Loader";

function Home() {
    const [blog, setBlog] = useState();
    const [loader, setLoader] = useState(false);
    const getAllBlogAPICall = async () => {
        setLoader(true);
        const response = await GetAllBlog();
        if (response.status === 202) {
            const data = response.data;
            setBlog(data.result);
            setLoader(false);
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
                {loader && <Loader />}
                <div className={`${styles.boxWidth}`}>
                    {blog?.length > 0 && blog.map((post, index) => <Post key={index} {...post} />)}
                </div>
            </div>
        </div>
    );
}

export default Home;
