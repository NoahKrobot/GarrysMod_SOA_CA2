import React, { useState, useEffect } from "react";
const { ipcRenderer } = require("electron");
import "../styles/formPages.css";
import Navbar from "./Navbar.jsx";

export default function ModifyCreators({ user, logout, goHome }) {
  console.log("user: ", user);

  let [message, setMessage] = useState("");
  let [error, setError] = useState("");
  let [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const data = await ipcRenderer.invoke("fetch-data");

        console.log("Fetched creators:", data);
        setCreators(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(`Error loading creators: ${String(err)}`);
      }
    };

    fetchCreators();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the creator?`
    );
    if (!confirmDelete) return;

    setMessage("");

    ipcRenderer
      .invoke("delete-creator", id)
      .then((res) => {
        if (res && res.error) {
          setMessage("Creator NOT deleted.");
        }

        setMessage("Creator deleted.");
        setCreators((prev) => prev.filter((creator) => creator.id !== id));
        // setTimeout(() => {
        //   goHome();
        // }, 1500);
      })
      .catch((err) => {
        setError("Error: " + String(err));
      });
  };

  const handleToggleAdmin = (creator) => {
    const updated = {
      ...creator,
      isAdmin: !creator.isAdmin,
    };

    setMessage("");
    setError("");

    // console.log("Updating creator:", updated);

    ipcRenderer
      .invoke("toggle-creator-admin-state", updated)
      .then((res) => {
        if (res && res.error) {
          //   console.error("Failed to update creator:", res.message);
          setError("Failed to update creator admin status.");
          return;
        }

        setCreators((prev) =>
          prev.map((c) =>
            c.id === creator.id ? { ...c, isAdmin: updated.isAdmin } : c
          )
        );

        setMessage(
          `${creator.username} is now ${updated.isAdmin ? "an admin" : "not an admin"}.`
        );
      })
      .catch((err) => {
        console.error("Error updating creator:", err);
        setError("Error: " + String(err));
      });
  };

  const renderedCreators = (() => {
    const rows = [];

    creators.forEach((creator) => {
      if (creator.id === user.id) return;
      rows.push(
        <div key={creator.id} className="creator_row">
          <div className="creator_info">
            <div>
              <strong>{creator.username || "(no username)"}</strong>
            </div>
            <div>ID: {creator.id}</div>
            <div>Admin: {creator.isAdmin ? "Yes" : "No"}</div>
          </div>
          <div className="form_actions">
            <button
              className="form_btn form_btnPrimary"
              onClick={() => handleToggleAdmin(creator)}
            >
              {creator.isAdmin ? "Remove Admin" : "Make Admin"}
            </button>

            <button
              className="form_btn form_btnDanger"
              onClick={() => handleDelete(creator.id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });

    return rows;
  })();

  return (
    <div className="page_addItem">
      <div className="card_addItem">
        <div className="header_addItem">
          <h1>Modify Creators</h1>
          <p className="header_subtitle">
            Create a new Garry's Mod item category.
          </p>

          {message && <div className="better_message">{message}</div>}
          {error && <div className="error_message">{error}</div>}

          <div>
            {creators.length === 0 ? <p>No items loaded.</p> : renderedCreators}
          </div>
        </div>
      </div>
    </div>
  );
}
