import React from 'react';
import { IncomeForm } from 'components/Income/IncomeForm';
import { TransactionNav } from 'components/Transaction/TransactionNav';



export const IncomePage = () => {
 

  return (
    <div>
        <header>
            <TransactionNav />
        </header>
        <main>
            <IncomeForm />
        </main>
    </div>
  );
};
