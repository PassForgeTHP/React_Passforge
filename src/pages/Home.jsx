import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";

function Home() {
  return (
    <>
      <div className="text-container-home">
        <h1>PassForge</h1>
        <p>Secure password manager</p>
      </div>
      <div>
        <Pricing />
        <FAQ />
      </div>
    </>
  );
}

export default Home;
