import React from 'react';
import { Navbar } from '../components/NavBar/Navbar';
import { DecorationTab } from 'components/DecorationTab/DecorationTab';
import { SigninForm } from '../components/SigninForm/SigninForm';
import css from './SigninPage.module.css';

export const SigninPage = () => {
  return (
    <div className={css.signinContainer}>
        <Navbar />
        <div className={css.signinWrapper}>
          <div className={css.signinImageWrapper}>
            <DecorationTab />
          </div>
          <SigninForm />
        </div>
    </div>
  );
};
