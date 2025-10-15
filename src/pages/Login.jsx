import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ViewPassword from "../components/ViewPassword";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/users/sign_in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email, password } }),
      });

      const data = await res.json().catch(() => ({}));
      // console.log("API response:", res.status, data);

      if (!res.ok) {
        const errorMsg =
          data.message || data.error || "Invalid email or password.";
        setMessage(errorMsg);
        return;
      }

      const token = res.headers.get("Authorization")?.split(" ")[1];
      login(data.user, token);
      setMessage(data.message || "You are logged in.");
      setTimeout(() => navigate("/profile"), 800);
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1 className="title">Login</h1>
      
        {message && <p className="status-message">{message}</p>}
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
