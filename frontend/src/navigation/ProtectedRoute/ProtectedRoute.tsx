import React, { useEffect } from "react";
import { useUser } from "../../contexts/UserProvider";
import { Navigate, useLocation } from "react-router-dom";
import { AppPath } from "../../common/app/AppPath";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem("token");
    const { setUser } = useUser();
    const location = useLocation();

    useEffect(() => {
        if (!token) setUser(null);
    }, [token, setUser]);

    if (!token) {
        return <Navigate to={AppPath.Login} state={{ from: location }} replace />;
    }

    return <>{children}</>
}

export { ProtectedRoute };  