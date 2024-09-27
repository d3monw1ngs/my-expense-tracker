import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TransactionForm } from '../components/Transaction/TransactionForm';
import { fetchTransactions } from '../redux/transaction/transactionsOperators';
import { useTransaction } from '../hooks/useTransaction';


export const TransactionPage = () => {
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
