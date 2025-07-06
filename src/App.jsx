import "./App.css";
import "@fontsource/poppins";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./components/LoginAndSignup/Login";
import SignUp from "./components/LoginAndSignup/SignUp";
import FeaturesPage from "./components/UI/FeaturesPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import DashboardRoot from "./pages/DashboardRoot";
import ProfilePage from "./components/Dashboard/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Jobs from "./components/Jobs/Jobs";
import JobForm from "./components/Jobs/JobForm";
import ResumeParser from "./components/ResumeParser/ResumeParser";
import ViewNotes from "./components/Notes/ViewNotes";
import AddEditNote from "./components/Notes/AddEditNote";
import ViewNote from "./components/Notes/ViewNote";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "features", element: <FeaturesPage /> },
    ],
  },
  {
    path: ":userId/dashboard",
    element: <ProtectedRoute><DashboardRoot /></ProtectedRoute>,
    children: [{ index: true, element: <DashboardLayout /> },
      {path: "profile", element: <ProfilePage />},
      {path: "jobs", element: <Jobs />},
      {path: "jobs/jobform", element: <JobForm />},
      {path: "jobs/:jobId/jobform", element: <JobForm />},
      {path: "resumeParser", element: <ResumeParser />},
      {path: "notes", element: <ViewNotes />},
      {path: "notes/addnote", element: <AddEditNote />},
      {path: "notes/:noteId/editnote", element: <AddEditNote />},
      {path: "notes/:noteId/viewnote", element: <ViewNote />}
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
