import React, { useState, useEffect } from "react";
const { ipcRenderer } = require("electron");
import "../styles/formPages.css";
import Navbar from "./Navbar.jsx";

export default function AddCategory({ user, logout, goHome }) {
  console.log("user: ", user);

  let [message, setMessage] = useState("");

  let [catName, setcatName] = useState("");
  let [catPopMeter, setcatPopMeter] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    let catObject = {
      name: catName,
      popularityMeter: 5,
    };

    console.log("item to be POST: ", catObject);

    ipcRenderer
      .invoke("post-category", catObject)
      .then((res) => {
        if (res && res.error) {
          setMessage("Item NOT created successfully.");
        }

        setMessage("Item created successfully.");

        setTimeout(() => {
          goHome();
        }, 1500);
      })
      .catch((err) => {
        setMessage("Error: " + String(err));
      });
  };

  return (
    <div className="page_addItem">

      <div className="card_addItem">
        <div className="header_addItem">
          <h1>Add Workshop Item Category </h1>
          <p className="header_subtitle">
            Create a new Garry's Mod item category.
          </p>
        </div>

        {message && <div className="card_message">{message}</div>}

        <form onSubmit={handleSubmit} className="form_container">
          <div className="form_row">
            <label htmlFor="title">Name</label>
            <input
              id="title"
              type="text"
              value={catName}
              onChange={(e) => setcatName(e.target.value)}
              required
            />
          </div>

          <div className="form_actions">
            <button type="submit" className="form_btn form_btnPrimary">
              Publish Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
