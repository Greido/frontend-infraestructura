import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import useInsumoModal from "../../hooks/useInsumoModal";
import Modal from "../modal/Modal";
const Tabla = () => {
  const [insumos, setInsumos] = useState([]);

  const {
    openEditModal,
    selectedProduct,
    selectedId,
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
        console.log("Insumos", response.data);
      } catch (error) {
        console.log("Error insumistico", error);
      }
    };
    fetchInsumos();
  }, []);

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
        width: "100%", // La tabla ocupa todo el ancho disponible
        minWidth: "600px", // Mínimo ancho para evitar que se compacte demasiado
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

  //Borrar insumo
  const handleDelete = async (_id) => {
    const confirmar = window.confirm(
      "¿Confirma que desea eliminar esta impresora?"
    );
    if (confirmar) {
      try {
        // Realizar la solicitud DELETE
        await axios.delete(`https://stockback-nnq9.onrender.com/insumo/${_id}`);

        // Actualizar la lista de impresoras sin la impresora eliminada
        const impresoraActualizada = insumos.filter(
          (impresora) => impresora._id !== _id
        );

        setInsumos(impresoraActualizada);
      } catch (error) {
        console.log("Error al eliminar la impresora", error);
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <DataTable
          className="Tabla"
          customStyles={customStyles}
          columns={columns}
          highlightOnHover
          data={insumos}
          striped
          pagination
          responsive
        />
      </div>

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
