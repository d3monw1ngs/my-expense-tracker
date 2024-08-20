import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionsByType, addTransaction } from '../../redux/transaction/transactionsOperators';
import { selectAllTransaction, selectTransactionsStatus, selectTransactionsError } from '../../redux/transaction/transactionsSelectors';
import { TransactionNav } from './TransactionNav';
import css from './TransactionPage.module.css';
// import { Gauge } from 'components/Gauge/Gauge';
import { FiCalendar } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import arrowUp from '../../images/Arrow 15.svg';
import { useParams } from 'react-router-dom';

export const TransactionPage = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransaction);
  const status = useSelector(selectTransactionsStatus);
  const error = useSelector(selectTransactionsError);
  const { transactionsType } = useParams();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactionsByType({ type: transactionsType }));
    }
  }, [status, dispatch, transactionsType]);

  const calculateTotal = (type) => {
    return transactions
      .filter(transaction => transaction.type === type)
      .reduce((total, transaction) => total + transaction.amount, 0)
      .toFixed(2);
  };

  const totalIncome = calculateTotal('income');
  const totalExpense = calculateTotal('expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newTransaction = {
      type: formData.get('type'),
      date: formData.get('date'),
      time: formData.get('time'),
      category: formData.get('category'),
      amount: parseFloat(formData.get('amount')),
      comment: formData.get('comment'),
    };
    dispatch(addTransaction(newTransaction));
  };

  const expenseCategories = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // eslint-disable-next-line
  const gaugeData = Object.entries(expenseCategories).map(([category, amount]) => ({ category, amount }));

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
                {/* <Gauge /> */}
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

          <div className={css.formContainer}>
            <form onSubmit={handleSubmit}>     
              <div>              
                <input 
                  type="radio" 
                  className={css.radio}
                  name="type"
                  value="expense"
                  defaultChecked
                /> {' '}
                <label>Expense</label>                  
      
                <input 
                  type="radio" 
                  className={css.radio}
                  name="type"
                  value="income"
                /> {' '}
                <label>Income</label>
              </div>
                
                <div className={css.dateContainer}>
                  <div className={css.dateInput}>
                    <p>Date</p>
                    <div className={css.inputWrapper}>
                    <input 
                      className={css.date}
                      placeholder="mm/dd/yyyy"
                    />
                    <FiCalendar className={css.icon} />
                    </div>
                  </div>
                  <div className={css.timeInput}>
                    <p>Time</p>
                    <div className={css.inputWrapper}>
                    <input 
                      className={css.time}
                      placeholder="00:00:00"
                     />
                    <AiOutlineClockCircle className={css.icon} />
                  </div>
                </div>
              </div>

                <div className={css.inputFields}>
                  <p>Category</p>
                  <input 
                    className={css.inputText}
                    placeholder="Enter category"
                  />
                  <p>Sum</p>
                  <input 
                    className={css.inputText} 
                    placeholder="Enter the sum"
                    />
                  <p>Comment</p>
                  <input 
                    className={`${css.inputText} ${css.inputComment}`}
                    placeholder="Enter the text"
                    />
                </div>
                <button className={css.addBtn} type="submit">Add</button>    
            </form>
          </div>
        </div>
    </div>
  );
}
