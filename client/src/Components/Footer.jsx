import { Link } from "react-router-dom";
import TextModal from "../Components/TextModal";
import TOSModal from "./TOSModal";
import TOS from "../data/TOS";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter ,FaRegCopyright} from "react-icons/fa";
function Footer() {
  return (
    <footer>
      <Link
        to="/"
        className="link-decoration"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <p> RentALG <FaRegCopyright/></p>
      </Link>
      <div className="modals-container">
         <TOSModal modalTitle={"Terms"}><TOS/></TOSModal>

        <TextModal modalTitle={"About"} modalContent={"😀😀😀"} />
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
