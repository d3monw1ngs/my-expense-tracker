import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../redux/transaction/transactionsOperators';
import { selectAllTransaction, selectTransactionsStatus, selectTransactionsError } from '../redux/transaction/transactionsSelectors';
import { TransactionNav } from '../components/Transaction/TransactionNav';
import { TransactionForm } from '../components/Transaction/TransactionForm';
import css from './TransactionPage.module.css';
// import { Gauge } from 'components/Gauge/Gauge';
import arrowUp from '../images/Arrow 15.svg';
import { useParams } from 'react-router-dom';

export const TransactionPage = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransaction);
  const status = useSelector(selectTransactionsStatus);
  const error = useSelector(selectTransactionsError);
  const { transactionType } = useParams();

  useEffect(() => {
    if (transactionType) {
      dispatch(fetchTransactions(transactionType));
    }
  }, [dispatch, transactionType]);

   const calculateTotal = (type) => {
    if (!transactions || !Array.isArray(transactions)) return 0;
    return transactions
      .filter(transaction => transaction.type === type)
      .reduce((total, transaction) => total + transaction.amount, 0)
      .toFixed(2);
  };

  const totalIncome = calculateTotal('income');
  const totalExpense = calculateTotal('expense');

   if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
        <TransactionNav />
        <div className={css.transactionContainer}>
          <div className={css.transactionExpWrapper}>
          <div className={css.transExpLog}>
            <h3>Expense Log</h3>
            <p>Capture and organize every penny spent with ease! A clear view of your financial habits
              at your fingertips.
            </p>
          </div>
          <div className={css.inExContainer}>
            <div className={css.incomeDetails}>
              <div className={css.arrow}>
                <img src={arrowUp} alt="arrow up" />
              </div>
              <div className={css.incomeWrap}>
                <p className={css.text}>Total Income</p>
                <p className={css.amount}>${totalIncome}</p>
              </div>
            </div>
            <div className={css.expenseDetails}>
            <div className={css.arrowDown}>
                <img src={arrowUp} alt="arrow down" />
              </div>
              <div className={css.expenseWrap}>
                <p className={css.text}>Total Expense</p>
                <p className={css.amount}>${totalExpense}</p>
              </div>
            </div>
          </div>

          <div className={css.expenseContainer}>
            <div className={css.expCategory}>
              <div>
                <p className={css.expTitle}>Expense categories</p>
              </div>
              <div className={css.gaugeContainer}>
                {/* <Gauge data={gaugeData} /> */}
              </div>
            </div>

            <div className={css.expList}>
              <ul>
                <li className={css.expListItems}>
                  <div className={css.circle}></div>
                  Category 1 <span>0%</span>
                </li>
                <li className={css.expListItems}>
                  <div className={css.circle}></div>
                  Category 2 <span>0%</span>
                </li>
                <li className={css.expListItems}>
                  <div className={css.circle}></div>
                  Category 3 <span>0%</span>
                </li>
              </ul>
            </div>
          </div>
          </div>

          <TransactionForm />
        </div>
    </div>
  );
};
