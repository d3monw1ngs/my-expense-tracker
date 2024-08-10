import React from 'react';
import css from './Navbar.module.css';
import logo from '../../images/Icon.png';

export const Navbar = () => {
  return (
    <nav className={css.navbar}>
        <img src={logo} alt="Logo" className={css.logo} />
        <h1 className={css.title}>EXPENSETRACKER</h1>
    </nav>
  )
}
