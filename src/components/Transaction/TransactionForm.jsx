import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, fetchTransactions } from '../../redux/transaction/transactionsOperators'; 
import { 
  selectTransactionTotal,
  selectVisibleTransaction,
  selectIsLoading } from '../../redux/transaction/transactionsSelectors';
import css from './TransactionForm.module.css';
import { FiCalendar } from 'react-icons/fi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TransactionNav } from './TransactionNav';
import arrowUp from '../../images/Arrow 15.svg';

export const TransactionForm = ({ transactionType }) => {
    const dispatch = useDispatch();
    // Use selectors to get state from Redux
    const { expenses, income } = useSelector(selectTransactionTotal);
    const visibleTransaction = useSelector(selectVisibleTransaction);
    const loading = useSelector(selectIsLoading);
    

    const [formData, setFormData] = useState({
        type: 'expense',
        date: '',
        time: '',
        category: '',
        amount: '',
        comment: '',
    });

    useEffect(() => {
      if (transactionType) {
        dispatch(fetchTransactions(transactionType)); //Fetch transaction when type changes
      }
    }, [dispatch, transactionType]);

    // Handle form field changes
    const handleChange = e => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
      e.preventDefault();

      // Validate form
      if (!formData.category || !formData.amount) {
        alert("Please fill in all required fields.");
        return;
      }

      // Prepare new transaction
      const newTransaction = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      // Dispatch action to add transaction
      dispatch(addTransaction(newTransaction));
      resetForm();
    };

    // Reset form after submission
    const resetForm = () => {
      setFormData({
        type: 'expense',
        date: '',
        time: '',
        category: '',
        amount: '',
        comment: '',
      });
    };

    // Render form and handle loading state
    if (loading === 'loading') return <div>Loading transactions...</div>;
    if (loading === 'failed') return <div>Error loading transactions.</div>; 
  
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
                  <p className={css.incAmount}>${income}</p>
                </div>
              </div>
              <div className={css.expenseWrapper}>
                <div className={css.arrowDown}>
                  <img src={arrowUp} alt='arrow down' />
                </div>
                <div className={css.expenseInfo}>
                  <p className={css.expTitle}>Total Expense</p>
                  <p className={css.expAmount}>${expenses}</p>
                </div>
              </div>
            </div>

            {/* Expense statistics */}
            <div className={css.categoriesContainer}>
              <div className={css.textAndDonut}>
                <p className={css.catText}>Expenses categories</p>
                <div className={css.semiDonut}>
                  {visibleTransaction.reduce((total, transaction) => total + transaction.sum, 0)}%
                </div>
              </div>
              <div className={css.catList}>
                <ul className={css.list}>
                  {visibleTransaction.length === 0 ? (
                    <p>No transactions found for the current search.</p>
                  ) : (
                    visibleTransaction.map((transaction, index) => (
                      <li key={index}>
                        <span>{transaction.category.categoryName}</span>
                        <span className={css.spanTag}>${transaction.sum.toFixed(2)}</span>
                      </li>
                    ))
                  )}
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
            <label htmlFor="income" className={css.radioLabel}>Income</label>
            <input 
              type="radio" 
              name="type"
              value="expense" 
              checked={formData.type === 'expense'}
              onChange={handleChange}
              className={css.radioChoice}></input>
            <label htmlFor="expense" className={css.radioLabel}>Expense</label>
          </div>
             
        <div className={css.dateTimeContainer}>
          {/* Date input */}
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

          {/* Time input */}
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
        </div>  

        {/* Category input */}
        <div className={css.categoryField}>
          <label className={css.formLabel}>Category</label>
          <input 
            type="text" 
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Different" 
            className={css.inputField}></input>
        </div>

        {/* Amount inpute */}
        <div className={css.sumField}>
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

        {/* Comment inpute */}
        <div className={css.commentField}>
          <label className={css.formLabel}>Comment</label>
            <textarea 
              id="comment" 
              name="comment" 
              value={formData.comment}
              onChange={handleChange}
              placeholder="Enter the text" 
              className={css.commentBox}>
            </textarea>
        </div>

        {/* Submit button */}
        <button 
          className={css.addBtn}
          type="submit">
            Add
        </button>
      </form>
    </div>
  </div>  
</div>  
  );
};
