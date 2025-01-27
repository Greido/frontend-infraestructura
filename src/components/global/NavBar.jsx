import { AppBar, Drawer, IconButton, Toolbar } from "@mui/material";
import { useState } from "react";
import NavListDrawer from "./NavListDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import HomePage from "../../container/HomePage";
import { Outlet } from "react-router-dom";
export default function NavBar({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              setOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
        <NavListDrawer />
      </Drawer>
      {children}
      <Outlet />
    </>
  );
}
