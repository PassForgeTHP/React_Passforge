import { Link, useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useTheme from "../hooks/useTheme";

import logo from "../assets/images/logo.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const {theme, toggleTheme}=useTheme();

  const { user, logout } = useContext(AuthContext);


  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="img-container">
          <img src={logo} alt="logo" />
        </div>
        <button
          className="navbar-toggler"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <div className="links-container">
          <ul className="container-left">
            <li className="nav-item">
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/security-advice"
                className={
                  location.pathname === "/security-advice" ? "active" : ""
                }
              >
                Security Advice
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/pricing"
                className={location.pathname === "/pricing" ? "active" : ""}
              >
                Pricing
              </Link>
            </li>
          </ul>
          <ul className="container-right">
            <li>
              <button 
              className="theme-toggle"
              onClick={toggleTheme}
              type="button"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={theme === "dark"}
              >
                {theme === "dark" ? (
                  <Icon icon="ph:sun" width="24" />
                ) : (
                  <Icon icon="ph:moon" width="24"/>
                )}
              </button>
            </li>
           {user ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className={location.pathname === "/profile" ? "active" : ""}
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className={location.pathname === "/login" ? "active" : ""}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className={location.pathname === "/register" ? "active" : ""}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className={`offcanvas ${isOpen ? "open" : ""}`}>
          <div className="offcanvas-header">
            <h3>Menu</h3>
            <button
              className="close-btn"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              X
            </button>
          </div>
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/security-advice"
                className={
                  location.pathname === "/security-advice" ? "active" : ""
                }
              >
                Security Advice
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className={location.pathname === "/pricing" ? "active" : ""}
              >
                Pricing
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className={location.pathname === "/profile" ? "active" : ""}
                    onClick={closeMenu}
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <button className="logout-menu-btn" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={location.pathname === "/login" ? "active" : ""}
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={location.pathname === "/register" ? "active" : ""}
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            <li>
              <button 
              className="theme-toggle"
              onClick={toggleTheme}
              type="button"
              >
                {theme === "dark" ? (
                  <Icon icon="ph:sun" width="24" />
                ) : (
                  <Icon icon="ph:moon" width="24"/>
                )}
              </button>
            </li>
            
          </ul>
        </div>
        <div
          className={`overlay ${isOpen ? "show" : ""}`}
          onClick={closeMenu}
        ></div>
      </div>
    </nav>
  );
}
