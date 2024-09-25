import React from 'react';
import { Outlet } from 'react-router-dom';
import { TransactionForm } from '../components/Transaction/TransactionForm';


export const TransactionPage = () => {
  return (
    <div>
      <TransactionForm />
      <Outlet />
    </div>
  );
};
