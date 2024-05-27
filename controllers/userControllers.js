import * as fs from "node:fs/promises";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";
import Jimp from "jimp";

import User from "../models/users.js";

export const uploadAvatar = async (req, res, next) => {
  try {
    const tempPath = req.file.path;
    const finalPath = path.resolve("public/avatars", req.file.filename);

    await fs.rename(tempPath, finalPath);

    const avatar = await Jimp.read(finalPath);
    await avatar.resize(250, 250).writeAsync(finalPath);

    const newUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.file.filename },
      { new: true }
    );

    if (newUser === null) {
      throw HttpError(404, "User not found");
    }

    res.send(newUser);
  } catch (error) {
    next(error);
  }
};

export const getAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user === null) {
      throw HttpError(404, "User not found");
    }

    if (user.avatar === null) {
      return res.status(404).send({ message: "Avatar not found" });
    }

    res.sendFile(path.resolve("public/avatars", user.avatar));
  } catch (error) {
    next(error);
  }
};
