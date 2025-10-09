import { Link } from "react-router-dom";
export default function Pricing() {
  return (
    <>
      <h2>Choose the plan that fits your needs</h2>
      <div className="cards">
        <div className="card">
          <div class="card-body">
            <h3 class="card-title">Free</h3>
            <div class="card-text">
              <p>
                <span>0€</span> Free forever
              </p>
              <br />
              <br />
            </div>
            <Link to="/register" className="link-pricing">
              Create a free account
            </Link>

            <p class="card-text">Get a Passforge account!</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Unlimited device</li>
            <li class="list-group-item">Passkey management</li>
            <li class="list-group-item">Share vault with one other user</li>
          </ul>
        </div>
        <div className="card">
          <div class="card-body">
            <h3 class="card-title">Premium</h3>
            <div class="card-text">
              <p>
                <span>1€</span> per month
              </p>
              <p>10€ billed annually </p>
            </div>
            <Link to="/register" className="link-pricing">
              Create a Premium account
            </Link>
            <p class="card-text">Enjoy premium features!</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Integrated authenticator</li>
            <li class="list-group-item">File attachments</li>
            <li class="list-group-item">Security reports</li>
          </ul>
        </div>
        <div className="card">
          <div class="card-body">
            <h3 class="card-title">Families</h3>
            <div class="card-text">
              <p>
                <span>4€</span> per month
              </p>
              <p>40€ billed annually </p>
            </div>
            <Link to="/register" className="link-pricing">
              Start Free Trial
            </Link>
            <p class="card-text">Secure your family logins!</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">6 premium accounts</li>
            <li class="list-group-item">Unlimited sharing</li>
            <li class="list-group-item">Share vault between 6 people</li>
          </ul>
        </div>
      </div>
    </>
  );
}
