const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // dossier ou est enregistré les images
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("_");
    const extension = path.extname(file.originalname);
    cb(null, name + Date.now() + extension);
  },
});
module.exports = multer({ storage }).single("image");
