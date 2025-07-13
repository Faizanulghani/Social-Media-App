import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";

// Dummy Components (Just for now, jab tak asli components nahi hain)
const Home = () => <h1>Home Page</h1>;
const Login = () => <h1>Login Page</h1>;
const Register = () => <h1>Register Page</h1>;
const ForgotPassword = () => <h1>Forgot Password Page</h1>;
const ResetPassword = () => <h1>Reset Password Page</h1>;
const Search = () => <h1>Search Page</h1>;
const NotFound = () => <h1>Not found</h1>;

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
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
