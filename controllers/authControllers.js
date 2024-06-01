import User from "../models/users.js";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import mail from "../mail.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailInLowerCase });

    if (user !== null) {
      return res.status(409).send({ message: "User already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomUUID();

    const avatar = gravatar.url(email);

    const newUser = await User.create({
      name: name,
      email: emailInLowerCase,
      password: passwordHash,
      avatar,
      verificationToken,
    });

    mail.sendMail({
      to: emailInLowerCase,
      from: "jekamanu@gmail.com",
      subject: "Welcome to Contact List!",
      html: `To confirm your email please follow the <a href="http://localhost:3000/api/users/verify/${verificationToken}">link</a>`,
      text: `To confirm your email please open the link http://localhost:3000/api/users/verify/${verificationToken}`,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
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

    if (user.verify === false) {
      return res.status(401).send({ message: "Please verify your email" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "2 days" }
    );

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).end();
    console.log("logout");
  } catch (error) {
    next(error);
  }
};

export const current = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updSubscription = async (req, res, next) => {
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
};
