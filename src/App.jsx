import { Routes, Route } from "react-router-dom";
  import { useEffect } from "react";
  import Navbar from "./components/Navbar";
  import Footer from "./components/Footer";
  import Home from "./pages/Home";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import Dashboard from "./pages/Dashboard";
  import FAQ from "./components/FAQ";
  import { initDB } from "./services/indexedDB";
  import "./styles/App.css";
  import "./styles/navbar.css";
  import "./styles/responsives.css";
  import "./styles/form.css";

  function App() {
    // Initialize IndexedDB on app startup
    useEffect(() => {
      initDB()
        .then(() => {
          console.log("IndexedDB initialized successfully");
        })
        .catch((error) => {
          console.error("Failed to initialize IndexedDB:", error);
        });
    }, []);

    return (
      <>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    );
  }

  export default App;