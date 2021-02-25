import Header from "./Header";
import { connect } from "react-redux";
import { AppStateReduxType, store } from "../../redux/store";
import { Dispatch } from "redux";
import { authActionType } from "../../redux/action-type";
import { authPageAction } from "../../redux/action";
import { loginAPI } from "../../API/authorizationApi";
import { toast } from "react-toastify";
import { socketRequests } from "../../socketIo/main";

interface MapStatePropsType {
  isAuth: boolean;
  isAdmin: boolean;
  loginName: string;
}

interface MapDispatchPropsType {
  onLogout(): void;
}

const mapStateToProps = (state: AppStateReduxType): MapStatePropsType => {
  return {
    isAdmin: state.authorization.isAdmin,
    loginName: state.authorization.login,
    isAuth: state.authorization.isAuth,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<authPageAction>
): MapDispatchPropsType => {
  return {
    onLogout: async () => {
      try {
        await loginAPI.logout();
        //reset
        socketRequests.endSocket();
        store.dispatch({ type: "DESTROY_SESSION" });
        dispatch({ type: authActionType.initialized });
      } catch (error) {
        toast.error(error);
      }
    },
  };
};

const HeaderContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppStateReduxType
>(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
