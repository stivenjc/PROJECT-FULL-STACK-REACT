import React, { useState } from "react";
import "./ImfoProfile.css";
import Button from "react-bootstrap/Button";
import PerfilUpdate from "../../component/Profile/PerfilUpdate/PerfilUpdate";
import settingsIcon from "../../static/iconos/settings-outline.svg";
import MyPosts from "./myPosts/MyPosts";
import ConfiPassword from "../ConfiPassword/ConfiPassword";
import Showprofile from "./Showimagesprofile/Showprofile";
import ShowFondoProfile from "./Showimagesprofile/ShowFondoProfile";

export default function ImfoProfile({ getUserImfo, miImfo }) {
  const [show, setShow] = useState(false);
  const [showpasswords, setShowpasswords] = useState(false);
  const [showperfil, setShowPerfil] = useState(false);
  const [showFondo, setShowFondo] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClosePasswod = () => setShowpasswords(false);
  const handleShowPassword = () => setShowpasswords(true);

  const handleClosePerfil = () => setShowPerfil(false);
  const handleShowPerfil = () => setShowPerfil(true);

  const handleCloseFondo = () => setShowFondo(false);
  const handleShowFondo = () => setShowFondo(true);

  return (
    <div>
      <div className="d-flex justify-content-around">
        <div className="tamano-div-bagraund-profile mb-5 border">
          <Button
            style={{ width: "100%" }}
            variant=""
            onClick={handleShowFondo}
          >
            <img
              src={`http://127.0.0.1:8000${miImfo.fondo}`}
              className="border-white img-fluid tamano-bagraund-profile p-2 border"
            />
          </Button>
          <ShowFondoProfile
            show={showFondo}
            handleClose={handleCloseFondo}
            handleShow={handleShowFondo}
            image={miImfo.fondo}
            miImfo={miImfo}
          />
          <div className="d-flex justify-content-center stile-image-profile">
            <Button variant="" onClick={handleShowPerfil}>
              <img
                src={`http://127.0.0.1:8000${miImfo.foto}`}
                className="width-image-profile rounded-circle border border-dark p-2"
              />
            </Button>
            <Showprofile
              show={showperfil}
              handleClose={handleClosePerfil}
              handleShow={handleShowPerfil}
              image={miImfo.foto}
              miImfo={miImfo}
            />
            <h2>{miImfo.username}</h2>
          </div>
        </div>
      </div>
      <div className=" mt-5">
        <div className=" mb-5  d-flex justify-content-around">
          <h3 className="">Primer Nombre: {miImfo?.first_name}</h3>
          <h3 className="ml-3 ">Apellidos: {miImfo?.last_name}</h3>
          <h3 className="">Correo: {miImfo?.email}</h3>
        </div>
        <div className="d-flex justify-content-around">
          <div className="">
            <Button
              className="d-flex align-items-center tamaño_button_edit_profile shadow p-3 mb-5 bg-secondary rounded bg-opacity-25 "
              variant=""
              onClick={handleShow}
            >
              <img className="img-fluid " src={settingsIcon} />
            </Button>
            <PerfilUpdate
              show={show}
              handleClose={handleClose}
              handleShow={handleShow}
              miImfo={miImfo}
              getUserImfo={getUserImfo}
            />
          </div>
          <div className="">
            <Button
              className="d-flex align-items-center justify-content-center tamaño_button_edit_profile btn btn-dark"
              variant=""
              onClick={handleShowPassword}
            >
              Cambiar contraseña
            </Button>
            <ConfiPassword
              show={showpasswords}
              handleClose={handleClosePasswod}
              handleShow={handleShowPassword}
            />
          </div>
        </div>
      </div>
      <div className="border-top mx-5">
        <MyPosts miImfo={miImfo} />
      </div>
    </div>
  );
}
