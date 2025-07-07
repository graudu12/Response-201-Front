import css from "../LoginForm/LoginForm.module.css";
import { logIn, refreshUser } from "../../redux/auth/operations";
import { selectRefreshing, selectLoggedIn } from "../../redux/auth/selectors";

import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const UserSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(3, "Too Short!")
    .max(25, "Too Long!")
    .required("Password is Required!"),
});

export default function LoginForm() {
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRefreshing = useSelector(selectRefreshing);
  const isLoggedIn = useSelector(selectLoggedIn);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (shouldRedirect && !isRefreshing && isLoggedIn) {
      navigate("/");
    }
  }, [shouldRedirect, isRefreshing, isLoggedIn, navigate]);

  return (
    <div className={css.pageWrapper}>
      <div className={css.card}>
        <h2 className={css.title}>Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={UserSchema}
          onSubmit={(values, actions) => {
            dispatch(logIn(values))
              .unwrap()
              .then(async () => {
                await dispatch(refreshUser()).unwrap();
                toast.success("Login successful");
                actions.resetForm();
                setShouldRedirect(true);
              })
              .catch((err) => {
                toast.error(err || "Login failed");
              });
          }}
        >
          <Form className={css.form}>
            <label htmlFor={emailFieldId} className={css.label}>
              Enter your email address
            </label>
            <Field
              type="email"
              name="email"
              id={emailFieldId}
              className={css.input}
              placeholder="email@gmail.com"
            />
            <ErrorMessage name="email" component="div" className={css.error} />

            <label htmlFor={passwordFieldId} className={css.label}>
              Create a strong password
            </label>
            <div className={css.passwordFieldWrapper}>
              <Field name="password">
                {({ field }) => (
                  <div className={css.inputWithIcon}>
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id={passwordFieldId}
                      className={`${css.input} ${css.inputSpacing}`}
                      placeholder="**********"
                    />
                    <button
                      type="button"
                      className={css.iconButton}
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label="Toggle password visibility"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.4107 16.9874C13.5963 17.3656 12.6923 17.6118 11.7405 17.6118C8.15598 17.6118 5.25017 14.1207 5.25017 13.2336C5.25017 12.7308 6.18382 11.3913 7.64549 10.3252M17.452 14.6367C17.9487 14.0391 18.2308 13.51 18.2308 13.2336C18.2308 12.3466 15.325 8.85549 11.7405 8.85549C13.3177 8.85549 14.5962 10.1238 14.5962 11.6884M11.7405 14.5213C10.1633 14.5213 8.88472 13.253 8.88472 11.6884M18.75 8.85557C16.7732 7.2195 14.4653 6.2802 12.0001 6.2802C11.1116 6.2802 10.2435 6.40222 9.40397 6.63492M5.25017 8.85557C5.43341 8.70392 5.6195 8.55825 5.8083 8.41876M5.25 5.25L17.7856 17.9061"
                          stroke="black"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>

            <button type="submit" className={css.button}>
              Login
            </button>
            <p className={css.registerText}>
              Don’t have an account?
              <Link to="/register" className={css.registerLink}>
                Register
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
