import React from 'react';
import css from './SignupForm.module.css';

export const SignupForm = () => {
  return (
    <div className={css.signupContainer}>
        <h1>Sign Up</h1>
        <p>Step into a world of hassle-free expense management! Your journey 
            towards financial mastery begins here.
        </p>
        <form>
            <label>
                <input
                    type="name"
                    name="name"
                    placeholder="Name">
                </input>
            </label>
            <label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email">
                </input>
            </label>
            <label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password">
                </input>
            </label>
            <div>
                <button type="submit">Sign Up</button>
                <p>Already have account? <span>Sign In</span></p>
            </div>
        </form>
    </div>
  )
}
