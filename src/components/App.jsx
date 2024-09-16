import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from "./Home/HomePage";
import { SignupPage } from '../pages/SignupPage';
import { SigninPage } from '../pages/SigninPage';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import { RestrictedRoute } from '../components/RestrictedRoute/RestrictedRoute';
import { TransactionPage } from '../pages/TransactionPage';
import { IncomePage } from '../pages/IncomePage';
import { ExpensePage } from 'pages/ExpensePage';

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
          path="transactions" 
          element={<PrivateRoute component={TransactionPage} redirectTo="/signin" />} 
        >
         <Route
          path="expense"
          element={<ExpensePage />} />
        <Route 
          path= "income"
          element={<IncomePage />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};
