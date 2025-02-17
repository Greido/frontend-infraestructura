import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Asegúrate de importar esta librería
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
  TextField,
} from "@mui/material";
import axios from "axios";
import NavBar from "../../components/global/NavBar";
import { useNavigate } from "react-router-dom";

export default function EntregaInsumos() {
  const [insumos, setInsumos] = useState([]);
  const [areas, setAreas] = useState({}); // Estado para las áreas ingresadas
  const [cantidades, setCantidades] = useState({}); // Estado para las cantidades ingresadas

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

  const handleAreaChange = (id, event) => {
    setAreas((prevAreas) => ({
      ...prevAreas,
      [id]: event.target.value,
    }));
  };

  const handleCantidadChange = (id, event) => {
    const value = event.target.value;
    // Asegurar que la cantidad ingresada sea un número positivo
    if (!isNaN(value) && value >= 0) {
      setCantidades((prevCantidades) => ({
        ...prevCantidades,
        [id]: value,
      }));
    }
  };

  const generarPDF = (insumo, cantidad, area) => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Título
    doc.text("MINISTERIO DE INFRAESTRUCTURA", 20, 20);
    doc.text("DIRECCION DE TECNOLOGIAS DE LA INFORMACION", 20, 30);
    doc.text("LA RIOJA", 20, 40);
    doc.text("Se hace entrega del siguiente insumo", 20, 50);

    // Usamos autoTable para crear la tabla
    doc.autoTable({
      startY: 60, // Empezamos la tabla a partir de la posición 60 en el eje Y
      head: [["TIPO DE INSUMO", "CANTIDAD", "ÁREA"]],
      body: [
        [
          `${insumo.marca} ${insumo.modelo}`,
          `${cantidad} unidad(es)`,
          area || "No especificado", // Mostramos el área ingresada
        ],
      ],
      theme: "grid", // Estilo de la tabla
      styles: {
        cellPadding: 5,
        fontSize: 10,
      },
    });

    // Agregar línea para la firma
    doc.text("Firma del Responsable", 20, doc.lastAutoTable.finalY + 10);
    doc.line(
      20,
      doc.lastAutoTable.finalY + 15,
      80,
      doc.lastAutoTable.finalY + 15
    );

    // Guardar el archivo PDF
    doc.save(`Entrega_${insumo.marca}_${insumo.modelo}.pdf`);
  };

  const handleEntrega = async (id, cantidad, insumo) => {
    try {
      if (cantidad <= 0 || cantidad > insumo.cantidad) {
        alert("Cantidad inválida. Verifique el stock disponible.");
        return;
      }

      const area = areas[id] || ""; // Obtener el área ingresada para este insumo

      await axios.post(
        "https://stockback-nnq9.onrender.com/insumo/descontarInsumo",
        { id, cantidad }
      );

      setInsumos((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, cantidad: item.cantidad - cantidad }
            : item
        )
      );
      generarPDF(insumo, cantidad, area); // Pasamos el área y la cantidad al generar el PDF
    } catch (error) {
      console.error("Error al entregar insumo:", error);
    }
  };
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ mb: 2, mt: 5, ml: 5 }}
      >
        Volver
      </Button>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 800, margin: "auto", mt: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad Disponible</TableCell>
              <TableCell>Área</TableCell>
              <TableCell>Cantidad a Entregar</TableCell>
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
                  {/* Input para ingresar el área */}
                  <TextField
                    value={areas[insumo._id] || ""}
                    onChange={(e) => handleAreaChange(insumo._id, e)}
                    label="Área"
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {/* Input para ingresar la cantidad */}
                  <TextField
                    value={cantidades[insumo._id] || ""}
                    onChange={(e) => handleCantidadChange(insumo._id, e)}
                    label="Cantidad"
                    variant="outlined"
                    size="small"
                    type="number"
                    inputProps={{ min: 1, max: insumo.cantidad }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleEntrega(
                        insumo._id,
                        Number(cantidades[insumo._id]) || 1,
                        insumo
                      )
                    }
                    disabled={insumo.cantidad <= 0}
                  >
                    Entregar
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
