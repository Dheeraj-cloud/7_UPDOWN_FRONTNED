// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import RequireLogin from "./Guards/RequireLogin";
import Game from "./components/Game/Game";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useDispatch } from "react-redux";
import { login } from "./slices/authSlice";
import Loader from "./components/Loader/Loader";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      dispatch(login());
    }
    setLoading(false);
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/game"
            element={
              <RequireLogin>
                <Game />
              </RequireLogin>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
