import React from "react";
import { NavLink } from "react-router-dom";
import s from "./LoginForm.module.css";
import { Formik, Form, Field } from "formik";
import {
  validatePassword,
  validateUserName,
} from "../../../formik/validators/validators";
import CustomInputComponent from "../../../formik/formControls/formControls";

//-------------types--------------
type LoginFormikProps = {
  onLogin(login: string, password: string): void;
};

type initialValuesType = {
  userName: string;
  password: string;
};

type setErrorsType = {
  ({ userName, password }: initialValuesType): void;
};

type setSubmittingType = { (isSubmit: boolean): void };

//------------component-------------

export default function LoginFormik(props: LoginFormikProps) {
  //Formik values state
  const initialValues: initialValuesType = { userName: "", password: "" };

  const onClickLogin = async (
    value: initialValuesType,
    setErrors: setErrorsType,
    setSubmitting: setSubmittingType
  ) => {
    try {
      await props.onLogin(value.userName, value.password);
    } catch (error) {
      //if authorization Error show in inputs to user
      setErrors({
        userName: "Incorrect username or password",
        password: "Incorrect username or password",
      });
      //Allow button click
      setSubmitting(false);
    }
  };

  return (
    <div className={s.loginForm}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          onClickLogin(values, setErrors, setSubmitting);
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
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                validate={validatePassword}
                component={CustomInputComponent}
              />
            </div>
            <div className={s.goToLoginBTN}>
              Not Registered?
              <NavLink to="/registration"> Sign Up Here</NavLink>
            </div>
            <div className={s.inputField}>
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
