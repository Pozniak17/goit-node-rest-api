import express from "express";
// import morgan from 'morgan';
// import cors from 'cors';
// import 'dotenv/config';
import "./db.js";
import routes from "./routes/index.js";

const app = express();

// app.use(morgan('tiny'));
// app.use(cors());
// app.use(express.json());

app.use("/api", routes);

// Handle 404 Error
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Handle 500 Error
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
