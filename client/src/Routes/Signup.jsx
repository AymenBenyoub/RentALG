import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/login-signup.css";
import { UserContext } from "../context/UserContext";
import logo from "../assets/logo-transparent-png.png";
import TOSModal from "../Components/TOSModal";
import TOS from "../data/TOS";
import { FiPhone } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuUser2 } from "react-icons/lu";
function Signup() {
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhoneNumber, setSignupPhoneNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState("");
  const { user, login } = useContext(UserContext);

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: signupFirstName,
          last_name: signupLastName,
          email: signupEmail,
          password: signupPassword,
          phone_number: signupPhoneNumber,
          role: "user",
        }),
      });

      if (!response.ok) {
        throw new Error("Signup request failed");
      }
      const responseData = await response.json();
      const token = responseData.token;
      const uid = responseData.userId;
      localStorage.setItem("jwtToken", token);
      login({ ...user, uid, token });
      window.location.replace("/");
      console.log("Signup successful");
    } catch (error) {
      console.error("Signup error:", error);
    }

    console.log("Signup First Name:", signupFirstName);
    console.log("Signup Last Name:", signupLastName);
    console.log("Signup Email:", signupEmail);
    console.log("Signup Password:", signupPassword);
    console.log("Signup Phone Number:", signupPhoneNumber);
    setSignupFirstName("");
    setSignupLastName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupPhoneNumber("");
    setAgreeTerms("");
  };

  return (
    <>
      <div className="form-page-background">
        <Link
          to="/"
          className="link-decoration"
          style={{
            width: "250px",
            heigh: "60px",
            position: "relative",
            top: "30px",
          }}
        >
          <div className="logo">
            <img
              src={logo}
              alt="RentALG"
              style={{
                display: "block",
                width: "250px",
                heigh: "60px",
              }}
            />
          </div>
        </Link>
        <div className="centered-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignupSubmit}>
            <div>
              <label className="fnSignup" htmlFor="signupFirstName">
                First Name:
              </label>
              <div className="named-input">
                <input
                  type="text"
                  id="signupFirstName"
                  className="name-input"
                  value={signupFirstName}
                  onChange={(e) => setSignupFirstName(e.target.value)}
                  required
                />
                <LuUser2 />
              </div>
            </div>
            <div>
              <label className="lnSignup" htmlFor="signupLastName">
                Last Name:
              </label>
              <div className="named-input">
                <input
                  type="text"
                  id="signupLastName"
                  className="name-input"
                  value={signupLastName}
                  onChange={(e) => setSignupLastName(e.target.value)}
                  required
                />
                <LuUser2 />
              </div>
            </div>
            <div>
              <label className="emailSignup" htmlFor="signupEmail">
                Email:
              </label>
              <div className="named-input">
                <input
                  type="email"
                  id="signupEmail"
                  className="name-input"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
                <IoMailOutline />
              </div>
            </div>
            <div>
              <label className="pwdSignup" htmlFor="signupPassword">
                Password:
              </label>
              <div className="named-input">
                <input
                  type="password"
                  id="signupPassword"
                  className="name-input"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <RiLockPasswordLine />
              </div>
            </div>
            <div>
              <label className="pnSignup" htmlFor="signupPhoneNumber">
                Phone Number:
              </label>
              <div className="named-input">
                <input
                  type="tel"
                  id="signupPhoneNumber"
                  className="name-input"
                  value={signupPhoneNumber}
                  onChange={(e) => setSignupPhoneNumber(e.target.value)}
                  required
                />
                <FiPhone />
              </div>
            </div>
            <div className="agreeterms">
              <input
                type="checkbox"
                onChange={(e) => setAgreeTerms(e.target.value)}
                required
              />{" "}
              I agree to the{" "}
              <TOSModal modalTitle={"Terms"}>
                <TOS />
              </TOSModal>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "var(--primary-color",
                border: "none",
                borderRadius: "5px",
                height: "40px",
              }}
              className="loginButton"
            >
              Sign Up
            </button>
          </form>
          <p className="account">
            <p>already have an account?</p>
            <Link to="/login" className="link-decoration">
              <p className="change">Login</p>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
