import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
export default function SecurityAdvice() {
  return (
    <section className="security-advice-container">
      <div className="security-section">
        <h1>Why PassForge ?</h1>
        <p>
          PassForge is a modern password manager — your personal forge for creating and securing unbreakable passwords. This three-week final project will showcase a revolutionary user interface and advanced security features.
        </p>
        <p>
          Just as a blacksmith transforms raw metal into a strong weapon, PassForge lets you generate cryptographically strong passwords, store them securely on your device, and organize them intelligently.
        </p>
      </div>
      <div className="block-text-img left">
        <img src={img1} alt="image 1" className="block-two" />
        <div className="security-section block-one">
          <h1>How to use ?</h1>
          <p>
            To start using <strong>PassForge</strong>, follow these simple steps — then enjoy powerful, private password management in seconds with features you'll love like: <strong>Instant search</strong> with advanced filters,  <strong>Real-time strength</strong> evaluation,<strong>One-click copy</strong> with automatic clear.
          </p>
          <ol>
            <li>Create an account on this website.</li>
            <li>Download and install the browser extension.</li>
            <li>Open the extension and set your master password.</li>
            <li>You’re ready — enjoy PassForge!</li>
          </ol>
          <p>
            Tip: your master password never leaves your device — PassForge stores and encrypts everything locally for maximum privacy.
          </p>

        </div>
      </div>
      <div className="block-text-img right">
        <div className="security-section block-one">
          <h1>Our tips </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit
            amet diam turpis. Donec semper malesuada nulla, sit amet lobortis
            risus malesuada ac. Vestibulum ut erat in erat fermentum efficitur
            id quis tellus. Nulla eget molestie ligula. Nulla non sagittis ex,
            id sagittis
          </p>
        </div>
        <img src={img2} alt="image 2" className="block-two" />
      </div>
    </section>
  );
}
