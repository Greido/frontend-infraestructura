import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../index.css";
import { IconButton, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
/* Icons */
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Person2Icon from "@mui/icons-material/Person2";
import NavBar from "../components/global/NavBar";
import DevicesIcon from "@mui/icons-material/Devices";
import CategoryIcon from "@mui/icons-material/Category";
function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <Container className="con-hp displayflex-column">
        <Row>
          <Col>
            <Paper
              elevation={10}
              sx={{
                mt: 5,
                height: 200,
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <IconButton onClick={() => navigate("/admin/upinsumo")}>
                <Inventory2OutlinedIcon
                  sx={{
                    justifyContent: "center",
                    fontWeight: 800,
                    width: 100,
                    height: 50,
                  }}
                />
              </IconButton>
              <Typography
                sx={{
                  textAlign: "center",
                  flexDirection: "column",
                  fontSize: 30,
                }}
              >
                Cargar insumo
              </Typography>
            </Paper>
          </Col>
          {/*  */}
          <Col>
            <Paper
              elevation={5}
              sx={{
                mt: 5,
                height: 200,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <IconButton onClick={() => navigate("/admin/upimpresora")}>
                <LocalPrintshopIcon
                  sx={{
                    justifyContent: "center",
                    fontWeight: 800,
                    width: 100,
                    height: 50,
                  }}
                />
              </IconButton>

              <Typography
                sx={{
                  textAlign: "center",
                  flexDirection: "column",
                  fontSize: 30,
                }}
              >
                Cargar impresora
              </Typography>
            </Paper>
          </Col>
          {/* Columna para ver stock */}
          <Col>
            <Paper
              elevation={5}
              sx={{
                mt: 5,
                height: 200,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <IconButton onClick={() => navigate("/admin/uproveedor")}>
                <LocalShippingIcon
                  sx={{
                    justifyContent: "center",
                    fontWeight: 800,
                    width: 100,
                    height: 50,
                  }}
                />
              </IconButton>
              <Typography
                sx={{
                  textAlign: "center",
                  flexDirection: "column",
                  fontSize: 30,
                }}
              >
                Cargar Proveedor
              </Typography>
            </Paper>
          </Col>
        </Row>
        {/* ------------------------ */}
      </Container>
      <Container className="con-hp displayflex-column">
        <Row>
          <Col>
            <Paper
              elevation={10}
              sx={{
                mt: 5,
                height: 200,
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <IconButton>
                <DevicesIcon
                  sx={{
                    justifyContent: "center",
                    fontWeight: 800,
                    width: 100,
                    height: 50,
                  }}
                />
              </IconButton>
              <Typography
                sx={{
                  textAlign: "center",
                  flexDirection: "column",
                  fontSize: 30,
                }}
              >
                Ingreso de hardware
              </Typography>
            </Paper>
          </Col>
          {/*  */}
          <Col>
            <Paper
              elevation={5}
              sx={{
                mt: 5,
                height: 200,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <IconButton>
                <CategoryIcon
                  sx={{
                    justifyContent: "center",
                    fontWeight: 800,
                    width: 100,
                    height: 50,
                  }}
                />
              </IconButton>

              <Typography
                sx={{
                  textAlign: "center",
                  flexDirection: "column",
                  fontSize: 30,
                }}
              >
                Crear categoria
              </Typography>
            </Paper>
          </Col>
          {/* Columna para ver stock */}
          <Col>
            <Paper
              elevation={5}
              sx={{
                mt: 5,
                height: 200,
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <IconButton>
                <Person2Icon
                  sx={{
                    justifyContent: "center",
                    fontWeight: 800,
                    width: 100,
                    height: 50,
                  }}
                />
              </IconButton>
              <Typography
                sx={{
                  textAlign: "center",
                  flexDirection: "column",
                  fontSize: 30,
                }}
              >
                Perfil
              </Typography>
            </Paper>
          </Col>
        </Row>
        {/* ------------------------ */}
      </Container>
    </>
  );
}

export default HomePage;
