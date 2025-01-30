import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/Slices/authSlice";

const Registro = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = login;

    if ([username, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axios.post(
        "https://stockback-nnq9.onrender.com/infra/login",
        login
      );
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(setAuth(data));
        navigate("/admin");
      } else {
        setAlerta({
          msg: "Error en la autenticación",
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg:
          error.response?.data?.msg ||
          "Ocurrió un error al intentar iniciar sesión.",
        error: true,
      });
    }

    setLogin({ username: "", password: "" });
  };

  return (
    <Container>
      <Paper sx={{ padding: 10, marginTop: 10 }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>

          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Nombre de usuario"
                  name="username"
                  autoComplete="name"
                  value={login.username}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={login.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Button variant="contained" sx={{ marginTop: 5 }} type="submit">
              Ingresar
            </Button>
          </Box>

          <Button variant="contained" sx={{ marginTop: 5 }}>
            Registrarme
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Registro;
