import { alpha, Box, IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import { Close } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Seach from 'components/Search/Search';
import { cartItemCountSelector } from 'features/Cart/Selectors';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import './styles.scss';
import Login from 'features/User/login';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Register from 'features/User/register';
import { logOut } from 'features/User/authSlice';

Header.propTypes = {};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: '1',
  },
  avatar: {
    color: '#fff',
  },
}));

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

function Header(props) {
  const [showMenu, setShowMenu] = useState(false);
  const cartCount = useSelector(cartItemCountSelector);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const loginUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loginUser.id;
  console.log(isLoggedIn);
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const params = queryString.parse(location.search);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClickUser = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    const action = logOut();
    dispatch(action);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);

      // console.log(window.scrollY);
    });
  }, []);

  return (
    <header className={scrollPosition > 50 ? 'header stick' : 'header'}>
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
            {isLoggedIn && (
              <IconButton className={classes.avatar} onClick={handleClickUser}>
                <AccountCircleIcon />
              </IconButton>
            )}
            {!isLoggedIn && (
              <>
                <a
                  className="header__nav-item"
                  onClick={() => {
                    setMode(MODE.LOGIN);
                    handleClickOpen();
                  }}
                >
                  Login
                </a>
                <a
                  className="header__nav-item"
                  onClick={() => {
                    setMode(MODE.REGISTER);
                    handleClickOpen();
                  }}
                >
                  register
                </a>
              </>
            )}

            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={cartCount} color="secondary" overlap="rectangular">
                <ShoppingCartIcon onClick={handleClickCart} />
              </Badge>
            </IconButton>
          </div>
        </div>
        <Dialog
          open={open}
          // disableEscapeKeyDown
          // disableBackdropClick
          onClose={(event, reason) => {
            if (reason === 'backdropClick') {
              return false;
            }

            if (reason === 'escapeKeyDown') {
              return false;
            }

            handleClose();
          }}
          aria-labelledby="draggable-dialog-title"
        >
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <Close fontSize="large" />
          </IconButton>

          <DialogContent>
            {mode === MODE.LOGIN ? (
              <>
                <Login onSubmit={handleClose} />
                <Box>
                  <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                    Dont have account. Register here
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Register />
                <Box>
                  <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                    Already have an account. login here
                  </Button>
                </Box>
              </>
            )}
          </DialogContent>
        </Dialog>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
          <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
}

export default Header;
