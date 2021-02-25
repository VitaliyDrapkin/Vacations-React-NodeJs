import React from "react";
import s from "./Registration.module.css";
import RegistrationFormContainer from "./RegistrationForm/RegistrationFormContainer";

export default function Registration() {
  return (
    <div className={s.registration}>
      <div className={s.registrationField}>
        <div className={s.registrationHeader}>Registration</div>
        <RegistrationFormContainer />
      </div>
    </div>
  );
}
