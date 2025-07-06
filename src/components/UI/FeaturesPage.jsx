// components/FeaturesPage.jsx
import "./FeaturesPage.css";
import { motion } from "framer-motion";

export default function FeaturesPage() {
  return (
    <motion.section
      className="features-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="features-header">
        <h1>✨ Insightify Features</h1>
        <p>All-in-one toolkit to manage and master your job hunt.</p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <h3>📄 Resume Parser</h3>
          <p>Upload your resume and extract skills, experience & education automatically.</p>
        </div>
        <div className="feature-card">
          <h3>📌 Job Tracker</h3>
          <p>Track job applications by status, tags, deadlines, and companies.</p>
        </div>
        <div className="feature-card">
          <h3>📝 Interview Notes</h3>
          <p>Use markdown to keep detailed, searchable notes about interviews and prep.</p>
        </div>
        <div className="feature-card">
          <h3>🤖 AI Summarizer</h3>
          <p>Use AI to extract key requirements from job descriptions instantly.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure Auth</h3>
          <p>Protect your notes and job data with JWT authentication.</p>
        </div>
        <div className="feature-card">
          <h3>📊 Beautiful Dashboard</h3>
          <p>Visually manage your job pipeline with a modern, responsive UI.</p>
        </div>
      </div>
    </motion.section>
  );
}
