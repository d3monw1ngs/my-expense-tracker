import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './HomePage.module.css';
import images from '../../images/Image.jpg';
import images1 from '../../images/Image (1).jpg';
import images2 from '../../images/Image (2).jpg';
import { Navbar } from '../NavBar/Navbar';
import { DecorationTab } from '../DecorationTab/DecorationTab';
import { ExpenseForm } from 'components/Expense/ExpenseForm';
import { IncomeForm } from 'components/Income/IncomeForm';
// import bgImage from '../../images/bgimage.jpg';


export const HomePage = () => {  
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className={css.homePageBody}>
      <Navbar />
    <div className={css.homePageContainer}>
      <div className={css.homePageImageWrapper}>
        {/* <img src={bgImage} alt="background" className={css.image} /> */}
        <div className={css.decorationTabWrapper}>
          <DecorationTab />
        </div>
      </div>
      <div className={css.homeContentWrapper}>
        <div>
            <span className={css.homePageInfo}>EXPENSE LOG</span>
            <h3 className={css.homePageSlogan}>Manage Your <span>Finances</span> Masterfully!</h3>
            <p className={css.homePageText}>ExpenseTracker effortlessly empowers you to take control of your finances! 
              With intuitive features, it simplifies the process of tracking and managing 
              expenses, allowing for a stress-free mastery over your financial world.</p>
          </div>
          <div className={css.homePageBtn}>
            <button 
              type='button' 
              className={css.signUp} 
              onClick={handleSignUp}>
                Sign Up
            </button>
            <button 
              type='button'
              className={css.signIn}
              onClick={handleSignIn}>
                Sign In
            </button>
          </div>
          <div className={css.homePageImg}>
            <img src={images} alt="Fleur Cook"></img>
            <img src={images1} alt="Ethan Valdez"></img>
            <img src={images2} alt="Amanda Lowery"></img>
            <div className={css.homePageUsers}>
              <p className={css.user}>1000 users +</p>
              <p className={css.userText}>Trusted by users for reliable expense tracking!</p>
            </div>
          </div>
        </div>
      </div>
     
      <ExpenseForm />
      <IncomeForm />
    </div>    
    
  );
};
