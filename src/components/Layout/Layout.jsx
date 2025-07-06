import css from "./Layout.module.css";
import { Suspense } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export const Layout = ({ children }) => {
  return (
    <div className={css.layout}>
      <Header />
      <main className={css.container}>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
};
