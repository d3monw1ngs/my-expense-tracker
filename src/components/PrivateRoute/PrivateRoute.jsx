import { useAuth } from "../../redux/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsRefreshing } from "../../redux/auth/authSelectors";

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
    const { isLoggedIn } = useAuth();
    const isRefreshing = useSelector(selectIsRefreshing);

    if (isRefreshing) {
        return <div>Loading...</div>;
    }

  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;
};
