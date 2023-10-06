import express from "express";
import { CreateBlog, EditBlog, GetAllBlog, GetBlog, LoginAPI, RegisterAPI } from "../Controller/services.js";
import { clientVerifyToken } from "../Middleware/auth.js";
const router = express.Router();

router.get("/", GetAllBlog);
router.get("/blog/:id", GetBlog);
router.post("/login", LoginAPI);
router.post("/register", RegisterAPI);
router.post("/create-blog", clientVerifyToken, CreateBlog);
router.put("/edit", clientVerifyToken, EditBlog);

export default router;
