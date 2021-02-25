export class Vacation {
  public constructor(
    public id: number,
    public description: string,
    public price: number,
    public imageUrl: string,
    public startDate: string,
    public endDate: string,
    public isFollowed: boolean,
    public followers: number
  ) {}
}

export class serverVacationType {
  public constructor(
    public vacationId: number,
    public description: string,
    public price: number,
    public imgUrl: string,
    public startDate: string,
    public endDate: string,
    public user: number,
    public count: number
  ) {}
}
