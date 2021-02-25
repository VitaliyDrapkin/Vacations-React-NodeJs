import VacationItem from "./VacationItem";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Vacation } from "../../../../Model/Vacation";
import { AppStateReduxType } from "../../../../redux/store";
import { vacationPageAction } from "../../../../redux/action";
import { vacationActionType } from "../../../../redux/action-type";
import { socketRequests } from "../../../../socketIo/main";

//-----------types---------------

interface mapStateToPropsType {
  isAdmin: boolean;
  isModalOpen: boolean;
}

interface mapDispatchToPropsType {
  onOpenModalEditVacation(vacation: Vacation): void;
  onDeleteVacation(id: number, imgUrl: string): void;
  onFollow(id: number): void;
  onUnfollow(id: number): void;
}

//------------react-redux functions-------------

let mapStateToProps = (state: AppStateReduxType): mapStateToPropsType => {
  return {
    isAdmin: state.authorization.isAdmin,
    isModalOpen: state.vacationsPage.isModalOpen,
  };
};

let mapDispatchToProps = (
  dispatch: Dispatch<vacationPageAction>
): mapDispatchToPropsType => {
  return {
    onOpenModalEditVacation: (vacation: Vacation): void => {
      dispatch({
        type: vacationActionType.showModalEditMode,
        payload: vacation,
      });
    },

    onDeleteVacation: async (id: number, imgUrl: string) => {
      let confirm = window.confirm(
        "Are you sure you want to delete the vacation?"
      );

      if (confirm) {
        socketRequests.deleteVacation(id, imgUrl);
      }
    },

    onFollow: async (id: number) => {
      socketRequests.follow(id);

      dispatch({
        type: vacationActionType.vacationFollow,
        payload: id,
      });
    },

    onUnfollow: async (id: number) => {
      socketRequests.unfollow(id);

      dispatch({
        type: vacationActionType.vacationUnfollow,
        payload: id,
      });
    },
  };
};

let VacationItemContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  AppStateReduxType
>(
  mapStateToProps,
  mapDispatchToProps
)(VacationItem);

export default VacationItemContainer;
