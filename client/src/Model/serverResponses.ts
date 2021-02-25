import { serverVacationType } from "./Vacation";

export class SuccessfulLoginServerResponse {
  public constructor(
    public userName: string,
    public userType: string
  ) {}
}

export class SuccessfulGetVacationsServerResponse {
  public constructor(public vacations: serverVacationType[]) {}
}

export class SuccessfulNoDataResponse {
  public constructor() {}
}

export class SuccessfulAddPhotoResponse {
  public constructor(public imgUrl: string) {}
}
export class SuccessfulAddNewVacation {
  public constructor(public vacationId: number) {}
}
