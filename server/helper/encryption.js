const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../config.json");

function encryptToken(data) {
  const token = jwt.sign({ data }, config.secret);
  return token;
}

function decryptToken(token) {
  const data = jwt.decode(token);
  return data;
}

function hashingPassword(password) {
  const saltRight = "sdfsd%43flkjfo";
  const saltLeft = "!9dsdon$#f3ws";
  const hashPassword = crypto
    .createHash("md5")
    .update(saltLeft + password + saltRight)
    .digest("hex");
  return hashPassword;
}

module.exports = {
  encryptToken,
  decryptToken,
  hashingPassword,
};
