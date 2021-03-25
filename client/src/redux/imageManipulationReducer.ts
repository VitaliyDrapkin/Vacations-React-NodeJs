import { ImageManipulationState } from "./app-state";
import { imageManipulationActionType } from "./action-type";
import { imageManipulationAction } from "./action";

const initialState: ImageManipulationState = {
  isNewImage: false,
  imgFile: null,
  imgUrl: null,
};

export function imageManipulationReducer(
  oldAppState: ImageManipulationState = initialState,
  action: imageManipulationAction
): ImageManipulationState {
  switch (action.type) {
    case imageManipulationActionType.setNewImage:
      return {
        ...oldAppState,
        imgFile: action.payload.file,
        imgUrl: URL.createObjectURL(action.payload.file),
        isNewImage: true,
      };

    case imageManipulationActionType.resetManipulationWindow:
      return {
        ...oldAppState,
        imgFile: null,
        imgUrl: null,
        isNewImage: false,
      };
    default:
      return oldAppState;
  }
}
