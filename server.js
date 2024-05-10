import mongoose from "mongoose";
// GhnZuIMOS4l1vs3j;
import { app } from "./app";

const DB_HOST =
  "mongodb+srv://Yevhenii:GhnZuIMOS4l1vs3j@cluster0.74mccoy.mongodb.net/db_contacts?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", true);

// app.listen(3000, () => {
//   console.log("Server is running. Use our API on port: 3000");
// });

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
