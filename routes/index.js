import express from "express";

import authRoutes from "./authRouter.js";
import contactsRoutes from "./contactsRouter.js";

const router = express.Router();

router.use("/users", authRoutes);
router.use("/contacts", contactsRoutes);

export default router;
