const express = require("express");
const vacationLogic = require("../logic/vacation-logic");

const router = express.Router();

//Get all vacations
router.get("/", async (request, response, next) => {
  try {
    const vacations = await vacationLogic.getAllVacations(
      request.cookies.token
    );
    response.send({ vacations });
  } catch (error) {
    return next(error);
  }
});

//All requests are now on socket IO
// ADD vacation (only ADMIN)
// router.post("/", async (request, response, next) => {
//   // Extracting the JSON from the packet's BODY
//   try {
//     let vacation = request.body;
//     let responseId = await vacationLogic.addVacation(
//       vacation,
//       request.cookies.token
//     );
//     response.send(responseId);
//   } catch (error) {
//     return next(error);
//   }
// });

// //Delete vacation (only ADMIN)
// router.delete("/:id", async (request, response, next) => {
//   try {
//     await vacationLogic.deleteVacation(
//       request.params.id,
//       request.cookies.token,
//       request.query.imgUrl
//     );
//     response.send("Successfully deleted");
//   } catch (error) {
//     return next(error);
//   }
// });

// //Update vacation (only ADMIN)
// router.put("/:id", async (request, response, next) => {
//   const vacation = request.body;
//   vacation.id = request.params.id;
//   try {
//     await vacationLogic.updateVacation(vacation, request.cookies.token);
//     response.send("Successfully updated");
//   } catch (error) {
//     console.log(error);
//     return next(error);
//   }
// });

module.exports = router;
