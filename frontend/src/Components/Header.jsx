import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";

const Header = () => {
  return (
    <div className="header">
      <NavLink to="/" end>
        {({ isActive }) =>
          isActive ? <Home style={{ color: "black" }} /> : <HomeOutlined />
        }
      </NavLink>

      <NavLink to="/newpost">
        {({ isActive }) =>
          isActive ? <Add style={{ color: "black" }} /> : <AddOutlined />
        }
      </NavLink>

      <NavLink to="/search">
        {({ isActive }) =>
          isActive ? <Search style={{ color: "black" }} /> : <SearchOutlined />
        }
      </NavLink>

      <NavLink to="/account">
        {({ isActive }) =>
          isActive ? (
            <AccountCircle style={{ color: "black" }} />
          ) : (
            <AccountCircleOutlined />
          )
        }
      </NavLink>
    </div>
  );
};

export default Header;
