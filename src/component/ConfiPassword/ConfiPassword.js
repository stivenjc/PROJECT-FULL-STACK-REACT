import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import classNames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import { updatepasswordUsers } from "../../api/usersAPI";
import { removeToken } from "../../api/token";

export default function ConfiPassword({ show, handleClose }) {
  const navigate = useNavigate();
  const [errorapi, setErrorapi] = useState(null);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchame()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await updatepasswordUsers(formValue);
        handleClose();
        removeToken();
        navigate("/");
      } catch (error) {
        setErrorapi(error);
      }
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <div className="p-4">
        <Form onSubmit={formik.handleSubmit}>
          {errorapi && (
            <h2 className="text-danger">
              {errorapi.response.data.old_password}
            </h2>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label
              className={classNames({
                "text-danger": formik.errors.old_password,
              })}
            >
              Antigua contraseña
            </Form.Label>
            <Form.Control
              type="password"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="old_password"
              placeholder="antigua contraseña"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label
              className={classNames({
                "text-danger": formik.errors.new_password,
              })}
            >
              Nueva contraseña
            </Form.Label>
            <Form.Control
              type="password"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="new_password"
              placeholder="nueva contraseña"
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Actualizar Contraseña
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

function initialValues() {
  return {
    old_password: "",
    new_password: "",
  };
}

function newSchame() {
  return {
    old_password: Yup.string().required(),
    new_password: Yup.string().required(),
  };
}
