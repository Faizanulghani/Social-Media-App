import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";

// Dummy Components (Just for now, jab tak asli components nahi hain)
const ForgotPassword = () => <h1>Forgot Password Page</h1>;
const ResetPassword = () => <h1>Reset Password Page</h1>;
const Search = () => <h1>Search Page</h1>;
const NotFound = () => <h1>Not found</h1>;

function App() {
  let { isAuthenticated } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <Router>
      {isAuthenticated && <Header />}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/account" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newpost" element={<Login />} />
        <Route path="/update/profile" element={<Login />} />
        <Route path="/update/password" element={<Login />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/user/:id" element={<Login />} />
        <Route path="search" element={<Search />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
