import React from "react";
import s from "./RegistrationForm.module.css";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  simpleValidateNames,
  validatePassword,
  validateUserName,
} from "../../../formik/validators/validators";
import CustomInputComponent from "../../../formik/formControls/formControls";

//--------------types-----------------

type registrationFormikProps = {
  onRegistration(
    userName: string,
    firstName: string,
    lastName: string,
    password: string
  ): void;
};

type initialValuesType = {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
};

type setErrorsType = {
  ({ userName }: { userName: string }): void;
};

type setSubmittingType = { (isSubmit: boolean): void };

//------------component--------------

export default function RegistrationFormik(props: registrationFormikProps) {
  //Formik Values state
  const initialValues: initialValuesType = {
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
  };

  const onClickRegistration = async (
    value: initialValuesType,
    setErrors: setErrorsType,
    setSubmitting: setSubmittingType
  ) => {
    try {
      await props.onRegistration(
        value.userName,
        value.firstName,
        value.lastName,
        value.password
      );
    } catch (error) {
      //throw here only this error
      setErrors({ userName: "User name is already in use" });
      setSubmitting(false);
    }
  };

  return (
    <div className={s.registrationForm}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          onClickRegistration(values, setErrors, setSubmitting);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.inputField}>
              <Field
                placeholder="User name"
                type="text"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                validate={validateUserName}
                component={CustomInputComponent}
              />
            </div>
            <div className={s.inputField}>
              <Field
                placeholder="First Name"
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                validate={simpleValidateNames}
                component={CustomInputComponent}
              />
            </div>
            <div className={s.inputField}>
              <Field
                placeholder="Last name"
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                validate={simpleValidateNames}
                component={CustomInputComponent}
              />
            </div>
            <div className={s.inputField}>
              <Field
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                validate={validatePassword}
                component={CustomInputComponent}
              />
            </div>
            <div className={s.goToRegisterBTN}>
              Already Registered?
              <NavLink to="/login"> Click here to login</NavLink>
            </div>
            <div className={s.inputField}>
              <button type="submit" disabled={isSubmitting}>
                Registration
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
