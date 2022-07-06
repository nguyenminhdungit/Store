import { IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import './styles.scss';
import Seach from 'components/Search/Search';
import { cartItemCountSelector } from 'features/Cart/Selectors';
import queryString from 'query-string';
import { useSelector } from 'react-redux';

Header.propTypes = {};

function Header(props) {
  const [showMenu, setShowMenu] = useState(false);
  const cartCount = useSelector(cartItemCountSelector);

  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleSearch = ({ search }) => {
    const paramSearch = {
      ...params,
      category: undefined,
      name_contains: search,
    };
    history.push({
      pathname: '/product',
      search: queryString.stringify(paramSearch),
    });
  };

  const handleClickCart = () => {
    history.push({
      pathname: '/cart',
    });
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
          <Seach onSubmit={handleSearch} />
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
              <Badge badgeContent={cartCount} color="secondary" overlap="rectangular">
                <ShoppingCartIcon onClick={handleClickCart} />
              </Badge>
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
