import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const isLoggedIn = sessionStorage.getItem("is_a");

    if (!isLoggedIn) {
        return <Navigate to="/" state={{ from: location }} replcae />;
    } else {
        return children;
    }
};

export default PrivateRoute;
