import express from "express";
import { uploadAvatar } from "../controllers/userControllers.js";
import uploadMiddleware from "../helpers/upload.js";

const router = express.Router();

router.patch("/avatar", uploadMiddleware.single("avatar"), uploadAvatar);

export default router;
