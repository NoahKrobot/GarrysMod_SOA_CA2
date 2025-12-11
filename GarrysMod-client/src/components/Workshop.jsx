import React from "react";
import Navbar from "./Navbar.jsx";

export default function Workshop({ user, logout }) {
    console.log("user: ", user)
  return (
    <div>
      <Navbar user={user} logout={logout} />
      <h1>Workshop Page</h1>
    </div>
  );
}
