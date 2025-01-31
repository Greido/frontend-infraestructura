import "../src/index.css";
import HomePage from "./container/HomePage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./container/Login";
import AuthLayout from "./layout/authLayout";
import RutaProtegida from "./layout/Rutaprotegida";
import CargarStock from "./container/CargarStock";
import InsumosTabla from "./container/insumos/InsumosTabla";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        {/* Ruta protegida */}
        <Route path="/admin" element={<RutaProtegida />}>
          <Route index element={<HomePage />} />
          <Route path="upinsumo" element={<CargarStock />} />
          <Route path="verinsumos" element={<InsumosTabla />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
