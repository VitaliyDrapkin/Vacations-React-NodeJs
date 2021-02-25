import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import s from "./Main.module.css";
import Preloader from "./Preloader";
import Registration from "./Registration/Registration";
import VacationsContainer from "./Vacations/VacationsContainer";
import VacationsGraphContainer from "./Graph/GraphContainer";

//---types---

interface VacationProps {
  isAuth: boolean;
  isInitialized: boolean;
  autoLogin(): void;
}

//-----component-------

export class Main extends Component<VacationProps> {
  componentDidMount() {
    this.props.autoLogin();
  }

  //Don't start before isInitialized
  //if logged in redirect to vacations
  //if not logged in redirect to login

  render() {
    return !this.props.isInitialized ? (
      <Preloader />
    ) : (
      <div className={s.main}>
        {this.props.isAuth ? (
          <Switch>
            <Redirect path="/login" to="/vacations" exact />
            <Redirect path="/" to="/vacations" exact />
            <Redirect path="/registration" to="/vacations" exact />
            <Route path="/vacations" render={() => <VacationsContainer />} />
            <Route path="/graph" render={() => <VacationsGraphContainer />} />
          </Switch>
        ) : (
          <Switch>
            <Redirect path="/vacations" to="/login" exact />
            <Redirect path="/graph" to="/login" exact />
            <Redirect path="/" to="/login" exact />
            <Route path="/login" render={() => <Login />} />
            <Route path="/Registration" render={() => <Registration />} />
          </Switch>
        )}
      </div>
    );
  }
}

export default Main;
