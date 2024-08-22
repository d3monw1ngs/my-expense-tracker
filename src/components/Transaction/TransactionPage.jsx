import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchTransactions, 
  addTransaction,
} from '../../redux/transaction/transactionsOperators';
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

  const [formData, setFormData] = useState({
    type: 'expense',
    date: '',
    time: '',
    category: '',
    amount: '',
    comment: '',
  });

  useEffect(() => {
    if (transactionsType) {
      dispatch(fetchTransactions(transactionsType));
    }
  }, [dispatch, transactionsType]);

   const calculateTotal = (type) => {
    if (!transactions || !Array.isArray(transactions)) return 0;
    return transactions
      .filter(transaction => transaction.type === type)
      .reduce((total, transaction) => total + transaction.amount, 0)
      .toFixed(2);
  };

  const totalIncome = calculateTotal('income');
  const totalExpense = calculateTotal('expense');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      ...formData,
      amount: parseFloat(formData.amount),
    };
    dispatch(addTransaction(newTransaction));
    setFormData({
      type: 'expense',
      date: '',
      time: '',
      category: '',
      amount: '',
      comment: '',
    });    
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

          <div className={css.formContainer}>
            <form onSubmit={handleSubmit}>     
              <div>              
                <input 
                  type="radio" 
                  className={css.radio}
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={handleChange}
                /> {' '}
                <label>Expense</label>                  
      
                <input 
                  type="radio" 
                  className={css.radio}
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={handleChange}
                /> {' '}
                <label>Income</label>
              </div>
                
                <div className={css.dateContainer}>
                  <div className={css.dateInput}>
                    <p>Date</p>
                    <div className={css.inputWrapper}>
                    <input 
                      className={css.date}
                      name="date"
                      value={formData.date}
                      placeholder="mm/dd/yyyy"
                      onChange={handleChange}
                    />
                    <FiCalendar className={css.icon} />
                    </div>
                  </div>
                  <div className={css.timeInput}>
                    <p>Time</p>
                    <div className={css.inputWrapper}>
                    <input 
                      className={css.time}
                      name="time"
                      value={formData.time}
                      placeholder="00:00:00"
                      onChange={handleChange}
                     />
                    <AiOutlineClockCircle className={css.icon} />
                  </div>
                </div>
              </div>

                <div className={css.inputFields}>
                  <p>Category</p>
                  <input 
                    className={css.inputText}
                    name="category"
                    value={formData.category}
                    placeholder="Enter category"
                    onChange={handleChange}
                  />
                  <p>Sum</p>
                  <input 
                    className={css.inputText} 
                    name="amount"
                    value={formData.amount}
                    placeholder="Enter the sum"
                    onChange={handleChange}
                    />
                  <p>Comment</p>
                  <input 
                    className={`${css.inputText} ${css.inputComment}`}
                    name="comment"
                    value={formData.comment}
                    placeholder="Enter the text"
                    onChange={handleChange}
                    />
                </div>
                <button className={css.addBtn} type="submit">Add</button>    
            </form>
          </div>
        </div>
    </div>
  );
}
