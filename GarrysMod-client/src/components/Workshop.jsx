import React, { useState, useEffect } from "react";
const { ipcRenderer } = require("electron");
import "../styles/formPages.css";

import Navbar from "./Navbar.jsx";

export default function Workshop({ user, logout }) {
  console.log("user: ", user);

  let [message, setMessage] = useState("");
  let [maps, setMaps] = useState([]);
  let [creators, setCreators] = useState([]);

  let [garrysItems, setGarrysItems] = useState([]);
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      ipcRenderer.invoke("fetch-addons").then((data) => {
        if (data.error) {
          console.error("Fetch error:", data.error);
        } else {
          console.log("garrysItems:", data);
          setGarrysItems(data);
        }
      });
    } catch (e) {
      setMessage(String(e));
    }

    try {
      ipcRenderer.invoke("fetch-maps").then((data) => {
        if (data.error) {
          console.error("Fetch error:", data.error);
        } else {
          console.log("maps:", data);
          setMaps(data);
        }
      });
    } catch (e) {
      setMessage(String(e));
    }

    try {
      ipcRenderer.invoke("fetch-categories").then((data) => {
        if (data.error) {
          console.error("Fetch error:", data.error);
        } else {
          console.log("categories:", data);
          setCategories(data);
        }
      });
    } catch (e) {
      setMessage(String(e));
    }

    try {
      ipcRenderer.invoke("fetch-data").then((data) => {
        if (data.error) {
          console.error("Fetch error:", data.error);
        } else {
          console.log("creators:", data);
          setCreators(data);
        }
      });
    } catch (e) {
      setMessage(String(e));
    }
  }, []);

  const renderedItems = (() => {
    const rows = [];

    garrysItems.forEach((item) => {
      const creator = creators.find((cr) => cr.id === item.creatorID);
      const map = maps.find((m) => m.id === item.mapID);
      const category = categories.find((cat) => cat.id === item.categoryID);

      rows.push(
        <div key={item.id} className="card_addOn">
          <div className="addon_header">
            <h3 className="addon_title">{item.title}</h3>
            <span className="addon_category">
              {category ? category.name : "Uncategorized"}
            </span>
          </div>

          <p className="addon_description">
            {item.description || "No description provided for this addon."}
          </p>

          <div className="addon_details">
            <div className="addon_detailsChild">
              <span className="addon_detailsLabel">Creator</span>
              <span>{creator ? creator.username : "Unknown creator"}</span>
            </div>

            <div className="addon_detailsChild">
              <span className="addon_detailsLabel">Map</span>
              <span>{map ? map.name : "Unknown map"}</span>
            </div>
          </div>
        </div>
      );
    });

    return rows;
  })();

  return (
    <div className="page_addItem">
      <div className="card_addItem">
        <header className="header_addItem">
          <h1>Workshop Items</h1>
          <p className="header_subtitle">
            All addons, with details like creator, map and category.
          </p>
        </header>

        {message && <div className="error_message">{message}</div>}

        <div className="form_container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2vh",
              justifyContent: "center",
            }}
          >
            {renderedItems}
          </div>
        </div>
      </div>
    </div>
  );
}
