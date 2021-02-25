const vacationDao = require("../dao/vacation-dao");
const encryption = require("../helper/encryption");
const photoLogic = require("./photo-Logic");

const DOMAIN = "http://localhost:3001/";

async function getAllVacations(token) {
  //decrypt token
  const user = encryption.decryptToken(token).data;
  const userId = user.userId;
  const vacations = await vacationDao.getAllVacations(userId);
  vacations.map((vacation) => {
    if (vacation.imgUrl) {
      vacation.imgUrl = DOMAIN + vacation.imgUrl;
    }
    return vacation;
  });
  return vacations;
}

//ADMIN ADD Vacation
async function addVacation(vacation, token) {
  //decrypt token
  const user = encryption.decryptToken(token).data;
  const userType = user.userType;
  if (userType === "admin") {
    vacation.imgUrl = vacation.imgUrl.slice(
      DOMAIN.length,
      vacation.imgUrl.length
    );
    const newVacation = await vacationDao.addVacation(vacation);
    newVacation.imgUrl = DOMAIN + newVacation.imgUrl;
    return newVacation;
  }
}

//ADMIN DELETE vacation
async function deleteVacation(id, token, imgUrl) {
  //decrypt token
  const user = encryption.decryptToken(token).data;
  const userType = user.userType;
  if (userType === "admin") {
    //if vacation with image delete the image
    if (imgUrl != "null" && imgUrl != null) {
      await photoLogic.deletePhoto(imgUrl);
    }
    return await vacationDao.deleteVacation(id);
  }
}

//ADMIN EDIT vacation
async function updateVacation(vacation, token) {
  //decrypt token
  const user = encryption.decryptToken(token).data;
  const userType = user.userType;
  if (userType === "admin") {
    //if vacation change image delete old image
    if (
      vacation.imgUrl !== vacation.oldImgUrl &&
      vacation.oldImgUrl != null &&
      vacation.oldImgUrl != "null"
    ) {
      photoLogic.deletePhoto(vacation.oldImgUrl);
    }
    const newVacation = vacation;
    newVacation.imgUrl = vacation.imgUrl.slice(
      DOMAIN.length,
      vacation.imgUrl.length
    );
    await vacationDao.updateVacation(vacation);
    newVacation.imgUrl = DOMAIN + vacation.imgUrl;
    return vacation;
  }
}
module.exports = {
  addVacation,
  getAllVacations,
  deleteVacation,
  updateVacation,
};
