import React, { useState, useEffect } from "react";
const { ipcRenderer } = require("electron");

import Navbar from "./Navbar.jsx";

export default function AddItem({ user, logout, goHome }) {
  console.log("user: ", user);

  let [message, setMessage] = useState("");
  let [maps, setMaps] = useState([]);
  let [creators, setCreators] = useState([]);

  let [garrysItems, setGarrysItems] = useState([]);
  let [categories, setCategories] = useState([]);

  let [itemTitle, setitemTitle] = useState("");
  let [itemDesc, setitemDesc] = useState("");
  let [itemMapId, setitemMapId] = useState("");
  let [itemCategoryId, setitemCategoryId] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let garrysItemObject = {
      title: itemTitle,
      description: itemDesc,
      creatorID: Number(user.id),
      mapID: Number(itemMapId),
      categoryID: Number(itemCategoryId),
    };

    console.log("item to be POST: ", garrysItemObject);

    ipcRenderer
      .invoke("post-garrysItem", garrysItemObject)
      .then((res) => {
        if (res && res.error) {
          setMessage("Item NOT created successfully.");
        }

        setMessage("Item created successfully.");
        goHome();
      })
      .catch((err) => {
        setMessage("Error: " + String(err));
      });
  };

  return (
    <div>
      <h1>AddItem</h1>
      <p>{message}</p>

      <button></button>

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={itemTitle}
            onChange={(e) => setitemTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={itemDesc}
            onChange={(e) => setitemDesc(e.target.value)}
            rows={4}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Creator ID</label>
          <div>{user.id ?? "Unknown"}</div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="map">Map</label>
          <select
            id="map"
            value={itemMapId}
            onChange={(e) => setitemMapId(e.target.value)}
            required
          >
            <option value="">Select a map...</option>
            {maps.map((map) => (
              <option key={map.id} value={map.id}>
                {map.name ?? `Map ${map.id}`}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={itemCategoryId}
            onChange={(e) => setitemCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name ?? `Category ${category.id}`}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Garry&apos;s Item</button>
      </form>
    </div>
  );
}
