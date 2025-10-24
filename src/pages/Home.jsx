import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import img4 from "../assets/images/img4.png";
function Home() {
  return (
    <section className="home-container">
      <SEO
        title="PassForge"
        description="PassForge helps you organize and secure your passwords safely. Access your data anywhere, knowing it’s encrypted and only you can decrypt it."
        canonical="https://pass-forge-en.netlify.app"
      />
      <div className="text-container-home">
        <h1>PassForge</h1>
        <p>Not your vault, not your secrets</p>
        <div>
          <Link to="/security-advice" className="btn">
            Discover
          </Link>
          <Link to="/register" className="btn">
            Register
          </Link>
        </div>
      </div>
      <div className="img-container-home">
        <img src={img1} alt="Secure password encryption illustration" />
        <img src={img2} alt="lock illustration" />
        <img src={img4} alt="illustration of a lock and key with a computer" />
        <img src={img3} alt="access and schema illustration" />
      </div>
    </section>
  );
}

export default Home;
