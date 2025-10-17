export default function FAQ() {
  return (
    <section className="faq-container-home" id="faq">
      <h1>FAQ</h1>
      <div className="faq-container">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">What is this password manager?</h4>
            <p className="card-text">
              Our password manager is a secure tool that helps you store,
              organize, and access your passwords safely across all your
              devices. Your data is encrypted locally before it ever reaches our
              servers.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              Do I need an internet connection to use it?
            </h4>
            <p className="card-text">
              You can access your passwords offline. Any changes will sync
              automatically once you’re back online.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">How is my data protected?</h4>
            <p className="card-text">
              We use end-to-end encryption with modern algorithms (AES-256 and
              PBKDF2). This means only you can decrypt your data — not even we
              can access your passwords.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              What happens if I forget my master password?
            </h4>
            <p className="card-text">
              For security reasons, we cannot recover or reset your master
              password. It’s the only key that can decrypt your vault, so make
              sure you store it safely.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Can I use it on multiple devices?</h4>
            <p className="card-text">
              Yes. Your encrypted vault syncs seamlessly across all your devices
              — desktop, mobile, and web.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              How do I import passwords from another manager or browser?
            </h4>
            <p className="card-text">
              You can easily import your passwords from Chrome, Firefox, or
              other password managers using our “Import” feature in the
              settings.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Is my data shared with anyone?</h4>
            <p className="card-text">
              No. We never share or sell your personal data. Your vault is
              private and encrypted — only you hold the key.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              Can I store more than just passwords?
            </h4>
            <p className="card-text">
              Absolutely. You can securely store notes, credit card details, and
              other sensitive information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
