import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from "./Home/HomePage";
import { SignupForm } from "./SignupForm/SignupForm";
import { SigninForm } from "./SigninForm/SigninForm";
// import { ExpenseForm } from './Expense/ExpenseForm';
// import { TransactionPage } from './Transaction/TransactionPage';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
        {/* <Route path="/ExpenseForm" element={<ExpenseForm />} /> */}
      </Routes>
    </div>
  );
};
