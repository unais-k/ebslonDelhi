import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "../assets/style";
import { useSelector } from "react-redux";
import Editor from "./Editor";
import Button from "./Button";
import { EditBlogAPI, SingleBlog } from "../Api/Services/blog";
import { message } from "antd";

function EditBlog() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");

    const navigate = useNavigate();
    const token = useSelector((state) => state.userLogin.token);

    const { id } = useParams();
    const getDocDetails = async () => {
        const response = await SingleBlog(id);
        const dataDoc = response.data.result;
        setTitle(dataDoc.title);
        setSummary(dataDoc.summary);
        setContent(dataDoc.content);
        setFiles(dataDoc.cover);
    };
    useEffect(() => {
        getDocDetails();
    }, []);

    const base64 = (img) => {
        let reader = new FileReader();
        reader.readAsDataURL(img.target.files[0]);
        reader.onload = () => {
            setFiles(reader.result);
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        const response = await EditBlogAPI(
            { title: title, summary: summary, content: content, files: files, id: id },
            token
        );
        if (response.status === 200) {
            message.success("blog updated");
            navigate("/");
        } else {
            message.warning("something went wrong");
            setContent("");
            setFiles("");
            setSummary("");
            setTitle("");
        }
    };
    return (
        <div className="w-full overflow-hidden">
            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            <div className="flex flex-col mb-10 mt-10 items-center justify-center sm:px-16 px-6 my-auto max-h-[1600px]">
                <form onSubmit={handleEdit} className="max-w-[900px] mx-auto">
                    <label className="text-md font-[500] font-poppins">Title</label>
                    <input
                        type="title"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-5 w-full px-3 py-2 border-2 border-solid rounded-sm"
                    />
                    <label className="text-md font-[500] font-poppins">Summary</label>
                    <input
                        type="text"
                        value={summary}
                        placeholder="Summary"
                        onChange={(e) => setSummary(e.target.value)}
                        className="mb-5 w-full px-3 py-2 border-2 border-solid rounded-sm"
                    />
                    <label className="text-md font-[500] font-poppins">Image Preview</label>
                    <div className="flex justify-center items-center mb-5">
                        <img className="max-h-[300px] object-contain overflow-hidden" src={files} alt="" />
                    </div>
                    <input
                        type="file"
                        onChange={base64}
                        acceptedFiles=".jpg,.jpeg,.png"
                        className="mb-5 w-full px-3 py-2 border-2 border-solid rounded-sm"
                    />
                    <label className="text-md font-[500] font-poppins">Content</label>

                    <Editor value={content} onChange={setContent} />

                    <Button title={"Update post"} />
                </form>
            </div>
        </div>
    );
}

export default EditBlog;
