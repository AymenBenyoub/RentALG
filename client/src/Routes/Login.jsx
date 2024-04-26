import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/login-signup.module.css";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Function to handle login form submission
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log("Login Email:", loginEmail);
    console.log("Login Password:", loginPassword);
    // Reset login fields after submission
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <div className={styles.centeredContainer}>
      <>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label className={styles.emailLogin} htmlFor="loginEmail">
              Email:
            </label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.pwdLogin} htmlFor="loginPassword">
              Password:
            </label>
            <input
              type="password"
              id="loginPassword"
              name="name"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </>

      <p className={styles.account}>
        <p>Don&apos;t have an account?</p>
        <Link to="/signup">
          <p className={styles.change}>Sign up</p>
        </Link>
      </p>
    </div>
  );
};

export default Login;
