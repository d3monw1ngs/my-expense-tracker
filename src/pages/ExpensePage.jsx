import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionNav } from '../components/Transaction/TransactionNav';
import { ExpenseForm } from '../components/Expense/ExpenseForm';
import { fetchTransactions } from '../redux/transaction/transactionsOperators';



export const ExpensePage = () => {
  const dispatch = useDispatch();

  const totalIncome = useSelector((state) => state.transactions.totalIncome);
  const totalExpense = useSelector((state) => state.transactions.totalExpense);
  const transactions = useSelector((state) => state.transactions.item.expenses);

  // Fetch transactions when the component mounts
  useEffect(() => {
    dispatch(fetchTransactions({ type: 'expenses' }));
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
