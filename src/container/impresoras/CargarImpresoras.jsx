import NavBar from "../../components/global/NavBar";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CargarImpresoras = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      modelo: "",
      cantidad: 0,
      insumo: "",
      area: "",
    },

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://stockback-nnq9.onrender.com/impresoras/crearImpresora",
          values
        );
        if (response.status === 201 || response.status === 200) {
          Swal.fire({
            title: "Cargada!",
            text: "Impresora creada correctamente",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Ocurrio un error al crear la impresora",
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
          onClick={() => navigate(-1)}
          color="primary"
          variant="contained"
          sx={{ mb: 2 }}
        >
          Volver
        </Button>
        <Grid container justifyContent={"center"}>
          <Grid item xs={12} sm={8} md={6}>
            <Paper elevation={10} sx={{ p: 4 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Cargar impresora
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      label="Nombre"
                      name="nombre"
                      onChange={formik.handleChange}
                      value={formik.values.nombre}
                    />
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      label="Modelo"
                      name="modelo"
                      onChange={formik.handleChange}
                      value={formik.values.modelo}
                    />
                    <TextField
                      sx={{ mt: 2, mb: 2 }}
                      fullWidth
                      type="number"
                      label="Cantidad"
                      name="cantidad"
                      onChange={formik.handleChange}
                      value={formik.values.cantidad}
                    />
                    <InputLabel>Tipo de insumo</InputLabel>

                    <Select
                      sx={{ mt: 2 }}
                      fullWidth
                      displayEmpty
                      label
                      name="insumo"
                      value={formik.values.insumo}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="Toner">Toner</MenuItem>
                      <MenuItem value="Chorro de tinta">
                        Chorro de tinta
                      </MenuItem>
                    </Select>
                    <TextField
                      sx={{ mt: 2 }}
                      fullWidth
                      label="Area"
                      name="area"
                      onChange={formik.handleChange}
                      value={formik.values.area}
                    />

                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Cargar
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CargarImpresoras;
