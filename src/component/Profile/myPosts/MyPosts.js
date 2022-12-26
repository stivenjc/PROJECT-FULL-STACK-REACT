import React, { useState, useEffect } from "react";
import { deltedPosts, geyByPosts } from "../../../api/postsAPI";
import iconoDelete from "../../../static/iconos/trash-outline.svg";
import Moment from "react-moment";
import { map } from "lodash";
import "./MyPosts.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

export default function MyPosts({ miImfo }) {
  const userLogedo = useSelector((state) => state.userReducer.detail);
  const [miPosts, setMiPosts] = useState(null);
  const getpostByid = async () => {
    const respuesta = await geyByPosts(miImfo.id);
    setMiPosts(respuesta);
  };
  async function removemyposts(data) {
    const result = window.confirm(
      `estas seguro de eliminar este posts: ${data.text}`
    );
    if (result) {
      await deltedPosts(data.id);
      getpostByid();
    }
  }

  useEffect(() => {
    getpostByid();
  }, [miImfo]);
  return (
    <>
      <div>
        <h1 className="d-flex justify-content-center">All my posts</h1>
        {map(miPosts, (item) => (
          <div className="container-fluid mt-2" key={item?.id}>
            <div className="d-flex justify-content-center">
              <div className="col-5 rounded border-top-0 border-end-0">
                <div className="card shadow-lg p-3 mb-5 bg-body rounded tamaño-card">
                  <div className="m-2 d-flex align-items-start d-flex justify-content-between">
                    <div className="d-flex align-items-center ">
                      <img
                        className="tmñ-img rounded-circle border-1 border-primary"
                        src={item?.created_data?.foto}
                        alt="Adrian stiven"
                      />
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
                            {moment(item.created).startOf("seconds").fromNow()}
                          </small>
                        </p>
                      </Link>
                    </div>
                    <div>
                      {userLogedo.id === item.created_data.id && (
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
                  {item.image && (
                    <img
                      src={item?.image}
                      className="card-img-top img-fluid border-secondary"
                      alt="post"
                    />
                  )}
                  <div className="card-body">
                    <p className="card-text">{item?.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
