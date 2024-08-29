import React, {useEffect, useState} from 'react';
import { IncomeForm } from 'components/Income/IncomeForm';
import { TransactionNav } from 'components/Transaction/TransactionNav';
import { useSelector } from 'react-redux';
import { selectTotalExpense, selectTotalIncome } from '../redux/expenses/expenseSelectors';

export const IncomePage = () => {
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpense = useSelector(selectTotalExpense);

  return (
    <div>
        <header>
            <TransactionNav />
        </header>
        <main>
            <IncomeForm totalIncome={totalIncome} totalExpense={totalExpense} />
        </main>
    </div>
  );
};
