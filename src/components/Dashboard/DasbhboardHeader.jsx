import logoImg from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./DashboardHeader.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
export default function DashboardHeader() {
    const dispatch = useDispatch()
    function handleClick(){
        dispatch(userActions.logout())
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        window.location.href = "/";
    }
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
            <Link
              to="resumeParser"
            >
              <motion.p whileHover={{scale: 1.1}}>Resume Parser</motion.p>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={handleClick}
            >
              <motion.p whileHover={{scale: 1.1}}>Logout</motion.p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
