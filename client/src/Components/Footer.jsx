import { Link } from "react-router-dom";
import TextModal from "../Components/TextModal";
import { TOS } from "../static data/TOS";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
function Footer() {
  return (
    <footer>
      <Link
        to="/"
        className="logo-link"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <p>RentALG</p>
      </Link>
      <div className="modals-container">
        <TextModal modalTitle={"Terms"} modalContent={TOS} />

        <TextModal modalTitle={"About"} modalContent={"FUCK YOU! 🖕🖕🤬😡"} />

        <div className="footer-icons">
          <FaFacebook />
          <FaInstagram />
          <FaLinkedin />
          <FaTwitter />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
