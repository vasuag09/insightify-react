const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes");
const resume = require("./routes/resume");
const noteRoutes = require("./routes/notes");

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "https://insightify-react-frontend.onrender.com", // <- Your frontend URL
  credentials: true, // optional, if you're using cookies or auth headers
}));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/resume", resumeRoutes);
app.use("/api/resume", resume);
app.use("/api/notes", noteRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
