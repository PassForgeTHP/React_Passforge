import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://passforge-api.onrender.com';
      const response = await fetch(`${apiUrl}/users/password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email } }),
      });

      if (response.ok) {
        setMessage("An Email to reset your password has been send !");
      } else {
        setMessage("No email found.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error has occurred.");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1 className="title">Forgot password ?</h1>
      
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="form-actions">
              <button type="submit">Send link</button>
              <Link to="/login" className="form-link">Login</Link>
              <Link to="/register" className="form-link">Register</Link>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;