// src/layout.jsx
import { Outlet } from "react-router-dom";
import RedirectHandler from "./RedirectHandler";

export default function Layout() {
  return (
    <>
      <RedirectHandler />
      <Outlet />
    </>
  );
}