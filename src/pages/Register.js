import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import classNames from "classnames";
import Form from "react-bootstrap/Form";
import { registerAPI } from "../api/loginAPI";
import { useNavigate } from "react-router";
import OpenEye from "../static/iconos/eye-outline.svg";
import CloseEye from "../static/iconos/eye-off-outline.svg";
import "./Register.css";

export default function Register() {
  const [showpwd, setShowpwd] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues(),

    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await registerAPI(formValue);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <section className="d-flex align-items-center justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
      <Form
        onSubmit={formik.handleSubmit}
        className="border p-3 shadow-lg p-3 mb-5 bg-body rounded"
      >
        <div className="d-flex justify-content-center">
          <h1>Register</h1>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label
            className={classNames({ "text-danger": formik.errors.username })}
          >
            Nombre de usuario
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre de usuario"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label
            className={classNames({ "text-danger": formik.errors.email })}
          >
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label
            className={classNames({ "text-danger": formik.errors.first_name })}
          >
            Primer Nombre
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Primer Nombre"
            name="first_name"
            onChange={formik.handleChange}
            value={formik.values.first_name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label
            className={classNames({ "text-danger": formik.errors.last_name })}
          >
            Apellidos
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellidos"
            name="last_name"
            onChange={formik.handleChange}
            value={formik.values.last_name}
          />
        </Form.Group>

        <Form.Group
          className="mb-3 register-password"
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
            className="register-image-eyes"
            onClick={() => setShowpwd(!showpwd)}
          />
        </Form.Group>

        <Form.Group
          className="mb-3 register-password"
          controlId="formBasicPassword"
        >
          <Form.Label
            className={classNames({ "text-danger": formik.errors.password2 })}
          >
            Password Confirm
          </Form.Label>
          <Form.Control
            type={showpwd ? "text" : "password"}
            placeholder="Password confirm"
            name="password2"
            onChange={formik.handleChange}
            value={formik.values.password2}
          />
          <img
            src={showpwd ? OpenEye : CloseEye}
            className="register-image-eyes"
            onClick={() => setShowpwd(!showpwd)}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            type="submit"
            className="d-flex justify-content-center"
          >
            Registrarse
          </Button>
        </div>
      </Form>
    </section>
  );
}

function initialValues() {
  return {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string().required(true),
    password2: Yup.string().required(true),
  };
}
