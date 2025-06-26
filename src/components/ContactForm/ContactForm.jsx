import css from "../ContactForm/ContactForm.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";

import SearchBox from "../SearchBox/SearchBox";

import { addContact } from "../../redux/contacts/operations";

import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { IconContext } from "react-icons";
import toast from "react-hot-toast";



const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is Required!"),

  number: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Phone is Required!"),
});

export default function ContactForm() {
  const fieldId = useId();
  const dispatch = useDispatch();

  const handleAddContact = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        toast.success("Contact successfully added!");
      })
      .catch(() => {
        toast.error(
          "Oops! It looks like there might be a problem with the contact that was added!"
        );
      });
    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <Formik
          initialValues={{ name: "", number: "" }}
          validationSchema={UserSchema}
          onSubmit={handleAddContact}
        >
          <Form className={css.form}>
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

            <div>
              <label
                className={css.formInputLabel}
                htmlFor={`${fieldId}-number`}
              >
                Number
              </label>
              <div className={css.iconPosition}>
                <Field
                  className={css.input}
                  type="tel"
                  name="number"
                  id={`${fieldId}-number`}
                />
                <span className={css.inputIcon}>
                  <FaPhone />
                </span>
              </div>
              <ErrorMessage
                className={css.error}
                name="number"
                component="span"
              />
            </div>
            <button className={css.btn} type="submit">
              <IconContext.Provider
                value={{
                  color: "white",
                  size: "2em",
                }}
              >
                <IoAdd className={css.icon} />
              </IconContext.Provider>
						</button>				
						<SearchBox/>	
          </Form>
				</Formik>			
			</div>			
    </div>
  );
}
