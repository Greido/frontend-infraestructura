import axios from "axios";
import { useEffect, useState } from "react";

const useImpresoraModal = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [insumos, setInsumos] = useState([]);

  useEffect(() => {
    const fetchInsumos = async () => {
      try {
        const response = await axios.get(
          "https://stockback-nnq9.onrender.com/impresoras/verImpresoras"
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
      const response = await axios.put(
        `https://stockback-nnq9.onrender.com/impresoras/${updatedProduct._id}`,
        updatedProduct
      );
      console.log("Producto actualizado:", response.data);
      setInsumos(insumos);
      handleCloseEditModal();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
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

export default useImpresoraModal;
