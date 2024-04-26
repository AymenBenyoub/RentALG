import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/login-signup.module.css";

function Signup() {
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhoneNumber, setSignupPhoneNumber] = useState("");

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    // Add your signup logic here
    console.log("Signup First Name:", signupFirstName);
    console.log("Signup Last Name:", signupLastName);
    console.log("Signup Email:", signupEmail);
    console.log("Signup Password:", signupPassword);
    console.log("Signup Phone Number:", signupPhoneNumber);
    // Reset signup fields after submission
    setSignupFirstName("");
    setSignupLastName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupPhoneNumber("");
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignupSubmit}>
        <div>
          <label className={styles.fnSignup} htmlFor="signupFirstName">
            First Name:
          </label>
          <input
            type="text"
            id="signupFirstName"
            value={signupFirstName}
            onChange={(e) => setSignupFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.lnSignup} htmlFor="signupLastName">
            Last Name:
          </label>
          <input
            type="text"
            id="signupLastName"
            value={signupLastName}
            onChange={(e) => setSignupLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className={styles.emailSignup} htmlFor="signupEmail">
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
          <label className={styles.pwdSignup} htmlFor="signupPassword">
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
          <label className={styles.pnSignup} htmlFor="signupPhoneNumber">
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
        <button type="submit">Sign Up</button>
      </form>
      <p className={styles.account}>
        <p>already have an account?</p>
        <Link to="/login">
          <p className={styles.change}>Login</p>
        </Link>
      </p>
    </>
  );
}

export default Signup;
