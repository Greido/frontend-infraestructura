import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../index.css";
import { IconButton, Paper, Typography } from "@mui/material";
/* Icons */
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

function HomePage() {
  return (
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
              Cargar stock
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
            <IconButton>
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
  );
}

export default HomePage;
