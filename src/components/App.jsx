import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from "./Home/HomePage";
import { SignupPage } from '../pages/SignupPage';
import { SigninPage } from 'pages/SigninPage';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import { RestrictedRoute } from '../components/RestrictedRoute/RestrictedRoute';
import { TransactionPage } from './Transaction/TransactionPage';

export const App = () => {

  return (
    <div>
      <Routes>
        <Route index element={<HomePage />} />
        <Route 
          path="/signup" 
          element={
            <RestrictedRoute component={SignupPage} redirectTo="/transactions" />} 
          />
        <Route 
          path="/signin" 
          element={
            <RestrictedRoute component={SigninPage} redirectTo="/transactions" />} 
          />
        <Route 
          path="/transactions/:transactionsType" 
          element={<PrivateRoute component={TransactionPage} redirectTo="/signin" />} 
          />
      </Routes>
    </div>
  );
};
