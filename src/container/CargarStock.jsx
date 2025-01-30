import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavBar from "../components/global/NavBar";

import "../index.css";
import { Paper, TextField } from "@mui/material";
import { Field, Formik, useFormik } from "formik";
const CargarStock = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      cantidad: 0,
      proveedor: "",
      tipoDeTinta: "",
      impresora: "",
      fecha_ingreso: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD para el input date
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <NavBar />
      <Container className="con-hp displayflex-column">
        <Row>
          <Col>
            <Paper
              elevation={10}
              sx={{
                mt: 5,
                height: 200,
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <form onSubmit={formik.handleSubmit}>
                {/* Nombre */}
                {/*                 <label htmlFor="nombre">Nombre</label> <br />
                 */}
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
                  id="nombre"
                  label="Nombre"
                  name="nombre"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.nombre}
                />
              </form>
            </Paper>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CargarStock;
