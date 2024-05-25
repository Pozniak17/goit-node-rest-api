import express from "express";
import authRoutes from "./authRouter.js";
import contactsRoutes from "./contactsRouter.js";
import authMiddleware from "../middleware/auth.js";
import userRoutes from "./usersRouter.js";

const router = express.Router();

// router.use("/users", authRoutes);
router.use("/auth", authRoutes);

router.use("/contacts", authMiddleware, contactsRoutes);

router.use("/users", authMiddleware, userRoutes);

export default router;
