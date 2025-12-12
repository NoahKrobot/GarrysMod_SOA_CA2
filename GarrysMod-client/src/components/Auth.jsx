import React, { useState, useEffect } from "react";
const { ipcRenderer } = require("electron");

import "../styles/auth.css";

export default function Auth({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageSignUp, setmessageSignUp] = useState("");
  const [loading, setLoading] = useState(false);

  const [signUpUsername, setsignUpUsername] = useState("");
  const [signUpPassFirst, setsignUpPassFirst] = useState("");
  const [signUpPassSecond, setsignUpPassSecond] = useState("");

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
          // setMessage("Login passed.");
          console.log("Login succeeded, user =", res.user);
          onLoginSuccess(res.user);
        } else {
          setMessage("Login failed.");
        }
      })
      .catch((err) => {
        setMessage("Error: " + String(err));
      })
      .finally(() => setLoading(false));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setmessageSignUp("");

    if (signUpPassFirst !== signUpPassSecond) {
      setmessageSignUp("Passwords do not match.");
      return;
    }

    setLoading(true);

    const creatorObject = {
      username: signUpUsername,
      password: signUpPassFirst,
      isAdmin: false,
    };

    console.log("creator to be POST: ", creatorObject);

    ipcRenderer
      .invoke("post-creator", creatorObject)
      .then((res) => {
        console.log("signup response:", res);

        if (!res || res.error) {
          setmessageSignUp("Account NOT created successfully.");
          return;
        }

        sessionStorage.setItem("user", JSON.stringify(res));
        // setMessage("Creating Account passed.");
        console.log("Creating Account succeeded, user =", res);
        onLoginSuccess(res);
      })
      .catch((err) => {
        setMessage("Error: " + String(err));
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth_page">
      <div className="auth_card">
        <div className="auth_header">
          <h1>Login</h1>
          <p className="auth_headerSubtitle">
            Sign in to manage your Garry's Mod addons.
          </p>
        </div>

        {message && <div className="auth_message">{message}</div>}

        <form onSubmit={handleSubmit} className="auth_formContainer">
          <div className="auth_formRow">
            <label htmlFor="login-username">USERNAME</label>
            <input
              id="login-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="auth_formRow">
            <label htmlFor="login-password">PASSWORD</label>
            <input
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              type="password"
              required

            />
          </div>

          <div className="auth_formActions">
            <button
              type="submit"
              disabled={loading}
              className="auth_formBtn auth_formBtnPrimary"

            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>

      <div className="auth_breaker">
        <div className="auth_header">
          <form className="auth_formContainer">
            <p className="auth_headerSubtitle">or create an account instead</p>
          </form>
        </div>
      </div>

      <div className="auth_card">
        <div className="auth_header">
          <h1>Create an account</h1>
          <p className="auth_headerSubtitle">
            Create an account to manage your Garry's Mod addons.
          </p>
        </div>

        {messageSignUp && <div className="auth_message">{messageSignUp}</div>}

        <form onSubmit={handleSignUp} className="auth_formContainer">
          <div className="auth_formRow">
            <label htmlFor="login-username">USERNAME</label>
            <input
              id="login-username"
              value={signUpUsername}
              onChange={(e) => setsignUpUsername(e.target.value)}
              placeholder="Enter username"
              required

            />
          </div>

          <div className="auth_formRow">
            <label htmlFor="login-password">PASSWORD</label>
            <input
              id="login-password"
              value={signUpPassFirst}
              onChange={(e) => setsignUpPassFirst(e.target.value)}
              placeholder="Enter password"
              type="password"
              required

            />
          </div>

          <div className="auth_formRow">
            <label htmlFor="login-password">CONFIRM PASSWORD</label>
            <input
              id="login-password"
              value={signUpPassSecond}
              onChange={(e) => setsignUpPassSecond(e.target.value)}
              placeholder="Enter password"
              type="password"
              required

            />
          </div>

          <div className="auth_formActions">
            <button
              type="submit"
              disabled={loading}
              className="auth_formBtn auth_formBtnPrimary"
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
