const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

async function getAllVacations(id) {
  const sql =
    "SELECT vacations.*,  followed_vacations.user, (SELECT COUNT(*) FROM followed_vacations WHERE vacation = vacations.vacationId) AS count FROM vacations LEFT JOIN followed_vacations  ON vacations.vacationId=followed_vacations.vacation && followed_vacations.user=? ORDER BY  followed_vacations.user DESC";
  const parameters = [id];
  try {
    const vacations = await connection.executeWithParameters(sql, parameters);
    return vacations;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function addVacation(vacation) {
  const sql =
    "INSERT INTO vacations (description, price, imgUrl, startDate, endDate)  values(?, ?, ?, ?, ?); SELECT * FROM vacations ORDER BY vacationId DESC LIMIT 1;";

  const parameters = [
    vacation.description,
    vacation.price,
    vacation.imgUrl,
    vacation.startDate,
    vacation.endDate,
  ];
  try {
    const response = await connection.executeWithParameters(sql, parameters);
    return response[1][0];
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function updateVacation(vacation) {
  const sql =
    "UPDATE vacations SET description = ?, price = ?, imgUrl = ?, startDate = ?, endDate = ? WHERE vacationId = ?;";
  const parameters = [
    vacation.description,
    vacation.price,
    vacation.imgUrl,
    vacation.startDate,
    vacation.endDate,
    vacation.id,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function deleteVacation(id) {
  const sql = "DELETE FROM vacations WHERE vacationId = ?";
  const parameters = [id];
  try {
    const response = await connection.executeWithParameters(sql, parameters);
    return response.affectedRows;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function getLastVacationId() {
  const sql = "SELECT * FROM vacations ORDER BY vacationId DESC LIMIT 1;";
  try {
    const vacationId = await connection.execute(sql);
    return vacationId;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = {
  getAllVacations,
  addVacation,
  updateVacation,
  deleteVacation,
  getLastVacationId,
};
