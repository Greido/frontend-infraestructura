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
import CargarImpresoras from "./container/impresoras/CargarImpresoras";
import ViewImpresora from "./components/verImpresoras/ViewImpresora";
import CargarProveedor from "./container/proveedor/CargarProveedor";
import EntregaInsumos from "./container/entregaInsumos/EntregaInsumos";
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
          {/* Rutas de stock */}
          <Route path="upinsumo" element={<CargarStock />} />
          <Route path="verinsumos" element={<InsumosTabla />} />
          <Route path="entregaInsumos" element={<EntregaInsumos />} />
          {/* Ruta de impresoras */}
          <Route path="upimpresora" element={<CargarImpresoras />} />
          <Route path="verimpresoras" element={<ViewImpresora />} />
          {/* Ruta de proveedores */}
          <Route path="uproveedor" element={<CargarProveedor />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
