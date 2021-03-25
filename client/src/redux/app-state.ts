import { Vacation } from "./../Model/Vacation";

export class AppState {
  vacations: Vacation[];
  isModalOpen: boolean;
  isEditMode: boolean;
  editVacation: null | Vacation;
  isVacationsLoaded: boolean;
  lastVacationID: number;
}

export class authAppState {
  login: string;
  isAuth: boolean;
  isAdmin: boolean;
  isInitialized: boolean;
}

export class ImageManipulationState {
  imgFile: File;
  isNewImage: boolean;
  imgUrl: string;
}
