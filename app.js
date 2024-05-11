import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import cors from "cors";

const { PORT = 3000 } = process.env;

const DB_URI = process.env.DB_URI;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
