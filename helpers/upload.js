import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log(path.resolve("tmp"));
    cb(null, path.resolve("tmp"));
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname); // .jpg розширення
    const basename = path.basename(file.originalname, extname); // file name
    const suffix = crypto.randomUUID();

    console.log(`${basename}-${suffix}${extname}`);
    cb(null, `${basename}-${suffix}${extname}`);
  },
});

export default multer({ storage });
