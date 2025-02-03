import { AppBar, Drawer, IconButton, Toolbar } from "@mui/material";
import { useState } from "react";
import NavListDrawer from "./NavListDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomePage from "../../container/HomePage";
import { Outlet, useNavigate } from "react-router-dom";
import { cerrarSesion } from "../../store/Slices/authSlice";
import { useDispatch } from "react-redux";

export default function NavBar({ children }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(cerrarSesion());
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            onClick={() => {
              setOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton color="inherit" onClick={logOut}>
            <LogoutIcon />
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
