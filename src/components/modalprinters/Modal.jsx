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

  useEffect(() => {
    setEditedProduct(selectedProduct || {});
  }, [selectedProduct]);

  const handleChange = (e) => {
    console.log("clg antes del del selected");
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
    console.log("clg desp del selected");
  };

  const handleSubmit = () => {
    handleUpdate(editedProduct);
  };

  return (
    <MuiModal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", color: "#000000" }}
        >
          Editar impresora
        </Typography>
        <TextField
          label="Nombre"
          name="nombre"
          value={editedProduct.nombre || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cantidad"
          name="cantidad"
          value={editedProduct.cantidad || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="text"
        />

        <Select
          fullWidth
          displayEmpty
          name="insumo "
          value={editedProduct.insumo || ""}
          onChange={handleChange}
        >
          <MenuItem value="" disabled>
            Tipo de insumo
          </MenuItem>
          <MenuItem value="Toner">Toner</MenuItem>
          <MenuItem value="Chorro de tinta">Chorro de tinta</MenuItem>
        </Select>
        <TextField
          label="Area"
          name="area"
          value={editedProduct.area || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="text"
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
