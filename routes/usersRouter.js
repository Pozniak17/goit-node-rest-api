import express from "express";

import userControllers from "../controllers/userControllers.js";

const router = express.Router();

router.patch("/avatar", userControllers.uploadAvatar);

export default router;
