import { useState, useEffect } from "react";
import "./App.css";
import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Home";
import ResultsUI from "./ResultsUI";
import CreateListing from "./components/listings/CreateListings";
import UserDashboard from "./components/user/UserDashboard";
import supabase from "./supabaseClient";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [auth, setAuth] = useState(() => {
    const user = supabase.auth.user;
    return user ? { user } : null;
  });

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

  // Update this useEffect to save the auth state to localStorage
  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  // Add useEffect for handling auth state change
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session ? { user: session.user } : null;
        setAuth(user);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container maxWidth="md">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  auth={auth}
                  setAuth={setAuth}
                />
              }
            />
            <Route
              path="/search/:query"
              element={
                <ResultsUI darkMode={darkMode} setDarkMode={setDarkMode} />
              }
            />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard auth={auth} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
