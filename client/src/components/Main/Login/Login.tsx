import React from "react";
import s from "./Login.module.css";
import LoginFormContainer from "./LoginForm/LoginFormContainer";

export default function Login() {
  return (
    <div className={s.login}>
      <div className={s.loginField}>
        <h1 className={s.loginHeader}>Login</h1>
        <LoginFormContainer />
      </div>
    </div>
  );
}
