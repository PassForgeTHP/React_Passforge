import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
export default function SecurityAdvice() {
  return (
    <section className="security-advice-container">
      <div className="security-section">
        <h2>Why PassForge ?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit
          amet diam turpis. Donec semper malesuada nulla, sit amet lobortis
          risus malesuada ac. Vestibulum ut erat in erat fermentum efficitur id
          quis tellus. Nulla eget molestie ligula. Nulla non sagittis ex, id
          sagittis
        </p>
      </div>
      <div className="block-text-img left">
        <img src={img1} alt="image 1" className="block-two" />
        <div className="security-section block-one">
          <h2>How to use ?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit
            amet diam turpis. Donec semper malesuada nulla, sit amet lobortis
            risus malesuada ac. Vestibulum ut erat in erat fermentum efficitur
            id quis tellus. Nulla eget molestie ligula. Nulla non sagittis ex,
            id sagittis
          </p>
        </div>
      </div>
      <div className="block-text-img right">
        <div className="security-section block-one">
          <h2>Our tips </h2>
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
