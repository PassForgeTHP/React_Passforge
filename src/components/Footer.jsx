import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <div className="footer-left link-top-one">
        <Link
          to="/gdpr"
          className="footer-link "
        >
          GDPR
        </Link>
        <Link
          to="/faq"
          className="footer-link"
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
        >
          Contact
        </Link>
      </div>
    </footer>
  );
}
