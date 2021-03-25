import {
  vacationPageAction,
  authPageAction,
  imageManipulationAction,
} from "./action";
import { AnyAction, combineReducers, createStore } from "redux";
import { reducer as formReducer } from "redux-form";
import { vacationReducer } from "./vacationReducer";
import { authorizationReducer } from "./authorizationReducer";
import { imageManipulationReducer } from "./imageManipulationReducer";

//reducers
const appReducer = combineReducers({
  vacationsPage: vacationReducer,
  form: formReducer,
  authorization: authorizationReducer,
  imageManipulation: imageManipulationReducer,
});

//For logout restart redux
const rootReducer = (state: RootState, action: RootAction) => {
  // Clear all data in redux store to initial
  if (action.type === "DESTROY_SESSION") state = undefined;
  return appReducer(state, action);
};

export const store = createStore(rootReducer);

//----types----

type RootState = ReturnType<typeof appReducer>;
type RootAction =
  | AnyAction
  | vacationPageAction
  | authPageAction
  | imageManipulationAction;

type rootReducerType = typeof rootReducer;
export type AppStateReduxType = ReturnType<rootReducerType>;
