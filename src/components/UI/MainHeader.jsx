import logoImg from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import "./MainHeader.css";
import { motion } from "framer-motion";
export default function MainHeader() {
  return (
    <header>
      <motion.div className="logo-wrapper" whileHover={{scale: 1.1}}>
        <Link to={"/"} className="logo">
          <img src={logoImg} alt="Insightify logo" />
          <p>Insightify</p>
        </Link>
      </motion.div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <motion.p whileHover={{scale: 1.1}}>Home</motion.p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <motion.p whileHover={{scale: 1.1}}>Login</motion.p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
