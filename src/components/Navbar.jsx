import { Link, useNavigate } from "react-router-dom";
import { initializeNavbar } from "../javascript/navbar";
import logo from "../assets/images/logo.png";
import { useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    initializeNavbar();
  }, []);

  const scrollTo = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg ">
      <div className="container-fluid">
        <div className="img-container">
          <img src={logo} alt="logo" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <i className="bi bi-list"></i>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="close-btn"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="bi bi-x-circle-fill"></i>
            </button>
          </div>
          <div className="offcanvas-body">
            <div className="container-left">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/security-advice" className="nav-link">
                    Security Advice
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => scrollTo("pricing")}
                    className="nav-link"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    Pricing
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => scrollTo("faq")}
                    className="nav-link"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
            <div className="container-right">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link">Logout</button>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
