import * as fs from "node:fs/promises";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";
import Jimp from "jimp";

import User from "../models/users.js";

export const uploadAvatar = async (req, res, next) => {
  try {
    if (req.file === null) {
      throw new HttpError(400, "No file uploaded");
    }

    const tempPath = req.file.path;
    const finalFilename = req.file.filename;
    const finalPath = path.resolve("public/avatars", finalFilename);

    await fs.rename(tempPath, finalPath);

    const avatar = await Jimp.read(finalPath);
    await avatar.resize(250, 250).writeAsync(finalPath);

    const avatarURL = path.join("/avatars", finalFilename);

    const newUser = await User.findByIdAndUpdate(
      req.user.id,
      { avatarURL },
      { new: true }
    );

    if (newUser === null) {
      throw HttpError(404, "User not found");
    }

    res.send({ avatarURL });
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

    const avatarPath = path.resolve("public/avatars", user.avatarURL);

    res.sendFile(avatarPath);
  } catch (error) {
    next(error);
  }
};
