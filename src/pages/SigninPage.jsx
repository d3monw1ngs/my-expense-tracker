import React from 'react';
import { useDispatch } from 'react-redux';
import { Navbar } from '../components/NavBar/Navbar';
import { DecorationTab } from 'components/DecorationTab/DecorationTab';
import { SigninForm } from '../components/SigninForm/SigninForm';
import css from './SigninPage.module.css';

export const SigninPage = () => {
  const dispatch = useDispatch();

  return (
    <div className={css.signinContainer}>
        <Navbar />
        <div className={css.signinWrapper}>
          <div className={css.signinImageWrapper}>
            <DecorationTab />
          </div>
          <SigninForm dispatch={dispatch}/>
        </div>
    </div>
  );
};
