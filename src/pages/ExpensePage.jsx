import React from 'react';
import { TransactionNav } from '../components/Transaction/TransactionNav';
import { ExpenseForm } from '../components/Expense/ExpenseForm';



export const ExpensePage = () => {
 
  return (
    <div>
      <TransactionNav />
      <ExpenseForm />
    </div>
  );
};
