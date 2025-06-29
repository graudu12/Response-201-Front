// src/components/App/App.jsx
import css from "../App/App.module.css";
import { lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRefreshing } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";
import { RestrictedRoute } from "../RestrictedRoute/RestrictedRoute";
import { Layout } from "../Layout/Layout";
import RecipesList from "../RecipesList/RecipesList";
import Loading from "../Loading/Loading";
import NotificationToast from "../NotificationToast/NotificationToast";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NotFound from "../NotFound/NotFound";

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

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loading />
  ) : (
    <div className={css.app}>
      <Layout>
        {}
        <button onClick={() => setShowError(true)} style={{ margin: 20 }}>
          Показати помилку (NotFound)
        </button>

        {showError && <NotFound onRetry={() => setShowError(false)} />}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/recipes"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/recipes"
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

      {}
      <NotificationToast />

      {}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

