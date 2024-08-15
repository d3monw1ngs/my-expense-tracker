import React from 'react';
import css from './ExpenseTable.module.css';
import { CiSearch, CiCalendar } from 'react-icons/ci';

export const ExpenseTable = () => {
    const data = [
        { category: 'Cinema', comment: 'Jhon Week 4', date: 'Sn, 3.03.2023', time: '14:30', sum: '150 / UAH' },
        { category: 'Products', comment: 'Milk, Bread...', date: 'Sn, 18.03.2023', time: '10:50', sum: '1500 / UAH' },
        { category: 'Clothes', comment: 'Tshirt', date: 'Sn, 20.03.2023', time: '17:25', sum: '5000 / UAH' },
        { category: 'Cinema', comment: 'Avatar 2', date: 'Sn, 29.03.2023', time: '20:30', sum: '150 / UAH' },
        { category: 'Grocery', comment: 'Tshirt', date: 'Sn, 20.03.2023', time: '17:25', sum: '5000 / UAH' },
        { category: 'Cinema', comment: 'Avatar 2', date: 'Sn, 29.03.2023', time: '20:30', sum: '150 / UAH' },
    ];

  return (
    <div className={css.tableContainer}>
        <div className={css.filterWrapper}>
            <div className={css.searchWrapper}>
                <input 
                    className={css.search}
                    placeholder="Search for anything..." 
                />
                <CiSearch className={css.icon}/>
            </div>
            <div className={css.dateWrapper}>
                <input 
                    className={css.date}
                    placeholder='dd/mm/yyyy'
                />
                <CiCalendar className={css.icon}/>
            </div>
        </div>
        <div className={css.tableWrapper}>
            <table className={css.table}>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Comment</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Sum</th>
                        <th>Actions</th>
                    </tr>
                </thead>            
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className={css.scrollableTd}>{item.category}</td>
                            <td className={css.scrollableTd}>{item.comment}</td>
                            <td className={css.scrollableTd}>{item.date}</td>
                            <td className={css.scrollableTd}>{item.time}</td>
                            <td className={css.scrollableTd}>{item.sum}</td>
                            <td className={css.scrollableTd}>
                                <button className={css.editBtn}>✏️ Edit</button>
                                <button className={css.deleteBtn}>🗑️ Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};
