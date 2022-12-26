// guardar token en el local storas
export function setToken(token) {
  localStorage.setItem("TOKEN", token);
}

// recuperar token del clocas stora
export function getToken() {
  return localStorage.getItem("TOKEN");
}

// remover el token del localstoras
export function removeToken() {
  localStorage.removeItem("TOKEN");
}

//////////////////////

// guardar Refresh en el local storas
export function setRefresh(token) {
  localStorage.setItem("REFRESH", token);
}

// recuperar Refresh del clocas stora
export function getRefresh() {
  return localStorage.getItem("REFRESH");
}

// remover el Refresh del localstoras
export function removeRefresh() {
  localStorage.removeItem("REFRESH");
}
