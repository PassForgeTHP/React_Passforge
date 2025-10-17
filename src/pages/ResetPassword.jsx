import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import ViewPassword from "../components/ViewPassword";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://passforge-api.onrender.com/users/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            reset_password_token: token,
            password,
            password_confirmation: passwordConfirmation,
          },
        }),
      });

      if (response.ok) {
        setMessage("Password successfully changed!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage("Error: please check your link or passwords.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error has occurred.");
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1>Reset your password</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <ViewPassword
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ViewPassword
              placeholder="Confirm password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />

            <div className="form-actions">
              <button type="submit">Reset password</button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;