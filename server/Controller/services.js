import { generateToken } from "./../Middleware/auth.js";
import bcrypt from "bcrypt";
import UserModel from "./../Models/userModel.js";
import BlogModel from "./../Models/blogModel.js";
import mongoose from "mongoose";

export const LoginAPI = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let emailSearch = await UserModel.findOne({ email: email });
        let passwordConfirm = bcrypt.compare(password, password);
        console.log("check done");
        if (emailSearch && passwordConfirm) {
            let token = generateToken({ email: email, phone: emailSearch.phone, name: emailSearch.name });
            console.log(emailSearch);
            res.status(201).json({ dispatch: { name: emailSearch.name, email: email, token: token } });
            console.log("response done");
        } else {
            res.status(400).json({ response: "invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};
export const RegisterAPI = async (req, res, next) => {
    try {
        const { email, username, password, phone } = req.body;
        let emailSearch = await UserModel.findOne({ email: email });
        if (emailSearch) return res.status(400).json({ response: "email already exist" });
        let phoneSearch = await UserModel.findOne({ phone: phone });
        if (phoneSearch) return res.status(400).json({ response: "email already exist" });

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        try {
            const userDoc = await UserModel.create({
                email: email,
                name: username,
                password: hashedPassword,
                phone: phone,
            });
            res.status(201).json({ response: "user created" });
        } catch (error) {
            console.log(error.message);
            console.log("register error");
        }
    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};

export const GetAllBlog = async (req, res, next) => {
    try {
        const response = await BlogModel.find().populate("author");
        res.status(202).json({ result: response });
    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};

export const CreateBlog = async (req, res, next) => {
    try {
        const email = req.user.email;
        const { title, summary, content, files } = req.body;
        const userId = await UserModel.findOne({ email: email });
        const blogDoc = await BlogModel.create({
            author: userId._id,
            title: title,
            summary: summary,
            content: content,
            cover: files,
        });
        res.status(201).json({ response: "blog created" });
    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};
export const EditBlog = async (req, res, next) => {
    try {
        console.log(req.params);
    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};
export const GetBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        let blogId = new mongoose.Types.ObjectId(id);

        const response = await BlogModel.findOne({ _id: blogId }).populate("author");
        console.log(response);
        // res.status(202).json({ result: response });
    } catch (error) {
        console.log(error, "in get blog");
        res.status(500).json({ response: error.message });
    }
};
