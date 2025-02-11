import { useEffect, useMemo, useState } from "react";
import NavBar from "../global/NavBar";
import axios from "axios";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import useImpresoraModal from "../../hooks/useImpresoraModal";
import { ClipLoader } from "react-spinners";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const viewImpresora = () => {
  const [loading, setLoading] = useState(true);
  const [impresoras, setImpresoras] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  const {
    openEditModal,
    selectedProduct,
    handleOpenEditModal,
    handleCloseEditModal,
    handleUpdate,
  } = useImpresoraModal();

  useEffect(() => {
    const fetchImpresoras = async () => {
      try {
        const response = await axios.get(
          "https://stockback-nnq9.onrender.com/impresoras/verImpresoras"
        );
        setImpresoras(response.data);
        console.log("impresoras", impresoras);
      } catch (error) {
        console.log("Error de impresoras", error);
      }
    };
    fetchImpresoras();
  }, []);

  const filterImpresora = useMemo(() => {
    return impresoras.filter((impresora) =>
      Object.values(impresora).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [impresoras, searchText]);

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
        backgroundColor: "#4b5563",
        color: "#ffffff",
        padding: "12px",
      },
    },
    cells: {
      style: {
        padding: "14px",
        fontSize: "14px",
      },
    },
  };
  const columns = [
    { name: "Nombre", selector: (row) => row.nombre, sortable: true, grow: 1 },
    { name: "Modelo", selector: (row) => row.modelo, sortable: true, grow: 1 },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad,
      sortable: true,
      grow: 0.5,
    },
    { name: "Proveedor", selector: (row) => row.proveedor, grow: 1 },
    { name: "Tipo de tinta", selector: (row) => row.tipoDeTinta, grow: 1 },
    { name: "Color", selector: (row) => row.colorDeTinta, grow: 0.7 },
    {
      name: "Fecha de ingreso",
      selector: (row) => new Date(row.fecha_ingreso).toLocaleDateString(),
      grow: 1,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleOpenEditModal(row)}
          >
            <EditIcon />
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => setDeleteId(row._id)}
          >
            <DeleteForeverIcon />
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <div>
      <NavBar />
      {/* Botón Volver Atrás */}
      <div style={{ padding: "16px" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Volver Atrás
        </Button>
      </div>
      <div className="p-4 bg-gray-100 min-h-screen">
        <TextField
          label="Buscar impresora"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className="overflow-x-auto shadow-md rounded-lg">
          <DataTable
            customStyles={customStyles}
            columns={columns}
            highlightOnHover
            data={filterImpresora}
            striped
            pagination
            responsive
          />
        </div>
        {/*         <Modal
          open={openEditModal}
          selectedProduct={selectedProduct}
          handleClose={handleCloseEditModal}
          handleUpdate={handleUpdate}
        /> */}

        {/* Diálogo de confirmación para eliminar */}
        <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
          <DialogTitle>¿Seguro que deseas eliminar este insumo?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)} color="primary">
              Cancelar
            </Button>
            <Button color="error">Eliminar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default viewImpresora;
