import User from "../models/users.js";
// import bcrypt from "bcrypt";

async function register(req, res, next) {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user !== null) {
      return res.status(409).send({ message: "User already registered" });
    }

    const result = await User.create({ name, email, password });

    console.log({ result });

    res.send("Register");
  } catch (error) {
    next(error);
  }
}

export default {
  register,
};
