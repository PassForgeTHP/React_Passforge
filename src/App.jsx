import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SecurityAdvice from "./pages/SecurityAdvice";
import { initDB } from "./services/indexedDB";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import "./styles/App.css";
import "./styles/navbar.css";
import "./styles/responsives.css";
import "./styles/home.css";

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
          <Route path="/security-advice" element={<SecurityAdvice />} />
          <Route path="/pricing" element={<Pricing />} />
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
