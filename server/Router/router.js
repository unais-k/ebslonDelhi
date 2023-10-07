import express from "express";
import {
    CreateBlog,
    DeleteBlog,
    DownloadBlog,
    EditBlog,
    GetAllBlog,
    GetBlog,
    LoginAPI,
    RegisterAPI,
} from "../Controller/services.js";
import { clientVerifyToken } from "../Middleware/auth.js";
const router = express.Router();

router.get("/", GetAllBlog);
router.get("/blog/:id", GetBlog);
router.get("/download-blog", clientVerifyToken, DownloadBlog);
router.delete("/blog/:id", clientVerifyToken, DeleteBlog);
router.post("/login", LoginAPI);
router.post("/register", RegisterAPI);
router.post("/create-blog", clientVerifyToken, CreateBlog);
router.put("/edit", clientVerifyToken, EditBlog);

export default router;
