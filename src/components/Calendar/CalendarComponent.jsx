import React from 'react';
import Calendar from 'react-calendar';
import css from './CalendarComponent.module.css'

export const CalendarComponent = ({ isVisible, onClick }) => {
  if (!isVisible) return null;

  return (
    <div className={css.calendarPopup}>
      <Calendar />
      <button onClick={onClick}>Close</button>
    </div>
  );
};
  
