//src/components/SearchBox/SearchBox.jsx
import { useDispatch, useSelector } from "react-redux";
import { useId, useState } from "react";
import { toast } from "react-toastify";

import css from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filters/slice.js";
import { selectNameFilter } from "../../redux/filters/selectors.js";
import { fetchRecipesByQuery } from "../../redux/recipes/operations.js";
import NotFound from "../NotFound/NotFound";

import { selectNotFound } from "../../redux/recipes/selectors";

export default function SearchBox() {
  const dispatch = useDispatch();
  const fieldId = useId();
  const name = useSelector(selectNameFilter);
  const notFound = useSelector(selectNotFound);
  const [input, setInput] = useState(name || "");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      toast.error("Введіть назву рецепта");
      return;
    }

    dispatch(changeFilter({ name: trimmed }));
    dispatch(fetchRecipesByQuery(trimmed));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

   const handleRetry = () => {
     dispatch(changeFilter({ name: "" })); 
     setInput(""); 
   };

   if (notFound) {
     return <NotFound onRetry={handleRetry} />;
   }

  return (
    <div className={css.container}>
      <input
        id={`${fieldId}-name`}
        className={css.searchInput}
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search recipes"
      />
      <button className={css.searchButton} onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}
