import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
export default function NavListDrawer() {
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
      </nav>
    </Box>
  );
}
