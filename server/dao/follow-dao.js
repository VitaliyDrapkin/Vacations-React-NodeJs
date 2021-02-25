const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function follow(vacationId, userId) {
  const sql = "INSERT INTO followed_vacations VALUES(?, ?)";
  const parameters = [userId, vacationId];
  try {
    await connection.executeWithParameters(sql, parameters);
    return "success";
  } catch (e) {
    //Duplicate follow
    if (e.errno === 1062) {
      return "fail";
    }
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}
async function unfollow(vacationId, userId) {
  const sql = "DELETE FROM followed_vacations WHERE user=? && vacation=?;";
  const parameters = [userId, vacationId];
  try {
    const response = await connection.executeWithParameters(sql, parameters);
    return response.affectedRows;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = {
  follow,
  unfollow,
};
