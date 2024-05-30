import { useState, useEffect, useRef } from "react";
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";

function UserList() {
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupRole, setSignupRole] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhoneNumber, setSignupPhoneNumber] = useState("");

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
          role: signupRole,
        }),
      });

      if (!response.ok) {
        throw new Error("Signup request failed");
      }
      // const responseData = await response.json();
      // const token = responseData.token;
      // const uid = responseData.userId;
      // localStorage.setItem("jwtToken", token);
      // login({ ...user, uid, token });
      // window.location.replace("/");
      console.log("Signup successful!");
    } catch (error) {
      console.error("Signup error:", error);
    }

    setSignupFirstName("");
    setSignupLastName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupPhoneNumber("");
    setSignupRole("");
  };

  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showMenu, setShowMenu] = useState(false); // Add state for showing/hiding menu
  const navigate = useNavigate();
  const menuRef = useRef(null); // Reference to the menu element

  useEffect(() => {
    // Add event listener to detect clicks outside of the menu
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    // Fetch users from backend
    fetch("http://localhost:3000/api/users") // Assuming this is your backend endpoint
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const banUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/ban/${id}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) throw new Error("Couldn't ban user: Network error");
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, is_banned: true } : user
        )
      );
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const unbanUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/unban/${id}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) throw new Error("Couldn't unban user: Network error");
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, is_banned: false } : user
        )
      );
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortConfig.key && a[sortConfig.key] && b[sortConfig.key]) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });
  const handleBan = (id) => {
    if (confirm("Are you sure you want to ban this user?")) {
      banUser(id);
    }
  };
  const handleUnban = (id) => {
    if (confirm("Are you sure you want to unban this user?")) {
      unbanUser(id);
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside of the menu
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div>
      <AdminHeader />
      <div className="the-Stats">
        <Link className="link-decoration" to="/AdminStats">
          <div className="users-statsA">USERS </div>{" "}
        </Link>
        <Link className="link-decoration" to="/AccommodationsStats">
          <div className="accommodations-Stats">ACCOMMODATIONS </div>{" "}
        </Link>
        <Link className="link-decoration" to="/reports">
          <div className="users-stats">REPORTS </div>{" "}
        </Link>
      </div>
      <div className="stats">
        <div className="statsheader">
          <div className="statsSearch">
            <div className="user-input">
              <input
                type="text"
                placeholder="Search By First Name . . . "
                value={searchTerm}
                onChange={handleInputChange}
              />
              <div>
                <ImSearch />
              </div>
            </div>

            <div className="add_user" onClick={() => setShowMenu(!showMenu)}>
              Add user
            </div>
            {showMenu && (
              <div ref={menuRef}>
                <div>
                  <div className="l">
                    <form onSubmit={handleSignupSubmit}>
                      <div className="l1">
                        <div>
                          <p>First Name:</p>

                          <input
                            type="text"
                            id="signupFirstName"
                            value={signupFirstName}
                            onChange={(e) => setSignupFirstName(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <p>Last Name:</p>

                          <input
                            type="text"
                            id="signupLastName"
                            value={signupLastName}
                            onChange={(e) => setSignupLastName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="l1">
                        <div>
                          <p>Email:</p>

                          <input
                            type="email"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <p>Password:</p>

                          <input
                            type="password"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="l1">
                        <div>
                          <p>Phone Number:</p>

                          <input
                            type="tel"
                            value={signupPhoneNumber}
                            onChange={(e) =>
                              setSignupPhoneNumber(e.target.value)
                            }
                            required
                          />
                        </div>
                        <div>
                          <p>Role:</p>

                          <div className="roles" ref={menuRef}>
                            <select name="pays_naissance">
                              <option
                                value="user"
                                onClick={(e) => setSignupRole(e.target.value)}
                              >
                                User
                              </option>
                              <option
                                value="admin"
                                onClick={(e) => setSignupRole(e.target.value)}
                              >
                                Admin
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        style={{
                          left: "85%",
                          height: "37px",
                          padding: "0px",
                          margin: "0px",
                        }}
                        className="add_user"
                      >
                        Add user
                      </button>
                      <button
                        type="button"
                        style={{
                          left: "62%",
                          height: "37px",
                          padding: "0px",
                          margin: "0px",
                          backgroundColor: "#eff8f8",
                          color: "#56565e",
                          border: " #a9b8b8",
                        }}
                        className="add_user"
                        onClick={() => {
                          setShowMenu(!showMenu);
                        }}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="userstats">
            <div className="emailstats" onClick={() => handleSort("email")}>
              Email{" "}
              {sortConfig.key === "email" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </div>
            <div
              className="otherstats"
              onClick={() => handleSort("first_name")}
            >
              First Name{" "}
              {sortConfig.key === "first_name" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </div>
            <div className="otherstats" onClick={() => handleSort("last_name")}>
              Last Name{" "}
              {sortConfig.key === "last_name" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </div>
            <div className="otherstats" onClick={() => handleSort("role")}>
              Role{" "}
              {sortConfig.key === "role" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </div>
            <div className="idstats" onClick={() => handleSort("id")}>
              ID{" "}
              {sortConfig.key === "id" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </div>
            <div className="idstats" onClick={() => handleSort("is_banned")}>
              Ban{" "}
              {sortConfig.key === "is_banned" &&
                (sortConfig.direction === "ascending" ? "▲" : "▼")}
            </div>
          </div>
        </div>

        {sortedUsers.map((user) => (
          <div key={user.id} className="userstats">
            <div
              className="profileclick"
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              <div title={user.email} className="emailstats">
                {user.email}
              </div>
              <div title={user.first_name} className="otherstats">
                {user.first_name}
              </div>
              <div title={user.last_name} className="otherstats">
                {user.last_name}
              </div>
              <div title={user.role} className="otherstats">
                {user.role}
              </div>
              <div title={user.id} className="idstats">
                {user.id}
              </div>
            </div>
            <div className="idstats">
              {user.is_banned ? (
                <button
                  className="admin_unban"
                  onClick={() => handleUnban(user.id)}
                >
                  UNBAN
                </button>
              ) : (
                <button
                  className="admin_ban"
                  onClick={() => handleBan(user.id)}
                >
                  BAN
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default UserList;
