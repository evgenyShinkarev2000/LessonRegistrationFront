import React from "react";
import styles from "./MainPage.module.scss";
import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { NavBarLink1 } from "../components/NavBarLink1";
import { InstitutePage } from "./InstitutePage";
import { DepartmentPage } from "./DepartmentPage";

export const MainPage: React.FC = () =>
{

  return (
    <>
      <div className={styles.navBar}>
          <div className={`container ${styles.links}`}>
            <NavLink to="institute">
              {
                ({ isActive, isPending }) => (
                  <NavBarLink1 isActive={isActive} text={'интституты'}></NavBarLink1>
                )
              }
            </NavLink>
            <NavLink to="department">
              {
                ({ isActive, isPending }) => (
                  <NavBarLink1 isActive={isActive} text={'факультеты'}></NavBarLink1>
                )
              }
            </NavLink>
          </div>
      </div>
      <Outlet></Outlet>
      <Routes>
        <Route path="institute" Component={InstitutePage}></Route>
        <Route path="department" Component={DepartmentPage}></Route>
        <Route path="semester"></Route>
        <Route path="subject"></Route>
      </Routes>
    </>
  )
}