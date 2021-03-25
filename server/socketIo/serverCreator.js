const socket = require("socket.io");
const socketIoAuthorization = require("./socketIoAuthorization");
const vacationLogic = require("../logic/vacation-logic");
const followLogic = require("../logic/follow-logic");

function socketServerCreator(serverHttp) {
  //all server settings
  const io = socket(serverHttp); // Need the http

  io.use(socketIoAuthorization).on("connection", (socket) => {
    // Server get event delete vacation from client
    socket.on("deleteVacation", async (obj) => {
      //delete vacations from DB
      const token = socket.handshake.query.token;
      const isDeleted = await vacationLogic.deleteVacation(
        obj.id,
        token,
        obj.imgUrl
      );
      if (!isDeleted) {
        return;
      }
      // Server send event delete vacation to all clients
      io.emit("deleteVacation", obj.id);
      console.log("Admin delete vacation:" + obj.id);
    });

    // Server get event add vacation from client
    socket.on("addVacation", async (vacation) => {
      //add vacation to DB
      const token = socket.handshake.query.token;
      const newVacation = await vacationLogic.addVacation(vacation, token);
      // Server send event delete vacation to all clients
      io.emit("addVacation", newVacation);
      console.log("Admin add vacation:" + newVacation.vacationId);
    });

    // Server get event delete vacation from client
    socket.on("editVacation", async (vacation) => {
      //delete vacations from DB
      const token = socket.handshake.query.token;
      await vacationLogic.updateVacation(vacation, token);
      // Server send event delete vacation to all clients
      io.emit("editVacation", vacation);
      console.log("Admin edit vacation:" + vacation.id);
    });

    // Server get follow from client
    socket.on("follow", async (obj) => {
      //delete vacations from DB
      const token = socket.handshake.query.token;
      const response = await followLogic.follow(obj.vacationId, token);
      // Server send event new follower  to all clients
      if (response.response === "fail") {
        return;
      }
      socket.broadcast.emit("follow", response);
    });

    // Server get unfollow vacation from client
    socket.on("unfollow", async (obj) => {
      //delete vacations from DB
      const token = socket.handshake.query.token;
      const response = await followLogic.unfollow(obj.vacationId, token);
      // Server send event remove follower to all clients
      if (!response.response) {
        return;
      }
      socket.broadcast.emit("unfollow", response);
    });

    // 7. When user disconnects:
    socket.on("disconnect", () => {});
  });
  return io;
}
module.exports = socketServerCreator;
