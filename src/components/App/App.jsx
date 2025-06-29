import css from "../App/App.module.css";

import { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectRefreshing } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";

import { RestrictedRoute } from "../RestrictedRoute/RestrictedRoute";
import { Layout } from "../Layout/Layout";
import RecipesList from "../RecipesList/RecipesList";
// import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import Loading from "../Loading/Loading";
import NotificationToast from "../NotificationToast/NotificationToast";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));

const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

const AddRecipePage = lazy(() => import("../../pages/AddRecipePage/AddRecipePage"))


export default function App() {
  const dispatch = useDispatch();

  const { isRefreshing } = useSelector(selectRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loading />
  ) : (
    <div className={css.app}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          />
          <Route
            path="/add"
            element={<AddRecipePage/>}
          />

          <Route path="/recipes" element={<RecipesList />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <NotificationToast />
    </div>
  );
}
