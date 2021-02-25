import { SuccessfulAddPhotoResponse } from "./../Model/serverResponses";
import Axios from "axios";

//Axios form photo requests
const instance = Axios.create({
  baseURL: "http://localhost:3001/photo",
  withCredentials: true,
});

type addPhotoResponseType = {
  data: { imgUrl: string };
};

export const photoApi = {
  addPhoto: async (formData: FormData): Promise<addPhotoResponseType> => {
    const response = await instance.post<SuccessfulAddPhotoResponse>(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  },
};
