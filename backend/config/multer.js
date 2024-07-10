// config/multer.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "devoir3",
    allowedFormats: ["jpg", "png"],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
