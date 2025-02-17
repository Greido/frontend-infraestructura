import { useEffect, useState } from "react";
import {
  Modal as MuiModal,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Modal({ open, selectedProduct, handleClose, handleUpdate }) {
  const [editedProduct, setEditedProduct] = useState(selectedProduct || {});
  const [proveedores, setProveedores] = useState([]);
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    const localDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000
    );
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setEditedProduct(selectedProduct || {});
  }, [selectedProduct]);

  const handleChange = (e) => {
    //console.log("clg antes del del selected");
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
    //console.log("clg desp del selected");
  };

  const handleSubmit = () => {
    handleUpdate(editedProduct);
  };

  //Traigo todos los proveedores
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
  return (
    <MuiModal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", color: "#000000" }}
        >
          Editar insumo
        </Typography>
        <TextField
          label="Nombre"
          name="marca"
          value={editedProduct.marca || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Modelo"
          name="modelo"
          value={editedProduct.modelo || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="text"
        />
        <TextField
          label="Cantidad"
          name="cantidad"
          value={editedProduct.cantidad || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Select
          fullWidth
          displayEmpty
          name="proveedor"
          value={editedProduct.proveedor || ""}
          onChange={handleChange}
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

        <Select
          fullWidth
          displayEmpty
          name="colorDeTinta"
          value={editedProduct.colorDeTinta || ""}
          onChange={handleChange}
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

        <Select
          fullWidth
          displayEmpty
          name="tipoDeTinta"
          value={editedProduct.tipoDeTinta || ""}
          onChange={handleChange}
        >
          <MenuItem value="" disabled>
            Color de Tinta
          </MenuItem>
          <MenuItem value="Tinta">Tinta</MenuItem>
          <MenuItem value="Toner">Toner</MenuItem>
          <MenuItem value="Cartucho">Cartucho</MenuItem>
        </Select>
        <TextField
          label="Fecha de Ingreso"
          name="fechaIngreso"
          value={formatDateForInput(editedProduct.fecha_ingreso) || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#5b76f0",
            color: "#fff",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50px",
          }}
        >
          Actualizar
        </Button>
      </Box>
    </MuiModal>
  );
}

export default Modal;
