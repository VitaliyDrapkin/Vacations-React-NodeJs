import React, { ChangeEvent } from "react";
import s from "./VacationManipulation.module.css";
import { Vacation } from "../../../../Model/Vacation";
import { Form, Formik, Field } from "formik";
import {
  validateDateEnd,
  validateDateStart,
  validateDescription,
  validatePrice,
} from "../../../formik/validators/validators";
import CustomInputComponent from "../../../formik/formControls/formControls";
import photoImg from "../../../../assets/images/icons/addImg.png";
import VacationItemContainer from "../VacationItem/VacationItemContainer";

//-----------types--------------

interface VacationManipulationProps {
  isEditMode: boolean;
  oldVacation: Vacation;
  isNewImage: boolean;
  imgUrl: string;
  imgFile: File;

  validationPhoto(file: File): boolean;
  addNewImageRedux(image: File): void;

  onCloseModal(): void;

  onAddNewVacation(
    description: string,
    price: number,
    startDate: string,
    endDate: string,
    isNewImage: boolean,
    imageFile: File
  ): void;

  onEditVacation(
    id: number,
    description: string,
    price: number,
    startDate: string,
    endDate: string,
    oldImgUrl: string,
    isNewImage: boolean,
    imageFile: File
  ): void;
}

type inputsValueType = {
  description: string;
  price: number;
  startDate: string;
  endDate: string;
};

//-------------component----------------
export default function VacationManipulation(props: VacationManipulationProps) {
  const onClickAddVacation = async (value: inputsValueType) => {
    await props.onAddNewVacation(
      value.description,
      value.price,
      value.startDate,
      value.endDate,
      props.isNewImage,
      props.imgFile
    );
  };

  const onClickEditVacation = async (value: inputsValueType) => {
    props.onEditVacation(
      props.oldVacation.id,
      value.description,
      value.price,
      value.startDate,
      value.endDate,
      props.oldVacation.imageUrl,
      props.isNewImage,
      props.imgFile
    );
  };

  const onSetImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const validation = props.validationPhoto(file);
    if (validation) {
      props.addNewImageRedux(file);
    }
  };

  return (
    <div className={s.vacationManipulation}>
      <div className={s.modalWindow}>
        {props.isEditMode ? (
          <div className={s.header}>Edit Vacation</div>
        ) : (
          <div className={s.header}>Add Vacation</div>
        )}

        <Formik
          initialValues={
            props.isEditMode
              ? {
                  //value of old vacation
                  description: props.oldVacation.description,
                  startDate: props.oldVacation.startDate,
                  endDate: props.oldVacation.endDate,
                  price: props.oldVacation.price,
                }
              : {
                  //new values
                  description: "",
                  startDate: new Date().toISOString().slice(0, 10),
                  endDate: new Date().toISOString().slice(0, 10),
                  price: 0,
                }
          }
          onSubmit={
            props.isEditMode
              ? (values) => onClickEditVacation(values)
              : (values) => onClickAddVacation(values)
          }
        >
          {({ values, handleChange, isSubmitting, setSubmitting }) => {
            return (
              <Form>
                <div className={s.body}>
                  <div className={s.form}>
                    <div className={s.inputField}>
                      <Field
                        maxLength={80}
                        placeholder="description"
                        type="input"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        validate={validateDescription}
                        component={CustomInputComponent}
                      />
                    </div>
                    <div className={s.inputField}>
                      <Field
                        onKeyDown={(e: {
                          keyCode: number;
                          preventDefault(): void;
                        }) =>
                          (e.keyCode === 69 ||
                            e.keyCode === 187 ||
                            e.keyCode === 189) &&
                          e.preventDefault()
                        }
                        max={999999}
                        placeholder="Price"
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        validate={validatePrice}
                        component={CustomInputComponent}
                      />
                    </div>
                    <div className={s.inputFieldDate}>
                      <div className={s.dateText}>Start Date</div>
                      <div className={s.dateDiv}>
                        <Field
                          onKeyDown={(e: {
                            keyCode: number;
                            preventDefault(): void;
                          }) =>
                            (e.keyCode === 46 || e.keyCode === 8) &&
                            e.preventDefault()
                          }
                          min={new Date().toISOString().slice(0, 10)}
                          max="2999-01-01"
                          placeholder="Start Date"
                          type="date"
                          name="startDate"
                          value={values.startDate}
                          onChange={handleChange}
                          validate={() =>
                            validateDateStart(
                              values.startDate,
                              new Date().toISOString().slice(0, 10)
                            )
                          }
                          component={CustomInputComponent}
                        />
                      </div>
                    </div>
                    <div className={s.inputFieldDate}>
                      <div className={s.dateText}>End Date</div>
                      <div className={s.dateDiv}>
                        <Field
                          onKeyDown={(e: {
                            keyCode: number;
                            preventDefault(): void;
                          }) =>
                            (e.keyCode === 46 || e.keyCode === 8) &&
                            e.preventDefault()
                          }
                          min={new Date().toISOString().slice(0, 10)}
                          max="2999-01-01"
                          placeholder="End Date"
                          type="date"
                          name="endDate"
                          value={values.endDate}
                          onChange={handleChange}
                          validate={() =>
                            validateDateEnd(values.endDate, values.startDate)
                          }
                          component={CustomInputComponent}
                        />
                      </div>
                    </div>
                    <div className={s.buttons}>
                      <div className={s.imgBTN}>
                        <input
                          className={s.imgInputFile}
                          multiple={false}
                          type="file"
                          onChange={onSetImage}
                          accept="image/*"
                        />
                        <img src={photoImg} alt="" />
                      </div>
                      <div className={s.simpleBTN} onClick={props.onCloseModal}>
                        <button className={s.closeBTN} type="button">
                          Close
                        </button>
                      </div>
                      <div className={s.simpleBTN}>
                        <button
                          className={s.saveBTN}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                  <VacationItemContainer
                    vacation={
                      new Vacation(
                        1,
                        values.description,
                        values.price,
                        //if is new image insert her
                        //if not check if is edit mode
                        //if true insert old image , if false insert null
                        props.isNewImage
                          ? props.imgUrl
                          : props.isEditMode
                          ? props.oldVacation.imageUrl
                          : null,
                        values.startDate,
                        values.endDate,
                        false,
                        0
                      )
                    }
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
