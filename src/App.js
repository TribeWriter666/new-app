import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Home";
import ResultsUI from "./ResultsUI";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:query" element={<ResultsUI />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
