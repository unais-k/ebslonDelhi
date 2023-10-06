import { AxiosURL } from "../baseUrl";

export const BlogCreate = async (data, token) => {
    console.log(data, token);
    try {
        const response = AxiosURL.post("/create-blog", data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error?.message);
        return error?.response;
    }
};

export const GetAllBlog = async () => {
    try {
        const response = AxiosURL.get("/");
        return response;
    } catch (error) {
        console.log(error?.message);
        return error?.response;
    }
};

export const SingleBlog = async (id) => {
    try {
        const response = AxiosURL.get(`/blog/${id}`);
        return response;
    } catch (error) {
        console.log(error?.message);
        return error?.response;
    }
};

export const EditBlogAPI = async (data, token) => {
    try {
        const response = AxiosURL.put(`/edit`, data, {
            headers: { Authorization: "Bearer " + token },
        });
        return response;
    } catch (error) {
        console.log(error?.message);
        return error?.response;
    }
};
