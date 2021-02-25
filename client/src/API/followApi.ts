import { SuccessfulNoDataResponse } from "./../Model/serverResponses";
import Axios from "axios";

//Axios form follow requests
const instance = Axios.create({
  baseURL: "http://localhost:3001/follow",
  withCredentials: true,
});

//All requests are now on socket IO
// export const followApi = {
//   follow: async (vacationId: number): Promise<void> => {
//     await instance.post<SuccessfulNoDataResponse>(`/${vacationId}`, {});
//   },

//   unFollow: async (vacationId: number): Promise<void> => {
//     await instance.delete<SuccessfulNoDataResponse>(`/${vacationId}`, {});
//   },
// };
