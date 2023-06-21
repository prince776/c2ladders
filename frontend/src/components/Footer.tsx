import "./footer.css";
import FooterCard from "./FooterCard";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="flex">
        <FooterCard name="Pranav Mehta" image="./assets/profile/pranavBhaiya.png" linkedIn="https://www.linkedin.com/in/pranav-mehta-b5a18b1ba/" />
        <FooterCard name="Abhay Chauhan" image="./assets/profile/abhay.jpg" linkedIn="https://linkedin.com/in/thoughtlessnerd" />
        <FooterCard name="Abhishek Gupta" image="./assets/profile/abhishek.jpg" linkedIn="https://www.linkedin.com/in/abhi-wd/" />
        <FooterCard name="Himanshu Raj" image="./assets/profile/default.png" linkedIn="#" />
        <FooterCard name="OM" image="./assets/profile/default.png" linkedIn="#" />
        <FooterCard name="Hikaku" image="./assets/profile/default.png" linkedIn="#" />
        <FooterCard name="Badal Arya" image="./assets/profile/default.png" linkedIn="https://www.linkedin.com/in/badalarya/" />
        <FooterCard name="Pirate King" image="./assets/profile/default.png" linkedIn="#" />
        <FooterCard name="Prerak Gada" image="./assets/profile/default.png" linkedIn="#" />
      </div>

      <span className="bottom">
        <img src="./assets/TextLogo.png" alt="ACD Ladders" />
        <span>Team with ❤</span>
      </span>
    </div>
  );
};

export default Footer;
