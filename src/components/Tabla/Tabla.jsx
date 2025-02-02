import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Tabla = () => {
  const [insumos, setInsumos] = useState([]);

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
  ];

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
          responsive // Habilita la respuesta automática
        />
      </div>
    </div>
  );
};

export default Tabla;
