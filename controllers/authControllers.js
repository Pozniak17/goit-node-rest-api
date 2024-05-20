import bcrypt from "bcrypt";
import User from "../models/users.js";
import { token } from "morgan";
import jwt from "jsonwebtoken";

async function register(req, res, next) {
  const { name, email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();
  try {
    const user = await User.findOne({ email: emailInLowerCase });

    if (user !== null) {
      return res.status(409).send({ message: "User already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email: emailInLowerCase,
      password: passwordHash,
    });

    res.status(201).send({ message: "Registation succesfully" });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailInLowerCase });

    if (user === null) {
      console.log("Email");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log("Password");
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
};
