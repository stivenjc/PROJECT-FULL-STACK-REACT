import React, { useEffect, useState } from "react";
import { getByUsers } from "../api/usersAPI";
import Button from "react-bootstrap/Button";
import MyPosts from "../component/Profile/myPosts/MyPosts";
import Showprofile from "../component/Profile/Showimagesprofile/Showprofile";
import ShowFondoProfile from "../component/Profile/Showimagesprofile/ShowFondoProfile";

export default function DetalleUser({ id }) {
  const [showperfil, setShowPerfil] = useState(false);
  const [miImfo, setMiImfo] = useState({});
  const [showFondo, setShowFondo] = useState(false);

  const getbyuser = async (userid) => {
    const respuesta = await getByUsers(userid);
    setMiImfo(respuesta);
  };

  const handleClosePerfil = () => setShowPerfil(false);
  const handleShowPerfil = () => setShowPerfil(true);

  const handleCloseFondo = () => setShowFondo(false);
  const handleShowFondo = () => setShowFondo(true);

  useEffect(() => {
    getbyuser(id);
  }, [id]);

  return (
    <>
      <div>
        <div className="d-flex justify-content-around">
          <div className="tamano-div-bagraund-profile mb-5">
            <Button
              style={{ width: "100%" }}
              variant=""
              onClick={handleShowFondo}
            >
              <img
                src={miImfo.fondo}
                className="border-white tamano-bagraund-profile p-2"
              />
            </Button>
            <ShowFondoProfile
              show={showFondo}
              handleClose={handleCloseFondo}
              handleShow={handleShowFondo}
              image={miImfo.fondo}
            />
            <div className="d-flex justify-content-center stile-image-profile">
              <Button variant="" onClick={handleShowPerfil}>
                <img
                  src={miImfo.foto}
                  className="width-image-profile rounded-circle border border-dark p-2"
                />
              </Button>
              <Showprofile
                show={showperfil}
                handleClose={handleClosePerfil}
                handleShow={handleShowPerfil}
                image={miImfo.foto}
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
        </div>
        <div className="border-top mx-5">
          <MyPosts miImfo={miImfo} />
        </div>
      </div>
    </>
  );
}
