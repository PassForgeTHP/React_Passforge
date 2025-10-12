import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: { email, password, password_confirmation: passwordConfirmation }
      }),
    });

    if (!res.ok) {
      console.error("Signup failed");
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
        <h1>Sign Up</h1>
      
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmation">Confirmation</label>
              <input
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                type="password"
                placeholder="Confirmation"
              />
            </div>
            <div className="form-actions">
              <button type="submit">Sign In</button>
              <Link to="/login" className="form-link">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
