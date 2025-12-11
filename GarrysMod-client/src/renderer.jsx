import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Auth from "./components/Auth.jsx";
import Workshop from "./components/Workshop.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  let handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <>
      {!user ? (
        <Auth onLoginSuccess={(user) => setUser(user)} />
      ) : (
        <Workshop user={user} logout={handleLogout} />
      )}
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
