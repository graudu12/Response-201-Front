import ClipLoader from "react-spinners/ClipLoader";
import css from "./Loading.module.css";
export default function Loading() {
  return (
    <div className={css.loaderOverlay}>
      <ClipLoader color="#ffffff" size={60} />
    </div>
  );
}
