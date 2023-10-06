import { Link, useParams } from "react-router-dom";
import { SingleBlog } from "../Api/Services/blog";
import { useEffect, useState } from "react";
import { formatISO9075 } from "date-fns";
import { useSelector } from "react-redux";
import styles from "../assets/style";
import Navbar from "./Navbar";

function BlogPage() {
    const { id } = useParams();
    const userId = useSelector((state) => state.userLogin.id);
    const [blog, setBlog] = useState();
    const getDocDetails = async () => {
        const response = await SingleBlog(id);
        setBlog(response.data.result);
    };
    useEffect(() => {
        getDocDetails();
    }, []);
    return (
        <>
            <div className="w-full overflow-hidden">
                <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar />
                    </div>
                </div>
                <div className={`mt-5 ${styles.flexStart}  ${styles.paddingX}`}>
                    <div className={`${styles.boxWidth}`}>
                        <div className="postPage">
                            <h1 className="text-center font-[500] text-[3rem]">{blog?.title}</h1>
                            <div className="flex flex-col gap-2 w-full justify-center mb-4 items-center">
                                <time>
                                    {blog?.createdAt ? (
                                        <span className="text-gray-400 text-sm font-semibold">
                                            {formatISO9075(new Date(blog.createdAt))}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </time>
                                <div className="text-primary font-semibold text-sm">by @ {blog?.author?.name}</div>
                            </div>
                            <div className="flex justify-center my-4 text-white">
                                {userId == blog?.author?._id && (
                                    <Link to={`/edit/${blog?._id}`}>
                                        <div className="flex justify-between items-center rounded-lg flex-row gap-2 px-3 py-3 bg-gray-800">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                />
                                            </svg>
                                            <span>Edit this post</span>
                                        </div>
                                    </Link>
                                )}
                            </div>
                            <div className="image mb-5">
                                <img
                                    className="object-contain w-full flex overflow-hidden max-h-[400px]"
                                    src={blog?.cover}
                                    alt="Photo"
                                />
                            </div>
                            <div className="flex w-full justify-center items-center">
                                <div className="sm:w-[75%] w-full" dangerouslySetInnerHTML={{ __html: blog?.content }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogPage;
