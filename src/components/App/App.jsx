import css from "../App/App.module.css";
import { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectRefreshing } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";

import { RestrictedRoute } from "../RestrictedRoute/RestrictedRoute";
import { Layout } from "../Layout/Layout";

// import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import Loading from "../Loading/Loading";
import NotificationToast from "../NotificationToast/NotificationToast";
import RecipeDetailsPage from "../../pages/recipeDetailsPage/recipeDetailsPage";
// 👉 Імпортуємо NotFound модалку для тесту
// import NotFound from "../NotFound/NotFound";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));

const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

export default function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useSelector(selectRefreshing);
  console.log("App render, isRefreshing:", isRefreshing);
  // const [showError, setShowError] = useState(false); // стан для модалки

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loading />
  ) : (
    <div className={css.app}>
      <Layout>
        {/* 👉 Тимчасова кнопка для перегляду модалки NotFound */}
        {/* <button onClick={() => setShowError(true)} style={{ margin: 20 }}>
          Показати помилку (NotFound)
        </button> */}
        {/* 
        {showError && <NotFound onRetry={() => setShowError(false)} />} */}
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
          <Route path="/recipes/:recipeId" element={<RecipeDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>

      <NotificationToast />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
