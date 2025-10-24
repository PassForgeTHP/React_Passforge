import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <div>
      <SEO
        title="PassForge | Not Found"
        description="Page not found — the PassForge page you’re looking for doesn’t exist. Return to the homepage or navigate safely through our site."
        canonical="https://pass-forge-en.netlify.app/*"
      />
      <div className="not-found">
        <h1>404 - Page not found</h1>
        <p>The page you’re looking for doesn’t exist.</p> 
        <Link to="/" className="btn">Go back home</Link>
      </div>
    </div>
  );
}