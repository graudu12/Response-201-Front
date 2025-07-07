import css from "./AddRecipeForm.module.css";
import toast from "react-hot-toast";
import clsx from 'clsx';
import axios from "axios";
import * as Yup from 'yup';
import { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage} from "formik";
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
  axios.get('http://localhost:5173/ingredients.json')
    .then((res) => { setIngredients(res.data) })
    // .then((res) => {
    //   const formatted = res.data.ingredients.map((name) => ({
    //     _id: name, // просто унікальний key
    //     name,
    //   }));
    //   setIngredients(formatted);
    // })

    .catch((err) => console.error("Error loading ingredients:", err));
}, []);

const handleSubmit = async (values, addedIngredients, actions) => {
  if (addedIngredients.length === 0) {
    toast.warning("Please add at least one ingredient.");
    return;
  }

  const formData = new FormData();

  formData.append('nameRecipe', values.nameRecipe);
  formData.append('recipeDescription', values.recipeDescription);
  formData.append('cookingTime', values.cookingTime);
  if (values.calories) {
    formData.append('calories', values.calories);
  }
  formData.append('recipeCategory', values.recipeCategory);
  formData.append('instructions', values.instructions);
  formData.append('ingredients', JSON.stringify(addedIngredients));

  if (imageFile) {
    formData.append('dishPhoto', imageFile);
  }

  const token = localStorage.getItem('token');

  console.log("VALUES", values);
console.log("ADDED INGREDIENTS", addedIngredients);
    try {
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const res = await axios.post('https://response-201-back.onrender.com/api/recipes', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });

      const newRecipe = res.data;

      dispatch(addNewRecipe(newRecipe));

      toast.success("Recipe added!");
      navigate(`/recipes/${res.data.id}`);
      actions.resetForm();
      setImageFile(null);
      setPreview(null);
      setAddedIngredients([]);
    } catch (err) {
      toast.error("Something went wrong.");
      
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

  const selectedIngredient = ingredients.find(ing => ing._id === values.name_ingredients);
  if (!selectedIngredient) return;

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
}
    
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
    nameRecipe: Yup.string().min(3, "Must be min 3 chars").max(30, "Must be max 50 chars").required("This field is required"),
    dishPhoto: Yup.mixed(),
    recipeDescription: Yup.string().min(3, "Must be min 3 chars").max(100, "Must be max 100 chars").required("This field is required"),
    instructions: Yup.string().required("This field is required"),
    ingredients: Yup.array().of(
      Yup.object().shape({
        id: Yup.string()
          .required('Ingredient ID is required'),
        measure: Yup.string()
          .required('Measure is required')
          .min(1, 'Measure must not be empty'),
      })
    )
    .min(1, 'At least one ingredient is required'),
    cookingTime: Yup.number().required("This field is required"),
    calories: Yup.number(),
    recipeCategory: Yup.string().required("This field is required"),
    
    
})
  
  return (
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          // values.ingredients = addedIngredients;
          handleSubmit(values, values.ingredients, actions)}}
          
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
              <ErrorMessage className={css.error} name="nameRecipe" component="span"></ErrorMessage>
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
              <ErrorMessage className={css.error} name="recipeDescription" component="span"></ErrorMessage>
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
              <ErrorMessage className={css.error} name="cookingTime" component="span"></ErrorMessage>
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
                <ErrorMessage className={css.error} name="calories" component="span"></ErrorMessage>
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
                <ErrorMessage className={css.error} name="recipeCategory" component="span"></ErrorMessage>
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
                  {/* <option value={ingredients[0]}></option> */}
                {ingredients.map(ing => (
                  <option value={ing._id} key={ing._id}>{ing.name}</option>
                ))}
              </Field>
              <ErrorMessage className={css.error} name="name_ingredients" component="span"></ErrorMessage>
            </label>

            <label className={clsx(css.label, css.label_amount)} htmlFor="amount_ingredients">
              Amount
              <Field
                className={css.field}
                id="amount_ingredients"
                name="amount_ingredients"
                placeholder="100g"
              />
              <ErrorMessage className={css.error} name="amount_ingredients" component="span"></ErrorMessage>
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
                      {addedIngredients.map((ing, index) => {
                const fullIngredient = ingredients.find((i) => i._id === ing.id);
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
           
            <h2 className={css.title}>Instructions</h2>

            <Field
              className={css.field_textarea}
              as="textarea"
              name="instructions"
              placeholder="Enter a text"
            />
            <ErrorMessage className={css.error} name="instructions" component="span"></ErrorMessage>
            
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
