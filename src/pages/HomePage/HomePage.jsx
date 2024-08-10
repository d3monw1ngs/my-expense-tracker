import React from 'react';
import css from './HomePage.module.css';
import images from '../../images/Image.jpg';
import images1 from '../../images/Image (1).jpg';
import images2 from '../../images/Image (2).jpg';
import { Navbar } from '../../components/NavBar/Navbar';
import { DecorationTab } from '../../components/DecorationTab/DecorationTab';

export const HomePage = () => {  
  return (
    <div className={css.homePageBody}>
      <Navbar />
    <div className={css.homePageContainer}>
      <div className={css.homePageImageWrapper}>
        <div>
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
            <button type='submit' className={css.signUp}>Sign Up</button>
            <button className={css.signIn}>Sign In</button>
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
    </div>    
  );
};
