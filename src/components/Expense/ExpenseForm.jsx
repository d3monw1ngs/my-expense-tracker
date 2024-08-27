import React from 'react';
import arrowUp from '../../images/Arrow 15.svg';
import css from './ExpenseForm.module.css';
import { ExpenseTable } from 'components/TableForm/ExpenseTable';

export const ExpenseForm = ({ totalIncome = 0, totalExpense = 0, transactions = [] }) => {
  return (
    <div>
        <div className={css.headingContainer}>
                <div className={css.textWrapper}>
                    <p className={css.expHeading}>All Expense</p>
                    <p className={css.expText}>
                        View and manage every transaction seamleassly! Your entire financial
                        landscape, all in one place.
                    </p>
                </div>
                <div className={css.inExWrapper}>
                    <div className={css.iconWrapper}>
                        <div className={css.arrowUp}>
                            <img src={arrowUp} alt="arrow up"  />
                        </div>
                        <div className={css.inDetails}>
                            <p className={css.inTitle}>Total Income</p>
                            <p className={css.inAmount}>${totalIncome.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className={css.iconWrapper}>
                        <div className={css.arrowDown}>
                            <img src={arrowUp} alt="arrow down" />
                        </div>
                        <div className={css.exDetails}>
                            <p className={css.exTitle}>Total Expense</p>
                            <p className={css.exAmount}>${totalExpense.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <ExpenseTable transactions={transactions} />
        </div>
  );
};
