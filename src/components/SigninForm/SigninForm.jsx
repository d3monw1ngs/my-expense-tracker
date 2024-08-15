import React from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import css from './SigninForm.module.css';
import { Navbar } from 'components/NavBar/Navbar';
import { DecorationTab } from 'components/DecorationTab/DecorationTab';
import { Link } from 'react-router-dom';
import { TransactionPage } from 'components/Transaction/TransactionPage';

export const SigninForm = () => {

  return (
    <div className={css.signinContainer}>
        <Navbar />
        <div className={css.signinWrapper}>
            <div className={css.signinImageWrapper}>
                <div>
                    <DecorationTab />
                </div>      
            </div>
        <div className={css.signinFormContainer}>  
        <div className={css.siDetails}>
            <h1>Sign In</h1>
            <p className={css.signinText}>Welcome back to effortless expense tracking! Your financial
                dashboard awaits.
            </p>
        </div>      
        <form className={css.signinForm}>
            <label className={css.signinLabel}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={css.formControl}
                />
            </label>

            <label className={`${css.signinLabel} ${css.passwordField}`}>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={css.formControl}
                />
                <span className={css.passwordToggle}>
                    <FaEyeSlash />
                </span>                           
            </label>
            
            <div>
                <button 
                    type="submit" 
                    className={css.signinBtn}
                    >
                        Sign In
                </button>
                <p className={css.btnText}>Don't have an account?{' '}
                    <Link to="/signup" className={css.signinSpan}>Sign Up</Link>
                </p>
            </div>
        </form>            
    </div>
</div>
        <div>
            <TransactionPage />
        </div>
    </div>
  )
}
