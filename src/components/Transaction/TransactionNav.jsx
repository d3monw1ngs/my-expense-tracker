import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './TransactionNav.module.css';
import logo from '../../images/Icon.png';
import { UserNav } from 'components/NavBar/UserNav';

export const TransactionNav = () => {
  const navigate = useNavigate();

  // Navigate to the Expense Page
  const handleNavigateToExpense = () => {
    navigate('/ExpensePage');
  };

  const handleNavigateToIncome = () => {
    navigate('/IncomePage');
  };

  const handleNavigateToTransactonForm = () => {
    navigate('/transactionForm');
  };


  return (
    <div className={css.transNavContainer}>
        <nav className={css.navbar}>
            <div onClick={handleNavigateToTransactonForm} className={css.navLink}>
                <img src={logo} alt="Logo" className={css.logo} />
                <h1 className={css.title}>EXPENSETRACKER</h1>
            </div>
            <div className={css.navBtnContainer}>
                <button className={css.navBtn} onClick={handleNavigateToExpense}>
                    All Expense                
                </button>
                <button className={css.navBtn} onClick={handleNavigateToIncome}>
                    All Income
                </button>
            </div>
            <UserNav />
        </nav>
    </div>
  );
};
