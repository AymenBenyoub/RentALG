import { Link } from "react-router-dom";
import About from "./About";
import TOSModal from "./TOSModal";
import TOS from "../data/TOS";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaRegCopyright,
} from "react-icons/fa";
function Footer() {
  return (
    <footer>
      <Link
        to="/"
        className="link-decoration"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <p>
          {" "}
          RentALG <FaRegCopyright />
        </p>
      </Link>
      <div className="modals-container">
        <TOSModal modalTitle={"Terms"}>
          <TOS />
        </TOSModal>
        <TOSModal modalTitle={"About"}>
          <About />
        </TOSModal>
      </div>
      <div className="footer-icons">
        <FaFacebook />
        <FaInstagram />
        <FaLinkedin />
        <FaTwitter />
      </div>
    </footer>
  );
}

export default Footer;
