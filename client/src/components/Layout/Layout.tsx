import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../../redux/store";
import HeaderContainer from "../Header/HeaderContainer";
import MainContainer from "../Main/MainContainer";
import VacationManipulationContainer from "../Main/Vacations/VacationManipulation/VacationManipulationContainer";
import s from "./Layout.module.css";

export class Layout extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className={s.layout}>
            <HeaderContainer />
            <MainContainer />
            <VacationManipulationContainer />
            <ToastContainer
              autoClose={2500}
              position="top-left"
              limit={3}
              pauseOnFocusLoss={false}
            />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default Layout;
