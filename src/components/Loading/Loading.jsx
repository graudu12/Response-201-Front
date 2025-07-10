import css from "../Loading/Loading.module.css";
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className={css.loader}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3a5a40"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
}
