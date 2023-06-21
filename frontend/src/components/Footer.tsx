import "./footer.css";
import FooterCard from "./FooterCard";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="flex flex-wrap justify-evenly">
        <FooterCard name="Pranav Mehta" image="./assets/profile/pranavBhaiya.png" linkedIn="https://www.linkedin.com/in/pranav-mehta-b5a18b1ba/" />
        <FooterCard name="Abhay Chauhan" image="./assets/profile/abhay.jpg" linkedIn="https://linkedin.com/in/thoughtlessnerd" />
        <FooterCard name="Abhishek Gupta" image="./assets/profile/abhishek.jpg" linkedIn="https://www.linkedin.com/in/abhi-wd/" />
        <FooterCard name="Badal Kumar" image="./assets/profile/badal.jpg" linkedIn="https://www.linkedin.com/in/badalarya/" />
        <FooterCard name="Prerak Gada" image="./assets/profile/prerak.jpg" linkedIn="https://www.linkedin.com/in/prerak-gada-54a986199/" />
        <FooterCard name="Ayush Singh" image="./assets/profile/ayush.jpeg" linkedIn="https://www.linkedin.com/in/ayush-singh-77200a211/" />
        <FooterCard name="Shubham Pandey" image="./assets/profile/shubham.jpg" linkedIn="https://www.linkedin.com/in/shubham-pandey-430365233/" />
        <FooterCard name="Himanshu Raj" image="./assets/profile/default.png" linkedIn="#" />
        <FooterCard name="OM" image="./assets/profile/default.png" linkedIn="#" />
      </div>

      <span className="bottom">
        <img src="./assets/TextLogo.png" alt="ACD Ladders" />
        <span>Team with ❤</span>
      </span>
    </div>
  );
};

export default Footer;
