import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TransactionNav } from '../components/Transaction/TransactionNav';
import { ExpenseForm } from '../components/Expense/ExpenseForm';
import { loadExpenseData } from '../redux/expenses/expenseOperators';
import { selectTotalExpense, selectTotalIncome, selectTransactions } from '../redux/expenses/expenseSelectors';


export const ExpensePage = () => {
  const dispatch = useDispatch();
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpense = useSelector(selectTotalExpense);
  const transactions = useSelector(selectTransactions);
  

  useEffect(() => {
    dispatch(loadExpenseData());
  }, [dispatch]);

  return (
    <div>
      <TransactionNav />
      <ExpenseForm 
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        transactions={transactions}
        />
    </div>
  );
};
