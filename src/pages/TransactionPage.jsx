import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../redux/transaction/transactionsOperators';
import { selectTransactionsStatus, selectTransactionsError } from '../redux/transaction/transactionsSelectors';
import { TransactionForm } from '../components/Transaction/TransactionForm';
import { useParams } from 'react-router-dom';

export const TransactionPage = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectTransactionsStatus);
  const error = useSelector(selectTransactionsError);
  const { transactionType } = useParams();

  useEffect(() => {
    if (transactionType) {
      dispatch(fetchTransactions(transactionType));
    }
  }, [dispatch, transactionType]);

  //  

   if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <TransactionForm />
    </div>
  );
};
