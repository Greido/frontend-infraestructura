import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { autenticarUsuario } from "../store/Slices/authSlice";

function RutaProtegida() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(autenticarUsuario());
  }, [dispatch]);

  return <>{auth?._id ? <Outlet /> : <Navigate to="/" />}</>;
}

export default RutaProtegida;
