import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavBar from "../../components/global/NavBar";
import Tabla from "../../components/Tabla/Tabla";

const InsumosTabla = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
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

      <Tabla />
    </div>
  );
};

export default InsumosTabla;
