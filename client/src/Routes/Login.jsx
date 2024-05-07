import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login-signup.css";
import { UserContext } from "../context/UserContext";
const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, user } = useContext(UserContext);
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
        setError(data.error);
        return;
      }
      const responseData = await response.json();
      const token = responseData.token;
      const uid = responseData.userId;
      localStorage.setItem("jwtToken", token);
      login({ ...user, uid, token });

      console.log("Login successful");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form-page-background">
      <div className="centered-container">
        <>
          <h2 style={{ marginTop: "0px", textAlign: "center" }}>Login</h2>

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
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                  setError("");
                }}
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
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  setError("");
                }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "var(--primary-color",
                border: "none",
                borderRadius: "5px",
                height: "40px",
              }}
            >
              Login
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </>

        <p className="account">
          <p>Don&apos;t have an account?</p>
          <Link to="/signup" className="link-decoration">
            <p className="change">Sign up</p>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
