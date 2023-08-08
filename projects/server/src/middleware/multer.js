const multer = require("multer");
const fs = require("fs");
const path = require("path");

let defaultPath = "public/images";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const isDirExist = fs.existsSync(
      path.resolve(__dirname, `${defaultPath}/${file.fieldname}`)
    );
    if (!isDirExist) {
      await fs.promises.mkdir(
        path.resolve(__dirname, `${defaultPath}/${file.fieldname}`),
        {
          recursive: true,
        }
      );
    }
    cb(null, `${defaultPath}/${file.fieldname}`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}` +
        "-" +
        Date.now() +
        Math.round(Math.random() * 10000000) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

const maxSize = 1 * 1000 * 1000;
const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[1];
  if (
    fileType === "png" ||
    fileType === "jpg" ||
    fileType === "jpeg" ||
    fileType === "gif"
  ) {
    cb(null, true);
  } else {
    cb(new Error("file format WRONG"));
  }
};

exports.multerUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
});
