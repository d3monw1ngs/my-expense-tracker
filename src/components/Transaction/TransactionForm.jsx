import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/transaction/transactionsOperators';
import css from './TransactionForm.module.css';
import { FiCalendar } from 'react-icons/fi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const TransactionForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        type: 'expense',
        date: '',
        time: '',
        category: '',
        amount: '',
        comment: '',
    });

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
        navigate('/transactions/expenses');
    };

  return (
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
                    <FiCalendar className={css.icon}/>
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
  );
};
