import express from "express";

const router = express.Router();

router.post("/register", AuthContoller.register);

export default router;
