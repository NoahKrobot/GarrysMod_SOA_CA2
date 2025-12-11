import React, { useState, useEffect } from "react";
const { ipcRenderer } = require("electron");

import Navbar from "./Navbar.jsx";


export default function Workshop({ user, logout }) {
  console.log("user: ", user);

  let [message, setMessage] = useState("");
  let [maps, setMaps] = useState([])
  let [garrysItems, setGarrysItems] = useState([])
  let [categories, setCategories] = useState([])
  let [creators, setCreators] = useState([])

  useEffect(() => {
    try {
      ipcRenderer.invoke("fetch-addons").then((data) => {
        if (data.error) {
          console.error("Fetch error:", data.error);
        } else {
          console.log("Fetched data:", data);
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
          console.log("Fetched data:", data);
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
          console.log("Fetched data:", data);
          setCategories(data);
        }
      });
    } catch (e) {
            setMessage(String(e));

    }

     try {
      ipcRenderer.invoke("fetch-creators").then((data) => {
        if (data.error) {
          console.error("Fetch error:", data.error);
        } else {
          console.log("Fetched data:", data);
          setCreators(data);
        }
      });
    } catch (e) {
            setMessage(String(e));

    }
  }, []);

  return (
    <div>
      <Navbar user={user} logout={logout} />
      <h1>Workshop Page</h1>
      <p>{message}</p>
    </div>
  );
}
