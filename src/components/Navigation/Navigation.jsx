// import css from "../Navigation/Navigation.module.css";
// import clsx from "clsx";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectLoggedIn } from "../../redux/auth/selectors";

// export default function Navigation() {
//   const isLoggedIn = useSelector(selectLoggedIn);

//   const getClassActiveLink = ({ isActive }) =>
//     clsx(css.link, isActive && css.active);

//   return (
//     <nav>
//       <ul className={css.navList}>
//         <li className={css.navItem}>
//           <NavLink to="/" className={getClassActiveLink}>
//             Recipes
//           </NavLink>
//         </li>

//         {isLoggedIn && (
//           <>
//             <li className={css.navItem}>
//               <NavLink to="/profile" className={getClassActiveLink}>
//                 My Profile
//               </NavLink>
//             </li>

//             <li className={css.navItem}>
//               <NavLink to="/add-recipe" className={clsx(css.mobileButton)}>
//                 Add Recipe
//               </NavLink>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }


import css from "../Navigation/Navigation.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import { selectLoggedIn } from "../../redux/auth/selectors";

// + экшены для сброса фильтра и notFound
import { changeFilter } from "../../redux/filters/slice";
import { clearNotFound } from "../../redux/recipes/slice";

export default function Navigation() {
  const isLoggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch(); 

  const getClassActiveLink = ({ isActive }) =>
    clsx(css.link, isActive && css.active);

  // + обработчик сброса фильтра
  const handleRecipesClick = () => {
    dispatch(changeFilter({ name: "" }));
    dispatch(clearNotFound());
  };

  return (
    <nav>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink
            to="/"
            className={getClassActiveLink}
            onClick={handleRecipesClick} 
          >
            Recipes
          </NavLink>
        </li>

        {isLoggedIn && (
          <>
            <li className={css.navItem}>
              <NavLink to="/profile" className={getClassActiveLink}>
                My Profile
              </NavLink>
            </li>

            <li className={css.navItem}>
              <NavLink to="/add-recipe" className={clsx(css.mobileButton)}>
                Add Recipe
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
