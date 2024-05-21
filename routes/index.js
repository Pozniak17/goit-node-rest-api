import express from "express";
import authRoutes from "./authRouter.js";
import contactsRoutes from "./contactsRouter.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use("/users", authRoutes);

router.use("/contacts", authMiddleware, contactsRoutes);

export default router;
