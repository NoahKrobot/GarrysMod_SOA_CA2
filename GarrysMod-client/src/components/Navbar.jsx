import React from "react";

export default function Navbar({ user, logout }) {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 20px",
      backgroundColor: "#222",
      color: "white"
    }}>
      <span>Welcome, {user.username}!</span>
      <button 
        onClick={logout} 
        style={{
          backgroundColor: "#555",
          color: "white",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "4px"
        }}
      >
        Logout
      </button>
    </nav>
  );
}
