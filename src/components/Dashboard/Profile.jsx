import { useEffect, useState } from "react";
import "./ProfilePage.css";
import "./Dashboard.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import LoadingIndicator from "../UI/LoadingIndicator";
export default function ProfilePage() {
  const user = useSelector((state) => state.user.user);
  if (!user) {
    return <LoadingIndicator />;
  }
  return (
    <motion.section
      className="profile-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="profile-card">
        <h2>Hello, {user.name}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>User ID:</strong> {user._id}
        </p>
        <p>
          <strong>Joined:</strong> {new Date(user.date).toLocaleDateString()}
        </p>
        <div className="profile-actions">
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </motion.section>
  );
}
