import { useEffect, useState } from "react";
import "./footer.css";
import FooterCard from "./FooterCard";


const Footer: React.FC = () => {

  const [counter, setCounter] = useState(0);


  const getData = async () => {
    const response = await fetch("https://acodedaily.com/api/analysis");
    if (response.status == 200) {
      const data = await response.json();
      console.log(typeof data.data[0].hits);
      setCounter(data.data[0].hits);
    }
  }

  useEffect(() => {
    getData()
  }, [])



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

      <a href="https://discord.gg/Pk3F2CW76p" target="_blank" className="relative inline-block px-4 py-2 font-medium group">
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
        <span className="relative text-black group-hover:text-white">Visit Count: {counter}</span>
      </a>

      <span className="bottom">
        <img src="./assets/TextLogo.png" alt="ACD Ladders" />
        <span>Team with ❤</span>
      </span>
    </div>
  );
};

export default Footer;
