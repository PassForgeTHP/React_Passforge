import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ViewPassword from "../components/ViewPassword";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/users/sign_in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email, password } })
    });

    if (!res.ok) {
      console.error("Login failed");
      return;
    }

    const data = await res.json();
    const token = res.headers.get("Authorization")?.split(" ")[1];
    login(data.user, token);

    navigate("/profile");
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1 className="title">Login</h1>
      
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
