import express from "express";
import { getAvatar, uploadAvatar } from "../controllers/userControllers.js";
import uploadMiddleware from "../helpers/upload.js";

const router = express.Router();

router.patch("/avatar", uploadMiddleware.single("avatar"), uploadAvatar);
router.get("/avatar", getAvatar);

export default router;
