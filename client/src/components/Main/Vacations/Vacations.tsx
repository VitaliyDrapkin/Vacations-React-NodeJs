import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Vacation } from "../../../Model/Vacation";
import VacationItemContainer from "./VacationItem/VacationItemContainer";
import s from "./Vacations.module.css";

interface VacationProps {
  vacations: Vacation[];
  isVacationsLoaded: boolean;
  isAdmin: boolean;
  isModalOpen: boolean;
  onClickShowModalAddVacation(): void;
  getVacationsData(): void;
}

export class Vacations extends Component<VacationProps> {
  componentDidMount() {
    //Don't upload again vacations
    if (this.props.isVacationsLoaded) {
      return;
    }
    this.props.getVacationsData();
  }

  render() {
    return (
      <div className={s.vacations}>
        {this.props.isAdmin && (
          <div className={s.adminButtons}>
            <div className={s.addVacationDiv}>
              <button onClick={this.props.onClickShowModalAddVacation}>
                Add Vacation
              </button>
            </div>
            <div className={s.addVacationDiv}>
              <NavLink to="/graph">Vacations graph</NavLink>
            </div>
          </div>
        )}
        {this.props.vacations.map((vacation: Vacation) => (
          <VacationItemContainer vacation={vacation} key={vacation.id} />
        ))}
      </div>
    );
  }
}

export default Vacations;
