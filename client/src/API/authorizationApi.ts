import Axios from "axios";
import {
  SuccessfulNoDataResponse,
  SuccessfulLoginServerResponse,
} from "../Model/serverResponses";

//Axios form login/register requests
const instance = Axios.create({
  baseURL: "http://localhost:3001/user/",
  withCredentials: true,
});

type loginResponseType = {
  data: { userName: string; userType: string };
};

export const loginAPI = {
  registration: async (
    userName: string,
    firstName: string,
    lastName: string,
    password: string
  ): Promise<loginResponseType> => {
    const promise = await instance.post<SuccessfulLoginServerResponse>(
      "/registration",
      {
        userName,
        firstName,
        lastName,
        password,
      }
    );
    return promise;
  },

  login: async (
    userName: string,
    password: string
  ): Promise<loginResponseType> => {
    const promise = await instance.post<SuccessfulLoginServerResponse>(
      "/login",
      {
        userName,
        password,
      }
    );
    return promise;
  },

  autoLogin: async (): Promise<loginResponseType> => {
    return instance.get<SuccessfulLoginServerResponse>("/me", {});
  },

  logout: async (): Promise<void> => {
    instance.delete<SuccessfulNoDataResponse>("/login", {});
  },
};
