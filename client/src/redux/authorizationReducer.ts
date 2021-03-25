import { authAppState } from "./app-state";
import { authActionType } from "./action-type";
import { authPageAction } from "./action";

const initialState: authAppState = {
  login: "",
  isAuth: false,
  isAdmin: false,
  isInitialized: false,
};

export function authorizationReducer(
  oldAppState: authAppState = initialState,
  action: authPageAction
): authAppState {
  switch (action.type) {
    case authActionType.login:
      return {
        ...oldAppState,
        isAuth: true,
        login: action.payload.login,
        isAdmin: action.payload.isAdmin,
      };

    case authActionType.initialized:
      return {
        ...oldAppState,
        isInitialized: true,
      };

    default:
      return oldAppState;
  }
}
