import React from "react";
import style from "./LoginPage.module.css";
import images from "../../../images/FarmZone.png";
import { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { SignupSchema } from "./ValidationLoginPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function FormField({ name, errors, touched }) {
  return (
    <div>
      <label>{name} </label>
      <Field name={name} />
      {errors[name] && touched[name] ? <div>{errors[name]}</div> : null}
    </div>
  );
}

function validateLogin(value) {
  let error;
  if (value !== "Admin") {
    error = "Use the set login: Admin";
  }
  return error;
}

function validatePassword(value) {
  let error;
  if (value !== "12345") {
    error = "Use the set password: 12345 ";
  }
  return error;
}

export const LoginPage = () => {
  const [login, setLogin] = useState();
  const navigate = useNavigate();

  let inputValue = useRef();

  return (
    <>
      <Formik
        initialValues={{
          Login: "",
          Password: "",
        }}
        onSubmit={(values) => {
          // tabelke z login haslo
          // user login
          // pobierasz z bazy login haslo
          // czy takie samo
          // -> wpuszczamy i do context ze zalogowany
          // -> jak nie to blad
          navigate("/pulpit");
          const currentinputValue = inputValue.current.value;
          console.log(currentinputValue);
          console.log(values);
          axios({
            method: "GET",
            url: "http://localhost:3000/user/",
            headers: { "Content-Type": "application/json" },
            data: values,
          })
            .then(function (data) {
              setLogin(data);
            })
            .catch(function (data) {
              console.log(data);
            });
        }}
      >
        <div>
          <Form className={style.container}>
            <img src={images} className={style.container__images} alt="logo" />
            <div className={style.login}>
              <h1 className={style.login__title}>Logowanie do systemu</h1>
              <Field name={"Login"} validate={validateLogin}>
                {({ field, meta }) => (
                  <div>
                    <input
                      className={style.login__input}
                      type="text"
                      placeholder="Login"
                      {...field}
                      ref={inputValue}
                    />
                    {meta.touched && meta.error && (
                      <div className={style.error}>{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
              <Field name={"Password"} validate={validatePassword}>
                {({ field, meta }) => (
                  <div>
                    <input
                      className={style.login__input}
                      type="Password"
                      placeholder="Password"
                      {...field}
                    />
                    {meta.touched && meta.error && (
                      <div className={style.error}>{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>
              <button type="submit" className={style.login__btn}>
                Zaloguj
              </button>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  );
};

export default LoginPage;
