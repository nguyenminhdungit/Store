import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, NavLink } from 'react-router-dom';

Header.propTypes = {};

function Header(props) {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <header className="header">
      <div className="container">
        <div className="row  align-item-center header__row">
          <div
            className={showMenu ? 'header__overlay active' : 'header__overlay'}
            onClick={handleShowMenu}
          />
          <div className="header__logo">
            <Link to="/home">
              <i className="fa-solid fa-store"></i>
            </Link>
          </div>
          <div className="header__seach">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input className="inputbtn" type="text" placeholder="seach product" />
              <button className="btn header__btn" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
          <div
            className={showMenu ? 'btn header__menu active' : 'btn header__menu '}
            onClick={handleShowMenu}
          >
            <span />
          </div>
          <nav className={showMenu ? `header__nav active` : `header__nav`}>
            <ul className="row justify-content-between align-item-center">
              <li>
                <NavLink className="header__nav-item" to="/home">
                  home
                </NavLink>
              </li>
              <li>
                <NavLink className="header__nav-item" to="/product">
                  product
                </NavLink>
              </li>
              <li>
                <NavLink className="header__nav-item" to="/about">
                  about
                </NavLink>
              </li>
              <li>
                <NavLink className="header__nav-item" to="/team">
                  team
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="header__login">
            <a className="header__nav-item" href="#contact">
              Login
            </a>
            <a className="header__nav-item" href="#contact">
              register
            </a>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary" overlap="rectangular">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
