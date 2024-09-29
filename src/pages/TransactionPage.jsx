import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { TransactionForm } from '../components/Transaction/TransactionForm';
import { fetchTransactions } from '../redux/transaction/transactionsOperators';
import { useTransaction } from '../hooks/useTransaction';
import { selectTransactionTotal } from '../redux/transaction/transactionsSelectors';


export const TransactionPage = () => {
  const { totalExpenses, totalIncomes } = useSelector(selectTransactionTotal)
  const dispatch = useDispatch();
  const {
    visibleTransaction,
    isLoading,
    transactionTotal,
  } = useTransaction();

  // Fetch transactions when the page loads
  useEffect(() => {
    dispatch(fetchTransactions({ type: 'expenses', date: '' }));
  }, [dispatch]);

  if (typeof totalExpenses === 'undefined' || typeof totalIncomes === 'undefined') {
    return <div>Loading...</div>
  }

   return (
    <div>
      <TransactionForm
        visibleTransaction={visibleTransaction}
        isLoading={isLoading}
        transactionTotal={transactionTotal}
      />
    </div>
  );
};
