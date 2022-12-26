import React, { useCallback, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDropzone } from "react-dropzone";
import Button from "react-bootstrap/Button";
import classNames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./PostForm.css";
import { useSelector, useDispatch } from "react-redux";
import { addPosts, getPosts } from "../../api/postsAPI";
import { setPosts } from "../../actions/posts";

export default function PostForm({ show, handleClose }) {
  const dispatch = useDispatch();
  const [userid, setUserid] = useState(null);
  const miImfo = useSelector((state) => state.userReducer.detail);
  const [image, setImage] = useState(null);
  const subirImage = useCallback(async (aceptefile) => {
    await formik.setFieldValue("image", aceptefile[0]);
    setImage(URL.createObjectURL(aceptefile[0]));
  }, []);

  useEffect(() => {
    if (miImfo !== null) {
      setUserid(miImfo.id);
    }
  }, [miImfo]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpg, image/png, image/svg",
    noKeyboard: true,
    multiple: false,
    onDrop: subirImage,
  });
  const getposts = async () => {
    const respuesta = await getPosts();
    dispatch(setPosts(respuesta));
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchame()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await addPosts(formValue, userid);
        handleClose();
        getposts();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creando nuevo post</Modal.Title>
        </Modal.Header>
        <div className="p-4">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                className={classNames({ "text-danger": formik.errors.text })}
              >
                texto del la imagen
              </Form.Label>
              <Form.Control
                type="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                placeholder="texto de la imagen"
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className={classNames("btn btn-dark mb-3", {
                  "text-danger": formik.errors.image,
                })}
                {...getRootProps()}
              >
                Subir Imagen
              </button>
              <input {...getInputProps()} />
            </div>
            <div className=" d-flex justify-content-center mb-3">
              <img src={image} className="tamaño_image_form" />
            </div>
            <div>
              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  Crear Post
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

function initialValues() {
  return {
    text: "",
    image: "",
  };
}

function newSchame() {
  return {
    text: Yup.string().required(true),
    image: Yup.string(),
  };
}
