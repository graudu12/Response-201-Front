import { useSelector } from "react-redux";
import { selectLoggedIn } from "../../redux/auth/selectors";

import { Navigate } from "react-router-dom";



export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectLoggedIn);
  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
