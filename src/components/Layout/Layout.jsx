import css from "./Layout.module.css";

import { Suspense } from "react";

import AppBar from "../AppBar/AppBar";



export const Layout = ({ children }) => {
  return (
    <div className={css.container}>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
