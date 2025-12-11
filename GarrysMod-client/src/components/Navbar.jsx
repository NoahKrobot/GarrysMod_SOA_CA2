import React from "react";
import "../styles/navbar.css";
import AddCategory from "./AddCategory";
export default function Navbar({
  user,
  logout,
  myItems,
  home,
  addItem,
  addMap,
  addCategory,
}) {
  return (
    <nav className="nav_container">
      <div className="nav_left">
        <p className="nav_welcome">Welcome, {user.username}!</p>
      </div>
      <div className="nav_buttons">
        <button onClick={home} className="nav_btn nav_btnPrimary">
          Home
        </button>

        <button onClick={myItems} className="nav_btn nav_btnPrimary">
          My Items
        </button>

        {user.isAdmin && (
          <>
            <button onClick={addItem} className="nav_btn nav_btnPrimary">
              Add Item
            </button>

            <button onClick={addMap} className="nav_btn nav_btnPrimary">
              Add Map
            </button>
          </>
        )}
        <button onClick={addCategory} className="nav_btn nav_btnPrimary">
          Add Category
        </button>

        <button onClick={logout} className="nav_btn nav_btnSecondary">
          Logout
        </button>
      </div>
    </nav>
  );
}
