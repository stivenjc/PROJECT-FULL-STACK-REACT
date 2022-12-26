import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RenderLogin from "./component/RenderLogin";
import RequireAuth from "./component/RequireAuth";
import PageIndex from "./pages/PageIndex";
import Profile from "./pages/Profile";
import DetalleUser from "./pages/DetalleUser";
import ValidadorDetail from "./pages/ValidadorDetail";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<RenderLogin />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/dashboard" exact element={<RequireAuth />}>
          <Route path="/dashboard/users" exact element={<PageIndex />} />
          <Route path="/dashboard/profile" exact element={<Profile />} />
          <Route
            path="/dashboard/detalle/:id"
            exact
            element={<ValidadorDetail />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
