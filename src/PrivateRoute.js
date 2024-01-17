import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({
  component: Component,
  requireAuth = true,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        !requireAuth || user ? (
          <Component {...props} />
        ) : (
          <Navigate replace to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
