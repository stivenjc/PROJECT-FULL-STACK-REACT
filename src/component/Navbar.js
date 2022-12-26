import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { removeRefresh, removeToken } from "../api/token";
import Button from "react-bootstrap/Button";
import { searchUsers } from "../api/usersAPI";
import "./Navbar.css";
import { setUserFilter } from "../actions";
import { useDispatch } from "react-redux";
import iconoHome from "../static/iconos/home-outline.svg";
import { deletedTokenAPI } from "../api/loginAPI";

export default function Navbar({ miImfo }) {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const dispatch = useDispatch();
  const [resultado, setResultado] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const cerrarSesion = async () => {
    await deletedTokenAPI();
    removeToken();
    removeRefresh();
    navigate("/");
  };

  // const searchusers = useCallback(async () => {
  //   console.log("se volvio a ejecutar la ");
  //   const respuesta = await searchUsers(search);
  //   setResultado(respuesta);
  //   dispatch(setUserFilter(respuesta));
  // }, [search]);

  async function searchusers() {
    const respuesta = await searchUsers(search);
    setResultado(respuesta);
    dispatch(setUserFilter(respuesta));
  }

  useEffect(() => {
    if (search && focused === true) {
      searchusers();
    }
    if (!search && focused === true) {
      setResultado([]);
    }
    if (focused === false) {
      setTimeout(function () {
        setResultado([]);
      }, 300);
    }
  }, [search, focused]);

  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-cente">
              <Link to="/dashboard/users" className="nav-link active">
                <img className="tmaño-home" src={iconoHome} />
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <Button variant="outline-danger" onClick={cerrarSesion}>
                cerrar sesion
              </Button>
            </li>
          </ul>
          <div
            className="input-group mx-5 d-flex align-content-center"
            style={{ width: 530 }}
          >
            <div>
              <div className="input-group search">
                <input
                  type="text"
                  name="search"
                  onChange={(ev) => setSearch(ev.target.value)}
                  value={search}
                  className="form-control classInput"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  placeholder="Buscar usuarios"
                />
                <table className="table table-dark red-modal">
                  <tbody>
                    {map(resultado, (item) => (
                      <tr>
                        <th>
                          <img
                            className="contenido-imagen rounded-circle border border-dark p-2"
                            src={item?.foto}
                          />
                        </th>
                        <td>
                          <Link
                            to={`/dashboard/detalle/${item.id}`}
                            className="link-light no-decoration"
                          >
                            <h6>
                              {item?.username}
                              {item.id === miImfo.id && (
                                <h4>
                                  <strong>Tu</strong>
                                </h4>
                              )}
                            </h6>
                          </Link>
                        </td>
                        <td>{item?.last_name}</td>
                        <td>{item?.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="input-group-append"></div>
              </div>
            </div>
          </div>
          <span className="navbar-text">{miImfo?.email}</span>
          <Link to="profile">
            <img
              src={`http://127.0.0.1:8000${miImfo?.foto}`}
              className="tamaño-img rounded-circle"
              alt="Adrina stiven"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
