import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import css from './SignupForm.module.css';
import { Navbar } from 'components/NavBar/Navbar';
import { DecorationTab } from 'components/DecorationTab/DecorationTab';


export const SignupForm = () => {
    const [passwordVisible, setPassWordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPassWordVisible(prevState => !prevState);
    };

  return (
    <div className={css.signupContainer}>
        <Navbar />
        <div className={css.signupWrapper}>
            <div className={css.signupImageWrapper}>
                <div>
                    <DecorationTab />
                </div>      
            </div>
        <div className={css.signupFormContainer}>  
        <div className={css.suDetails}>
            <h1>Sign Up</h1>
            <p className={css.signupText}>Step into a world of hassle-free expense management! Your journey 
                towards financial mastery begins here.
            </p>
        </div>      
        <form className={css.signupForm}>
            <label className={css.signupLabel}>
                <input
                    type="name"
                    name="name"
                    placeholder="Name"
                    className={css.formControl}
                />
            </label>

            <label className={css.signupLabel}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={css.formControl}
                />
            </label>

            <label className={`${css.signupLabel} ${css.passwordField}`}>
                <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={css.formControl}
                />
                <span onClick={togglePasswordVisibility} className={css.passwordToggle}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>                           
            </label>
            
            <div>
                <button type="submit" className={css.signupBtn}>Sign Up</button>
                <p className={css.btnText}>Already have account? <span className={css.signupSpan}>Sign In</span></p>
            </div>
        </form>
            
        </div>
    </div>
    </div>
  )
}
