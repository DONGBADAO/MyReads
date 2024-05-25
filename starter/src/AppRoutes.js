import React from "react";
import { Routes, Route } from "react-router-dom";
import ListBook from "./ListBook";
import SearchBook from "./SearchBook";

export const HOME_PAGE = "/";
export const SEARCH_PAGE = "/search";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={HOME_PAGE} element={<ListBook />} />
      <Route path={SEARCH_PAGE} element={<SearchBook />} />
    </Routes>
  );
};

export default AppRoutes;
