import { useParams } from "react-router-dom";
import { SingleBlog } from "../Api/Services/blog";
import { useEffect, useState } from "react";

function BlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState();
    const getDocDetails = async () => {
        const response = await SingleBlog(id);
        console.log(response.data);
    };
    useEffect(() => {
        getDocDetails();
    }, []);
    return (
        <div>
            <h1>hey</h1>
        </div>
    );
}

export default BlogPage;
