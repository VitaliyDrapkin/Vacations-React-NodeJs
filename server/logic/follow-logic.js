const followDao = require("../dao/follow-dao");
const encryption = require("../helper/encryption");

async function follow(vacationId, token) {
  //decrypt token
  const user = encryption.decryptToken(token).data;
  const userId = user.userId;
  const response = await followDao.follow(vacationId, userId);
  return { userName: user.userName, vacationId, response };
}

async function unfollow(vacationId, token) {
  //decrypt token
  const user = encryption.decryptToken(token).data;
  const userId = user.userId;
  const response = await followDao.unfollow(vacationId, userId);
  return { userName: user.userName, vacationId, response };
}

module.exports = {
  follow,
  unfollow,
};
