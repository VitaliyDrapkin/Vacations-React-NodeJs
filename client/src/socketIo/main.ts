import { toast } from "react-toastify";
import io from "socket.io-client";
import Cookies from "universal-cookie";
import { store } from "../redux/store";
import { vacationActionType } from "../redux/action-type";
import { Vacation } from "../Model/Vacation";

const cookies = new Cookies();

//Client establish a connection to the server:

let socket: SocketIOClient.Socket;

export const addSocketEvents = () => {
  socket = io("http://localhost:3001/", {
    query: "token=" + cookies.get("token"),
  });

  socket.on("deleteVacation", (vacationId: number) => {
    if (store.getState().authorization.isAdmin) {
      toast.success(`Vacation ${vacationId} deleted`);
    }
    store.dispatch({
      type: vacationActionType.deleteVacation,
      payload: vacationId,
    });
  });

  socket.on("addVacation", (vacation: Vacation) => {
    if (store.getState().authorization.isAdmin) {
      toast.success(`New vacation added`);
    }
    store.dispatch({
      type: vacationActionType.addVacation,
      payload: vacation,
    });
  });

  socket.on("editVacation", (vacation: Vacation) => {
    if (store.getState().authorization.isAdmin) {
      toast.success(`Vacation ${vacation.id} changed`);
    }
    store.dispatch({
      type: vacationActionType.editVacation,
      payload: vacation,
    });
  });

  //Type for socket response another user followed vacation
  type onFollowSocket = {
    userName: string;
    vacationId: number;
    responseStatus: string;
  };

  // Some one followed vacation
  socket.on("follow", async (obj: onFollowSocket) => {
    if (store.getState().authorization.login === obj.userName) {
      store.dispatch({
        type: vacationActionType.vacationFollow,
        payload: obj.vacationId,
      });
    } else {
      store.dispatch({
        type: vacationActionType.addFollower,
        payload: obj.vacationId,
      });
    }
  });

  // Some one unfollowed vacation
  socket.on("unfollow", async (obj: onFollowSocket) => {
    if (store.getState().authorization.login === obj.userName) {
      store.dispatch({
        type: vacationActionType.vacationUnfollow,
        payload: obj.vacationId,
      });
    } else {
      store.dispatch({
        type: vacationActionType.removeFollower,
        payload: obj.vacationId,
      });
    }
  });

  socket.on("connect_error", async () => {
    toast.error("Lost connection to the server. Trying to reconnect");
  });

  //on blur stop show notifications
  window.onblur = function () {
    socket.off("connect_error");
  };

  //on focus start show notifications
  window.onfocus = function () {
    socket.on("connect_error", async () => {
      toast.error("Lost connection to the server. Trying to reconnect");
    });
  };

  socket.on("reconnect", async () => {
    toast.success("Server reconnected");
  });
};

export const socketRequests = {
  follow: (vacationId: number) => {
    socket.emit("follow", { vacationId });
  },

  unfollow: (vacationId: number) => {
    socket.emit("unfollow", { vacationId });
  },

  deleteVacation: (id: number, imgUrl: string) => {
    socket.emit("deleteVacation", { id, imgUrl }); // Delete vacation and img
  },

  addVacation: (
    description: string,
    price: number,
    imgUrl: string,
    startDate: string,
    endDate: string
  ) => {
    const vacation = {
      description,
      price,
      imgUrl,
      startDate,
      endDate,
    };
    socket.emit("addVacation", vacation); // Add vacation
  },

  // Edit vacation
  //Send the old photo for deletion
  editVacation: (
    id: number,
    description: string,
    price: number,
    imgUrl: string,
    startDate: string,
    endDate: string,
    oldImgUrl: string
  ) => {
    const vacation = {
      id,
      description,
      price,
      imgUrl,
      startDate,
      endDate,
      oldImgUrl,
    };
    socket.emit("editVacation", vacation);
  },

  endSocket() {
    socket.disconnect();
  },
};
