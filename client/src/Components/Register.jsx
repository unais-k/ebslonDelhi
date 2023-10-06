import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterAPI } from "../Api/Services/auth";
import Navbar from "./Navbar";
import styles from "../assets/style";
import Button from "./Button";
import { message } from "antd";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();
    const setErrorMessage = (msg) => {
        setErrMsg(msg);
        setTimeout(() => {
            setErrMsg("");
        }, 3000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email === "" || password === "" || phone === "" || username === "") {
            setErrorMessage("All fields are required.");
            return;
        }
        if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setErrorMessage("Invalid email address.");
            return;
        }
        if (!/^\d{10}$/.test(phone)) {
            setErrorMessage("Invalid phone.");
            return;
        }
        // if (password.length < 8) {
        //     setErrorMessage("Password strength is at least 8");
        //     return;
        // }
        const response = await RegisterAPI({ email: email, username: username, password: password, phone: phone });
        try {
            if (response.status === 201) {
                message.success("register success");
                navigate("/login");
            } else {
                setPassword("");
                setUsername("");
                setEmail("");
                setPhone("");
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
                            Register
                        </h1>
                        <input
                            type="text"
                            value={username}
                            placeholder="name"
                            onChange={(e) => setUsername(e.target.value)}
                            className="mb-5 w-full px-3 py-2 border-2 border-solid rounded-sm"
                        />
                        <input
                            type="text"
                            value={email}
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-5 w-full px-3 py-2 border-2 border-solid rounded-sm"
                        />
                        <input
                            type="text"
                            value={phone}
                            placeholder="phone"
                            onChange={(e) => setPhone(e.target.value)}
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
                        <Button title={"Register"} />
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
