import css from "./AddRecipeForm.module.css";
import sprite from "../../svg/sprite.svg";
import axios from "axios";
import * as Yup from 'yup';
import { useRef, useState, useEffect } from "react";
import { Formik, Form, Field} from "formik";
import { useNavigate } from "react-router-dom";


export default function AddRecipeForm() {
const navigate = useNavigate(); 

const inputRef = useRef(null);

const [ingredients, setIngredients] = useState([]);
const [categories, setCategories] = useState([]);
const [addedIngredients, setAddedIngredients] = useState([]);
const [preview, setPreview] = useState(null);
  
useEffect(() => {
  axios.get('http://localhost:4000/api/categories')
    .then((res) => setCategories(res.data))
    .catch((err) => console.error("Error loading categories:", err));
}, []);
  
useEffect(() => {
  axios.get('http://localhost:4000/api/ingredients')
    .then((res) => setIngredients(res.data.ingredients))
    .catch((err) => console.error("Error loading ingredients:", err));
}, []);

const handleSubmit = async (values, actions) => {
  const formData = new FormData();
  for (let key in values) {
    if (key === 'ingredients')// перевірить 
    {
      formData.append('ingredients', JSON.stringify(values.ingredients)); 
    } else {
      formData.append(key, values[key])
    }
  }
    try {
      const res = await axios.post('api/recipes', formData, {
        headers: { 'Content-Type': "multipart/form-data" },
      });
     console.log('Рецепт додано');
      navigate(`/recipes/${res.data.id}`);
    } catch (err) {
      console.error('Помилка');
      
    }
  actions.resetForm();
};

const handleImageClick = () => {
    inputRef.current.click();
};

const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };
  
const handleAddIngridient = (values, setFieldValue) => {
  if (!values.name_ingredients || !values.amount_ingredients)
    return;

  const newIngredient = {
    name: values.name_ingredients,
    amount: values.amount_ingredients,
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
    recipe_title: "",
    recipe_desc: "",
    recipe_time: "",
    calories: "",
    category: "",
    name_ingredients: "",
    amount_ingredients: "",
    instructions: "",
};

  const validationSchema = Yup.object().shape({
    recipe_title: Yup.string().min(3, 'Too short!').max(30, 'Too long!').required('Required'),
    recipe_desc: Yup.string().min(3, 'Too short!').max(100, 'Too long!').required('Required'),
    recipe_time: Yup.number().required('Required'),
    calories: Yup.number().nullable(),
    category: Yup.string().required('Required'),
    name_ingredients: Yup.string().min(3, 'Too short!').max(30, 'Too long!').required('Required'),
    amount_ingredients: Yup.string().min(3, 'Too short!').max(30, 'Too long!').required('Required'),
    instructions: Yup.string().required('Required'),
})
  
  return (
      <div className={css.container}>
      <div>
        <h2 className={css.title}>General Information</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values, addedIngredients)}
        >
          {({ values, setFieldValue }) => (
          <Form>
            
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
                                <use href={`${sprite}#icon-default_photo`} />
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
            
            <label className={css.label} htmlFor="recipe_title">
              Recipe Title
              <Field
                className={css.field}
                id="recipe_title"
                name="recipe_title"
                type="text"
                placeholder="Enter the name of your recipe"
              />
            </label>

           
            <label className={css.label} htmlFor="recipe_desc">
              Recipe Description
              <Field
                className={css.field_textarea}
                id="recipe_desc"
                name="recipe_desc"
                as="textarea"
                placeholder="Enter a brief description of your recipe"
              />
            </label>

            
            <label className={css.label} htmlFor="recipe_time">
              Cooking time in minutes
              <Field
                className={css.field}
                id="recipe_time"
                name="recipe_time"
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

           
                <label className={css.label} htmlFor="category">
                Category
                <Field 
                    className={css.field} 
                    id="category" 
                    name="category" 
                    as="select" 
                    >
                {categories.map((cat) => (
                    <option value={cat.name} key={cat._id}>{cat.name}</option>
                ))}
                </Field>
                </label>             
            </div>

            <h2 className={css.title}>Ingredients</h2>

           
            <label className={css.label} htmlFor="name_ingredients">
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

            <label className={css.label} htmlFor="amount_ingredients">
              Amount
              <Field
                className={css.field}
                id="amount_ingredients"
                name="amount_ingredients"
                placeholder="100g"
              />
            </label>

            {addedIngredients.length > 0 && (
            <button type="button" className={css.btn_remove} onClick={handleRemoveLastIngredient}>
            Remove last Ingredient
            </button> 
            )}
            

            <button type="button" className={css.btn_add} onClick={() => handleAddIngridient(values, setFieldValue)}>
              Add new Ingredient
            </button>
            
            {addedIngredients.length > 0 && (
              <div className={css.cont_ing}> 
              <div className={css.cont_select_ing}>
              <p className={css.ing}>Name:</p>
              <p className={css.ing}>Amount:</p>
              </div>
            <ul>
            {addedIngredients.map((ing, index) => (
                <li className={css.ing_list} key={index}>
                  <p className={css.ing_sel}>{ing.name}</p>
                  <p className={css.ing_sel}>{ing.amount}</p>
                  <button
                  type="button"
                  className={css.icon_btn}
                  onClick={() => handleRemoveIng(index)}>
                    <svg className={css.icon_delete}>
                      <use href={`${sprite}#icon-delete`} />
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

            <button type="submit" className={css.btn_submit}>
              Publish Recipe
            </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
