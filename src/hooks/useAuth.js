import { useSelector } from "react-redux";
import { 
    selectUser, 
    selectIsLoggedIn,
    selectIsRefreshing,
    selectIsLoading,
    selectAuthError,
    selectIsAuthenticated
} from "../redux/auth/authSelectors";

export const useAuth = () => {
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isRefreshing = useSelector(selectIsRefreshing);
    const isError = useSelector(selectAuthError);
    const isLoading = useSelector(selectIsLoading);

    return {
        user,
        isLoggedIn,
        isAuthenticated,
        isRefreshing,
        isError,
        isLoading
    };
};