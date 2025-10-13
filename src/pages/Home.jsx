import { Link } from "react-router-dom";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import img4 from "../assets/images/img4.png";
function Home() {
  return (
    <section className="home-container">
      <div className="text-container-home">
        <h1>PassForge</h1>
        <p>Not your vault, not your secrets</p>
        <div>
          <Link to="/security-advice" className="home-link">
            Discover
          </Link>
          <Link to="/register" className="home-link">
            Register
          </Link>
        </div>
      </div>
      <div className="img-container-home">
        <img src={img1} alt="image 1" />
        <img src={img2} alt="image 2" />
        <img src={img4} alt="image 4" />
        <img src={img3} alt="image 3" />
      </div>
    </section>
  );
}

export default Home;
