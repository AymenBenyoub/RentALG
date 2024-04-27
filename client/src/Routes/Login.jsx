import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/login-signup.css";

const Login = async () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      console.log("Login successful");
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="centered-container">
      <>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label className="emailLogin" htmlFor="loginEmail">
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
            <label className="pwdLogin" htmlFor="loginPassword">
              Password:
            </label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
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
            Login
          </button>
        </form>
      </>

      <p className="account">
        <p>Don&apos;t have an account?</p>
        <Link to="/signup" className="link-decoration">
          <p className="change">Sign up</p>
        </Link>
      </p>
    </div>
  );
};

export default Login;
