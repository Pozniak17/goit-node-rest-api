import express from "express";
import AuthController from "../controllers/authControllers.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

const jsonParser = express.json();

router.post("/register", jsonParser, AuthController.register);

router.post("/login", jsonParser, AuthController.login);

router.get("/logout", authMiddleware, AuthController.logout);

router.get("/current", authMiddleware, AuthController.current);

router.patch("/", authMiddleware, AuthController.updSubscription);

export default router;
