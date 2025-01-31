import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
/* Iconos */
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useNavigate } from "react-router-dom";
export default function NavListDrawer() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 250,
      }}
    >
      <nav>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/admin/verinsumos")}>
          <ListItemIcon>
            <Inventory2OutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Ver insumos" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <LocalPrintshopIcon />
          </ListItemIcon>
          <ListItemText primary="Ver impresoras" />
        </ListItemButton>
      </nav>
    </Box>
  );
}
