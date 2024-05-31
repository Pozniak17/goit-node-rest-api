import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "./db.js";
import routes from "./routes/index.js";
import path from "node:path";

const message = {
  to: "jekamanu@gmail.com",
  from: "jekamanu@gmail.com",
  subject: "Hello from Node.js",
  html: `<h1 style="color: red">Node.js is awesome platform!</h1>`,
  text: `Node.js is awesome platform! `,
};

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/public", express.static(path.resolve("public")));

app.use("/api", routes);

// Handle 404 Error
app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  res.status(404).json({ message: "Route not found" });
});

// Handle 500 Error
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
