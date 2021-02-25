const express = require("express");
const followLogic = require("../logic/follow-logic");

const router = express.Router();

// //All requests are now on socket IO
// //Follow
// router.post("/:id", async (request, response) => {
//   try {
//     await followLogic.follow(request.params.id, request.cookies.token);
//     response.send("success");
//   } catch (error) {
//     return next(error);
//   }
// });

// // Unfollow
// router.delete("/:id", async (request, response, next) => {
//   try {
//     await followLogic.unfollow(request.params.id, request.cookies.token);
//     response.send("success");
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = router;
