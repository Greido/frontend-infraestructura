import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../components/global/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../index.css";
import { Paper, TextField, Button, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Swal from "sweetalert2";
const CargarStock = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    console.log("Proveedores:", proveedores);
  }, [proveedores]);
  /* Select dinamico */
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get(
          "https://stockback-nnq9.onrender.com/proveedor/getallproviders"
        );
        setProveedores(response.data);
        console.log("Proveedores:", response.data);
      } catch (error) {
        console.error("Error al obtener proveedores", error);
      }
    };

    fetchProveedores();
  }, []);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      cantidad: 0,
      proveedor: "",
      tipoDeTinta: "",
      impresora: "",
      fecha_ingreso: new Date().toISOString().split("T")[0],
    },
    onSubmit: async (values) => {
      console.log(values);

      try {
        const response = await axios.post(
          "https://stockback-nnq9.onrender.com/insumo/crearInsumo",
          values
        );

        if (response.status === 201 || response.status === 200) {
          Swal.fire({
            title: "¡Cargado!",
            text: "El insumo ha sido registrado correctamente.",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al intentar registrar el insumo.",
          icon: "error",
        });
        console.error("Error al crear insumo:", error);
      }
    },
  });

  return (
    <>
      <NavBar />
      <Container
        className="con-hp displayflex-column"
        style={{ position: "relative" }}
      >
        {/* Botón para volver atrás */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          style={{ position: "absolute", top: 20, left: 20 }}
        >
          Volver
        </Button>
        <Row>
          <Col>
            <Paper
              elevation={10}
              sx={{
                mt: 5,
                width: "50vw",
                padding: 10,
                margin: "0 auto",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    id="nombre"
                    label="Nombre"
                    name="nombre"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.nombre}
                  />
                  <br />
                  <br />
                  <TextField
                    id="cantidad"
                    label="Cantidad"
                    name="cantidad"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.cantidad}
                  />
                  <br />
                  <br />
                  <Select
                    id="proveedor"
                    name="proveedor"
                    value={formik.values.proveedor}
                    onChange={formik.handleChange}
                    displayEmpty
                    variant="filled"
                  >
                    <MenuItem value="" disabled>
                      Seleccionar Proveedor
                    </MenuItem>
                    {proveedores.map((proveedor) => (
                      <MenuItem key={proveedor._id} value={proveedor._id}>
                        {proveedor.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                  <br />
                  <br />
                  <Select
                    labelId="tipoDeTinta-label"
                    id="tipoDeTinta"
                    name="tipoDeTinta"
                    value={formik.values.tipoDeTinta}
                    onChange={formik.handleChange}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Color de tinta
                    </MenuItem>
                    <MenuItem value="Negro">Negro</MenuItem>
                    <MenuItem value="Cyan">Cyan</MenuItem>
                    <MenuItem value="Cyan claro">Cyan claro</MenuItem>
                    <MenuItem value="Amarillo">Amarillo</MenuItem>
                    <MenuItem value="Magenta">Magenta</MenuItem>
                    <MenuItem value="Magenta claro">Magenta claro</MenuItem>
                  </Select>
                  <br />
                  <br />
                  <Select
                    labelId="impresora-label"
                    id="impresora"
                    name="impresora"
                    value={formik.values.impresora}
                    onChange={formik.handleChange}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Tipo de tinta
                    </MenuItem>
                    <MenuItem value="tinta">Tinta</MenuItem>
                    <MenuItem value="toner">Toner</MenuItem>
                    <MenuItem value="cartucho">Cartucho</MenuItem>
                  </Select>
                  <br />
                  <br />
                  {/* Date picker y calendario */}
                  <label>Ingrese la fecha, MES,DIA, Anio</label> <br />
                  <DatePicker />
                  <br />
                  <br />
                  <Button variant="contained" color="primary" type="submit">
                    Cargar
                  </Button>
                </form>
              </LocalizationProvider>
            </Paper>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CargarStock;
