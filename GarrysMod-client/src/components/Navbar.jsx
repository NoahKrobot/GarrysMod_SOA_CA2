import React from "react";

export default function Navbar({ user, logout, myItems, home, addItem }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#222",
        color: "white",
      }}
    >
      <span>Welcome, {user.username}!</span>

      <button
        onClick={home}
        style={{
          backgroundColor: "#1d2c8fff",
          color: "white",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Home
      </button>

      <button
        onClick={myItems}
        style={{
          backgroundColor: "#1d2c8fff",
          color: "white",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        My Items
      </button>

      <button
        onClick={addItem}
        style={{
          backgroundColor: "#1d2c8fff",
          color: "white",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Add Item
      </button>

      <button
        onClick={logout}
        style={{
          backgroundColor: "#555",
          color: "white",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Logout
      </button>
    </nav>
  );
}
