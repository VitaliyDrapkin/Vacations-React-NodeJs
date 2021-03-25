import { addSocketEvents } from "./../socketIo/main";
import { Vacation } from "./../Model/Vacation";
import { vacationActionType } from "./action-type";
import { vacationPageAction } from "./action";
import { AppState } from "./app-state";

//---helpers function-----

const sortFollowedVacations = (vacations: Vacation[]): Vacation[] => {
  const newVacations = vacations.sort((vacationA, vacationB) => {
    if (vacationA.isFollowed === vacationB.isFollowed) {
      return 0;
    } else if (vacationA.isFollowed && !vacationB.isFollowed) {
      return -1;
    } else {
      return 1;
    }
  });
  return newVacations;
};

const startBeFollower = (
  vacations: Vacation[],
  vacationId: number
): Vacation[] => {
  const newVacations = vacations.map((vacation) => {
    if (vacation.id === vacationId) {
      if (vacation.isFollowed === true) {
        return vacation;
      }
      return {
        ...vacation,
        isFollowed: true,
        followers: vacation.followers + 1,
      };
    }
    return vacation;
  });
  return newVacations;
};

const endBeFollower = (
  vacations: Vacation[],
  vacationId: number
): Vacation[] => {
  const newVacations = vacations.map((vacation) => {
    if (vacation.id === vacationId) {
      if (vacation.isFollowed === false) {
        return vacation;
      }
      return {
        ...vacation,
        isFollowed: false,
        followers: vacation.followers - 1,
      };
    }
    return vacation;
  });
  return newVacations;
};

const followerAdded = (
  vacations: Vacation[],
  vacationId: number
): Vacation[] => {
  const newVacations = vacations.map((vacation) => {
    if (vacation.id === vacationId) {
      return {
        ...vacation,
        followers: vacation.followers + 1,
      };
    }
    return vacation;
  });
  return newVacations;
};

const followerRemoved = (
  vacations: Vacation[],
  vacationId: number
): Vacation[] => {
  const newVacations = vacations.map((vacation) => {
    if (vacation.id === vacationId) {
      return {
        ...vacation,
        followers: vacation.followers - 1,
      };
    }
    return vacation;
  });
  return newVacations;
};

//Vacation reducer
const initialState: AppState = {
  vacations: [],
  isModalOpen: false,
  isEditMode: false,
  editVacation: null,
  isVacationsLoaded: false,
  lastVacationID: -1,
};

export function vacationReducer(
  oldAppState: AppState = initialState,
  action: vacationPageAction
): AppState {
  switch (action.type) {
    case vacationActionType.setAllVacationsData:
      addSocketEvents();
      return {
        ...oldAppState,
        vacations: action.payload,
        isVacationsLoaded: true,
      };

    case vacationActionType.addVacation:
      const newVacation = new Vacation(
        action.payload.vacationId,
        action.payload.description,
        action.payload.price,
        action.payload.imgUrl,
        action.payload.startDate,
        action.payload.endDate,
        false,
        0
      );
      return {
        ...oldAppState,
        vacations: [...oldAppState.vacations, newVacation],
        isModalOpen: false,
      };

    case vacationActionType.editVacation:
      const editVacations = oldAppState.vacations.map((vacation) => {
        if (vacation.id === action.payload.id) {
          return new Vacation(
            action.payload.id,
            action.payload.description,
            action.payload.price,
            action.payload.imgUrl,
            action.payload.startDate,
            action.payload.endDate,
            vacation.isFollowed,
            vacation.followers
          );
        }
        return vacation;
      });

      return {
        ...oldAppState,
        vacations: editVacations,
        isModalOpen: false,
      };

    case vacationActionType.deleteVacation:
      return {
        ...oldAppState,
        vacations: oldAppState.vacations.filter((vacation) => {
          return vacation.id !== action.payload;
        }),
      };

    case vacationActionType.showModalEditMode:
      return {
        ...oldAppState,
        isModalOpen: true,
        isEditMode: true,
        editVacation: action.payload,
      };

    case vacationActionType.showModalAddMode:
      return {
        ...oldAppState,
        isModalOpen: true,
        isEditMode: false,
      };

    case vacationActionType.hideModal:
      return { ...oldAppState, isModalOpen: false };

    //Follow vacation, sort by follow/unfollow, return newVacations
    case vacationActionType.vacationFollow:
      const vacationsFollow = startBeFollower(
        oldAppState.vacations,
        action.payload
      );
      return {
        ...oldAppState,
        vacations: sortFollowedVacations(vacationsFollow),
      };

    //Unfollow, sort by follow/unfollow, return newVacations
    case vacationActionType.vacationUnfollow:
      const vacationsUnfollow = endBeFollower(
        oldAppState.vacations,
        action.payload
      );
      return {
        ...oldAppState,
        vacations: sortFollowedVacations(vacationsUnfollow),
      };

    //Add follower
    case vacationActionType.addFollower:
      const vacationAddFollower = followerAdded(
        oldAppState.vacations,
        action.payload
      );
      return {
        ...oldAppState,
        vacations: vacationAddFollower,
      };

    //remove follower
    case vacationActionType.removeFollower:
      const vacationRemoveFollower = followerRemoved(
        oldAppState.vacations,
        action.payload
      );
      return {
        ...oldAppState,
        vacations: vacationRemoveFollower,
      };

    default:
      return oldAppState;
  }
}
