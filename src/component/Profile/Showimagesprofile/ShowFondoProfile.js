import React, { useCallback, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getMe, updateFondoUser } from "../../../api/usersAPI";
import { useDispatch } from "react-redux";
import { setDetail } from "../../../actions";

export default function ShowFondoProfile({ show, handleClose, image, miImfo }) {
  const [actualizar, setActualizar] = useState(false);
  const dispatch = useDispatch();
  const getUserImfo = async () => {
    const me = await getMe();
    const { data } = me;
    dispatch(setDetail(data));
  };

  const onDrop = useCallback(async (file) => {
    await formik.setFieldValue("fondo", file[0]);
    setActualizar(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpeg",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchame()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
      try {
        await updateFondoUser(miImfo.id, formValue);
        handleClose();
        getUserImfo();
        setActualizar(false);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div>
      <Modal show={show} onHide={handleClose} animation={false}>
        {miImfo ? (
          <>
            <Form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-dark my-1"
                  type="button"
                  {...getRootProps()}
                >
                  Actualizar la imagen
                </button>
                <input {...getInputProps()} />
              </div>
              {actualizar && (
                <div>
                  <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit">
                      Actualizar
                    </Button>
                  </div>
                </div>
              )}
            </Form>
            <img
              src={`http://127.0.0.1:8000${image}`}
              className="rounded"
              alt="imagen_profile"
            />
          </>
        ) : (
          <img src={image} className="rounded" alt="imagen_profile" />
        )}
      </Modal>
    </div>
  );
}

function initialValues() {
  return {
    fondo: "",
  };
}

function newSchame() {
  return {
    fondo: Yup.string(),
  };
}
