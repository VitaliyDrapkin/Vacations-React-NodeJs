import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { photoApi } from "../../../../API/photoApi";
import { Vacation } from "../../../../Model/Vacation";
import {
  vacationPageAction,
  authPageAction,
  imageManipulationAction,
} from "../../../../redux/action";
import {
  imageManipulationActionType,
  vacationActionType,
} from "../../../../redux/action-type";
import { AppStateReduxType } from "../../../../redux/store";
import { socketRequests } from "../../../../socketIo/main";
import VacationManipulation from "./VacationManipulation";

//----------------types-----------------

interface VacationManipulationRouteProps {
  isModalOpen: boolean;
  isEditMode: boolean;
  oldVacation: Vacation;
  imgFile: File;
  imgUrl: string;
  isNewImage: boolean;

  onCloseModal(): void;
  validationPhoto(file: File): boolean;
  addNewImageRedux(image: File): void;

  onAddNewVacation(
    description: string,
    price: number,
    startDate: string,
    endDate: string,
    isNewImage: boolean,
    imageFile: File
  ): void;

  onEditVacation(
    id: number,
    description: string,
    price: number,
    startDate: string,
    endDate: string,
    oldImgUrl: string,
    isNewImage: boolean,
    imageFile: File
  ): void;
}

//show vacation manipulation if modal opened
const VacationManipulationRoute = (props: VacationManipulationRouteProps) => {
  return <div>{props.isModalOpen && <VacationManipulation {...props} />}</div>;
};

//--------types react-redux------------

interface mapStateToPropsType {
  isModalOpen: boolean;
  isEditMode: boolean;
  oldVacation: Vacation;
  imgFile: File;
  imgUrl: string;
  isNewImage: boolean;
}

interface mapDispatchToPropsType {
  onCloseModal(): void;
  validationPhoto(file: File): boolean;
  addNewImageRedux(image: File): void;

  onAddNewVacation(
    description: string,
    price: number,
    startDate: string,
    endDate: string,
    isNewImage: boolean,
    imageFile: File
  ): void;

  onEditVacation(
    id: number,
    description: string,
    price: number,
    startDate: string,
    endDate: string,
    oldImgUrl: string,
    isNewImage: boolean,
    imageFile: File
  ): void;
}

//----function helper----

function createFormDataFromImage(image: File): FormData {
  const formData = new FormData();
  formData.append("image", image);
  return formData;
}

//-----------react-redux functions-------------

let mapStateToProps = (state: AppStateReduxType): mapStateToPropsType => {
  return {
    isModalOpen: state.vacationsPage.isModalOpen,
    isEditMode: state.vacationsPage.isEditMode,
    oldVacation: state.vacationsPage.editVacation,
    imgUrl: state.imageManipulation.imgUrl,
    isNewImage: state.imageManipulation.isNewImage,
    imgFile: state.imageManipulation.imgFile,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<
    vacationPageAction | authPageAction | imageManipulationAction
  >
): mapDispatchToPropsType => {
  return {
    onCloseModal: (): void => {
      dispatch({
        type: vacationActionType.hideModal,
      });
      dispatch({ type: imageManipulationActionType.resetManipulationWindow });
    },

    //validation file types
    validationPhoto: (file: File): boolean => {
      const idxDot = file.name.lastIndexOf(".") + 1;
      var extFile = file.name.substr(idxDot, file.name.length).toLowerCase();
      if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
        return true;
      } else {
        alert("Only jpg/jpeg and png files are allowed!");
        return false;
      }
    },

    addNewImageRedux: (image: File) => {
      dispatch({
        type: imageManipulationActionType.setNewImage,
        payload: { file: image },
      });
    },

    onAddNewVacation: async (
      description: string,
      price: number,
      startDate: string,
      endDate: string,
      isNewImage: boolean,
      imgFile: File
    ) => {
      let imageUrlServer = null;
      if (isNewImage) {
        try {
          //save image in server and get url image
          const formData = createFormDataFromImage(imgFile);
          const response = await photoApi.addPhoto(formData);
          imageUrlServer = response.data.imgUrl;
        } catch (error) {
          toast.error("Image upload failed");
          imageUrlServer = null;
        }
      }

      socketRequests.addVacation(
        description,
        price,
        imageUrlServer,
        startDate,
        endDate
      );

      dispatch({ type: vacationActionType.hideModal });
      dispatch({ type: imageManipulationActionType.resetManipulationWindow });
    },

    onEditVacation: async (
      id: number,
      description: string,
      price: number,
      startDate: string,
      endDate: string,
      oldImgUrl: string,
      isNewImage: boolean,
      imgFile: File
    ) => {
      let imageUrlServer = oldImgUrl;
      try {
        if (isNewImage) {
          //save image in server and get url image
          const imgFileDataForm = createFormDataFromImage(imgFile);
          const response = await photoApi.addPhoto(imgFileDataForm);
          imageUrlServer = response.data.imgUrl;
        }
      } catch (error) {
        toast.error("Image upload failed");
        imageUrlServer = oldImgUrl;
      }

      socketRequests.editVacation(
        id,
        description,
        price,
        imageUrlServer,
        startDate,
        endDate,
        oldImgUrl
      );

      dispatch({ type: vacationActionType.hideModal });
      dispatch({ type: imageManipulationActionType.resetManipulationWindow });
    },
  };
};

let VacationManipulationContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  AppStateReduxType
>(
  mapStateToProps,
  mapDispatchToProps
)(VacationManipulationRoute);

export default VacationManipulationContainer;
