import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/global/NavBar";
import axios from "axios";

export default function EntregaInsumos() {
  const navigate = useNavigate();
  const [insumos, setInsumos] = useState([]);
  const [selectedInsumo, setSelectedInsumo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [area, setArea] = useState("");
  const [mensaje, setMensaje] = useState({
    open: false,
    text: "",
    severity: "",
  });

  useEffect(() => {
    // Obtener insumos disponibles
    axios
      .get("https://backend-tuapp.onrender.com/api/insumos")
      .then((response) => setInsumos(response.data))
      .catch((error) => console.error("Error al obtener insumos:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedInsumo || !cantidad || !area) {
      setMensaje({
        open: true,
        text: "Todos los campos son obligatorios",
        severity: "error",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://backend-tuapp.onrender.com/api/descontar",
        {
          id: selectedInsumo,
          cantidad: parseInt(cantidad),
          area,
        }
      );

      setMensaje({
        open: true,
        text: "Entrega registrada con éxito",
        severity: "success",
      });

      // Descargar PDF automáticamente
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `recibo_${selectedInsumo}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setMensaje({
        open: true,
        text: "Error al registrar la entrega",
        severity: "error",
      });
      console.error("Error al entregar insumo:", error);
    }
  };

  return (
    <>
      <NavBar />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ textTransform: "none", fontWeight: "bold", mb: 2 }}
      >
        Volver Atrás
      </Button>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Seleccionar Insumo</InputLabel>
          <Select
            value={selectedInsumo}
            onChange={(e) => setSelectedInsumo(e.target.value)}
            required
          >
            {insumos.map((insumo) => (
              <MenuItem key={insumo._id} value={insumo._id}>
                {insumo.marca} - {insumo.modelo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="number"
          label="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />

        <TextField
          label="Área de Destino"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" color="success">
          Registrar Entrega
        </Button>
      </form>

      <Snackbar
        open={mensaje.open}
        autoHideDuration={3000}
        onClose={() => setMensaje({ ...mensaje, open: false })}
      >
        <Alert severity={mensaje.severity}>{mensaje.text}</Alert>
      </Snackbar>
    </>
  );
}
