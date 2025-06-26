import css from "../NotFoundPage/NotFoundPage.module.css";

import { Link } from "react-router-dom";



export default function NotFoundPage() {
	
  return (
    <p className={css.text}>
      Sorry, page not found! Please go to <Link to="/" className={css.link}> 
        Home Page!
      </Link>      
    </p>
  );
}
