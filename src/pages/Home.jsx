import Pricing from "../components/Pricing";

function Home() {
  return (
    <section>
      <div className="text-container-home">
        <h1>PassForge</h1>
        <p>Secure password manager</p>
      </div>
      <div className="pricing-container-home" id="pricing">
        <Pricing />
      </div>
    </section>
  );
}

export default Home;
