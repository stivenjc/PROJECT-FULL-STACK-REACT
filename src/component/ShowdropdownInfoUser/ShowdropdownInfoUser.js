import React from "react";
import "./ShowdropdownInfoUser.css";
import testsimage from "../../static/imagenes/perfil.jpeg";

export default function ShowdropdownInfoUser({ loadingprofile, datadropdown }) {
  return (
    <>
      <div className="showdropdownInfoUser-div p-3">
        {loadingprofile ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "100%", height: "100%" }}
          >
            <div
              className="spinner-grow"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-center">
              <img
                className="showdropdownInfoUser-img rounded-circle border-1 border-primary me-3"
                src={datadropdown?.foto}
                alt="Adrian stiven"
              />
              <div className="">
                <h4>{datadropdown?.username}</h4>
                <h6>{datadropdown?.first_name}</h6>
              </div>
            </div>
            <h6 className="d-flex justify-content-center mt-3">
              {datadropdown?.email}
            </h6>
          </>
        )}
      </div>
    </>
  );
}
