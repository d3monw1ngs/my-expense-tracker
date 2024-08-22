import { useAuth } from "../../redux/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    const fromSignup = location.state?.fromSignup;

    if (isLoggedIn && !fromSignup) {
        return <Navigate to={redirectTo} />
    }
    return <Component />;
};
