import React, { useState } from "react";
import Button from "./Button";
import { LoginAPI } from "./../Api/Services/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import styles from "../assets/style";
import { message } from "antd";
import { setLogin } from "../Constants/userStore";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const setErrorMessage = (msg) => {
        setErrMsg(msg);
        setTimeout(() => {
            setErrMsg("");
        }, 3000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === "" || password === "") {
            setErrorMessage("All fields are required.");
            return;
        }
        if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
            setErrorMessage("Invalid email address.");
            return;
        }
        if (password.length < 8) {
            setErrorMessage("Password strength is at least 8");
            return;
        }
        const response = await LoginAPI({ email: username, password: password });
        try {
            if (response.status === 201) {
                const result = response.data;
                message.success(`welcome ${result.dispatch.name}`);
                dispatch(setLogin(result?.dispatch));
                navigate("/");
            } else {
                setUsername("");
                setPassword("");
                setErrorMessage(response.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="w-full overflow-hidden">
                <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center sm:px-16 px-6 my-auto h-[400px]">
                    <form onSubmit={handleLogin} className="max-w-[400px] mx-auto">
                        <h1 className="text-center font-poppins text-black font-semibold xs:text-[48px] text-[40px] xs:leading-[76.8px] leading-[66.8px] w-full">
                            Login
                        </h1>
                        <input
                            type="text"
                            value={username}
                            placeholder="email"
                            onChange={(e) => setUsername(e.target.value)}
                            className="mb-5 w-full px-3 py-2 border-2 border-solid rounded-sm"
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-5 w-full px-3 py-2 border-2 border-solid rounded-sm"
                        />
                        {errMsg ? <div className="text-red-600 font-semibold text-sm">{errMsg}</div> : ""}
                        <Button title={"Login"} />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
