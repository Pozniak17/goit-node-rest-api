import express from "express";
import {
  getAvatar,
  resendVerification,
  uploadAvatar,
  verify,
} from "../controllers/userControllers.js";
import uploadMiddleware from "../helpers/upload.js";
import authMiddleware from "../helpers/auth.js";

const router = express.Router();

router.patch(
  "/avatar",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  uploadAvatar
);
router.get("/avatar", authMiddleware, getAvatar);
router.get("/verify/:verificationToken", verify);
router.post("/verify", resendVerification);

export default router;
