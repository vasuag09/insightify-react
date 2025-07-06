import { Outlet } from "react-router-dom";
import MainHeader from "../components/UI/MainHeader";
import Footer from "../components/UI/Footer";

export default function Root() {
  return (
    <>
      <MainHeader />
      <Outlet />
      <Footer />
    </>
  );
}
