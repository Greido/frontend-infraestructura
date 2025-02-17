import axios from "axios";
import { useEffect, useState } from "react";

const useInsumoModal = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
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

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setOpenEditModal(false);
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      console.log("Antes de enviar:", updatedProduct);

      const updatedData = {
        ...updatedProduct,
        proveedor: updatedProduct.proveedor._id, // Asegurar que proveedor es solo el ID
      };

      console.log("Datos enviados al backend:", updatedData);

      const response = await axios.put(
        `https://stockback-nnq9.onrender.com/insumo/${updatedProduct._id}`,
        updatedData
      );

      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  return {
    openEditModal,
    selectedProduct,
    selectedId,
    handleOpenEditModal,
    handleCloseEditModal,
    handleUpdate,
  };
};

export default useInsumoModal;
