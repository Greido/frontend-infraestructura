import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { autenticarUsuario } from "../store/Slices/authSlice";

function RutaProtegida() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.token) {
      console.log("No hay token, autenticando usuario...");
      dispatch(autenticarUsuario());
    }
  }, [dispatch, auth.token]);

  return <>{auth?.token ? <Outlet /> : <Navigate to="/" />}</>;
}

export default RutaProtegida;
