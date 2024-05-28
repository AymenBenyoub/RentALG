import { useState, useContext , useRef} from "react";
import { Link } from "react-router-dom";
import "../styles/login-signup.css";
import { UserContext } from "../context/UserContext";
import logo from "../assets/logo-transparent-png.png";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

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
      const id = responseData.userId;
      localStorage.setItem("jwtToken", token);
      login({ ...user, id, token });

      console.log("Login successful");

      window.location.replace("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    
    <div className="form-page-background"> 
    <Link to="/" className="link-decoration"  style={{
        
        width: "250px",
        heigh: "60px",
        position: "relative",
        top:"30px",
      }} >
      <div className="logo">
    <img
      src={logo}
      alt="RentALG"
      style={{
        display:"block",
        width: "250px",
        heigh: "60px",
        
      }}
    />
  </div>
  </Link>
      <div className="centered-container" >
      
        <>
          <h2>Login</h2>

          <form onSubmit={handleLoginSubmit}>
            <div>
              <label className="emailLogin" htmlFor="loginEmail">
                Email:
              </label>
              <div className="named-input">
                <input
                type="email"
                id="loginEmail"
                name="email"
                className="name-input"
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                  setError("");
                }}
                required
              />
              <IoMailOutline />
              </div>
            </div>
            
            <div>
              <label className="pwdLogin" htmlFor="loginPassword">
                Password:
              </label>
              <div className="named-input">
              <input
                type="password"
                id="loginPassword"
                name="password"
                className="name-input"
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  setError("");
                }}
                required
              />
              <RiLockPasswordLine />
              </div>
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
