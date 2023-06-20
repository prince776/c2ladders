import "./footer.css";
import User from "./User";
interface FooterProps {}

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <span className="top">Created by</span>
      <div className="middle">
        <User
          link="https://www.linkedin.com/in/pranav-mehta-b5a18b1ba/"
          name="Pranav"
          username="i_Pranav"
          profilePic="./assets/profile/pranavBhaiya.png"
        />
        <User
          link="https://linkedin.com/in/thoughtlessnerd"
          name="Abhay chauhan"
          username="ThoughtlessNerd"
          profilePic="./assets/profile/abhay.jpg"
        />
      </div>
      <span className="bottom">
        <img src="./assets/TextLogo.png" alt="ACD Ladders" />
        <span>Team with ❤</span>
      </span>
    </div>
  );
};

export default Footer;
