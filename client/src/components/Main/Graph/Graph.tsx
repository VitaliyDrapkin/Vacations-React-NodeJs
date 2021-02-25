import * as React from "react";
import { Bar } from "react-chartjs-2";
import { NavLink } from "react-router-dom";
import s from "./VacationsGraph.module.css";
import { Vacation } from "../../../Model/Vacation";

interface VacationGraphProps {
  vacations: Vacation[];
  isVacationsLoaded: boolean;
  isAdmin: boolean;
  getVacationsData(): void;
  openSocketIo(): void;
  getGraphFullData(vacations: Vacation[]): any;
}

export class VacationsGraph extends React.Component<VacationGraphProps> {
  async componentDidMount() {
    //Don't upload again vacations
    if (this.props.isVacationsLoaded) {
      return;
    }
    this.props.getVacationsData();
    this.props.openSocketIo();
  }

  render() {
    return (
      <div>
        <div className={s.vacationsGraph}>
          <div className={s.navlinkBtn}>
            <NavLink to="/vacations">Show vacations</NavLink>
          </div>
          {this.props.isAdmin ? (
            <div className={s.graph}>
              <article className={s.canvasContainer}>
                <Bar
                  data={this.props.getGraphFullData(this.props.vacations)}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            min: 0,
                          },
                        },
                      ],
                    },
                    title: {
                      display: true,
                      text: "Favorite vacations",
                      fontSize: 25,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </article>
            </div>
          ) : (
            <div className={s.permission}>
              You do not have permission to view this page.
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default VacationsGraph;
