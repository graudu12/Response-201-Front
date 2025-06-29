import css from "./AddRecipePage.module.css";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";

export default function AddRecipePage() {
    return (
        <div className={css.container}>
            <h1 className={css.title}>Add Recipe</h1>
            <AddRecipeForm/>
        </div>
    );
}