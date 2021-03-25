const expressJwt = require("express-jwt");
const config = require("../config.json");

// Extracting the text from the secret's JSON
const { secret } = config;

function authenticateJwtRequestToken() {
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    //get token from cookies
    getToken: function fromHeaderOrQuerystring(request) {
      return request.cookies.token;
    },
  }).unless({
    path: [
      // public routes that don't require authentication
      "/vacation/id",
      "/photo/",
      "/user/login",
      "/user/registration",
    ],
  });
}

module.exports = authenticateJwtRequestToken;
