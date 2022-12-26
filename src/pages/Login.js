import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { loginAPI } from "../api/loginAPI";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { setAuth } from "../actions";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./Login.css";
import OpenEye from "../static/iconos/eye-outline.svg";
import CloseEye from "../static/iconos/eye-off-outline.svg";

export default function Login() {
  const [error, setError] = useState(null);
  const [showpwd, setShowpwd] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues(),

    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const respuesta = await loginAPI(formValue);
        const { access } = respuesta;
        dispatch(setAuth({ access: access }));
        navigate("/dashboard/users");
      } catch (error) {
        setError(error);
      }
    },
  });

  return (
    <>
      <section className="d-flex align-items-center justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
        <Form
          onSubmit={formik.handleSubmit}
          className="border p-3 shadow-lg p-3 mb-5 bg-body rounded"
        >
          <div className="d-flex justify-content-center">
            <h1>Login</h1>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label
              className={classNames({ "text-danger": formik.errors.email })}
            >
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 login-password"
            controlId="formBasicPassword"
          >
            <Form.Label
              className={classNames({ "text-danger": formik.errors.password })}
            >
              Password
            </Form.Label>
            <Form.Control
              type={showpwd ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <img
              src={showpwd ? OpenEye : CloseEye}
              className="login-image-eyes"
              onClick={() => setShowpwd(!showpwd)}
            />
          </Form.Group>
          <div className="d-flex justify-content-center my-3">
            <Link to="/register">No tengo una cuenta aun!</Link>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              type="submit"
              className="d-flex justify-content-center"
            >
              Login
            </Button>
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              Usuario o contraseña incorrectos!!
            </div>
          )}
        </Form>
      </section>
    </>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
