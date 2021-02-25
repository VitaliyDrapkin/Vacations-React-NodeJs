import React from "react";
import s from "./Header.module.css";
import adminIcon from "../../assets/images/icons/admin.png";

interface HeaderProps {
  isAuth: boolean;
  isAdmin: boolean;
  loginName: string;
  onLogout(): void;
}

export default function Header(props: HeaderProps) {
  return (
    <div className={s.header}>
      <h1>Best vacations</h1>
      <div className={s.login}>
        {props.isAdmin && (
          <div className={s.adminIcon}>
            <img src={adminIcon} alt="" />
          </div>
        )}
        <div className={s.loginName}> {props.loginName} </div>
        {props.isAuth && <button onClick={props.onLogout}>Logout</button>}
      </div>
    </div>
  );
}
