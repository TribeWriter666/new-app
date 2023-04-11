import { useState, useEffect } from "react";
import "./App.css";
import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Home";
import ResultsUI from "./ResultsUI";
import CreateListing from "./components/listings/CreateListings";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    if (darkMode) {
      document.body.style.setProperty(
        "--bg-color",
        theme.palette.background.default
      );
    } else {
      document.body.style.setProperty(
        "--bg-color",
        theme.palette.background.default
      );
    }
  }, [darkMode, theme]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container maxWidth="md">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage darkMode={darkMode} setDarkMode={setDarkMode} />
              }
            />
            <Route
              path="/search/:query"
              element={
                <ResultsUI darkMode={darkMode} setDarkMode={setDarkMode} />
              }
            />
            <Route path="/create-listing" element={<CreateListing />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
