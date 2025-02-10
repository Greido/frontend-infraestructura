import axios from "axios";
import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import useInsumoModal from "../../hooks/useInsumoModal";
import Modal from "../modal/Modal";
import { ClipLoader } from "react-spinners";

const Tabla = () => {
  const [loading, setLoading] = useState(true);
  const [insumos, setInsumos] = useState([]);
  const [searchText, setSearchText] = useState(""); // Estado para la búsqueda

  const {
    openEditModal,
    selectedProduct,
    handleOpenEditModal,
    handleCloseEditModal,
    handleUpdate,
  } = useInsumoModal();

  useEffect(() => {
    const fetchInsumos = async () => {
      try {
        const response = await axios.get(
          "https://stockback-nnq9.onrender.com/insumo/allinsumos"
        );
        setInsumos(response.data);
      } catch (error) {
        console.log("Error insumistico", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsumos();
  }, []);

  // Filtrar insumos en función del texto de búsqueda
  const filteredInsumos = insumos.filter((insumo) =>
    Object.values(insumo).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const customStyles = {
    header: {
      style: {
        backgroundColor: "#1f2937",
        color: "#fff",
        fontSize: "18px",
      },
    },
    table: {
      style: {
        width: "100%",
        minWidth: "600px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      },
    },
    rows: {
      style: {
        backgroundColor: "#f9fafb",
        minHeight: "50px",
        "&:hover": {
          backgroundColor: "#e5e7eb",
        },
      },
    },
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
    { name: "Marca", selector: (row) => row.marca, sortable: true, grow: 1 },
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
            onClick={() => handleDelete(row._id)}
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

  // Borrar insumo
  const handleDelete = async (_id) => {
    const confirmar = window.confirm(
      "¿Confirma que desea eliminar este insumo?"
    );
    if (confirmar) {
      try {
        await axios.delete(`https://stockback-nnq9.onrender.com/insumo/${_id}`);
        const insumosActualizados = insumos.filter(
          (insumo) => insumo._id !== _id
        );
        setInsumos(insumosActualizados);
      } catch (error) {
        console.log("Error al eliminar el insumo", error);
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Barra de búsqueda */}
      <TextField
        label="Buscar insumo"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {loading ? (
        <ClipLoader size={30} />
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <DataTable
            customStyles={customStyles}
            columns={columns}
            highlightOnHover
            data={filteredInsumos} // Usamos los datos filtrados
            striped
            pagination
            responsive
          />
        </div>
      )}

      <Modal
        open={openEditModal}
        selectedProduct={selectedProduct}
        handleClose={handleCloseEditModal}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default Tabla;
