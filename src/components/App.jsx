import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from "./Home/HomePage";
import { SignupPage } from '../pages/SignupPage';
import { SigninPage } from '../pages/SigninPage';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import { RestrictedRoute } from '../components/RestrictedRoute/RestrictedRoute';
import { TransactionPage } from '../pages/TransactionPage';
import { ExpenseForm } from './Expense/ExpenseForm';
import { IncomePage } from 'pages/IncomePage';

export const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route 
          path="signin" 
          element={
            <RestrictedRoute component={SigninPage} redirectTo="/transactionPage" />} 
          />
        <Route 
          path="/transactionPage" 
          element={
            <RestrictedRoute component={TransactionPage} redirectTo="/signin" />} 
          />
        <Route 
          path="transactionPage/Expense" 
          element={<PrivateRoute component={ExpenseForm} redirectTo="/signin" />} 
          />
        <Route 
          path="transactionPage/Income" 
          element={<PrivateRoute component={IncomePage} redirectTo="/signin" />} 
          />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};
