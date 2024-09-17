import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../redux/transaction/transactionsOperators';
import css from './TransactionForm.module.css';
import { selectAllTransaction } from '../../redux/transaction/transactionsSelectors';
import { FiCalendar } from 'react-icons/fi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { CalendarComponent } from '../Calendar/CalendarComponent';
import { TransactionNav } from './TransactionNav';
import arrowUp from '../../images/Arrow 15.svg';

export const TransactionForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [setDate] = useState(new Date());
    const transactions = useSelector(selectAllTransaction);

    const [formData, setFormData] = useState({
        type: 'expense',
        date: new Date().toLocaleDateString(),
        time: '',
        category: '',
        amount: '',
        comment: '',
    });

    const toggleCalendar = () => {
        setCalendarVisible(prevState => !prevState);
    };

    const handleDateChange = date => {
        setDate(date);
        setFormData(prevState => ({
          ...prevState,
          date: date.toLocaleDateString(),
        }));
        setCalendarVisible(false);
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
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
    
    const categories = [
      { name: "Category 1", percentage: "0%" },
      { name: "Category 2", percentage: "0%" },
      { name: "Category 3", percentage: "0%" },
    ];

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
                  {categories.map((category, index) => (
                    <li key={index} className={css.expListItems}>
                      <div className={css.circle}></div>
                      {category.name} <span>{category.percentage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
      </div>   
    <form onSubmit={handleSubmit} className={css.formContainer}>
        <div>
            <input 
                type="radio"
                className={css.radio}
                name="type"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={handleChange}
            /> {' '}
            <label className={css.label}>Expense</label>

            <input 
                type="radio"
                className={css.radio}
                name="type"
                value="income"
                checked={formData.type === 'income'}
                onChange={handleChange}
            /> {' '}
            <label className={css.label}>Income</label>
        </div>

        <div className={css.dataContainer}>
            <div className={css.dataInput}>
                <p>Date</p>
                <div className={css.inputWrapper}>
                    <input 
                        className={css.date}
                        name="date"
                        value={formData.date}
                        placeholder="mm/dd/yyyy"
                        onChange={handleChange}
                    />
                    <FiCalendar className={css.icon} onClick={toggleCalendar} />
                    <CalendarComponent isVisible={isCalendarVisible} onClick={handleDateChange} />
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
            <p className={css.label}>Category</p>
            <input 
                className={css.inputText}
                name="category"
                value={formData.category}
                placeholder="Enter category"
                onChange={handleChange}
             />
            <p className={css.label}>Sum</p>
            <input 
                className={css.inputText} 
                name="amount"
                value={formData.amount}
                placeholder="Enter the sum"
                onChange={handleChange}
            />
            <p className={css.label}>Comment</p>
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
  );
};
