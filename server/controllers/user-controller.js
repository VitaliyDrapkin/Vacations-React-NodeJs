const express = require("express");
const userLogic = require("../logic/user-logic");

const router = express.Router();

// Registration user
router.post("/registration", async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  const user = request.body;
  try {
    const registrationResponse = await userLogic.registrationUser(user);
    response.cookie("token", registrationResponse.token).send({
      userName: registrationResponse.userName,
      userType: registrationResponse.userType,
    });
  } catch (error) {
    return next(error);
  }
});

// Login
router.post("/login", async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  const user = request.body;
  try {
    const loginResponse = await userLogic.login(user);
    response.cookie("token", loginResponse.token).send({
      userName: loginResponse.userName,
      userType: loginResponse.userType,
    });
  } catch (error) {
    return next(error);
  }
});

// logout
router.delete("/login", (request, response, next) => {
  response.clearCookie("token").send("Logout");
});

// autoLogin authorization cookies
router.get("/me", async (request, response, next) => {
  try {
    const loginResponse = await userLogic.autoLogin(request.cookies.token);
    response.json(loginResponse);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
