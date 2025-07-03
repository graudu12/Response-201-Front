import css from "./Layout.module.css";
import { Suspense } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export const Layout = ({ children }) => {
  return (
    <div className={css.container}>
      <Header />
      <Suspense fallback={null}>{children}</Suspense>
      <Footer />
    </div>
  );
};
