import React from 'react';
import css from './IncomeTable.module.css';
import { CiSearch, CiCalendar } from 'react-icons/ci';

export const IncomeTable = () => {
    const data = [
        { category: 'Salary', comment: 'IT company', date: 'Sn, 3.03.2023', time: '14:30', sum: '35 000 / UAH' },
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
