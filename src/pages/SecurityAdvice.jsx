import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import SEO from "../components/SEO";

export default function SecurityAdvice() {
  return (
    <section className="security-advice-container">
      <SEO
        title="PassForge | Security Advice"
        description="Discover how PassForge helps you create, store, and protect your passwords with advanced encryption. Learn essential cybersecurity tips and best practices to keep your accounts safe from online threats."
        canonical="https://pass-forge-en.netlify.app/security-advice"
      />
      <div className="securityAdvice-section">
        <h1>Why PassForge ?</h1>
        <p>
          PassForge is a modern password manager — your personal forge for creating and securing unbreakable passwords. PassForge is more than just a password vault — it’s your digital armor, protect your data from leaks and brute-force attacks.
        </p>
        <p>
          Just as a blacksmith transforms raw metal into a strong weapon, PassForge lets you generate cryptographically strong passwords, store them securely on your device, and organize them intelligently.
        </p>
      </div>
      <div className="block-text-img left">
        <img src={img1} alt="Secure password encryption illustration" className="block-two" />
        <div className="securityAdvice-section block-one">
          <h1>How to use ?</h1>
          <p>
            To start using <strong>PassForge</strong>, follow these simple steps — then enjoy powerful, private password management in seconds with features you'll love like: <strong>Instant search</strong> with advanced filters, <strong>Real-time strength</strong> evaluation, <strong>One-click copy</strong> with automatic clear.
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
        <div className="securityAdvice-section block-one">
          <h1>Our tips </h1>
          <p>
            Your online security matters. With just a few good habits, you can protect your accounts from most cyber threats. Here are our favorite tips to help you stay safe, build stronger passwords, and browse with confidence.
          </p>
          <ul>
            <li><strong>Use unique passwords</strong> for every account — reusing one is the fastest way to get hacked.</li>
            <li><strong>Avoid patterns or personal info.</strong> Dates, names, or keyboard sequences (like “123456” or “qwerty”) are easy to guess.</li>
            <li><strong>Go long.</strong> A password with at least 12–16 characters is exponentially harder to crack.</li>
            <li><strong>Mix it up.</strong> Combine uppercase, lowercase, numbers, and symbols.</li>
            <li><strong>Use a password manager.</strong> It remembers everything for you — securely encrypted — so you only need one strong master password.</li>
            <li><strong>Enable two-factor authentication (2FA)</strong> whenever possible for an extra layer of protection.</li>
            <li><strong>Keep your software updated.</strong> Old browsers or extensions can have vulnerabilities.</li>
          </ul>
        </div>
        <img src={img2} alt="lock illustration" className="block-two" />
      </div>
    </section>
  );
}
