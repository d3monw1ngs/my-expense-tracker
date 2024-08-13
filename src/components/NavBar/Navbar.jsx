import React from 'react';
import { Link } from 'react-router-dom';
import css from './Navbar.module.css';
import logo from '../../images/Icon.png';

export const Navbar = () => {
  return (
    <nav className={css.navbar}>
      <Link to="/" className={css.navLink}>
        <img src={logo} alt="Logo" className={css.logo} />
        <h1 className={css.title}>EXPENSETRACKER</h1>
      </Link>
    </nav>
  )
}
