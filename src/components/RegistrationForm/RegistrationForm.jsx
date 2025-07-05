import css from "../RegistrationForm/RegistrationForm.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useId, useEffect } from "react";
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
              .catch(() => {
                toast.error("Registration failed");
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
            <Field
              type="password"
              name="password"
              id={passwordFieldId}
              className={css.input}
              placeholder="**********"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />

            <label htmlFor={repeatPasswordFieldId} className={css.label}>
              Repeat your password
            </label>
            <Field
              type="password"
              name="repeatPassword"
              id={repeatPasswordFieldId}
              className={css.input}
              placeholder="**********"
            />
            <ErrorMessage
              name="repeatPassword"
              component="div"
              className={css.error}
            />

            <div className={css.checkboxWrapper}>
              <Field
                type="checkbox"
                name="agree"
                id="agree"
                className={css.checkbox}
              />
              <label htmlFor="agree" className={css.checkboxLabel}>
                I agree to the Terms of Service and Privacy Policy
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
