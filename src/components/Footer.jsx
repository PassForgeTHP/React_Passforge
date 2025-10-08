import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="footer-left">
        <Link
          to="/rgpd"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          RGPD
        </Link>
        <Link
          to="/faq"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          FAQ
        </Link>
      </div>
      <div className="container-foot">
        <p>&copy; 2025- PassForge - All rights reserved.</p>
      </div>
      <div className="footer-right">
        <Link
          to="/contact"
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact
        </Link>
      </div>
    </footer>
  );
}
