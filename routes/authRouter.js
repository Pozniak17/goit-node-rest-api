import express from "express";
import {
  current,
  login,
  logout,
  register,
  updSubscription,
} from "../controllers/authControllers.js";
import { authSchema } from "../schemas/users.js";
import validateBody from "../helpers/validateBody.js";

import authMiddleware from "../helpers/auth.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, validateBody(authSchema), register);
router.post("/login", jsonParser, validateBody(authSchema), login);
router.get("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, current);
router.patch("/", authMiddleware, updSubscription);

export default router;
