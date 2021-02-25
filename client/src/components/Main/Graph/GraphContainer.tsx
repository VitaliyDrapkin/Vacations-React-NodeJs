import { Dispatch } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { vacationAPI } from "../../../API/vacationApi";
import { Vacation } from "../../../Model/Vacation";
import { vacationPageAction } from "../../../redux/action";
import { vacationActionType } from "../../../redux/action-type";
import { AppStateReduxType } from "../../../redux/store";
import { addSocketEvents } from "../../../socketIo/main";
import VacationsGraph from "./Graph";

//--------------types-----------------

interface mapStateToPropsType {
  vacations: Vacation[];
  isVacationsLoaded: boolean;
  isAdmin: boolean;
}

interface mapDispatchToPropsType {
  getVacationsData(): void;
  openSocketIo(): void;
  getGraphFullData(vacations: Vacation[]): any;
}

//Helper functions for graph data

const getVacationsWithFollower = (vacations: Vacation[]): Vacation[] => {
  const followedVacations = vacations.filter((vacation) => {
    return vacation.followers > 0;
  });
  return followedVacations;
};

const getLabels = (vacations: Vacation[]): string[] => {
  const followedVacations = getVacationsWithFollower(vacations);
  const labels = followedVacations.map((vacation) => {
    return "vacation id" + vacation.id;
  });
  return labels;
};

const getDataGraph = (vacations: Vacation[]): number[] => {
  const followedVacations = getVacationsWithFollower(vacations);
  const data = followedVacations.map((vacation) => {
    return vacation.followers;
  });
  return data;
};

const getGraphFullData = (vacations: Vacation[]) => {
  return {
    labels: getLabels(vacations),
    datasets: [
      {
        label: "Followers",
        backgroundColor: "blue",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: getDataGraph(vacations),
        maxBarThickness: 250,
      },
    ],
  };
};

//------------react-redux functions----------------
const mapStateToProps = (state: AppStateReduxType): mapStateToPropsType => {
  return {
    vacations: state.vacationsPage.vacations,
    isVacationsLoaded: state.vacationsPage.isVacationsLoaded,
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
        toast.error("Connection failed please try later");
      }
    },

    openSocketIo: async () => {
      addSocketEvents();
    },

    getGraphFullData: (vacations: Vacation[]) => {
      return getGraphFullData(vacations);
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
)(VacationsGraph);
export default VacationsContainer;
