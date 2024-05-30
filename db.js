import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log("Database connection successfully"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
