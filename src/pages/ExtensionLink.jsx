import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  HiClipboard,
  HiCheckCircle,
  HiInformationCircle,
  HiRefresh,
} from "react-icons/hi";
import SEO from "./../components/SEO";

/**
 * ExtensionLink Page
 *
 * Displays the JWT token for users to link their browser extension.
 * This page is protected and requires authentication.
 *
 * Zero-Knowledge Architecture:
 * - Token is used ONLY for authentication with the API
 * - Token does NOT decrypt the vault (Master Password does)
 * - User must copy this token and paste it in the extension
 * - Fresh token is generated each time this page is accessed
 */
function ExtensionLink() {
  const { token: contextToken, setUser } = useContext(AuthContext);
  const [freshToken, setFreshToken] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Initialize with current session token
   * This is the JWT token already in the user's session
   */
  useEffect(() => {
    if (contextToken) {
      setFreshToken(contextToken);
      setLoading(false);
    } else {
      setError("No authentication token found. Please login again.");
      setLoading(false);
    }
  }, [contextToken])

  /**
   * Copy token to clipboard
   * Shows visual feedback for 2 seconds
   */
  const handleCopyToken = async () => {
    if (!freshToken) return;

    try {
      await navigator.clipboard.writeText(freshToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy token:", error);
    }
  };

  return (
    <div className="container">
      <SEO
        title="PassForge | link your extension"
        description="Securely connect your PassForge browser extension to your account using a one-time authentication token. Zero-knowledge design ensures your master password and vault data remain fully private."
        canonical="https://pass-forge-en.netlify.app/extension-link"
      />
      <div className="form-card">
        <h1 className="title">Link Your Extension</h1>

        <div className="info-box">
          <HiInformationCircle className="info-icon" />
          <p>
            Copy this token and paste it into your PassForge browser extension
            to link your account securely. A fresh token is generated each time
            you visit this page.
          </p>
        </div>

        {loading && (
          <div className="loading-message">
            <HiRefresh className="spinning-icon" />
            Generating fresh token...
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
            <button className="btn" onClick={generateFreshToken}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && freshToken && (
          <div className="token-section">
            <label htmlFor="token">Your Authentication Token</label>
            <div className="token-display-wrapper">
              <input
                id="token"
                type="text"
                value={freshToken}
                readOnly
                className="token-input"
                onClick={(e) => e.target.select()}
              />
              <button
                onClick={handleCopyToken}
                className="copy-button"
                disabled={!freshToken}
              >
                {copied ? (
                  <>
                    <HiCheckCircle /> Copied
                  </>
                ) : (
                  <>
                    <HiClipboard /> Copy
                  </>
                )}
              </button>
            </div>
            <p className="token-info" style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
              <HiInformationCircle style={{ verticalAlign: "middle", marginRight: "0.25rem" }} />
              To get a new token, logout and login again.
            </p>
          </div>
        )}

        <div className="instructions">
          <h3>How to link your extension:</h3>
          <ol>
            <li>Install the PassForge browser extension</li>
            <li>Click the extension icon in your browser</li>
            <li>Paste the token and click on "Link Account"</li>
            <li>Create your Master Password (zero-knowledge encryption)</li>
          </ol>
        </div>

        <div className="warning-box">
          <p>
            <strong>Security Note:</strong> This token provides access to your
            account. Do not share it with anyone. If compromised, logout from
            all devices in your profile settings.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExtensionLink;
