import express from "express";

import authRoutes from "./authRouter.js";
import contactsRoutes from "./contactsRouter.js";
import userRoutes from "./usersRouter.js";

import authMiddleware from "../helpers/auth.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/contacts", authMiddleware, contactsRoutes);
router.use("/users", userRoutes);

export default router;
