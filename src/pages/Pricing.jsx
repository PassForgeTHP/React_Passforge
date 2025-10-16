import { Link } from "react-router-dom";
export default function Pricing() {
  return (
    <section className="pricing-container-home" id="pricing">
      <h1>Choose the plan that fits your needs</h1>
      <div className="cards">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Free</h3>
            <div className="card-text">
              <p>
                <span>0€</span> Free forever
              </p>
              <br />
              <br />
            </div>
            <Link to="/register" className="btn">
              Create a free account
            </Link>

            <p className="card-text">Get a Passforge account!</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Unlimited device</li>
            <li className="list-group-item">Passkey management</li>
            <li className="list-group-item">Share vault with one other user</li>
          </ul>
        </div>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Premium</h3>
            <div className="card-text">
              <p>
                <span>1€</span> per month
              </p>
              <p>10€ billed annually </p>
            </div>
            <Link to="/register" className="btn">
              Create a Premium account
            </Link>
            <p className="card-text">Enjoy premium features!</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Integrated authenticator</li>
            <li className="list-group-item">File attachments</li>
            <li className="list-group-item">Security reports</li>
          </ul>
        </div>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Families</h3>
            <div className="card-text">
              <p>
                <span>4€</span> per month
              </p>
              <p>40€ billed annually </p>
            </div>
            <Link to="/register" className="btn">
              Start Free Trial
            </Link>
            <p className="card-text">Secure your family logins!</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">6 premium accounts</li>
            <li className="list-group-item">Unlimited sharing</li>
            <li className="list-group-item">Share vault between 6 people</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
