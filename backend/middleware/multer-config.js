const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const multerFilter = (req, file, cb) => {
  const validExt = Object.keys(MIME_TYPES);
  if (!validExt.includes(file.mimetype)) {
    req.fileValidationError =
      "Invaid file type. Please upload a valid image type";
    return cb(req.fileValidationError, false);
  }
  cb(null, true);
};

module.exports = multer({
  storage: storage,
  fileFilter: multerFilter,
}).single("myFile");
