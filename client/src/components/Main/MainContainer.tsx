import Main from "./Main";
import { connect } from "react-redux";
import { Dispatch } from "react";
import { AppStateReduxType } from "../../redux/store";
import { authPageAction } from "../../redux/action";
import { authActionType } from "../../redux/action-type";
import { loginAPI } from "../../API/authorizationApi";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();

//-----------types---------------

interface mapStateToPropsType {
  isAuth: boolean;
  isInitialized: boolean;
}

interface MapDispatchPropsType {
  autoLogin(): void;
}

//----------react-redux functions------------
const mapStateToProps = (state: AppStateReduxType): mapStateToPropsType => {
  return {
    isAuth: state.authorization.isAuth,
    isInitialized: state.authorization.isInitialized,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<authPageAction>
): MapDispatchPropsType => {
  return {
    //try login in start
    autoLogin: async () => {
      //don't auto login without a token
      if (!cookies.get("token")) {
        dispatch({ type: authActionType.initialized });
        return;
      }

      try {
        const response = await loginAPI.autoLogin();
        const user = {
          login: response.data.userName,
          isAdmin: response.data.userType === "admin" ? true : false,
        };

        dispatch({
          type: authActionType.login,
          payload: user,
        });

        dispatch({ type: authActionType.initialized });
      } catch (error) {
        //token fail
        if (error.response && error.response.status === 401) {
          dispatch({ type: authActionType.initialized });
        }

        if (error.message === "Network Error")
          toast.error("The server is not responding. Please come back later.");
        dispatch({ type: authActionType.initialized });
      }
    },
  };
};

const MainContainer = connect<
  mapStateToPropsType,
  MapDispatchPropsType,
  {},
  AppStateReduxType
>(
  mapStateToProps,
  mapDispatchToProps
)(Main);
export default MainContainer;
