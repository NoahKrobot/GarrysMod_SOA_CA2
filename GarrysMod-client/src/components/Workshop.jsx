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
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>Description: {item.description || "No description"}</p>
          <p>
            Creator:{" "}
            {creator
              ? (creator.name ?? creator.username ?? `id:${creator.id}`)
              : "Unknown creator"}
          </p>
          <p>
            Map:{" "}
            {map ? (map.name ?? map.title ?? `id:${map.id}`) : "Unknown map"}
          </p>
          <p>
            Category:{" "}
            {category
              ? (category.name ?? category.title ?? `id:${category.id}`)
              : "Unknown category"}
          </p>
          <hr />
        </div>
      );
    });

    return rows;
  })();

  return (
    <div>
      {/* <Navbar user={user} logout={logout} /> */}
      <h1>Workshop Page</h1>
      <p>{message}</p>

      <button></button>

      <div>
        {garrysItems.length === 0 ? <p>No items loaded.</p> : renderedItems}
      </div>
    </div>
  );
}
