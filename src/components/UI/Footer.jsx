// components/Footer.jsx
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-brand">Insightify</h3>
        <p className="footer-tagline">
          Simplify your job search. Track, prepare, and grow with AI.
        </p>
        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
        <p className="footer-copy">© {new Date().getFullYear()} Insightify. All rights reserved.</p>
      </div>
    </footer>
  );
}
