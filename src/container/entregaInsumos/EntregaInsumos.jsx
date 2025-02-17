import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import axios from "axios";
import NavBar from "../../components/global/NavBar";

export default function EntregaInsumos() {
  const [insumos, setInsumos] = useState([]);

  useEffect(() => {
    const fetchInsumos = async () => {
      try {
        const response = await axios.get(
          "https://stockback-nnq9.onrender.com/insumo/allinsumos"
        );
        setInsumos(response.data);
      } catch (error) {
        console.error("Error al obtener insumos:", error);
      }
    };
    fetchInsumos();
  }, []);

  const handleEntrega = async (id, cantidad) => {
    try {
      const response = await axios.post(
        "https://stockback-nnq9.onrender.com/insumo/descontarInsumo",
        { id, cantidad }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `recibo_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setInsumos((prev) =>
        prev.map((insumo) =>
          insumo._id === id
            ? { ...insumo, cantidad: insumo.cantidad - cantidad }
            : insumo
        )
      );
    } catch (error) {
      console.error("Error al entregar insumo:", error);
    }
  };

  return (
    <>
      <NavBar />
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 800, margin: "auto", mt: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad Disponible</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {insumos.map((insumo) => (
              <TableRow key={insumo._id}>
                <TableCell>
                  {insumo.marca} {insumo.modelo}
                </TableCell>
                <TableCell>{insumo.cantidad}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEntrega(insumo._id, 1)}
                    disabled={insumo.cantidad <= 0}
                  >
                    Entregar 1 unidad
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
