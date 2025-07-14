import "./Login.css";
import { Typography, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../Actions/User";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassoword] = useState("");
  let dispatch = useDispatch();

  let loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassoword(e.target.value)}
          required
        />

        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>

        <Button type="submit">Login</Button>

        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
