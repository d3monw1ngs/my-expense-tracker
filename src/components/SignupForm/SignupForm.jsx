import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import css from './SignupForm.module.css';
import { Navbar } from 'components/NavBar/Navbar';
import { DecorationTab } from 'components/DecorationTab/DecorationTab';
import { Link } from 'react-router-dom';
import { register } from '../../redux/auth/authOperations';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const SignupForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordVisible, setPassWordVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({ name: '', email: '', password: '', server: '' });
    const [loading, setLoading] =useState(false);

    const togglePasswordVisibility = () => {
        setPassWordVisible(prevState => !prevState);
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const validate = () => {
        let nameError = '';
        let emailError = '';
        let passwordError = '';

        if (!formData.name) {
            nameError = 'Name is required';
        }
        if (!formData.email) {
            emailError = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            emailError = 'Email is invalid';
        }
        if (!formData.password) {
            passwordError = 'Password is required';
        }

        setErrors({ name: nameError, email: emailError, password: passwordError, server: ''});
        return !nameError && !emailError && !passwordError;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const { name, email, password } = formData;

       try {
        console.log('Submitting registration:', formData);
        setLoading(true);

        const result = await dispatch(register({ name, email, password })).unwrap();
        console.log('Registration success:', result);

        navigate('/signin', {state: {fromRegistration: true}});
       } catch (error) {
        console.error('Registration error:', error)
        setErrors(prevErrors => ({
            ...prevErrors,
            server: error.response?.data?.message || 'Registration failed',
        }));
       } finally {
        setLoading(false);
       }
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
        <form className={css.signupForm} onSubmit={handleSubmit}>
            <label className={css.signupLabel}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className={css.formControl}
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <span className={css.errorText}>{errors.name}</span>}
            </label>

            <label className={css.signupLabel}>
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

            <label className={`${css.signupLabel} ${css.passwordField}`}>
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
            
            {errors.server && <div className={css.serverError}>{errors.server}</div>}
            
            <div>
                <button type="submit" className={css.signupBtn} disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
                <p className={css.btnText}>Already have account?{' '}
                    <Link to="/signin" className={css.signupSpan}>Sign In</Link>
                </p>
            </div>
        </form>
            
        </div>
    </div>
    </div>
  )
}
