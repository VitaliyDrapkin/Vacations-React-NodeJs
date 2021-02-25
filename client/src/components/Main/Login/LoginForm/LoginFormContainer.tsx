import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { loginAPI } from "../../../../API/authorizationApi";
import { authPageAction } from "../../../../redux/action";
import { authActionType } from "../../../../redux/action-type";
import { AppStateReduxType } from "../../../../redux/store";
import LoginFormik from "./LoginForm";

interface mapDispatchToPropsType {
  onLogin(login: string, password: string): void;
}

const mapStateToProps = (state: AppStateReduxType): {} => {
  return {};
};

const mapDispatchToProps = (
  dispatch: Dispatch<authPageAction>
): mapDispatchToPropsType => {
  return {
    onLogin: async (login: string, password: string) => {
      try {
        const response = await loginAPI.login(login.trim(), password);

        const user = {
          login: response.data.userName,
          isAdmin: response.data.userType === "admin" ? true : false,
        };

        dispatch({
          type: authActionType.login,
          payload: user,
        });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw error;
        } else {
          toast.error("Connection failed please try later");
        }
      }
    },
  };
};

const LoginFormContainer = connect<
  {},
  mapDispatchToPropsType,
  {},
  AppStateReduxType
>(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormik);

export default LoginFormContainer;
