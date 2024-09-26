import { useSelector } from "react-redux";
import { 
    selectCategory,
    selectIsError,
    selectIsLoading
 } from "../redux/category/categorySelectors";

 export const useCategory = () => {
    const category = useSelector(selectCategory);
    const catIsLoading = useSelector(selectIsLoading);
    const catIsError = useSelector(selectIsError);

    return { category, catIsLoading, catIsError };
 }