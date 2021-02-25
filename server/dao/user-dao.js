const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function registrationUser(user) {
  const sql =
    "INSERT INTO users (userName, firstName, lastName, password, userType) VALUES (?, ?, ? ,? ,?);";
  const parameters = [
    user.userName,
    user.firstName,
    user.lastName,
    user.password,
    "user",
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
    const response = await login(user);
    return response;
  } catch (e) {
    if (e.errno === 1062) {
      throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST, sql, e);
    }
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function login(user) {
  const sql =
    "SELECT userId, userName, userType FROM users WHERE userName = ? && password = ?;";
  const parameters = [user.userName, user.password];
  try {
    const response = await connection.executeWithParameters(sql, parameters);
    return response;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = {
  registrationUser,
  login,
};
