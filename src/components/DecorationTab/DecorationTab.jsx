import React from 'react';
import css from './DecorationTab.module.css';
import arrowUp from '../../images/Arrow 15.svg';

export const DecorationTab = () => {
  return (
    <div className={css.tabContainer}>
        <div className={css.arrowUp}>
            <img src={arrowUp} alt="arrow up" />
        </div>
        <div className={css.tabInfo}>
            <p className={css.tabInfoText}>Your balance</p>
            <p className={css.tabInfoNum}>$632.00</p>
        </div>
        <div className={css.tabPercentContainer}>
            <p className={css.tabPercent}>+1.29%</p>
        </div>
    </div>
  )
}
