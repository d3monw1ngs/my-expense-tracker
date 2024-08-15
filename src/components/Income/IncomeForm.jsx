import { TransactionNav } from 'components/Transaction/TransactionNav';
import React from 'react';
import css from './IncomeForm.module.css';
import arrowUp from '../../images/Arrow 15.svg';
import { IncomeTable } from 'components/TableForm/IncomeTable';

export const IncomeForm = () => {
  return (
    <div>
        <TransactionNav />
        <div>
            <div className={css.headingContainer}>
                <div className={css.textWrapper}>
                    <p className={css.expHeading}>All Income</p>
                    <p className={css.expText}>Track and celebrate every bit of earnings effortlessly!
                        Gain insights into your total revenue in a snap.
                    </p>
                </div>
                <div className={css.inExWrapper}>
                    <div className={css.iconWrapper}>
                        <div className={css.arrowUp}>
                            <img src={arrowUp} alt="arrow up"  />
                        </div>
                        <div className={css.inDetails}>
                            <p className={css.inTitle}>Total Income</p>
                            <p className={css.inAmount}>$909.00</p>
                        </div>
                    </div>
                    <div className={css.iconWrapper}>
                        <div className={css.arrowDown}>
                            <img src={arrowUp} alt="arrow down" />
                        </div>
                        <div className={css.exDetails}>
                            <p className={css.exTitle}>Total Expense</p>
                            <p className={css.exAmount}>$259.00</p>
                        </div>
                    </div>
                </div>
            </div>
            <IncomeTable />
        </div>
    </div>
  )
}
