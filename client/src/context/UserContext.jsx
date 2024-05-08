/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch user data");
        return;
      }

      const userData = await response.json();
      setUser({ ...userData, token });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const login = (newUser) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwtToken");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
