import css from "./AddRecipeForm.module.css";

import clsx from 'clsx';
import axios from "axios";
import * as Yup from 'yup';
import { useRef, useState, useEffect } from "react";
import { Formik, Form, Field} from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewRecipe } from "../../redux/recipes/slice";


export default function AddRecipeForm() {
const dispatch = useDispatch();
const navigate = useNavigate(); 

const inputRef = useRef(null);

const [ingredients, setIngredients] = useState([]);
const [categories, setCategories] = useState([]);
const [addedIngredients, setAddedIngredients] = useState([]);
const [preview, setPreview] = useState(null);
const [imageFile, setImageFile] = useState(null);
  
useEffect(() => {
  axios.get('https://response-201-back.onrender.com/api/categories')
    .then((res) => setCategories(res.data))
    .catch((err) => console.error("Error loading categories:", err));
}, []);
  
useEffect(() => {
  axios.get('https://response-201-back.onrender.com/api/ingredients')
    .then((res) => setIngredients(res.data.ingredients))
    .catch((err) => console.error("Error loading ingredients:", err));
}, []);

const handleSubmit = async (values, addedIngredients, actions) => {
  if (addedIngredients.length === 0) {
    alert("Please add at least one ingredient.");
    return;
  }

  const formData = new FormData();

  formData.append('nameRecipe', values.nameRecipe);
  formData.append('recipeDescription', values.recipeDescription);
  formData.append('cookingTime', values.cookingTime);
  formData.append('calories', values.calories);
  formData.append('recipeCategory', values.recipeCategory);
  formData.append('instructions', values.instructions);
  formData.append('ingredients', JSON.stringify(addedIngredients));

  if (imageFile) {
    formData.append('dishPhoto', imageFile);
  }

  const token = localStorage.getItem('token');

    try {
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const res = await axios.post('https://response-201-back.onrender.com/api/recipes', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });

      const newRecipe = res.data;

      dispatch(addNewRecipe(newRecipe));

     console.log('Рецепт додано');
      navigate(`/recipes/${res.data.id}`);
      actions.resetForm();
      setImageFile(null);
      setPreview(null);
      setAddedIngredients([]);
    } catch (err) {
      console.error('Помилка');
      
    }
};

const handleImageClick = () => {
    inputRef.current.click();
};

const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };
  
const handleAddIngridient = (values, setFieldValue) => {
  if (!values.name_ingredients || !values.amount_ingredients)
    return;

  const newIngredient = {
    id: { name: values.name_ingredients },
    measure: values.amount_ingredients,
  };

  setAddedIngredients(prev => [...prev, newIngredient]);

  setFieldValue('amount_ingredients', '');
};

const handleRemoveLastIngredient = () => {
  setAddedIngredients(prev => prev.slice(0, -1));
};

const handleRemoveIng = (index) => {
    setAddedIngredients(prev => prev.filter((_, i) => i !== index));
}
    
