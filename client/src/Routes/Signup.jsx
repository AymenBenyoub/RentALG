import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/login-signup.css";
import { UserContext } from "../context/UserContext";
function Signup() {
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhoneNumber, setSignupPhoneNumber] = useState("");
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
        }),
      });

      if (!response.ok) {
        throw new Error("Signup request failed");
      }
      const responseData = await response.json();
      const token = responseData.token;
      localStorage.setItem("jwtToken", token);
      login({ ...user, token });
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
  };

  return (
    <>
      <div className="centered-container">
        <h2 style={{ marginTop: "0px", textAlign: "center" }}>Sign Up</h2>
        <form onSubmit={handleSignupSubmit}>
          <div>
            <label className="fnSignup" htmlFor="signupFirstName">
              First Name:
            </label>
            <input
              type="text"
              id="signupFirstName"
              className="name-input"
              value={signupFirstName}
              onChange={(e) => setSignupFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="lnSignup" htmlFor="signupLastName">
              Last Name:
            </label>
            <input
              type="text"
              id="signupLastName"
              className="name-input"
              value={signupLastName}
              onChange={(e) => setSignupLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="emailSignup" htmlFor="signupEmail">
              Email:
            </label>
            <input
              type="email"
              id="signupEmail"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="pwdSignup" htmlFor="signupPassword">
              Password:
            </label>
            <input
              type="password"
              id="signupPassword"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="pnSignup" htmlFor="signupPhoneNumber">
              Phone Number:
            </label>
            <input
              type="tel"
              id="signupPhoneNumber"
              value={signupPhoneNumber}
              onChange={(e) => setSignupPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "var(--primary-color",
              border: "none",
              borderRadius: "5px",
            }}
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
    </>
  );
}

export default Signup;
