import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import style from './Header.less';

const Header = (props) => {
  const { isLoggedIn, menuOpen, onMenuOpen } = props;
  let signActions = '';

  if (isLoggedIn) {
    signActions = (
      <Fragment>
        <li>
          <Link to="/logout">Sign out</Link>
        </li>
        <li>
          <Link to="/favs">My photos</Link>
        </li>
      </Fragment>
    );
  } else {
    signActions = (
      <Fragment>
        <li>
          <Link to="/login">Sign in</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
      </Fragment>
    );
  }

  const menuClasses = [style.hamburger, style.hamburgerSqueeze];
  const navClasses = [style.mobileNav];
  if (menuOpen) {
    menuClasses.push(style.isActive);
    navClasses.push(style.navOpen);
  }

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sections">Browse sections</Link>
          </li>
          {signActions}
        </ul>
      </nav>
      <nav className={`${navClasses.join(' ')}`}>
        <button onClick={onMenuOpen} className={`${menuClasses.join(' ')}`} type="button">
          <span className={style.hamburgerBox}>
            <span className={style.hamburgerInner} />
          </span>
        </button>
        {
          menuOpen && (
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/sections">Browse sections</Link>
              </li>
              {signActions}
            </ul>
          )
        }
      </nav>
    </header>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
  isLoggedIn: false,
};

export default Header;
