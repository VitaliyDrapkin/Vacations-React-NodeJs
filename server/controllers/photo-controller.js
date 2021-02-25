let photoLogic = require("../logic/photo-Logic");
const express = require("express");

const router = express.Router();

//upload photo
router.post("/upload", async (request, response) => {
  try {
    //response in photo logic multer
    await photoLogic.uploadPhoto(request, response);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
