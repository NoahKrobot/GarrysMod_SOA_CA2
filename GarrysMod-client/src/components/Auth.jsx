import React, { useState, useEffect } from "react";
const { ipcRenderer } = require("electron");

export default function Auth({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    ipcRenderer.invoke("fetch-data").then((data) => {
      if (data.error) {
        console.error("Fetch error:", data.error);
      } else {
        console.log("Fetched data:", data);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    ipcRenderer
      .invoke("login", { username, password })
      .then((res) => {
        if (res.success) {

          sessionStorage.setItem("user", JSON.stringify(res.user));
          setMessage("Login passed.");
          console.log("Login succeeded, user =", res.user);
          onLoginSuccess(res.user);
        } else {
          setMessage( "Login failed.");
        }
      })
      .catch((err) => {
        setMessage("Error: " + String(err));
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button type="submit" disabled={loading}>
        Login
      </button>

      <p>{message}</p>
    </form>
  );
}
