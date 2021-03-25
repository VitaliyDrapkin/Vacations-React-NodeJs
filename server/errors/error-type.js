const ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message:
      "A big fuck up which we'll never tell you of had just happened. And now : A big fat lie....'A general error ....'",
    isShowStackTrace: true,
  },
  USER_NAME_ALREADY_EXIST: {
    id: 2,
    httpCode: 601,
    message: "User name already exist",
    isShowStackTrace: false,
  },
  UNAUTHORIZED: {
    id: 3,
    httpCode: 401,
    message: "Invalid user name or password",
    isShowStackTrace: false,
  },
  SOCKET_ERROR: {
    id: 4,
    httpCode: 838,
    message: "Invalid token",
    isShowStackTrace: false,
  },
};

module.exports = ErrorType;
