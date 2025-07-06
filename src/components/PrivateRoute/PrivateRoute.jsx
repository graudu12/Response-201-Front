import { useSelector } from "react-redux";
import { selectLoggedIn } from "../../redux/auth/selectors";

import { Navigate } from "react-router-dom";



export const PrivateRoute = ({ component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectLoggedIn);
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};
