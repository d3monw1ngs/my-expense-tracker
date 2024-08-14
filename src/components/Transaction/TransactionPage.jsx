import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { TransactionNav } from './TransactionNav';
import css from './TransactionPage.module.css';
import { Gauge } from 'components/Gauge/Gauge';
import { FiCalendar } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import arrowUp from '../../images/Arrow 15.svg';

export const TransactionPage = ( [ income, expense, categories, onFormSubmit ]) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [sum, setSum] = useState('');
  const [comment, setComment] = useState('');
  const [type, setType] = useState('expense');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = { date, time, category, sum, comment, type };
    onFormSubmit(formData);

    // Reset form after submission
    setDate('');
    setTime('');
    setCategory('');
    setSum('');
    setComment('');
  };

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
                <p className={css.amount}>${income.amount}</p>
              </div>
            </div>
            <div className={css.expenseDetails}>
            <div className={css.arrowDown}>
                <img src={arrowUp} alt="arrow down" />
              </div>
              <div className={css.expenseWrap}>
                <p className={css.text}>Total Expense</p>
                <p className={css.amount}>${expense.amount}</p>
              </div>
            </div>
          </div>

          <div className={css.expenseContainer}>
            <div className={css.expCategory}>
              <div>
                <p className={css.expTitle}>Expense categories</p>
              </div>
              <div className={css.gaugeContainer}>
                <Gauge />
              </div>
            </div>

            <div className={css.expList}>
              <ul>
                {categories.map((category, index) => (
                  <li key={index} className={css.expListItems}>
                    <div className={css.circle}></div>
                    {category.name} {' '}
                    <span>{category.percentage}%</span>
                  </li>
                ))}
              </ul>
            </div>
            </div>
          </div>

          <div className={css.formContainer}>
            <form onSubmit={handleFormSubmit}>     
              <div>              
                <input 
                  type="radio" 
                  className={css.radio}
                  value="expense"
                  checked={type === 'expense'}
                  onChange={() => setType('expense')} 
                /> {' '}
                <label>Expense</label>                  
      
                <input 
                  type="radio" 
                  className={css.radio}
                  value="income"
                  checked={type === 'income'}
                  onChange={() => setType('income')} 
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
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
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
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                     />
                    <AiOutlineClockCircle className={css.icon} />
                  </div>
                </div>
              </div>

                <div className={css.inputFields}>
                  <p>Category</p>
                  <input 
                    className={css.inputText}
                    placeholder="Difference"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <p>Sum</p>
                  <input 
                    className={css.inputText} 
                    placeholder="Enter the sum"
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                    />
                  <p>Comment</p>
                  <input 
                    className={`${css.inputText} ${css.inputComment}`}
                    placeholder="Enter the text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button className={css.addBtn} type="submit">Add</button>    
            </form>
          </div>
        </div>
    </div>
  );
};

// TransactionPage.propTypes = {
//   income: PropTypes.shape({
//     amount: PropTypes.number.isRequired,
//     icon: PropTypes.string.isRequired,
//   }).isRequired,
//   expenses: PropTypes.shape({
//     amount: PropTypes.number.isRequired,
//     icon: PropTypes.string.isRequired,
//   }).isRequired,
//   categories: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       percentage: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   onFormSubmit: PropTypes.func.isRequired,
// };
