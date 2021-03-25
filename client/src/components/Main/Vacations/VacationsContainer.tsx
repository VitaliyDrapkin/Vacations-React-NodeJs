import Vacations from "./Vacations";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { vacationAPI } from "../../../API/vacationApi";
import { Vacation } from "../../../Model/Vacation";
import { vacationPageAction } from "../../../redux/action";
import { vacationActionType } from "../../../redux/action-type";
import { AppStateReduxType } from "../../../redux/store";
import { toast } from "react-toastify";

//------types------------

interface mapStateToPropsType {
  vacations: Vacation[];
  isVacationsLoaded: boolean;
  isModalOpen: boolean;
  isAdmin: boolean;
}

interface mapDispatchToPropsType {
  getVacationsData(): void;
  onClickShowModalAddVacation(): void;
}

//----------react-redux functions--------------

const mapStateToProps = (state: AppStateReduxType): mapStateToPropsType => {
  return {
    vacations: state.vacationsPage.vacations,
    isVacationsLoaded: state.vacationsPage.isVacationsLoaded,
    isModalOpen: state.vacationsPage.isModalOpen,
    isAdmin: state.authorization.isAdmin,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<vacationPageAction>
): mapDispatchToPropsType => {
  return {
    getVacationsData: async () => {
      try {
        const vacations = await vacationAPI.getAllVacations();
        dispatch({
          type: vacationActionType.setAllVacationsData,
          payload: vacations,
        });
      } catch (error) {
        toast.error("Connection error please try letter");
      }
    },

    onClickShowModalAddVacation: (): void => {
      dispatch({
        type: vacationActionType.showModalAddMode,
      });
    },
  };
};

const VacationsContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  AppStateReduxType
>(
  mapStateToProps,
  mapDispatchToProps
)(Vacations);
export default VacationsContainer;
