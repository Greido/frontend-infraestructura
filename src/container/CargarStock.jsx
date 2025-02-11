import {
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import NavBar from "../components/global/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Swal from "sweetalert2";

const CargarStock = () => {
  const [proveedores, setProveedores] = useState([]);
  const [fechaIngreso, setFechaIngreso] = useState(null);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get(
          "https://stockback-nnq9.onrender.com/proveedor/getallproviders"
        );
        setProveedores(response.data);
      } catch (error) {
        console.error("Error al obtener proveedores", error);
      }
    };
    fetchProveedores();
  }, []);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      marca: "",
      modelo: "",
      cantidad: 0,
      proveedor: "",
      colorDeTinta: "",
      tipoDeTinta: "",
      fecha_ingreso: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (!values.fecha_ingreso) {
        Swal.fire({
          title: "Error",
          text: "Debes seleccionar una fecha de ingreso.",
          icon: "error",
        });
        return;
      }

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
          }).then(() => {
            resetForm(); // Reiniciar el formulario
            setFechaIngreso(null); // Reiniciar la fecha de ingreso
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al intentar registrar el insumo.",
          icon: "error",
        });
      }
    },
  });

  return (
    <>
      <NavBar />
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Volver
        </Button>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Paper elevation={10} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Cargar Stock
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Marca"
                        name="marca"
                        onChange={formik.handleChange}
                        value={formik.values.marca}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Modelo"
                        name="modelo"
                        onChange={formik.handleChange}
                        value={formik.values.modelo}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Cantidad"
                        name="cantidad"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.cantidad}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Select
                        fullWidth
                        displayEmpty
                        name="proveedor"
                        value={formik.values.proveedor}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value="" disabled>
                          Seleccionar Proveedor
                        </MenuItem>
                        {proveedores.map((prov) => (
                          <MenuItem key={prov._id} value={prov._id}>
                            {prov.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Select
                        fullWidth
                        displayEmpty
                        name="colorDeTinta"
                        value={formik.values.colorDeTinta}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value="" disabled>
                          Color de Tinta
                        </MenuItem>
                        <MenuItem value="Negro">Negro</MenuItem>
                        <MenuItem value="Cyan">Cyan</MenuItem>
                        <MenuItem value="Cyan claro">Cyan claro</MenuItem>
                        <MenuItem value="Amarillo">Amarillo</MenuItem>
                        <MenuItem value="Magenta">Magenta</MenuItem>
                        <MenuItem value="Magenta claro">Magenta claro</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Select
                        fullWidth
                        displayEmpty
                        name="tipoDeTinta"
                        value={formik.values.tipoDeTinta}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value="" disabled>
                          Tipo de Tinta
                        </MenuItem>
                        <MenuItem value="Tinta">Tinta</MenuItem>
                        <MenuItem value="Toner">Toner</MenuItem>
                        <MenuItem value="Cartucho">Cartucho</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12}>
                      <DatePicker
                        label="Fecha de Ingreso"
                        value={fechaIngreso}
                        onChange={(newValue) => {
                          if (newValue) {
                            const formattedDate = newValue.format("YYYY-MM-DD");
                            setFechaIngreso(newValue);
                            formik.setFieldValue(
                              "fecha_ingreso",
                              formattedDate
                            );
                          }
                        }}
                        renderInput={(params) => (
                          <TextField fullWidth {...params} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                      >
                        Cargar
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </LocalizationProvider>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CargarStock;
