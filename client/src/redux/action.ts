import {
  vacationActionType,
  authActionType,
  imageManipulationActionType,
} from "./action-type";

export interface vacationPageAction {
  type: vacationActionType;
  payload?: any;
}

export interface authPageAction {
  type: authActionType;
  payload?: any;
}
export interface imageManipulationAction {
  type: imageManipulationActionType;
  payload?: any;
}
