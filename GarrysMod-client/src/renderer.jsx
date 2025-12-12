import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Auth from "./components/Auth.jsx";
import Workshop from "./components/Workshop.jsx";
import Navbar from "./components/Navbar.jsx";
import MyItems from "./components/MyItems.jsx";
import AddItem from "./components/AddItem.jsx";
import AddMap from "./components/AddMap.jsx";
import AddCategory from "./components/AddCategory.jsx";
import ModifyCreators from "./components/ModifyCreators.jsx";

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("home");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  let handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <>
      {!user ? (
        <Auth onLoginSuccess={(user) => setUser(user)} />
      ) : (
        <>
          <Navbar
            user={user}
            logout={handleLogout}
            myItems={() => setView("myItems")}
            home={() => setView("home")}
            addItem={() => setView("addItem")}
            addMap={() => setView("addMap")}
            addCategory={() => setView("addCategory")}
            modifyCreators={()=>setView("modifyCreators")}
          />

          {view === "home" && <Workshop user={user} logout={handleLogout} />}
          {view === "myItems" && <MyItems user={user} logout={handleLogout} />}
          {view === "addItem" && <AddItem user={user} logout={handleLogout} goHome={() => setView("home")}/>}
          {view === "addMap" && <AddMap user={user} logout={handleLogout} goHome={() => setView("home")}/>}
          {view === "addCategory" && <AddCategory user={user} logout={handleLogout} goHome={() => setView("home")}/>}
          {view === "modifyCreators" && <ModifyCreators user={user} logout={handleLogout} goHome={() => setView("home")}/>}
        </>
      )}
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
