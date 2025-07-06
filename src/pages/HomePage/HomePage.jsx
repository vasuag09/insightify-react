import "./Home.css";
import dashboardPreview from "../../assets/dashboard.png";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HomePage() {
  const { scrollYProgress } = useScroll();

  // Scale from 1 → 2.5 as you scroll from top to bottom
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <motion.main className="home-wrapper" layout>
      <section className="hero">
        <div className="hero-content">
          <h1>
            Supercharge your Job Search with <motion.span className="brand">Insightify</motion.span>
          </h1>
          <p>
            Insightify helps you track job applications, manage resumes, and prepare for interviews — all in one AI-powered dashboard.
          </p>

          <ul className="features">
            <li>📄 Parse your resume to auto-fill applications</li>
            <li>📌 Track job status & interview notes</li>
            <li>🤖 Summarize roles using AI</li>
          </ul>

          <motion.div className="buttons" style={{ scale, opacity}}>
            <Link to="/signup" className="primary-btn">
              <motion.button whileHover={{ scale: 1.1 }} initial={{opacity: 0}} animate={{opacity: 1}}>Get Started</motion.button>
            </Link>
            <Link to="/login" className="secondary-btn">
              <motion.button whileHover={{ scale: 1.1 }} initial={{opacity: 0}} animate={{opacity: 1}}>Sign In</motion.button>
            </Link>
          </motion.div>
        </div>

        <div className="hero-image">
          <motion.img src={dashboardPreview} alt="Insightify dashboard preview"/>
        </div>
      </section>
    </motion.main>

  );
}
