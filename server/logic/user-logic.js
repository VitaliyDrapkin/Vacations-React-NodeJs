const userDao = require("../dao/user-dao");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const encryption = require("../helper/encryption");
const validator = require("./validators");


//Registration
async function registrationUser(user) {
  const validation = validator.validateRegister(user);

  //failed validation on server
  if (validation) {
    throw new ServerError(ErrorType.SERVER_VALIDATION_ERROR);
  }
  
  user.password = encryption.hashingPassword(user.password);
  //login after registration
  const response = await userDao.registrationUser(user);
  //create token
  const TOKEN = encryption.encryptToken(response[0]);
  return {
    token: TOKEN,
    userName: response[0].userName,
    userType: response[0].userType,
  };
}

//Login
async function login(user) {
  user.password = encryption.hashingPassword(user.password);
  const response = await userDao.login(user);
  if (response === null || response.length === 0) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }
  //create token
  const TOKEN = encryption.encryptToken(response[0]);
  return {
    token: TOKEN,
    userName: response[0].userName,
    userType: response[0].userType,
  };
}

async function autoLogin(token) {
  const user = encryption.decryptToken(token).data;
  return {
    userName: user.userName,
    userType: user.userType,
  };
}

module.exports = {
  registrationUser,
  login,
  autoLogin,
};
