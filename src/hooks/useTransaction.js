import { useSelector } from "react-redux";
import { 
    selectTransaction,
    selectIsLoading,
    selectTransactionTotal,
    selectVisibleTransaction,
    selectExpenseAvg
} from "../redux/transaction/transactionsSelectors";

export const useTransaction = () => {
    const transaction = useSelector(selectTransaction);
    const visibleTransaction = useSelector(selectVisibleTransaction);
    const isLoading = useSelector(selectIsLoading);
    const transactionTotal = useSelector(selectTransactionTotal);
    const expenseAvg = useSelector(selectExpenseAvg);

    return {
        transaction,
        visibleTransaction,
        isLoading,
        transactionTotal,
        expenseAvg
    }
}