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

  const columns = [
    {
      name: "Marca",
      selector: (row) => row.marca,
    },
    {
      name: "Modelo",
      selector: (row) => row.modelo,
    },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad,
    },
    {
      name: "Proveedor",
      selector: (row) => row.proveedor,
    },
    {
      name: "Tipo de tinta",
      selector: (row) => row.tipoDeTinta,
    },
    {
      name: "Color",
      selector: (row) => row.colorDeTinta,
    },
    {
      name: "Fecha de ingreso",
      selector: (row) => new Date(row.fecha_ingreso).toLocaleDateString(), // Formateo de fecha
    },
  ];

  return <DataTable columns={columns} data={insumos} pagination />;
};

export default Tabla;
