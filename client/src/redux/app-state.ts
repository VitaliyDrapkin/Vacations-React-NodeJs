import { pizza } from './../Model/pizza';
import { Coupon } from "../models/Coupon";

export class AppState {
  public coupons: pizza[] = [];
  public isLoggedIn: boolean = false;
}
