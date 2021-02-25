import Axios from "axios";
import { Vacation, serverVacationType } from "./../Model/Vacation";
import { SuccessfulGetVacationsServerResponse } from "./../Model/serverResponses";

// Axios form vacations request
const instance = Axios.create({
  baseURL: "http://localhost:3001/vacation",
  withCredentials: true,
});

export const vacationAPI = {
  getAllVacations: async () => {
    const response = await instance.get<SuccessfulGetVacationsServerResponse>(
      "/"
    );
    const vacations = response.data.vacations.map(
      (item: serverVacationType) => {
        return new Vacation(
          item.vacationId,
          item.description,
          item.price,
          item.imgUrl,
          item.startDate,
          item.endDate,
          item.user ? true : false,
          item.count
        );
      }
    );

    return vacations;
  },

  //-------All requests are now on socket IO------
  //   deleteVacation: async (id: number, imgUrl: string) => {
  //     await instance.delete<SuccessfulNoDataResponse>(
  //       `/${id}?imgUrl=${imgUrl}`,
  //       {}
  //     );
  //   },

  //   addVacation: async (
  //     description: string,
  //     price: number,
  //     imgUrl: string,
  //     startDate: string,
  //     endDate: string
  //   ) => {
  //     await instance.post<SuccessfulAddNewVacation>("/", {
  //       description,
  //       price,
  //       imgUrl,
  //       startDate,
  //       endDate,
  //     });
  //   },
  //   changeVacation: async (
  //     id: number,
  //     description: string,
  //     price: number,
  //     imgUrl: string,
  //     startDate: string,
  //     endDate: string,
  //     oldImgUrl: string
  //   ) => {
  //     await instance.put<SuccessfulNoDataResponse>(`/${id}`, {
  //       description,
  //       price,
  //       imgUrl,
  //       startDate,
  //       endDate,
  //       oldImgUrl,
  //     });
  //   },
};
