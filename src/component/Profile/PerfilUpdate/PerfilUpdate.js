import React, { useEffect, useState, useCallback } from "react";
import "./PerfilUpdate.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUsers } from "../../../api/usersAPI";

export default function PerfilUpdate({
  show,
  handleClose,
  miImfo,
  getUserImfo,
}) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (miImfo) {
      setImage(`http://127.0.0.1:8000${miImfo?.foto}
      `);
    }
  }, [miImfo]);

  const onDrop = useCallback(async (file) => {
    await formik.setFieldValue("foto", file[0]);
    setImage(URL.createObjectURL(file[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpeg",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const formik = useFormik({
    initialValues: initialValues(miImfo),
    validationSchema: Yup.object(newSchame()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (formValue.foto == miImfo.foto) {
          delete formValue.foto;
        }
        await updateUsers(miImfo.id, formValue);
        handleClose();
        getUserImfo();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Datos Personales</Modal.Title>
        </Modal.Header>
        <div className="p-4">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                className={classNames({
                  "text-danger": formik.errors.email,
                })}
              >
                Email
              </Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                className={classNames({
                  "text-danger": formik.errors.username,
                })}
              >
                Username
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                className={classNames({
                  "text-danger": formik.errors.first_name,
                })}
              >
                Primer Nombre
              </Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                placeholder="Primer Nombre"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                className={classNames({
                  "text-danger": formik.errors.last_name,
                })}
              >
                Apellidos
              </Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                placeholder="Apellidos"
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                {...getRootProps()}
                className={classNames("btn btn-dark mb-3", {
                  "text-danger": formik.errors.foto,
                })}
              >
                Subir Nueva Imagen
              </button>
              <input {...getInputProps()} />
            </div>
            <div className=" d-flex justify-content-center mb-3">
              <img src={image} className="tamaño_image_form" />
            </div>
            <div>
              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  Actualizar
                </Button>
              </div>
            </div>
          </Form>
        </div>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

function initialValues(data) {
  return {
    email: data?.email || "",
    username: data?.username || "",
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    foto: data?.foto || "",
  };
}

function newSchame() {
  return {
    email: Yup.string().required(),
    username: Yup.string().required(),
    first_name: Yup.string(),
    last_name: Yup.string(),
    foto: Yup.string(),
  };
}
