const multer = require("multer");
const fs = require("fs");
const keys = require("../keys");

const DOMAIN = keys.SERVER_URL + "/";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./upload");
  },
  filename(req, file, cb) {
    cb(
      null,
      "a" + Date.now() + file.originalname.substr(file.originalname.length - 5)
    );
  },
});

const upload = multer({ storage: storage }).single("image");

async function uploadPhoto(request, response) {
  upload(request, response, function (error) {
    if (error instanceof multer.MulterError) {
      console.log(error);
      return;
    } else if (error) {
      console.log(error);
      return;
    } else {
      response.send({
        imgUrl: DOMAIN + request.file.filename,
      });
    }
  });
}

async function deletePhoto(imgUrl) {
  const hostUrl = DOMAIN;
  const imgName = imgUrl.slice(hostUrl.length, imgUrl.length);
  fs.unlink(`./upload/${imgName}`, (err) => {
    if (err) console.log(err);
  });
  return;
}

module.exports = { uploadPhoto, deletePhoto };
