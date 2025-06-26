import css from "../LoginForm/LoginForm.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";

import { logIn } from "../../redux/auth/operations";

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import toast from "react-hot-toast";

const UserSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is Required"),
  password: Yup.string()
    .min(10, "Too Short!")
    .max(30, "Too Long!")
    .required("Password is Required!"),
});



export default function LoginForm() {
  const fieldId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
      })
      .catch(() => {
        toast.error("Oops! Looks like there's a problem with the login!");
      });
    actions.resetForm();
  };
  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={UserSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <p className={css.formTitle}>Login Page</p>
            <div className={css.formFields}>
              <label
                className={css.formInputLabel}
                htmlFor={`${fieldId}-email`}
              >
                Email
              </label>
              <div className={css.iconPosition}>
                <Field
                  className={css.input}
                  type="email"
                  name="email"
                  id={`${fieldId}-email`}
                />
                <span className={css.inputIcon}>
                  <MdEmail />
                </span>
              </div>
              <ErrorMessage
                className={css.error}
                name="email"
                component="span"
              />
            </div>

            <div>
              <label
                className={css.formInputLabel}
                htmlFor={`${fieldId}-password`}
              >
                Password
              </label>
              <div className={css.iconPosition}>
                <Field
                  className={css.input}
                  type="text"
                  name="password"
                  id={`${fieldId}-password`}
                />
                <span className={css.inputIcon}>
                  <RiLockPasswordFill />
                </span>
              </div>
              <ErrorMessage
                className={css.error}
                name="password"
                component="span"
              />
            </div>

            <button className={css.btn} type="submit">
              Log In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
