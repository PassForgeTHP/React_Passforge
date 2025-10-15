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
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EditProfile from "./pages/EditProfile";
import Contact from "./pages/Contact";
import "./styles/form.css";
import "./styles/profile.css";
import GDPR from "./pages/GDPR";
import PrivateRoute from "./components/PrivateRoute";

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
    <div className="app-wrapper">
      <header>
        <Navbar />
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/security-advice" element={<SecurityAdvice />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="/contact" element={<Contact />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
