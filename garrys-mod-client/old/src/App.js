// App.js
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Workshop from "./pages/Workshop";

function App() {
  const [user, setUser] = useState(null); // survives SPA navigation

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route
          path="/workshop"
          element={user ? <Workshop user={user} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
