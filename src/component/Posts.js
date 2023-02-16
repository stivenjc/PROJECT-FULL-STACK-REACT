import React, { useEffect, useState } from "react";
import "./Posts.css";
import likeImage from "../static/iconos/thumbs-up.svg";
import messsageImage from "../static/iconos/message-square.svg";
import compartirImage from "../static/iconos/share-2.svg";
import iconoDelete from "../static/iconos/trash-outline.svg";
import { useSelector, useDispatch } from "react-redux";
import { deltedPosts, getPosts } from "../api/postsAPI";
import moment from "moment";
import { map } from "lodash";
import ComentForm from "../component/ComentForm";
import { useFormik } from "formik";
import { addComent } from "../api/coment";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import { setPosts } from "../actions/posts";
import { Link } from "react-router-dom";
import ShowdropdownInfoUser from "./ShowdropdownInfoUser/ShowdropdownInfoUser";
import { getByUsers } from "../api/usersAPI";

export default function Posts() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const miImfo = useSelector((state) => state.userReducer.detail);
  const posts = useSelector((state) => state.postsReducer.posts);
  const [showInfo, setshowInfo] = useState(false);
  const [idpost, setidpost] = useState(0);
  const [idUsers, setidUsers] = useState(0);
  const [loadingprofile, setLoadingprofile] = useState(false);
  const [datadropdown, setDatadropdown] = useState({});

  async function removemyposts(data) {
    const result = window.confirm(
      `estas seguro de eliminar este posts: ${data.text}`
    );
    if (result) {
      await deltedPosts(data.id);
      getposts();
    }
  }

  const getposts = async () => {
    try {
      setLoading(true);
      const respuesta = await getPosts();
      setLoading(false);
      dispatch(setPosts(respuesta));
    } catch (error) {
      console.error(error);
    }
  };

  async function mostrar(idPost, idUser) {
    setidpost(idPost);
    setidUsers(idUser);
    setshowInfo(true);
    setLoadingprofile(true);
    const respuesta = await getByUsers(idUser);
    setDatadropdown(respuesta);
    setLoadingprofile(false);
  }
  function nomostrar() {
    setshowInfo(false);
  }

  useEffect(() => {
    getposts();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <div>
          {miImfo && (
            <div>
              {map(posts, (item) => (
                <div className="container-fluid mt-2" key={item?.id}>
                  <div className="d-flex justify-content-center">
                    <div className="col-5 rounded border-top-0 border-end-0">
                      <div className="card shadow-lg p-3 mb-5 bg-body rounded tamaño-card">
                        <div className="d-flex align-items-start d-flex justify-content-between">
                          <div className="d-flex align-items-center stylos-div">
                            <img
                              className="tmñ-img rounded-circle border-1 border-primary"
                              src={item?.created_data?.foto}
                              alt="Adrian stiven"
                              onMouseOver={() =>
                                mostrar(item?.id, item?.created_data?.id)
                              }
                              onMouseOut={() => nomostrar()}
                            />
                            {showInfo &&
                              idpost == item?.id &&
                              idUsers == item?.created_data?.id && (
                                <div className="pocicionado-dropdown">
                                  <ShowdropdownInfoUser
                                    loadingprofile={loadingprofile}
                                    datadropdown={datadropdown}
                                  />
                                </div>
                              )}
                            <Link
                              to={`/dashboard/detalle/${item.created_data.id}`}
                              className="no-decoration h6 text-body ms-2 "
                            >
                              <h5>
                                <strong className="m-0">
                                  {item?.created_data?.username}
                                </strong>
                              </h5>
                              <p className="h6">
                                <small>
                                  {moment(item.created)
                                    .startOf("seconds")
                                    .fromNow()}
                                </small>
                              </p>
                            </Link>
                          </div>
                          <div>
                            {miImfo.id === item.created_data.id && (
                              <button
                                className="btn btn-light"
                                onClick={() => removemyposts(item)}
                              >
                                <img
                                  className="tamaño-icono-deleted"
                                  src={iconoDelete}
                                  alt=""
                                />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="border-top"></div>
                        {item.image && (
                          <img
                            src={item?.image}
                            className="card-img-top img-fluid border-secondary mt-3"
                            alt="post"
                          />
                        )}
                        <div className="card-body">
                          <p className="card-text">{item?.text}</p>
                        </div>
                        <div className="border-top"></div>
                        <div className="row mt-3">
                          <button className="col d-flex justify-content-center align-items-center border mx-3 rounded-pill p-1">
                            <img className="me-1 " src={likeImage} alt="" />
                            Me gusta
                          </button>
                          <button className="col d-flex justify-content-center align-items-center border mx-3 rounded-pill p-1">
                            <img className="me-1" src={compartirImage} alt="" />
                            Compartir
                          </button>
                          <ComentForm idpost={item.id} />
                        </div>
                        <div>
                          {map(item.comments, (coment) => (
                            <>
                              <div className="d-flex align-items-center">
                                <img
                                  src={coment.created_data.foto}
                                  className="tmñ-img rounded-circle border-1 border-primary me-2 my-2"
                                />
                                <h6>
                                  <strong>{coment.created_data.email}</strong>
                                </h6>
                                <small className="mx-4">{coment.title}</small>
                              </div>
                              <small>
                                {moment(coment.mofified)
                                  .startOf("seconds")
                                  .fromNow()}
                              </small>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

function initialValues() {
  return {
    title: "",
    post: "",
  };
}
