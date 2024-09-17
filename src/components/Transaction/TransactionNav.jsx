import React from 'react';
import { Link } from 'react-router-dom';
import css from './TransactionNav.module.css';
import logo from '../../images/Icon.png';
import { UserNav } from 'components/NavBar/UserNav';

export const TransactionNav = () => {
  return (
    <div className={css.transNavContainer}>
        <nav className={css.navbar}>
            <Link to="/" className={css.navLink}>
                <img src={logo} alt="Logo" className={css.logo} />
                <h1 className={css.title}>EXPENSETRACKER</h1>
            </Link>
            <div className={css.navBtnContainer}>
                <Link to="/expense" className={css.btnLink}>
                  <button className={css.navBtn}>
                    All Expense                
                  </button>
                </Link>
                <Link to="/income" className={css.btnLink}>
                  <button className={css.navBtn}>
                    All Income
                  </button>
                </Link>
            </div>
            <UserNav />
        </nav>
    </div>
  );
};
