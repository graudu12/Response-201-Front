//src/components/SearchBox/SearchBox.jsx
import { useDispatch, useSelector } from "react-redux";
import { useId, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

import css from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filters/slice.js";
import { selectNameFilter } from "../../redux/filters/selectors.js";
import { fetchRecipesByQuery } from "../../redux/recipes/operations.js";
import { clearNotFound } from "../../redux/recipes/slice";
import { selectNotFound } from "../../redux/recipes/selectors";
import NotFound from "../NotFound/NotFound";

export default function SearchBox() {
  const dispatch = useDispatch();
  const fieldId = useId();
  const name = useSelector(selectNameFilter);
  const notFound = useSelector(selectNotFound);
  const [input, setInput] = useState(name || "");

  const inputRef = useRef(null);

  useEffect(() => {
    setInput(name || "");
  }, [name]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    } else if (e.key === "Escape") {
      handleClear();
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e?.target?.blur();

    const trimmed = input.trim();
    if (!trimmed) {
      toast.error("Введіть назву рецепта");
      return;
    }
    dispatch(changeFilter({ name: trimmed }));
    dispatch(fetchRecipesByQuery(trimmed));
  };

  const handleRetry = () => {
    dispatch(clearNotFound());
    dispatch(changeFilter({ name: "" }));
    setInput("");
  };

  const handleClear = () => {
    dispatch(clearNotFound());
    dispatch(changeFilter({ name: "" }));
    setInput("");
    inputRef.current?.focus();
  };

  if (notFound) return <NotFound onRetry={handleRetry} />;

  return (
    <div className={css.searchBox}>
      <div className={css.inputWrapper}>
        <input
          id={`${fieldId}-name`}
          ref={inputRef}
          className={css.searchInput}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search recipes"
        />
        {input && (
          <button
            type="button"
            className={css.clearButton}
            aria-label="Clear search"
            onClick={handleClear}
          >
            ×
          </button>
        )}
      </div>

      <button className={css.searchButton} onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}
