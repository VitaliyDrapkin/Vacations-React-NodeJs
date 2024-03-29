const express = require("express");
const expressServer = express();
const http = require("http"); // More basic server than express.
const httpServer = http.createServer(expressServer); // Need express
const socketServerCreator = require("./socketIo/serverCreator");

socketServerCreator(httpServer); // Need the http

const cors = require("cors");
const cookieParser = require("cookie-parser");

const userControl = require("./controllers/user-controller");
const vacationControl = require("./controllers/vacation-controller");
const followControl = require("./controllers/follow-controller");
const photoControl = require("./controllers/photo-controller");
const loginFilter = require("./middleware/login-filter");
const scanUnauthorizedError = require("./middleware/scanUnauthorizedError");
const errorHandler = require("./errors/error-handler");

const keys = require("./keys");

expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: false }));
expressServer.use(cookieParser());

expressServer.get("/", async (request, response, next) => {
  response.send("<h1>Server working</h1>");
});

const PORT = process.env.PORT || 3001;
expressServer.use(cors({ origin: keys.CLIENT_URL, credentials: true }));

expressServer.use(loginFilter());
expressServer.use(scanUnauthorizedError);

expressServer.use(express.static("./upload"));

expressServer.use("/photo", photoControl);
expressServer.use("/follow", followControl);
expressServer.use("/user", userControl);
expressServer.use("/vacation", vacationControl);

expressServer.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
