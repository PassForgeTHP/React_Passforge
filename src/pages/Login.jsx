import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ViewPassword from "../components/ViewPassword";
import SEO from "../components/SEO";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://passforge-api.onrender.com";
      const res = await fetch(`${apiUrl}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user: { email, password } }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMsg =
          data.message || data.error || "Invalid email or password.";
        setMessage(errorMsg);
        return;
      }

      // Check if 2FA is required
      if (data.requires_2fa) {
        setMessage(data.message || "Please enter your 2FA code");
        setTimeout(() => navigate("/two-factor-verify"), 800);
      } else {
        const token = res.headers.get("Authorization")?.split(" ")[1];
        console.log("🔑 Token from Authorization header:", token);
        console.log("📦 Full Authorization header:", res.headers.get("Authorization"));

        if (!token) {
          console.error("❌ No token found in Authorization header");
          setMessage("Login successful but no token received. Please try again.");
          return;
        }

        login(data.user, token, rememberMe);
        setMessage(data.message || "You are logged in.");
        setTimeout(() => navigate("/profile"), 800);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="container">
      <SEO
        title="PassForge | Login"
        description="Access your PassForge account safely. View, edit, and manage your passwords with end-to-end encryption and complete privacy."
        canonical="https://pass-forge-en.netlify.app/login"
      />
      <div className="form-card">
        <h1 className="title">Login</h1>
      
        {message && <div className="card-alerte"><p className="status-message">{message}</p></div>}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="email-input"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <ViewPassword 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder='password'
              />
            </div>
            <div>
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
            </div>
            <div className="form-actions">
              <button type="submit">Login</button>
              <Link to="/forgot-password" className="form-link">Forgot password ?</Link>
              <Link to="/register" className="form-link">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

