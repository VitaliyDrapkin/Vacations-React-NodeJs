import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { loginAPI } from "../../../../API/authorizationApi";
import { authActionType } from "../../../../redux/action-type";
import { AppStateReduxType } from "../../../../redux/store";
import RegistrationFormik from "./RegistrationForm";

//--------------types-----------------

interface mapDispatchToPropsType {
  onRegistration(
    userName: string,
    firstName: string,
    lastName: string,
    password: string
  ): void;
}

//--------------react-redux connect-----------------

const mapStateToProps = (state: AppStateReduxType): {} => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
  return {
    onRegistration: async (
      userName: string,
      firstName: string,
      lastName: string,
      password: string
    ) => {
      try {
        const response = await loginAPI.registration(
          userName.trim(),
          firstName.trim(),
          lastName.trim(),
          password
        );

        const user = {
          login: response.data.userName,
          isAdmin: response.data.userType === "admin" ? true : false,
        };

        dispatch({
          type: authActionType.login,
          payload: user,
        });
      } catch (error) {
        //throw 'User name already exist' error next
        if (error.response && error.response.status === 601) {
          throw error;
        } else {
          toast.error("Connection failed please try later");
        }
      }
    },
  };
};

const RegistrationFormContainer = connect<
  {},
  mapDispatchToPropsType,
  {},
  AppStateReduxType
>(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationFormik);

export default RegistrationFormContainer;
