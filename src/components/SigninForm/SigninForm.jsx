import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import css from './SigninForm.module.css';
import { Navbar } from 'components/NavBar/Navbar';
import { DecorationTab } from 'components/DecorationTab/DecorationTab';

export const SigninForm = () => {
    const [passwordVisible, setPassWordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPassWordVisible(prevState => !prevState);
    };

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
            <p className={css.signinText}>Welcom back to effortless expense tracking! Your financial
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
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={css.formControl}
                />
                <span onClick={togglePasswordVisibility} className={css.passwordToggle}>
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </span>                           
            </label>
            
            <div>
                <button type="submit" className={css.signinBtn}>Sign In</button>
                <p className={css.btnText}>Don't have an account? <span className={css.signinSpan}>Sign Up</span></p>
            </div>
        </form>
            
        </div>
    </div>
    </div>
  )
}
