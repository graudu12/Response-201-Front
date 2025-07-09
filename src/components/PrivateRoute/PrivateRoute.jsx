import { useSelector } from "react-redux";
import { selectLoggedIn, selectRefreshing } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectLoggedIn);
  const isRefreshing = useSelector(selectRefreshing);

  if (isRefreshing) {
    
    return null;
  }

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};