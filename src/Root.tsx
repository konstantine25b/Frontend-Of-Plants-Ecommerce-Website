import { Outlet } from "react-router-dom";
import NavBar from "./Components/Pages/NavBar/NavBar";

export default function Root() {

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
