import css from "../RegistrationForm/RegistrationForm.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";

import { register } from "../../redux/auth/operations";

import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import toast from "react-hot-toast";

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is Required!"),
  email: Yup.string().email("Invalid email address").required("Email is Required"),
  password: Yup.string()
    .min(10, "Too Short!")
    .max(30, "Too Long!")
    .required("Password is Required!"),
});



export default function RegistrationForm() {
	const fieldId = useId();
	
  const dispatch = useDispatch();

  const handleRegisterContact = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success("Account created successfully!");
      })
      .catch(() => {
        toast.error(
          "Oops! Looks like there's a problem with the registration process!"
        );
      });
    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={UserSchema}
          onSubmit={handleRegisterContact}
        >
          <Form className={css.form}>
            <p className={css.formTitle}>
              Don`t have an account❔Create account
            </p>
            <div className={css.formFields}>
              <label className={css.formInputLabel} htmlFor={`${fieldId}-name`}>
                Name
              </label>

              <div className={css.iconPosition}>
                <Field
                  className={css.input}
                  type="text"
                  name="name"
                  id={`${fieldId}-name`}
                />
                <span className={css.inputIcon}>
                  <FaUser />
                </span>
              </div>
              <ErrorMessage
                className={css.error}
                name="name"
                component="span"
              />
            </div>

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
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

