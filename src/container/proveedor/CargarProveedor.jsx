import React from "react";
import NavBar from "../../components/global/NavBar";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";

const CargarProveedor = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "https://stockback-nnq9.onrender.com/proveedor/crearprovider",
          values
        );
        if (response.status === 201 || response.status === 200) {
          Swal.fire({
            title: "Cargado!",
            text: "Proveedor cargado",
            icon: "success",
          });
          resetForm();
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "Ocurrio un error al crear el proveedor",
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
        <Grid item sx={12} sm={8} md={6}>
          <Paper elevation={10} sx={{ p: 4 }}>
            <Typography variant="h5" align="center">
              Cargar proveedor
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
                    label="Email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    label="Telefono"
                    name="telefono"
                    onChange={formik.handleChange}
                    value={formik.values.telefono}
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    label="Direccion"
                    name="direccion"
                    onChange={formik.handleChange}
                    value={formik.values.direccion}
                  />
                  <Grid item sx={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Crear
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Box>
    </>
  );
};

export default CargarProveedor;
