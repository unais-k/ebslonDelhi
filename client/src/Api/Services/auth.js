import { AxiosURL } from "./../baseUrl.js";

export const LoginAPI = async (data) => {
    try {
        const response = AxiosURL.post("/login", data);
        return response;
    } catch (error) {
        console.log(error?.message);
        return error?.response;
    }
};

export const RegisterAPI = async (data) => {
    try {
        const response = AxiosURL.post("/register", data);
        return response;
    } catch (error) {
        console.log(error?.message);
        return error?.response;
    }
};
