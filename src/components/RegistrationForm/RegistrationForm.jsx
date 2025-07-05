import css from "../RegistrationForm/RegistrationForm.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useId, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { register } from "../../redux/auth/operations";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(30, "Too long!")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(10, "Too short!")
    .max(30, "Too long!")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  agree: Yup.boolean().oneOf([true], "You must agree to terms"),
});

export default function RegisterForm() {
  const emailFieldId = useId();
  const nameFieldId = useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();
  const repeatPasswordFieldId = useId();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/"); // редирект після входу
    }
  }, [token, navigate]);

  return (
    <div className={css.pageWrapper}>
      <div className={css.card}>
        <h2 className={css.title}>Register</h2>
        <p className={css.subtitle}>
          Join our community of culinary enthusiasts, save your favorite
          recipes, and share your cooking creations
        </p>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            repeatPassword: "",
            agree: false,
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values, actions) => {
            const { name, email, password } = values;
            dispatch(register({ name, email, password }))
              .unwrap()
              .then(() => {
                toast.success("Registration successful");
                actions.resetForm();
                navigate("/");
              })
              .catch((err) => {
                toast.error(err || "Registration failed");
              });
          }}
        >
          <Form className={css.form}>
            <label htmlFor={nameFieldId} className={css.label}>
              Enter your name
            </label>
            <Field
              name="name"
              id={nameFieldId}
              className={css.input}
              placeholder="Max"
            />
            <ErrorMessage name="name" component="div" className={css.error} />

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
            <Field name="password">
              {({ field }) => (
                <div className={css.inputWithIcon}>
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    id={passwordFieldId}
                    className={css.input}
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

            <label htmlFor={repeatPasswordFieldId} className={css.label}>
              Repeat your password
            </label>
            <Field name="repeatPassword">
              {({ field }) => (
                <div className={css.inputWithIcon}>
                  <input
                    {...field}
                    type={showRepeatPassword ? "text" : "password"}
                    id={repeatPasswordFieldId}
                    className={css.input}
                    placeholder="**********"
                  />
                  <button
                    type="button"
                    className={css.iconButton}
                    onClick={() => setShowRepeatPassword((prev) => !prev)}
                    aria-label="Toggle repeat password visibility"
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
              name="repeatPassword"
              component="div"
              className={css.error}
            />

            <div className={css.checkboxWrapper}>
              <label className={css.customCheckboxLabel}>
                <Field
                  type="checkbox"
                  name="agree"
                  className={css.visuallyHiddenCheckbox}
                />
                <span className={css.customCheckbox}></span>I agree to the Terms
                of Service and Privacy Policy
              </label>
            </div>
            <ErrorMessage name="agree" component="div" className={css.error} />

            <button type="submit" className={css.button}>
              Create account
            </button>

            <p className={css.registerText}>
              Already have an account?{" "}
              <Link to="/login" className={css.registerLink}>
                Log in
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
