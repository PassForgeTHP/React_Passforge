import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import use2FAApi from "../hooks/use2FAApi";
import SEO from "../components/SEO";

function TwoFactorVerify() {
  const { login } = useContext(AuthContext);
  const twoFAApi = use2FAApi();
  const [code, setCode] = useState("");
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!code.trim()) {
      setMessage("Please enter a verification code.");
      return;
    }

    try {
      const { response, data } = await twoFAApi.verifyLogin(
        useBackupCode ? null : code,
        useBackupCode ? code : null
      );

      const token = response.headers.get("Authorization")?.split(" ")[1];
      login(data.user, token, false);
      setMessage(data.message || "Login successful.");
      setTimeout(() => navigate("/profile"), 800);
    } catch (error) {
      console.error("2FA verification error:", error);
      setMessage(error.message || "Server error. Please try again later.");
    }
  };

  return (
    <div className="container">
      <SEO
        title="PassForge | two Factor Verify"
        description="Secure your PassForge account with two-factor authentication. Protect your encrypted passwords and ensure only you can access your account."
        canonical="https://pass-forge-en.netlify.app/two-factor-verify"
      />
      <div className="form-card">
        <h1 className="title">Two-Factor Authentication</h1>

        {message && <div className="card-alerte"><p className="status-message">{message}</p></div>}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="code">
                {useBackupCode ? "Backup Code" : "Authentication Code"}
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={useBackupCode ? "Enter your backup code" : "Enter 6-digit code"}
                className="email-input"
                autoFocus
                maxLength={useBackupCode ? undefined : 6}
              />
              <p style={{ fontSize: "0.9rem", color: "var(--light)", marginTop: "0.5rem" }}>
                {useBackupCode
                  ? "Enter one of your backup codes"
                  : "Enter the code from your authenticator app"}
              </p>
            </div>

            <div className="form-actions">
              <button type="submit">Verify</button>
              <button
                type="button"
                className="form-link"
                onClick={() => {
                  setUseBackupCode(!useBackupCode);
                  setCode("");
                  setMessage("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                {useBackupCode ? "Use authenticator code" : "Use backup code instead"}
              </button>
              <Link to="/login" className="form-link">Back to login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TwoFactorVerify;
