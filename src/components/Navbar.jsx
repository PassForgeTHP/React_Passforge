import { Link } from "react-router-dom";
import { initializeNavbar } from "../javascript/navbar";
import logo from "../assets/images/logo.svg";
import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    initializeNavbar();
  }, []);

  return (
    <nav className="navbar fixed-top navbar-expand-lg ">
      <div className="container-fluid">
        <div className="img-container">
          <img src={logo} alt="logo" />
        </div>
        <div className="links-container">
          <ul className="container-left">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/security-advice" className="nav-link">
                Security Advice
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pricing" className="nav-link">
                Pricing
              </Link>
            </li>
          </ul>
          <ul className="container-right">
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
        {/* <div
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
          <div className="offcanvas-body"></div>
        </div> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
    </nav>
  );
}
