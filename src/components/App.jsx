import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from "./Home/HomePage";
import { SignupForm } from "./SignupForm/SignupForm";
import { SigninForm } from "./SigninForm/SigninForm";
import { TransactionPage } from './Transaction/TransactionPage';
import { selectIsAuthenticated } from '../redux/auth/authSelectors';
import { useSelector } from 'react-redux';


export const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/transactions/:transactionsType" 
               element={isAuthenticated ? <TransactionPage /> : <Navigate to="/transactionPage" />} />
        <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/transactions/incomes" /> : <Navigate to="/signin" />} />
        {/* <Route path="/ExpenseForm" element={<ExpenseForm />} /> */}
      </Routes>
    </div>
  );
};
