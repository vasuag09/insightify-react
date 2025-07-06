// src/components/Dashboard/DashboardContent.jsx
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorIndicator";
import { fetchJobs } from "../../utils/http";
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

export default function DashboardContent() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const user = useSelector((state) => state.user.user);
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs", user._id],
    queryFn: fetchJobs,
  });
  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorBlock title="Error" message={error.message} />;
  const totalApplications = data.length;
  const interviews = data.reduce(
    (count, job) => (job.status === "interviewing" ? count + 1 : count),
    0
  );
  const offers = data.reduce(
    (count, job) => (job.status === "accepted" ? count + 1 : count),
    0
  );
  const stats = [
    { title: "Total Applications", value: totalApplications },
    { title: "Interviews Scheduled", value: interviews },
    { title: "Offers", value: offers },
  ];

  return (
    <section className="dashboard-content">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        style={{ scale, opacity }}
      >
        Welcome back, {user.name} 👋
      </motion.h2>

      <div className="cards-grid">
        {stats.map((item, i) => (
          <motion.div
            className="card"
            key={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
