import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/Dashboard/DasbhboardHeader";
import Footer from "../components/UI/Footer";
import Sidebar from "../components/Dashboard/Sidebar";
import "../components/Dashboard/Dashboard.css";
export default function DashboardRoot() {
  return (
    <>
      <DashboardHeader />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          {" "}
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}
