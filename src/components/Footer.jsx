import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <div className="footer-left link-top-one">
        <Link
          to="/gdpr"
          className="footer-link "
          target="_blank"
          rel="noopener noreferrer"
        >
          GDPR
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
      <div className="container-foot link-bottom">
        <p>
          <span>&copy; 2025- PassForge</span>
          <span> </span>
          <span>All rights reserved.</span>
        </p>
      </div>
      <div className="footer-right link-top-two">
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
