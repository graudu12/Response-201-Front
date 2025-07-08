import css from "./AddRecipeForm.module.css";
import toast from "react-hot-toast";
import clsx from 'clsx';
import axios from "axios";
import * as Yup from 'yup';
import { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewRecipe } from "../../redux/recipes/slice";
import SuccessSaveModal from '../SuccessSaveModal/SuccessSaveModal.jsx';

export default function AddRecipeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const inputRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [createdRecipeId, setCreatedRecipeId] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axios.get('https://response-201-back.onrender.com/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error loading categories:", err));
  }, []);

  useEffect(() => {
    axios.get('https://response-201-back.onrender.com/api/ingredients')
      .then(res => setIngredients(res.data.ingredients || []))
      .catch(err => console.error("Error loading ingredients:", err));
  }, []);

  const handleSubmit = async (values, addedIngredients, actions) => {
    if (addedIngredients.length === 0) {
      toast.warning("Please add at least one ingredient.");
      return;
    }

    const token = localStorage.getItem('token');

    const payload = {
      nameRecipe: values.nameRecipe,
      recipeDescription: values.recipeDescription,
      cookingTime: String(values.cookingTime),
      calories: String(values.calories),
      recipeCategory: values.recipeCategory,
      instructions: values.instructions,
      ingredients: addedIngredients,
    };

    try {
      const res = await axios.post(
        'https://response-201-back.onrender.com/api/recipes',
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(addNewRecipe(res.data.data));
      toast.success("Recipe added!");
      setCreatedRecipeId(res.data.data._id);
      setShowModal(true);
      actions.resetForm();
      setImageFile(null);
      setPreview(null);
      setAddedIngredients([]);
    } catch (err) {
      console.error("BACKEND ERROR:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleImageClick = () => inputRef.current.click();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleAddIngridient = (values, setFieldValue) => {
    if (!values.name_ingredients || !values.amount_ingredients) return;

    const newIngredient = {
      id: values.name_ingredients,
      measure: values.amount_ingredients,
    };

    const updated = [...addedIngredients, newIngredient];
    setAddedIngredients(updated);
    setFieldValue('ingredients', updated);
    setFieldValue('amount_ingredients', '');
  };

  const handleRemoveLastIngredient = () => {
    setAddedIngredients(prev => prev.slice(0, -1));
  };

  const handleRemoveIng = (index) => {
    setAddedIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const initialValues = {
    nameRecipe: "",
    dishPhoto: "",
    recipeDescription: "",
    cookingTime: "",
    calories: "",
    recipeCategory: "",
    instructions: "",
    amount_ingredients: "",
    name_ingredients: "",
    ingredients: []
  };

  const validationSchema = Yup.object().shape({
    nameRecipe: Yup.string().min(3).max(30).required("Required"),
    recipeDescription: Yup.string().min(3).max(100).required("Required"),
    cookingTime: Yup.string().max(4).required("Required"),
    calories: Yup.string(),
    recipeCategory: Yup.string().required("Required"),
    instructions: Yup.string().required("Required"),
    name_ingredients: Yup.string(),
    amount_ingredients: Yup.string(),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, values.ingredients, actions);
        }}
      >
        {({ values, setFieldValue }) => (
          <>
            <Form>
              <div className={css.cont_form}>
                {/* Upload photo */}
                <div className={css.cont_img}>
                  <h2 className={css.title}>Upload Photo</h2>
                  <div
                    className={css.img_recipe}
                    onClick={handleImageClick}
                    style={{ backgroundImage: preview ? `url(${preview})` : "none" }}
                  >
                    {!preview && (
                      <svg className={css.icon_photo}>
                        <use href={`/svg/sprite.svg#icon-default_photo`} />
                      </svg>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>

                <div className={css.cont_for_pc}>
                  <h2 className={css.title}>General Information</h2>

                  <label className={css.label} htmlFor="nameRecipe">
                    Recipe Title
                    <Field className={css.field} name="nameRecipe" placeholder="Enter name" />
                    <ErrorMessage className={css.error} name="nameRecipe" component="span" />
                  </label>

                  <label className={css.label} htmlFor="recipeDescription">
                    Recipe Description
                    <Field className={css.field_textarea} as="textarea" name="recipeDescription" />
                    <ErrorMessage className={css.error} name="recipeDescription" component="span" />
                  </label>

                  <label className={css.label} htmlFor="cookingTime">
                    Cooking Time (min)
                    <Field className={css.field} name="cookingTime" type="number" />
                    <ErrorMessage className={css.error} name="cookingTime" component="span" />
                  </label>

                  <div className={css.cal_cat}>
                    <label className={css.label} htmlFor="calories">
                      Calories
                      <Field className={css.field} name="calories" type="number" />
                      <ErrorMessage className={css.error} name="calories" component="span" />
                    </label>

                    <label className={css.label} htmlFor="recipeCategory">
                      Category
                      <Field className={css.field} as="select" name="recipeCategory">
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option value={cat.name} key={cat._id}>{cat.name}</option>
                        ))}
                      </Field>
                      <ErrorMessage className={css.error} name="recipeCategory" component="span" />
                    </label>
                  </div>

                  {/* Ingredients */}
                  <h2 className={css.title}>Ingredients</h2>
                  <div className={css.cont_ingred}>
                    <label className={clsx(css.label, css.label_name)}>
                      Name
                      <Field className={css.field} as="select" name="name_ingredients">
                        <option value="">Select</option>
                        {ingredients.map(ing => (
                          <option value={ing._id} key={ing._id}>{ing.name}</option>
                        ))}
                      </Field>
                    </label>

                    <label className={clsx(css.label, css.label_amount)}>
                      Amount
                      <Field className={css.field} name="amount_ingredients" placeholder="100g" />
                    </label>
                  </div>

                  <div className={css.btn_cont}>
                    {addedIngredients.length > 0 && (
                      <button
                        type="button"
                        className={css.btn_remove}
                        onClick={handleRemoveLastIngredient}
                      >
                        Remove Last Ingredient
                      </button>
                    )}
                  </div>

                  <div className={css.btn_cont}>
                    <button
                      type="button"
                      className={css.btn_add}
                      onClick={() => handleAddIngridient(values, setFieldValue)}
                    >
                      Add Ingredient
                    </button>
                  </div>

                  {addedIngredients.length > 0 && (
                    <div className={css.cont_ing}>
                      <div className={css.cont_select_ing}>
                        <p className={css.ing}>Name:</p>
                        <p className={css.ing}>Amount:</p>
                      </div>
                      <ul>
                        {addedIngredients.map((ing, index) => {
                          const fullIngredient = ingredients.find(i => i._id === ing.id);
                          return (
                            <li className={css.ing_list} key={ing.id + ing.measure}>
                              <p className={css.ing_sel}>{fullIngredient?.name || "Unknown"}</p>
                              <p className={css.ing_sel}>{ing.measure}</p>
                              <button
                                type="button"
                                className={css.icon_btn}
                                onClick={() => handleRemoveIng(index)}
                              >
                                <svg className={css.icon_delete}>
                                  <use href={`/svg/sprite.svg#icon-delete`} />
                                </svg>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Instructions */}
                  <h2 className={css.title}>Instructions</h2>
                  <Field
                    className={css.field_textarea}
                    as="textarea"
                    name="instructions"
                    placeholder="Enter instructions"
                  />
                  <ErrorMessage className={css.error} name="instructions" component="span" />

                  <div className={css.cont_push_btn}>
                    <button type="submit" className={css.btn_submit}>Publish Recipe</button>
                  </div>
                </div>
              </div>
            </Form>

            {showModal && (
              <SuccessSaveModal
                recipeId={createdRecipeId}
                onClose={() => setShowModal(false)}
              />
            )}
          </>
        )}
      </Formik>
    </div>
  );
}