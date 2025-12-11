import React, { useState, useEffect } from "react";
const { ipcRenderer } = require("electron");
import "../styles/formPages.css";
import Navbar from "./Navbar.jsx";

export default function AddMap({ user, logout, goHome }) {
  console.log("user: ", user);

  let [message, setMessage] = useState("");

  let [mapName, setmapName] = useState("");
  let [mapDesc, setmapDesc] = useState("");
  let [mapSize, setmapSize] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    let mapObject = {
      name: mapName,
      description: mapDesc,
      sizeInMB: mapSize,
    };

    console.log("item to be POST: ", mapObject);

    ipcRenderer
      .invoke("post-map", mapObject)
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
      {/* <Navbar user={user} logout={logout} /> */}

      <div className="card_addItem">
        <div className="header_addItem">
          <h1>Add Workshop Map Item</h1>
          <p className="header_subtitle">
            Create a new Garry's Mod map addon for your collection.
          </p>
        </div>

        {message && <div className="card_message">{message}</div>}

        <form onSubmit={handleSubmit} className="form_container">
          <div className="form_row">
            <label htmlFor="title">Name</label>
            <input
              id="title"
              type="text"
              value={mapName}
              onChange={(e) => setmapName(e.target.value)}
              required
            />
          </div>

          <div className="form_row">
            <label htmlFor="description">DESCRIPTION</label>
            <textarea
              id="description"
              value={mapDesc}
              onChange={(e) => setmapDesc(e.target.value)}
              rows={5}
            />
          </div>

          <div className="form_row">
            <label htmlFor="title">Size In MB</label>
            <input
              id="title"
              type="number"
              value={mapSize}
              onChange={(e) => setmapSize(e.target.value)}
              required
            />
          </div>

          <div className="form_actions">
            <button type="submit" className="form_btn form_btnPrimary">
              Publish Map
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
