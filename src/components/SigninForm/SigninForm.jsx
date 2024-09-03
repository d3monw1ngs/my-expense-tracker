import React, { useState, useEffect, useCallback } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import css from './SigninForm.module.css';
import { logIn } from '../../redux/auth/authOperations';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectAuthError } from '../../redux/auth/authSelectors';

export const SigninForm = React.memo(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPassWordVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectIsLoading);
    const authError = useSelector(selectAuthError);

    const togglePasswordVisibility = () => {
        setPassWordVisible(prevState => !prevState);
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        try {
            // Dispatch the login action with current state values
            const userInfo = await dispatch(logIn({ email, password })).unwrap();
            if (userInfo) {
            navigate('/transactions');
            }
        } catch (error) {
            console.error('Failed to login:', error);
        }
    }, [dispatch, email, password, navigate]);

    useEffect(() => {
        if (authError) {
            console.log('Authentication error:', authError);
        }
    }, [authError]);

  return (
    <div>
        <div>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            <label className={`${css.signinLabel} ${css.passwordField}`}>
                <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={css.formControl}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={togglePasswordVisibility} className={css.passwordToggle}>
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </span>                            
            </label>

            {authError && <div className={css.errorText}>{authError}</div>}
            
            <div>
                <button 
                    type="submit" 
                    className={css.signinBtn}
                    disabled={isLoading}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
                <p className={css.btnText}>Don't have an account?{' '}
                    <Link to="/signup" className={css.signinSpan}>Sign Up</Link>
                </p>
            </div>
        </form>            
    </div>
</div>
</div>
  );
});
