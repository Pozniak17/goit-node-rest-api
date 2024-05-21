import User from "../models/users.js";
import bcrypt from "bcrypt";
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

    res.status(201).send({ message: "Registration successfully" });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailInLowerCase });

    if (user == null) {
      console.log("Email");
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log("Password");
      return res.status(401).send({ message: "Email or password is wrong" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "2 days" }
    );

    await User.findByIdAndUpdate(user._id, { token });

    res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();
    console.log("logout");
  } catch (error) {
    next(error);
  }
}

async function current(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
}

async function updSubscription(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
  logout,
  current,
  updSubscription,
};
