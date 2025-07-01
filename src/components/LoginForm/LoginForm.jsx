import css from "../LoginForm/LoginForm.module.css";
import toast from "react-hot-toast";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { Link } from "react-router-dom";

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

  //HERE ADD REAL CONNECTION TO THE BE
  const handleSkipLogin = () => {
    dispatch({
      type: "auth/logIn/fulfilled",
      payload: {
        user: {
          name: "Mock User",
          email: "mock@example.com",
        },
        token: "mock-token",
      },
    });
    toast.success("Пропущено логін — увійшли як mock user");
  };

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
              .then(() => {
                toast.success("Login successful");
                actions.resetForm();
              })
              .catch(() => {
                toast.error("Login failed");
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
            <Field
              type="password"
              name="password"
              id={passwordFieldId}
              className={css.input}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />

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
