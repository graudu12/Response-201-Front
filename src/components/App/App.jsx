import css from "../App/App.module.css";
import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectRefreshing } from "../../redux/auth/selectors";
import { refreshUser } from "../../redux/auth/operations";

import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { RestrictedRoute } from "../RestrictedRoute/RestrictedRoute";
import { Layout } from "../Layout/Layout";

import Loading from "../Loading/Loading";
import NotificationToast from "../NotificationToast/NotificationToast";
import RecipeDetailsPage from "../../pages/recipeDetailsPage/recipeDetailsPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 📦 Сторінки
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);
const AddRecipePage = lazy(() =>
  import("../../pages/AddRecipePage/AddRecipePage")
);
const ProfilePage = lazy(() => import("../../pages/ProfilePage/ProfilePage"));

export default function App() {
  const dispatch = useDispatch();
  const  isRefreshing  = useSelector(selectRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loading />
  ) : (
    <div className={css.app}>
      <Layout>
         <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute component={<LoginPage />} redirectTo="/" />
            }
          />
          <Route path="/add-recipe" element={<PrivateRoute component={<AddRecipePage />} redirectTo="/"/>} />
        
          <Route path="/recipes/:recipeId" element={<RecipeDetailsPage />} />

          {/* ✅ Profile */}
          <Route
            path="/profile"
            element={<Navigate to="/profile/own" replace />}
            />
            
          <Route path="/profile/:recipeType" element={<PrivateRoute component={<ProfilePage />} redirectTo="/"/>} />


          {/* ❌ 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </Layout>

      <NotificationToast />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
