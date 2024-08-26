import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from "./Home/HomePage";
import { SignupPage } from '../pages/SignupPage';
import { SigninPage } from '../pages/SigninPage';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import { RestrictedRoute } from '../components/RestrictedRoute/RestrictedRoute';
import { TransactionPage } from '../pages/TransactionPage';
import { IncomePage } from '../pages/IncomePage';

export const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route 
          path="signin" 
          element={
            <RestrictedRoute component={SigninPage} redirectTo="/users/current" />} 
          />
        <Route 
          path="signup" 
          element={
            <RestrictedRoute component={SignupPage} redirectTo="/signin" />} 
          />
        <Route 
          path="transactionPage" 
          element={<PrivateRoute component={TransactionPage} redirectTo="/signin" />} 
          />
          {/* Nested Routes for Expense and Income */}
        <Route 
          path="transactions/:transactionType" 
          element={<PrivateRoute component={TransactionPage} redirectTo="/signin" />} 
          />
        <Route 
          path="TransactionPage/Income"
          element={<PrivateRoute component={IncomePage} redirectTo="/signin" />}        
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};
