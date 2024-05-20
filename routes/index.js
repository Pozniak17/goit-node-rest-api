import express from "express";

import authMiddleware from "../middleware/auth.js";
import authRoutes from "./authRouter.js";
import contactsRoutes from "./contactsRouter.js";

const router = express.Router();

router.use("/users", authRoutes);
router.use("/contacts", authMiddleware, contactsRoutes);

export default router;
