import { useState, useContext } from "react";
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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Registro = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    const options = { password, username };

    try {
      const response = await axios.post(
        "http://localhost:4000/infra/login",
        options,
        {
          withCredentials: true,
        }
      );

      const { token } = response.data;
      console.log("Token recibido:", token);

      if (response.status === 201 || response.status === 200) {
        // Guardar el token en las cookies
        Cookies.set("token", token, { expires: 7 });

        // Llamar al logger después de establecer la cookie
        //  logger();  Esto asegura que el logger verifique el token después de ser guardado

        // Redirigir al dashboard u otra página
        navigate("/");
      } else {
        Swal.fire("Error", "Fallo el registro", "error");
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Upa!!!",
          text: "El backend esta apagado",
        });
      }

      Swal.fire("Error", "Ha ocurrido un error, vuelva a intentarlo", "error");
      console.error("Error durante el registro:", error);
    }
  };

  return (
    <>
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
            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={register}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Nombre de usuario"
                    name="username"
                    autoComplete="name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button variant="contained" sx={{ marginTop: 5 }} type="submit">
                Ingresar
              </Button>
            </Box>
            <Button
              variant="contained"
              sx={{ marginTop: 5 }}
              onClick={() => navigate("/register")}
            >
              Registrarme
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Registro;
