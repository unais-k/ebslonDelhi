import { generateToken } from "./../Middleware/auth.js";
import bcrypt from "bcrypt";
import UserModel from "./../Models/userModel.js";
import BlogModel from "./../Models/blogModel.js";
import mongoose from "mongoose";
import { Parser } from "json2csv";

export const LoginAPI = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let emailSearch = await UserModel.findOne({ email: email });
        let passwordConfirm = bcrypt.compare(password, password);
        console.log("check done");
        if (emailSearch && passwordConfirm) {
            let token = generateToken({ email: email, phone: emailSearch.phone, name: emailSearch.name });
            console.log(emailSearch);
            res.status(201).json({ dispatch: { name: emailSearch.name, email: email, token: token, id: emailSearch._id } });
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
        const { id, summary, title, files, content } = req.body;
        let blogId = new mongoose.Types.ObjectId(id);
        const userId = await UserModel.findOne({ email: req.user.email });
        const response = await BlogModel.updateMany(
            { _id: blogId },
            { $set: { title: title, cover: files, summary: summary, content: content, author: userId._id } }
        );
        res.status(200).json({ response: "updated" });
    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};

export const GetBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        let blogId = new mongoose.Types.ObjectId(id);
        const response = await BlogModel.findOne({ _id: blogId }).populate("author");
        res.status(202).json({ result: response });
    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};

export const DeleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        let blogId = new mongoose.Types.ObjectId(id);
        const response = await BlogModel.deleteOne({ _id: blogId });
        res.status(202).json({ response: "blog deleted" });
    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};

const decodeImage = async (image) => {
    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

    // Decode base64 to binary data
    const binaryImageData = Buffer.from(base64Image, "base64");

    // Save the binary image data to a file (e.g., based on the document's _id)
    const filename = `${_id}.jpg`; // You can customize the file extension
    fs.writeFileSync(filename, binaryImageData);
};

export const DownloadBlog = async (req, res, next) => {
    try {
        const userData = await BlogModel.find({}).populate("author");
        const csvParserData = [];
        userData.forEach((user) => {
            const { id, title, summary, content, cover } = user;
            csvParserData.push({ id, title, summary, content, cover });
        });
        const csvFields = ["Id", "Title", "Summary", "Content", "Cover"];
        const csvParser = new Parser({ csvFields });
        const csvData = csvParser.parse(csvParserData);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attatchment: filename=blogData.csv");
        res.send(csvData);
    } catch (error) {
        res.status(500).json({ response: error.message });
    }
};
