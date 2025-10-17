import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ViewPassword from "../components/ViewPassword";

function Register() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors([]);

    try {
      const res = await fetch("https://rails-passforge2.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        }),
      });

      const data = await res.json().catch(() => ({}));
      console.log("API response:", res.status, data);

      if (!res.ok) {
        setMessage(data.message || "Signup failed.");
        if (data.errors) setErrors(data.errors);
        return;
      }

      const token = data.token;
      login(data.user, token);

      setMessage(data.message || "Signed up successfully!");
      setTimeout(() => navigate("/profile"), 800);
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1>Sign Up</h1>
        
          {message && (
            <div className="card-alerte">
              <p
                className={`status-message ${
                  message.toLowerCase().includes("failed") ? "error" : "success"
                }`}
              >
                {message}
              </p>
            </div>
          )}

          {errors.length > 0 && (
            <ul className="card-alerte">
              {errors.map((err, i) => (
                <li key={i} className="error-item">
                  {err}
                </li>
              ))}
            </ul>
          )}
        

        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="email-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <ViewPassword 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder='password'
              /></div>

            <div className="form-group">
              <label htmlFor="confirmation">Confirmation</label>
              <ViewPassword
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
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
