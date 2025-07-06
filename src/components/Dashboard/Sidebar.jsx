// src/components/Dashboard/Sidebar.jsx
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Sidebar() {
    const user = useSelector(state=>state.user.user)
  return (
    <motion.aside
      className="dashboard-sidebar"
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, duration: 0.5 }}
    >
      <h2>Insightify</h2>
      <ul>
        <li><Link to={`/${user._id}/dashboard`}><motion.p whileHover={{scale: 1.2, x: [0, 1, 0]}}>🏠 Dashboard</motion.p></Link></li>
        <li><Link to="jobs"><motion.p whileHover={{scale: 1.2, x: [0, 1, 0]}}>💼 Jobs</motion.p></Link></li>
        <li><Link to="notes"><motion.p whileHover={{scale: 1.2, x: [0, 1, 0]}}>📝 Notes</motion.p></Link></li>
        <li><Link to="profile"><motion.p whileHover={{scale: 1.2, x: [0, 1, 0]}}>👤 Profile</motion.p></Link></li>
      </ul>
    </motion.aside>
  );
}