const initialValues = {
    nameRecipe: "",
    recipeDescription: "",
    cookingTime: "",
    calories: "",
    recipeCategory: "",
    instructions: "",
};

  const validationSchema = Yup.object().shape({
    nameRecipe: Yup.string().min(3, "Too short!").max(30, "Too long!").required("Required"),
    recipeDescription: Yup.string().min(3, "Too short!").max(100, "Too long!").required("Required"),
    cookingTime: Yup.number().required("Required"),
    calories: Yup.number().required("Required"),
    recipeCategory: Yup.string().required("Required"),
    name_ingredients: Yup.string().min(3, "Too short!").max(30, "Too long!"),
    amount_ingredients: Yup.string().min(1, "Too short!").max(30, "Too long!"),
    instructions: Yup.string().required("Required"),
})
  
  return (
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleSubmit(values, addedIngredients, actions)}
        >
          {({ values, setFieldValue }) => (
          <Form>
            <div className={css.cont_form}>

            <div className={css.cont_img}>
                <h2 className={css.title}>Upload Photo</h2>
                <div
                className={css.img_recipe}
                onClick={handleImageClick}
                style={{
                backgroundImage: preview ? `url(${preview})` : "none",
                    }}
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
              <Field
                className={css.field}
                id="nameRecipe"
                name="nameRecipe"
                type="text"
                placeholder="Enter the name of your recipe"
              />
            </label>

           
            <label className={css.label} htmlFor="recipeDescription">
              Recipe Description
              <Field
                className={css.field_textarea}
                id="recipeDescription"
                name="recipeDescription"
                as="textarea"
                placeholder="Enter a brief description of your recipe"
              />
            </label>

            
            <label className={css.label} htmlFor="cookingTime">
              Cooking time in minutes
              <Field
                className={css.field}
                id="cookingTime"
                name="cookingTime"
                type="number"
                placeholder="10"
              />
            </label>

            
            <div className={css.cal_cat}>
              <label className={css.label} htmlFor="calories">
                Calories
                <Field
                  className={css.field}
                  id="calories"
                  name="calories"
                  type="number"
                  placeholder="150 cals"
                />
              </label>

           
                <label className={css.label} htmlFor="recipeCategory">
                Category
                <Field 
                    className={css.field} 
                    id="recipeCategory" 
                    name="recipeCategory" 
                    as="select" 
                    >
                {categories.map((cat) => (
                    <option value={cat.name} key={cat._id}>{cat.name}</option>
                ))}
                </Field>
                </label>             
            </div>

            <h2 className={css.title}>Ingredients</h2>

            <div className={css.cont_ingred}>
            <label className={clsx(css.label, css.label_name)} htmlFor="name_ingredients">
              Name
              <Field
                    className={css.field}
                    id="name_ingredients"
                    name="name_ingredients"
                as="select">
                {ingredients.map((ing) => (
                  <option value={ing} key={ing}>{ing}</option>
                ))}
              </Field>
            </label>

            <label className={clsx(css.label, css.label_amount)} htmlFor="amount_ingredients">
              Amount
              <Field
                className={css.field}
                id="amount_ingredients"
                name="amount_ingredients"
                placeholder="100g"
              />
            </label>
            </div>
            
            <div className={css.btn_cont}>
              {addedIngredients.length > 0 && (
              <button type="button" className={css.btn_remove} onClick={handleRemoveLastIngredient}>
              Remove last Ingredient
              </button> 
              )}
            </div>
            
            <div className={css.btn_cont}>
              <button type="button" className={css.btn_add} onClick={() => handleAddIngridient(values, setFieldValue)}>
                Add new Ingredient
              </button>
            </div>
            
            {addedIngredients.length > 0 && (
              <div className={css.cont_ing}> 
              <div className={css.cont_select_ing}>
              <p className={css.ing}>Name:</p>
              <p className={css.ing}>Amount:</p>
              </div>
            <ul>
            {addedIngredients.map((ing, index) => (
                <li className={css.ing_list} key={ing.name}>
                  <p className={css.ing_sel}>{ing.name}</p>
                  <p className={css.ing_sel}>{ing.amount}</p>
                  <button
                  type="button"
                  className={css.icon_btn}
                  onClick={() => handleRemoveIng(index)}>
                    <svg className={css.icon_delete}>
                      <use href={`/svg/sprite.svg#icon-delete`} />
                    </svg>
                  </button>
                </li>
             ))}
            </ul>
            </div>
            )}
           
            <h2 className={css.title}>Instructions</h2>

            <Field
              className={css.field_textarea}
              as="textarea"
              name="instructions"
              placeholder="Enter a text"
            />
            
            </div>

            <div className={css.cont_push_btn}>
            <button type="submit" className={css.btn_submit}>
              Publish Recipe
            </button>
            </div>
            
            </div>

            </Form>
          )}
        </Formik>
      </div>
  );
}
