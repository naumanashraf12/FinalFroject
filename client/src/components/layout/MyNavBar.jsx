import jwt from "jsonwebtoken";
import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

const MyNavBar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  let user = null;
  if (isLoggedIn) user = jwt.decode(localStorage.getItem("token"));
  console.log(user);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            CarMechanic
            <i class="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {isLoggedIn && (
            <li className="nav-item">
              <Link to="/cart" className="nav-links" onClick={closeMobileMenu}>
                CART
              </Link>
            </li>
             )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Products
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  register
                </Link>
              </li>
            )}
          </ul>
          {isLoggedIn && button && (
            <Button
              buttonStyle="btn--outline"
              onClick={(e) => {
                localStorage.setItem("token", "");
                window.location.href = "/";
              }}
            >
              Logout {user.name}
            </Button>
          )}
        </div>
      </nav>
    </>
  );
};

export default MyNavBar;
