import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { HiClipboard, HiCheckCircle, HiInformationCircle } from 'react-icons/hi';
import '../styles/extensionLink.css';

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
 */
function ExtensionLink() {
  const { token } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);

  /**
   * Copy token to clipboard
   * Shows visual feedback for 2 seconds
   */
  const handleCopyToken = async () => {
    if (!token) return;

    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy token:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1 className="title">Link Your Extension</h1>

        <div className="info-box">
          <HiInformationCircle className="info-icon" />
          <p>
            Copy this token and paste it into your PassForge browser extension
            to link your account securely.
          </p>
        </div>

        <div className="token-section">
          <label htmlFor="token">Your Authentication Token</label>
          <div className="token-display-wrapper">
            <input
              id="token"
              type="text"
              value={token || ''}
              readOnly
              className="token-input"
              onClick={(e) => e.target.select()}
            />
            <button
              onClick={handleCopyToken}
              className="copy-button"
              disabled={!token}
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
        </div>

        <div className="instructions">
          <h3>How to link your extension:</h3>
          <ol>
            <li>Install the PassForge browser extension</li>
            <li>Click the extension icon in your browser</li>
            <li>Click "Link Account" or paste the token</li>
            <li>Create your Master Password (zero-knowledge encryption)</li>
          </ol>
        </div>

        <div className="warning-box">
          <p>
            <strong>Security Note:</strong> This token provides access to your account.
            Do not share it with anyone. If compromised, logout from all devices
            in your profile settings.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExtensionLink;
