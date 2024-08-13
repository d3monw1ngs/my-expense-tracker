import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import css from './SigninForm.module.css';
import { Navbar } from 'components/NavBar/Navbar';
import { DecorationTab } from 'components/DecorationTab/DecorationTab';
import { Link } from 'react-router-dom';
import { TransactionPage } from 'components/Transaction/TransactionPage';

export const SigninForm = () => {
    const [passwordVisible, setPassWordVisible] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const togglePasswordVisibility = () => {
        setPassWordVisible(prevState => !prevState);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const validate = () => {
        let emailError = '';
        let passwordError ='';

        if (!formData.email) {
            emailError = 'Email is required';
        }
        if (!formData.password) {
            passwordError = 'Password is required';
        }

        setErrors({ email: emailError, password: passwordError });
        return !emailError && !passwordError;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(validate()) {
            console.log('Form submitted:', formData);
        }
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
            <p className={css.signinText}>Welcome back to effortless expense tracking! Your financial
                dashboard awaits.
            </p>
        </div>      
        <form className={css.signinForm} onSubmit={handleSubmit}>
            <label className={css.signinLabel}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={css.formControl}
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span className={css.errorText}>{errors.email}</span>}
            </label>

            <label className={`${css.signinLabel} ${css.passwordField}`}>
                <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={css.formControl}
                    value={formData.password}
                    onChange={handleChange}
                />
                <span onClick={togglePasswordVisibility} className={css.passwordToggle}>
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </span>                           
            </label>
            
            <div>
                <button type="submit" className={css.signinBtn}>Sign In</button>
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
