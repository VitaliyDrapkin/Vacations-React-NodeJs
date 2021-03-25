export enum vacationActionType {
  addVacation = 1,
  editVacation,
  deleteVacation,
  setAllVacationsData,

  showModalAddMode,
  showModalEditMode,
  hideModal,

  vacationFollow,
  vacationUnfollow,
  addFollower,
  removeFollower,
}

export enum authActionType {
  login = 100,
  logout,
  initialized,
}

export enum imageManipulationActionType {
  setNewImage = 200,
  resetManipulationWindow,
}
