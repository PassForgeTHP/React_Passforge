import { Link } from "react-router-dom";
export default function Pricing() {
  return (
    <>
      <div className="text-container-pricing">
        <h2>Choose the plan that fits your needs</h2>
      </div>
      <div className="cards">
        <div className="card">
          <div class="card-body">
            <h3 class="card-title">Free</h3>
            <p class="card-text">
              <span>0€</span> Free forever
            </p>
            <Link></Link>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card’s content.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
