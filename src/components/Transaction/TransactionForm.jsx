import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../redux/transaction/transactionsOperators';
import css from './TransactionForm.module.css';
import { selectAllTransaction } from '../../redux/transaction/transactionsSelectors';
import { FiCalendar } from 'react-icons/fi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { TransactionNav } from './TransactionNav';
import arrowUp from '../../images/Arrow 15.svg';

const calculateCategoryPercentages = (transactions) => {
  const totalExpense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);
  
  const categorySums = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  const categoryPercentages = Object.entries(categorySums).map(([category, sum]) => ({
    category,
    percentage: ((sum / totalExpense) * 100).toFixed(2),
  }));

  return categoryPercentages;
}


export const TransactionForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const transactions = useSelector(selectAllTransaction);
    const categoryPercentages = calculateCategoryPercentages(transactions);

    const [formData, setFormData] = useState({
        type: 'expense',
        date: '',
        time: '',
        category: '',
        amount: '',
        comment: '',
    });

    // Handle form field changes
    const handleChange = e => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

    // Handle form submit
    const handleSubmit = e => {
      e.preventDefault();

      if (!formData.category || !formData.amount) {
        alert("Please fill in all required fields.");
        return;
      }

      const newTransaction = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      dispatch(addTransaction(newTransaction));

      // Reset the form after submission
      setFormData({
        type: 'expense',
        date: '',
        time: '',
        category: '',
        amount: '',
        comment: '',
      });

      navigate('/transactions/expenses');
    };

    const calculateTotal = (type) => {
      if (!transactions || !Array.isArray(transactions)) return 0;
      return transactions
        .filter(transaction => transaction.type === type)
        .reduce((total, transaction) => total + transaction.amount, 0)
        .toFixed(2);
    };

    const totalIncome = calculateTotal('income');
    const totalExpense = calculateTotal('expense');
    

  return (
    <div>
      <TransactionNav />
      <div className={css.transactionContainer}>
        {/* left side of the page */}
        <div className={css.leftContainer}>
          <h1>Expense Log</h1>
          <p className={css.text}>Capture and organize every penny spent with ease! A clear view of your financial habits
            at your fingertips.</p>

          {/* contains the income and expense info with the expense statistics */}
          <div className={css.featContainer}>
            <div className={css.tabContainer}>
              <div className={css.incomeWrapper}>
                <div className={css.arrowUp}>
                  <img src={arrowUp} alt='arrow up' />
                </div>
                <div className={css.incomeInfo}>
                  <p className={css.incTitle}>Total Income</p>
                  <p className={css.incAmount}>${totalIncome}</p>
                </div>
              </div>
              <div className={css.expenseWrapper}>
                <div className={css.arrowDown}>
                  <img src={arrowUp} alt='arrow down' />
                </div>
                <div className={css.expenseInfo}>
                  <p className={css.expTitle}>Total Expense</p>
                  <p className={css.expAmount}>${totalExpense}</p>
                </div>
              </div>
            </div>

            {/* this is the gauge part with expense statistics */}
            <div className={css.categoriesContainer}>
              <div className={css.textAndDonut}>
                <p className={css.catText}>Expenses categories</p>
                <div className={css.semiDonut}>
                  {categoryPercentages.reduce((total, cat) => total + parseFloat(cat.percentage), 0)}%
                </div>
              </div>
              <div className={css.catList}>
                <ul className={css.list}>
                  {categoryPercentages.map((cat, index) => (
                    <li key={index}>
                      <span>{cat.category}</span><span>{cat.percentage}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      {/* form side or right side of the page */}
      <div className={css.rightContainer}>
        <form onSubmit={handleSubmit}>
          <div className={css.radioContainer}>
            <input 
              type="radio" 
              name="type"
              value="income" 
              checked={formData.type === 'income'}
              onChange={handleChange}
              className={css.radioChoice}></input>
            <label for="income" id="income" className={css.radioLabel}>Income</label>
            <input 
              type="radio" 
              name="type"
              value="expense" 
              checked={formData.type === 'expense'}
              onChange={handleChange}
              className={css.radioChoice}></input>
            <label for="expense" id="expense" className={css.radioLabel}>Expense</label>
          </div>
        </form>
             
        <div className={css.dateTimeContainer}>
             {/* for the date form */}
          <form action="">
            <div className={css.dateInput}>
              <label className={css.formLabel}>Date</label>
              <div className={css.inputWrapper}>
                <input 
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="mm/dd/yyyy"
                  className={css.inputField}></input>
                <FiCalendar className={css.icon} />
              </div>
            </div>
          </form>

          {/* for the time form */}
          <form action="">
            <div className={css.timeInput}>
              <label className={css.formLabel}>Time</label>
              <div className={css.inputWrapper}>
                <input 
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="00:00:00"
                  className={css.inputField}></input>
                <AiOutlineClockCircle className={css.icon} />
              </div>
            </div>
          </form>
        </div>   
        {/* other part of the form */}
        <div className={css.categoryField}>
          <form action="">
            <label className={css.formLabel}>Category</label>
            <input 
              type="text" 
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Different" 
              className={css.inputField}></input>
          </form>
        </div>

        <div className={css.sumField}>
          <form action="">
            <div className={css.sumInput}>
              <label className={css.formLabel}>Sum</label>
              <div className={css.inputWrapper}>
                <input 
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter the sum" 
                  className={css.inputField}></input>
                <span className={css.currency}>UAH</span>
              </div>
            </div>
          </form>
        </div>

        <div className={css.commentField}>
          <form action="">
            <label className={css.formLabel}>Comment</label>
            <textarea 
              id="comment" 
              name="comment" 
              value={formData.comment}
              onChange={handleChange}
              placeholder="Enter the text" 
              className={css.commentBox}>
            </textarea>
          </form>
        </div>
        <button 
          className={css.addBtn}
          type="submit"
          onClick={handleSubmit}
          >
            Add
        </button>
      </div>

      </div>  
    </div>
  
  );
};
