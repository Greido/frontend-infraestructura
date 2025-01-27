import { Container } from "@mui/material";
import "../src/index.css";
import NavBar from "./components/global/NavBar";
import HomePage from "./container/HomePage";

function App() {
  return (
    <>
      <NavBar />
      <Container sx={{ mt: 5 }}></Container>
      <HomePage />
    </>
  );
}

export default App;
